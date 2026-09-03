# DQR.GG Single-Row Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the persistent two-row site navigation with one responsive Header that exposes every non-trust page through four click-activated groups plus direct Codes and Updates links.

**Architecture:** Keep navigation data server-safe and centralized in `site-nav.ts`, with runtime publication filtering shared by desktop and mobile renderers. Add one small client component for desktop disclosure state, expand the existing mobile component into a categorized accordion, and leave the Header, content routes, publication manifest, sitemap, and footer boundaries intact.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Testing Library, Tailwind-generated global CSS, Playwright browser QA.

**Spec:** `docs/superpowers/specs/2026-09-03-dqr-navigation-ia-design.md`

## Global Constraints

- Keep all 28 public routes, canonical URLs, publication states, indexability states, content, and sitemap behavior unchanged.
- Keep `/`, `/codes/`, and `/trello/` indexable exactly as recorded in the current manifest; do not promote any noindex route.
- Every non-trust page must appear exactly once in the global navigation structure; trust pages remain in the footer.
- Use click-activated disclosure menus, not hover-only interaction.
- Do not add a navigation dependency or turn `SiteHeader` into a client component.
- Preserve the existing dark blue, gold, blue, typography, and spacing tokens.
- Desktop Header remains a single line; mobile uses one categorized menu and removes the persistent horizontal guide strip.
- Work inline on the existing `codex/wenti` feature branch because the user explicitly requested uninterrupted execution without another workspace-choice question.

---

### Task 1: Centralize the categorized navigation model

**Files:**
- Create: `src/components/site-nav.test.ts`
- Modify: `src/components/site-nav.ts`

**Interfaces:**
- Produces: `NavItem = readonly [label: string, href: string]`.
- Produces: `NavGroup = { label: string; items: readonly NavItem[] }`.
- Produces: `getNavigationGroups(environment?: RuntimeEnvironment): NavGroup[]`.
- Produces: `getDirectNavigationItems(environment?: RuntimeEnvironment): NavItem[]`.
- Produces: `getNavigationItems(environment?: RuntimeEnvironment): NavItem[]`, a flattened list used to prove complete, duplicate-free coverage.
- Produces: `isNavigationPathActive(pathname: string, href: string): boolean` with normalized trailing-slash handling and section-prefix matching.

- [ ] **Step 1: Write the failing coverage and active-path tests**

```ts
import { describe, expect, it } from "vitest";

import { getNavigationItems, isNavigationPathActive } from "./site-nav";

describe("site navigation model", () => {
  it("covers every production non-trust page exactly once", () => {
    const paths = getNavigationItems("production").map(([, href]) => href);

    expect(paths).toHaveLength(25);
    expect(new Set(paths).size).toBe(25);
    expect(paths).toEqual(expect.arrayContaining([
      "/", "/dungeons/", "/drops/", "/builds/", "/beginner-guide/",
      "/codes/", "/updates/", "/trello/", "/scripts-macros/"
    ]));
    expect(paths).not.toEqual(expect.arrayContaining(["/source-policy/", "/privacy/", "/contact/"]));
  });

  it("matches exact pages and nested sections without matching sibling prefixes", () => {
    expect(isNavigationPathActive("/builds/mage/", "/builds/")).toBe(true);
    expect(isNavigationPathActive("/codes", "/codes/")).toBe(true);
    expect(isNavigationPathActive("/spell-tier-list/", "/spells/")).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm.cmd test -- src/components/site-nav.test.ts`

Expected: FAIL because the current flat model contains only seven links and `isNavigationPathActive` is not exported.

- [ ] **Step 3: Implement the categorized source of truth**

