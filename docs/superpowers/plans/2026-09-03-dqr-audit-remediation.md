# DQR Audit Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Repair the locally actionable SEO and presentation issues from the dungeonquestrebornguide.wiki audit, while preserving evidence-gated publication and producing directly reviewable local URLs.

**Architecture:** Keep the existing typed route registry as the source of truth. Normalize technical URLs through the existing site URL helper, enforce the legacy-domain redirect at the Next 16 proxy boundary, and derive page-specific social image URLs from route metadata through a dedicated `/og/?path=...` handler. Content-poor pages remain public and navigable but noindex until current Reborn evidence meets the existing publication gate.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Vitest, Testing Library, Playwright, Cloudflare OpenNext adapter.

**Spec:** `docs/superpowers/specs/2026-09-02-dqr-mvp-design.md` plus the user-provided audit in `C:\Users\胡天天\.codex\attachments\12a4de63-96fe-42e1-b092-77941ce4c794\pasted-text.txt`.

## Global Constraints

- Keep all user-facing site copy in English and do not publish guessed dungeon, spell, drop, price, code, ranking, or transfer claims.
- Keep `published` separate from `indexable`; content-poor pages remain publicly reachable as `Public / noindex`.
- Canonical host is `https://dungeonquestrebornguide.wiki`; the `www` alias redirects permanently while preserving path and query string.
- Sitemap contains only published, indexable pages and must use one slash between origin and `/sitemap.xml`.
- Local verification is not production proof; GSC submission, backlinks, domain age, and deployed DNS/TLS remain external follow-up items.
- Preserve the existing untracked plan file and all unrelated worktree changes.

---

### Task 1: Repair robots sitemap URL generation

**Files:**
- Modify: `app/robots.ts`
- Test: `src/lib/seo.test.ts`

**Interfaces:**
- `robots().sitemap` returns `absoluteUrl("/sitemap.xml")`.

- [x] Add a test that asserts the robots sitemap URL is exactly `https://dungeonquestrebornguide.wiki/sitemap.xml` and contains no `//sitemap` path.
- [x] Run the focused SEO test and observe the failure caused by `${siteConfig.url}/sitemap.xml`.
- [x] Replace string concatenation with the existing URL helper.
- [x] Run the focused SEO test and the complete test suite.

### Task 2: Redirect the `www` host alias

**Files:**
- Create: `proxy.ts`
- Create: `src/lib/host-redirect.ts`
- Test: `src/lib/host-redirect.test.ts`

**Interfaces:**
- `getCanonicalHostRedirect(host: string | null, pathname: string, search: string): string | null` returns a canonical `https://dungeonquestrebornguide.wiki` URL for `www.dungeonquestrebornguide.wiki`, otherwise `null`.
- `proxy.ts` returns a permanent redirect for the `www` alias and leaves canonical/local/preview hosts untouched.

- [x] Add failing tests for the `www` alias, port-suffixed requests, query preservation, and canonical-host passthrough.
- [x] Run the focused redirect test and observe the missing-helper failure.
- [x] Implement the exact-host helper using URL construction, preserving path and query while never forwarding credentials or a foreign host.
- [x] Add `proxy.ts` that reads the request host and returns a 308 redirect only for the `www` alias.
- [x] Run the focused redirect test, typecheck, and build.

### Task 3: Generate route-specific social preview images

**Files:**
- Modify: `src/lib/seo.ts`
- Create: `app/og/route.tsx`
- Create: `src/components/og-image.tsx`
- Modify: `src/lib/seo.test.ts`

**Interfaces:**
- `getOpenGraphImagePath(pagePath: string): string` maps `/` to `/og/?path=%2F` and `/spells/` to `/og/?path=%2Fspells%2F`.
- `app/og/route.tsx` renders the requested route title, evidence state, and canonical site name through `ImageResponse`.
- Page metadata uses the route-specific image endpoint for Open Graph and Twitter cards.

- [x] Add tests proving the homepage and `/spells/` metadata use different route-specific image URLs with the correct dimensions.
- [x] Run the focused SEO test and observe the shared `/og.png` expectation failure.
- [x] Implement the URL mapper and metadata update.
- [x] Implement the `/og` image handler with route lookup, no external fetch, and a safe fallback title for unknown paths.
- [x] Run the focused SEO test and build; inspect the generated metadata endpoints through the local server.

### Task 4: Expand the homepage with evidence-led explanatory content

**Files:**
- Modify: `app/page.tsx`
- Modify: `src/app-home.test.tsx` only if assertions need to describe the intentional content expansion.

**Interfaces:**
- Homepage remains a server component and keeps all existing task links, status cards, JSON-LD, and route visibility filters.
- New copy explains the guide's evidence ladder, player-task workflow, current data boundary, and how to use sources without turning unknowns into claims.

- [x] Add a focused test that checks the homepage includes the evidence-led explanatory headings and the current-version boundary.
- [x] Run the focused home test and observe the missing-heading failure.
- [x] Add substantive, non-repetitive sections in the existing shell, with internal links only to visible routes.
- [x] Keep keyword usage natural and avoid claiming a 1,200-word target as a ranking guarantee.
- [x] Run the focused home test and inspect desktop/mobile output through the local server.

### Task 5: Verify the complete local deliverable

**Files:**
- Modify: only files implicated by verification failures.

- [x] Run `npm.cmd test` and record the complete result.
- [x] Run `npm.cmd run typecheck` and `npm.cmd run lint`.
- [x] Run `NEXT_PUBLIC_SITE_URL=https://dungeonquestrebornguide.wiki npm.cmd run build` using the Windows-compatible environment assignment.
- [x] Start a fresh local production server and verify homepage, `/dungeons/`, `/spells/`, `/codes/`, `/updates/`, `/robots.txt`, `/sitemap.xml`, and an old-host redirect.
- [x] Run browser QA at desktop and 375px viewport for navigation, search/menu, overflow, headings, metadata, and console errors.
- [x] Inspect `git diff --check` and final diff for scope and accidental generated files.
- [x] Report completed local changes separately from external GSC/backlink/domain-age actions.
