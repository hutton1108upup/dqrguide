import { describe, expect, it } from "vitest";

import { getCanonicalHostRedirect } from "./host-redirect";

describe("canonical host redirect", () => {
  it("redirects the dqr.gg host while preserving path and query", () => {
    expect(getCanonicalHostRedirect("dqr.gg", "/spells/", "?role=mage")).toBe(
      "https://dungeonquestrebornguide.wiki/spells/?role=mage"
    );
  });

  it("redirects the www dqr.gg host", () => {
    expect(getCanonicalHostRedirect("www.dqr.gg", "/", "")).toBe(
      "https://dungeonquestrebornguide.wiki/"
    );
  });

  it("accepts a canonical alias with a development port", () => {
    expect(getCanonicalHostRedirect("dqr.gg:3000", "/codes/", "")).toBe(
      "https://dungeonquestrebornguide.wiki/codes/"
    );
  });

  it("leaves the current .wiki host and local hosts untouched", () => {
    expect(getCanonicalHostRedirect("dungeonquestrebornguide.wiki", "/updates/", "?page=2")).toBeNull();
    expect(getCanonicalHostRedirect("localhost:3000", "/spells/", "")).toBeNull();
    expect(getCanonicalHostRedirect(null, "/", "")).toBeNull();
  });
});
