import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("verification orchestrator", () => {
  it("lists every required verification stage", () => {
    const result = spawnSync(process.execPath, [path.join(root, "scripts", "verify.mjs"), "--list"], {
      cwd: root,
      encoding: "utf8"
    });

    expect(result.status).toBe(0);
    for (const stage of ["test", "typecheck", "lint", "check-content", "check-links", "check-sources", "check-config", "build", "qa"]) {
      expect(result.stdout).toContain(stage);
    }
  });
});
