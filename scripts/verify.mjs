import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const stages = [
  ["test", ["test"]],
  ["typecheck", ["run", "typecheck"]],
  ["lint", ["run", "lint"]],
  ["check-content", ["run", "check-content"]],
  ["check-links", ["run", "check-links"]],
  ["check-sources", ["run", "check-sources"]],
  ["check-config", ["run", "check-config"]],
  ["build", ["run", "build"]],
  ["refresh:audit", ["run", "refresh:audit"]],
  ["qa", ["run", "qa"]]
];

function runStage(name, command, args = [], environment = process.env) {
  process.stdout.write(`\n=== ${name} ===\n`);
  const invocation = process.platform === "win32" && command.toLowerCase().endsWith(".cmd")
    ? { command: environment.ComSpec ?? process.env.ComSpec ?? "cmd.exe", args: ["/d", "/s", "/c", [command, ...args].map((value) => /[\s&]/.test(value) ? `"${value.replaceAll('"', '\\"')}"` : value).join(" ")] }
    : { command, args };
  const result = spawnSync(invocation.command, invocation.args, { cwd: root, env: environment, stdio: "inherit", shell: false, windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${name} failed with exit code ${result.status ?? "unknown"}.`);
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function startProductionServer() {
  const port = Number(process.env.VERIFY_PORT ?? "4178");
  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: root,
    env: { ...process.env, NODE_ENV: "production" },
    stdio: "inherit",
    windowsHide: true
  });
  const base = `http://127.0.0.1:${port}`;
  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (server.exitCode !== null) throw new Error(`production server exited with code ${server.exitCode}`);
      try {
        const responses = await Promise.all([fetch(`${base}/`), fetch(`${base}/codes/`), fetch(`${base}/privacy/`)]);
        if (responses.every((response) => response.status === 200)) return { server, base };
      } catch {
        // The server is still starting.
      }
      await wait(500);
    }
    throw new Error(`production server did not become ready at ${base}`);
  } catch (error) {
    stopProductionServer(server);
    throw error;
  }
}

function stopProductionServer(server) {
  if (!server || server.exitCode !== null) return;
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  } else {
    server.kill("SIGTERM");
  }
}

async function runVerification() {
  if (process.argv.includes("--list")) {
    process.stdout.write(`${stages.map(([name]) => name).join("\n")}\n`);
    return;
  }

  const configuredURL = process.env.NEXT_PUBLIC_SITE_URL;
  const configEnvironment = { ...process.env, NODE_ENV: "production" };
  runStage("test", npmCommand, ["test"], process.env);
  for (const [name, args] of stages.slice(1, 7)) {
    runStage(name, npmCommand, args, name === "check-config" ? configEnvironment : process.env);
  }
  runStage("build", npmCommand, ["run", "build"], configEnvironment);
  runStage("refresh:audit", npmCommand, ["run", "refresh:audit"], { ...process.env, REFRESH_AUDIT_SITEMAP_FILE: path.join(root, ".next", "server", "app", "sitemap.xml.body") });
  if (!configuredURL) throw new Error("NEXT_PUBLIC_SITE_URL is required before browser QA.");

  const { server, base } = await startProductionServer();
  try {
    runStage("qa", process.execPath, [path.join(root, "scripts", "qa_site.mjs")], { ...configEnvironment, TEST_BASE: base });
  } finally {
    stopProductionServer(server);
  }
}

runVerification().catch((error) => {
  process.stderr.write(`\nVERIFY FAILED: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
