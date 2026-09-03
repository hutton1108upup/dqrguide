import { describe, expect, it } from "vitest";

import { buildOfficialSnapshot, serializeOfficialSnapshot } from "./official-snapshot.mjs";

const gameResponse = {
  data: [{
    id: 9931749389,
    rootPlaceId: 77649408247578,
    name: "[Northern Lands] Dungeon Quest Reborn",
    creator: { id: 496909722, name: "Delta Quarters OG" },
    updated: "2026-09-03T05:19:40.3008179Z"
  }]
};

const passesResponse = {
  gamePasses: [
    { name: "Gold2", isForSale: false },
    { name: "DailyRefresh", isForSale: false },
    { name: "Gold1", isForSale: false }
  ]
};

describe("official Roblox snapshot", () => {
  it("normalizes first-party identity and stable pass fields", () => {
    const snapshot = buildOfficialSnapshot({
      gameResponse,
      passesResponse,
      fetchedAt: "2026-09-03T10:00:00.000Z"
    });

    expect(snapshot).toEqual({
      fetchedAt: "2026-09-03T10:00:00.000Z",
      game: {
        universeId: 9931749389,
        rootPlaceId: 77649408247578,
        name: "[Northern Lands] Dungeon Quest Reborn",
        creatorId: 496909722,
        creatorName: "Delta Quarters OG",
        updatedAt: "2026-09-03T05:19:40.3008179Z"
      },
      gamePasses: [
        { name: "DailyRefresh", isForSale: false, price: null },
        { name: "Gold1", isForSale: false, price: null },
        { name: "Gold2", isForSale: false, price: null }
      ]
    });
  });

  it("rejects incomplete first-party responses", () => {
    expect(() => buildOfficialSnapshot({
      gameResponse: { data: [] },
      passesResponse,
      fetchedAt: "2026-09-03T10:00:00.000Z"
    })).toThrow(/one game record/i);

    expect(() => buildOfficialSnapshot({
      gameResponse,
      passesResponse: {},
      fetchedAt: "2026-09-03T10:00:00.000Z"
    })).toThrow(/gamePasses array/i);
  });

  it("serializes deterministically with a trailing newline", () => {
    const snapshot = buildOfficialSnapshot({
      gameResponse,
      passesResponse,
      fetchedAt: "2026-09-03T10:00:00.000Z"
    });

    const serialized = serializeOfficialSnapshot(snapshot);
    expect(serialized.endsWith("\n")).toBe(true);
    expect(JSON.parse(serialized)).toEqual(snapshot);
  });
});
