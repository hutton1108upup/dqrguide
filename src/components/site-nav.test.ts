import { describe, expect, it } from "vitest";

import * as siteNav from "./site-nav";

describe("site navigation model", () => {
  it("covers every production non-trust page exactly once", () => {
    const paths = siteNav.getNavigationItems("production").map(([, href]) => href);

    expect(paths).toHaveLength(25);
    expect(new Set(paths).size).toBe(25);
    expect(paths).toEqual(expect.arrayContaining([
      "/",
      "/dungeons/",
      "/drops/",
      "/builds/",
      "/beginner-guide/",
      "/codes/",
      "/updates/",
      "/trello/",
      "/scripts-macros/"
    ]));
    expect(paths).not.toEqual(expect.arrayContaining([
      "/source-policy/",
      "/privacy/",
      "/contact/"
    ]));
  });

  it("matches exact pages and nested sections without matching sibling prefixes", () => {
    expect(siteNav).toHaveProperty("isNavigationPathActive");
    const isNavigationPathActive = (
      siteNav as typeof siteNav & {
        isNavigationPathActive: (pathname: string, href: string) => boolean;
      }
    ).isNavigationPathActive;

    expect(isNavigationPathActive("/builds/mage/", "/builds/")).toBe(true);
    expect(isNavigationPathActive("/codes", "/codes/")).toBe(true);
    expect(isNavigationPathActive("/spell-tier-list/", "/spells/")).toBe(false);
  });
});
