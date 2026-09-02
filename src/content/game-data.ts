import type { EvidenceLevel, SourceRecord } from "./types";

export const LAST_RESEARCHED = "2026-09-02";

export const sources = {
  officialExperience: {
    title: "[Northern Lands] Dungeon Quest Reborn on Roblox",
    url: "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party experience page naming Delta Quarters OG and stating that Dungeon Quest Reborn is officially licensed by Voldex.",
    lastChecked: LAST_RESEARCHED
  },
  officialGameApi: {
    title: "Roblox Games API — universe 9931749389",
    url: "https://games.roblox.com/v1/games?universeIds=9931749389",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party metadata for the experience name, universe, root place, creator, description, and updated timestamp.",
    lastChecked: LAST_RESEARCHED
  },
  officialPlacesApi: {
    title: "Roblox Universe Places API — universe 9931749389",
    url: "https://develop.roblox.com/v1/universes/9931749389/places",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party universe place listing. A place name is not a dungeon, item, or progression requirement by itself.",
    lastChecked: LAST_RESEARCHED
  },
  officialPassesApi: {
    title: "Roblox Game Passes API — universe 9931749389",
    url: "https://apis.roblox.com/game-passes/v1/universes/9931749389/game-passes?pageSize=100",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party API snapshot. Returned entries are treated as technical records, not as current purchase recommendations.",
    lastChecked: LAST_RESEARCHED
  },
  robloxSocialLinks: {
    title: "Roblox Support — Social Media Links for Experiences & Communities",
    url: "https://en.help.roblox.com/hc/en-us/articles/360000910966-Social-Media-Links-for-Experiences-Communities",
    evidenceLevel: "Official",
    evidenceNote:
      "Roblox explains that social links can be age-gated and visible only to eligible, age-checked users.",
    lastChecked: LAST_RESEARCHED
  }
} satisfies Record<string, SourceRecord>;

export const officialGameSnapshot = {
  name: "[Northern Lands] Dungeon Quest Reborn",
  universeId: 9931749389,
  rootPlaceId: 77649408247578,
  creatorName: "Delta Quarters OG",
  creatorId: 496909722,
  licensedBy: "Voldex",
  robloxUpdatedAt: "2026-09-01T22:28:10.602091Z",
  evidenceLevel: "Official" as EvidenceLevel,
  source: sources.officialGameApi
} as const;

export const knownUniversePlaces = [
  { id: 77649408247578, name: "[Northern Lands] Dungeon Quest Reborn" },
  { id: 85776757589518, name: "Level" },
  { id: 115445507767090, name: "100+ Lobby" }
] as const;

export const gamePassSnapshot = [
  { name: "hi", isForSale: false, price: null },
  { name: "DailyRefresh", isForSale: false, price: null },
  { name: "Gold1", isForSale: false, price: null },
  { name: "Gold2", isForSale: false, price: null },
  { name: "Gold3", isForSale: false, price: null },
  { name: "Gold4", isForSale: false, price: null },
  { name: "Gold5", isForSale: false, price: null }
] as const;

export type CodeStatus = "Officially confirmed" | "Unverified";
export interface CodeRecord {
  code: string;
  status: CodeStatus;
}

export const activeCodes: CodeRecord[] = [];

export function canCopyCode(code: CodeRecord | undefined): boolean {
  return code?.status === "Officially confirmed";
}

export const statusChecks = {
  codes: {
    state: "Not confirmed",
    label: "No official code or redemption path confirmed",
    detail:
      "The first-party Roblox experience and public metadata checked for this MVP do not provide a verified active-code list.",
    checked: LAST_RESEARCHED
  },
  discord: {
    state: "Not confirmed",
    label: "Official invite not published here",
    detail:
      "A public first-party invite was not visible in the sources available for this check. Roblox social links may be age-gated.",
    checked: LAST_RESEARCHED
  },
  trello: {
    state: "Not confirmed",
    label: "No first-party Trello URL confirmed",
    detail:
      "Search-result labels are not enough to establish ownership. Use the Roblox experience page while the direct board link is unverified.",
    checked: LAST_RESEARCHED
  }
} as const;

export const tierReview = {
  state: "Ranking under review",
  rows: [] as Array<{
    tier: string;
    name: string;
    rationale: string;
    evidenceLevel: EvidenceLevel;
  }>,
  criteria: [
    "Room-clear consistency",
    "Boss contribution",
    "Solo survivability",
    "Party utility",
    "Acquisition cost",
    "Current-version evidence"
  ]
} as const;
