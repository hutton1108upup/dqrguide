import { playerGuides } from "./player-guides";
import { LAST_RESEARCHED, officialGameSnapshot, sources } from "./game-data";
import type { DifferenceRow, FactClaim, FaqItem, PageSection, RelatedLink, SourceRecord, UpdateRecord } from "./types";

export interface PageContent {
  sections: PageSection[];
  faq: FaqItem[];
  related: RelatedLink[];
  sources: SourceRecord[];
  claims?: FactClaim[];
  differenceRows?: DifferenceRow[];
  updates?: UpdateRecord[];
}

const link = (href: string, label: string, description: string): RelatedLink => ({
  href,
  label,
  description
});

const fact = (input: Omit<FactClaim, "lastChecked">): FactClaim => ({
  ...input,
  lastChecked: LAST_RESEARCHED
});

const difference = (input: Omit<DifferenceRow, "lastChecked">): DifferenceRow => ({
  ...input,
  lastChecked: LAST_RESEARCHED
});

const update = (input: Omit<UpdateRecord, "lastChecked">): UpdateRecord => ({
  ...input,
  lastChecked: LAST_RESEARCHED
});

const officialUpdatedDate = officialGameSnapshot.robloxUpdatedAt.split("T", 1)[0];
const officialUpdatedTime = officialGameSnapshot.robloxUpdatedAt.split("T")[1]?.replace("Z", "").split(".", 1)[0] ?? "time not recorded";

const firstPass = (
  sections: PageSection[],
  faq: FaqItem[],
  related: RelatedLink[],
  sourceRecords: SourceRecord[] = [sources.officialExperience]
): PageContent => ({
  sections,
  faq,
  related,
  sources: sourceRecords
});

