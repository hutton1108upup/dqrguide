import { describe, expect, it } from "vitest";

import { CORE_PATHS } from "@/content/routes";

import { buildSearchItems, searchSite } from "./search-index";

describe("site search index", () => {
  it("includes every published core route", () => {
    const hrefs = new Set(buildSearchItems("production").map((item) => item.href));

    for (const path of CORE_PATHS) {
      expect(hrefs).toContain(path);
    }
    expect(hrefs).toContain("/beginner-guide/");
    expect(hrefs).toContain("/builds/mage/");
    expect(hrefs).not.toContain("/privacy/");
  });

  it("finds a route by title, path, or intent phrase", () => {
    expect(searchSite("winter")[0]?.href).toBe("/dungeons/winter-outpost/");
    expect(searchSite("where does an item drop")[0]?.href).toBe("/drops/");
    expect(searchSite("/codes")[0]?.href).toBe("/codes/");
  });

  it("returns an empty state for an unrelated query", () => {
    expect(searchSite("tax filing calculator")).toEqual([]);
  });

  it("keeps the first-pass pages searchable while trust pages stay out", () => {
    expect(buildSearchItems("production").some((item) => item.href === "/updates/")).toBe(true);
    expect(searchSite("updates", 7, "production").some((item) => item.href === "/updates/")).toBe(true);
    expect(searchSite("privacy", 7, "production").some((item) => item.href === "/privacy/")).toBe(false);
  });
});
