import { sources } from "./game-data";
import type { FaqItem, PageSection, RelatedLink, SourceRecord } from "./types";

export interface PageContent {
  sections: PageSection[];
  faq: FaqItem[];
  related: RelatedLink[];
  sources: SourceRecord[];
}

const link = (href: string, label: string, description: string): RelatedLink => ({
  href,
  label,
  description
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
          "The official Roblox metadata identifies the live experience as [Northern Lands] Dungeon Quest Reborn and records a platform update timestamp of September 1, 2026 UTC. That timestamp proves the experience metadata changed; it does not prove a particular dungeon, balance change, drop, or code.",
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
    sources: [sources.officialExperience, sources.officialGameApi]
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
    sources: [sources.officialExperience, sources.officialGameApi, sources.officialPlacesApi]
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
    sources: [sources.officialPassesApi, sources.officialGameApi]
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
    sources: [sources.officialExperience]
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
    sources: [sources.officialExperience]
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
    sources: [sources.officialExperience]
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
    sources: [sources.officialExperience]
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
    sources: [sources.officialExperience]
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
    sources: [sources.officialExperience, sources.officialGameApi]
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
    sources: [sources.officialExperience]
  },
  "/codes/": {
    sections: [
      {
        id: "active-codes",
        title: "Active Dungeon Quest Reborn Codes",
        paragraphs: ["No active code is published. The first-party experience page and public game metadata reviewed on September 2, 2026 did not provide a confirmed code list or a confirmed redemption path."]
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
    sources: [sources.officialExperience, sources.officialGameApi]
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
    sources: [sources.officialExperience, sources.officialGameApi]
  },
  "/discord/": {
    sections: [
      {
        id: "current-link",
        title: "Current DQR Discord Link",
        paragraphs: ["No invite is published because a first-party Discord URL was not directly visible in the sources available for this check. This avoids sending players to a copied or expired destination."]
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
    sources: [sources.officialExperience, sources.robloxSocialLinks]
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
    sources: [sources.officialExperience]
  },
  "/updates/": {
    sections: [
      {
        id: "latest-signal",
        title: "Latest Verified Update Signal",
        paragraphs: ["Roblox public game metadata returned an updated timestamp of September 1, 2026 at 22:28:10 UTC and the current name [Northern Lands] Dungeon Quest Reborn.", "This proves a platform metadata update and a current title; it does not identify the gameplay changes inside that update."]
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
      }
    ],
    faq: [
      { question: "Was Northern Lands added on September 1?", answer: "The metadata confirms the title and update timestamp, not the exact release contents." },
      { question: "Why are there no copied patch notes?", answer: "No first-party patch-note body was available in the sources verified for this release." }
    ],
    related: [
      link("/dungeons/northern-lands/", "Northern Lands", "See what the current label proves and what remains unknown."),
      link("/codes/", "Codes status", "Track the first-party verification boundary."),
      link("/trello/", "Trello status", "Use direct sources rather than copied roadmaps.")
    ],
    sources: [sources.officialGameApi, sources.officialExperience]
  }
};
