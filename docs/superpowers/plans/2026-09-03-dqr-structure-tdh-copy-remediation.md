# DQR Structure, TDH, and Copy Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the restored 28-route DQR site from an editor-facing evidence preview into a player-facing, research-backed guide structure with honest TDH, reproducible official snapshots, natural copy, accurate schema, and reviewable local pages.

**Architecture:** Keep the typed route registry, publishing manifest, and static App Router pages. Import current first-party data from a generated JSON snapshot, keep community material in the source ledger as reported demand/observation, derive player-facing status labels separately from indexability, and make structured data follow the real route hierarchy rather than sidebar links.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, JSON content snapshots, Vitest, Testing Library, Node ESM scripts, Playwright.

**Spec:** `建站方案终版.md`, `docs/superpowers/specs/2026-09-02-dqr-mvp-design.md`, and `docs/research/2026-09-03-dqr-player-demand.md`.

## Global Constraints

- All public copy stays in English and answers a player question before explaining evidence limits.
- Official Roblox pages/APIs support factual identity and metadata; forum/social material stays `reported` unless independently reproduced.
- Published and indexable remain separate. Thin pages stay reachable and noindex.
- Do not publish guessed levels, prices, drop rates, codes, tiers, transfer rules, or patch notes.
- Canonical host remains `https://dungeonquestrebornguide.wiki`; the `www` alias redirects to the canonical host.
- Do not deploy, push, merge externally, or alter unrelated untracked files.

---

### Task 1: Restore and verify the complete project baseline

**Files:** Existing branch history only.

- [x] Compare `codex/skills` and `codex/wenti` and verify the latter descends from the former.
- [x] Fast-forward `codex/skills` to `949815d` without touching untracked files.
- [x] Run the baseline test suite and record the result before new production changes.

### Task 2: Add a reproducible official snapshot refresh

**Files:**
- Create: `scripts/official-snapshot.mjs`
- Create: `scripts/official-snapshot.test.mjs`
- Create: `src/content/official-snapshot.json`
- Modify: `src/content/game-data.ts`
- Modify: `package.json`

**Interfaces:**
- `buildOfficialSnapshot({ game, passes, fetchedAt })` returns the stable JSON shape consumed by `game-data.ts`.
- `npm run refresh:official` fetches the two existing first-party endpoints and writes `src/content/official-snapshot.json`.

- [ ] Write fixture-based failing tests for normalized game identity, updated time, pass names/status, missing-record errors, and deterministic serialization.
- [ ] Run `npm.cmd test -- scripts/official-snapshot.test.mjs` and verify the missing module failure.
- [ ] Implement the parser and CLI with response validation and no build-time network dependency.
- [ ] Run the focused test to green, execute `npm.cmd run refresh:official`, and confirm the snapshot records the current API timestamp.
- [ ] Replace duplicated hard-coded API fields in `game-data.ts` with the JSON snapshot and rerun publication tests.

### Task 3: Decouple public evidence language from SEO state

**Files:**
- Modify: `src/content/routes.ts`
- Modify: `src/components/content-page.tsx`
- Modify: `app/og/route.tsx`
- Modify: `src/components/og-image.tsx`
- Modify: `src/content-page.test.tsx`
- Modify: `src/lib/seo.test.ts`

**Interfaces:**
- `getPlayerFacingStatus(page)` returns `Source checked`, `Gameplay details in review`, `Source check incomplete`, or `Site information` without exposing indexability.
- `buildBreadcrumbItems(page)` returns Home, an optional direct parent hub, and the current page.

- [ ] Add failing component tests that reject `Indexable`, `Public / noindex`, `Review preview`, `MVP`, and `mockup` in rendered player pages.
- [ ] Add failing schema tests for a three-level Northern Lands breadcrumb and ItemList entries built only from direct child pages.
- [ ] Add a failing OG test requiring the configured canonical hostname and a player-facing status.
- [ ] Implement player-facing status labels and remove the indexability badge from visible UI/OG output.
- [ ] Require explicit seed evidence defaults independent of `indexable`.
- [ ] Implement hierarchical breadcrumbs and direct-child ItemLists; omit ItemList where no real child page exists.
- [ ] Run focused component and SEO tests to green.

### Task 4: Align TDH and copy with actual page content

**Files:**
- Modify: `src/content/routes.ts`
- Modify: `src/content/page-content.ts`
- Modify: `app/page.tsx`
- Modify: `app/not-found.tsx`
- Create: `src/public-copy.test.ts`

**Interfaces:** Public route data contains honest titles, descriptions, summaries, quick answers, sections, FAQ, and related-link copy.

- [ ] Write a failing public-copy test that detects editor-facing terms and overpromising title fragments on incomplete pages.
- [ ] Run the focused test and confirm failures identify the existing public strings.
- [ ] Retitle `/differences/`, `/gamepasses/`, `/spells/`, `/spell-tier-list/`, `/trading/`, `/dungeons/`, dungeon details, `/drops/`, `/codes/`, `/discord/`, `/tier-list/`, and `/updates/` to match their current evidence depth.
- [ ] Rewrite route summaries, quick answers, section copy, FAQ, trust copy, and homepage explanations in direct player language.
- [ ] Preserve official facts and uncertainty; retain community questions as reported demand rather than gameplay proof.
- [ ] Run the public-copy, route, publication, home, and content component tests to green.

### Task 5: Improve high-demand page structures

**Files:**
- Modify: `src/components/content-page.tsx`
- Modify: `src/content/page-content.ts`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `src/content-page.test.tsx`
- Modify: `src/app-home.test.tsx`

- [ ] Add failing tests for a stuck-player decision section, a focused Northern Lands observation panel, and honest Game Pass capture guidance.
- [ ] Keep the existing Differences comparison table and Updates ledger, but replace database-gate framing with page-specific player questions.
- [ ] On dungeon detail pages, show the current dungeon first rather than a two-dungeon generic dossier.
- [ ] Add homepage routes for beginner progression, Northern Lands, Game Pass pricing questions, and Reborn differences based on the demand note.
- [ ] Change the 375px task grid to two columns and retain one short intent line.
- [ ] Raise sidebar source/FAQ text to a readable mobile size.
- [ ] Run focused tests and inspect 1440px and 375px screenshots.

### Task 6: Verify and expose the local review build

**Files:** Modify only files implicated by verification failures.

- [ ] Run `npm.cmd test`, `npm.cmd run typecheck`, `npm.cmd run lint`, and all content/config/source/link gates.
- [ ] Run `npm.cmd run refresh:audit -- --as-of 2026-09-03` and inspect priority/state output.
- [ ] Run `NEXT_PUBLIC_SITE_URL=https://dungeonquestrebornguide.wiki npm.cmd run build` with PowerShell environment assignment.
- [ ] Start a production server at `127.0.0.1:4178`, run browser QA, and verify delayed persistence.
- [ ] Inspect desktop/mobile screenshots, canonical/robots/schema output, console errors, `git diff --check`, and final scoped diff.
- [ ] Leave the local review server running and report direct URLs for the homepage, Differences, Game Passes, Codes, Northern Lands, Dungeons, Beginner Guide, Updates, Source Policy, sitemap, and robots.
