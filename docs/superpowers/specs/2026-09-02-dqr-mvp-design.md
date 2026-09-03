# Dungeon Quest Reborn Guide MVP Design

## Product outcome

Build a fast, English-language, unofficial Dungeon Quest Reborn reference site that gives players an answer before exposition. The first release helps a player choose what to run next, trace an item or spell back to its source, and understand which information is verified versus still being checked.

The two supplied final documents are the product and visual requirements. Their example codes, dates, item values, dungeon counts, creator links, and update claims are illustrative until supported by a traceable source.

## MVP scope

The public route skeleton contains the 15 core destinations from the site plan:

- `/`
- `/differences/`
- `/gamepasses/`
- `/spells/`
- `/spell-tier-list/`
- `/trading/`
- `/dungeons/`
- `/dungeons/winter-outpost/`
- `/dungeons/northern-lands/`
- `/drops/`
- `/codes/`
- `/trello/`
- `/discord/`
- `/tier-list/`
- `/updates/`

The home page, `/tier-list/`, `/codes/`, and `/dungeons/northern-lands/` receive the strongest visual treatment because the design specification identifies them as the launch P0. The other core routes are complete, useful answer pages rather than title-swapped placeholders. Entity routes are deferred until their names, sources, uses, version, and at least two internal links can be verified; this avoids creating thin spell or weapon pages.

Legacy synonyms redirect permanently: `/skills/` and `/all-spells/` to `/spells/`, `/gamepass/` to `/gamepasses/`, `/discord-server/` to `/discord/`, and `/reborn-vs-original/` to `/differences/`.

## Truth and publication model

Every time-sensitive statement uses one of four evidence levels: `Official`, `In-game Verified`, `Community Confirmed`, or `Legacy / Unconfirmed`. Each record may carry source URL, evidence note, verified version, last verified date, and confidence.

Unsupported values are shown as `Not yet verified`; they are never inferred from the mockup. Codes and Trello are status pages: no copy button appears without a confirmed active code, and no Trello is described as official without an official link. Exact drop rates, prices, levels, transfer behavior, Discord status, and item values are omitted or explicitly marked unknown until sourced.

Core pages with useful, differentiated content are indexable. Any route that cannot yet meet that threshold is rendered for navigation and review but receives `noindex, follow` and is excluded from the sitemap. Search and query-filter variants are always `noindex, follow` and canonicalize to their hub.

## Information architecture

One typed content registry owns each route's slug, title, description, H1, summary, evidence state, indexability, update dates, version label, sections, FAQ, and related links. Metadata, canonical URLs, JSON-LD, search items, navigation, recent-update cards, and sitemap entries derive from that registry. Structured game records remain separate from editorial page definitions.

The homepage is a compact wiki hub: sticky navigation and command search; restrained gate-mark hero; evidence-aware TL;DR; six task shortcuts; current-state tier summary; dungeon ladder; codes/Discord/Trello status; latest verified updates; FAQ; and fixed fan-site disclaimer. There are no ads, videos, fake codes, or official game assets in this MVP.

Content pages share breadcrumbs, page intro, last-verified badge, quick answer, compact table/cards, evidence notes, related links, visible FAQ, and source list. Dungeons and drops remain separate intents. Spell database and spell tier list remain separate factual and editorial intents.

## Visual system

Use the final design tokens exactly: background `#0B1020`, surface `#131B2E`, hover `#19243C`, border `#293653`, primary text `#F3F6FC`, secondary text `#AAB6CC`, gold `#F2C14E`, blue `#68C8FF`, purple `#A87BFF`, success `#55D68B`, warning `#FFB454`, and danger `#FF6B6B`.

Cinzel is limited to the brand, H1/H2, tier grades, and dungeon ordinals; Inter is used for body and UI. Rarity is represented with a border, diamond marker, and label—not a saturated card fill. Cards use 10–12px radii, the content width is 1060px, and both mobile and desktop keep 18px side padding.

The visual signature is a luminous, original doorway mark and a restrained "field guide at midnight" atmosphere: thin cartographic grid lines, compact data slabs, asymmetric accent strokes, and deliberate whitespace. No game screenshots, official logos, character art, glassmorphism, or purple-on-white AI landing-page tropes are used.

At 880px and below, desktop navigation collapses to a menu, the search becomes compact, answers and code status stack, tiles become three columns, dungeon cards become one column, and data tables scroll horizontally. The first validation viewport is 375px.

## Interaction and accessibility

The search dialog opens from the header or `Ctrl/Cmd + K`, supports keyboard navigation, filters the local route index, and provides an empty state. The mobile menu is keyboard accessible and closes after navigation. Copy UI is only rendered for a real code and changes to `Copied` after success. Focus rings, semantic headings, labelled navigation, reduced-motion support, and 44px mobile targets are required.

## SEO and performance

Every indexable page has one H1, self-referencing canonical, specific title and description, visible last-verified/version information, internal links, and JSON-LD matching visible content. Homepage schema uses `WebSite` and `Organization`; hubs use `CollectionPage`/`ItemList`; guides use `Article`; visible FAQs may add `FAQPage`; dungeon pages add `BreadcrumbList`. No fake `Product`, rating, offer, or review schema is emitted.

Only published, canonical, indexable, HTTP-200 routes enter `sitemap.xml`. Robots allow content crawling and disallow no required content route. Fonts use `next/font`, client JavaScript is confined to search/menu/copy interactions, and the hero has no large image.

## Verification

- Unit tests validate route uniqueness, redirect targets, evidence-status handling, sitemap exclusion, and the rule that unverified codes do not produce copy actions.
- Component tests cover search filtering and evidence labels where practical.
- The production build must exit successfully and enumerate the core routes.
- Local HTTP checks must return 200 for the homepage and representative hub/detail/status routes, and 308/301-compatible responses for legacy redirects.
- Visual review covers desktop and 375px layouts, search keyboard flow, focus states, overflow, and the absence of mock data presented as fact.
