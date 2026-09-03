import publishingManifest from "./publishing-manifest.json";
import { EVIDENCE_LEVELS, type Confidence, type ContentType, type DataState, type EvidenceLevel, type PublicationStatus, type SitePage } from "./types";
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
const policies = publishingManifest.pages as Array<{
  path: string;
  publicationStatus: PublicationStatus;
  indexable: boolean;
  contentType: ContentType;
  lastVerified: string;
  dateModified?: string;
  verifiedForVersion: string | null;
  nextScheduledCheck: string | null;
  dataState?: DataState;
}>;
const policyByPath = new Map(policies.map((policy) => [policy.path, policy]));

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
  },
  {
    path: "/beginner-guide/",
    kind: "guide",
    title: "Dungeon Quest Reborn Beginner Guide: Progress Faster",
    description:
      "Start DQR with the right class, stats, dungeon route, upgrade priorities, gold use, spell choices, and mistakes to avoid during early progression.",
    h1: "Dungeon Quest Reborn Beginner Guide",
    eyebrow: "First run briefing",
    summary:
      "A first-pass route for new players: choose a role, build a repeatable upgrade loop, and keep every recommendation tied to the current evidence queue.",
    quickAnswer:
      "Start with a survivable role and a repeatable dungeon route. Do not spend or copy a build until its current Reborn source, version, and use case are verified.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/weapons/",
    kind: "hub",
    title: "Dungeon Quest Reborn Weapons: Stats, Drops & Tiers",
    description:
      "Browse DQR weapons by class, dungeon, difficulty, rarity, level, and current tier, with verified source pages and upgrade comparisons.",
    h1: "Dungeon Quest Reborn Weapons Database",
    eyebrow: "Equipment database",
    summary:
      "The weapon index is ready for verified rows. Until Reborn-specific names, sources, and values are checked, it exposes the fields and decision paths rather than guessed stats.",
    quickAnswer:
      "Choose a weapon by the dungeon you can clear consistently and the role you are building for. A high rarity label alone is not a current-version recommendation.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/armor/",
    kind: "hub",
    title: "Dungeon Quest Reborn Armor: Stats, Sets & Sources",
    description:
      "Track DQR armor by slot, class, dungeon, rarity, level, set role, trade status, and current verification state.",
    h1: "Dungeon Quest Reborn Armor Database",
    eyebrow: "Equipment database",
    summary:
      "Armor entries will be added as Reborn-specific evidence arrives. The first-pass page defines the comparison fields so an old-game set cannot quietly become a current recommendation.",
    quickAnswer:
      "Prioritise the armor slot that fixes your current failure point, then compare source dungeon, requirement, and role fit before rarity or set claims.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/cosmetics/",
    kind: "hub",
    title: "Dungeon Quest Reborn Cosmetics: Full List & Sources",
    description:
      "Browse DQR armor, weapon, enchant, title, and event cosmetics with source dungeon, availability, trade status, and last verification date.",
    h1: "Dungeon Quest Reborn Cosmetics",
    eyebrow: "Collection index",
    summary:
      "Cosmetics are separated from progression stats until a current source confirms what is visual, obtainable, tradable, or event-limited.",
    quickAnswer:
      "Treat a cosmetic as unverified until its Reborn source and availability window are checked. Do not infer tradability or event status from an original-game listing.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/builds/",
    kind: "hub",
    title: "Dungeon Quest Reborn Builds: Mage, Warrior, Tank & Healer",
    description:
      "Find current DQR Mage, Warrior, Tank, and Healer builds with stat priorities, recommended spells, gear goals, progression stages, and alternatives.",
    h1: "Best Dungeon Quest Reborn Builds",
    eyebrow: "Role decision desk",
    summary:
      "The build hub splits recommendations by role and progression stage. Role pages are structured now; individual spell, weapon, and stat claims wait for current evidence.",
    quickAnswer:
      "Choose a role based on the way you clear dungeons, then connect spells, weapons, armor, and alternatives to a verified source instead of copying an old meta build.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/builds/mage/",
    kind: "guide",
    title: "Dungeon Quest Reborn Mage Build: Spells, Gear & Stats",
    description:
      "A first-pass DQR Mage build framework for spell roles, gear goals, stat priorities, progression stages, and evidence-backed alternatives.",
    h1: "Dungeon Quest Reborn Mage Build",
    eyebrow: "Build sheet / Mage",
    summary:
      "Use this role sheet to organise a Mage build while current spell names, weapon records, and performance samples are collected.",
    quickAnswer:
      "Build around the Mage job you need—room clear, boss damage, or support—and verify each spell and gear source for Reborn before treating it as a recommendation.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/builds/warrior/",
    kind: "guide",
    title: "Dungeon Quest Reborn Warrior Build: Spells, Gear & Stats",
    description:
      "A first-pass DQR Warrior build framework for frontline role, gear goals, stat priorities, progression stages, and evidence-backed alternatives.",
    h1: "Dungeon Quest Reborn Warrior Build",
    eyebrow: "Build sheet / Warrior",
    summary:
      "Use this role sheet to organise a Warrior build while current item records and repeatable clear evidence are collected.",
    quickAnswer:
      "Start with the survivability and damage balance your next dungeon demands; do not turn an original-game Warrior setup into a Reborn answer without a current source.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/builds/tank/",
    kind: "guide",
    title: "Dungeon Quest Reborn Tank Build: Defense, Gear & Team Role",
    description:
      "A first-pass DQR Tank build framework for defense priorities, team utility, gear goals, progression stages, and evidence-backed alternatives.",
    h1: "Dungeon Quest Reborn Tank Build",
    eyebrow: "Build sheet / Tank",
    summary:
      "Use this role sheet to define what a Tank must survive and enable before a current-version gear recommendation is published.",
    quickAnswer:
      "Define the hit or mechanic the Tank must survive, then verify defensive effects, team utility, and the source dungeon for each recommended item.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/builds/healer/",
    kind: "guide",
    title: "Dungeon Quest Reborn Healer Build: Spells, Gear & Team Role",
    description:
      "A first-pass DQR Healer build framework for recovery, support role, gear goals, progression stages, and evidence-backed alternatives.",
    h1: "Dungeon Quest Reborn Healer Build",
    eyebrow: "Build sheet / Healer",
    summary:
      "Use this role sheet to organise recovery and support priorities while current Reborn spell effects and gear sources are collected.",
    quickAnswer:
      "Choose support tools around the damage your party actually takes, and verify every healing or buff claim in the current Reborn experience before publishing a build.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/scripts-macros/",
    kind: "guide",
    title: "Dungeon Quest Reborn Scripts & Macros: Safety Guide",
    description:
      "A safety-first DQR guide explaining why scripts, macros, executors, account risks, and unofficial downloads are not progression advice.",
    h1: "Dungeon Quest Reborn Scripts & Macros Safety Guide",
    eyebrow: "Safety boundary",
    summary:
      "This page exists to answer the search intent without distributing exploit instructions, executors, or downloads that can put a Roblox account at risk.",
    quickAnswer:
      "Do not download executors, paste scripts, or share session credentials for a shortcut. Use in-game controls and verified guides instead.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/privacy/",
    kind: "trust",
    title: "Dungeon Quest Reborn Guide Privacy",
    description: "Privacy boundaries for the independent Dungeon Quest Reborn reference site.",
    h1: "Dungeon Quest Reborn Guide Privacy",
    eyebrow: "Trust page",
    summary: "What this local MVP collects, what it does not collect, and which future capabilities are outside this release.",
    quickAnswer: "This MVP has no accounts, comments, payments, market, or advertising system; do not enter credentials or private game data here.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/contact/",
    kind: "trust",
    title: "Contact Dungeon Quest Reborn Guide",
    description: "Contact and correction boundaries for the independent Dungeon Quest Reborn reference site.",
    h1: "Contact Dungeon Quest Reborn Guide",
    eyebrow: "Trust page",
    summary: "How to understand the current correction boundary before a public support channel is configured.",
    quickAnswer: "This local MVP does not operate a public inbox or community support system; source corrections are documented through the source-policy workflow before publication.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/source-policy/",
    kind: "trust",
    title: "Dungeon Quest Reborn Guide Source & Verification Policy",
    description: "The evidence, confidence, version, date, and publication rules used by Dungeon Quest Reborn Guide.",
    h1: "Source & Verification Policy",
    eyebrow: "Trust page",
    summary: "A compact explanation of how page-level sources and claim-level evidence are kept separate.",
    quickAnswer: "A source can establish one fact without proving every fact on a page; each critical claim must show its own status, confidence, version, source, note, and checked date.",
    indexable: false,
    verifiedForVersion: null
  }
];

