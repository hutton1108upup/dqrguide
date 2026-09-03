# DQR.GG P0-P1 Content Governance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Next.js MVP into an evidence-gated publishing system with production-safe routes, fresh content audits, trustworthy P0 pages, draft-only entity scaffolds, and one reproducible verification command.

**Architecture:** Keep Next.js App Router and the current typed page registry. Add a publication status separate from SEO indexability, use a shared JSON publishing/freshness manifest for the app and Node audit scripts, and render page-level fact claims separately from page-level source badges. Production route generation, navigation, search, metadata, and sitemap will all consume the same published-page predicate.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Node ESM scripts, Vitest, Testing Library, Playwright, existing Fuse.js and Lucide dependencies.

**Spec:** `docs/superpowers/specs/2026-09-02-dqr-mvp-design.md` plus the approved P0-P1 content-governance design in the task conversation.

## Global Constraints

- Do not migrate from Next.js, Astro, or MDX; preserve the existing app shell and design tokens.
- Keep all user-facing site copy in English and do not promote mockup values, legacy game data, guessed codes, or unsupported gameplay claims.
- Keep the 15 existing core routes in the registry, but expose only `published` routes in production; `review` routes remain available in development/preview only.
- Keep publication status and `indexable` independent; sitemap entries require both `published` and `indexable`.
- Every critical fact must carry claim status, confidence, verified version, source URL, evidence note, and checked date.
- Use Singapore dates for editorial freshness calculations and make the audit date injectable for deterministic tests.
- Production builds must fail without a valid `NEXT_PUBLIC_SITE_URL`; no deployment, push, merge, or unrelated cleanup is in scope.
- Generated audit output belongs under `artifacts/` and must not be mistaken for source content.

---

### Task 1: Add publication states and production visibility gates

**Files:**
- Modify: `src/content/types.ts`
- Create: `src/content/publishing-manifest.json`
- Modify: `src/content/routes.ts`
- Create: `src/content/site-url.mjs`, `src/content/site-url.d.mts`
- Modify: `src/content/site.ts`
- Modify: `src/lib/seo.ts`
- Modify: `app/[...slug]/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: `src/components/search-index.ts`
- Modify: `src/components/site-nav.ts`
- Test: `src/content/routes.test.ts`, `src/content/publication.test.ts`, `src/lib/seo.test.ts`, `src/components/search-index.test.ts`

**Interfaces:**
- `PublicationStatus = "draft" | "review" | "published"`.
- `SitePage.publicationStatus: PublicationStatus` replaces the boolean as the source of truth; a compatibility `published` value may remain only if it is derived as `publicationStatus === "published"`.
- `getPublishedPages(): SitePage[]`, `getVisiblePages(environment?: "development" | "preview" | "production"): SitePage[]`, and `isPageAvailable(page, environment)` are the shared predicates used by route generation, navigation, search, and sitemap code.
- `parseSiteUrl(value: string | undefined, environment: "development" | "test" | "production"): URL` lives in `src/content/site-url.mjs` with a matching declaration file so Next and Node checks call the exact same parser.

- [ ] Add failing tests proving all 15 core records have an explicit status, review/draft pages are excluded from production-visible output, and published indexable pages alone enter the sitemap.
- [ ] Run the targeted tests and capture the expected failures caused by the missing status and visibility APIs.
- [ ] Add the manifest entries and implement the status predicates without changing the current page copy.
- [ ] Make the catch-all page return `notFound()` for review/draft pages during production generation while retaining them in development and preview.
- [ ] Filter search and navigation through the same visibility predicate and keep the 15 core route list intact.
- [ ] Make `siteConfig.url`, metadata base, canonical, OG, robots, and sitemap use the validated normalized URL.
- [ ] Run the targeted route, publication, SEO, and search tests to green.

### Task 2: Introduce claim-level evidence and scheduled freshness metadata

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/game-data.ts`
- Modify: `src/content/routes.ts`
- Modify: `src/content/page-content.ts`
- Create: `src/content/freshness.ts`
- Create: `src/content/freshness.test.ts`
- Modify: `src/content/publication.test.ts`

**Interfaces:**
- `ClaimStatus = "confirmed" | "reported" | "not_collected" | "fetch_failed"`.
- `FactClaim = { id, topic, claim, value, claimStatus, confidence, verifiedForVersion, sourceURL, evidenceNote, lastChecked }`.
- `SitePage.claims: FactClaim[]`, `SitePage.contentType: "codes" | "tier" | "update" | "dungeon" | "guide" | "trust"`, and `SitePage.nextScheduledCheck: string | null`.
- `FreshnessState = "current" | "due_soon" | "overdue" | "version_gap" | "not_collected" | "fetch_failed"`.
- `getFreshnessStatus(page, asOf): { state, daysUntilCheck, reason }` applies 7-day Codes checks, 90-day content checks, and version-gap detection.

