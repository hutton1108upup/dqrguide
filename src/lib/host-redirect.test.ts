import { describe, expect, it } from "vitest";

import { getLegacyHostRedirect } from "./host-redirect";

describe("legacy host redirect", () => {
  it("redirects the apex .wiki host while preserving path and query", () => {
    expect(getLegacyHostRedirect("dungeonquestrebornguide.wiki", "/spells/", "?role=mage")).toBe(
      "https://dqr.gg/spells/?role=mage"
    );
  });

  it("redirects the www .wiki host", () => {
    expect(getLegacyHostRedirect("www.dungeonquestrebornguide.wiki", "/", "")).toBe(
      "https://dqr.gg/"
    );
  });

  it("accepts a legacy host with a development port", () => {
    expect(getLegacyHostRedirect("dungeonquestrebornguide.wiki:3000", "/codes/", "")).toBe(
      "https://dqr.gg/codes/"
    );
  });

  it("leaves canonical and local hosts untouched", () => {
    expect(getLegacyHostRedirect("dqr.gg", "/updates/", "?page=2")).toBeNull();
    expect(getLegacyHostRedirect("localhost:3000", "/spells/", "")).toBeNull();
    expect(getLegacyHostRedirect(null, "/", "")).toBeNull();
  });
});