function makePage(seed: (typeof pageSeed)[number]): SitePage {
  const content = pageContentByPath[seed.path];

  if (!content) {
    throw new Error(`Missing page content for ${seed.path}`);
  }

  const policy = policyByPath.get(seed.path);
  if (!policy) {
    throw new Error(`Missing publication policy for ${seed.path}`);
  }

  return {
    ...seed,
    indexable: policy.indexable,
    publicationStatus: policy.publicationStatus,
    published: policy.publicationStatus === "published",
    contentType: policy.contentType,
    datePublished: published,
    dateModified: policy.dateModified ?? published,
    lastVerified: policy.lastVerified ?? LAST_RESEARCHED,
    nextScheduledCheck: policy.nextScheduledCheck,
    dataState: policy.dataState,
    verifiedForVersion: policy.verifiedForVersion,
    evidenceLevel: seed.evidenceLevel ?? (seed.indexable ? "Official" : "Legacy / Unconfirmed"),
    confidence: seed.confidence ?? (seed.indexable ? "High" : "Low"),
    claims: content.claims ?? [],
    differenceRows: content.differenceRows ?? [],
    updates: content.updates ?? [],
    ...content
  };
}

export const sitePages: SitePage[] = pageSeed.map(makePage);

export type RuntimeEnvironment = "development" | "preview" | "production";

export function getRuntimeEnvironment(): RuntimeEnvironment {
  if (process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "1") return "preview";
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

export function isPageAvailable(page: SitePage, environment: RuntimeEnvironment): boolean {
  if (page.publicationStatus === "published") return true;
  return page.publicationStatus === "review" && environment !== "production";
}

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
  return getPublishedPages().filter((page) => page.indexable);
}

export function getPublishedPages(): SitePage[] {
  return sitePages.filter((page) => page.publicationStatus === "published");
}

export function getVisiblePages(environment: RuntimeEnvironment = getRuntimeEnvironment()): SitePage[] {
  return sitePages.filter((page) => isPageAvailable(page, environment));
}

export function isEvidenceLevel(value: string): value is EvidenceLevel {
  return EVIDENCE_LEVELS.includes(value as EvidenceLevel);
}
