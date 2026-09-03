import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "../app/not-found";
import HomePage from "../app/page";
import { getPageByPath, sitePages } from "./content/routes";

function routeCopy(page: (typeof sitePages)[number]) {
  return JSON.stringify({
    title: page.title,
    description: page.description,
    h1: page.h1,
    eyebrow: page.eyebrow,
    summary: page.summary,
    quickAnswer: page.quickAnswer,
    sections: page.sections.map(({ title, paragraphs, bullets }) => ({ title, paragraphs, bullets })),
    faq: page.faq,
    related: page.related
  });
}

describe("player-facing copy", () => {
  it("keeps editor and implementation language out of route content", () => {
    const banned = /\bMVP\b|mockup|publication gate|verification queue|this build|this release|review preview|\bnoindex\b|review-only|first-pass|publication queue|collection queue|\bindexable\b/i;
    const violations = sitePages
      .map((page) => ({ path: page.path, copy: routeCopy(page) }))
      .filter(({ copy }) => banned.test(copy))
      .map(({ path }) => path);

    expect(violations).toEqual([]);
  });

  it("does not promise complete data on pages that are still noindex", () => {
    const forbiddenTitleFragments: Record<string, RegExp> = {
      "/gamepasses/": /Costs & Best Order/i,
      "/spells/": /Full List/i,
      "/spell-tier-list/": /Best Skills/i,
      "/trading/": /Full Guide/i,
      "/dungeons/": /Order, Levels & Drops/i,
      "/dungeons/winter-outpost/": /Guide & Drops/i,
      "/dungeons/northern-lands/": /Guide & Drops/i,
      "/drops/": /Loot Tables by Dungeon/i,
      "/discord/": /Server Link & Guide/i,
      "/tier-list/": /Spells, Weapons & Builds/i,
      "/updates/": /Patch Notes/i,
      "/weapons/": /Stats, Drops & Tiers/i,
      "/cosmetics/": /Full List/i,
      "/builds/": /^Best /i
    };

    for (const [path, fragment] of Object.entries(forbiddenTitleFragments)) {
      const page = getPageByPath(path)!;
      expect(page.indexable, path).toBe(false);
      expect(page.title, path).not.toMatch(fragment);
    }

    expect(getPageByPath("/codes/")?.title).not.toMatch(/Rewards/i);
  });

  it("keeps the homepage and 404 focused on player actions", () => {
    const { unmount } = render(<HomePage />);
    expect(document.body).not.toHaveTextContent(/\bMVP\b|mockup|publication gate|verification queue|evidence trail|public \/ noindex|\bindexable\b/i);
    unmount();

    render(<NotFound />);
    expect(screen.getByRole("heading", { name: /Route not found/i })).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/\bMVP\b|publication gate|\bindexable\b/i);
  });
});