- [ ] Write failing tests for claim fields, source URL requirements, Singapore-date day calculations, the 7-day Codes threshold, 90-day versioned-page threshold, and explicit `not_collected`/`fetch_failed` states.
- [ ] Run the freshness tests and verify they fail before implementation.
- [ ] Add the typed claim and freshness models and wire manifest metadata into every `SitePage`.
- [ ] Add claim records for the identity, transfer, system, gamepass, spell, trading, dungeon, and update facts that the UI currently presents as evidence.
- [ ] Render page-level claim data independently from page-level source records so a source badge cannot imply that every fact on the page is confirmed.
- [ ] Run the targeted content and freshness tests to green.

### Task 3: Repair `/differences/` and `/updates/` with evidence-gated content

**Files:**
- Modify: `src/content/game-data.ts`
- Modify: `src/content/page-content.ts`
- Modify: `src/content/routes.ts`
- Modify: `src/components/content-page.tsx`
- Modify: `app/page.tsx`
- Test: `src/content/publication.test.ts`, `src/content-page.test.tsx`, `src/lib/seo.test.ts`

**Interfaces:**
- `DifferenceRow = { topic, original, reborn, claimStatus, confidence, verifiedForVersion, sourceURL, evidenceNote, lastChecked }`.
- `UpdateRecord = { versionTitle, publishedDate, summary, sourceURL, claimStatus, verifiedForVersion, affectedPaths, lastChecked }`.
- `/differences/` renders a comparison table with one evidence state and source per row; `/updates/` renders update records with version title, publication date, actual change summary, source, and affected internal paths.

- [ ] Write failing tests that reject a differences page containing only the separate-universe identity proof and reject an updates page containing only an API timestamp.
- [ ] Run those tests and verify the current implementation fails the intended content checks.
- [ ] Research and record the original Roblox experience/Universe identifiers and the current Reborn first-party identifiers in `game-data.ts`; only publish claims directly supported by those sources.
- [ ] Add rows for account data, level, equipment, Gamepass ownership, trading, and system differences; use `not_collected` with a direct source and explicit evidence note where first-party sources do not state a difference.
- [ ] Search first-party update channels for an actual patch-note body. If no first-party body exists, set `/updates/` to `review + noindex` and label the metadata timestamp as a signal rather than an update.
- [ ] Add affected-page links only where the update body supports the relationship; otherwise keep the affected list empty and explain why.
- [ ] Render the tables and claim evidence in the shared content page without inventing gameplay values.
- [ ] Run content, component, and SEO tests to green.

### Task 4: Build the repeatable `refresh:audit` command

**Files:**
- Create: `scripts/refresh-audit.mjs`
- Modify: `package.json`
- Modify: `.gitignore`
- Create: `scripts/refresh-audit.test.mjs`
- Modify: `src/content/freshness.ts`

**Interfaces:**
- CLI: `npm run refresh:audit -- --as-of 2026-09-02 --output-dir artifacts/refresh-audit`.
- JSON output: `{ generatedAt, asOf, currentVersion, pages, sitemapGaps, summary }`.
- Each page result includes `path`, `publicationStatus`, `indexable`, `lastVerified`, `nextScheduledCheck`, `state`, `reason`, and `priority`.
- Markdown output contains a bounded table with page, status, last verification, next check, freshness state, priority, and reason.

- [ ] Write failing Node tests for Codes due-soon/overdue behavior, 90-day tier/update/dungeon reminders, version gaps, sitemap gaps, and repeatable output with a fixed `--as-of` date.
- [ ] Run the script tests and verify the audit command is missing or fails the new assertions.
- [ ] Implement the audit from the shared publishing/freshness manifest; do not fetch external sources or mutate content during an audit.
- [ ] Keep `observed_zero`, `not_collected`, and `fetch_failed` distinct in the report.
- [ ] Write JSON and Markdown outputs atomically to the requested artifact directory and print a one-line summary for CI/local review.
- [ ] Run the script tests and a real fixed-date audit to confirm stable output.

### Task 5: Add automatic overdue banners and draft entity scaffolds

**Files:**
- Modify: `src/components/content-page.tsx`
- Modify: `app/globals.css`
- Create: `src/content/entity-drafts.ts`
- Create: `src/content/entity-drafts.test.ts`
- Modify: `src/content/routes.ts`

**Interfaces:**
- `DraftEntity = { id, entityType: "spell" | "weapon", slug, name, sourceURL, use, verifiedForVersion, evidenceNote, relatedPaths, publicationStatus: "draft" }`.
- `canPublishEntity(entity): boolean` requires a non-empty name, source URL, use, verified version, evidence note, and at least two valid internal related paths.
- `getFreshnessStatus(page, currentSingaporeDate)` drives an `Overdue content check` banner when the page is overdue, version-gap, or fetch-failed.

- [ ] Write failing tests proving eight draft records exist, none creates a route/search/sitemap URL, incomplete entities cannot publish, and overdue pages expose a visible banner.
- [ ] Run the tests and verify the current code fails because no draft registry or banner exists.
- [ ] Add four spell and four weapon draft records with empty/uncollected evidence fields; do not give them formal public slugs.
- [ ] Add the publish predicate and keep draft records out of `sitePages`, search, navigation, and sitemap.
- [ ] Render an accessible warning banner only for stale/problem states, with the last checked and next scheduled dates visible.
- [ ] Run the targeted tests to green.