```ts
export type NavItem = readonly [label: string, href: string];
export type NavGroup = Readonly<{ label: string; items: ReadonlyArray<NavItem> }>;

export const NAV_GROUPS = [
  { label: "Dungeons", items: [["Dungeons Overview", "/dungeons/"], ["Northern Lands", "/dungeons/northern-lands/"], ["Winter Outpost", "/dungeons/winter-outpost/"]] },
  { label: "Gear", items: [["Drops", "/drops/"], ["Spells & Skills", "/spells/"], ["Weapons", "/weapons/"], ["Armor", "/armor/"], ["Cosmetics", "/cosmetics/"]] },
  { label: "Builds", items: [["Builds Overview", "/builds/"], ["Tier List", "/tier-list/"], ["Spell Tier List", "/spell-tier-list/"], ["Mage Build", "/builds/mage/"], ["Warrior Build", "/builds/warrior/"], ["Tank Build", "/builds/tank/"], ["Healer Build", "/builds/healer/"], ["Gamepasses", "/gamepasses/"]] },
  { label: "Guides", items: [["Beginner Guide", "/beginner-guide/"], ["Reborn vs Original", "/differences/"], ["Trading Guide", "/trading/"], ["Trello Status", "/trello/"], ["Discord Status", "/discord/"], ["Scripts & Macros Safety", "/scripts-macros/"]] }
] as const satisfies ReadonlyArray<NavGroup>;

export const NAV_DIRECT_ITEMS = [["Home", "/"], ["Codes", "/codes/"], ["Updates", "/updates/"]] as const satisfies ReadonlyArray<NavItem>;
```

Filter both groups and direct items with the existing `getPageByPath` and `isPageAvailable` predicate. Flatten groups plus direct items in `getNavigationItems`, and normalize paths before comparing them in `isNavigationPathActive`.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm.cmd test -- src/components/site-nav.test.ts`

Expected: PASS with 2 tests and no warnings.

- [ ] **Step 5: Commit the navigation model**

```powershell
git add -- src/components/site-nav.ts src/components/site-nav.test.ts
git commit -m "refactor: centralize categorized site navigation"
```

---

### Task 2: Add the desktop disclosure navigation and remove the second row

**Files:**
- Create: `src/components/desktop-nav.tsx`
- Create: `src/components/desktop-nav.test.tsx`
- Create: `src/components/site-header.test.tsx`
- Modify: `src/components/site-header.tsx`
- Delete: `src/components/guide-nav.tsx`
- Delete: `src/components/guide-nav.test.tsx`

**Interfaces:**
- Consumes: `getNavigationGroups`, `getDirectNavigationItems`, and `isNavigationPathActive` from Task 1.
- Produces: `DesktopNav(): React.ReactElement`, a client component rendered inside the server `SiteHeader`.

- [ ] **Step 1: Write failing Header and interaction tests**

Test real rendered behavior:

```tsx
vi.mock("next/navigation", () => ({ usePathname: () => "/builds/mage/" }));

it("renders one primary navigation without the persistent guide strip", () => {
  render(<SiteHeader />);
  expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
  expect(screen.queryByRole("navigation", { name: "Guide sections" })).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Builds" })).toHaveAttribute("aria-expanded", "false");
});

