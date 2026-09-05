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
      "quickAnswer": "No official Trello link was verified on the public Roblox page and API checked September 5, 2026. Open the game below or choose the guide matching what you wanted from the board.",
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
          "answer": "No link was verified through the accessible Roblox page and API on September 5. Use the game link above to check its current developer-linked channels."
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
          "title": "Dungeon Quest Reborn on Roblox",
          "url": "https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn",
          "evidenceNote": "Public description checked September 5. No verifiable Trello URL found in this accessible source.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
        },
        {
          "title": "Roblox Games API — universe 9931749389",
          "url": "https://games.roblox.com/v1/games?universeIds=9931749389",
          "evidenceNote": "September 5 retrieval: Northern Lands title; updated 2026-09-04T23:40:35.7319187Z. This timestamp supplies no patch details.",
          "evidenceLevel": "Official",
          "lastChecked": "2026-09-05"
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
          "lastChecked": "2026-09-05"
        }
      ]
    }
  },
  "/spells/": {
    "indexable": true,
    "meta": {
      "title": "Dungeon Quest Reborn Spells & Abilities: Uses and Source Reports",
      "eyebrow": "Spells & abilities",
      "summary": "Compare ten named abilities by use case, then open the relevant moment in the creator's guide. Acquisition reports are separated from unknown difficulty and card data.",
      "quickAnswer": "Compare Ice Needles for frequent casts, Phantom Flames for ranged damage, Infernal Orbs for damage over time, and recovery abilities for party support. These are dated community descriptions, not a tested tier list.",
      "verifiedForVersion": "August 28, 2026 ability walkthrough"
    },
    "content": {
      "sections": [
        {
          "id": "ability-list",
          "title": "Abilities by use case",
          "paragraphs": [
            "Community report: this table summarizes the August 28 ability walkthrough reviewed September 5. It is not a complete roster. Exact damage, cooldown, equip level and rarity are omitted because the cards have not been independently checked.",
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
            "Enhanced Inner Focus acquisition conflicts remain unresolved. It stays outside this source table until a clear Reborn run establishes the conditions."
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
      "quickAnswer": "Phantom Flames and Ghostly Cannon Barrage are reported from Pirate Island; Infernal Orbs is reported from The Underworld. These are creator statements, not independently verified rewards. Difficulty and rates are unknown.",
      "verifiedForVersion": "August 28, 2026 acquisition reports"
    },
    "content": {
      "sections": [
        {
          "id": "reported-locations",
          "title": "Reported item locations",
          "paragraphs": [
            "Community report: three acquisition statements from the August 28 walkthrough, reviewed September 5. No location below has been independently confirmed through a continuous reward sequence."
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
            }
          ]
        },
        {
          "id": "northern-rewards",
          "title": "What about Northern Lands rewards?",
          "paragraphs": [
            "The reviewed solo guide explains a route, not a complete named reward pool. Using Nightmare equipment in Insane does not show that the equipment drops there. No Mjolnir source is assigned without a clear reward sequence."
          ],
          "links": [
            {
              "href": "/dungeons/northern-lands/",
              "label": "Northern Lands route",
              "description": "Learn the encounters before repeating runs."
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
          "id": "rates",
          "title": "Why no drop percentages?",
          "paragraphs": [
            "An item appearing once supports an observation under those conditions, not a universal probability. An inventory item might have been traded.",
            "Rarity color, video titles and percentages copied between guide sites cannot establish a drop rate."
          ]
        }
      ],
      "faq": [
        {
          "question": "Is this a complete drop table?",
          "answer": "No. It contains three dated ability-source reports. Difficulty and probability are unknown."
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
      "summary": "A timestamped companion to SaltyNub's September 2 solo guide: opening pulls, Midgardian Champion, Bob's orb mechanic and Odin positioning.",
      "quickAnswer": "Learn the sidestep-and-circle pull, save movement for the first boss's slam, guide Bob's orb into its matching rock, and keep distance from Odin. These are the creator's narrated tactics; the Insane teaching run uses Nightmare gear.",
      "verifiedForVersion": "September 2, 2026 solo-guide narration"
    },
    "content": {
      "sections": [
        {
          "id": "run-context",
          "title": "Before you enter",
          "paragraphs": [
            "The September 5 official check still names Northern Lands. The tactics below summarize a September 2 community recording, not a live test after the latest platform update.",
            "At 0:26 the creator explains the equipment. The teaching section is Insane with Nightmare gear, followed by a full Nightmare solo run at 17:38. Do not use its damage or clear speed as a minimum-entry requirement.",
            "Exact entry levels, boss health, timer and complete reward pool are unconfirmed here. Check the live selector."
          ],
          "links": [
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
  }
,
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
      "quickAnswer": "Choose the chapter matching your difficulty and loadout below. The recording labels Warrior and Mage attempts from Easy through Nightmare. Treat it as older route context, not proof of September balance or minimum stats.",
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
  }

};