### Task 6: Add content, link, source, and config gates

**Files:**
- Create: `scripts/check-content.mjs`
- Create: `scripts/check-links.mjs`
- Create: `scripts/check-sources.mjs`
- Create: `scripts/check-config.mjs`
- Modify: `src/content/publishing-manifest.json`
- Modify: `package.json`
- Create: `scripts/checks.test.mjs`

**Interfaces:**
- `npm run check-content` validates route uniqueness, explicit statuses, required sections/FAQ/related links, published-page direct answers, and draft-only entity gating.
- `npm run check-links` validates every internal href against visible routes and every source URL with bounded HTTP requests, reporting failing URL and source owner.
- `npm run check-sources` validates every published page source and every critical claim field, including URL, evidence note, claim status, confidence, version, and date.
- `npm run check-config` validates the production URL and rejects missing, non-HTTPS, localhost, query/path, or host-inconsistent values.

- [ ] Write failing tests for each command using temporary fixtures: missing source URL, broken internal link, empty direct answer, invalid production URL, and review page marked indexable/published.
- [ ] Run the tests and verify the new gates fail before their implementations exist.
- [ ] Read the shared `src/content/publishing-manifest.json` directly from Node so the app and gates do not maintain separate status/freshness projections.
- [ ] Implement content checks with actionable route/field diagnostics and no auto-fixing.
- [ ] Implement link checks with a short timeout, redirect acceptance, and a deterministic internal-link pass that does not require the network.
- [ ] Implement source checks so page-level badges and claim-level evidence are validated separately.
- [ ] Implement config checks by calling the same URL parser used by the Next app.
- [ ] Run all four gates and their tests to green.

### Task 7: Add trust pages and fixed-size PNG social metadata

**Files:**
- Modify: `src/content/types.ts`
- Modify: `src/content/routes.ts`
- Modify: `src/content/page-content.ts`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/site-nav.ts`
- Modify: `src/lib/seo.ts`
- Modify: `app/layout.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `app/source-policy/page.tsx`
- Create: `public/og.png`
- Modify: `public/og.svg` only if the PNG conversion requires a source adjustment
- Test: `src/lib/seo.test.ts`, `src/content-page.test.tsx`, `scripts/qa_site.mjs`

**Interfaces:**
- Trust routes are real accessible pages with `PageKind = "trust"`, explicit publication status, footer links, source policy, privacy boundary, and contact/correction instructions.
- `createPageMetadata` uses `/og.png` with width 1200 and height 630 for Open Graph and Twitter metadata.

- [ ] Write failing tests for all three trust routes, footer reachability, PNG metadata, and removal of SVG-only social image references.
- [ ] Run the tests and confirm the current app fails these assertions.
- [ ] Add concise trust-page content that distinguishes the local MVP from production promises and does not claim an unconfigured inbox or moderation system.
- [ ] Generate `public/og.png` from the existing original OG artwork at exactly 1200×630 and verify its dimensions.
- [ ] Update metadata and run a local metadata inspection for canonical, OG image, Twitter image, and sitemap consistency.
- [ ] Run targeted tests to green.

### Task 8: Unify verification and browser QA

**Files:**
- Create: `scripts/verify.mjs`
- Modify: `package.json`
- Modify: `scripts/qa_site.mjs`
- Modify: `.gitignore`
- Modify: `src/app-home.test.tsx` and affected tests only where behavior intentionally changes

**Interfaces:**
- `npm run verify` executes `test`, `typecheck`, `lint`, `check-content`, `check-links`, `check-sources`, `check-config`, `build`, starts a production server, and runs Playwright QA against `TEST_BASE`.
- `scripts/qa_site.mjs` reads `TEST_BASE` and `NEXT_PUBLIC_SITE_URL`, checks published 200 routes, review-route 404s in production, canonical/robots/sitemap metadata, redirects, search, mobile navigation, overflow, and console/page errors.

- [ ] Write failing orchestration/QA assertions for the configured base URL, review-route 404, trust routes, PNG OG, and sitemap publication boundary.
- [ ] Run the targeted QA test and verify it fails against the current fixed-port/fixed-domain assumptions.
- [ ] Implement cross-platform child-process cleanup for the task-owned Next production server and fail fast with the failed command/output.
- [ ] Make browser QA use the same route registry expectations as content/config checks without hard-coding stale page counts.
- [ ] Run `npm run verify` with `NEXT_PUBLIC_SITE_URL=https://dqr.gg` and record every command's exit status.
- [ ] Fix only task-related failures and rerun the complete verification command.

### Task 9: Final review evidence

**Files:**
- Modify: only files implicated by the preceding verification findings.

- [ ] Inspect `git diff --check` and the complete diff for unrelated changes, secrets, and accidental generated files.
- [ ] Run the final production build independently with the required URL configuration.
- [ ] Start a fresh production preview and inspect the homepage, differences, updates, gamepasses, spells, trading, Northern Lands, trust routes, robots, sitemap, and one redirect.
- [ ] Confirm the final artifact links use absolute workspace paths and identify the exact commands and outputs that passed.
- [ ] Report that the work is local-only unless the user separately requests GitHub, deployment, or merge work.