it("opens one group at a time and closes it with Escape", async () => {
  const user = userEvent.setup();
  render(<DesktopNav />);
  await user.click(screen.getByRole("button", { name: "Dungeons" }));
  expect(screen.getByRole("link", { name: "Northern Lands" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "Builds" }));
  expect(screen.queryByRole("link", { name: "Northern Lands" })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Mage Build" })).toHaveAttribute("aria-current", "page");
  await user.keyboard("{Escape}");
  expect(screen.getByRole("button", { name: "Builds" })).toHaveAttribute("aria-expanded", "false");
});
```

Also test an outside pointer event and a link click closing the open group.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm.cmd test -- src/components/desktop-nav.test.tsx src/components/site-header.test.tsx`

Expected: FAIL because `DesktopNav` and the new single-row Header do not exist.

- [ ] **Step 3: Implement the minimal desktop disclosure component**

Use a single `openGroup: string | null` state, one root `ref`, and listeners installed only while a group is open:

```tsx
const [openGroup, setOpenGroup] = useState<string | null>(null);
const navRef = useRef<HTMLElement>(null);

useEffect(() => {
  if (!openGroup) return;
  const onPointerDown = (event: PointerEvent) => {
    if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") setOpenGroup(null);
  };
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeyDown);
  return () => {
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeyDown);
  };
}, [openGroup]);
```

Render each group as a button with `aria-expanded` and `aria-controls`, conditionally render only the open panel, close on link click, and render Codes and Updates as direct links. Exclude Home from text navigation because the Logo already owns `/`.

Update `SiteHeader` to render `<DesktopNav />`, keep `<SiteLogo />`, `<SearchDialog />`, and `<MobileNav />`, and remove `<GuideNav />`. Delete the now-unreferenced `GuideNav` files.

- [ ] **Step 4: Run the tests and verify GREEN**

Run: `npm.cmd test -- src/components/site-nav.test.ts src/components/desktop-nav.test.tsx src/components/site-header.test.tsx`

Expected: PASS with disclosure, active-state, outside-click, link-click, and one-row Header behavior covered.

- [ ] **Step 5: Commit the desktop navigation**

```powershell
git add -- src/components/desktop-nav.tsx src/components/desktop-nav.test.tsx src/components/site-header.tsx src/components/site-header.test.tsx
git rm -- src/components/guide-nav.tsx src/components/guide-nav.test.tsx
git commit -m "feat: replace persistent guide bar with dropdown navigation"
```

---

### Task 3: Expand the mobile menu and implement responsive styling

**Files:**
- Modify: `src/components/mobile-nav.tsx`
- Modify: `src/components/mobile-nav.test.tsx`
- Modify: `src/components/search-dialog.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the same filtered navigation groups and direct items as desktop.
- Produces: one mobile navigation surface with category accordion buttons, direct Codes and Updates links, active states, and close-on-navigation behavior.
- Produces: `.header-shell`, `.desktop-nav-group`, `.desktop-nav-panel`, `.mobile-nav-group`, and responsive search classes.

- [ ] **Step 1: Replace the mobile test with failing categorized-menu behavior**

```tsx
vi.mock("next/navigation", () => ({ usePathname: () => "/weapons/" }));

it("exposes the complete categorized navigation and closes after navigation", () => {
  render(<MobileNav />);
  fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
  expect(screen.getByRole("link", { name: "Codes" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Gear" }));
  expect(screen.getByRole("link", { name: "Weapons" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Cosmetics" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("link", { name: "Weapons" }));
  expect(screen.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
});
```

Add a second test confirming that opening one accordion closes the previous one and `Escape` closes the whole menu.

- [ ] **Step 2: Run the mobile tests and verify RED**

Run: `npm.cmd test -- src/components/mobile-nav.test.tsx`

Expected: FAIL because the current mobile menu has seven flat links and no category buttons.

- [ ] **Step 3: Implement the categorized mobile menu**

Keep separate `open` and `openGroup` state. Render four accordion buttons and filtered child links, followed by direct Home, Codes, and Updates links. Use `usePathname` only for active presentation, not for navigation or data fetching. Close both states when a link is activated and close the whole menu on `Escape`.

- [ ] **Step 4: Implement the one-row responsive CSS**

Required rules:

```css
.header-shell { width:min(100% - 36px,1320px); margin-inline:auto; }
.header-inner { min-height:64px; display:flex; align-items:center; gap:20px; }
.desktop-nav { position:relative; display:flex; align-items:center; gap:2px; margin-left:auto; }
.desktop-nav-panel { position:absolute; top:calc(100% + 10px); z-index:60; min-width:240px; }

@media (max-width:1180px) {
  .search-trigger { min-width:42px; width:42px; padding:0; justify-content:center; }
  .search-trigger span,.search-trigger kbd { display:none; }
}

@media (max-width:880px) {
  .desktop-nav { display:none; }
  .mobile-nav { display:block; }
}
```

Remove all `.guide-nav*` rules. Style panels with existing `--surface`, `--surface-hover`, `--border`, `--accent-gold`, and `--accent-blue` tokens. Keep minimum 42–44px touch targets, a viewport-bounded mobile panel, readable active states, and no horizontal overflow.

- [ ] **Step 5: Run component tests and static checks**

Run: `npm.cmd test -- src/components/site-nav.test.ts src/components/desktop-nav.test.tsx src/components/site-header.test.tsx src/components/mobile-nav.test.tsx`

Run: `npm.cmd run typecheck`

Run: `npm.cmd run lint`

Expected: all commands exit 0 with no test, type, or lint errors.

- [ ] **Step 6: Commit mobile and responsive behavior**

```powershell
git add -- src/components/mobile-nav.tsx src/components/mobile-nav.test.tsx src/components/search-dialog.tsx app/globals.css
git commit -m "feat: add responsive categorized mobile navigation"
```

---

### Task 4: Build and perform browser acceptance testing

**Files:**
- Modify only if a regression test identifies a task-scoped defect.
- Output: `qa-artifacts/navigation-ia/` screenshots and QA notes; keep these ignored/local-only.

**Interfaces:**
- Consumes: the completed Header, desktop dropdown, mobile accordion, and existing `npm.cmd run verify` pipeline.
- Produces: a fresh production build and a local review server URL.

- [ ] **Step 1: Run the fresh production build**

Run:

```powershell
$env:NEXT_PUBLIC_SITE_URL='https://dqr.gg'
npm.cmd run build
```

Expected: Next.js exits 0 and generates all current static routes without changing their indexability.

- [ ] **Step 2: Start a local production server on an available loopback port**

Run `npm.cmd start -- -p 4180 -H 127.0.0.1` in a persistent terminal session. Port 4180 was confirmed available during plan review. Do not stop unrelated existing servers.

- [ ] **Step 3: Verify the three target viewports with Playwright**

At 1440x900, 1024x768, and 375x812:

- assert `document.documentElement.scrollWidth === window.innerWidth`;
- assert one Header row and no `Guide sections` navigation;
- assert the Logo is not visually truncated;
- open Dungeons, then Builds, and assert only the second panel remains;
- assert active state on `/builds/mage/`;
- open mobile navigation and Gear accordion at 375px;
- navigate to Weapons and confirm the menu closes;
- capture screenshots under `qa-artifacts/navigation-ia/`;
- collect console errors and fail on non-ignorable application errors.

- [ ] **Step 4: Verify representative routes and trust boundaries**

Request and render:

```text
/
/dungeons/
/weapons/
/builds/mage/
/codes/
/source-policy/
/sitemap.xml
/robots.txt
```

Expected: HTTP 200, no route loss, trust pages remain footer-accessible, and sitemap/indexability behavior matches the pre-change manifest.

- [ ] **Step 5: Run the full repository verification pipeline**

Run:

```powershell
$env:NEXT_PUBLIC_SITE_URL='https://dqr.gg'
npm.cmd run verify
```

Expected: tests, typecheck, lint, content/link/source/config gates, build, refresh audit, and browser QA all exit 0.

- [ ] **Step 6: Inspect the final change set**

Run:

```powershell
git status --short
git diff --check HEAD
git diff --stat 6da4ae6..HEAD
git log --oneline -5
```

Confirm only the approved navigation, tests, CSS, spec, and plan are committed; local QA artifacts remain untracked only if already ignored.

- [ ] **Step 7: Deliver local review links**

Provide the loopback homepage plus direct links for Dungeons, Weapons, Mage Build, Codes, Source Policy, sitemap, and robots. State build and verification counts from the fresh command outputs, and explicitly state that no push, PR, merge, deploy, or Cloudflare release was performed.
