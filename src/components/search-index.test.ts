import { describe, expect, it } from "vitest";

import { buildSearchItems, searchSite } from "./search-index";

describe("site search index", () => {
  it("includes every published core route", () => {
    expect(buildSearchItems()).toHaveLength(15);
  });

  it("finds a route by title, path, or intent phrase", () => {
    expect(searchSite("winter")[0]?.href).toBe("/dungeons/winter-outpost/");
    expect(searchSite("where does an item drop")[0]?.href).toBe("/drops/");
    expect(searchSite("/codes")[0]?.href).toBe("/codes/");
  });

  it("returns an empty state for an unrelated query", () => {
    expect(searchSite("tax filing calculator")).toEqual([]);
  });
});
