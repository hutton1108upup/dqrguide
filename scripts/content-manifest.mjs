import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultManifestPath = path.join(root, "src", "content", "publishing-manifest.json");

export function readManifest(filePath = defaultManifestPath) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) throw new Error(`Manifest not found: ${resolvedPath}`);
  const manifest = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
  if (!Array.isArray(manifest.pages)) throw new Error("Manifest pages must be an array.");
  return manifest;
}

export function parseManifestArg(args) {
  const index = args.indexOf("--manifest");
  return index === -1 ? defaultManifestPath : args[index + 1];
}

export function normalizePath(value) {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

export function failOrPass(name, errors, summary) {
  if (errors.length) {
    process.stderr.write(`FAIL ${name}\n${errors.map((error) => `- ${error}`).join("\n")}\n`);
    process.exitCode = 1;
    return;
  }
  process.stdout.write(`PASS ${name}${summary ? ` ${summary}` : ""}\n`);
}