export const pageContentByPath: Record<string, PageContent> = {
  "/spells/phantom-flames/": playerGuides["/spells/phantom-flames/"].content,
  "/spells/infernal-orbs/": playerGuides["/spells/infernal-orbs/"].content,
  "/": {
    sections: [
      {
        id: "what-is-dqr",
        title: "What Is Dungeon Quest Reborn?",
        paragraphs: [
          "Dungeon Quest Reborn is a separate Roblox experience published by Delta Quarters OG. Its current first-party description presents it as a return to classic Dungeon Quest-style cooperative dungeon runs and states that it is officially licensed by Voldex.",
          "This site keeps Reborn records separate from original Dungeon Quest records. A familiar item name, dungeon, level, or strategy is not marked current until a Reborn-specific source supports it."
        ]
      },
      {
        id: "start-here",
        title: "Start Here",
        paragraphs: [
          "Use Dungeons when your question is what to run next, Drops when you already know the reward you want, and Spells when you are choosing a role. Status pages answer whether a code, board, invite, or ranking has enough evidence to publish."
        ],
        bullets: [
          "Progression decision → Dungeons",
          "Target-item lookup → Drops",
          "Role and ability planning → Spells",
          "Time-sensitive check → Codes, Trello, Discord, or Updates"
        ]
      },
      {
        id: "verified-status",
        title: "Current Verification Status",
        paragraphs: [
          "The official Roblox metadata identifies the live experience as [Northern Lands] Dungeon Quest Reborn and records a platform update timestamp of September 2, 2026 at 23:30:02 UTC. That timestamp proves the experience metadata changed; it does not prove a particular dungeon, balance change, drop, or code.",
          "Detailed game data stays in review until it can be checked in the current experience or corroborated by suitable evidence."
        ]
      }
    ],
    faq: [
      {
        question: "Is Dungeon Quest Reborn Guide an official site?",
        answer:
          "No. Dungeon Quest Reborn Guide is an independent fan reference and is not affiliated with Roblox, Voldex, or Delta Quarters OG."
      },
      {
        question: "Can original Dungeon Quest data be used here?",
        answer:
          "Only as legacy context. It is labelled unconfirmed until a Reborn-specific source or in-game check supports it."
      }
    ],
    related: [
      link("/differences/", "Reborn vs Original", "See what is confirmed and what still needs a transfer check."),
      link("/dungeons/", "Dungeon progression", "Choose a run from requirements and evidence, not a copied count."),
      link("/codes/", "Codes status", "Check the current first-party verification result.")
    ],
    sources: [sources.officialExperience, sources.officialGameApi],
    claims: [
      fact({ id: "home-identity", topic: "Identity", claim: "The current experience is a separate Roblox universe", value: "Universe 9931749389 / root place 77649408247578", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialGameApi.url, evidenceNote: "Direct Roblox Games API identity record; this does not prove gameplay parity." }),
      fact({ id: "home-update-signal", topic: "Freshness", claim: "Roblox metadata changed", value: "Updated 2026-09-02T23:30:02Z", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialGameApi.url, evidenceNote: "This is a platform metadata signal, not a patch-note summary." })
    ]
  },
  "/differences/": {
    sections: [
      {
        id: "quick-answer",
        title: "Quick Answer: Is Reborn a New Game?",
        paragraphs: [
          "Roblox identifies Reborn with its own universe ID and root place ID, so this guide treats it as a separate experience dataset. The experience page names Delta Quarters OG as creator and states that the game is officially licensed by Voldex."
        ]
      },
      {
        id: "confirmed-differences",
        title: "What Is Confirmed",
        paragraphs: [
          "The official page describes classic-inspired dungeons, abilities, weapons, armor, loot, solo play, and co-op play. The universe has separate place records for the main experience, a place named Level, and a 100+ Lobby.",
          "A place name alone does not establish a dungeon list, level requirement, or transfer rule."
        ],
        bullets: [
          "Universe ID: 9931749389",
          "Root Place ID: 77649408247578",
          "Creator: Delta Quarters OG",
          "Official description: licensed by Voldex"
        ]
      },
      {
        id: "transfer-boundary",
        title: "What Still Needs an In-Game Check",
        paragraphs: [
          "The checked public sources do not state that original levels, inventories, gamepasses, purchases, or cosmetics transfer. They also do not publish a system-by-system balance comparison.",
          "Until a first-party statement or current in-game observation answers those questions, the safe working rule is no assumed transfer."
        ]
      },
      {
        id: "player-expectations",
        title: "What Players Mean by Same as the Original",
        paragraphs: [
          "Recent player discussion shows that returning players use “same” in several different ways: familiar presentation, remembered progression, old dungeon layouts, or an expectation that Reborn should contain entirely new systems. Those reactions explain the search intent, but they do not prove feature-by-feature parity.",
          "Use the comparison table for confirmed public differences. Treat balance, difficulty, transfer, and quality-of-life claims as open questions until a current capture or first-party statement answers them."
        ],
        media: [{
          id: "differences-official-ogr-art",
          type: "image",
          src: "/images/dqr/official-ogr-forest.png",
          title: "Official Dungeon Quest OGR experience artwork",
          alt: "Dungeon Quest OGR shield over a painted forest path",
          caption: "Official experience artwork. It establishes the current OGR presentation, not account transfer or gameplay parity.",
          sourceURL: sources.officialThumbnailApi.url,
          evidenceLevel: "Official",
          claimIds: ["differences-universe"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: "[Northern Lands] title snapshot"
        }]
      }
    ],
    faq: [
      {
        question: "Do original levels and items transfer to Reborn?",
        answer:
          "Not confirmed by the checked first-party sources. Open the current experience before planning around a transfer."
      },
      {
        question: "Is Reborn officially licensed?",
        answer:
          "Yes. The current Roblox experience description says Dungeon Quest Reborn is officially licensed by Voldex."
      }
    ],
    related: [
      link("/", "Wiki home", "Return to the source-labelled task hub."),
      link("/gamepasses/", "Gamepasses", "Keep original purchases separate from current Reborn records."),
      link("/updates/", "Update ledger", "See which first-party timestamps have been checked.")
    ],
    sources: [sources.officialExperience, sources.officialGameApi, sources.officialPlacesApi, sources.originalExperience, sources.originalGameApi, sources.originalPlacesApi, sources.originalPassesApi, sources.officialThumbnailApi, sources.redditDifferencesDiscussion],
    claims: [
      fact({ id: "differences-universe", topic: "Experience identity", claim: "Reborn has its own Roblox universe and root place", value: "Reborn: universe 9931749389 / place 77649408247578", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialGameApi.url, evidenceNote: "The first-party API supplies a distinct universe and root place." }),
      fact({ id: "differences-original-universe", topic: "Original identity", claim: "The original experience is a different Roblox universe", value: "Original: universe 848145103 / place 2414851778", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "Dungeon Quest! RPG Adventure API snapshot", sourceURL: "https://games.roblox.com/v1/games?universeIds=848145103", evidenceNote: "The first-party API identifies the original experience and its root place separately." }),
      fact({ id: "differences-transfer", topic: "Account transfer", claim: "Levels, equipment, Gamepass ownership, trading, and system parity are not documented by the checked public sources", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialExperience.url, evidenceNote: "Separate universe identity is not proof of a transfer rule or a system-by-system comparison; current in-game checks are still required." })
    ],
    differenceRows: [
      difference({ id: "diff-universe", topic: "Universe", claim: "Public Roblox identity", value: "Different universe IDs", originalValue: "848145103", rebornValue: "9931749389", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "2026-09-02 API snapshots", sourceURL: sources.originalGameApi.url, evidenceNote: "The original and Reborn first-party API records identify different Roblox universes; the Reborn record is also listed in the page sources." }),
      difference({ id: "diff-root-place", topic: "Root place", claim: "Public Roblox identity", value: "Different root place IDs", originalValue: "2414851778", rebornValue: "77649408247578", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "2026-09-02 API snapshots", sourceURL: sources.originalGameApi.url, evidenceNote: "Each first-party universe API record returns a different root place." }),
      difference({ id: "diff-secondary-places", topic: "Universe places", claim: "Public place records", value: "Different child place records", originalValue: "Level 14363263080; 100+ 14363264964; Temp Asset Extraction 17428284628", rebornValue: "Level 85776757589518; 100+ Lobby 115445507767090", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "2026-09-02 place snapshots", sourceURL: sources.originalPlacesApi.url, evidenceNote: "The public place listings are different. A place name is not proof of a dungeon, level requirement, or transfer rule." }),
      difference({ id: "diff-account-data", topic: "Account data", claim: "Levels, inventory, and quest progress transfer", value: "Not documented", originalValue: "No public transfer field", rebornValue: "No public transfer field", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "The checked public pages do not state whether account data is shared; verify in the current experience." }),
      difference({ id: "diff-level-scope", topic: "Level scope", claim: "Public dungeon count", value: "Descriptions expose different detail", originalValue: "Original description lists 17 unique dungeons", rebornValue: "Reborn description does not list a count", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "2026-09-02 page snapshots", sourceURL: sources.originalExperience.url, evidenceNote: "This is a difference in public descriptions, not proof of the current playable dungeon count." }),
      difference({ id: "diff-equipment", topic: "Equipment", claim: "Weapon and armor parity", value: "Not documented", originalValue: "Weapons and armor mentioned at a high level", rebornValue: "Weapons and armor mentioned at a high level", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "Shared wording does not establish shared inventories, item stats, or drop tables." }),
      difference({ id: "diff-gamepasses", topic: "Gamepasses", claim: "Public pass records and storefront state", value: "Different technical snapshots", originalValue: "Named passes including Extra Item!, 2x Gold, and VIP; several marked for sale", rebornValue: "hi, DailyRefresh, Gold1–Gold5; all returned not for sale with no public price", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "2026-09-02 API snapshots", sourceURL: sources.originalPassesApi.url, evidenceNote: "This compares public API records only; it does not establish current in-client ownership or purchase behavior." }),
      difference({ id: "diff-trading", topic: "Trading", claim: "Trading rules and item eligibility parity", value: "Not documented", originalValue: "No public rule in checked sources", rebornValue: "No public rule in checked sources", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "A current in-game observation is required before publishing a trading comparison." }),
      difference({ id: "diff-systems", topic: "Systems", claim: "Classes, abilities, cosmetics, and solo/co-op wording", value: "Public descriptions differ", originalValue: "Classes, cosmetics, and Notify/FOLLOW wording", rebornValue: "Unlock abilities, rare weapons/armor/loot, solo or co-op wording", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "2026-09-02 page snapshots", sourceURL: sources.originalExperience.url, evidenceNote: "These are public listing-description differences, not a complete system or balance comparison." })
    ]
  },
  "/gamepasses/": {
    sections: [
      {
        id: "buy-first",
        title: "Best Gamepass to Buy First",
        paragraphs: [
          "No purchase order is published yet. A recommendation needs the current user-facing name, price, currency, exact effect, sale state, and a measurable progression bottleneck."
        ]
      },
      {
        id: "api-snapshot",
        title: "Current Public API Snapshot",
        paragraphs: [
          "The official universe game-pass endpoint returned technical records named hi, DailyRefresh, and Gold1 through Gold5 during this check. Every returned entry was marked not for sale and had no public price in that response.",
          "Those internal-looking labels are not rewritten into polished product names, effects, or value claims."
        ]
      },
      {
        id: "decision-checklist",
        title: "Purchase Decision Checklist",
        paragraphs: [
          "Before spending, confirm the current storefront inside the experience and ask whether the benefit saves time on the activity you actually repeat. Free players should prioritise stable build and route improvements before treating any paid boost as required."
        ],
        bullets: ["Current name and price", "Gold, Robux, or another currency", "Exact effect", "Sale and permanence status", "Best progression stage"]
      },
      {
        id: "changing-gold-price",
        title: "Why the Gold Price Can Change",
        paragraphs: [
          "Community videos show a Gold-facing Gamepass screen, while one Reddit report says the displayed cost increased as the account progressed. Together they make level or progression context a required field for every future price capture; they do not establish a universal scaling formula.",
          "Before comparing prices, record the account level, current dungeon stage, displayed currency, exact storefront label, server date, and whether the same screen changes after progression. Until two controlled captures reproduce the behavior, the site will not publish a fixed cost or “buy before level X” instruction."
        ],
        bullets: ["Capture the same pass at two progression stages", "Record level and unlocked dungeon", "Separate Gold price from Robux-to-Gold purchases", "Do not infer the effect from an API label"],
        media: [{
          id: "gamepasses-storefront-video",
          type: "youtube",
          videoId: "8ZVfKMwvWoo",
          title: "Gamepass storefront walkthrough",
          alt: "Video preview for a Dungeon Quest Reborn Gamepass storefront walkthrough",
          caption: "Community demonstration, not a current price guarantee. The video is useful for locating the Gold-facing screen; every price and effect still needs an account-context capture.",
          sourceURL: sources.gamePassVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: ["gamepasses-gold-screen", "gamepasses-price"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null,
          startSeconds: 8
        }]
      }
    ],
    faq: [
      {
        question: "Are DQR gamepasses bought with Gold or Robux?",
        answer: "Not yet verified from a current user-facing purchase screen."
      },
      {
        question: "Why is this page not ranking the passes?",
        answer:
          "The public API snapshot does not expose enough current effect and price information to support a responsible purchase order."
      }
    ],
    related: [
      link("/differences/", "Reborn differences", "Do not assume original purchases transfer."),
      link("/dungeons/", "Dungeon progression", "Improve the run decision before buying around it."),
      link("/updates/", "Update ledger", "Watch for source-backed economy changes.")
    ],
    sources: [sources.officialPassesApi, sources.officialGameApi, sources.gamePassVideo, sources.gamePassPriceReport],
    claims: [
      fact({ id: "gamepasses-api-records", topic: "Gamepasses", claim: "The public API returned technical pass labels", value: "hi, DailyRefresh, Gold1–Gold5", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialPassesApi.url, evidenceNote: "The API response returned these names with no public price and not-for-sale status; they are not purchase recommendations." }),
      fact({ id: "gamepasses-price", topic: "Purchase data", claim: "Current user-facing price, currency, and effect are available", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialPassesApi.url, evidenceNote: "The technical response does not supply enough storefront context to publish a buy order." }),
      fact({ id: "gamepasses-gold-screen", topic: "Community storefront view", claim: "A Gold-facing Gamepass screen appears in current community videos", value: "Reported; account context not reproduced", claimStatus: "reported", confidence: "Medium", verifiedForVersion: null, sourceURL: sources.gamePassVideo.url, evidenceNote: "The video visibly demonstrates the screen, but price, effect, progression context, and persistence still require a controlled in-game capture." }),
      fact({ id: "gamepasses-dynamic-price", topic: "Price behavior", claim: "The displayed Gold price rises with account progression", value: "Single player report", claimStatus: "reported", confidence: "Low", verifiedForVersion: null, sourceURL: sources.gamePassPriceReport.url, evidenceNote: "A single report defines a testable question and does not establish a formula or universal behavior." })
    ]
  },
  "/spells/": playerGuides["/spells/"].content,
  "/spell-tier-list/": {
    sections: [
      {
        id: "summary",
        title: "Tier List Summary",
        paragraphs: ["No ability has earned a site tier yet. A letter grade needs a current name, source, use case, weakness, alternative, and repeatable result."]
      },
      {
        id: "method",
        title: "How We Rank DQR Spells",
        paragraphs: ["A grade must state its use case, weakness, drop source, progression stage, alternative, and tested version."],
        bullets: ["Room-clear consistency", "Boss contribution", "Solo survivability", "Party utility", "Acquisition cost", "Current-version evidence"]
      },
      {
        id: "next-review",
        title: "What Enters the First Review",
        paragraphs: ["Only abilities with a verified Reborn name and source can enter. Repeatable current-version observations are required before performance claims move beyond community-confirmed status."]
      },
      {
        id: "video-rankings",
        title: "Why Video Rankings Are Not Final",
        paragraphs: [
          "A current video demonstrates named buff abilities and narrates large percentage gains. That makes the names and visible behavior useful research leads, but it does not prove a universal tier, exact current percentage, rarity, source, or performance across every build.",
          "A publishable grade needs the current ability card, two or more repeatable runs in a named use case, the alternative it replaces, and the version date. Until then, the video remains linked as Community Confirmed context and the tier board stays empty."
        ],
        media: [{
          id: "spell-tier-observation-video",
          type: "youtube",
          videoId: "I11sThLGWJs",
          title: "Inner Focus and Inner Rage demonstration",
          alt: "Video preview showing two Dungeon Quest Reborn buff abilities",
          caption: "Community demonstration only. Narrated percentages and “best” claims require current cards and repeatable tests before ranking.",
          sourceURL: sources.spellTierVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: ["spell-tier-ranking"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null,
          startSeconds: 43
        }]
      }
    ],
    faq: [
      { question: "What is the best DQR spell right now?", answer: "No overall winner has enough current evidence to publish yet." },
      { question: "Can a support spell rank highly?", answer: "Yes. Grades are use-case specific and can reflect party utility rather than raw damage." }
    ],
    related: [
      link("/spells/", "Spell database", "Use the objective role and source fields first."),
      link("/tier-list/", "Overall tier review", "Compare progression categories without duplicating the spell board."),
      link("/updates/", "Change ledger", "A balance claim needs a traceable version change.")
    ],
    sources: [sources.officialExperience, sources.spellTierVideo],
    claims: [
      fact({ id: "spell-tier-ranking", topic: "Ranking", claim: "A current global spell ranking is ready to publish", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "No repeatable current-version performance sample is available." })
    ]
  },
  "/trading/": {
    sections: [
      {
        id: "requirements",
        title: "Trading Unlock Requirements",
        paragraphs: ["The current public first-party sources checked here do not state a trading unlock level or eligibility rule. Verify access inside the current experience before following a legacy guide."]
      },
      {
        id: "safe-flow",
        title: "Safe Trade Flow",
        paragraphs: ["Confirm the player, inspect the complete offer, and re-check every slot after any item changes. Do not treat urgency, screenshots, or an asking price as proof."],
        bullets: ["Verify the destination player", "Add only the agreed items", "Review after every change", "Read the final confirmation", "Keep account credentials private"]
      },
      {
        id: "value-evidence",
        title: "How to Check an Item's Value",
        paragraphs: ["A useful value range needs accepted trades, sample size, date window, and confidence. This page does not publish a static list because asking prices and screenshots are not completed trades."]
      },
      {
        id: "blocked-trade",
        title: "Why a Trade Can Be Blocked",
        paragraphs: [
          "A current Reborn community walkthrough shows trades starting from the player list and reports that progression can restrict higher-content equipment or Gold transfers. That is a useful diagnostic lead, not a verified unlock table.",
          "When a trade fails, record the sender and receiver progression stage, item source dungeon, item level, offered Gold, visible error text, and whether the system is enabled on both accounts. Publish a rule only after the same restriction is reproduced with controlled accounts."
        ],
        bullets: ["Capture the exact error text", "Re-test with a same-stage item", "Change one condition at a time", "Never share credentials or use an off-platform middleman"],
        media: [{
          id: "trading-flow-video",
          type: "youtube",
          videoId: "NE4Xebb7LFg",
          title: "Trade flow walkthrough",
          alt: "Video preview for a Dungeon Quest Reborn trading walkthrough",
          caption: "Community demonstration of the player-list trade flow. Reported progression restrictions remain unverified until reproduced in-game.",
          sourceURL: sources.tradingVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: ["trading-flow", "trading-unlock"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null,
          startSeconds: 20
        }]
      }
    ],
    faq: [
      { question: "Why is trading not working?", answer: "Possible causes include an unmet current requirement, an ineligible item, a full slot, or a disabled system; the exact rule still needs an in-game check." },
      { question: "Does Dungeon Quest Reborn Guide sell or broker items?", answer: "No. This fan guide does not operate a market or request account access." }
    ],
    related: [
      link("/drops/", "Drop sources", "Check where an item is known to come from."),
      link("/discord/", "Discord safety", "Verify the community destination before discussing a trade."),
      link("/differences/", "Reborn boundaries", "Do not import original-game value assumptions.")
    ],
    sources: [sources.officialExperience, sources.tradingVideo],
    claims: [
      fact({ id: "trading-unlock", topic: "Trading access", claim: "The public first-party sources state the current trading unlock rule", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "A current in-game check is required before publishing a level or eligibility rule." }),
      fact({ id: "trading-flow", topic: "Community trade flow", claim: "A current community video opens trade from the player list", value: "Reported demonstration", claimStatus: "reported", confidence: "Medium", verifiedForVersion: null, sourceURL: sources.tradingVideo.url, evidenceNote: "The visible flow is useful for reproduction; account and item restrictions remain unverified." }),
      fact({ id: "trading-safety", topic: "Trade safety", claim: "Re-checking the final offer is a safe process recommendation", value: "Process guidance only", claimStatus: "reported", confidence: "Medium", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "This is editorial safety guidance, not a claim about a specific game mechanic." })
    ]
  },
  "/dungeons/": playerGuides["/dungeons/"].content,
  "/dungeons/winter-outpost/": playerGuides["/dungeons/winter-outpost/"].content,
  "/dungeons/northern-lands/": playerGuides["/dungeons/northern-lands/"].content,
  "/drops/": playerGuides["/drops/"].content,
  "/codes/": {
    sections: [
      {
        id: "active-codes",
        title: "Active Dungeon Quest Reborn Codes",
        paragraphs: ["No active code is published. The first-party experience page and public game metadata reviewed on September 3, 2026 did not provide a confirmed code list or a confirmed redemption path."]
      },
      {
        id: "redemption-system",
        title: "Does DQR Have a Code Redemption System?",
        paragraphs: ["Not confirmed from the sources available for this check. This is an evidence limit, not a claim that the live client definitely has no menu. A future code will be listed only with its exact source and check date."]
      },
      {
        id: "wrong-game",
        title: "Dungeon Lootr Codes vs DQR Codes",
        paragraphs: ["Dungeon Lootr is a different game. Codes labelled for another experience are not copied into this page, and an unverified string never receives a Copy button."]
      },
      {
        id: "future-code-gate",
        title: "How a Future Code Gets Published",
        paragraphs: ["A future row needs the exact string, a direct announcement or current redemption capture, reward text, successful claim state, expiry status, version, and check date. Discovery in Discord or a video is only the first step; the code remains unlisted until the current client accepts it."],
        bullets: ["Direct announcement or current UI", "Exact string and reward", "Successful current-client claim", "Expiry and version", "No Copy button before verification"]
      }
    ],
    faq: [
      { question: "Are there any active DQR codes?", answer: "None were confirmed on the official Roblox page or public game API checked on September 3, 2026." },
      { question: "When will this page change?", answer: "When a first-party announcement or a verifiable current redemption flow provides evidence." }
    ],
    related: [
      link("/updates/", "Update ledger", "Check the latest source verification event."),
      link("/trello/", "Trello status", "Use verified update sources while a board remains unconfirmed."),
      link("/discord/", "Discord status", "Check the invite verification boundary.")
    ],
    sources: [sources.officialExperience, sources.officialGameApi],
    claims: [
      fact({ id: "codes-active", topic: "Active codes", claim: "A current official redemption code is confirmed", value: "0 confirmed", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialExperience.url, evidenceNote: "The checked first-party page and metadata do not expose an active code or redemption path; this is not proof that no client menu exists." }),
      fact({ id: "codes-redemption", topic: "Redemption system", claim: "The current redemption flow is documented", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "No current public first-party redemption instructions were available." })
    ]
  },
  "/trello/": playerGuides["/trello/"].content,
  "/discord/": {
    sections: [
      {
        id: "current-link",
        title: "Current DQR Discord Link",
        paragraphs: ["Community candidate: discord.gg/dqr. The public invite currently resolves to a DQR-branded server, but this page does not present it as an official Join button until an eligible first-party Roblox social-link view or developer statement confirms ownership."]
      },
      {
        id: "visibility",
        title: "Why a Social Link May Not Be Visible",
        paragraphs: ["Roblox support says experience and community social links can be shown only to eligible, age-checked users aged 16 or older, with availability varying by country. Missing visibility is therefore not proof that no community link exists."]
      },
      {
        id: "safety",
        title: "Discord Trading Safety",
        paragraphs: ["Verify the destination from a current first-party surface, keep passwords and session tokens private, and treat direct-message urgency, download links, and middleman claims as risk signals."]
      },
      {
        id: "invite-candidate",
        title: "Community Invite Candidate",
        paragraphs: [
          "The public invite discord.gg/dqr currently resolves to a DQR-branded community, and several independent current videos point to the same vanity code. This confirms a working community destination, but it does not by itself prove developer ownership.",
          "Roblox limits experience social-link visibility to eligible age-checked users, and the logged-out public endpoint did not expose the destination during this review. The safe status is therefore Community Confirmed / first-party capture pending. Check that the invite preview still names the DQR community before joining."
        ],
        bullets: ["Candidate invite: discord.gg/dqr", "Public invite resolves", "First-party Roblox capture still pending", "Never enter a Roblox password or session token"],
        media: [{
          id: "discord-official-art",
          type: "image",
          src: "/images/dqr/official-game-icon.png",
          title: "Dungeon Quest Reborn official game icon",
          alt: "Dungeon Quest Reborn shield game icon",
          caption: "Official game icon shown only as an identity check. A matching logo does not make a Discord invite official.",
          sourceURL: sources.officialExperience.url,
          evidenceLevel: "Official",
          claimIds: ["discord-link"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: "[Northern Lands] title snapshot"
        }]
      }
    ],
    faq: [
      { question: "Why is there no Join button?", answer: "The official destination could not be confirmed from a first-party public URL during this check." },
      { question: "Can social links be age-gated on Roblox?", answer: "Yes. Roblox says eligible age-checked 16+ users may see social links, subject to country eligibility." }
    ],
    related: [
      link("/trello/", "Trello status", "Apply the same direct-source rule to boards."),
      link("/trading/", "Trading guide", "Use the safety checklist before any item discussion."),
      link("/updates/", "Updates", "Use first-party change signals while invites are unverified.")
    ],
    sources: [sources.officialExperience, sources.robloxSocialLinks, sources.discordInviteApi],
    claims: [
      fact({ id: "discord-link", topic: "Official Discord", claim: "A first-party Discord invite is publicly visible", value: "Not confirmed", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "A missing public link is not proof that no community exists; Roblox social links can be age-gated." }),
      fact({ id: "discord-community-candidate", topic: "Community invite", claim: "discord.gg/dqr resolves to a DQR-branded community", value: "Working community candidate", claimStatus: "reported", confidence: "Medium", verifiedForVersion: null, sourceURL: sources.discordInviteApi.url, evidenceNote: "The public Discord preview confirms the destination works; an eligible first-party Roblox link or developer statement is still required for Official status." }),
      fact({ id: "discord-visibility", topic: "Social links", claim: "Roblox social links can be age-gated", value: "Eligible age-checked users may see them", claimStatus: "confirmed", confidence: "High", verifiedForVersion: null, sourceURL: sources.robloxSocialLinks.url, evidenceNote: "Roblox Support documents age and country eligibility limits for experience social links." })
    ]
  },
  "/tier-list/": {
    sections: [
      {
        id: "meta-summary",
        title: "Overall Meta Summary",
        paragraphs: ["No weapon, spell, or build has earned a site tier yet. A grade needs a named use case, weakness, obtainable source, alternative, version, and repeatable result."]
      },
      {
        id: "progression",
        title: "Rank by Progression Stage",
        paragraphs: ["A future overview will separate early, mid, late, and endgame needs. Ease of acquisition and reliable clears matter alongside peak output."],
        bullets: ["Early — access and consistency", "Mid — upgrade path", "Late — role specialisation", "Endgame — repeatable current-version performance"]
      },
      {
        id: "publication-gate",
        title: "When a Ranking Is Ready",
        paragraphs: ["Every conclusion needs a named use case, weakness, source, alternative, version, and evidence level. The overall page summarises verified results and links to detail; it does not duplicate the spell board."]
      },
      {
        id: "roundup-video-boundary",
        title: "Why Roundup Videos Are Not a Tier List",
        paragraphs: ["A video title such as “best weapon” or “meta spell” is an opinion tied to one account, build, route, and recording date. This page will not embed roundup videos until the underlying weapon, ability, and build rows can explain where the conclusion applies and where it fails."]
      }
    ],
    faq: [
      { question: "What is the best weapon in DQR?", answer: "No current weapon winner is published without repeatable evidence." },
      { question: "Why split tier lists by stage?", answer: "A scarce endgame option may be a poor recommendation for a player who needs reliable early progression." }
    ],
    related: [
      link("/spell-tier-list/", "Spell tiers", "Open the ability-specific method."),
      link("/spells/", "Spell data", "Check objective fields before a grade."),
      link("/dungeons/", "Dungeon progression", "Connect recommendations to obtainable sources.")
    ],
    sources: [sources.officialExperience],
    claims: [
      fact({ id: "tier-ranking", topic: "Tier ranking", claim: "A repeatable current-version weapon, spell, or build ranking is ready", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "No current performance sample or complete entity data is available." })
    ]
  },
  "/updates/": {
    sections: [
      {
        id: "latest-signal",
        title: "Latest Verified Update Signal",
        paragraphs: [`Roblox public game metadata currently reports ${officialGameSnapshot.robloxUpdatedAt} for ${officialGameSnapshot.name}.`, "This confirms a platform metadata change and the current title; it does not identify the gameplay changes inside that update."]
      },
      {
        id: "change-log",
        title: "What Changed on Dungeon Quest Reborn Guide",
        paragraphs: ["September 2, 2026 — recorded the first official experience snapshot, separated Reborn from legacy data, and marked unanswered questions for codes, social links, passes, dungeons, spells, and tiers."]
      },
      {
        id: "editorial-rules",
        title: "Update Ledger Rules",
        paragraphs: ["A patch-note entry needs a direct source, source date, affected pages, and an editorial verification date. Build time does not change dateModified, and a metadata timestamp never becomes an invented balance summary."]
      },
      {
        id: "community-demonstrations",
        title: "Northern Lands Community Demonstrations",
        paragraphs: [
          "Current community videos visibly demonstrate Northern Lands runs, so they can support a labelled observation queue for routes and telegraphs. They cannot identify the developer's full change list, release notes, balance intent, or exact drop table.",
          "The update ledger therefore keeps three layers separate: the official Roblox title and timestamp, any future first-party announcement body, and community demonstrations linked to the affected guide."
        ],
        media: [{
          id: "updates-current-art",
          type: "image",
          src: "/images/dqr/official-cavern-boss.png",
          title: "Official Dungeon Quest Reborn battle artwork",
          alt: "Armored Dungeon Quest Reborn player facing a large purple cavern creature",
          caption: "Official promotional artwork from the current experience. The API supplies no dungeon, boss, or update name for this scene.",
          sourceURL: sources.officialThumbnailApi.url,
          evidenceLevel: "Official",
          claimIds: ["updates-metadata-signal"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: "[Northern Lands] title snapshot"
        }]
      }
    ],
    faq: [
      { question: "Was Northern Lands added at this API update time?", answer: "The metadata confirms the current title and update timestamp, not the exact release contents." },
      { question: "Why are there no copied patch notes?", answer: "No first-party patch-note body was available in the checked public sources." }
    ],
    related: [
      link("/dungeons/northern-lands/", "Northern Lands", "See what the current label proves and what remains unknown."),
      link("/codes/", "Codes status", "Track the first-party verification boundary."),
      link("/trello/", "Trello status", "Use direct sources rather than copied roadmaps.")
    ],
    sources: [sources.officialGameApi, sources.officialExperience, sources.officialThumbnailApi, sources.northernLandsVideo, sources.northernLandsWalkthrough],
    claims: [
      fact({ id: "updates-metadata-signal", topic: "Platform signal", claim: `Roblox metadata changed on ${officialUpdatedDate}`, value: officialGameSnapshot.robloxUpdatedAt, claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialGameApi.url, evidenceNote: `The API reports ${officialUpdatedTime} UTC; it does not identify a gameplay change.` }),
      fact({ id: "updates-patch-notes", topic: "Patch notes", claim: "A first-party patch-note body is available", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "No first-party patch-note body was found in the checked public surfaces." }),
      fact({ id: "updates-community-video", topic: "Community demonstration", claim: "Current videos demonstrate Northern Lands gameplay", value: "Reported observation source", claimStatus: "reported", confidence: "Medium", verifiedForVersion: "[Northern Lands] community video snapshot", sourceURL: sources.northernLandsVideo.url, evidenceNote: "This supports an affected-guide research queue, not a developer-authored patch-note body." })
    ],
    updates: [
      update({ id: `update-metadata-${officialUpdatedDate}`, topic: "Roblox metadata signal", claim: "The public Reborn metadata changed", value: `Current title ${officialGameSnapshot.name}; updated ${officialGameSnapshot.robloxUpdatedAt}`, versionTitle: officialGameSnapshot.name, publishedDate: officialUpdatedDate, actualChanges: "The public API reports the current title and an updated timestamp. No gameplay change, dungeon change, spell change, or patch-note body is stated.", sourceURL: sources.officialGameApi.url, claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", evidenceNote: "This is a metadata signal, not a patch note. No affected game pages are inferred.", affectedPaths: [], recordType: "metadata_signal" }),
      update({ id: "update-patch-notes-2026-09-02", topic: "First-party patch notes", claim: "A public first-party gameplay update body is available", value: "Not collected", versionTitle: "No patch-note version published", publishedDate: "2026-09-02", actualChanges: "No actual gameplay changes can be listed until a first-party patch-note body or current in-game change record is available.", sourceURL: sources.officialExperience.url, claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, evidenceNote: "No patch summary is shown because a metadata timestamp does not identify gameplay changes.", affectedPaths: [], recordType: "metadata_signal" })
    ]
  },
  "/beginner-guide/": firstPass(
    [
      {
        id: "first-ten-minutes",
        title: "Your First Ten Minutes",
        paragraphs: [
          "Start by confirming that the Roblox listing and Place ID match Reborn, then learn one complete lobby-to-reward loop before chasing a rare item. Read the labels on your current weapon, armor, abilities, skill-point screen, upgrade station, dungeon selector, and reward screen.",
          "Community demonstrations consistently separate Physical-focused and Spell-focused damage paths, but the site does not turn a narrated value into a current stat rule. Use the visible item and skill-point fields on your own account as the source of truth."
        ],
        bullets: ["Confirm Place 77649408247578", "Choose one visible damage path", "Enter a manageable displayed difficulty", "Compare the reward with the slot it would replace", "Change one thing before the next run"],
        media: [{
          id: "beginner-overview-video",
          type: "youtube",
          videoId: "Hxhu-1QJK0Y",
          title: "First-run stats and equipment guide",
          alt: "Video preview for a Dungeon Quest Reborn beginner guide",
          caption: "Community walkthrough of visible stats, items, skills, and upgrades. Menu labels and values remain subject to the current live client.",
          sourceURL: sources.beginnerVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: [],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null,
          startSeconds: 34
        }]
      },
      {
        id: "progression-loop",
        title: "Build a Repeatable Progression Loop",
        paragraphs: ["A useful beginner route connects the next dungeon, the item or ability it can provide, and the upgrade that makes the next clear more reliable. Repeat the same route after one deliberate change so you can tell whether the change actually helped."],
        bullets: ["Run for a stated purpose, not just the highest visible name.", "Keep a fallback route when a clear is inconsistent.", "Separate confirmed requirements from remembered original-game values."]
      },
      {
        id: "stuck-checklist",
        title: "If Progress Stops",
        paragraphs: [
          "A recent Reddit help thread centres on a player stuck at a boss and contains suggestions about learning telegraphs, survivability, daily rewards, and repeating earlier content. Because the sample is small and the advice conflicts, the useful takeaway is a troubleshooting order rather than a universal build.",
          "First identify whether time, ordinary rooms, a specific boss cue, or one-hit damage ends the run. Then practise the same difficulty, test one survivability change, collect the currently visible daily reward if available, or move to a party. Do not change the route, build, and difficulty at the same time."
        ],
        bullets: ["Time runs out → improve route and room clear", "Normal rooms fail → practise pulls and area coverage", "One boss cue fails → isolate and repeat the tell", "One hit ends the run → test survivability", "Solo remains inconsistent → compare a party run"]
      },
      {
        id: "avoid-early-mistakes",
        title: "Mistakes to Avoid Early",
        paragraphs: ["Do not spend on an unverified Gamepass, copy a legacy tier list, or assume an original-game item transfers. Those decisions can be revisited when a current source is added to the relevant page."],
        bullets: ["No copied code strings.", "No guessed drop rates.", "No build recommendation without a source, version, and use case.", "No rarity-only upgrade decision."]
      }
    ],
    [
      { question: "What should a new player do first?", answer: "Learn the basic loop, choose a role, and establish a repeatable dungeon route before chasing unverified items or rankings." },
      { question: "What should I check when a dungeon feels impossible?", answer: "Identify whether the failure is time, rooms, one boss cue, or survivability, then change one variable and repeat the same run." },
      { question: "Can I use an original Dungeon Quest beginner guide?", answer: "Only for broad legacy context. Reborn requirements, drops, and progression should be checked separately." }
    ],
    [link("/dungeons/", "Dungeon progression", "Choose the next run by evidence and clear consistency."), link("/spells/", "Spell database", "Match a role before copying a skill claim."), link("/differences/", "Reborn vs Original", "Keep legacy assumptions separate.")],
    [sources.officialExperience, sources.beginnerVideo, sources.progressionVideo, sources.redditStuckDiscussion]
  ),
  "/weapons/": firstPass(
    [
      { id: "weapon-index", title: "What the Weapon Index Will Answer", paragraphs: ["The database is designed to answer which class uses a weapon, where it comes from, what requirement it has, and whether it is useful for a stated progression stage. Empty fields stay empty until a Reborn source is checked."], bullets: ["Name and class", "Source dungeon and difficulty", "Requirement, rarity, tier, and last verified version"] },
      { id: "compare-upgrades", title: "Compare an Upgrade", paragraphs: ["A meaningful upgrade compares the current weapon with the next obtainable option, not with an isolated rarity label. The published row will show the source and the reason the replacement changes a real run."], bullets: ["Can you obtain it now?", "Does it solve damage, clear speed, or survivability?", "Is the comparison from Reborn rather than the original game?"] },
      { id: "entity-pipeline", title: "What Is Still Missing", paragraphs: ["A useful weapon entry needs a current name and item card, an obtainable source, the version and check date, and a clear reason to compare it with another option. Those details have not been collected yet."] },
      {
        id: "weapon-showcase",
        title: "Community Weapon Showcase",
        paragraphs: ["A current Northern Lands video shows named high-end weapons and a player testing a stronger setup. It is useful for choosing item-card capture targets, but the creator's “best” framing and assisted progression do not establish a universal tier or source."],
        media: [{
          id: "weapons-community-video",
          type: "youtube",
          videoId: "yGfElxJ8hKs",
          title: "Northern Lands weapon showcase",
          alt: "Video preview for a Dungeon Quest Reborn Northern Lands weapon showcase",
          caption: "Community showcase, not a tier result. Record the full current item cards and source before creating weapon rows.",
          sourceURL: sources.weaponsVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: [],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: "[Northern Lands] community video snapshot"
        }]
      }
    ],
    [
      { question: "Are weapon stats published yet?", answer: "No Reborn-specific stat row is published in this first pass without a current source and a repeatable use case." },
      { question: "Why is there no weapon detail page?", answer: "The project creates entity URLs only when the evidence and internal-link gate is met, so empty templates do not become search pages." }
    ],
    [link("/drops/", "Drop tables", "Trace a target item back to a source dungeon."), link("/builds/", "Build hub", "Connect equipment to a role and progression stage."), link("/tier-list/", "Tier method", "See what a current ranking must prove.")],
    [sources.officialExperience, sources.weaponsVideo]
  ),
  "/armor/": firstPass(
    [
      { id: "armor-fields", title: "Armor Fields", paragraphs: ["Each armor row will separate slot, class, source dungeon, rarity, requirement, set role, trade status, version, and last verification. This prevents an original-game set name from silently becoming current Reborn data."], bullets: ["Slot and role", "Source and availability", "Requirement and trade status", "Version and evidence state"] },
      { id: "survivability-first", title: "Choose Armor by the Failure You Need to Fix", paragraphs: ["The useful armor question is not simply which set has the highest label. It is which verified option fixes the failure that blocks your next consistent clear, and what alternative is obtainable before it."], bullets: ["Survive the mechanic you currently miss.", "Prefer a reachable source over a copied endgame target.", "Record the alternative when the primary drop is uncertain."] },
      { id: "publication-queue", title: "What Is Still Missing", paragraphs: ["A useful armor row needs the current item card, source, requirement, role, version, and check date. A standalone page also needs enough distinct information to help with a real equipment decision."] },
      { id: "armor-capture-set", title: "Screenshot Set Required", paragraphs: ["A useful armor record needs the full item card, the equipped comparison, and the dungeon reward or trade context that produced it. A cropped stat number or video narration cannot establish the armor name, slot, source, role, or current version."], bullets: ["Full item card", "Equipped before-and-after comparison", "Reward or trade source", "Difficulty and date", "No inferred set bonus"] }
    ],
    [
      { question: "Does the armor database contain original-game sets?", answer: "No. Original-game references remain separate context and are not exposed as current Reborn armor." },
      { question: "What makes an armor row publishable?", answer: "A verified name and source, a useful role or progression explanation, current version and date, and enough internal links to support the answer." }
    ],
    [link("/dungeons/", "Dungeon progression", "Start from an obtainable source."), link("/drops/", "Drop tables", "Search by item source when records arrive."), link("/builds/", "Build hub", "Place armor in a role and stage.")]
  ),
  "/cosmetics/": firstPass(
    [
      { id: "cosmetic-scope", title: "What Counts as a Cosmetic", paragraphs: ["The collection will distinguish visual armor, weapon appearance, enchant effect, title, and event cosmetic rather than grouping every named item under progression gear."], bullets: ["Type and visual purpose", "Source or event", "Availability and trade status", "Last verified date"] },
      { id: "availability-check", title: "Availability Needs Its Own Check", paragraphs: ["A cosmetic can be visible without being obtainable, tradable, or currently available. The final row will keep those states separate and show the source used to confirm them."], bullets: ["Obtainable now", "Event or limited window", "Tradable status", "Source not yet confirmed"] },
      { id: "no-legacy-copy", title: "Check the Source and Availability", paragraphs: ["Old Dungeon Quest collection lists may suggest what to look for, but they do not prove that a cosmetic exists in Reborn. Record the current acquisition screen, availability, trade state, version, and date before relying on a listing."] },
      { id: "exclude-glitches", title: "Why Glitch Videos Are Excluded", paragraphs: ["Current video search results are dominated by guaranteed, unlimited, and glitch claims. This page does not embed or reproduce those methods. A cosmetic row needs a normal acquisition screen, availability state, trade state, version, and check date before publication."] }
    ],
    [
      { question: "Are cosmetic items the same as armor stats?", answer: "Not automatically. The site will classify visual cosmetics separately from progression effects when Reborn evidence supports the distinction." },
      { question: "Why is a cosmetic not listed yet?", answer: "A name without a current source, availability state, and check date is not enough for a useful public row." }
    ],
    [link("/armor/", "Armor database", "Keep visual and progression equipment separate."), link("/drops/", "Drop tables", "Trace future cosmetic sources."), link("/differences/", "Reborn vs Original", "Avoid carrying over legacy collection data.")]
  ),
  "/builds/": firstPass(
    [
      { id: "choose-role", title: "Choose a Role Before a Build", paragraphs: ["Mage, Warrior, Tank, and Healer are decision paths, not promises that a fixed meta loadout already exists. Start with the way your party clears and the failure you need to solve."], bullets: ["Mage — damage, room clear, or utility", "Warrior — frontline damage and consistency", "Tank — survivability and team space", "Healer — recovery and support"] },
      { id: "stage-by-stage", title: "Builds Will Be Stage-Based", paragraphs: ["A beginner alternative can be more useful than an endgame target when it is obtainable and repeatable. Each role page will separate early, mid, late, and endgame goals once current items and spells are verified."], bullets: ["Stat priorities", "Recommended spells", "Weapon and armor goals", "A reachable alternative"] },
      { id: "evidence-before-meta", title: "Check the Item Before the Build", paragraphs: ["A build recommendation needs the current spell or item card, its source, the run it is meant to improve, and a dated result. A familiar old-game name is not enough."] },
      { id: "role-class-boundary", title: "Role Labels vs Confirmed Classes", paragraphs: ["Mage and Warrior are common community descriptions of Spell- and Physical-focused paths. Tank and Healer are treated here as possible party jobs, not confirmed Reborn class IDs. Use those pages as planning checklists until current UI, items, abilities, and repeatable party use support stronger recommendations."] }
    ],
    [
      { question: "Which DQR build is best?", answer: "No single current winner is published yet. The useful first decision is which role and progression stage match your next dungeon." },
      { question: "Can I copy an original-game build?", answer: "Only as a clearly labelled legacy idea; Reborn item sources and effects must be verified separately." }
    ],
    [link("/builds/mage/", "Mage build", "Open the role sheet for ability and gear planning."), link("/builds/warrior/", "Warrior build", "Open the frontline role sheet."), link("/spell-tier-list/", "Spell tier method", "See the evidence required before ranking.")]
  ),
  "/builds/mage/": firstPass(
    [
      { id: "mage-job", title: "Define the Mage Job", paragraphs: ["Choose whether this Mage is solving room clear, boss damage, party utility, or a mix. The final recommendation should explain that job before naming a spell or item."] },
      { id: "mage-loadout", title: "Mage Loadout Fields", paragraphs: ["A publishable sheet will connect class, spell role, source dungeon, weapon goal, armor goal, stat priority, alternative, version, and evidence state. Values are intentionally not guessed in this first pass."], bullets: ["Primary and alternative spell", "Reachable weapon and armor goal", "Stage and stat priority", "What the build cannot answer yet"] },
      { id: "mage-check", title: "Mage Verification Checklist", paragraphs: ["Before a named Mage build is promoted, test the stated use case in the current Reborn experience and link the result to the relevant spell, weapon, dungeon, and update pages."] },
      {
        id: "mage-video-queue",
        title: "Mage Video Review Queue",
        paragraphs: ["A current community Mage guide can identify ability and loadout candidates. Its level label and “meta” wording are not enough to publish a build; each named choice still needs its current card, source, role, alternative, and repeatable result."],
        media: [{
          id: "mage-community-video",
          type: "youtube",
          videoId: "-jgrSgYx_f8",
          title: "Level 100+ Mage skills review",
          alt: "Video preview for a Dungeon Quest Reborn Mage skills guide",
          caption: "Community review queue only. No named Mage loadout is promoted until its current cards and run result are captured.",
          sourceURL: sources.mageVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: [],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null
        }]
      }
    ],
    [
      { question: "What is the best Mage spell?", answer: "No current Mage winner is assigned until the spell name, source, use case, version, and repeatable result are verified." },
      { question: "Can Mage use original-game data?", answer: "Only as labelled legacy context, never as current Reborn build evidence." }
    ],
    [link("/spells/", "Spell database", "Check the fields required for a current spell row."), link("/builds/", "All builds", "Compare role decisions."), link("/dungeons/", "Dungeon progression", "Tie the build to an obtainable run.")],
    [sources.officialExperience, sources.mageVideo]
  ),
  "/builds/warrior/": firstPass(
    [
      { id: "warrior-job", title: "Define the Warrior Job", paragraphs: ["A Warrior sheet starts with the balance between frontline survivability, damage, and clear consistency required by the next run. A label alone is not a build result."] },
      { id: "warrior-loadout", title: "Warrior Loadout Fields", paragraphs: ["The future row will connect class, weapon and armor source, stat priority, spell role, progression stage, alternative, version, and evidence state. No old-game stat is copied into the current sheet."], bullets: ["Frontline goal", "Reachable damage option", "Survivability fallback", "Version and last check"] },
      { id: "warrior-check", title: "Warrior Verification Checklist", paragraphs: ["A named setup needs a current Reborn source and a repeatable reason it improves the intended clear. The result will link to the source dungeon and the underlying equipment records."] },
      {
        id: "warrior-video-queue",
        title: "Warrior Video Review Queue",
        paragraphs: ["A current Warrior skills video can seed candidate ability roles, but it cannot establish a universal loadout. Capture the current ability cards and test the intended room-clear, boss, or survival job before publishing a recommendation."],
        media: [{
          id: "warrior-community-video",
          type: "youtube",
          videoId: "NSpGO2ioMb4",
          title: "Warrior skills review",
          alt: "Video preview for a Dungeon Quest Reborn Warrior skills guide",
          caption: "Community review queue only. Ability names, sources, values, and build fit still require current evidence.",
          sourceURL: sources.warriorVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: [],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null
        }]
      }
    ],
    [
      { question: "What makes a Warrior build useful?", answer: "It must solve a stated frontline problem in a current Reborn run and show the source, version, and alternative." },
      { question: "Are old Warrior stats safe to use?", answer: "No. Treat them as legacy context until Reborn-specific evidence confirms the value." }
    ],
    [link("/weapons/", "Weapon database", "Track future Warrior equipment rows."), link("/armor/", "Armor database", "Separate slot and survivability evidence."), link("/builds/", "All builds", "Return to role selection.")],
    [sources.officialExperience, sources.warriorVideo]
  ),
  "/builds/tank/": firstPass(
    [
      { id: "tank-job", title: "Define the Tank Job", paragraphs: ["A Tank build begins with the mechanic or hit the player must survive and the team space that survival creates. This keeps defense recommendations tied to a run rather than a vague role label."] },
      { id: "tank-loadout", title: "Tank Loadout Fields", paragraphs: ["The future sheet will record defensive priority, team utility, spell role, gear sources, progression stage, alternative, version, and evidence state. Unsupported mitigation numbers remain unlisted."], bullets: ["Survival requirement", "Team utility", "Reachable gear goal", "Fallback when the primary source is unavailable"] },
      { id: "tank-check", title: "Tank Verification Checklist", paragraphs: ["A publishable recommendation needs a current Reborn source and a repeatable test showing the setup helps the intended party clear. It must not rely on the original game's numbers."] },
      { id: "tank-role-boundary", title: "A Party Job, Not a Confirmed Class", paragraphs: ["The official Reborn description does not publish a Tank class roster, and current searches did not find stable Tank-specific DQR evidence. Treat Tank as a party job and confirm the current UI and defensive effects before following a class-style build."] }
    ],
    [
      { question: "Should every party use a Tank?", answer: "That depends on the current run and group. This page will publish a role recommendation only when its use case and evidence are clear." },
      { question: "Why are defense values blank?", answer: "No current Reborn defensive measurement has been verified for this first pass." }
    ],
    [link("/dungeons/", "Dungeon progression", "Define the run the Tank must support."), link("/builds/", "All builds", "Compare roles and stages."), link("/trading/", "Trading safety", "Avoid turning unverified gear value into a trade claim.")]
  ),
  "/builds/healer/": firstPass(
    [
      { id: "healer-job", title: "Define the Healer Job", paragraphs: ["A Healer build should state what damage pattern or party failure it addresses, whether the role is recovery or support, and what the player can obtain at the current stage."] },
      { id: "healer-loadout", title: "Healer Loadout Fields", paragraphs: ["The future sheet will connect recovery or buff role, spell source, gear goal, stage, alternative, version, and evidence state. No healing value is inferred from an old listing."], bullets: ["Recovery or support goal", "Primary and alternative spell", "Reachable gear path", "Party limitation and version"] },
      { id: "healer-check", title: "Healer Verification Checklist", paragraphs: ["A named Healer setup needs a current Reborn source and a repeatable party-use explanation. It will link back to the spell, dungeon, and equipment records that support it."] },
      { id: "healer-role-boundary", title: "A Party Job, Not a Confirmed Class", paragraphs: ["The official Reborn description does not publish a Healer class roster, and current searches did not find stable Healer-specific DQR evidence. Treat healing as a party job and confirm current ability cards and party results before following a class-style build."] }
    ],
    [
      { question: "What should a Healer build prioritise?", answer: "Prioritise the recovery or support problem your party actually has, then verify the relevant spell and gear source in Reborn." },
      { question: "Are healing values confirmed here?", answer: "No. Exact values need a current ability card and a dated party test." }
    ],
    [link("/spells/", "Spell database", "Track support and recovery fields."), link("/builds/", "All builds", "Compare role decisions."), link("/dungeons/", "Dungeon progression", "Tie support to a real run.")]
  ),
  "/scripts-macros/": firstPass(
    [
      { id: "safety-boundary", title: "What This Page Will Not Provide", paragraphs: ["This site does not distribute exploit scripts, executors, macro downloads, account bypasses, or instructions designed to automate or abuse a Roblox experience. A shortcut that asks for a password, session token, or suspicious download is a security risk."] },
      { id: "safer-alternatives", title: "Safer Progression Alternatives", paragraphs: ["Use the in-game controls and ordinary play loop, then use evidence-labelled dungeon, spell, drop, and build pages to make the next run more efficient. If a tool changes later, its safety and policy status must be verified before it is discussed."], bullets: ["Use ordinary in-game controls.", "Check source and version before installing anything.", "Never share credentials or session tokens.", "Report suspicious links instead of testing them on a main account."] },
      { id: "publication-rule", title: "Why the Page Is Still Useful", paragraphs: ["A safety page can answer a high-intent search without turning into a download directory. The boundary is explicit now; any future tools discussion must remain within Roblox rules and carry a direct, current source."] }
    ],
    [
      { question: "Can Dungeon Quest Reborn Guide provide a working script or executor?", answer: "No. This site does not provide exploit code, executors, macro downloads, or account-bypass instructions." },
      { question: "What should I do with a suspicious macro link?", answer: "Do not download it or enter credentials. Use ordinary in-game controls and treat the link as untrusted." }
    ],
    [link("/beginner-guide/", "Beginner guide", "Use a safe progression route."), link("/source-policy/", "Source policy", "See how claims are verified."), link("/codes/", "Codes status", "Avoid copied strings from unrelated games.")],
    [sources.officialExperience, sources.robloxAntiCheat]
  ),
  "/privacy/": {
    sections: [
      { id: "analytics", title: "Microsoft Clarity Analytics", paragraphs: ["This site uses Microsoft Clarity to understand page views and interactions such as clicks, scrolling, page visibility, and performance. Clarity may also provide session playback; Microsoft states that text in privacy-sensitive input fields is masked."] },
      { id: "what-is-collected", title: "What the Site Does Not Collect Directly", paragraphs: ["The site serves guide content and source links. It does not provide accounts, comments, payments, market transactions, or a player-data upload form, and it does not ask for a Roblox login."] },
      { id: "what-not-to-share", title: "What Not to Share", paragraphs: ["Do not enter Roblox passwords, session tokens, private messages, payment details, or personal account exports into this site. Public source links should contain only information already intended for public viewing."] },
      { id: "cookies-and-consent", title: "Cookies and Consent", paragraphs: ["Clarity can use cookies and pseudonymous identifiers to connect page views and produce aggregated analytics. Cookie use and session continuity can vary with browser choices, regional consent requirements, and the Clarity project's consent settings."] }
    ],
    faq: [
      { question: "Does Dungeon Quest Reborn Guide need my Roblox login?", answer: "No. The site has no login or account connection flow." },
      { question: "What analytics service does this site use?", answer: "Microsoft Clarity measures page views, interactions, performance signals, and session playback so the site can identify usability problems." }
    ],
    related: [link("/source-policy/", "Source policy", "See how editorial evidence is recorded."), link("/contact/", "Contact boundary", "Check how corrections are handled in this local release.")],
    sources: [{ title: "Microsoft Clarity data collection", url: "https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data", evidenceLevel: "Official", evidenceNote: "Microsoft's field-level summary of Clarity analytics and playback data.", lastChecked: "2026-09-04" }]
  },
  "/contact/": {
    sections: [
      { id: "current-channel", title: "Current Contact Channel", paragraphs: ["The site does not yet operate a public support inbox, community server, or correction form, so it does not display an address that nobody monitors."] },
      { id: "correction-format", title: "What a Useful Correction Contains", paragraphs: ["A correction should name the route, quote the exact claim, include a direct public source or current-game capture, identify the version, and explain what should change. The source-policy page describes the evidence fields used for review."] },
      { id: "before-publication", title: "Before a Public Channel Exists", paragraphs: ["Until a monitored channel exists, use the source policy to understand what a correction needs and check the cited source directly."] }
    ],
    faq: [
      { question: "Can I send account credentials for a correction?", answer: "No. Never send passwords, session tokens, payment details, or private account exports." },
      { question: "Why is there no email address on this page?", answer: "No monitored inbox is configured for this local release, so an address is not invented or presented as supported." }
    ],
    related: [link("/source-policy/", "Source policy", "Use the evidence checklist for a correction."), link("/privacy/", "Privacy", "Review the information boundary before sharing anything.")],
    sources: []
  },
  "/source-policy/": {
    sections: [
      { id: "source-level", title: "Page-Level Source", paragraphs: ["A page-level source explains where the page was researched. It does not make every sentence on the page official. Source records show the URL, evidence level, evidence note, and last checked date."] },
      { id: "claim-level", title: "Claim-Level Evidence", paragraphs: ["Each critical fact carries its own claim status, confidence, verified version, source URL, evidence note, and checked date. A missing value is marked Not collected or Not yet verified instead of being inferred from an older game."] },
      { id: "publication-gate", title: "When a Guide Is Ready", paragraphs: ["A guide needs a direct answer, useful sections, working internal links, and dated sources before it is promoted as a complete result. Thin pages remain accessible with a clear content-status label while their changing details are checked. Freshness dates use Singapore time." ] },
      { id: "evidence-ladder", title: "Evidence Ladder", paragraphs: ["Official sources establish identity and explicit developer statements. Current in-game captures establish visible UI and values. Multiple independent community observations can support a reported pattern. Legacy or unconfirmed material remains a research lead. Moving up one level never proves unrelated claims on the same page."], bullets: ["Official — direct Roblox or developer statement", "In-game Verified — current screenshot or controlled reproduction", "Community Confirmed — multiple independent observations with limits", "Legacy / Unconfirmed — old-game material or a single report"] }
    ],
    faq: [
      { question: "Does an Official badge confirm every fact on a page?", answer: "No. The badge describes the page source level; the claim table describes each fact separately." },
      { question: "What happens when evidence is missing?", answer: "The fact stays labelled Not collected or Not yet verified, and the page tells readers that gameplay details are still being checked." }
    ],
    related: [link("/differences/", "Reborn differences", "Inspect row-level comparison evidence."), link("/updates/", "Update ledger", "See why metadata signals are not patch notes."), link("/privacy/", "Privacy", "Review the data boundary for this site.")],
    sources: []
  }
};
