import { EVIDENCE_LEVELS, type Confidence, type EvidenceLevel, type SitePage } from "./types";
import { LAST_RESEARCHED } from "./game-data";
import { pageContentByPath } from "./page-content";

export const CORE_PATHS = [
  "/",
  "/differences/",
  "/gamepasses/",
  "/spells/",
  "/spell-tier-list/",
  "/trading/",
  "/dungeons/",
  "/dungeons/winter-outpost/",
  "/dungeons/northern-lands/",
  "/drops/",
  "/codes/",
  "/trello/",
  "/discord/",
  "/tier-list/",
  "/updates/"
] as const;

const published = "2026-09-02";

type PageSeed =
  Pick<
    SitePage,
    | "path"
    | "kind"
    | "title"
    | "description"
    | "h1"
    | "eyebrow"
    | "summary"
    | "quickAnswer"
    | "indexable"
    | "verifiedForVersion"
  > & { evidenceLevel?: EvidenceLevel; confidence?: Confidence };

const pageSeed: PageSeed[] = [
  {
    path: "/",
    kind: "hub",
    title: "Dungeon Quest Reborn Wiki: Spells, Drops & Guides",
    description:
      "An evidence-labelled Dungeon Quest Reborn wiki for dungeon progression, spells, drops, tier lists, codes, and update status.",
    h1: "Dungeon Quest Reborn Wiki & Progression Guide",
    eyebrow: "Field guide / evidence first",
    summary:
      "Use this independent field guide to move from a question to the right dungeon, drop table, spell page, or status check without wading through a long introduction.",
    quickAnswer:
      "Start with your current progression question: choose Dungeons to find the next run, Drops to trace an item source, or Codes, Trello, and Discord for a source-checked status.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot"
  },
  {
    path: "/differences/",
    kind: "guide",
    title: "Dungeon Quest Reborn vs Original: All Differences",
    description:
      "A source-aware comparison checklist for Dungeon Quest Reborn and the original experience, including data transfer, progression, ownership, and systems.",
    h1: "Dungeon Quest Reborn vs Original Dungeon Quest",
    eyebrow: "Returner briefing",
    summary:
      "This page separates what is officially documented from what still needs an in-game check before a returning player acts on old information.",
    quickAnswer:
      "Treat Reborn-specific data as a separate dataset. Do not assume that an original-game level, item, route, purchase, or account state carries over unless an official source says so.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot"
  },
  {
    path: "/gamepasses/",
    kind: "status",
    title: "Dungeon Quest Reborn Gamepasses: Costs & Best Order",
    description:
      "A verification-led DQR gamepass and boost guide that separates confirmed current effects and currencies from unverified legacy claims.",
    h1: "Dungeon Quest Reborn Gamepasses",
    eyebrow: "Purchase data under review",
    summary:
      "Gamepass names, price, currency, effect, and value can change. This release shows the decision framework and withholds any value that has not been checked in the current experience.",
    quickAnswer:
      "Do not buy from an old tier list alone. Confirm the current price, currency, exact effect, and whether the benefit removes your actual progression bottleneck.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/spells/",
    kind: "hub",
    title: "Dungeon Quest Reborn Spells & Skills: Full List",
    description:
      "Browse DQR spells and skills by class, role, source, best use, and visible verification status without invented damage values.",
    h1: "All Dungeon Quest Reborn Spells & Skills",
    eyebrow: "Spell database",
    summary:
      "The spell index is built around use case and acquisition source. Unknown damage, cooldown, or scaling values remain explicitly unverified.",
    quickAnswer:
      "Pick a role before a rarity: room clear, boss damage, buff, heal, defense, or movement. Then verify that the spell source applies to Reborn rather than the original game.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/spell-tier-list/",
    kind: "guide",
    title: "Dungeon Quest Reborn Spell Tier List: Best Skills",
    description:
      "A transparent DQR spell-ranking framework for clearing, bosses, solo, and parties, with uncertainty shown instead of guessed tiers.",
    h1: "Dungeon Quest Reborn Spell Tier List",
    eyebrow: "Ranking board / method first",
    summary:
      "Rankings only become useful when the use case, weakness, source, alternative, and tested version are visible beside the letter grade.",
    quickAnswer:
      "There is no evidence-ready global ranking in this build yet. Use the role matrix while current-version performance samples are collected.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/trading/",
    kind: "guide",
    title: "How to Trade in Dungeon Quest Reborn: Full Guide",
    description:
      "A safe DQR trading checklist covering access, trade flow, item eligibility, common failures, value evidence, and scam prevention.",
    h1: "How to Trade in Dungeon Quest Reborn",
    eyebrow: "Trade desk",
    summary:
      "This guide focuses on safe process and evidence. It does not publish a static value list without real accepted-trade samples.",
    quickAnswer:
      "Before accepting, verify the other player, re-check every item after any change, and treat asking prices as offers—not proof of market value.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/dungeons/",
    kind: "hub",
    title: "Dungeon Quest Reborn Dungeons: Order, Levels & Drops",
    description:
      "Find the right DQR dungeon by progression need, with level, difficulty, boss, notable drop, and verification fields kept separate.",
    h1: "All Dungeon Quest Reborn Dungeons",
    eyebrow: "Progression map",
    summary:
      "The dungeon hub answers what to run next without hard-coding a total count that may change with updates.",
    quickAnswer:
      "Choose the next dungeon only after checking access, survivability, clear consistency, and whether its drops actually advance your build.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/dungeons/winter-outpost/",
    kind: "guide",
    title: "Dungeon Quest Reborn Winter Outpost Guide & Drops",
    description:
      "A source-labelled Winter Outpost planning page for requirements, route, bosses, drops, builds, and the decision to move on.",
    h1: "Winter Outpost Guide",
    eyebrow: "Dungeon dossier 01",
    summary:
      "This dossier preserves the route and farming decisions players need while leaving unverified requirements and loot entries blank.",
    quickAnswer:
      "Use this page as a run checklist, not a copied original-game loot table; current Reborn requirements and drops still need direct verification.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/dungeons/northern-lands/",
    kind: "guide",
    title: "Dungeon Quest Reborn Northern Lands Guide & Drops",
    description:
      "A current-source Northern Lands dossier for access, boss mechanics, drops, builds, farming priorities, and version changes.",
    h1: "Northern Lands Guide",
    eyebrow: "Current-content dossier",
    summary:
      "The page is structured for a quick route and gear decision, with every current-version field showing whether it has actually been checked.",
    quickAnswer:
      "The mockup's level, boss, drop, and stat values are not treated as evidence. Use the verification panel to see what is safe to act on.",
    indexable: false,
    verifiedForVersion: null,
    evidenceLevel: "Official",
    confidence: "High"
  },
  {
    path: "/drops/",
    kind: "hub",
    title: "Dungeon Quest Reborn Drops: Loot Tables by Dungeon",
    description:
      "Trace DQR items back to source dungeons while keeping official rates, community observations, and unknown rates distinct.",
    h1: "Dungeon Quest Reborn Drop Tables",
    eyebrow: "Reverse lookup",
    summary:
      "Drops starts with the target item; Dungeons starts with the run. Keeping those intents separate makes the answer faster and the evidence easier to audit.",
    quickAnswer:
      "A source dungeon can be useful even when the exact drop rate is unknown. Never read a community estimate as an official probability.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/codes/",
    kind: "status",
    title: "Dungeon Quest Reborn Codes: Current Status & Rewards",
    description:
      "Check whether DQR has a confirmed redemption system, active codes, source checks, and a clear warning about wrong-game code lists.",
    h1: "Dungeon Quest Reborn Codes — Current Status",
    eyebrow: "Live status / no guesswork",
    summary:
      "Codes is maintained as a status check. It never borrows codes from Dungeon Lootr or another experience and never shows a copy button for an unconfirmed code.",
    quickAnswer:
      "No active code is published in this build because a current official code and redemption path have not yet been confirmed from a first-party source.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot",
    evidenceLevel: "Legacy / Unconfirmed",
    confidence: "Low"
  },
  {
    path: "/trello/",
    kind: "status",
    title: "Dungeon Quest Reborn Trello: Status & Update Sources",
    description:
      "Check the official-status evidence for a DQR Trello and use verified first-party update sources instead of copied boards.",
    h1: "Does Dungeon Quest Reborn Have an Official Trello?",
    eyebrow: "Source status",
    summary:
      "A board is not official because search results call it official. This page records the direct verification path and safer alternatives.",
    quickAnswer:
      "No Trello URL is labelled official in this build until a first-party DQR or publisher channel links to it directly.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot",
    evidenceLevel: "Legacy / Unconfirmed",
    confidence: "Low"
  },
  {
    path: "/discord/",
    kind: "status",
    title: "Dungeon Quest Reborn Discord: Server Link & Guide",
    description:
      "A cautious DQR Discord status guide covering invite verification, server identity, channel use, party finding, and scam prevention.",
    h1: "Dungeon Quest Reborn Discord Server Guide",
    eyebrow: "Community access check",
    summary:
      "Invite destinations and ownership can change. The server identity and link remain visibly unverified until a first-party source confirms them.",
    quickAnswer:
      "Only trust an invite linked by the current Roblox experience or publisher. Check the destination name and member context before joining or trading.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/tier-list/",
    kind: "guide",
    title: "Dungeon Quest Reborn Tier List: Spells, Weapons & Builds",
    description:
      "A progression-based DQR tier framework for spells, weapons, and builds with evidence, use cases, and version status beside every conclusion.",
    h1: "Dungeon Quest Reborn Tier List",
    eyebrow: "Meta board / under review",
    summary:
      "The overview separates early, mid, late, and endgame needs. It links to detailed data instead of duplicating the entire spell ranking.",
    quickAnswer:
      "No current item is assigned a launch tier without repeatable evidence. The board shows the evaluation criteria and pending verification queue.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/updates/",
    kind: "update",
    title: "Dungeon Quest Reborn Updates & Patch Notes",
    description:
      "Track first-party DQR updates and see which guide pages changed, with source date, verification date, and affected content kept explicit.",
    h1: "Dungeon Quest Reborn Updates",
    eyebrow: "Verification ledger",
    summary:
      "This ledger changes only when a source or site record changes. Build and deployment dates never masquerade as editorial updates.",
    quickAnswer:
      "Use this page to trace why a guide changed. No patch note is copied into the ledger without a direct source and affected-page links.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot"
  }
];

function makePage(seed: (typeof pageSeed)[number]): SitePage {
  const content = pageContentByPath[seed.path];

  if (!content) {
    throw new Error(`Missing page content for ${seed.path}`);
  }

  return {
    ...seed,
    published: true,
    datePublished: published,
    dateModified: published,
    lastVerified: LAST_RESEARCHED,
    evidenceLevel: seed.evidenceLevel ?? (seed.indexable ? "Official" : "Legacy / Unconfirmed"),
    confidence: seed.confidence ?? (seed.indexable ? "High" : "Low"),
    ...content
  };
}

export const sitePages: SitePage[] = pageSeed.map(makePage);

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const clean = path.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  return `/${clean}/`;
}

export function getPageByPath(path: string): SitePage | undefined {
  const normalized = normalizePath(path);
  return sitePages.find((page) => page.path === normalized);
}

export function getIndexablePages(): SitePage[] {
  return sitePages.filter((page) => page.published && page.indexable);
}

export function isEvidenceLevel(value: string): value is EvidenceLevel {
  return EVIDENCE_LEVELS.includes(value as EvidenceLevel);
}
