import { describe, expect, it } from "vitest";

import {
  activeCodes,
  canCopyCode,
  officialGameSnapshot,
  statusChecks,
  tierReview
} from "./game-data";
import { sitePages } from "./routes";

describe("publication gates", () => {
  it("publishes no copy action without a confirmed active code", () => {
    expect(activeCodes).toEqual([]);
    expect(canCopyCode(undefined)).toBe(false);
    expect(canCopyCode({ code: "EXAMPLE", status: "Unverified" })).toBe(false);
    expect(canCopyCode({ code: "EXAMPLE", status: "Officially confirmed" })).toBe(
      true
    );
  });

  it("stores the official Roblox identity separately from guide claims", () => {
    expect(officialGameSnapshot).toMatchObject({
      universeId: 9931749389,
      rootPlaceId: 77649408247578,
      creatorName: "Delta Quarters OG",
      creatorId: 496909722,
      evidenceLevel: "Official"
    });
    expect(officialGameSnapshot.licensedBy).toBe("Voldex");
  });

  it("keeps uncertain community entry points explicitly unverified", () => {
    expect(statusChecks.codes.state).toBe("Not confirmed");
    expect(statusChecks.discord.state).toBe("Not confirmed");
    expect(statusChecks.trello.state).toBe("Not confirmed");
    expect(sitePages.find((page) => page.path === "/codes/")).toMatchObject({
      indexable: true,
      evidenceLevel: "Legacy / Unconfirmed"
    });
    expect(sitePages.find((page) => page.path === "/trello/")).toMatchObject({
      indexable: true,
      evidenceLevel: "Legacy / Unconfirmed"
    });
  });

  it("does not turn mockup tiers into published rankings", () => {
    expect(tierReview.state).toBe("Ranking under review");
    expect(tierReview.rows).toEqual([]);
  });

  it("only indexes pages with dated source-backed content", () => {
    const indexable = sitePages.filter((page) => page.indexable);

    expect(indexable.length).toBeGreaterThan(0);
    for (const page of indexable) {
      expect(page.lastVerified).toMatch(/^2026-09-02$/);
      expect(page.sources.length).toBeGreaterThan(0);
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps every core route useful even when it is not yet indexable", () => {
    for (const page of sitePages) {
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      expect(page.faq.length).toBeGreaterThanOrEqual(2);
      expect(page.related.length).toBeGreaterThanOrEqual(2);
    }
  });
});
