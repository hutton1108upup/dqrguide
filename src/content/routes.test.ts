import { describe, expect, it } from "vitest";

import {
  CORE_PATHS,
  getPublishedPages,
  getVisiblePages,
  getIndexablePages,
  getPageByPath,
  getPlayerFacingStatus,
  isEvidenceLevel,
  sitePages
} from "./routes";
import { siteConfig } from "./site";

describe("site page registry", () => {
  it("contains every core MVP route and keeps all paths unique", () => {
    const paths = sitePages.map((page) => page.path);

    expect(new Set(paths).size).toBe(paths.length);
    for (const path of CORE_PATHS) {
      expect(paths).toContain(path);
    }
  });

  it("normalizes slash variants when resolving pages", () => {
    expect(getPageByPath("spells")?.path).toBe("/spells/");
    expect(getPageByPath("/spells")?.path).toBe("/spells/");
    expect(getPageByPath("/spells/")?.path).toBe("/spells/");
  });

  it("only accepts the four documented evidence levels", () => {
    expect(isEvidenceLevel("Official")).toBe(true);
    expect(isEvidenceLevel("In-game Verified")).toBe(true);
    expect(isEvidenceLevel("Community Confirmed")).toBe(true);
    expect(isEvidenceLevel("Legacy / Unconfirmed")).toBe(true);
    expect(isEvidenceLevel("Verified by vibes")).toBe(false);
  });

  it("excludes review-only pages from indexable output", () => {
    const indexablePages = getIndexablePages();

    expect(indexablePages.length).toBeGreaterThan(0);
    expect(indexablePages.every((page) => page.indexable)).toBe(true);
    expect(indexablePages.some((page) => page.path === "/")).toBe(true);
    expect(indexablePages).not.toContainEqual(
      expect.objectContaining({ indexable: false })
    );
  });

  it("requires an explicit publication status for every core route", () => {
    expect(sitePages.length).toBeGreaterThanOrEqual(CORE_PATHS.length);
    expect(CORE_PATHS.every((path) => sitePages.some((page) => page.path === path))).toBe(true);
    expect(sitePages.every((page) => ["draft", "review", "published"].includes(page.publicationStatus))).toBe(true);
  });

  it("keeps review pages out of production-visible routes while showing them in development", () => {
    const published = getPublishedPages();
    const production = getVisiblePages("production");
    const development = getVisiblePages("development");

    expect(production.map((page) => page.path)).toEqual(published.map((page) => page.path));
    expect(CORE_PATHS.every((path) => getPageByPath(path)?.publicationStatus === "published")).toBe(true);
    expect(production.some((page) => page.path === "/dungeons/")).toBe(true);
    expect(production.some((page) => page.path === "/updates/")).toBe(true);
    expect(development.length).toBe(production.length);
    expect(production.every((page) => page.publicationStatus === "published")).toBe(true);
  });

  it("includes the planned first-pass P1 hubs and role build routes", () => {
    for (const path of [
      "/beginner-guide/",
      "/weapons/",
      "/armor/",
      "/cosmetics/",
      "/builds/",
      "/builds/mage/",
      "/builds/warrior/",
      "/builds/tank/",
      "/builds/healer/",
      "/scripts-macros/"
    ]) {
      expect(getPageByPath(path)).toMatchObject({
        publicationStatus: "published",
        indexable: false
      });
    }
  });

  it("uses the current public site name throughout route copy", () => {
    expect(siteConfig.name).toBe("Dungeon Quest Reborn Guide");
    expect(JSON.stringify(sitePages)).not.toContain("DQR.GG");
  });

  it("describes content readiness without exposing SEO index state", () => {
    expect(getPlayerFacingStatus(getPageByPath("/")!)).toBe("Source checked");
    expect(getPlayerFacingStatus(getPageByPath("/dungeons/northern-lands/")!)).toBe("Gameplay details in review");
    expect(getPlayerFacingStatus(getPageByPath("/privacy/")!)).toBe("Site information");

    for (const page of sitePages) {
      expect(getPlayerFacingStatus(page)).not.toMatch(/index|noindex|preview/i);
    }
  });
});
