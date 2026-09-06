import type { PageContent } from "./page-content";
import type { SitePage } from "./types";

// Original-source review: docs/research/2026-09-05-player-guide-evidence.md
export const playerGuides: Record<string, { indexable: boolean; meta: Partial<SitePage>; content: PageContent }> = {
  "/trello/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Trello: Link Status & Useful Sources",
      "eyebrow": "Trello & information links",
      "summary": "Check the board status, open the correct Roblox experience, or jump to spells, item locations and Northern Lands help.",
      "quickAnswer": "No official Trello link was verified on the public Roblox page and API checked September 6, 2026. Open the game below or choose the guide matching what you wanted from the board.",
      "verifiedForVersion": "Public sources checked September 5, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "current-status",
          "title": "Is there an official DQR Trello?",
          "paragraphs": [
            "No directly verifiable board URL appeared in the accessible Roblox experience page or public game metadata. This does not prove that no board exists: private announcements and age-gated social links were outside this check."
          ],
          "links": [
            {
              "href": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
              "label": "Open Dungeon Quest Reborn on Roblox",
              "description": "The Reborn experience by Delta Quarters OG; check its current social links."
            }
          ]
        },
        {
          "id": "find-your-answer",
          "title": "Find the information you came for",
          "paragraphs": [
            "Choose the answer you wanted from the board."
          ],
          "links": [
            {
              "href": "/spells/",
              "label": "Find a spell",
              "description": "Named abilities, uses and original explanations."
            },
            {
              "href": "/drops/",
              "label": "Look up an item source",
              "description": "Reported locations and reward evidence limits."
            },
            {
              "href": "/dungeons/northern-lands/",
              "label": "Beat Northern Lands",
              "description": "Room routing and boss tactics."
            },
            {
              "href": "/updates/",
              "label": "Check game updates",
              "description": "Dated platform and guide changes."
            }
          ]
        },
        {
          "id": "official-sources",
          "title": "Which source should I use?",
          "paragraphs": [
            "Use developer channels for announcements and specific gameplay sources for mechanics."
          ],
          "table": {
            "columns": [
              "Question",
              "Starting point",
              "Limit"
            ],
            "rows": [
              {
                "cells": [
                  "Where do I play?",
                  "Roblox experience above",
                  "Check the Reborn developer and game name."
                ]
              },
              {
                "cells": [
                  "What changed?",
                  "Developer-linked announcements",
                  "API timestamps are not patch notes."
                ]
              },
              {
                "cells": [
                  "Where does an item drop?",
                  "A continuous run and reward screen",
                  "An inventory card alone does not establish source."
                ]
              },
              {
                "cells": [
                  "Is a community board useful?",
                  "Its cited sources and dates",
                  "Community work is not automatically official."
                ]
              }
            ]
          }
        },
        {
          "id": "verify-a-board",
          "title": "If you find a board",
          "paragraphs": [
            "Follow a direct link from the Reborn experience or a verified developer announcement. A matching title does not establish ownership. Check that the board describes Reborn rather than the original Dungeon Quest.",
            "A public information page does not need your Roblox password or session cookie."
          ],
          "links": [
            {
              "href": "/discord/",
              "label": "Discord status",
              "description": "Read the community invite's attribution."
            },
            {
              "href": "/differences/",
              "label": "Reborn or original Dungeon Quest?",
              "description": "Check which experience a guide describes."
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Where is the official Trello link?",
          "answer": "No link was verified through the accessible Roblox page and API on September 6. Use the game link above to check its current developer-linked channels."
        },
        {
          "question": "Can I use a community wiki?",
          "answer": "Yes. Prefer dated sources and distinguish creator advice from current item cards and developer announcements."
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Find ability uses."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Find source reports."
        },
        {
          "href": "/updates/",
          "label": "Updates",
          "description": "Read dated changes."
        }
      ],
      "sources": [
        {
          "title": "Official Roblox experience",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "September 6 public listing: [Odin Reincarnation] Dungeon Quest Reborn. No patch mechanics inferred.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Roblox Games API",
          "url": "https://games.roblox.com/v1/games?universeIds=9931749389",
          "evidenceNote": "Fresh identity snapshot on September 6; update time is not patch-note content.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "trello-status",
          "topic": "Official Trello link",
          "claim": "Official Trello link",
          "value": "Not verified in accessible public sources",
          "claimStatus": "not_collected",
          "confidence": "Low",
          "verifiedForVersion": "Dated creator narration; live values unverified",
          "sourceURL": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "Public page and API only; not a claim that no board exists.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/spells/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Spells & Abilities: Uses and Source Reports",
      "eyebrow": "Spells & abilities",
      "summary": "Compare twelve named abilities and source reports, including Fire Bomb and Enhanced Inner Focus. Exact card values and acquisition conditions remain separately labelled.",
      "quickAnswer": "Compare Ice Needles for frequent casts, Phantom Flames for ranged damage, Infernal Orbs for damage over time, and recovery abilities for party support. These are dated community descriptions, not a tested tier list.",
      "verifiedForVersion": "August 28, 2026 ability walkthrough"
    },
    "content": {
      "sections": [
        {
          "id": "ability-list",
          "title": "Abilities by use case",
          "paragraphs": [
            "Community reports: ten descriptions come from the August 28 walkthrough; two additional entries use separately dated sources. This is not a complete roster or tested tier list. Numeric fields remain omitted where no readable current card was checked.",
            "The source column contains acquisition reports, not confirmed rewards. The table order is not a progression ladder or power ranking."
          ],
          "table": {
            "columns": [
              "Ability",
              "Use case",
              "How to use it",
              "Source status",
              "Explanation"
            ],
            "rows": [
              {
                "cells": [
                  "Ice Needles",
                  "Early damage",
                  "The creator discusses alternating two copies for frequent casts.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=72s",
                "sourceLabel": "1:12 · Aug 28"
              },
              {
                "cells": [
                  "Aura of Life",
                  "Group recovery",
                  "Discussed for healing yourself and nearby teammates.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=90s",
                "sourceLabel": "1:30 · Aug 28"
              },
              {
                "cells": [
                  "Universal Heal",
                  "Party recovery",
                  "Described as helping teammates at a distance; exact range unverified.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=105s",
                "sourceLabel": "1:45 · Aug 28"
              },
              {
                "cells": [
                  "Battle Shout",
                  "Melee buff",
                  "Compare the current buff tooltip with your equipped attacks.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=133s",
                "sourceLabel": "2:13 · Aug 28"
              },
              {
                "cells": [
                  "Holy Circle",
                  "Placed recovery",
                  "A healing area; useful while you can stay in its coverage.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=168s",
                "sourceLabel": "2:48 · Aug 28"
              },
              {
                "cells": [
                  "Ghostly Cannon Barrage",
                  "Area damage",
                  "A placed damaging area; keep enemies within it while moving.",
                  "Pirate Island — community report"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=177s",
                "sourceLabel": "2:57 · Aug 28"
              },
              {
                "cells": [
                  "Phantom Flames",
                  "Ranged damage",
                  "The creator demonstrates reach against dummies; leave space to dodge.",
                  "Pirate Island — community report"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=283s",
                "sourceLabel": "4:43 · Aug 28"
              },
              {
                "cells": [
                  "Gale Slice",
                  "Warrior damage",
                  "Described as forward slices; align enemies before casting.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=371s",
                "sourceLabel": "6:11 · Aug 28"
              },
              {
                "cells": [
                  "Infernal Orbs",
                  "Damage over time",
                  "Apply the effect, then move or use your other ability.",
                  "The Underworld — community report"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=477s",
                "sourceLabel": "7:57 · Aug 28"
              },
              {
                "cells": [
                  "Ice Totem",
                  "Placed damage",
                  "Stationary damage with limited coverage; moving enemies can leave it.",
                  "Unknown"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=558s",
                "sourceLabel": "9:18 · Aug 28"
              },
              {
                "cells": [
                  "Fire Bomb",
                  "Mage damage",
                  "A Winter Outpost progression option in the September 4 editorial table; exact card effect unverified.",
                  "Winter Outpost — recommendation, not verified drop"
                ],
                "sourceURL": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
                "sourceLabel": "Sep 4 editorial"
              },
              {
                "cells": [
                  "Enhanced Inner Focus",
                  "Buff",
                  "Distinguish the enhanced skill from the ordinary Inner Focus demonstration.",
                  "Enchanted Forest reward clip — difficulty unverified"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
                "sourceLabel": "Aug 14 reward reference"
              }
            ]
          }
        },
        {
          "id": "source-dungeons",
          "title": "Find the reported dungeon",
          "paragraphs": [
            "The creator attributes Ghostly Cannon Barrage and Phantom Flames to Pirate Island, and Infernal Orbs to The Underworld. No exact difficulty or probability is established by the narration. Other entries have no reliable source condition in the reviewed material."
          ],
          "links": [
            {
              "href": "/spells/phantom-flames/",
              "label": "Phantom Flames guide",
              "description": "Ranged use, the source report and alternatives."
            },
            {
              "href": "/spells/infernal-orbs/",
              "label": "Infernal Orbs guide",
              "description": "Damage-over-time use and cast windows."
            },
            {
              "href": "/drops/",
              "label": "Item-source lookup",
              "description": "Compare acquisition reports."
            },
            {
              "href": "/spells/fire-bomb/",
              "label": "Fire Bomb guide",
              "description": "Read the Winter Outpost source limits."
            },
            {
              "href": "/spells/enhanced-inner-focus/",
              "label": "EIF guide",
              "description": "Ordinary versus enhanced and acquisition evidence."
            }
          ]
        },
        {
          "id": "choose-pair",
          "title": "Choose abilities for your run",
          "paragraphs": [
            "Identify the problem before changing your ability. If enemies leave a placed area, reliable hits matter more than a creator's damage number."
          ],
          "table": {
            "columns": [
              "Problem",
              "Compare",
              "Watch for"
            ],
            "rows": [
              {
                "cells": [
                  "Enemies escape your area",
                  "Placed damage versus a ranged option",
                  "Whether attacks actually land."
                ]
              },
              {
                "cells": [
                  "Long gaps between attacks",
                  "Frequent casts versus damage over time",
                  "Whether you can keep moving while waiting."
                ]
              },
              {
                "cells": [
                  "Party survival blocks progress",
                  "Recovery versus another damage ability",
                  "Whether the group finishes the run."
                ]
              },
              {
                "cells": [
                  "Boss attacks catch you at close range",
                  "Reach versus close-range damage",
                  "Whether your cast overlaps the next warning."
                ]
              }
            ]
          }
        },
        {
          "id": "ability-walkthrough",
          "title": "Watch the ability explanations",
          "paragraphs": [
            "The recording reflects the creator's early and midgame experience. Its rankings and damage numbers depend on that character's gear."
          ],
          "media": [
            {
              "id": "ability-walkthrough",
              "type": "youtube",
              "videoId": "FzogFp907JM",
              "title": "Ability walkthrough: starting skills",
              "alt": "Video preview: Ability walkthrough: starting skills",
              "caption": "August 28 creator guide. Narration reviewed September 5; exact current card values and reward conditions remain unverified.",
              "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "ability-walkthrough"
              ],
              "capturedAt": "2026-09-05",
              "verifiedForVersion": "August 28, 2026 creator guide",
              "startSeconds": 72
            }
          ]
        },
        {
          "id": "missing-fields",
          "title": "What remains unknown?",
          "paragraphs": [
            "Follow the exact category and scaling on your own item. Matching names in an original-game wiki do not establish Reborn values.",
            "The EIF detail page separates the ordinary-skill demonstration from an enhanced-skill reward reference. Exact acquisition difficulty and probability remain unresolved."
          ]
        }
      ],
      "faq": [
        {
          "question": "What is the best spell?",
          "answer": "No universal ranking is published. Compare reach, movement, uptime and the specific problem causing your run to fail."
        },
        {
          "question": "Where do Phantom Flames and Infernal Orbs drop?",
          "answer": "The creator reports Pirate Island and The Underworld respectively. Difficulty and rates remain unverified; each detail page links the statement."
        }
      ],
      "related": [
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Reported item locations."
        },
        {
          "href": "/dungeons/northern-lands/",
          "label": "Northern Lands",
          "description": "Plan casts around warnings."
        },
        {
          "href": "/builds/mage/",
          "label": "Mage build",
          "description": "Fit skills to a loadout."
        }
      ],
      "sources": [
        {
          "title": "Ability walkthrough — August 28, 2026",
          "url": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Creator narration and automatic captions reviewed September 5. Descriptions and locations are attributed reports; exact card values and reward screens have not been independently captured.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Dungeon Quest Reborn on Roblox",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "Public description checked September 5. No verifiable Trello URL found in this accessible source.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Enhanced Inner Focus reward clip — August 14",
          "url": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
          "evidenceNote": "Description links the exact Reborn game. Storyboard frames show Enchanted Forest Dragon and post-fight rewards; the small item text does not independently establish a full card, difficulty or rate.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Inner Focus comparison — September 1",
          "url": "https://www.youtube.com/watch?v=I11sThLGWJs",
          "evidenceNote": "Captions reviewed. The creator explicitly does not own the enhanced spells; the demonstrated skill is the ordinary Inner Focus. Narrated percentages and probabilities are excluded.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "ability-walkthrough",
          "topic": "Ability descriptions",
          "claim": "Ability descriptions",
          "value": "Ten named descriptions in a dated guide",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Dated creator narration; live values unverified",
          "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Original automatic captions reviewed directly; not independently captured item or reward data.",
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/drops/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Drops: Reported Item Locations",
      "eyebrow": "Item-source lookup",
      "summary": "Start with a target item. Check its reported dungeon, what remains unknown and the original explanation before planning a farming session.",
      "quickAnswer": "Start from the exact item name. Pirate Island and The Underworld have three creator source reports; Winter Outpost has a Fire Bomb recommendation and EIF has a dated reward reference. None establishes a universal drop rate.",
      "verifiedForVersion": "August 28, 2026 acquisition reports"
    },
    "content": {
      "sections": [
        {
          "id": "reported-locations",
          "title": "Reported item locations",
          "paragraphs": [
            "Community reports and editorial leads are listed separately below. No row is a complete current reward pool or a probability guarantee."
          ],
          "table": {
            "columns": [
              "Item",
              "Reported dungeon",
              "Difficulty / probability",
              "Evidence",
              "Explanation"
            ],
            "rows": [
              {
                "cells": [
                  "Ghostly Cannon Barrage",
                  "Pirate Island",
                  "Difficulty unknown · Rate unknown",
                  "Creator narration; reward proof pending"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=177s",
                "sourceLabel": "2:57 · Aug 28"
              },
              {
                "cells": [
                  "Phantom Flames",
                  "Pirate Island",
                  "Difficulty unknown · Rate unknown",
                  "Creator narration; reward proof pending"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=345s",
                "sourceLabel": "5:45 · Aug 28"
              },
              {
                "cells": [
                  "Infernal Orbs",
                  "The Underworld",
                  "Difficulty unknown · Rate unknown",
                  "Creator narration; reward proof pending"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=477s",
                "sourceLabel": "7:57 · Aug 28"
              },
              {
                "cells": [
                  "Fire Bomb",
                  "Winter Outpost",
                  "Difficulty unknown · Rate unknown",
                  "Editorial recommendation; not a captured drop"
                ],
                "sourceURL": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
                "sourceLabel": "Sep 4 editorial"
              },
              {
                "cells": [
                  "Enhanced Inner Focus",
                  "Enchanted Forest encounter reference",
                  "Difficulty unknown · Rate unknown",
                  "Video title and post-fight frames; card text incomplete"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
                "sourceLabel": "Aug 14 clip"
              }
            ]
          }
        },
        {
          "id": "choose-target",
          "title": "Choose the upgrade that fixes your run",
          "paragraphs": [
            "Read how the ability behaves before investigating its source. Keep the equipment that already works while trying a replacement."
          ],
          "links": [
            {
              "href": "/spells/phantom-flames/",
              "label": "Phantom Flames guide",
              "description": "Ranged damage and positioning."
            },
            {
              "href": "/spells/infernal-orbs/",
              "label": "Infernal Orbs guide",
              "description": "Damage over time and cast windows."
            },
            {
              "href": "/spells/",
              "label": "Compare documented abilities",
              "description": "Recovery, damage and placed-area options."
            },
            {
              "href": "/spells/fire-bomb/",
              "label": "Fire Bomb source details",
              "description": "Recommendation versus reward proof."
            },
            {
              "href": "/spells/enhanced-inner-focus/",
              "label": "EIF source details",
              "description": "Compare the named drop with the ordinary skill."
            }
          ]
        },
        {
          "id": "northern-rewards",
          "title": "What about Northern Lands rewards?",
          "paragraphs": [
            "The September 6 title and recording add Odin Reincarnation to the reference set. Record whether a reward follows the normal clear or bonus encounter; do not merge both into one named loot pool."
          ],
          "links": [
            {
              "href": "/dungeons/northern-lands/",
              "label": "Northern Lands route",
              "description": "Learn the encounters before repeating runs."
            },
            {
              "href": "/dungeons/northern-lands/odin-reincarnation/",
              "label": "Odin Reincarnation",
              "description": "Read the bonus encounter separately."
            }
          ]
        },
        {
          "id": "plan-session",
          "title": "Plan a useful farming session",
          "paragraphs": [
            "When a source is only reported, treat a short session as exploration rather than a guaranteed farming route."
          ],
          "table": {
            "columns": [
              "Before the session",
              "After several runs"
            ],
            "rows": [
              {
                "cells": [
                  "Choose one dungeon and difficulty.",
                  "Compare completed runs, time spent and useful upgrades."
                ]
              },
              {
                "cells": [
                  "Keep a working loadout.",
                  "Change one weakness at a time."
                ]
              },
              {
                "cells": [
                  "Set a limit for investigating an uncertain source.",
                  "Stop or change route if the source stays unsupported."
                ]
              },
              {
                "cells": [
                  "Record complete rewards, including ordinary outcomes.",
                  "Keep observed outcomes separate from estimated probability."
                ]
              }
            ]
          }
        },
        {
          "id": "drop-rates",
          "title": "Why no drop percentages?",
          "paragraphs": [
            "An item appearing once supports an observation under those conditions, not a universal probability. An inventory item might have been traded.",
            "Rarity color, video titles and percentages copied between guide sites cannot establish a drop rate.",
            "Count completed eligible runs separately from individual reward rolls. Keep difficulty, party conditions and any displayed boost constant when comparing a sample. A short dry streak does not establish a bug, pity system or a changed probability."
          ]
        }
      ],
      "faq": [
        {
          "question": "Is this a complete drop table?",
          "answer": "No. It contains five explicitly labelled source reports or leads, not a complete loot table. Current difficulties and probabilities remain unknown."
        },
        {
          "question": "Does a borrowed weapon prove a dungeon drop?",
          "answer": "No. A borrowed-item showcase cannot establish the original reward conditions."
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Choose a useful ability."
        },
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Choose a route."
        },
        {
          "href": "/weapons/",
          "label": "Weapons",
          "description": "Compare the exact card."
        }
      ],
      "sources": [
        {
          "title": "Ability walkthrough — August 28, 2026",
          "url": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Creator narration and automatic captions reviewed September 5. Descriptions and locations are attributed reports; exact card values and reward screens have not been independently captured.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "SaltyNub: Northern Lands solo guide — September 2, 2026",
          "url": "https://www.youtube.com/watch?v=3pHhZpt-b-U",
          "evidenceNote": "Captions and chapter metadata reviewed September 5. Insane teaching run uses Nightmare equipment. Tactics are creator advice, not independent gameplay tests.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Enhanced Inner Focus reward clip — August 14",
          "url": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
          "evidenceNote": "Description links the exact Reborn game. Storyboard frames show Enchanted Forest Dragon and post-fight rewards; the small item text does not independently establish a full card, difficulty or rate.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Odin Reincarnation boss fight — September 6",
          "url": "https://www.youtube.com/watch?v=zNvSBG2Vp98",
          "evidenceNote": "Description links Reborn. Storyboard review shows a post-clear Fight prompt, a new boss bar, life icons and overlapping floor warnings. Not a controlled live test.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "drop-reports",
          "topic": "Acquisition reports",
          "claim": "Acquisition reports",
          "value": "Three locations reported; no verified difficulty or rate",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Dated creator narration; live values unverified",
          "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Original automatic captions reviewed directly; not independently captured item or reward data.",
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/dungeons/northern-lands/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Northern Lands: Bosses & Solo Route",
      "eyebrow": "Northern Lands walkthrough",
      "summary": "Read the September 2 normal-route companion, then the September 6 Odin Reincarnation bonus-boss guide. The older teaching run uses Nightmare equipment in Insane.",
      "quickAnswer": "Learn the sidestep-and-circle pull, save movement for the first boss's slam, guide Bob's orb into its matching rock, and keep distance from Odin. These are the creator's narrated tactics; the Insane teaching run uses Nightmare gear.",
      "verifiedForVersion": "September 2, 2026 solo-guide narration"
    },
    "content": {
      "sections": [
        {
          "id": "run-context",
          "title": "Before you enter",
          "paragraphs": [
            "The September 6 official title now names Odin Reincarnation. The route table below remains attributed to the September 2 recording and covers its earlier normal-route explanation; it is not the whole current bonus-boss flow.",
            "At 0:26 the creator explains the equipment. The teaching section is Insane with Nightmare gear, followed by a full Nightmare solo run at 17:38. Do not use its damage or clear speed as a minimum-entry requirement.",
            "Exact entry levels, boss health, timer and complete reward pool are unconfirmed here. Check the live selector."
          ],
          "links": [
            {
              "href": "/dungeons/northern-lands/odin-reincarnation/",
              "label": "New: Odin Reincarnation bonus encounter",
              "description": "September 6 entry prompt and battle observations."
            },
            {
              "href": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=26s",
              "label": "Equipment context · 0:26",
              "description": "Hear which gear and difficulty are used."
            },
            {
              "href": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=1058s",
              "label": "Full solo run · 17:38",
              "description": "See how the teaching sections connect."
            }
          ]
        },
        {
          "id": "room-route",
          "title": "Room-by-room route",
          "paragraphs": [
            "Community report: use each timestamp to follow the original explanation. Its named boss order is Midgardian Champion, Bob the Frost Giant, then Odin."
          ],
          "table": {
            "columns": [
              "Stage",
              "What to do",
              "Watch out for",
              "Explanation"
            ],
            "rows": [
              {
                "cells": [
                  "Opening groups",
                  "Approach, attack, sidestep, then move diagonally behind the mages.",
                  "Avoid moving straight through overlapping ranged attacks."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=83s",
                "sourceLabel": "1:23 · Sep 2"
              },
              {
                "cells": [
                  "Midgardian Champion",
                  "Use the center for reaction space, move to the edge for the starburst, then return. Save movement for the slam.",
                  "The creator uses a top-down view and releases shift lock between attacks."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=167s",
                "sourceLabel": "2:47 · Sep 2"
              },
              {
                "cells": [
                  "Groups after boss one",
                  "Approach from the side and circle behind the mages after their first attack.",
                  "Split pulls while learning."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=298s",
                "sourceLabel": "4:58 · Sep 2"
              },
              {
                "cells": [
                  "Bob the Frost Giant",
                  "Lead the following orb into the matching-colored rock; route around the laser first.",
                  "This is the September 2 creator's explanation, not an independently reproduced mechanic."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=409s",
                "sourceLabel": "6:49 · Sep 2"
              },
              {
                "cells": [
                  "Split groups and lower area",
                  "Pull the front group first. Sidestep while bringing enemies together.",
                  "Avoid waking the back group too early."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=566s",
                "sourceLabel": "9:26 · Sep 2"
              },
              {
                "cells": [
                  "Final approach",
                  "Leave room to sidestep mages attacking from the outskirts.",
                  "Do not copy the recording's reset shortcuts in Hardcore."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=832s",
                "sourceLabel": "13:52 · Sep 2"
              },
              {
                "cells": [
                  "Odin",
                  "Start at range near a doorway edge. Use a top-down view, move through ring gaps and watch dotted-line cues.",
                  "Reposition before attacking when hazards overlap."
                ],
                "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=919s",
                "sourceLabel": "15:19 · Sep 2"
              }
            ]
          }
        },
        {
          "id": "bob-orbs",
          "title": "Bob: match the orb to the rock",
          "paragraphs": [
            "At 6:49–8:58 the creator describes an orb following the player toward a same-colored rock. Place the rock between you and the orb so it reaches the rock first. The narration mentions an expiry penalty; no exact timing or damage is asserted here.",
            "At 8:39 the creator explains why running straight toward a rock can cross a laser. Avoid the beam, then finish guiding the orb. Keep space to see both hazards.",
            "Do not combine this with conflicting online advice about colliding colored objects. Follow the linked recording's context and your current encounter."
          ],
          "links": [
            {
              "href": "https://www.youtube.com/watch?v=3pHhZpt-b-U&t=409s",
              "label": "Bob's explanation · 6:49",
              "description": "Matching colors and laser positioning."
            }
          ]
        },
        {
          "id": "failed-run",
          "title": "Fix the part that ends your run",
          "paragraphs": [
            "Change the specific failure before spending more on gear."
          ],
          "table": {
            "columns": [
              "Failure",
              "First adjustment",
              "Reason"
            ],
            "rows": [
              {
                "cells": [
                  "Opening beams overlap",
                  "Pull less; sidestep before circling.",
                  "Fewer overlapping attacks are easier to read."
                ]
              },
              {
                "cells": [
                  "First boss catches you without movement",
                  "Hold movement until the slam warning.",
                  "The creator does not use it immediately on entry."
                ]
              },
              {
                "cells": [
                  "Bob's orb path crosses a laser",
                  "Go around the beam before finishing the match.",
                  "The shortest path can be unsafe."
                ]
              },
              {
                "cells": [
                  "Odin is unreadable at close range",
                  "Back off and re-establish a cast window.",
                  "Distance leaves more reaction time."
                ]
              },
              {
                "cells": [
                  "The video clears much faster",
                  "Check the gear and difficulty context.",
                  "Nightmare equipment is used for the Insane explanation."
                ]
              }
            ]
          }
        },
        {
          "id": "rewards",
          "title": "Drops and repeatable farming",
          "paragraphs": [
            "A route and a drop table answer different questions. This recording does not establish a named Northern Lands reward pool or exact probability.",
            "Practice a difficulty you can finish, identify where time is lost, and attempt harder runs when the route becomes repeatable. This is a planning suggestion, not a guaranteed damage threshold."
          ],
          "links": [
            {
              "href": "/drops/",
              "label": "Item-source lookup",
              "description": "Separate reports from rewards."
            },
            {
              "href": "/spells/",
              "label": "Choose an ability",
              "description": "Compare reach, recovery and cast commitment."
            }
          ]
        },
        {
          "id": "route-video",
          "title": "Watch the route walkthrough",
          "paragraphs": [
            "The recommendations are attributed to the September 2 recording. Post-update mechanics and precise values remain unverified."
          ],
          "media": [
            {
              "id": "northern-route",
              "type": "youtube",
              "videoId": "3pHhZpt-b-U",
              "title": "Northern Lands solo route",
              "alt": "Video preview: Northern Lands solo route",
              "caption": "Dated creator recording. Narration reviewed September 5; exact current card values and reward conditions remain unverified.",
              "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "northern-route"
              ],
              "capturedAt": "2026-09-05",
              "verifiedForVersion": "Dated community guide",
              "startSeconds": 94
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "What does NL mean?",
          "answer": "Here it means Northern Lands. Confirm the exact game because the original Dungeon Quest has similarly named content."
        },
        {
          "question": "How do I handle Bob's orb?",
          "answer": "The September 2 creator explains leading it into the matching-colored rock while avoiding the laser. Open the 6:49 explanation for context."
        },
        {
          "question": "What level is required?",
          "answer": "No exact current gate is confirmed here. Use the live selector, not the narrator's equipment level."
        },
        {
          "question": "Should I copy the reset shortcuts?",
          "answer": "The recording distinguishes normal play from Hardcore. Walk the route while learning rather than copying resets."
        }
      ],
      "related": [
        {
          "href": "/dungeons/northern-lands/odin-reincarnation/",
          "label": "Odin Reincarnation",
          "description": "Read the separate bonus fight."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Check acquisition reports."
        },
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare damage and recovery."
        },
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Plan the next run."
        }
      ],
      "sources": [
        {
          "title": "SaltyNub: Northern Lands solo guide — September 2, 2026",
          "url": "https://www.youtube.com/watch?v=3pHhZpt-b-U",
          "evidenceNote": "Captions and chapter metadata reviewed September 5. Insane teaching run uses Nightmare equipment. Tactics are creator advice, not independent gameplay tests.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Roblox Games API — universe 9931749389",
          "url": "https://games.roblox.com/v1/games?universeIds=9931749389",
          "evidenceNote": "September 5 retrieval: Northern Lands title; updated 2026-09-04T23:40:35.7319187Z. This timestamp supplies no patch details.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Dungeon Quest Reborn on Roblox",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "Public description checked September 5. No verifiable Trello URL found in this accessible source.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Odin Reincarnation boss fight — September 6",
          "url": "https://www.youtube.com/watch?v=zNvSBG2Vp98",
          "evidenceNote": "Description links Reborn. Storyboard review shows a post-clear Fight prompt, a new boss bar, life icons and overlapping floor warnings. Not a controlled live test.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "northern-route",
          "topic": "Narrated solo tactics",
          "claim": "Narrated solo tactics",
          "value": "Seven route stages with original timestamps",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Dated creator narration; live values unverified",
          "sourceURL": "https://www.youtube.com/watch?v=3pHhZpt-b-U",
          "evidenceNote": "Original automatic captions reviewed directly; no independent gameplay reproduction or current card values asserted.",
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/spells/phantom-flames/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Phantom Flames: Use & Source Report",
      "h1": "Dungeon Quest Reborn Phantom Flames",
      "eyebrow": "Ability guide",
      "summary": "Understand Phantom Flames' ranged damage role, its reported Pirate Island source, and the limits of the August 28 creator demonstration.",
      "quickAnswer": "Phantom Flames is described as ranged damage in the August 28 guide. The creator reports Pirate Island as its source, but difficulty, equip requirement and drop rate are not independently verified.",
      "verifiedForVersion": "August 28, 2026 ability walkthrough"
    },
    "content": {
      "sections": [
        {
          "id": "ability-overview",
          "title": "Phantom Flames at a glance",
          "paragraphs": [
            "The creator demonstrates reach against training dummies. Damage depends on the character's equipment and Spell Power; the recorded number is not a base-stat value."
          ],
          "table": {
            "columns": [
              "Question",
              "Answer",
              "Evidence"
            ],
            "rows": [
              {
                "cells": [
                  "What is its role?",
                  "ranged damage",
                  "Creator explanation; Aug 28."
                ]
              },
              {
                "cells": [
                  "Where is it reported?",
                  "Pirate Island",
                  "Spoken report; reward sequence not checked."
                ]
              },
              {
                "cells": [
                  "Which difficulty?",
                  "Unknown",
                  "No verified difficulty in the reviewed material."
                ]
              },
              {
                "cells": [
                  "Base stats and equip level?",
                  "Unknown",
                  "No independently inspected current card."
                ]
              }
            ]
          }
        },
        {
          "id": "how-to-use",
          "title": "How to use Phantom Flames",
          "paragraphs": [
            "Use its reach while preserving space for the next warning. Line up the target, cast, and check the result before spending your second ability.",
            "Compare a cast from a safe position with one while moving. Find an attack window you can repeat rather than trying to match the video's damage number."
          ]
        },
        {
          "id": "where-to-get",
          "title": "Where to look for Phantom Flames",
          "paragraphs": [
            "The creator attributes it to Pirate Island. This is an acquisition lead, not a verified reward condition. Difficulty and drop percentage remain unknown.",
            "Keep your working ability while investigating. Buying or borrowing an item does not prove it drops in the dungeon where it is used."
          ],
          "links": [
            {
              "href": "https://www.youtube.com/watch?v=FzogFp907JM&t=345s",
              "label": "Pirate Island source statement",
              "description": "Hear the original acquisition claim."
            },
            {
              "href": "/drops/",
              "label": "Compare item-source reports",
              "description": "See which locations still need reward proof."
            }
          ]
        },
        {
          "id": "alternatives",
          "title": "Compare a reachable alternative",
          "paragraphs": [
            "For enemies that remain inside a placed area, compare Ghostly Cannon Barrage or Ice Totem. For damage that continues after casting, compare Infernal Orbs. These are role comparisons, not a power ranking."
          ],
          "links": [
            {
              "href": "/spells/infernal-orbs/",
              "label": "Infernal Orbs guide",
              "description": "Compare a different damage pattern."
            },
            {
              "href": "/spells/",
              "label": "All documented abilities",
              "description": "See support and damage roles."
            }
          ]
        },
        {
          "id": "demonstration",
          "title": "Watch Phantom Flames explained",
          "paragraphs": [
            "The source is an August 28 community guide. Its personal rankings do not establish the best ability for every account or for later updates."
          ],
          "media": [
            {
              "id": "spell-phantom-flames",
              "type": "youtube",
              "videoId": "FzogFp907JM",
              "title": "Phantom Flames explanation",
              "alt": "Video preview: Phantom Flames explanation",
              "caption": "Dated creator recording. Narration reviewed September 5; exact current card values and reward conditions remain unverified.",
              "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "spell-phantom-flames"
              ],
              "capturedAt": "2026-09-05",
              "verifiedForVersion": "Dated community guide",
              "startSeconds": 283
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Where does Phantom Flames drop?",
          "answer": "The creator reports Pirate Island. Difficulty and probability remain unknown; this is an attributed lead rather than a verified loot table."
        },
        {
          "question": "Is Phantom Flames the best spell?",
          "answer": "No universal tier is asserted. Compare whether its cast pattern helps you finish your own dungeon safely."
        },
        {
          "question": "Are the video damage numbers base stats?",
          "answer": "No. Equipment and allocated stats change the displayed damage. This page does not reproduce those numbers as item attributes."
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare roles."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Check source reports."
        },
        {
          "href": "/dungeons/northern-lands/",
          "label": "Northern Lands",
          "description": "Plan safe cast windows."
        }
      ],
      "sources": [
        {
          "title": "Ability walkthrough — August 28, 2026",
          "url": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Creator narration and automatic captions reviewed September 5. Descriptions and locations are attributed reports; exact card values and reward screens have not been independently captured.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        }
      ],
      "claims": [
        {
          "id": "spell-phantom-flames",
          "topic": "Phantom Flames explanation",
          "claim": "Phantom Flames explanation",
          "value": "ranged damage; Pirate Island reported source",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Dated creator narration; live values unverified",
          "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=283s",
          "evidenceNote": "Original automatic captions reviewed directly; no independent gameplay reproduction or current card values asserted.",
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/spells/infernal-orbs/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Infernal Orbs: Use & Source Report",
      "h1": "Dungeon Quest Reborn Infernal Orbs",
      "eyebrow": "Ability guide",
      "summary": "Understand Infernal Orbs' damage over time role, its reported The Underworld source, and the limits of the August 28 creator demonstration.",
      "quickAnswer": "Infernal Orbs is described as damage over time in the August 28 guide. The creator reports The Underworld as its source, but difficulty, equip requirement and drop rate are not independently verified.",
      "verifiedForVersion": "August 28, 2026 ability walkthrough"
    },
    "content": {
      "sections": [
        {
          "id": "ability-overview",
          "title": "Infernal Orbs at a glance",
          "paragraphs": [
            "The creator demonstrates damage continuing after a cast and discusses using another ability while it runs. This is a rotation idea, not a measured DPS comparison."
          ],
          "table": {
            "columns": [
              "Question",
              "Answer",
              "Evidence"
            ],
            "rows": [
              {
                "cells": [
                  "What is its role?",
                  "damage over time",
                  "Creator explanation; Aug 28."
                ]
              },
              {
                "cells": [
                  "Where is it reported?",
                  "The Underworld",
                  "Spoken report; reward sequence not checked."
                ]
              },
              {
                "cells": [
                  "Which difficulty?",
                  "Unknown",
                  "No verified difficulty in the reviewed material."
                ]
              },
              {
                "cells": [
                  "Base stats and equip level?",
                  "Unknown",
                  "No independently inspected current card."
                ]
              }
            ]
          }
        },
        {
          "id": "how-to-use",
          "title": "How to use Infernal Orbs",
          "paragraphs": [
            "Apply the effect during a safe opening, then keep moving while it deals damage. Use the other slot only if its animation will not carry you into the next warning.",
            "A dummy demonstration does not prove performance against every boss. Compare successful casts on the same encounter before replacing a working ability."
          ]
        },
        {
          "id": "where-to-get",
          "title": "Where to look for Infernal Orbs",
          "paragraphs": [
            "The creator attributes it to The Underworld. This is an acquisition lead, not a verified reward condition. Difficulty and drop percentage remain unknown.",
            "Keep your working ability while investigating. Buying or borrowing an item does not prove it drops in the dungeon where it is used."
          ],
          "links": [
            {
              "href": "https://www.youtube.com/watch?v=FzogFp907JM&t=477s",
              "label": "The Underworld source statement",
              "description": "Hear the original acquisition claim."
            },
            {
              "href": "/drops/",
              "label": "Compare item-source reports",
              "description": "See which locations still need reward proof."
            }
          ]
        },
        {
          "id": "alternatives",
          "title": "Compare a reachable alternative",
          "paragraphs": [
            "For a different damage pattern, compare the ranged use described for Phantom Flames. For frequent casts, review Ice Needles. Keep the rest of your equipment unchanged when comparing."
          ],
          "links": [
            {
              "href": "/spells/phantom-flames/",
              "label": "Phantom Flames guide",
              "description": "Compare a different damage pattern."
            },
            {
              "href": "/spells/",
              "label": "All documented abilities",
              "description": "See support and damage roles."
            }
          ]
        },
        {
          "id": "demonstration",
          "title": "Watch Infernal Orbs explained",
          "paragraphs": [
            "The source is an August 28 community guide. Its personal rankings do not establish the best ability for every account or for later updates."
          ],
          "media": [
            {
              "id": "spell-infernal-orbs",
              "type": "youtube",
              "videoId": "FzogFp907JM",
              "title": "Infernal Orbs explanation",
              "alt": "Video preview: Infernal Orbs explanation",
              "caption": "Dated creator recording. Narration reviewed September 5; exact current card values and reward conditions remain unverified.",
              "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "spell-infernal-orbs"
              ],
              "capturedAt": "2026-09-05",
              "verifiedForVersion": "Dated community guide",
              "startSeconds": 477
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Where does Infernal Orbs drop?",
          "answer": "The creator reports The Underworld. Difficulty and probability remain unknown; this is an attributed lead rather than a verified loot table."
        },
        {
          "question": "Is Infernal Orbs the best spell?",
          "answer": "No universal tier is asserted. Compare whether its cast pattern helps you finish your own dungeon safely."
        },
        {
          "question": "Are the video damage numbers base stats?",
          "answer": "No. Equipment and allocated stats change the displayed damage. This page does not reproduce those numbers as item attributes."
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare roles."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Check source reports."
        },
        {
          "href": "/dungeons/northern-lands/",
          "label": "Northern Lands",
          "description": "Plan safe cast windows."
        }
      ],
      "sources": [
        {
          "title": "Ability walkthrough — August 28, 2026",
          "url": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Creator narration and automatic captions reviewed September 5. Descriptions and locations are attributed reports; exact card values and reward screens have not been independently captured.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        }
      ],
      "claims": [
        {
          "id": "spell-infernal-orbs",
          "topic": "Infernal Orbs explanation",
          "claim": "Infernal Orbs explanation",
          "value": "damage over time; The Underworld reported source",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Dated creator narration; live values unverified",
          "sourceURL": "https://www.youtube.com/watch?v=FzogFp907JM&t=477s",
          "evidenceNote": "Original automatic captions reviewed directly; no independent gameplay reproduction or current card values asserted.",
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/dungeons/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Dungeons: Routes & Next-Run Decisions",
      "eyebrow": "Dungeon guide hub",
      "summary": "Choose between the Northern Lands route guide, Winter Outpost video chapters and item-source reports. A complete current dungeon ladder is still unverified.",
      "quickAnswer": "For Northern Lands boss tactics, open the September 2 route companion. For Winter Outpost, choose the chapter matching your difficulty and role. For a target ability, start with its reported source rather than a guessed dungeon order.",
      "verifiedForVersion": null
    },
    "content": {
      "sections": [
        {
          "id": "covered-routes",
          "title": "Choose a covered route",
          "paragraphs": [
            "These are the routes covered here, not a complete dungeon list or a recommended order."
          ],
          "table": {
            "columns": [
              "Route",
              "What you can use",
              "Limit"
            ],
            "rows": [
              {
                "cells": [
                  "Northern Lands",
                  "Seven narrated route stages and three boss explanations",
                  "September 2 creator guide; live numeric gates unknown."
                ]
              },
              {
                "cells": [
                  "Winter Outpost",
                  "Warrior and Mage chapter links across five difficulty labels",
                  "July 25 reference; current mechanics not verified."
                ]
              },
              {
                "cells": [
                  "Pirate Island / The Underworld",
                  "Three named ability-source reports",
                  "No current difficulty or reward sequence confirmed."
                ]
              },
              {
                "cells": [
                  "Steampunk Sewers",
                  "Nightmare side-entry and movement tips",
                  "August 29 higher-level gear demonstration."
                ]
              },
              {
                "cells": [
                  "Boss Raids",
                  "Tier 1 Fusion Goliath reference",
                  "Current unlock/key rules not fully verified."
                ]
              },
              {
                "cells": [
                  "Egg Island",
                  "Selector identity and version check",
                  "Current function and rewards unknown."
                ]
              }
            ]
          },
          "links": [
            {
              "href": "/dungeons/northern-lands/",
              "label": "Northern Lands route",
              "description": "Boss responses and common failure fixes."
            },
            {
              "href": "/dungeons/winter-outpost/",
              "label": "Winter Outpost chapters",
              "description": "Jump to a difficulty and role."
            },
            {
              "href": "/drops/",
              "label": "Reported item locations",
              "description": "Start with a target ability."
            },
            {
              "href": "/dungeons/steampunk-sewers/",
              "label": "Steampunk Sewers",
              "description": "Dated solo tips."
            },
            {
              "href": "/guides/boss-raids/",
              "label": "Boss Raids",
              "description": "Separate encounters and entry reports."
            },
            {
              "href": "/guides/egg-island/",
              "label": "Egg Island",
              "description": "Check identity before using an old event guide."
            }
          ]
        },
        {
          "id": "run-selector",
          "title": "Choose the next run",
          "paragraphs": [
            "Use your current selector for entry conditions. Then decide whether your problem is access, survival, time or a target item."
          ],
          "table": {
            "columns": [
              "Situation",
              "Next step"
            ],
            "rows": [
              {
                "cells": [
                  "The dungeon is locked",
                  "Read the live requirement; do not substitute an old wiki level."
                ]
              },
              {
                "cells": [
                  "You enter but fail at one encounter",
                  "Practice that section before increasing difficulty."
                ]
              },
              {
                "cells": [
                  "You clear but repeatedly run out of time on a harder setting",
                  "Compare route delays and safe cast windows."
                ]
              },
              {
                "cells": [
                  "You want one named item",
                  "Check whether its exact source is confirmed or merely reported."
                ]
              },
              {
                "cells": [
                  "A new route opens",
                  "Keep a working loadout while testing the new encounter."
                ]
              }
            ]
          }
        },
        {
          "id": "progression-map",
          "title": "What to check before moving on",
          "paragraphs": [
            "Compare consistent completion, survivability and useful rewards. The newest accessible dungeon is not automatically the most productive route for your account.",
            "This hub does not publish a fixed dungeon count, level ladder or unlock order without a current selector capture. Official artwork and platform place names cannot supply those missing fields."
          ]
        }
      ],
      "faq": [
        {
          "question": "How many dungeons are there?",
          "answer": "A complete current sequence is not verified here. The table describes this site's coverage, not the game's total."
        },
        {
          "question": "Should I always run the highest difficulty?",
          "answer": "Use a difficulty you can complete reliably, then test whether the harder setting advances your actual goal."
        }
      ],
      "related": [
        {
          "href": "/dungeons/winter-outpost/",
          "label": "Winter Outpost",
          "description": "Difficulty chapter links."
        },
        {
          "href": "/dungeons/northern-lands/",
          "label": "Northern Lands",
          "description": "Narrated solo route."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Target-item reports."
        }
      ],
      "sources": [
        {
          "title": "Dungeon Quest Reborn on Roblox",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "Public description checked September 5. No verifiable Trello URL found in this accessible source.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "SaltyNub: Northern Lands solo guide — September 2, 2026",
          "url": "https://www.youtube.com/watch?v=3pHhZpt-b-U",
          "evidenceNote": "Captions and chapter metadata reviewed September 5. Insane teaching run uses Nightmare equipment. Tactics are creator advice, not independent gameplay tests.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Ability walkthrough — August 28, 2026",
          "url": "https://www.youtube.com/watch?v=FzogFp907JM",
          "evidenceNote": "Creator narration and automatic captions reviewed September 5. Descriptions and locations are attributed reports; exact card values and reward screens have not been independently captured.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-05"
        }
      ],
      "claims": []
    }
  },
  "/dungeons/winter-outpost/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Winter Outpost: Difficulty Video Guide",
      "eyebrow": "Winter Outpost video companion",
      "summary": "Jump to Warrior or Mage footage for your chosen difficulty. This July 25 reference has clear chapter markers, but current entry levels and loot remain unverified.",
      "quickAnswer": "Use the difficulty chapters to preview a run, then check the current selector. Fire Bomb, Gale Slice, Arcane Barrage and Ground Slam appear in a September 4 progression article, but its recommended stages are not verified drop conditions.",
      "verifiedForVersion": null
    },
    "content": {
      "sections": [
        {
          "id": "difficulty-chapters",
          "title": "Choose a difficulty chapter",
          "paragraphs": [
            "Chapter titles and timestamps were checked against the creator's video description on September 5. The recording was published July 25. We have not independently verified its present-day mechanics or recommended stats."
          ],
          "table": {
            "columns": [
              "Difficulty",
              "Role",
              "Reference date",
              "Watch chapter"
            ],
            "rows": [
              {
                "cells": [
                  "Easy",
                  "Warrior",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=19s",
                "sourceLabel": "0:19"
              },
              {
                "cells": [
                  "Easy",
                  "Mage",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=438s",
                "sourceLabel": "7:18"
              },
              {
                "cells": [
                  "Medium",
                  "Warrior",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=730s",
                "sourceLabel": "12:10"
              },
              {
                "cells": [
                  "Medium",
                  "Mage",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=820s",
                "sourceLabel": "13:40"
              },
              {
                "cells": [
                  "Hard",
                  "Warrior",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=887s",
                "sourceLabel": "14:47"
              },
              {
                "cells": [
                  "Hard",
                  "Mage",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=951s",
                "sourceLabel": "15:51"
              },
              {
                "cells": [
                  "Insane",
                  "Warrior",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=997s",
                "sourceLabel": "16:37"
              },
              {
                "cells": [
                  "Insane",
                  "Mage",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=1047s",
                "sourceLabel": "17:27"
              },
              {
                "cells": [
                  "Nightmare",
                  "Warrior",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=1106s",
                "sourceLabel": "18:26"
              },
              {
                "cells": [
                  "Nightmare",
                  "Mage",
                  "July 25, 2026"
                ],
                "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8&t=1168s",
                "sourceLabel": "19:28"
              }
            ]
          }
        },
        {
          "id": "drops",
          "title": "Winter Outpost skill and reward reports",
          "paragraphs": [
            "A recommendation table tells you what an author suggests using at a stage; it does not prove which difficulty drops it. Separate the two before committing to a farm."
          ],
          "table": {
            "columns": [
              "Skill",
              "Why it is listed",
              "What is missing"
            ],
            "rows": [
              {
                "cells": [
                  "Fire Bomb",
                  "Mage progression recommendation",
                  "Current reward condition and full card."
                ]
              },
              {
                "cells": [
                  "Gale Slice",
                  "Warrior progression recommendation",
                  "Independent difficulty-specific reward record."
                ]
              },
              {
                "cells": [
                  "Arcane Barrage",
                  "Later Warrior recommendation",
                  "Current card and reward proof."
                ]
              },
              {
                "cells": [
                  "Ground Slam",
                  "Transition recommendation also mentions Pirate Island",
                  "Do not assume one exclusive dungeon source."
                ]
              }
            ]
          },
          "links": [
            {
              "href": "/spells/fire-bomb/",
              "label": "Fire Bomb guide",
              "description": "Read the source comparison."
            },
            {
              "href": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
              "label": "Read the progression article",
              "description": "September 4 editorial source."
            },
            {
              "href": "/drops/#drop-rates",
              "label": "Drop-rate questions",
              "description": "Why a dry streak is not a measured probability."
            }
          ]
        },
        {
          "id": "prepare",
          "title": "Before copying a loadout",
          "paragraphs": [
            "Check your own difficulty selector and equipment labels first. The source description includes numerical recommendations, but those older numbers have not been validated for the current game and are intentionally omitted.",
            "Choose the matching role chapter to compare attack placement and movement. If your ability behaves differently, use the current card rather than forcing the older setup."
          ],
          "links": [
            {
              "href": "/spells/",
              "label": "Compare named abilities",
              "description": "Review cast roles and source limits."
            },
            {
              "href": "/drops/",
              "label": "Find an item-source report",
              "description": "Keep acquisition claims separate from showcased gear."
            }
          ]
        },
        {
          "id": "first-clear",
          "title": "Make the next attempt useful",
          "paragraphs": [
            "Identify whether you fail in a room or at the boss. Replay the corresponding part of the chapter before changing equipment. Keep a working loadout and change one element at a time.",
            "The chapter timestamps are navigation aids, not expected clear times. No exact current boss mechanics, level gate or Winter Outpost drop list is asserted here."
          ]
        },
        {
          "id": "walkthrough-coverage",
          "title": "Community Walkthrough Coverage",
          "paragraphs": [
            "This reference links directly to the Reborn experience in its description. It is an older community video, not a current difficulty or drop guarantee."
          ],
          "media": [
            {
              "id": "winter-chapters",
              "type": "youtube",
              "videoId": "qDPjeoLcmn8",
              "title": "Winter Outpost multi-difficulty solo guide",
              "alt": "Video preview for a Winter Outpost guide",
              "caption": "July 25 community reference. Chapter metadata checked September 5; current route mechanics and rewards remain unverified.",
              "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "winter-chapters"
              ],
              "capturedAt": "2026-09-05",
              "verifiedForVersion": null,
              "startSeconds": 19
            }
          ]
        },
        {
          "id": "next-run",
          "title": "When to move on",
          "paragraphs": [
            "Check whether your next route is selectable, then try it with the loadout that already works. If you fail at one warning, practice that encounter before replacing every item.",
            "The July video is a viewing reference, not proof that all entry gates and boss attacks remain unchanged in September. No complete current boss script is asserted."
          ],
          "links": [
            {
              "href": "/spells/phantom-flames/",
              "label": "Phantom Flames",
              "description": "A later ability use and source report."
            },
            {
              "href": "/dungeons/",
              "label": "Choose the next run",
              "description": "Use current access rather than an old level ladder."
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "What level unlocks Winter Outpost?",
          "answer": "No exact current gate is verified here. Check the live selector."
        },
        {
          "question": "Are chapter times clear times?",
          "answer": "No. They locate parts of the video and must not be used as expected run durations."
        }
      ],
      "related": [
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Choose a route."
        },
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare ability uses."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Read acquisition reports."
        }
      ],
      "sources": [
        {
          "title": "Winter Outpost solo guide — July 25, 2026",
          "url": "https://www.youtube.com/watch?v=qDPjeoLcmn8",
          "evidenceLevel": "Community Confirmed",
          "evidenceNote": "Original video description and ten chapter labels checked September 5. Captions were rate-limited; gameplay not independently reproduced.",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Dungeon Quest Reborn on Roblox",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "Public description checked September 5. No verifiable Trello URL found in this accessible source.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "winter-chapters",
          "topic": "Video chapters",
          "claim": "The source describes difficulty and role chapters",
          "value": "Ten chapter links; current gameplay details unverified",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": null,
          "sourceURL": "https://www.youtube.com/watch?v=qDPjeoLcmn8",
          "evidenceNote": "Chapter metadata only; not verified present-day dungeon conditions.",
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/spells/fire-bomb/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Fire Bomb: What’s Known",
      "h1": "Dungeon Quest Reborn Fire Bomb: What’s Known",
      "eyebrow": "Player guide",
      "summary": "Fire Bomb’s Winter Outpost recommendation, skill-name checks and unconfirmed drop details.",
      "quickAnswer": "Destructoid’s September 4 guide recommends Fire Bomb for Mages progressing through Winter Outpost. Its drop difficulty and stats are still unconfirmed.",
      "verifiedForVersion": "Source review: September 6, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "ability-overview",
          "title": "Fire Bomb at a glance",
          "paragraphs": [
            "Check the full name on the skill card. Search results also mention Fireball and Blue Fireball; their names alone do not establish whether they are the same skill."
          ],
          "table": {
            "columns": [
              "Question",
              "Current answer"
            ],
            "rows": [
              {
                "cells": [
                  "Role",
                  "Mage option in the September 4 editorial table."
                ]
              },
              {
                "cells": [
                  "Associated dungeon",
                  "Winter Outpost — attributed recommendation."
                ]
              },
              {
                "cells": [
                  "Drop difficulty",
                  "Unresolved; recommendations are not reward evidence."
                ]
              },
              {
                "cells": [
                  "Equip level / cooldown / damage",
                  "Not independently verified."
                ]
              }
            ]
          }
        },
        {
          "id": "where-to-get",
          "title": "Where can you get Fire Bomb?",
          "paragraphs": [
            "Destructoid recommends Fire Bomb for the Winter Outpost Hard/Insane stage. The article does not confirm which difficulty drops it, so this recommendation alone is not enough to choose a farming route."
          ],
          "links": [
            {
              "href": "/dungeons/winter-outpost/#drops",
              "label": "Winter Outpost source notes",
              "description": "Compare the reward evidence before farming."
            },
            {
              "href": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
              "label": "Read the editorial recommendation",
              "description": "September 4 Mage progression table."
            }
          ]
        },
        {
          "id": "use",
          "title": "Before changing your loadout",
          "paragraphs": [
            "Check the card’s power type and requirements before equipping it. Try a cast against a familiar target to see where it lands and how much ground it covers. Keep your current skill if Fire Bomb makes it harder to dodge."
          ],
          "links": [
            {
              "href": "/spells/phantom-flames/",
              "label": "Phantom Flames",
              "description": "Compare a documented ranged-use report."
            },
            {
              "href": "/spells/",
              "label": "All documented abilities",
              "description": "Use the name and role filters."
            }
          ]
        },
        {
          "id": "demonstration",
          "title": "Stats and drop details",
          "paragraphs": [
            "Equip level, cooldown, damage and drop chance are unconfirmed."
          ]
        }
      ],
      "faq": [
        {
          "question": "Which difficulty drops Fire Bomb?",
          "answer": "Not confirmed by the material reviewed. The September 4 guide recommends it at the Hard/Insane stage; that does not prove the drop condition."
        },
        {
          "question": "Is Fire Bomb the same as Fireball?",
          "answer": "Do not assume so. Match the exact current card name and category."
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare uses."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Check reported drop locations."
        },
        {
          "href": "/dungeons/winter-outpost/",
          "label": "Winter Outpost",
          "description": "Choose the correct reference."
        }
      ],
      "sources": [
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Official Roblox experience",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "September 6 public listing: [Odin Reincarnation] Dungeon Quest Reborn. No patch mechanics inferred.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "source-summary",
          "topic": "Fire Bomb: Use & Location Reports",
          "claim": "Source scope",
          "value": "Destructoid’s September 4 guide recommends Fire Bomb for Mages progressing through Winter Outpost. Its drop difficulty and stats are still unconfirmed.",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Source review: September 6, 2026",
          "sourceURL": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/spells/enhanced-inner-focus/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Enhanced Inner Focus (EIF)",
      "h1": "Dungeon Quest Reborn Enhanced Inner Focus (EIF)",
      "eyebrow": "Player guide",
      "summary": "Reported EIF drops, the regular Inner Focus comparison and trade terminology.",
      "quickAnswer": "EIF stands for Enhanced Inner Focus. An August 14 video reports receiving it after an Enchanted Forest fight, but the difficulty and drop chance are unconfirmed. The September 1 comparison demonstrates regular Inner Focus.",
      "verifiedForVersion": "Source review: September 6, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "ability-overview",
          "title": "EIF and regular Inner Focus",
          "paragraphs": [
            "These similar names matter when reading a build or trade offer."
          ],
          "table": {
            "columns": [
              "Term",
              "How to read it"
            ],
            "rows": [
              {
                "cells": [
                  "EIF",
                  "Enhanced Inner Focus: the named reward in an August 14 Reborn-labelled clip."
                ]
              },
              {
                "cells": [
                  "Inner Focus",
                  "The ordinary skill demonstrated in the September 1 comparison."
                ]
              }
            ]
          }
        },
        {
          "id": "where-to-get",
          "title": "Where can you get EIF?",
          "paragraphs": [
            "An August 14 Reborn video shows an Enchanted Forest Dragon fight followed by rewards. The creator names Enhanced Inner Focus in the title, but the reward text is too small to verify the item card or difficulty. This is a player-reported drop location; claims that EIF drops in every dungeon remain unconfirmed."
          ],
          "media": [
            {
              "id": "eTmKGYKOFYI",
              "type": "youtube",
              "videoId": "eTmKGYKOFYI",
              "title": "Enhanced Inner Focus reward reference",
              "alt": "Community video: Enhanced Inner Focus reward reference",
              "caption": "August 14: the creator reports EIF after an Enchanted Forest fight. Difficulty is unconfirmed.",
              "sourceURL": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community source",
              "startSeconds": 0
            }
          ]
        },
        {
          "id": "alternative",
          "title": "What to use while farming for EIF",
          "paragraphs": [
            "The September 1 video shows regular Inner Focus as an alternative. If you own it, compare a buff-and-attack setup with your usual skills on a run you know well. The video does not demonstrate EIF’s effect or confirm its multiplier."
          ],
          "links": [
            {
              "href": "/builds/mage/",
              "label": "Mage loadout choices",
              "description": "Compare a buff slot with a second attack."
            }
          ]
        },
        {
          "id": "trade-language",
          "title": "When EIF appears in a trade quote",
          "paragraphs": [
            "If a trade quote uses EIF as a unit of value, confirm the exact items offered. An asking price alone does not tell you what players are paying."
          ],
          "links": [
            {
              "href": "/trading/",
              "label": "Trading guide",
              "description": "Review the actual offer and source limits."
            }
          ]
        },
        {
          "id": "demonstration",
          "title": "Watch the ordinary-skill comparison",
          "paragraphs": [
            "The creator distinguishes the unavailable enhanced spells from the ordinary skill near the start. The demonstration begins around 1:10."
          ],
          "media": [
            {
              "id": "I11sThLGWJs",
              "type": "youtube",
              "videoId": "I11sThLGWJs",
              "title": "Ordinary Inner Focus comparison",
              "alt": "Community video: Ordinary Inner Focus comparison",
              "caption": "September 1: regular Inner Focus comparison. The demonstration starts around 1:10.",
              "sourceURL": "https://www.youtube.com/watch?v=I11sThLGWJs",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community source",
              "startSeconds": 70
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Where can I get Enhanced Inner Focus?",
          "answer": "An August 14 player video reports it after an Enchanted Forest fight. The difficulty and drop chance are unconfirmed."
        },
        {
          "question": "Does the comparison video show EIF?",
          "answer": "No. The September 1 comparison shows regular Inner Focus; the creator says they do not own the enhanced version."
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare available abilities."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Read the source and rate limits."
        },
        {
          "href": "/trading/",
          "label": "Trading",
          "description": "Interpret offers carefully."
        }
      ],
      "sources": [
        {
          "title": "Enhanced Inner Focus reward clip — August 14",
          "url": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
          "evidenceNote": "Description links the exact Reborn game. Storyboard frames show Enchanted Forest Dragon and post-fight rewards; the small item text does not independently establish a full card, difficulty or rate.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Inner Focus comparison — September 1",
          "url": "https://www.youtube.com/watch?v=I11sThLGWJs",
          "evidenceNote": "Captions reviewed. The creator explicitly does not own the enhanced spells; the demonstrated skill is the ordinary Inner Focus. Narrated percentages and probabilities are excluded.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "source-summary",
          "topic": "Enhanced Inner Focus (EIF)",
          "claim": "Source scope",
          "value": "EIF stands for Enhanced Inner Focus. An August 14 video reports receiving it after an Enchanted Forest fight, but the difficulty and drop chance are unconfirmed. The September 1 comparison demonstrates regular Inner Focus.",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Source review: September 6, 2026",
          "sourceURL": "https://www.youtube.com/watch?v=eTmKGYKOFYI",
          "evidenceNote": "Description links the exact Reborn game. Storyboard frames show Enchanted Forest Dragon and post-fight rewards; the small item text does not independently establish a full card, difficulty or rate.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/guides/egg-island/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Egg Island: Where to Look",
      "h1": "Dungeon Quest Reborn Egg Island: Where to Look",
      "eyebrow": "Player guide",
      "summary": "Where Egg Island appeared in Reborn’s menu and which details remain unknown.",
      "quickAnswer": "Egg Island appears in the Play menu in Rexon’s August 27 Reborn video. Check your current menu for the same entry. Its rewards and entry requirements are still unconfirmed.",
      "verifiedForVersion": "Source review: September 6, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "entry",
          "title": "Find the right destination",
          "paragraphs": [
            "Open Play and look for Egg Island. Rexon’s August 27 video shows that menu entry, but its current availability and requirements have not been verified."
          ],
          "media": [
            {
              "id": "HEsb6IWo5KU",
              "type": "youtube",
              "videoId": "HEsb6IWo5KU",
              "title": "Reborn lobby and progression reference",
              "alt": "Community video: Reborn lobby and progression reference",
              "caption": "August 27: Rexon’s Reborn lobby footage includes Egg Island in the Play menu.",
              "sourceURL": "https://www.youtube.com/watch?v=HEsb6IWo5KU",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community source",
              "startSeconds": 0
            }
          ]
        },
        {
          "id": "known",
          "title": "Rewards and availability",
          "paragraphs": [
            "The menu footage does not show Egg Island’s purpose, rewards or opening schedule."
          ]
        },
        {
          "id": "wrong-version",
          "title": "Avoid an older event walkthrough",
          "paragraphs": [
            "The December 2020 Egg Island walkthrough covers the older Dungeon Quest game. It does not confirm how Egg Island works in Reborn."
          ]
        },
        {
          "id": "next-step",
          "title": "If you are trying to progress",
          "paragraphs": [
            "For progression, check the requirements shown in your current dungeon menu. The routes below provide other places to start."
          ],
          "links": [
            {
              "href": "/dungeons/winter-outpost/",
              "label": "Winter Outpost reference",
              "description": "Difficulty chapters and source reports."
            },
            {
              "href": "/dungeons/",
              "label": "Dungeon routes",
              "description": "Choose by access and completion."
            },
            {
              "href": "/discord/",
              "label": "Community information",
              "description": "Find a place to ask a specific current-version question."
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Where is Egg Island?",
          "answer": "It appears in the Play menu in Rexon’s August 27 video. Check your current menu for availability."
        },
        {
          "question": "Can I use the 2020 Egg Island walkthrough?",
          "answer": "That walkthrough covers the older game. Its mechanics have not been confirmed for Reborn."
        }
      ],
      "related": [
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Choose a documented route."
        },
        {
          "href": "/cosmetics/",
          "label": "Cosmetics",
          "description": "Keep appearance and progression separate."
        },
        {
          "href": "/beginner-guide/",
          "label": "Beginner guide",
          "description": "Plan a first run."
        }
      ],
      "sources": [
        {
          "title": "Rexon progression guide — August 27",
          "url": "https://www.youtube.com/watch?v=HEsb6IWo5KU",
          "evidenceNote": "Original description and storyboard reviewed: lobby Play selector includes Egg Island; shop shows VIP, x2 Gold and Extra Item. Caption retrieval failed, so no narration is assumed.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Official Roblox experience",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "September 6 public listing: [Odin Reincarnation] Dungeon Quest Reborn. No patch mechanics inferred.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "source-summary",
          "topic": "Egg Island: Entry & Version Check",
          "claim": "Source scope",
          "value": "Egg Island appears in the Play menu in Rexon’s August 27 Reborn video. Check your current menu for the same entry. Its rewards and entry requirements are still unconfirmed.",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Source review: September 6, 2026",
          "sourceURL": "https://www.youtube.com/watch?v=HEsb6IWo5KU",
          "evidenceNote": "Original description and storyboard reviewed: lobby Play selector includes Egg Island; shop shows VIP, x2 Gold and Extra Item. Caption retrieval failed, so no narration is assumed.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/dungeons/northern-lands/odin-reincarnation/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Odin Reincarnation: Bonus Boss Guide",
      "h1": "Dungeon Quest Reborn Odin Reincarnation: Bonus Boss Guide",
      "eyebrow": "Player guide",
      "summary": "Bonus-fight entry, visible arena warnings and preparation notes from September 6 community footage.",
      "quickAnswer": "A September 6 recording shows Odin Reincarnation as a bonus fight after a clear. The player selects “Fight” at the bonus-boss prompt. The footage shows overlapping floor warnings; unlock conditions and rewards remain unconfirmed.",
      "verifiedForVersion": "Source review: September 6, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "entry",
          "title": "Entering the bonus encounter",
          "paragraphs": [
            "After the clear, the video shows a “Stay and fight the bonus boss?” prompt. The player selects Fight, and a separate boss bar names Odin Reincarnation. The clip does not confirm which difficulties offer this encounter."
          ],
          "media": [
            {
              "id": "zNvSBG2Vp98",
              "type": "youtube",
              "videoId": "zNvSBG2Vp98",
              "title": "Odin Reincarnation entry and fight",
              "alt": "Community video: Odin Reincarnation entry and fight",
              "caption": "September 6: bonus-boss prompt followed by the Odin Reincarnation fight.",
              "sourceURL": "https://www.youtube.com/watch?v=zNvSBG2Vp98",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community source",
              "startSeconds": 0
            }
          ]
        },
        {
          "id": "patterns",
          "title": "Read the arena before attacking",
          "paragraphs": [
            "The footage shows overlapping circular markers and broad directional warnings. Look for open space before attacking. These tips are based on the linked footage; exact attack timings and safe spots are unconfirmed."
          ],
          "table": {
            "columns": [
              "What you see",
              "What to try"
            ],
            "rows": [
              {
                "cells": [
                  "Several marked areas overlap",
                  "Move toward a visible clear area before committing another cast."
                ]
              },
              {
                "cells": [
                  "A broad direction becomes covered",
                  "Preserve lateral room rather than standing against an edge."
                ]
              },
              {
                "cells": [
                  "Effects obscure the character",
                  "Adjust camera distance and re-establish a readable position."
                ]
              },
              {
                "cells": [
                  "Life icons and a timer are displayed",
                  "Check the remaining lives and timer before your next attempt."
                ]
              }
            ]
          }
        },
        {
          "id": "loadout",
          "title": "Prepare for a learning attempt",
          "paragraphs": [
            "Use skills whose timing you know. If casting keeps getting you caught in a warning zone, try a skill that gives you more time to move.",
            "The second video is labelled Nightmare HC by its creator. You can compare the run, but it does not establish minimum stats."
          ],
          "links": [
            {
              "href": "https://www.youtube.com/watch?v=auyxc4WMzTY",
              "label": "Full route plus bonus boss reference",
              "description": "September 6 solo upload."
            },
            {
              "href": "/spells/",
              "label": "Ability use cases",
              "description": "Compare movement commitment and reach."
            }
          ]
        },
        {
          "id": "rewards",
          "title": "What does Odin Reincarnation drop?",
          "paragraphs": [
            "The reward pool and drop chances are unconfirmed. Keep rewards from the regular Northern Lands bosses separate from bonus-boss rewards when comparing reports."
          ],
          "links": [
            {
              "href": "/drops/",
              "label": "Drop-source notes",
              "description": "Keep encounter, difficulty and reward together."
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Is Odin Reincarnation the same fight as Odin?",
          "answer": "The September 6 recording shows an extra prompt and a separate named fight after a clear. The earlier Odin route alone does not cover it."
        },
        {
          "question": "Is a specific weapon guaranteed?",
          "answer": "No guaranteed reward or exact drop probability is verified here."
        }
      ],
      "related": [
        {
          "href": "/dungeons/northern-lands/",
          "label": "Northern Lands",
          "description": "Prepare for the preceding route."
        },
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare cast patterns."
        },
        {
          "href": "/updates/",
          "label": "Updates",
          "description": "Read the dated title change."
        }
      ],
      "sources": [
        {
          "title": "Odin Reincarnation boss fight — September 6",
          "url": "https://www.youtube.com/watch?v=zNvSBG2Vp98",
          "evidenceNote": "Description links Reborn. Storyboard review shows a post-clear Fight prompt, a new boss bar, life icons and overlapping floor warnings. Not a controlled live test.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Northern Lands + bonus boss solo — September 6",
          "url": "https://www.youtube.com/watch?v=auyxc4WMzTY",
          "evidenceNote": "Independent creator labels the recording Nightmare HC plus Odin Reincarnation. The title is context, not proof of universal requirements or rewards.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Official Roblox experience",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "September 6 public listing: [Odin Reincarnation] Dungeon Quest Reborn. No patch mechanics inferred.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "source-summary",
          "topic": "Odin Reincarnation: Bonus Boss Guide",
          "claim": "Source scope",
          "value": "A September 6 recording shows Odin Reincarnation as a bonus fight after a clear. The player selects “Fight” at the bonus-boss prompt. The footage shows overlapping floor warnings; unlock conditions and rewards remain unconfirmed.",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Source review: September 6, 2026",
          "sourceURL": "https://www.youtube.com/watch?v=zNvSBG2Vp98",
          "evidenceNote": "Description links Reborn. Storyboard review shows a post-clear Fight prompt, a new boss bar, life icons and overlapping floor warnings. Not a controlled live test.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/dungeons/steampunk-sewers/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Steampunk Sewers: Nightmare Tips",
      "h1": "Dungeon Quest Reborn Steampunk Sewers: Nightmare Tips",
      "eyebrow": "Player guide",
      "summary": "Room-entry and boss tips from an August 29 Nightmare run using Pulse Waves.",
      "quickAnswer": "The August 29 Nightmare guide recommends moving sideways when entering rooms and watching the boss’s orb before casting. The run uses Pulse Waves and level-160 gear, so it does not show the minimum equipment needed to clear.",
      "verifiedForVersion": "Source review: September 6, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "context",
          "title": "Watch the Nightmare run",
          "paragraphs": [
            "The creator identifies this as Nightmare without Hardcore. The timestamped tips below follow that run."
          ],
          "media": [
            {
              "id": "x1_Z-xZl23I",
              "type": "youtube",
              "videoId": "x1_Z-xZl23I",
              "title": "Steampunk Sewers narrated attempt",
              "alt": "Community video: Steampunk Sewers narrated attempt",
              "caption": "August 29: Nightmare without Hardcore, using Pulse Waves and level-160 gear.",
              "sourceURL": "https://www.youtube.com/watch?v=x1_Z-xZl23I",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community source",
              "startSeconds": 20
            }
          ]
        },
        {
          "id": "route",
          "title": "Room entry and boss tips",
          "paragraphs": [],
          "table": {
            "columns": [
              "Moment",
              "Creator advice",
              "How to apply it"
            ],
            "rows": [
              {
                "cells": [
                  "1:08",
                  "Use side-to-side movement; the creator prefers shift lock.",
                  "Choose camera controls that let you read the warning; mobile controls may differ."
                ]
              },
              {
                "cells": [
                  "1:29",
                  "Watch the boss orb and nearby attack areas.",
                  "Look for the next clear movement path before casting."
                ]
              },
              {
                "cells": [
                  "2:29",
                  "Review equipment upgrades when beginning the route.",
                  "Keep a working set and identify the slot causing repeated failure."
                ]
              },
              {
                "cells": [
                  "3:35",
                  "Move toward the side when entering a room.",
                  "Avoid walking directly into aligned ranged attacks."
                ]
              }
            ]
          }
        },
        {
          "id": "abilities",
          "title": "Pulse Waves and alternatives",
          "paragraphs": [
            "The run uses Pulse Waves. If you do not have it, try a familiar skill with enough reach and time between casts to dodge. The video does not confirm where Pulse Waves drops or its base cooldown."
          ],
          "links": [
            {
              "href": "/spells/",
              "label": "Ability options",
              "description": "Compare spell options."
            },
            {
              "href": "/builds/mage/",
              "label": "Mage choices",
              "description": "Keep the loadout coherent."
            }
          ]
        },
        {
          "id": "drops",
          "title": "Rewards and next steps",
          "paragraphs": [
            "Entry levels, rewards and later unlocks are unconfirmed. Check your current dungeon menu for the routes available to your character."
          ],
          "links": [
            {
              "href": "/drops/",
              "label": "Drop evidence",
              "description": "Check what an acquisition report actually proves."
            },
            {
              "href": "/guides/boss-raids/",
              "label": "Boss Raids",
              "description": "Compare the separate encounter mode."
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "Is the video a Hardcore run?",
          "answer": "No. The creator identifies it as Nightmare without Hardcore."
        },
        {
          "question": "Do I need level-160 gear to clear?",
          "answer": "The creator uses level-160 gear, but the video does not establish the minimum equipment needed."
        }
      ],
      "related": [
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Choose the next route."
        },
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Compare use cases."
        },
        {
          "href": "/guides/boss-raids/",
          "label": "Boss Raids",
          "description": "Read the separate mode guide."
        }
      ],
      "sources": [
        {
          "title": "Steampunk Sewers tips — August 29",
          "url": "https://www.youtube.com/watch?v=x1_Z-xZl23I",
          "evidenceNote": "Captions directly reviewed. Creator says Nightmare, not Hardcore, with level-160 gear. Pulse Waves advice is personal and does not establish drop conditions or base cooldown.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Official Roblox experience",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "September 6 public listing: [Odin Reincarnation] Dungeon Quest Reborn. No patch mechanics inferred.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "source-summary",
          "topic": "Steampunk Sewers: Solo Route Tips",
          "claim": "Source scope",
          "value": "The August 29 Nightmare guide recommends moving sideways when entering rooms and watching the boss’s orb before casting. The run uses Pulse Waves and level-160 gear, so it does not show the minimum equipment needed to clear.",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Source review: September 6, 2026",
          "sourceURL": "https://www.youtube.com/watch?v=x1_Z-xZl23I",
          "evidenceNote": "Captions directly reviewed. Creator says Nightmare, not Hardcore, with level-160 gear. Pulse Waves advice is personal and does not establish drop conditions or base cooldown.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/guides/boss-raids/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Boss Raids: Fusion Goliath Tips",
      "h1": "Dungeon Quest Reborn Boss Raids: Fusion Goliath Tips",
      "eyebrow": "Player guide",
      "summary": "Fusion Goliath attack warnings, a Tier 1 video and reported raid entry levels.",
      "quickAnswer": "The linked guide shows a Tier 1 Fusion Goliath fight with overlapping circular and straight attack zones. Players report joining raids around level 130; the current unlock requirement and key rules are unconfirmed.",
      "verifiedForVersion": "Source review: September 6, 2026"
    },
    "content": {
      "sections": [
        {
          "id": "entry",
          "title": "Access and preparation",
          "paragraphs": [
            "Two player guides discuss raids around level 130. Check the current raid menu for the actual entry requirement.",
            "A progression video shows a Boss Keys inventory category, but does not explain which keys a raid uses or whether joining consumes them."
          ],
          "links": [
            {
              "href": "/discord/",
              "label": "Find community information",
              "description": "Ask about the exact raid, tier and current requirements."
            },
            {
              "href": "/gamepasses/",
              "label": "Gamepass planning",
              "description": "Separate raid advice from purchase promises."
            }
          ]
        },
        {
          "id": "fusion",
          "title": "Fusion Goliath: read the marked areas",
          "paragraphs": [
            "The August 25 video shows Tier 1 Fusion Goliath with circular and straight warning zones. The gear showcase starts at 0:16; the fight starts at 0:28."
          ],
          "table": {
            "columns": [
              "Situation",
              "Decision"
            ],
            "rows": [
              {
                "cells": [
                  "Circular and straight zones overlap",
                  "Find a clear path before committing a cast."
                ]
              },
              {
                "cells": [
                  "The boss closes the gap",
                  "Keep enough room to change direction instead of backing into an edge."
                ]
              }
            ]
          }
        },
        {
          "id": "raid-video",
          "title": "Watch Tier 1 Fusion Goliath",
          "paragraphs": [
            "This video covers Fusion Goliath at Tier 1. Other raid bosses and tiers are not covered here."
          ],
          "media": [
            {
              "id": "ZoCazKucPnI",
              "type": "youtube",
              "videoId": "ZoCazKucPnI",
              "title": "Fusion Goliath raid reference",
              "alt": "Community video: Fusion Goliath raid reference",
              "caption": "Tier 1 Fusion Goliath. Gear showcase starts at 0:16; the fight starts at 0:28.",
              "sourceURL": "https://www.youtube.com/watch?v=ZoCazKucPnI",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community source",
              "startSeconds": 28
            }
          ]
        },
        {
          "id": "rewards",
          "title": "Rewards, keys and resets",
          "paragraphs": [
            "Key consumption, reset times, ticket limits and the full reward list are unconfirmed. Original Dungeon Quest schedules may not apply to Reborn.",
            "One creator recommends raids to earn Gold for passes, but gives no verified income per run."
          ],
          "links": [
            {
              "href": "/drops/",
              "label": "Drop sources",
              "description": "Record the exact encounter and reward."
            },
            {
              "href": "/dungeons/",
              "label": "Regular dungeon routes",
              "description": "Compare a run you already complete reliably."
            }
          ]
        }
      ],
      "faq": [
        {
          "question": "What level unlocks raids?",
          "answer": "Creators discuss level 130, but the exact current menu requirement is not independently verified here."
        },
        {
          "question": "Are there daily tickets like the original game?",
          "answer": "No such current Reborn schedule is established by the reviewed material. Check the raid menu rather than using original-game reset times."
        }
      ],
      "related": [
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Regular routes."
        },
        {
          "href": "/gamepasses/",
          "label": "Gamepasses",
          "description": "Evaluate purchases."
        },
        {
          "href": "/discord/",
          "label": "Discord",
          "description": "Community entry point."
        }
      ],
      "sources": [
        {
          "title": "Fusion Goliath raid guide — August 25",
          "url": "https://www.youtube.com/watch?v=ZoCazKucPnI",
          "evidenceNote": "Storyboard review shows Tier 1, Fusion Goliath, life icons and overlapping circular/linear attack zones. Video labels gear at 0:16 and raid at 0:28.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Level 130–140 Boss Raids — September 4",
          "url": "https://www.youtube.com/watch?v=zrFyRN1Uads",
          "evidenceNote": "Dated Reborn-labelled progression upload. Its title supports player context, not a universal unlock rule.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Gamepass purchase route — August 25",
          "url": "https://www.youtube.com/watch?v=kG2epjmNzDk",
          "evidenceNote": "Captions reviewed: creator reports level-130 raids and a purchase order. This is an account-specific strategy, not verified pricing or developer policy.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Rexon progression guide — August 27",
          "url": "https://www.youtube.com/watch?v=HEsb6IWo5KU",
          "evidenceNote": "Original description and storyboard reviewed: lobby Play selector includes Egg Island; shop shows VIP, x2 Gold and Extra Item. Caption retrieval failed, so no narration is assumed.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "claims": [
        {
          "id": "source-summary",
          "topic": "Boss Raids: Entry & Fusion Goliath",
          "claim": "Source scope",
          "value": "The linked guide shows a Tier 1 Fusion Goliath fight with overlapping circular and straight attack zones. Players report joining raids around level 130; the current unlock requirement and key rules are unconfirmed.",
          "claimStatus": "reported",
          "confidence": "Medium",
          "verifiedForVersion": "Source review: September 6, 2026",
          "sourceURL": "https://www.youtube.com/watch?v=ZoCazKucPnI",
          "evidenceNote": "Storyboard review shows Tier 1, Fusion Goliath, life icons and overlapping circular/linear attack zones. Video labels gear at 0:16 and raid at 0:28.",
          "lastChecked": "2026-09-06"
        }
      ]
    }
  },
  "/gamepasses/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Gamepasses: Gold Purchases & Priorities",
      "h1": "Dungeon Quest Reborn Gamepasses: Gold Purchases & Priorities",
      "summary": "Compare observed shop labels, a creator’s purchase order and the original player report about rising Gold prices.",
      "quickAnswer": "A dated Reborn lobby shows VIP, x2 Gold and Extra Item shop labels. A creator proposes Gold farming through raids and buying x2 Gold first. Treat this as a strategy report: current prices, reset-benefit wording and account scaling still need the live storefront.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "shop",
          "title": "What the shop reference shows",
          "paragraphs": [],
          "table": {
            "columns": [
              "Benefit",
              "Evidence",
              "Before buying"
            ],
            "rows": [
              {
                "cells": [
                  "VIP",
                  "Visible in August 27 shop frames",
                  "Read the current included effects."
                ]
              },
              {
                "cells": [
                  "x2 Gold",
                  "Visible shop label; first in one creator’s order",
                  "Check what activities it actually affects."
                ]
              },
              {
                "cells": [
                  "Extra Item",
                  "Visible shop label; second in that order",
                  "Confirm which reward screens receive the extra item."
                ]
              },
              {
                "cells": [
                  "Reset benefit",
                  "Creator says free stat resets",
                  "Check the exact current name and affected system."
                ]
              }
            ]
          }
        },
        {
          "id": "buy-order",
          "title": "A creator’s purchase order",
          "paragraphs": [
            "At 0:27 in the August 25 clip, the proposed order is x2 Gold, extra item, VIP, then a reset benefit. This reflects that creator’s repeated farming route, not an independently measured optimum.",
            "If you cannot reliably finish the activity, a pass is not a replacement for fixing your loadout or routing. Keep enough Gold for the upgrades that let you complete runs."
          ],
          "media": [
            {
              "id": "kG2epjmNzDk",
              "type": "youtube",
              "videoId": "kG2epjmNzDk",
              "title": "Creator gamepass purchase route",
              "alt": "Creator gamepass purchase route",
              "caption": "Dated community reference; read the adjacent source limits.",
              "sourceURL": "https://www.youtube.com/watch?v=kG2epjmNzDk",
              "evidenceLevel": "Community Confirmed",
              "claimIds": [
                "source-summary"
              ],
              "capturedAt": "2026-09-06",
              "verifiedForVersion": "Dated community reference",
              "startSeconds": 27
            }
          ]
        },
        {
          "id": "changing-gold-price",
          "title": "Why the Gold Price Can Change",
          "paragraphs": [
            "An August 29 player post reports that the displayed Gold price rose as they progressed. A single account report cannot establish a level formula or a universal price.",
            "Compare the same benefit, currency and account progression before concluding that the price changed unexpectedly. The public pass API’s technical labels do not substitute for the in-game storefront."
          ],
          "links": [
            {
              "href": "https://www.reddit.com/r/u_MountainSharp1371/comments/1w1ztbr/dungeon_quest_reborn/",
              "label": "Read the original price question",
              "description": "Player report, not a pricing formula."
            }
          ]
        },
        {
          "id": "raid-route",
          "title": "Should you farm raids for Gold?",
          "paragraphs": [
            "The creator suggests level-130 raids as their funding route. No guaranteed income or number of runs is established. Read the raid menu and compare runs you actually complete."
          ],
          "links": [
            {
              "href": "/guides/boss-raids/",
              "label": "Boss Raids",
              "description": "Entry reports and encounter reference."
            },
            {
              "href": "/dungeons/",
              "label": "Dungeon choices",
              "description": "Choose a reliable run."
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "Rexon progression guide — August 27",
          "url": "https://www.youtube.com/watch?v=HEsb6IWo5KU",
          "evidenceNote": "Original description and storyboard reviewed: lobby Play selector includes Egg Island; shop shows VIP, x2 Gold and Extra Item. Caption retrieval failed, so no narration is assumed.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Gamepass purchase route — August 25",
          "url": "https://www.youtube.com/watch?v=kG2epjmNzDk",
          "evidenceNote": "Captions reviewed: creator reports level-130 raids and a purchase order. This is an account-specific strategy, not verified pricing or developer policy.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Player report: rising Gold pass prices — August 29",
          "url": "https://www.reddit.com/r/u_MountainSharp1371/comments/1w1ztbr/dungeon_quest_reborn/",
          "evidenceNote": "A single player describes prices increasing with progress. It motivates a purchase comparison, not a confirmed formula.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Roblox Games API",
          "url": "https://games.roblox.com/v1/games?universeIds=9931749389",
          "evidenceNote": "Fresh identity snapshot on September 6; update time is not patch-note content.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/guides/boss-raids/",
          "label": "Boss Raids",
          "description": "Compare the funding route."
        },
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Improve reliable completion."
        },
        {
          "href": "/updates/",
          "label": "Updates",
          "description": "Check dated changes."
        }
      ],
      "faq": [
        {
          "question": "Is this a universal recommendation?",
          "answer": "No. Match the source date, game version and your current loadout before acting."
        },
        {
          "question": "Why are some values missing?",
          "answer": "Unknown values are not treated as zero or copied from the original game."
        }
      ],
      "claims": []
    }
  },
  "/discord/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Discord: Invite & Community Help",
      "h1": "Dungeon Quest Reborn Discord: Invite & Community Help",
      "summary": "Open the community invite, prepare a useful question and troubleshoot joining without assuming developer ownership.",
      "quickAnswer": "The dqr invite preview resolves to a community named dqr in the September 6 check. Reborn creators link it, but a working invite and creator endorsement do not establish developer ownership. Open the preview and check the destination before joining.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "invite",
          "title": "Community invite",
          "paragraphs": [
            "Use the dqr invite as a community candidate. This site does not label it an independently verified official developer channel."
          ],
          "links": [
            {
              "href": "https://discord.gg/dqr",
              "label": "Open the dqr community invite",
              "description": "Check the server preview before joining."
            }
          ]
        },
        {
          "id": "help",
          "title": "Ask a question that can be answered",
          "paragraphs": [],
          "table": {
            "columns": [
              "You need",
              "Include in your question"
            ],
            "rows": [
              {
                "cells": [
                  "Party help",
                  "Dungeon, difficulty, role and the encounter blocking you."
                ]
              },
              {
                "cells": [
                  "A drop source",
                  "Exact item name, difficulty and whether it appeared on a reward screen."
                ]
              },
              {
                "cells": [
                  "Patch information",
                  "Announcement link and date, not only a screenshot title."
                ]
              },
              {
                "cells": [
                  "Trade context",
                  "Exact card and upgrade state; never account credentials."
                ]
              }
            ]
          }
        },
        {
          "id": "join-errors",
          "title": "If the invite does not open",
          "paragraphs": [
            "Try the direct invite in a browser and inspect the error. An expired invite, server restriction and account eligibility issue are different problems. Use a fresh developer-linked invite if one becomes available.",
            "Do not use a third-party verification tool or send a Roblox password or session cookie to join a community."
          ]
        },
        {
          "id": "alternatives",
          "title": "Find an answer without joining",
          "paragraphs": [
            "For a quick lookup, start with the relevant guide rather than waiting for a chat response."
          ],
          "links": [
            {
              "href": "/spells/",
              "label": "Spells",
              "description": "Uses and source reports."
            },
            {
              "href": "/dungeons/winter-outpost/",
              "label": "Winter Outpost",
              "description": "Difficulty references."
            },
            {
              "href": "/trello/",
              "label": "Trello status",
              "description": "Other information routes."
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "Discord invite preview",
          "url": "https://discord.com/api/v10/invites/dqr?with_counts=true",
          "evidenceNote": "September 6 endpoint resolves code dqr to a guild named dqr. Developer ownership is still not established by this preview.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Rexon progression guide — August 27",
          "url": "https://www.youtube.com/watch?v=HEsb6IWo5KU",
          "evidenceNote": "Original description and storyboard reviewed: lobby Play selector includes Egg Island; shop shows VIP, x2 Gold and Extra Item. Caption retrieval failed, so no narration is assumed.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Official Roblox experience",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "September 6 public listing: [Odin Reincarnation] Dungeon Quest Reborn. No patch mechanics inferred.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/trello/",
          "label": "Trello",
          "description": "Information sources."
        },
        {
          "href": "/guides/boss-raids/",
          "label": "Boss Raids",
          "description": "Read entry reports."
        },
        {
          "href": "/updates/",
          "label": "Updates",
          "description": "Dated source changes."
        }
      ],
      "faq": [
        {
          "question": "Is discord.gg/dqr official?",
          "answer": "It resolves and Reborn creators link it, but this review has not established a direct developer-owned connection."
        },
        {
          "question": "Do I have to join to use the wiki?",
          "answer": "No. All published guides can be read without joining a server."
        }
      ],
      "claims": []
    }
  },
  "/spell-tier-list/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Spell choices by situation",
      "h1": "Dungeon Quest Reborn Spell choices by situation",
      "summary": "Compare ability jobs and reachable alternatives without a context-free power ranking.",
      "quickAnswer": "Choose the option that solves your current failure: missed attacks, unsafe cast windows or poor survival. The table is a source-informed comparison, not a measured S-to-F ranking.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "choices",
          "title": "Compare the job before the grade",
          "paragraphs": [],
          "table": {
            "columns": [
              "Situation",
              "Candidate or decision",
              "Limit"
            ],
            "rows": [
              {
                "cells": [
                  "Early repeated casts",
                  "Ice Needles use report",
                  "Not a base-cooldown measurement."
                ]
              },
              {
                "cells": [
                  "Winter Outpost Mage progression",
                  "Fire Bomb editorial recommendation",
                  "Acquisition difficulty unresolved."
                ]
              },
              {
                "cells": [
                  "Ranged damage",
                  "Phantom Flames use report",
                  "Depends on landing casts and current equipment."
                ]
              },
              {
                "cells": [
                  "Damage while moving",
                  "Infernal Orbs use report",
                  "No universal DPS result."
                ]
              },
              {
                "cells": [
                  "Later buff slot",
                  "Ordinary Inner Focus versus a second attack",
                  "The available-skill demo does not measure EIF."
                ]
              }
            ]
          }
        },
        {
          "id": "test",
          "title": "Make a fair comparison",
          "paragraphs": [
            "Keep dungeon, difficulty and other gear stable. Compare missed casts, deaths and completed runs as well as damage. Record whether a better result comes from an ability or from different equipment.",
            "Do not rank unavailable rare gear above an obtainable improvement solely because of its rarity."
          ]
        },
        {
          "id": "paths",
          "title": "Choose the next guide",
          "paragraphs": [
            "Use the detailed source notes before investing in a change."
          ],
          "links": [
            {
              "href": "/spells/fire-bomb/",
              "label": "Fire Bomb",
              "description": "Winter Outpost source limits."
            },
            {
              "href": "/spells/enhanced-inner-focus/",
              "label": "EIF and ordinary Inner Focus",
              "description": "Separate the two skills."
            },
            {
              "href": "/builds/mage/",
              "label": "Mage choices",
              "description": "Plan the loadout."
            },
            {
              "href": "/builds/warrior/",
              "label": "Warrior choices",
              "description": "Match physical-path tools."
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Inner Focus comparison — September 1",
          "url": "https://www.youtube.com/watch?v=I11sThLGWJs",
          "evidenceNote": "Captions reviewed. The creator explicitly does not own the enhanced spells; the demonstrated skill is the ordinary Inner Focus. Narrated percentages and probabilities are excluded.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Objective use cases."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Acquisition limits."
        },
        {
          "href": "/tier-list/",
          "label": "Related comparison",
          "description": "Separate scope."
        }
      ],
      "faq": [
        {
          "question": "Is this a universal recommendation?",
          "answer": "No. Match the source date, game version and your current loadout before acting."
        },
        {
          "question": "Why are some values missing?",
          "answer": "Unknown values are not treated as zero or copied from the original game."
        }
      ],
      "claims": []
    }
  },
  "/tier-list/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Build priorities by situation",
      "h1": "Dungeon Quest Reborn Build priorities by situation",
      "summary": "Match your next improvement to the part of the run that fails: damage, movement, survival or acquisition.",
      "quickAnswer": "Choose the option that solves your current failure: missed attacks, unsafe cast windows or poor survival. The table is a source-informed comparison, not a measured S-to-F ranking.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "choices",
          "title": "Compare the job before the grade",
          "paragraphs": [],
          "table": {
            "columns": [
              "Situation",
              "Candidate or decision",
              "Limit"
            ],
            "rows": [
              {
                "cells": [
                  "Early repeated casts",
                  "Ice Needles use report",
                  "Not a base-cooldown measurement."
                ]
              },
              {
                "cells": [
                  "Winter Outpost Mage progression",
                  "Fire Bomb editorial recommendation",
                  "Acquisition difficulty unresolved."
                ]
              },
              {
                "cells": [
                  "Ranged damage",
                  "Phantom Flames use report",
                  "Depends on landing casts and current equipment."
                ]
              },
              {
                "cells": [
                  "Damage while moving",
                  "Infernal Orbs use report",
                  "No universal DPS result."
                ]
              },
              {
                "cells": [
                  "Later buff slot",
                  "Ordinary Inner Focus versus a second attack",
                  "The available-skill demo does not measure EIF."
                ]
              }
            ]
          }
        },
        {
          "id": "test",
          "title": "Make a fair comparison",
          "paragraphs": [
            "Keep dungeon, difficulty and other gear stable. Compare missed casts, deaths and completed runs as well as damage. Record whether a better result comes from an ability or from different equipment.",
            "Do not rank unavailable rare gear above an obtainable improvement solely because of its rarity."
          ]
        },
        {
          "id": "paths",
          "title": "Choose the next guide",
          "paragraphs": [
            "Use the detailed source notes before investing in a change."
          ],
          "links": [
            {
              "href": "/spells/fire-bomb/",
              "label": "Fire Bomb",
              "description": "Winter Outpost source limits."
            },
            {
              "href": "/spells/enhanced-inner-focus/",
              "label": "EIF and ordinary Inner Focus",
              "description": "Separate the two skills."
            },
            {
              "href": "/builds/mage/",
              "label": "Mage choices",
              "description": "Plan the loadout."
            },
            {
              "href": "/builds/warrior/",
              "label": "Warrior choices",
              "description": "Match physical-path tools."
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Inner Focus comparison — September 1",
          "url": "https://www.youtube.com/watch?v=I11sThLGWJs",
          "evidenceNote": "Captions reviewed. The creator explicitly does not own the enhanced spells; the demonstrated skill is the ordinary Inner Focus. Narrated percentages and probabilities are excluded.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Objective use cases."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Acquisition limits."
        },
        {
          "href": "/spell-tier-list/",
          "label": "Related comparison",
          "description": "Separate scope."
        }
      ],
      "faq": [
        {
          "question": "Is this a universal recommendation?",
          "answer": "No. Match the source date, game version and your current loadout before acting."
        },
        {
          "question": "Why are some values missing?",
          "answer": "Unknown values are not treated as zero or copied from the original game."
        }
      ],
      "claims": []
    }
  },
  "/builds/mage/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Mage Build: Stage & Ability Choices",
      "h1": "Dungeon Quest Reborn Mage Build: Stage & Ability Choices",
      "summary": "Stage-based ability leads, ordinary buff alternatives and practical Spell Power loadout decisions.",
      "quickAnswer": "Match the card’s Spell Power compatibility, keep a reliable attack and test whether a buff or recovery slot improves completion. Stage recommendations below are attributed guidance, not a fixed best-in-slot list.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "stages",
          "title": "Stage-by-stage choices",
          "paragraphs": [],
          "table": {
            "columns": [
              "Stage",
              "Source-informed starting point",
              "Alternative decision"
            ],
            "rows": [
              {
                "cells": [
                  "Early play",
                  "Use an ability you can land consistently.",
                  "Retain recovery when survival limits the run."
                ]
              },
              {
                "cells": [
                  "Winter Outpost",
                  "Fire Bomb appears in the September 4 Mage table.",
                  "Keep a working ability until its source and card are clear."
                ]
              },
              {
                "cells": [
                  "Pirate Island and beyond",
                  "Compare Phantom Flames and Infernal Orbs use reports.",
                  "Choose range versus damage-over-time by the encounter."
                ]
              },
              {
                "cells": [
                  "Later routes",
                  "Test ordinary Inner Focus with a damage ability.",
                  "Do not wait for EIF before improving a working loadout."
                ]
              }
            ]
          }
        },
        {
          "id": "gear",
          "title": "Weapon and armor decisions",
          "paragraphs": [
            "Match the power axis and equip requirements shown by the current cards. Compare items at similar upgrade states; a fully upgraded showcase is not a base-stat benchmark.",
            "If one attack repeatedly ends your run, compare survival and positioning before allocating every resource to more damage. No fixed percentage of stat points is asserted."
          ]
        },
        {
          "id": "rotation",
          "title": "Plan casts around the warning",
          "paragraphs": [
            "Prepare any applicable buff before the safe damage window, aim the attack, then move when the next warning appears. Do not spend every ability merely because its cooldown ended.",
            "Compare a second attack with utility under the same conditions. The goal is repeatable completion, not a single large hit."
          ]
        },
        {
          "id": "sources",
          "title": "Next steps",
          "paragraphs": [
            "Use the exact ability or encounter guide to check the source context."
          ],
          "links": [
            {
              "href": "/spells/",
              "label": "Ability lookup",
              "description": "Compare uses and current unknowns."
            },
            {
              "href": "/spell-tier-list/",
              "label": "Situational spell choices",
              "description": "Avoid a context-free tier."
            },
            {
              "href": "/dungeons/northern-lands/odin-reincarnation/",
              "label": "Odin Reincarnation",
              "description": "Plan for overlapping warnings."
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Inner Focus comparison — September 1",
          "url": "https://www.youtube.com/watch?v=I11sThLGWJs",
          "evidenceNote": "Captions reviewed. The creator explicitly does not own the enhanced spells; the demonstrated skill is the ordinary Inner Focus. Narrated percentages and probabilities are excluded.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Find the ability."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Check the reported source."
        },
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Choose a repeatable route."
        }
      ],
      "faq": [
        {
          "question": "Is this a universal recommendation?",
          "answer": "No. Match the source date, game version and your current loadout before acting."
        },
        {
          "question": "Why are some values missing?",
          "answer": "Unknown values are not treated as zero or copied from the original game."
        }
      ],
      "claims": []
    }
  },
  "/builds/warrior/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Warrior Build: Stage & Ability Choices",
      "h1": "Dungeon Quest Reborn Warrior Build: Stage & Ability Choices",
      "summary": "Physical-path ability leads, equipment comparisons and safe attack windows for a repeatable run.",
      "quickAnswer": "Match Physical Power compatibility, then choose attacks whose placement you can repeat while dodging. The source recommendations below are starting points, not verified minimum stats.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "stages",
          "title": "Stage-by-stage choices",
          "paragraphs": [],
          "table": {
            "columns": [
              "Stage",
              "Source-informed starting point",
              "Alternative decision"
            ],
            "rows": [
              {
                "cells": [
                  "Early play",
                  "Battle Shout is described in the August 28 guide.",
                  "Check whether it affects the attacks you actually use."
                ]
              },
              {
                "cells": [
                  "Winter Outpost",
                  "Gale Slice, Arcane Barrage and Ground Slam are editorial leads.",
                  "Do not treat stage recommendations as drop proofs."
                ]
              },
              {
                "cells": [
                  "Later routes",
                  "The editorial guide discusses Inner Rage for a physical path.",
                  "Read the current card; do not substitute the Mage buff."
                ]
              },
              {
                "cells": [
                  "Boss pressure",
                  "Favor attacks you can land within a safe window.",
                  "Retain useful movement or recovery rather than copying raw damage."
                ]
              }
            ]
          }
        },
        {
          "id": "gear",
          "title": "Weapon and armor decisions",
          "paragraphs": [
            "Match the power axis and equip requirements shown by the current cards. Compare items at similar upgrade states; a fully upgraded showcase is not a base-stat benchmark.",
            "If one attack repeatedly ends your run, compare survival and positioning before allocating every resource to more damage. No fixed percentage of stat points is asserted."
          ]
        },
        {
          "id": "rotation",
          "title": "Plan casts around the warning",
          "paragraphs": [
            "Prepare any applicable buff before the safe damage window, aim the attack, then move when the next warning appears. Do not spend every ability merely because its cooldown ended.",
            "Compare a second attack with utility under the same conditions. The goal is repeatable completion, not a single large hit."
          ]
        },
        {
          "id": "sources",
          "title": "Next steps",
          "paragraphs": [
            "Use the exact ability or encounter guide to check the source context."
          ],
          "links": [
            {
              "href": "/spells/",
              "label": "Ability lookup",
              "description": "Compare uses and current unknowns."
            },
            {
              "href": "/spell-tier-list/",
              "label": "Situational spell choices",
              "description": "Avoid a context-free tier."
            },
            {
              "href": "/dungeons/northern-lands/odin-reincarnation/",
              "label": "Odin Reincarnation",
              "description": "Plan for overlapping warnings."
            }
          ]
        }
      ],
      "sources": [
        {
          "title": "Gordan Perisic: ability progression — September 4",
          "url": "https://www.destructoid.com/best-spells-and-abilities-in-dungeon-quest-reborn/",
          "evidenceNote": "An attributed editorial recommendation table, not independently captured drop conditions. Levels in this article are not treated as equip requirements.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Inner Focus comparison — September 1",
          "url": "https://www.youtube.com/watch?v=I11sThLGWJs",
          "evidenceNote": "Captions reviewed. The creator explicitly does not own the enhanced spells; the demonstrated skill is the ordinary Inner Focus. Narrated percentages and probabilities are excluded.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Find the ability."
        },
        {
          "href": "/drops/",
          "label": "Drops",
          "description": "Check the reported source."
        },
        {
          "href": "/dungeons/",
          "label": "Dungeons",
          "description": "Choose a repeatable route."
        }
      ],
      "faq": [
        {
          "question": "Is this a universal recommendation?",
          "answer": "No. Match the source date, game version and your current loadout before acting."
        },
        {
          "question": "Why are some values missing?",
          "answer": "Unknown values are not treated as zero or copied from the original game."
        }
      ],
      "claims": []
    }
  },
  "/updates/": {
    "indexable": false,
    "meta": {
      "title": "Dungeon Quest Reborn Updates & Guide Changes",
      "h1": "Dungeon Quest Reborn Updates & Guide Changes",
      "summary": "Official title changes and website guide updates, with platform signals kept separate from gameplay patch notes.",
      "quickAnswer": "The official title is now [Odin Reincarnation] Dungeon Quest Reborn. Roblox reports an update at 2026-09-06T03:39:38.6777269Z. A title/timestamp change is a platform signal; the separate September 6 boss recording supplies gameplay context.",
      "eyebrow": "Player guide",
      "verifiedForVersion": "September 6 source review; dated observations"
    },
    "content": {
      "sections": [
        {
          "id": "current-title",
          "title": "Current official title",
          "paragraphs": [],
          "table": {
            "columns": [
              "Field",
              "September 6 check"
            ],
            "rows": [
              {
                "cells": [
                  "Experience",
                  "[Odin Reincarnation] Dungeon Quest Reborn"
                ]
              },
              {
                "cells": [
                  "Updated (UTC)",
                  "2026-09-06T03:39:38.6777269Z"
                ]
              },
              {
                "cells": [
                  "What this proves",
                  "The title and public platform timestamp changed."
                ]
              },
              {
                "cells": [
                  "What it does not prove",
                  "Exact patch contents, loot odds or universal unlock rules."
                ]
              }
            ]
          }
        },
        {
          "id": "new-boss",
          "title": "Odin Reincarnation reference",
          "paragraphs": [
            "A September 6 community recording shows a post-clear Fight prompt followed by a separately named boss. Read that guide alongside the earlier Northern Lands route, not as a replacement for all its recorded tactics."
          ],
          "links": [
            {
              "href": "/dungeons/northern-lands/odin-reincarnation/",
              "label": "Odin Reincarnation guide",
              "description": "Entry and visual warning observations."
            },
            {
              "href": "/dungeons/northern-lands/",
              "label": "Earlier Northern Lands route",
              "description": "September 2 narration retained with its date."
            }
          ]
        },
        {
          "id": "guide-changes",
          "title": "What changed in these guides",
          "paragraphs": [
            "September 6: added Fire Bomb, EIF, Egg Island, Boss Raids, Steampunk Sewers and the Odin Reincarnation reference. Expanded Winter Outpost, source lookup and loadout decisions.",
            "Fire Bomb and Egg Island remain limited references because key current gameplay fields could not be established. This is a website content update, not a developer patch note."
          ]
        },
        {
          "id": "community-demonstrations",
          "title": "Northern Lands Community Demonstrations",
          "paragraphs": [
            "The September 2 explanation and September 6 bonus-fight recording answer different parts of the run. Their timestamps and gear context are kept separate."
          ]
        }
      ],
      "sources": [
        {
          "title": "Roblox Games API",
          "url": "https://games.roblox.com/v1/games?universeIds=9931749389",
          "evidenceNote": "Fresh identity snapshot on September 6; update time is not patch-note content.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-06"
        },
        {
          "title": "Odin Reincarnation boss fight — September 6",
          "url": "https://www.youtube.com/watch?v=zNvSBG2Vp98",
          "evidenceNote": "Description links Reborn. Storyboard review shows a post-clear Fight prompt, a new boss bar, life icons and overlapping floor warnings. Not a controlled live test.",
          "evidenceLevel": "Community Confirmed",
          "lastChecked": "2026-09-06"
        }
      ],
      "related": [
        {
          "href": "/dungeons/northern-lands/odin-reincarnation/",
          "label": "Bonus boss",
          "description": "Read the new reference."
        },
        {
          "href": "/spells/",
          "label": "Spells",
          "description": "Updated source coverage."
        },
        {
          "href": "/gamepasses/",
          "label": "Gamepasses",
          "description": "Compare purchase reports."
        }
      ],
      "faq": [
        {
          "question": "Is this a universal recommendation?",
          "answer": "No. Match the source date, game version and your current loadout before acting."
        },
        {
          "question": "Why are some values missing?",
          "answer": "Unknown values are not treated as zero or copied from the original game."
        }
      ],
      "claims": [],
      "updates": [
        {
          "id": "platform-sep6",
          "topic": "Platform title",
          "claim": "Official title updated",
          "value": "[Odin Reincarnation] Dungeon Quest Reborn",
          "claimStatus": "confirmed",
          "confidence": "High",
          "verifiedForVersion": "[Odin Reincarnation] Dungeon Quest Reborn",
          "sourceURL": "https://games.roblox.com/v1/games?universeIds=9931749389",
          "evidenceNote": "Public metadata only.",
          "lastChecked": "2026-09-06",
          "versionTitle": "[Odin Reincarnation] Dungeon Quest Reborn",
          "publishedDate": "2026-09-06",
          "actualChanges": "Title and timestamp recorded: 2026-09-06T03:39:38.6777269Z; no patch-note body inferred.",
          "affectedPaths": [
            "/",
            "/dungeons/northern-lands/",
            "/dungeons/northern-lands/odin-reincarnation/"
          ],
          "recordType": "metadata_signal"
        }
      ]
    }
  }
};
