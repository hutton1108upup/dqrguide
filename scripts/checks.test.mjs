import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const temporaryDirectories = [];

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) fs.rmSync(directory, { recursive: true, force: true });
});

function fixtureManifest(overrides = {}) {
  return {
    currentVersion: "Test version",
    pages: [
      {
        path: "/",
        publicationStatus: "published",
        indexable: true,
        contentType: "guide",
        lastVerified: "2026-09-02",
        verifiedForVersion: "Test version",
        nextScheduledCheck: "2026-12-01",
        sectionCount: 3,
        faqCount: 2,
        relatedCount: 2,
        quickAnswer: "A direct answer.",
        sourceURLs: ["https://example.com/source"],
        claims: [{ claimStatus: "confirmed", confidence: "High", verifiedForVersion: "Test version", sourceURL: "https://example.com/source", evidenceNote: "Checked.", lastChecked: "2026-09-02" }]
      }
    ],
    entityDraftCount: 8,
    ...overrides
  };
}

function run(scriptName, args = [], env = {}) {
  return spawnSync(process.execPath, [path.join(root, "scripts", scriptName), ...args], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, ...env }
  });
}

function writeManifest(manifest) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "dqr-checks-"));
  temporaryDirectories.push(directory);
  const file = path.join(directory, "manifest.json");
  fs.writeFileSync(file, JSON.stringify(manifest), "utf8");
  return file;
}

describe("content gates", () => {
  it("fails content checks when a published page has no direct answer", () => {
    const manifest = fixtureManifest({ pages: [{ ...fixtureManifest().pages[0], quickAnswer: "" }] });
    const result = run("check-content.mjs", ["--manifest", writeManifest(manifest)]);
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toMatch(/quickAnswer/i);
  });

  it("fails source checks when a critical claim omits its evidence note", () => {
    const manifest = fixtureManifest({ pages: [{ ...fixtureManifest().pages[0], claims: [{ ...fixtureManifest().pages[0].claims[0], evidenceNote: "" }] }] });
    const result = run("check-sources.mjs", ["--manifest", writeManifest(manifest)]);
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toMatch(/evidenceNote/i);
  });

  it("fails internal link checks for an unknown related path", () => {
    const manifest = fixtureManifest({ pages: [{ ...fixtureManifest().pages[0], relatedPaths: ["/missing/"] }] });
    const result = run("check-links.mjs", ["--manifest", writeManifest(manifest), "--offline"]);
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toMatch(/missing/i);
  });

  it("rejects missing production URL configuration", () => {
    const result = run("check-config.mjs", [], { NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "" });
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toMatch(/NEXT_PUBLIC_SITE_URL/i);
  });

  it("uses the current custom domain for Cloudflare build fallback", () => {
    const script = fs.readFileSync(path.join(root, "scripts", "run-opennext.mjs"), "utf8");

    expect(script).toContain("https://dungeonquestrebornguide.wiki");
    expect(script).not.toContain("https://dqr.gg");
  });

  it("keeps the npm package identity aligned with the public domain", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
    const lockfile = JSON.parse(fs.readFileSync(path.join(root, "package-lock.json"), "utf8"));

    expect(pkg.name).toBe("dungeonquestrebornguide-wiki");
    expect(lockfile.name).toBe(pkg.name);
    expect(lockfile.packages[""].name).toBe(pkg.name);
  });
});
