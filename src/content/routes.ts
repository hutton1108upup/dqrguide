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
      "A source-checked Dungeon Quest Reborn hub for progression questions, dungeons, spells, drops, codes, community links, and update status.",
    h1: "Dungeon Quest Reborn Wiki & Progression Guide",
    eyebrow: "Field guide / evidence first",
    summary:
      "Pick the question you have now—where to progress, what to farm, which role to build, or whether a link is current—and go straight to the matching guide.",
    quickAnswer:
      "Start with your current progression question: choose Dungeons to find the next run, Drops to trace an item source, or Codes, Trello, and Discord for a source-checked status.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot"
  },
  {
    path: "/differences/",
    kind: "guide",
    title: "Dungeon Quest Reborn vs Original: What Is Confirmed",
    description:
      "Compare official Roblox identity records and see which transfer, progression, item, purchase, and system questions still need an in-game check.",
    h1: "Dungeon Quest Reborn vs Original Dungeon Quest",
    eyebrow: "Returner briefing",
    summary:
      "Reborn and the original use different Roblox universes. The table shows what the public records confirm and where returning players still need to check inside the game.",
    quickAnswer:
      "Treat Reborn-specific data as a separate dataset. Do not assume that an original-game level, item, route, purchase, or account state carries over unless an official source says so.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot"
  },
  {
    path: "/gamepasses/",
    kind: "status",
    title: "Dungeon Quest Reborn Gamepasses: Gold Price Status",
    description:
      "See the current Roblox Game Pass API records, the reported Gold purchase screen, and what to record before comparing prices or effects.",
    h1: "Dungeon Quest Reborn Gamepasses",
    eyebrow: "Purchase data under review",
    summary:
      "The public API exposes technical pass records but not enough storefront detail to name a best purchase. Use the capture checklist before spending Gold or Robux.",
    quickAnswer:
      "Do not buy from an old tier list alone. Confirm the current price, currency, exact effect, and whether the benefit removes your actual progression bottleneck.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/spells/",
    kind: "hub",
    title: "Dungeon Quest Reborn Spells: Roles & Source Checks",
    description:
      "Browse DQR spells and skills by class, role, source, best use, and visible verification status without invented damage values.",
    h1: "Dungeon Quest Reborn Spells & Skills",
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
    title: "Dungeon Quest Reborn Spell Tier List: Review Status",
    description:
      "A transparent DQR spell-ranking framework for clearing, bosses, solo, and parties, with uncertainty shown instead of guessed tiers.",
    h1: "Dungeon Quest Reborn Spell Tier List",
    eyebrow: "Ranking board / method first",
    summary:
      "Rankings only become useful when the use case, weakness, source, alternative, and tested version are visible beside the letter grade.",
    quickAnswer:
      "No global ranking is ready yet. Use the role checklist to compare room clear, boss damage, support, survival, and acquisition before trusting a letter grade.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/trading/",
    kind: "guide",
    title: "How Trading Works in Dungeon Quest Reborn: Safety Checklist",
    description:
      "A safe DQR trading checklist covering access, trade flow, item eligibility, common failures, value evidence, and scam prevention.",
    h1: "How to Trade in Dungeon Quest Reborn",
    eyebrow: "Trade desk",
    summary:
      "Use the observed trade flow to check the player and every offer slot. Item eligibility and market values still need repeatable current-game evidence.",
    quickAnswer:
      "Before accepting, verify the other player, re-check every item after any change, and treat asking prices as offers—not proof of market value.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/dungeons/",
    kind: "hub",
    title: "Dungeon Quest Reborn Dungeons: Progression Checklist",
    description:
      "Find the right DQR dungeon by progression need, with level, difficulty, boss, notable drop, and verification fields kept separate.",
    h1: "Dungeon Quest Reborn Dungeon Progression",
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
    title: "Dungeon Quest Reborn Winter Outpost: Route Check",
    description:
      "A source-labelled Winter Outpost planning page for requirements, route, bosses, drops, builds, and the decision to move on.",
    h1: "Dungeon Quest Reborn Winter Outpost",
    eyebrow: "Dungeon dossier 01",
    summary:
      "Use this page to review current community footage and record the exact difficulty, route, boss tells, and reward screen before changing your farm.",
    quickAnswer:
      "Use this page as a run checklist, not a copied original-game loot table; current Reborn requirements and drops still need direct verification.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/dungeons/northern-lands/",
    kind: "guide",
    title: "Dungeon Quest Reborn Northern Lands: Route Evidence",
    description:
      "Review current Northern Lands footage, route observations, boss-telegraph questions, and the evidence still needed for requirements and drops.",
    h1: "Dungeon Quest Reborn Northern Lands",
    eyebrow: "Current-content dossier",
    summary:
      "Northern Lands is the current experience label. Community runs show the route, while exact requirements, boss values, and loot data still need in-game capture.",
    quickAnswer:
      "Watch the dated route footage before queueing, then confirm the difficulty and access requirement in your own lobby. Do not rely on uncited level or drop numbers.",
    indexable: false,
    verifiedForVersion: null,
    evidenceLevel: "Official",
    confidence: "High"
  },
  {
    path: "/drops/",
    kind: "hub",
    title: "Dungeon Quest Reborn Drops: Source & Rate Checks",
    description:
      "Trace DQR items back to source dungeons while keeping official rates, community observations, and unknown rates distinct.",
    h1: "Dungeon Quest Reborn Drop Sources",
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
    title: "Are There Any Dungeon Quest Reborn Codes? Current Status",
    description:
      "Check whether DQR has a confirmed redemption system, active codes, source checks, and a clear warning about wrong-game code lists.",
    h1: "Dungeon Quest Reborn Codes — Current Status",
    eyebrow: "Live status / no guesswork",
    summary:
      "Codes is maintained as a status check. It never borrows codes from Dungeon Lootr or another experience and never shows a copy button for an unconfirmed code.",
    quickAnswer:
      "No working DQR code or redemption menu was confirmed on the official Roblox page or public game API checked on September 3, 2026.",
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
      "No official Trello link was visible on the checked Roblox experience or creator surfaces. Treat boards found only through search as unofficial.",
    indexable: true,
    verifiedForVersion: "[Northern Lands] title snapshot",
    evidenceLevel: "Legacy / Unconfirmed",
    confidence: "Low"
  },
  {
    path: "/discord/",
    kind: "status",
    title: "Dungeon Quest Reborn Discord: Invite Status & Safety",
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
    title: "Dungeon Quest Reborn Tier List: Ranking Method",
    description:
      "A progression-based DQR tier framework for spells, weapons, and builds with evidence, use cases, and version status beside every conclusion.",
    h1: "Dungeon Quest Reborn Tier List",
    eyebrow: "Meta board / under review",
    summary:
      "The overview separates early, mid, late, and endgame needs. It links to detailed data instead of duplicating the entire spell ranking.",
    quickAnswer:
      "No item has a site ranking yet. Compare the stated use case, progression stage, acquisition cost, weakness, and tested version before using any tier claim.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/updates/",
    kind: "update",
    title: "Dungeon Quest Reborn Update Status & Roblox Signals",
    description:
      "Track the latest Roblox metadata timestamp and dated guide changes without treating a platform signal as a gameplay patch note.",
    h1: "Dungeon Quest Reborn Updates",
    eyebrow: "Verification ledger",
    summary:
      "The latest public API timestamp confirms that the Roblox experience changed, but it does not say which gameplay systems changed.",
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
      "Start with the decisions that repeatedly appear in player questions: role choice, stat focus, reliable clears, upgrades, daily rewards, and when to ask a party for help.",
    quickAnswer:
      "Start with a survivable role and a repeatable dungeon route. Do not spend or copy a build until its current Reborn source, version, and use case are verified.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/weapons/",
    kind: "hub",
    title: "Dungeon Quest Reborn Weapons: Upgrade Checklist",
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
    title: "Dungeon Quest Reborn Armor: Upgrade Checklist",
    description:
      "Track DQR armor by slot, class, dungeon, rarity, level, set role, trade status, and current verification state.",
    h1: "Dungeon Quest Reborn Armor Database",
    eyebrow: "Equipment database",
    summary:
      "Compare slot, role, source, requirement, and availability before using an armor recommendation. Old-game set names are not treated as current Reborn data.",
    quickAnswer:
      "Prioritise the armor slot that fixes your current failure point, then compare source dungeon, requirement, and role fit before rarity or set claims.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/cosmetics/",
    kind: "hub",
    title: "Dungeon Quest Reborn Cosmetics: Source & Availability",
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
    title: "Dungeon Quest Reborn Builds: Role Planning Guide",
    description:
      "Find current DQR Mage, Warrior, Tank, and Healer builds with stat priorities, recommended spells, gear goals, progression stages, and alternatives.",
    h1: "Dungeon Quest Reborn Build Planning",
    eyebrow: "Role decision desk",
    summary:
      "Choose a job for the problem your party or solo run has now, then verify each spell and item before turning that outline into a fixed build.",
    quickAnswer:
      "Choose a role based on the way you clear dungeons, then connect spells, weapons, armor, and alternatives to a verified source instead of copying an old meta build.",
    indexable: false,
    verifiedForVersion: null
  },
  {
    path: "/builds/mage/",
    kind: "guide",
    title: "Dungeon Quest Reborn Mage Build Planning Guide",
    description:
      "Plan a DQR Mage loadout around room clear, boss damage, or support while current spell and gear details are still being checked.",
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
    title: "Dungeon Quest Reborn Warrior Build Planning Guide",
    description:
      "Plan a DQR Warrior loadout around the damage and survivability needed for the next repeatable dungeon clear.",
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
    title: "Dungeon Quest Reborn Tank Role Planning Guide",
    description:
      "Define the party damage and mechanic a defensive role must handle before choosing stats, gear, or utility skills.",
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
    title: "Dungeon Quest Reborn Healer Role Planning Guide",
    description:
      "Define when and why the party needs recovery or support before choosing spells, stats, and gear.",
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
    summary: "What the current site collects, what it does not collect, and which possible future features would require a policy update.",
    quickAnswer: "The current site has no accounts, comments, payments, marketplace, or player-data upload. Never enter Roblox credentials or private game data here.",
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
    summary: "How corrections are handled while the site does not yet operate a public support inbox.",
    quickAnswer: "There is no public inbox yet. Check the source policy to see what a correction needs: the page, claim, direct source, version, and date.",
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
    evidenceLevel: seed.evidenceLevel ?? "Legacy / Unconfirmed",
    confidence: seed.confidence ?? "Low",
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

export function getPlayerFacingStatus(page: SitePage): "Source checked" | "Gameplay details in review" | "Source check incomplete" | "Site information" {
  if (page.kind === "trust") return "Site information";
  if (page.dataState === "fetch_failed") return "Source check incomplete";
  if (page.dataState === "not_collected" || !page.verifiedForVersion) return "Gameplay details in review";
  return "Source checked";
}

export function isEvidenceLevel(value: string): value is EvidenceLevel {
  return EVIDENCE_LEVELS.includes(value as EvidenceLevel);
}
