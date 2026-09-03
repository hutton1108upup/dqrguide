import { LAST_RESEARCHED, sources } from "./game-data";
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
        question: "Is DQR.GG an official site?",
        answer:
          "No. DQR.GG is an independent fan reference and is not affiliated with Roblox, Voldex, or Delta Quarters OG."
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
          "The public sources checked for this MVP do not state that original levels, inventories, gamepasses, purchases, or cosmetics transfer. They also do not publish a system-by-system balance comparison.",
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
          "Not confirmed by the first-party sources reviewed for this release. Check in the current experience before planning around a transfer."
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
  "/spells/": {
    sections: [
      {
        id: "explained",
        title: "Spells, Skills and Abilities Explained",
        paragraphs: [
          "The official experience description confirms that players unlock abilities, but it does not provide a public spell list. The database therefore starts with a schema and verification queue instead of copying an original-game table."
        ]
      },
      {
        id: "roles",
        title: "Choose by Role",
        paragraphs: [
          "Every published ability will be tagged for room clear, boss damage, buff, heal, defense, or movement. A role tag describes a use case; it does not imply a damage tier."
        ],
        bullets: ["Room Clear", "Boss Damage", "Buff", "Heal", "Defense", "Movement"]
      },
      {
        id: "verification",
        title: "Spell Data Verification",
        paragraphs: [
          "Name, class, rarity, source dungeon, difficulty, required level, best use, and version must be checked before an entity page is published. Unknown DPS, scaling, and cooldown values display Not yet verified."
        ]
      },
      {
        id: "ability-review-queue",
        title: "Ability review queue",
        paragraphs: [
          "Recent community guides provide candidate ability names and visible demonstrations across early and mid progression. They are useful for deciding which item cards to capture next, but a narration or title cannot fill the database row.",
          "For each candidate, capture the complete current card first, then record a short clip showing placement, range, movement commitment, cooldown display, and one repeatable use. Leave every missing field blank rather than borrowing an original-game description."
        ],
        media: [{
          id: "spells-review-video",
          type: "youtube",
          videoId: "FzogFp907JM",
          title: "Ability review queue",
          alt: "Video preview for a Dungeon Quest Reborn ability guide",
          caption: "Community ability overview used to select capture targets. Its rankings and values are not published as database facts.",
          sourceURL: sources.spellsVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: ["spells-list"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null
        }]
      }
    ],
    faq: [
      { question: "Why is the spell list not filled with original-game abilities?", answer: "Because a familiar name is not proof that the same source or balance applies to Reborn." },
      { question: "What does Not yet verified mean?", answer: "The field has not passed a current Reborn source or in-game check and should not guide a build yet." }
    ],
    related: [
      link("/spell-tier-list/", "Spell tier method", "See how verified abilities will be ranked."),
      link("/drops/", "Drop lookup", "Trace a verified spell back to its source."),
      link("/dungeons/", "Dungeon hub", "Move from an ability source to the run plan.")
    ],
    sources: [sources.officialExperience, sources.spellsVideo],
    claims: [
      fact({ id: "spells-abilities", topic: "Abilities", claim: "The experience description says players unlock abilities", value: "High-level ability system mentioned; spell list not published", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialExperience.url, evidenceNote: "The official description supports the existence of abilities but gives no names, numbers, sources, or balance." }),
      fact({ id: "spells-list", topic: "Spell database", claim: "A current Reborn spell list is available", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "No current public spell list was found in the checked first-party source." })
    ]
  },
  "/spell-tier-list/": {
    sections: [
      {
        id: "summary",
        title: "Tier List Summary",
        paragraphs: ["The ranking board is intentionally empty while current-version samples are collected. The S, A, and B rows shown in the supplied visual mockup were design examples, not evidence."]
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
      { question: "What is the best DQR spell right now?", answer: "No evidence-ready overall winner is published in this release." },
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
        paragraphs: ["A future value range must include accepted trades, sample size, date window, and confidence. This MVP does not publish a static list because offers and quoted prices are not the same as completed trades."]
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
      { question: "Does DQR.GG sell or broker items?", answer: "No. This fan guide does not operate a market or request account access." }
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
  "/dungeons/": {
    sections: [
      {
        id: "progression-order",
        title: "Dungeon Progression Order",
        paragraphs: ["The official description confirms cooperative dungeons and bosses but does not publish a complete current order. This hub avoids a fixed total until the live sequence is checked."]
      },
      {
        id: "run-selector",
        title: "Choose the Next Run",
        paragraphs: ["Use access requirement, reliable clear time, survivability, target drops, and the next unlock as separate signals. The highest accessible dungeon is not automatically the best farm if clears are inconsistent."],
        bullets: ["Can you enter?", "Can you clear consistently?", "Does the reward advance the build?", "Is solo or party more reliable?", "What unlock follows?"]
      },
      {
        id: "verification",
        title: "Dungeon Data Verification",
        paragraphs: ["A published row needs a Reborn-specific name, requirement, difficulty set, boss, notable drop, next-dungeon link, and last-verified date. Legacy rows stay outside the public table."]
      },
      {
        id: "progression-map",
        title: "Build the Progression Map",
        paragraphs: [
          "The next useful artifact is a current dungeon-selector capture, not a copied legacy list. One screenshot should preserve the displayed dungeon name, difficulty, access requirement, Hardcore state, and neighboring progression choices.",
          "Official artwork can show the visual range of the experience, but it cannot identify a dungeon or boss unless the first-party API or live UI supplies that label. The hub will add one row at a time as selector and reward evidence arrive."
        ],
        media: [{
          id: "dungeons-official-golem-art",
          type: "image",
          src: "/images/dqr/official-stone-golem.png",
          title: "Official Dungeon Quest Reborn golem artwork",
          alt: "Stone golem in a rocky canyon with a red gate and pink trees",
          caption: "Official experience artwork used as neutral dungeon atmosphere. The API does not identify this dungeon, enemy, or boss by name.",
          sourceURL: sources.officialThumbnailApi.url,
          evidenceLevel: "Official",
          claimIds: ["dungeons-order"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: "[Northern Lands] title snapshot"
        }]
      }
    ],
    faq: [
      { question: "How many dungeons are in Reborn?", answer: "This page does not publish a fixed count until the current live sequence is verified." },
      { question: "Should I always run the newest dungeon I can enter?", answer: "No. Consistent clears and useful drops can make an earlier run more efficient." }
    ],
    related: [
      link("/dungeons/winter-outpost/", "Winter Outpost", "Review the legacy-named dossier and its verification gaps."),
      link("/dungeons/northern-lands/", "Northern Lands", "Open the current-content dossier."),
      link("/drops/", "Drop lookup", "Start from the reward instead of the run.")
    ],
    sources: [sources.officialExperience, sources.officialThumbnailApi],
    claims: [
      fact({ id: "dungeons-order", topic: "Dungeon order", claim: "A complete current Reborn dungeon sequence is published by the first-party source", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "The experience description mentions dungeons but does not list their current order or requirements." })
    ]
  },
  "/dungeons/winter-outpost/": {
    sections: [
      {
        id: "quick-facts",
        title: "Quick Facts",
        paragraphs: ["Winter Outpost is retained as a requested research target, but its Reborn access, difficulties, bosses, and drops have not passed a current first-party or in-game verification in this release."]
      },
      {
        id: "run-checklist",
        title: "Route and Build Checklist",
        paragraphs: ["Before a route is published, record room order, dangerous telegraphs, clear-time bottlenecks, and separate Mage and Warrior observations. A copied original-game route is not accepted as current evidence."]
      },
      {
        id: "move-on",
        title: "When Should You Move On?",
        paragraphs: ["Move when the next verified dungeon is accessible, current clears are stable, and its rewards meaningfully improve the build. A numeric cutoff will appear only after live requirements are confirmed."]
      },
      {
        id: "walkthrough-coverage",
        title: "Community Walkthrough Coverage",
        paragraphs: [
          "A Reborn-specific community video shows Winter Outpost runs across several displayed difficulties and separates Warrior and Mage attempts. It is a promising route reference, but subtitle retrieval was rate-limited during research and the run has not been reproduced for this site.",
          "Use the video to identify the room and boss moments that need manual capture. Do not publish its narrated values, level gates, or drops until the current client shows them directly."
        ],
        media: [{
          id: "winter-outpost-video",
          type: "youtube",
          videoId: "qDPjeoLcmn8",
          title: "Winter Outpost multi-difficulty solo guide",
          alt: "Video preview for a Dungeon Quest Reborn Winter Outpost guide",
          caption: "Manual-review candidate. The video is Reborn-specific, but subtitle access was rate-limited and no route value has been promoted to fact.",
          sourceURL: sources.winterOutpostVideo.url,
          evidenceLevel: "Community Confirmed",
          claimIds: ["winter-outpost-identity"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: null,
          startSeconds: 19
        }]
      }
    ],
    faq: [
      { question: "What level is Winter Outpost in Reborn?", answer: "Not yet verified for the current Reborn experience." },
      { question: "Are original Winter Outpost drops the same?", answer: "Do not assume so; each drop needs a Reborn-specific source." }
    ],
    related: [
      link("/dungeons/", "All dungeons", "Return to the evidence-gated progression hub."),
      link("/drops/", "Drop lookup", "See how unknown rates and sources are labelled."),
      link("/differences/", "Original vs Reborn", "Understand why old route data is isolated.")
    ],
    sources: [sources.officialExperience, sources.winterOutpostVideo],
    claims: [
      fact({ id: "winter-outpost-identity", topic: "Winter Outpost", claim: "Winter Outpost is a current Reborn dungeon with published access and loot details", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "The first-party page does not name Winter Outpost or provide a current route, boss, or drop table." })
    ]
  },
  "/dungeons/northern-lands/": {
    sections: [
      {
        id: "quick-facts",
        title: "Quick Facts",
        paragraphs: ["Northern Lands appears in the current official experience name, which makes it a confirmed current content label. The public metadata does not supply its level requirement, dungeon route, boss roster, or loot table."]
      },
      {
        id: "run-prep",
        title: "Before You Queue",
        paragraphs: ["Confirm the live access requirement, note the room sequence, capture boss telegraphs, and log drops with difficulty and date. Separate a successful clear from a repeatable farming recommendation."],
        bullets: ["Access confirmed in game", "Difficulty recorded", "Boss mechanics observed", "Drop source captured", "Clear repeated before recommendation"]
      },
      {
        id: "farming-decision",
        title: "Is Northern Lands Worth Farming?",
        paragraphs: ["That decision remains under review. A useful answer needs clear consistency, progression value, and verified rewards—not the item names and stat values used as placeholders in the mockup."]
      },
      {
        id: "route-verification",
        title: "Room-by-Room Verification Plan",
        paragraphs: [
          "Two independent current community videos show a multi-room Northern Lands run and several boss encounters. They are strong enough to map what should be tested, but not to publish exact requirements, health values, drop rates, or a guaranteed strategy.",
          "Start each note with the room or boss order visible in the current run. Record the pull that starts the encounter, the telegraph before damage, a safe movement response, whether the behavior repeats, and the difficulty shown on screen. Keep a separate log for party scaling and rewards."
        ],
        bullets: ["Room order and pull trigger", "Telegraph and safe response", "Difficulty and party size", "Clear result and repeat count", "Reward screen and item-card capture"],
        media: [
          {
            id: "northern-lands-official-art",
            type: "image",
            src: "/images/dqr/official-party-boss-arena.png",
            title: "Official Dungeon Quest Reborn party battle artwork",
            alt: "Dungeon Quest Reborn party facing a horned arena boss",
            caption: "Official experience artwork does not identify the dungeon or boss by name. It is used as neutral current-game art, not mechanic evidence.",
            sourceURL: sources.officialThumbnailApi.url,
            evidenceLevel: "Official",
            claimIds: ["northern-lands-label"],
            capturedAt: LAST_RESEARCHED,
            verifiedForVersion: "[Northern Lands] title snapshot"
          },
          {
            id: "northern-lands-route-video",
            type: "youtube",
            videoId: "3pHhZpt-b-U",
            title: "Northern Lands solo route",
            alt: "Video preview for a Northern Lands solo route",
            caption: "Community route demonstration published September 2, 2026. Begin at the first-room setup; exact mechanics and rewards remain pending current in-game reproduction.",
            sourceURL: sources.northernLandsVideo.url,
            evidenceLevel: "Community Confirmed",
            claimIds: ["northern-lands-route-video", "northern-lands-mechanics"],
            capturedAt: LAST_RESEARCHED,
            verifiedForVersion: "[Northern Lands] community video snapshot",
            startSeconds: 94
          }
        ]
      }
    ],
    faq: [
      { question: "Is Northern Lands current content?", answer: "Yes as a current official experience label; detailed dungeon mechanics and drops are still being verified." },
      { question: "Are the mockup's item values confirmed?", answer: "No. They were visual examples and are not published as game data." }
    ],
    related: [
      link("/dungeons/", "Dungeon hub", "Compare the progression evidence needed for every run."),
      link("/drops/", "Drop tables", "See the source and rate status model."),
      link("/updates/", "Update ledger", "Trace the official platform update timestamp.")
    ],
    sources: [sources.officialExperience, sources.officialGameApi, sources.officialThumbnailApi, sources.northernLandsVideo, sources.northernLandsWalkthrough],
    claims: [
      fact({ id: "northern-lands-label", topic: "Northern Lands", claim: "Northern Lands appears in the current official experience name", value: "Confirmed label; detailed dungeon data not collected", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialGameApi.url, evidenceNote: "The first-party API and experience page both name the current experience [Northern Lands] Dungeon Quest Reborn." }),
      fact({ id: "northern-lands-mechanics", topic: "Northern Lands mechanics", claim: "Current access, bosses, drops, and farming values are published", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "The public description does not contain the detailed dungeon fields required for a guide." }),
      fact({ id: "northern-lands-route-video", topic: "Community route coverage", claim: "Two independent current videos demonstrate Northern Lands runs", value: "Reported route and telegraph coverage", claimStatus: "reported", confidence: "Medium", verifiedForVersion: "[Northern Lands] community video snapshot", sourceURL: sources.northernLandsVideo.url, evidenceNote: "The videos support a reproduction queue; they do not establish exact access, health, drops, rates, or developer intent." })
    ]
  },
  "/drops/": {
    sections: [
      {
        id: "how-drops-work",
        title: "How DQR Drops Work",
        paragraphs: ["The official description confirms weapons, armor, legendary loot, and dungeon rewards at a high level. It does not publish an item-by-item source table or exact rates."]
      },
      {
        id: "rate-status",
        title: "Drop Rate Status",
        paragraphs: ["Every future rate is classified as Officially Confirmed, Community Observed, or Unknown. A community observation must retain its sample context and is never formatted as an official percentage."],
        bullets: ["Officially Confirmed — first-party rate", "Community Observed — sample with limitations", "Unknown — source or rate not established"]
      },
      {
        id: "reverse-lookup",
        title: "Build the Lookup from Evidence",
        paragraphs: ["A publishable row needs item name, type, class, rarity, source dungeon, difficulty, requirement, trade status, rate status, and last verification. No placeholder row is exposed as loot data."]
      },
      {
        id: "drop-proof-bundle",
        title: "Proof Bundle for One Drop Row",
        paragraphs: [
          "One reward screenshot is not enough to establish a rate. A usable row pairs the dungeon and difficulty selector, completed-run reward screen, full item card, capture date, and a note explaining which field is direct evidence and which remains unknown.",
          "Promotional artwork belongs beside the explanation only. It cannot prove that the pictured weapon, armor, ability, or enemy is obtainable from a particular dungeon."
        ],
        bullets: ["Dungeon and difficulty", "Completed reward screen", "Full item or ability card", "Source URL or local capture ID", "Rate state: Official, Observed, or Unknown"],
        media: [{
          id: "drops-official-boss-art",
          type: "image",
          src: "/images/dqr/official-fire-boss.png",
          title: "Official Dungeon Quest Reborn boss battle artwork",
          alt: "Armored player facing a glowing orange boss in a red arena",
          caption: "Official promotional artwork, not drop evidence. No item, dungeon, boss, or probability is inferred from this scene.",
          sourceURL: sources.officialThumbnailApi.url,
          evidenceLevel: "Official",
          claimIds: ["drop-table"],
          capturedAt: LAST_RESEARCHED,
          verifiedForVersion: "[Northern Lands] title snapshot"
        }]
      }
    ],
    faq: [
      { question: "Are exact DQR drop rates known?", answer: "No exact rate is published here without an official source or clearly labelled observation." },
      { question: "Why is Drops separate from Dungeons?", answer: "Drops starts with an item target; Dungeons starts with a progression decision." }
    ],
    related: [
      link("/dungeons/", "Dungeon progression", "Start from the run instead of the reward."),
      link("/spells/", "Spell database", "Review the fields required before a spell source is published."),
      link("/trading/", "Trading safety", "Do not turn an unknown drop rate into a value claim.")
    ],
    sources: [sources.officialExperience, sources.officialThumbnailApi],
    claims: [
      fact({ id: "drop-table", topic: "Drop lookup", claim: "A current item-by-item Reborn drop table and exact rates are published", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "The official description mentions loot at a high level but does not provide item rows or rates." })
    ]
  },
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
      { question: "Are there any active DQR codes?", answer: "None are confirmed from a first-party source in this release." },
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
  "/trello/": {
    sections: [
      {
        id: "current-status",
        title: "Current Trello Status",
        paragraphs: ["No Trello board is labelled official here. The first-party experience page available during this review did not expose a directly verifiable Trello URL."]
      },
      {
        id: "official-sources",
        title: "Verified Official Update Sources",
        paragraphs: ["Use the Roblox experience page and public Roblox game metadata as the current first-party baseline. The metadata update timestamp is useful as a change signal, but it is not a patch note."]
      },
      {
        id: "fake-boards",
        title: "How to Identify an Unverified Board",
        paragraphs: ["A search result, copied logo, or board title does not prove ownership. Look for a direct link from the current experience or creator channel and compare dates before trusting a roadmap claim."]
      },
      {
        id: "status-change",
        title: "What Would Change This Status",
        paragraphs: ["This page will publish a board URL only after the current Roblox experience, creator community, or another first-party channel links to it directly. The record must include the board owner, direct source URL, visible purpose, and last verification date. Until then, copied boards remain outside the roadmap and update pages."]
      }
    ],
    faq: [
      { question: "Does DQR have an official Trello?", answer: "No first-party board URL was confirmed in the sources checked for this release." },
      { question: "Where should I check updates?", answer: "Start with the Roblox experience page and the DQR.GG update ledger's direct sources." }
    ],
    related: [
      link("/updates/", "Updates", "See the verified timestamp without invented patch notes."),
      link("/discord/", "Discord", "Understand the same direct-link verification rule."),
      link("/codes/", "Codes", "Review another status page built around evidence limits.")
    ],
    sources: [sources.officialExperience, sources.officialGameApi],
    claims: [
      fact({ id: "trello-status", topic: "Official Trello", claim: "A first-party Trello URL is published for Reborn", value: "Not confirmed", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialExperience.url, evidenceNote: "No directly linked Trello URL was visible in the first-party surface checked." })
    ]
  },
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
        paragraphs: ["No weapon, spell, or build receives a launch tier in this evidence-gated MVP. The example S/A/B chips in the supplied mockup remain visual references only."]
      },
      {
        id: "progression",
        title: "Rank by Progression Stage",
        paragraphs: ["A future overview will separate early, mid, late, and endgame needs. Ease of acquisition and reliable clears matter alongside peak output."],
        bullets: ["Early — access and consistency", "Mid — upgrade path", "Late — role specialisation", "Endgame — repeatable current-version performance"]
      },
      {
        id: "publication-gate",
        title: "Ranking Publication Gate",
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
        paragraphs: ["Roblox public game metadata returned an updated timestamp of September 2, 2026 at 23:30:02 UTC and the current name [Northern Lands] Dungeon Quest Reborn.", "This proves a platform metadata update and a current title; it does not identify the gameplay changes inside that update."]
      },
      {
        id: "change-log",
        title: "What Changed on DQR.GG",
        paragraphs: ["September 2, 2026 — created the official experience snapshot, separated Reborn from legacy data, and opened verification queues for codes, social links, passes, dungeons, spells, and tiers."]
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
      { question: "Was Northern Lands added on September 2?", answer: "The metadata confirms the current title and update timestamp, not the exact release contents." },
      { question: "Why are there no copied patch notes?", answer: "No first-party patch-note body was available in the sources verified for this release." }
    ],
    related: [
      link("/dungeons/northern-lands/", "Northern Lands", "See what the current label proves and what remains unknown."),
      link("/codes/", "Codes status", "Track the first-party verification boundary."),
      link("/trello/", "Trello status", "Use direct sources rather than copied roadmaps.")
    ],
    sources: [sources.officialGameApi, sources.officialExperience, sources.officialThumbnailApi, sources.northernLandsVideo, sources.northernLandsWalkthrough],
    claims: [
      fact({ id: "updates-metadata-signal", topic: "Platform signal", claim: "Roblox metadata changed on September 2, 2026", value: "2026-09-02T23:30:02Z", claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", sourceURL: sources.officialGameApi.url, evidenceNote: "The API timestamp is a source-backed platform signal only; no gameplay change is inferred." }),
      fact({ id: "updates-patch-notes", topic: "Patch notes", claim: "A first-party patch-note body is available", value: "Not collected", claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, sourceURL: sources.officialExperience.url, evidenceNote: "No first-party patch-note body was found in the checked public surfaces." }),
      fact({ id: "updates-community-video", topic: "Community demonstration", claim: "Current videos demonstrate Northern Lands gameplay", value: "Reported observation source", claimStatus: "reported", confidence: "Medium", verifiedForVersion: "[Northern Lands] community video snapshot", sourceURL: sources.northernLandsVideo.url, evidenceNote: "This supports an affected-guide research queue, not a developer-authored patch-note body." })
    ],
    updates: [
      update({ id: "update-metadata-2026-09-02", topic: "Roblox metadata signal", claim: "The public Reborn metadata changed", value: "Current title [Northern Lands] Dungeon Quest Reborn; updated 2026-09-02T23:30:02Z", versionTitle: "[Northern Lands] Dungeon Quest Reborn", publishedDate: "2026-09-02", actualChanges: "The public API reports the current title and an updated timestamp. No gameplay change, dungeon change, spell change, or patch-note body is stated.", sourceURL: sources.officialGameApi.url, claimStatus: "confirmed", confidence: "High", verifiedForVersion: "[Northern Lands] title snapshot", evidenceNote: "This record is deliberately a metadata signal, not a patch note. No affected game pages are inferred.", affectedPaths: [], recordType: "metadata_signal" }),
      update({ id: "update-patch-notes-2026-09-02", topic: "First-party patch notes", claim: "A public first-party gameplay update body is available", value: "Not collected", versionTitle: "No patch-note version published", publishedDate: "2026-09-02", actualChanges: "No actual gameplay changes can be listed until a first-party patch-note body or current in-game change record is available.", sourceURL: sources.officialExperience.url, claimStatus: "not_collected", confidence: "Low", verifiedForVersion: null, evidenceNote: "The page remains review-only and noindex so a metadata timestamp cannot be mistaken for a patch summary.", affectedPaths: [], recordType: "metadata_signal" })
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
      { id: "entity-pipeline", title: "How Weapon Entries Enter the Site", paragraphs: ["A weapon receives a detail URL only after its name and source are verified, its use is independently useful, its version and check date are recorded, and at least two relevant internal links are ready. Until then it belongs in this collection queue."] },
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
      { id: "publication-queue", title: "Armor Publication Queue", paragraphs: ["Rows will be added from direct Reborn evidence. A standalone armor page waits for a clear search object, verified source, independent use, two internal links, version, and check date."] },
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
      { id: "no-legacy-copy", title: "No Legacy Cosmetic Copy", paragraphs: ["Old Dungeon Quest collection lists may be useful leads, but they are not current Reborn evidence. The first-pass page holds the schema and links while verified entries are collected."] },
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
      { id: "evidence-before-meta", title: "Evidence Before Meta", paragraphs: ["No named item receives a current build recommendation from the supplied mockup alone. The build pipeline links every recommendation back to a spell, weapon, armor, dungeon, or update record."] },
      { id: "role-class-boundary", title: "Role Labels vs Confirmed Classes", paragraphs: ["Mage and Warrior are common community descriptions of Spell- and Physical-focused paths. Tank and Healer are treated here as possible party jobs, not confirmed Reborn class IDs. A separate role page stays noindex until current UI, items, abilities, and repeatable party use justify it."] }
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
      { id: "tank-role-boundary", title: "Role Page, Not a Confirmed Class", paragraphs: ["The official Reborn description does not publish a Tank class roster, and current search did not find stable Tank-specific DQR evidence. This page therefore treats Tank as a party job and remains noindex until current UI and repeatable party evidence support a separate class-style guide."] }
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
      { id: "healer-role-boundary", title: "Role Page, Not a Confirmed Class", paragraphs: ["The official Reborn description does not publish a Healer class roster, and current search did not find stable Healer-specific DQR evidence. This page treats healing as a party job and remains noindex until current abilities and party tests justify a separate guide."] }
    ],
    [
      { question: "What should a Healer build prioritise?", answer: "Prioritise the recovery or support problem your party actually has, then verify the relevant spell and gear source in Reborn." },
      { question: "Are healing values confirmed here?", answer: "No. Unsupported values stay out of the first-pass build sheet." }
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
      { question: "Can DQR.GG provide a working script or executor?", answer: "No. This site does not provide exploit code, executors, macro downloads, or account-bypass instructions." },
      { question: "What should I do with a suspicious macro link?", answer: "Do not download it or enter credentials. Use ordinary in-game controls and treat the link as untrusted." }
    ],
    [link("/beginner-guide/", "Beginner guide", "Use a safe progression route."), link("/source-policy/", "Source policy", "See how claims are verified."), link("/codes/", "Codes status", "Avoid copied strings from unrelated games.")],
    [sources.officialExperience, sources.robloxAntiCheat]
  ),
  "/privacy/": {
    sections: [
      { id: "what-is-collected", title: "What This MVP Collects", paragraphs: ["This local MVP renders public editorial content and source links. It does not provide accounts, comments, payment flows, market transactions, or a private player-data upload surface."] },
      { id: "what-not-to-share", title: "What Not to Share", paragraphs: ["Do not enter Roblox passwords, session tokens, private messages, payment details, or personal account exports into this site. Public source links should contain only information already intended for public viewing."] },
      { id: "future-boundary", title: "Future Capability Boundary", paragraphs: ["If analytics, advertising, forms, or community features are added later, their collection and retention rules must be documented before those features ship. This release makes no such production promise."] }
    ],
    faq: [
      { question: "Does DQR.GG need my Roblox login?", answer: "No. This MVP has no login or account connection flow." },
      { question: "Does this page promise ad or analytics privacy for a future release?", answer: "No. Future collection must be documented before it is introduced; this page describes only the current MVP boundary." }
    ],
    related: [link("/source-policy/", "Source policy", "See how editorial evidence is recorded."), link("/contact/", "Contact boundary", "Check how corrections are handled in this local release.")],
    sources: []
  },
  "/contact/": {
    sections: [
      { id: "current-channel", title: "Current Contact Channel", paragraphs: ["This local MVP does not operate a public support inbox, community server, or correction form. It therefore does not present an unconfigured address as if it were monitored."] },
      { id: "correction-format", title: "What a Useful Correction Contains", paragraphs: ["A correction should name the route, quote the exact claim, include a direct public source or current-game capture, identify the version, and explain what should change. The source-policy page describes the evidence fields used for review."] },
      { id: "before-publication", title: "Before a Public Channel Exists", paragraphs: ["Until a monitored channel is configured, review pages stay out of production routes and indexable pages stay limited to claims with a visible evidence trail."] }
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
      { id: "publication-gate", title: "Publication and Refresh Gate", paragraphs: ["The site structure can publish a useful first-pass page while it is still noindex. Indexable pages need a direct answer, useful sections, internal links, and source records; thin or incomplete pages remain publicly accessible but clearly labelled Public / noindex. Freshness checks use Singapore dates and show the next scheduled check."] },
      { id: "evidence-ladder", title: "Evidence Ladder", paragraphs: ["Official sources establish identity and explicit developer statements. Current in-game captures establish visible UI and values. Multiple independent community observations can support a reported pattern. Legacy or unconfirmed material remains a research lead. Moving up one level never proves unrelated claims on the same page."], bullets: ["Official — direct Roblox or developer statement", "In-game Verified — current screenshot or controlled reproduction", "Community Confirmed — multiple independent observations with limits", "Legacy / Unconfirmed — old-game material or a single report"] }
    ],
    faq: [
      { question: "Does an Official badge confirm every fact on a page?", answer: "No. The badge describes the page source level; the claim table describes each fact separately." },
      { question: "What happens when evidence is missing?", answer: "The fact remains labelled Not collected or Not yet verified, and the page stays review-only or noindex until the publication gate is met." }
    ],
    related: [link("/differences/", "Reborn differences", "Inspect row-level comparison evidence."), link("/updates/", "Update ledger", "See why metadata signals are not patch notes."), link("/privacy/", "Privacy", "Review the data boundary for this site.")],
    sources: []
  }
};
