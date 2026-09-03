import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "scripts", "refresh-audit.mjs");
const temporaryDirectories = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

describe("refresh audit", () => {
  it("writes deterministic JSON and Markdown reports for a fixed Singapore date", () => {
    const outputDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "dqr-refresh-audit-"));
    temporaryDirectories.push(outputDirectory);

    const result = spawnSync(process.execPath, [script, "--as-of", "2026-10-02", "--output-dir", outputDirectory], {
      cwd: root,
      encoding: "utf8"
    });

    expect(result.status).toBe(0);
    const report = JSON.parse(fs.readFileSync(path.join(outputDirectory, "refresh-audit.json"), "utf8"));
    expect(report.asOf).toBe("2026-10-02");
    expect(report.pages.find((page) => page.path === "/codes/")).toMatchObject({ state: "not_collected", priority: "P0" });
    expect(report.pages.find((page) => page.path === "/tier-list/")).toMatchObject({ state: "version_gap", priority: "P0" });
    expect(Array.isArray(report.sitemapGaps)).toBe(true);
    expect(fs.readFileSync(path.join(outputDirectory, "refresh-audit.md"), "utf8")).toContain("/codes/");
  });
});
