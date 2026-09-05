# Player guide enrichment — 2026-09-05

## Scope and source limits

Implements the approved GSC/competitor plan's first batch: Trello, Spells,
Northern Lands, Drops, homepage entry points, dungeon navigation, Winter Outpost
chapter navigation, and two ability details. No deployment or push requested.

Competitor layouts informed the lookup tables, route stages and failure-response
tables. Competitor mechanics and numbers were not imported as game facts.

## Original material retrieved

- https://www.youtube.com/watch?v=FzogFp907JM — published 2026-08-28.
  Automatic English captions and metadata retrieved 2026-09-05. Reviewed ability
  descriptions at 72, 90, 105, 133, 168, 177, 283, 371, 477 and 558 seconds.
  Acquisition statements: Ghostly Cannon Barrage/Pirate Island at 177 seconds,
  Phantom Flames/Pirate Island at 345 seconds, Infernal Orbs/The Underworld at
  477–488 seconds. These are creator reports, not verified reward observations.
  Excluded ambiguous Fireball/Fire Bomb naming, rankings, narrated damage,
  cooldown numbers, equip levels and unsupported acquisition difficulties.
- https://www.youtube.com/watch?v=3pHhZpt-b-U — published 2026-09-02.
  Automatic English captions and chapters retrieved 2026-09-05. Equipment context
  at 26 seconds; opening pull at 83; Midgardian Champion at 167; next groups at
  298; Bob at 409; lower groups at 566; final approach at 832; Odin at 919.
  Teaching run: Insane with Nightmare gear. Full Nightmare run chapter: 1058.
  The orb-to-matching-rock rule is explicitly attributed to this narration.
  Excluded stats, timer, probabilities, exact anti-heal/freeze effects and any
  claim that this was independently reproduced after the latest platform update.
- https://www.youtube.com/watch?v=pEC2jGlO-7E — metadata/captions retrieved;
  published 2026-08-30. Chapters include first Insane and Nightmare completions.
  Not used to claim independent confirmation of every narrated boss tactic.
- https://www.youtube.com/watch?v=qDPjeoLcmn8 — published 2026-07-25.
  Creator description/chapter metadata retrieved. Ten Warrior/Mage chapter links
  from Easy to Nightmare are navigation aids, not gameplay validation or clear
  times. Subtitles returned HTTP 429. Old recommended stats were excluded.
- https://games.roblox.com/v1/games?universeIds=9931749389 — retrieved September 5;
  title remains Northern Lands, updated=2026-09-04T23:40:35.7319187Z.
  No Trello URL in accessible public description. No patch details inferred.

Video data downloads returned HTTP 403, including a Node-runtime retry. No card
screenshots or independent gameplay captures are claimed. Raw metadata and
captions remain in artifacts/research-20260905 for local review, not public assets.

## Publishing decisions

- Trello: index; bounded status answer plus useful direct routes.
- Spells, Northern Lands, Phantom Flames, Infernal Orbs: index as substantive,
  explicitly attributed guide summaries. Dates identify the recordings, not
  current-version gameplay tests. Unknown numeric fields remain omitted.
- Drops: public/noindex; only three spoken acquisition leads, no reward proof.
- Dungeons and Winter Outpost: public/noindex; useful navigation but incomplete
  current progression and mechanics. Winter remains an explicitly older reference.
- Enhanced Inner Focus, Mjolnir, Desert Temple, Pirate Island, boss detail pages,
  rankings and stage-specific build expansions remain conditional on evidence.
  Do not create placeholders to match competitors' page counts.

## Implementation

Reuses the existing content renderer, static routes, media facade and style
tokens. Added optional semantic section tables and action links. Enriched pages
skip the old empty checklist. Source evidence follows the answer sections.
Two new ability pages reuse the same route pipeline, breadcrumbs and search.
