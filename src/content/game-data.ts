import type { ApiSnapshot, EvidenceLevel, SourceRecord } from "./types";

export const LAST_RESEARCHED = "2026-09-03";

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
  originalExperience: {
    title: "Dungeon Quest! RPG Adventure on Roblox",
    url: "https://www.roblox.com/games/2414851778/Dungeon-Quest-RPG-Adventure",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party original experience page naming Dungeon Quest by Voldex and describing its public game features.",
    lastChecked: LAST_RESEARCHED
  },
  originalGameApi: {
    title: "Roblox Games API — universe 848145103",
    url: "https://games.roblox.com/v1/games?universeIds=848145103",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party metadata for the original experience name, universe, root place, creator, and public description.",
    lastChecked: LAST_RESEARCHED
  },
  originalPlacesApi: {
    title: "Roblox Universe Places API — universe 848145103",
    url: "https://develop.roblox.com/v1/universes/848145103/places?limit=100",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party original-universe place listing used only to compare public place records.",
    lastChecked: LAST_RESEARCHED
  },
  originalPassesApi: {
    title: "Roblox Game Passes API — universe 848145103",
    url: "https://apis.roblox.com/game-passes/v1/universes/848145103/game-passes?pageSize=100",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party original-universe game-pass snapshot used to compare public technical records, not to infer current purchase behavior.",
    lastChecked: LAST_RESEARCHED
  },
  robloxSocialLinks: {
    title: "Roblox Support — Social Media Links for Experiences & Communities",
    url: "https://en.help.roblox.com/hc/en-us/articles/360000910966-Social-Media-Links-for-Experiences-Communities",
    evidenceLevel: "Official",
    evidenceNote:
      "Roblox explains that social links can be age-gated and visible only to eligible, age-checked users.",
    lastChecked: LAST_RESEARCHED
  },
  officialThumbnailApi: {
    title: "Roblox Thumbnails API — Dungeon Quest Reborn",
    url: "https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=9931749389&countPerUniverse=10&defaults=true&size=768x432&format=Png&isCircular=false",
    evidenceLevel: "Official",
    evidenceNote:
      "First-party promotional artwork for the current experience. The API does not identify the pictured dungeon, enemy, boss, item, or ability by name.",
    lastChecked: LAST_RESEARCHED
  },
  northernLandsVideo: {
    title: "Northern Lands solo route — SaltyNub",
    url: "https://www.youtube.com/watch?v=3pHhZpt-b-U",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Current-version community demonstration published September 2, 2026. Use for visible route and telegraph review, not as an official drop table or balance statement.",
    lastChecked: LAST_RESEARCHED
  },
  northernLandsWalkthrough: {
    title: "Northern Lands walkthrough — The Dungeon Guest",
    url: "https://www.youtube.com/watch?v=pEC2jGlO-7E",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Independent long-form community run used to cross-check visible Northern Lands flow. It does not replace an in-game or developer source.",
    lastChecked: LAST_RESEARCHED
  },
  gamePassVideo: {
    title: "Gamepass storefront walkthrough — ItzVexo",
    url: "https://www.youtube.com/watch?v=8ZVfKMwvWoo",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community demonstration of a Gold-facing Gamepass screen. Prices, effects, order, and availability remain account- and version-sensitive until captured in-game.",
    lastChecked: LAST_RESEARCHED
  },
  gamePassPriceReport: {
    title: "Player report about changing Gold prices",
    url: "https://www.reddit.com/r/u_MountainSharp1371/comments/1w1ztbr/dungeon_quest_reborn/",
    evidenceLevel: "Legacy / Unconfirmed",
    evidenceNote:
      "Single-player report that a displayed Gold price rose with progression. It defines a verification question, not a confirmed formula or universal price.",
    lastChecked: LAST_RESEARCHED
  },
  beginnerVideo: {
    title: "Complete beginner guide — Vesteria King",
    url: "https://www.youtube.com/watch?v=Hxhu-1QJK0Y",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community walkthrough covering visible build paths, skill points, equipment, and upgrades. Every changing UI label or value still needs a current in-game check.",
    lastChecked: LAST_RESEARCHED
  },
  progressionVideo: {
    title: "Progression guide — Rexon",
    url: "https://www.youtube.com/watch?v=HEsb6IWo5KU",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Long-form community progression demonstration. Use it to identify decisions and screen states, not to publish an unsupported fastest-route claim.",
    lastChecked: LAST_RESEARCHED
  },
  redditStuckDiscussion: {
    title: "Reddit discussion — Is Dungeon Quest Reborn just unbeatable?",
    url: "https://www.reddit.com/r/RobloxHelp/comments/1vz40cx/is_dungeon_quest_reborn_just_unbeatable/",
    evidenceLevel: "Legacy / Unconfirmed",
    evidenceNote:
      "Small community discussion showing real stuck-player questions around boss patterns, daily rewards, survivability, and repeating earlier content. Advice remains reported, not verified.",
    lastChecked: LAST_RESEARCHED
  },
  redditDifferencesDiscussion: {
    title: "Reddit discussion — Reborn versus the old experience",
    url: "https://www.reddit.com/r/roblox/comments/1w58q7w/dungeon_quest_reborn_is_just_old_dungeon_quest/",
    evidenceLevel: "Legacy / Unconfirmed",
    evidenceNote:
      "Player-expectation discussion about how similar Reborn feels to the old experience. Opinions are used to frame questions, not as proof of feature parity.",
    lastChecked: LAST_RESEARCHED
  },
  tradingVideo: {
    title: "Trade flow walkthrough — Radex Tips",
    url: "https://www.youtube.com/watch?v=NE4Xebb7LFg",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community demonstration of opening a trade from the player list and reviewing the trade window. Restrictions still require controlled in-game reproduction.",
    lastChecked: LAST_RESEARCHED
  },
  winterOutpostVideo: {
    title: "Winter Outpost Easy–Nightmare solo guide",
    url: "https://www.youtube.com/watch?v=qDPjeoLcmn8",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Reborn-specific community run covering several displayed difficulties. Subtitle retrieval was rate-limited, so the video remains a manual-review candidate rather than a verified route source.",
    lastChecked: LAST_RESEARCHED
  },
  spellsVideo: {
    title: "Skills up to level 95 — community guide",
    url: "https://www.youtube.com/watch?v=FzogFp907JM",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community ability overview used to build a name-and-card verification queue. Rankings and changing values are not accepted without current item-card evidence.",
    lastChecked: LAST_RESEARCHED
  },
  spellTierVideo: {
    title: "Inner Focus and Inner Rage demonstration",
    url: "https://www.youtube.com/watch?v=I11sThLGWJs",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community demonstration of named abilities. Narrated percentages and rarity claims remain reported until the current ability cards and repeatable results are captured.",
    lastChecked: LAST_RESEARCHED
  },
  weaponsVideo: {
    title: "Northern Lands weapon showcase — Rexon",
    url: "https://www.youtube.com/watch?v=yGfElxJ8hKs",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Current community showcase that can seed item-card capture targets. Its “best weapons” framing is not a tier conclusion.",
    lastChecked: LAST_RESEARCHED
  },
  mageVideo: {
    title: "Level 100+ Mage skills — community guide",
    url: "https://www.youtube.com/watch?v=-jgrSgYx_f8",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community Mage demonstration used to identify a loadout verification queue. Named recommendations require current spell, weapon, armor, and run evidence.",
    lastChecked: LAST_RESEARCHED
  },
  warriorVideo: {
    title: "Warrior skills — community guide",
    url: "https://www.youtube.com/watch?v=NSpGO2ioMb4",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "Community Warrior demonstration used to identify candidate ability roles. It is not a current universal build or tier proof.",
    lastChecked: LAST_RESEARCHED
  },
  robloxAntiCheat: {
    title: "Roblox Support — Cheating and Exploiting",
    url: "https://en.help.roblox.com/hc/en-us/articles/203312450-Cheating-and-Exploiting",
    evidenceLevel: "Official",
    evidenceNote:
      "Roblox states that cheating and exploits violate its rules and warns that exploit downloads can be malware or phishing attempts.",
    lastChecked: LAST_RESEARCHED
  },
  discordInviteApi: {
    title: "Discord public invite preview — dqr",
    url: "https://discord.com/api/v10/invites/dqr?with_counts=true&with_expiration=true",
    evidenceLevel: "Community Confirmed",
    evidenceNote:
      "The public invite resolves to a DQR-branded community. It confirms that the invite works, but first-party ownership still requires an eligible Roblox social-link view or developer statement.",
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
  robloxUpdatedAt: "2026-09-02T23:30:02.2977668Z",
  evidenceLevel: "Official" as EvidenceLevel,
  source: sources.officialGameApi,
  apiSnapshot: {
    endpoint: sources.officialGameApi.url,
    fetchedAt: "2026-09-03T00:43:14.5008776Z",
    responseSummary: "GET returned 1 record: universe 9931749389, root place 77649408247578, current name [Northern Lands] Dungeon Quest Reborn, creator Delta Quarters OG, updated 2026-09-02T23:30:02.2977668Z."
  } satisfies ApiSnapshot
} as const;

export const officialGamePassSnapshot = {
  endpoint: sources.officialPassesApi.url,
  fetchedAt: "2026-09-03T00:43:14.5008776Z",
  responseSummary: "GET returned 7 game-pass records: hi, DailyRefresh, and Gold1 through Gold5; every record was not for sale and exposed no public price in the response."
} satisfies ApiSnapshot;

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
    state: "Community candidate",
    label: "Working invite; first-party link still pending",
    detail:
      "discord.gg/dqr resolves to a DQR-branded community, but a public first-party link was not visible in the eligible Roblox surface available for this check. Roblox social links may be age-gated.",
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
