import { describe, expect, it } from "vitest";

import {
  activeCodes,
  canCopyCode,
  officialGameSnapshot,
  officialGamePassSnapshot,
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

  it("stores fetch time and raw response summaries for API snapshots", () => {
    for (const snapshot of [officialGameSnapshot.apiSnapshot, officialGamePassSnapshot]) {
      expect(snapshot.endpoint).toMatch(/^https:\/\//);
      expect(snapshot.fetchedAt).toMatch(/^2026-09-03T/);
      expect(snapshot.responseSummary.length).toBeGreaterThan(20);
    }
  });

  it("keeps uncertain community entry points explicitly unverified", () => {
    expect(statusChecks.codes.state).toBe("Not confirmed");
    expect(statusChecks.discord.state).toBe("Community candidate");
    expect(statusChecks.discord.label).toMatch(/first-party/i);
    expect(statusChecks.trello.state).toBe("Not confirmed");
    expect(sitePages.find((page) => page.path === "/codes/")).toMatchObject({
      indexable: true,
      evidenceLevel: "Legacy / Unconfirmed"
    });
    expect(sitePages.find((page) => page.path === "/trello/")).toMatchObject({
      indexable: false,
      evidenceLevel: "Legacy / Unconfirmed"
    });
    expect(sitePages.find((page) => page.path === "/trello/")?.nextScheduledCheck).toBe("2026-09-10");
  });

  it("does not turn mockup tiers into published rankings", () => {
    expect(tierReview.state).toBe("Ranking under review");
    expect(tierReview.rows).toEqual([]);
  });

  it("only indexes pages with dated source-backed content", () => {
    const indexable = sitePages.filter((page) => page.indexable);

    expect(indexable.length).toBeGreaterThan(0);
    for (const page of indexable) {
      expect(page.lastVerified).toMatch(/^2026-09-0[23]$/);
      expect(page.sources.length).toBeGreaterThan(0);
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("records editorial modification dates without rewriting unchanged trust pages", () => {
    expect(sitePages.find((page) => page.path === "/gamepasses/")?.dateModified).toBe("2026-09-03");
    expect(sitePages.find((page) => page.path === "/dungeons/northern-lands/")?.dateModified).toBe("2026-09-03");
    expect(sitePages.find((page) => page.path === "/privacy/")?.dateModified).toBe("2026-09-02");
  });

  it("keeps the codes status as not collected until the live redemption UI is checked", () => {
    expect(sitePages.find((page) => page.path === "/codes/")?.dataState).toBe("not_collected");
  });

  it("schedules the first dungeon evidence batch for the next weekly review", () => {
    expect(sitePages.find((page) => page.path === "/dungeons/")).toMatchObject({
      indexable: false,
      nextScheduledCheck: "2026-09-10"
    });
    expect(sitePages.find((page) => page.path === "/dungeons/northern-lands/")).toMatchObject({
      indexable: false,
      nextScheduledCheck: "2026-09-10"
    });
  });

  it("keeps every core route useful even when it is not yet indexable", () => {
    for (const page of sitePages) {
      expect(page.sections.length).toBeGreaterThanOrEqual(3);
      expect(page.faq.length).toBeGreaterThanOrEqual(2);
      expect(page.related.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("requires a row-level evidence trail for the Reborn comparison", () => {
    const page = sitePages.find((item) => item.path === "/differences/")!;

    expect(page.publicationStatus).toBe("published");
    expect(page.indexable).toBe(true);
    expect(page.differenceRows.length).toBeGreaterThanOrEqual(8);
    expect(page.differenceRows.every((row) => row.sourceURL && row.evidenceNote && row.lastChecked && row.claimStatus && row.verifiedForVersion !== undefined)).toBe(true);
  });

  it("does not present a metadata timestamp as a gameplay patch note", () => {
    const page = sitePages.find((item) => item.path === "/updates/")!;

    expect(page.publicationStatus).toBe("published");
    expect(page.indexable).toBe(false);
    expect(page.updates.length).toBeGreaterThan(0);
    expect(page.updates.every((update) => update.versionTitle && update.publishedDate && update.actualChanges && update.sourceURL && update.affectedPaths)).toBe(true);
    expect(page.updates.some((update) => update.recordType === "patch_note")).toBe(false);
  });

  it("builds the update page from the current official snapshot", () => {
    const page = sitePages.find((item) => item.path === "/updates/")!;
    const copy = JSON.stringify({ sections: page.sections, claims: page.claims, updates: page.updates });

    expect(copy).toContain(officialGameSnapshot.robloxUpdatedAt);
    expect(copy).not.toContain("2026-09-02T23:30:02");
  });
});
