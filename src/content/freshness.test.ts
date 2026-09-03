import { describe, expect, it } from "vitest";

import { getFreshnessStatus, type FreshnessPage } from "./freshness.mjs";

const page = (overrides: Partial<FreshnessPage> = {}): FreshnessPage => ({
  path: "/codes/",
  contentType: "codes",
  lastVerified: "2026-09-02",
  nextScheduledCheck: "2026-09-09",
  verifiedForVersion: "[Northern Lands] title snapshot",
  dataState: "observed_zero",
  ...overrides
});

describe("content freshness", () => {
  it("keeps a recently checked Codes page current", () => {
    expect(getFreshnessStatus(page(), "2026-09-03")).toMatchObject({ state: "current", daysUntilCheck: 6 });
  });

  it("warns when the next Codes check is close", () => {
    expect(getFreshnessStatus(page(), "2026-09-09").state).toBe("due_soon");
  });

  it("keeps a Codes page in reminder state before the 30-day P0 threshold", () => {
    expect(getFreshnessStatus(page(), "2026-09-10").state).toBe("due_soon");
  });

  it("marks a Codes page overdue at the 30-day P0 threshold", () => {
    expect(getFreshnessStatus(page(), "2026-10-02").state).toBe("overdue");
  });

  it("marks version-dependent content with no version as a gap", () => {
    expect(getFreshnessStatus(page({ contentType: "dungeon", verifiedForVersion: null }), "2026-09-02").state).toBe("version_gap");
  });

  it("preserves collection failure states instead of turning them into stale", () => {
    expect(getFreshnessStatus(page({ dataState: "not_collected" }), "2026-09-02").state).toBe("not_collected");
    expect(getFreshnessStatus(page({ dataState: "fetch_failed" }), "2026-09-02").state).toBe("fetch_failed");
  });
});
