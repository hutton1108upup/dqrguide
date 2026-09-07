# Visual v1.1 implementation and verification

## Baseline and scope

- Baseline: `dd483f119611fc0a6ac8cdb7b7cadabb3c866faa`, fetched `origin/main`; includes the approved `efb8a2d` work.
- Working branch: `codex/visual-v11-preserve-content`.
- Implemented: split homepage Hero, existing full-width search below the columns, visual CTA links, conclusion/table typography, distinct dungeon thumbnails, wide artwork and one click-to-load Featured Guide.
- Existing homepage modules, site identity, navigation, content, routes, indexing policy, analytics and release configuration remain unchanged.
- The user's latest official-image preference overrides the older document's AI-only image direction. No existing inner-page media was removed or replaced.
- Live stats, new task tabs, trust statistics and additional dungeon-page banners are deferred as specified; no new gameplay claims were added.

## Media allocation

| Slot | Asset | Provenance and handling |
|---|---|---|
| Hero | `official-party-boss-arena.webp` | Existing official Roblox promotional PNG converted to WebP q82; 52,086 bytes. Caption links the game; alt describes the scene without assigning a dungeon identity. Eager loading and high fetch priority. |
| Northern Lands card | `hero-northern-lands.webp` | User-supplied AI concept artwork, 167,288 bytes. Explicit concept label and descriptive alt. Lazy-loaded. |
| Winter Outpost card | `banner-winter-outpost.webp` | User-supplied AI concept artwork, 140,128 bytes. Explicit concept label and descriptive alt. Lazy-loaded. |
| Wide figure | `official-cavern-boss.webp` | Existing official Roblox promotional PNG converted to WebP q82; 39,788 bytes. Independent image and source caption. Lazy-loaded. |
| Featured video | CSS facade, no duplicate image | Inline click-to-load player; video `3pHhZpt-b-U`, start 94 seconds. YouTube oEmbed returned the title and author `-SaltyNub-` during this task. Attribution and direct external fallback are provided. |

Official image source: <https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn> and the repository's existing Roblox thumbnail provenance. Original PNGs remain intact. Artwork is not presented as proof of game mechanics.

## Verification

- Production build passed, 42 generated routes including framework routes; 36 content pages.
- 110 tests passed; lint passed.
- Protected content, SEO, navigation, search, table, analytics and deployment files have no diff against `dd483f1`.
- All 36 rendered content pages compared with a pre-edit browser snapshot: title, H1, description, canonical, robots, JSON-LD and header HTML match exactly.
- All existing headings, paragraphs, links and images remain present. New media labels, CTA links and Featured Guide text are additive.
- All 36 pages checked at 1440, 390 and 375px for document overflow.
- Hero columns/stack, independent search placement, recent-card text width and dungeon-card text width checked geometrically.
- Homepage images are distinct, load successfully and have non-empty alt text; loading attributes checked.
- Search, class filter, filter reset, drop-location filter, desktop dropdown and mobile navigation checked.
- Skills table uses a readable description column and its final column remains reachable through horizontal scrolling.
- Featured Guide has no eager iframe and opens in its original slot, without a dialog. Initial playback and chapter switching were checked; a real YouTube player also reached an unpaused state at the requested 94-second start. Two targeted inline-player tests passed. Other article video dialogs remain unchanged.
- Local unthrottled LCP/CLS sampling is diagnostic only, not production Core Web Vitals evidence.

Reproducible browser audit: `node scripts/qa_visual_preservation.mjs` against the persistent port 3101 preview. The baseline snapshot is checked in at `scripts/fixtures/visual-v11-baseline.json`; reports and screenshots are written to `artifacts/visual-v11/`. Full review links: `artifacts/visual-v11/review-links.md`.

Implementation verification did not perform a merge or deployment. GitHub submission is a separate user-authorized step.
