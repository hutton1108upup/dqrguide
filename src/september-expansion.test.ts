import { describe, expect, it } from "vitest";
import { getPageByPath, getIndexablePages } from "./content/routes";
import { officialGameSnapshot } from "./content/game-data";

describe("September expansion evidence boundaries", () => {
  const paths = ["/spells/fire-bomb/", "/spells/enhanced-inner-focus/", "/guides/egg-island/", "/guides/boss-raids/", "/dungeons/steampunk-sewers/", "/dungeons/northern-lands/odin-reincarnation/"];
  it("provides source-backed pages for the six approved topics", () => {
    for (const path of paths) {
      const page = getPageByPath(path);
      expect(page, path).toBeDefined();
      expect(page?.sources.length, path).toBeGreaterThan(0);
      expect(page?.sections.length, path).toBeGreaterThanOrEqual(3);
      expect(page?.related.length, path).toBeGreaterThanOrEqual(2);
    }
  });
  it("updates identity without re-dating the old Northern Lands tactics", () => {
    expect(officialGameSnapshot.name).toContain("Odin Reincarnation");
    const page = getPageByPath("/dungeons/northern-lands/")!;
    expect(JSON.stringify(page)).toContain("September 2");
    expect(page.related.some(link => link.href.endsWith("/odin-reincarnation/"))).toBe(true);
  });
  it("keeps insufficiently verified Fire Bomb and Egg Island data out of the sitemap", () => {
    const paths = getIndexablePages().map(page => page.path);
    expect(paths).not.toContain("/spells/fire-bomb/");
    expect(paths).not.toContain("/guides/egg-island/");
    expect(JSON.stringify(getPageByPath("/drops/")?.sections)).not.toMatch(/0\.18%|1 in 555|1 in 4,500/);
  });
});
