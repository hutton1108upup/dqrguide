import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_SITE_URL = "https://dungeonquestrebornguide.wiki";
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const command = process.execPath;
const cliPath = path.join(
  repoRoot,
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "index.js"
);
const environment = {
  ...process.env,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL
};

const result = spawnSync(command, [cliPath, ...(args.length > 0 ? args : ["build"])], {
  cwd: repoRoot,
  env: environment,
  shell: false,
  stdio: "inherit",
  windowsHide: true
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
