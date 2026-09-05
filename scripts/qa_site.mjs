import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.TEST_BASE || "http://127.0.0.1:3000";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "content", "publishing-manifest.json"), "utf8"));
const routes = manifest.pages.filter((page) => page.publicationStatus === "published").map((page) => page.path);
const indexableRoutes = manifest.pages.filter((page) => page.publicationStatus === "published" && page.indexable).map((page) => page.path);
const reviewRoutes = manifest.pages.filter((page) => page.publicationStatus === "review").map((page) => page.path);
const redirects = new Map([
  ["/wiki/", "/"],
  ["/skills/", "/spells/"],
  ["/all-spells/", "/spells/"],
  ["/gamepass/", "/gamepasses/"],
  ["/discord-server/", "/discord/"],
  ["/reborn-vs-original/", "/differences/"]
]);

function assert(condition, message) {
  if (!condition) throw new Error(typeof message === "string" ? message : JSON.stringify(message));
}

async function assertNoOverflow(page, label) {
  const metrics = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth
  }));
  assert(metrics.document <= metrics.viewport, { label, metrics });
  assert(metrics.body <= metrics.viewport, { label, metrics });
}

const artifactDir = path.join(process.cwd(), "qa-artifacts");
fs.mkdirSync(artifactDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const badResponses = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(String(error)));
  page.on("response", (response) => { if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    assert(response && response.status() === 200, { route, status: response?.status() });
    assert(await page.locator("h1").count() === 1, { route, h1: await page.locator("h1").count() });
  }

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  assert(canonical === new URL("/", siteUrl).toString(), `home canonical=${canonical}`);
  const homeOg = await page.locator('meta[property="og:image"]').getAttribute("content");
  assert(homeOg === new URL("/og/?path=%2F", siteUrl).toString(), `home og=${homeOg}`);
  assert(await page.getByRole("navigation", { name: "Guide sections" }).count() === 0, "persistent guide navigation still rendered");
  const primaryNavigation = page.getByRole("navigation", { name: "Primary navigation" });
  assert(await primaryNavigation.count() === 1, "primary navigation missing");
  const headerBox = await page.locator(".site-header").boundingBox();
  assert(headerBox && headerBox.height <= 66, { label: "desktop-header-height", headerBox });
  const desktopLogoFits = await page.locator(".site-logo-full").evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
  assert(desktopLogoFits, "desktop logo is truncated");
  await primaryNavigation.getByRole("button", { name: "Dungeons", exact: true }).click();
  assert(await primaryNavigation.getByRole("link", { name: "Northern Lands", exact: true }).count() === 1, "Dungeons menu did not open");
  await primaryNavigation.getByRole("button", { name: "Builds", exact: true }).click();
  assert(await primaryNavigation.getByRole("link", { name: "Northern Lands", exact: true }).count() === 0, "previous desktop menu remained open");
  assert(await primaryNavigation.getByRole("link", { name: "Mage Build", exact: true }).count() === 1, "Builds menu did not open");
  await page.waitForTimeout(180);
  await page.screenshot({ path: path.join(artifactDir, "home-desktop-menu.png"), fullPage: false });
  await page.keyboard.press("Escape");
  assert(await page.locator(".desktop-nav-panel").count() === 0, "desktop menu remained open after Escape");
  await page.screenshot({ path: path.join(artifactDir, "home-desktop.png"), fullPage: true });
  await page.keyboard.press("Control+K");
  const search = page.getByPlaceholder("Try “where does an item drop”");
  await search.waitFor();
  await search.fill("codes");
  await page.getByRole("link", { name: /Codes/ }).waitFor();
  await page.keyboard.press("Escape");

  await page.goto(`${baseUrl}/builds/mage/`, { waitUntil: "networkidle" });
  const buildsButton = primaryNavigation.getByRole("button", { name: "Builds", exact: true });
  assert((await buildsButton.getAttribute("class"))?.includes("active"), "Builds group active state missing");
  await buildsButton.click();
  assert(await primaryNavigation.getByRole("link", { name: "Mage Build", exact: true }).getAttribute("aria-current") === "page", "Mage Build active state missing");
  await page.keyboard.press("Escape");

  await page.goto(`${baseUrl}/codes/`, { waitUntil: "networkidle" });
  assert((await page.locator("body").innerText()).includes("No active code is published"), "codes empty state missing");
  assert(await page.getByRole("button", { name: /Copy/i }).count() === 0, "unexpected code copy button");

  const robotsResponse = await context.request.get(`${baseUrl}/robots.txt`);
  const robotsText = await robotsResponse.text();
  assert(robotsResponse.status() === 200, `robots status=${robotsResponse.status()}`);
  assert(robotsText.includes(`Sitemap: ${new URL("/sitemap.xml", siteUrl).toString()}`), `robots body=${robotsText}`);
  assert(!robotsText.includes("//sitemap.xml"), `robots body=${robotsText}`);
  const sitemapResponse = await context.request.get(`${baseUrl}/sitemap.xml`);
  const sitemapText = await sitemapResponse.text();
  assert(sitemapResponse.status() === 200, `sitemap status=${sitemapResponse.status()}`);
  assert((sitemapText.match(/<loc>/g) ?? []).length === indexableRoutes.length, `sitemap locations=${sitemapText}`);
  for (const route of indexableRoutes) {
    assert(sitemapText.includes(new URL(route, siteUrl).toString()), { route, sitemapText });
  }
  const ogResponse = await context.request.get(`${baseUrl}/og/?path=%2Fspells%2F`);
  assert(ogResponse.status() === 200, `og status=${ogResponse.status()}`);
  assert(ogResponse.headers()["content-type"]?.includes("image/png"), `og type=${ogResponse.headers()["content-type"]}`);

  await page.goto(`${baseUrl}/dungeons/northern-lands/`, { waitUntil: "networkidle" });
  assert(await page.getByRole("table", { name: "Room-by-room route", exact: true }).count() === 1, "Northern Lands route table missing");
  assert(await page.getByRole("button", { name: /play Northern Lands solo route/i }).count() === 1, "Northern Lands video facade missing");
  assert(await page.locator('iframe[title="Northern Lands solo route"]').count() === 0, "YouTube iframe loaded before a click");
  await page.screenshot({ path: path.join(artifactDir, "northern-lands-desktop.png"), fullPage: true });

  await page.goto(`${baseUrl}/gamepasses/`, { waitUntil: "networkidle" });
  assert((await page.locator("body").innerText()).includes("Why the Gold Price Can Change"), "Gamepass evidence section missing");
  assert(await page.getByRole("button", { name: /play Gamepass storefront walkthrough/i }).count() === 1, "Gamepass video facade missing");
  await page.screenshot({ path: path.join(artifactDir, "gamepasses-desktop.png"), fullPage: true });

  await page.goto(`${baseUrl}/privacy/`, { waitUntil: "networkidle" });
  const robots = (await page.locator('meta[name="robots"]').getAttribute("content")) || "";
  assert(robots.toLowerCase().includes("noindex"), `privacy robots=${robots}`);

  for (const route of reviewRoutes) {
    const response = await context.request.get(`${baseUrl}${route}`, { maxRedirects: 0 });
    assert(response.status() === 404, { route, status: response.status() });
  }

  for (const [source, destination] of redirects) {
    const response = await context.request.get(`${baseUrl}${source}`, { maxRedirects: 0 });
    assert([301, 308].includes(response.status()), `${source} status=${response.status()}`);
    const location = response.headers().location;
    assert([destination, `${baseUrl}${destination}`].includes(location), { source, location, destination });
  }
  const currentHostResponse = await context.request.get(`${baseUrl}/spells/?role=mage`, {
    maxRedirects: 0,
    headers: { host: "dungeonquestrebornguide.wiki" }
  });
  assert(currentHostResponse.status() === 200, `current host status=${currentHostResponse.status()}`);

  const tablet = await context.newPage();
  await tablet.setViewportSize({ width: 1024, height: 768 });
  await tablet.goto(baseUrl, { waitUntil: "networkidle" });
  await assertNoOverflow(tablet, "home-tablet");
  const tabletHeaderBox = await tablet.locator(".site-header").boundingBox();
  assert(tabletHeaderBox && tabletHeaderBox.height <= 66, { label: "tablet-header-height", tabletHeaderBox });
  const tabletLogoFits = await tablet.locator(".site-logo-full").evaluate((element) => element.scrollWidth <= element.clientWidth + 1);
  assert(tabletLogoFits, "tablet logo is truncated");
  assert(await tablet.getByRole("navigation", { name: "Primary navigation" }).isVisible(), "tablet primary navigation hidden");
  assert(!(await tablet.locator(".search-trigger span").isVisible()), "tablet search label did not collapse");
  await tablet.screenshot({ path: path.join(artifactDir, "home-tablet.png"), fullPage: true });
  await tablet.close();

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "home-mobile");
  assert(!(await mobile.getByRole("navigation", { name: "Primary navigation" }).isVisible()), "desktop navigation visible on mobile");
  const mobileLogoFits = await mobile.locator(".site-logo-short").evaluate((element) => (
    getComputedStyle(element).display !== "none" && element.scrollWidth <= element.clientWidth + 1
  ));
  assert(mobileLogoFits, "mobile short logo is hidden or truncated");
  const navToggle = mobile.getByRole("button", { name: "Open navigation" });
  await navToggle.click();
  const mobileNavigation = mobile.getByRole("navigation", { name: "Mobile navigation" });
  const mobileNavigationBox = await mobileNavigation.boundingBox();
  assert(
    mobileNavigationBox && mobileNavigationBox.x >= 0 && mobileNavigationBox.x + mobileNavigationBox.width <= 375,
    { label: "mobile-navigation-viewport", mobileNavigationBox }
  );
  await mobileNavigation.getByRole("button", { name: "Gear", exact: true }).click();
  assert(await mobileNavigation.getByRole("link", { name: "Cosmetics", exact: true }).count() === 1, "mobile Gear accordion did not open");
  await mobile.screenshot({ path: path.join(artifactDir, "home-mobile-menu.png"), fullPage: false });
  await mobileNavigation.getByRole("link", { name: "Weapons", exact: true }).click();
  await mobile.waitForURL(`${baseUrl}/weapons/`);
  assert(await mobile.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded") === "false", "mobile menu remained open");
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: path.join(artifactDir, "home-mobile.png"), fullPage: true });
  await mobile.goto(`${baseUrl}/privacy/`, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "privacy-mobile");
  await mobile.screenshot({ path: path.join(artifactDir, "privacy-mobile.png"), fullPage: true });
  await mobile.goto(`${baseUrl}/dungeons/northern-lands/`, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "northern-media-mobile");
  assert(await mobile.getByRole("button", { name: /play Northern Lands solo route/i }).count() === 1, "Northern Lands mobile video facade missing");
  await mobile.screenshot({ path: path.join(artifactDir, "northern-media-mobile.png"), fullPage: true });

  const changedRoutes = ["/trello/", "/spells/", "/drops/", "/dungeons/", "/dungeons/winter-outpost/", "/dungeons/northern-lands/", "/spells/phantom-flames/", "/spells/infernal-orbs/"];
  for (const route of changedRoutes) {
    for (const [surface, label] of [[page, "desktop"], [mobile, "mobile"]]) {
      await surface.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      await assertNoOverflow(surface, `${route}-${label}`);
      assert(await surface.locator("iframe").count() === 0, `eager iframe on ${route}`);
      const expectedIndex = indexableRoutes.includes(route);
      const directive = await surface.locator('meta[name="robots"]').getAttribute("content");
      assert(directive === (expectedIndex ? "index, follow" : "noindex, follow"), { route, directive });
      for (const table of await surface.locator(".editorial-section table").all()) {
        const columns = await table.locator("thead th").count();
        for (const row of await table.locator("tbody tr").all()) {
          assert(await row.locator("th, td").count() === columns, `table columns do not match ${route}`);
        }
      }
      await surface.screenshot({ path: path.join(artifactDir, `${route.split("/").filter(Boolean).join("-")}-${label}.png`), fullPage: true });
    }
  }

  // Check facade activation without depending on third-party player availability.
  await page.route("https://www.youtube-nocookie.com/**", route => route.fulfill({ status: 200, contentType: "text/html", body: "<title>QA player stub</title>" }));
  await page.goto(`${baseUrl}/spells/phantom-flames/`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /play Phantom Flames explanation/i }).click();
  const player = page.getByTitle("Phantom Flames explanation");
  assert((await player.getAttribute("src"))?.includes("start=283"), "ability video lost its timestamp");
  await page.keyboard.press("Escape");
  assert(await page.locator("iframe").count() === 0, "video keeps running after close");
  assert(await page.getByRole("button", { name: /play Phantom Flames explanation/i }).evaluate(element => element === document.activeElement), "video focus did not return to trigger");

  await page.goto(`${baseUrl}/spells/`, { waitUntil: "networkidle" });
  const abilitySearch = page.getByRole("searchbox", { name: "Find an ability" });
  await abilitySearch.fill("Phantom");
  assert(await page.getByText("1 of 10 abilities", { exact: true }).isVisible(), "ability name filtering failed");
  await page.getByRole("combobox", { name: "Use case", exact: true }).selectOption("Recovery");
  assert(await page.getByText("No abilities match these filters.", { exact: true }).isVisible(), "combined filters failed");
  await page.getByRole("button", { name: "Clear filters", exact: true }).click();
  assert(await abilitySearch.inputValue() === "", "clear filters left query behind");
  assert(await page.getByText("10 of 10 abilities", { exact: true }).isVisible(), "clear filters did not restore list");

  await mobile.goto(`${baseUrl}/spells/`, { waitUntil: "networkidle" });
  await mobile.getByRole("searchbox", { name: "Find an ability" }).fill("Phantom");
  const card = mobile.locator(".lookup-card").filter({ hasText: "Phantom Flames" });
  assert(await card.isVisible(), "mobile ability card is missing");
  const cardBox = await card.boundingBox();
  assert(cardBox && cardBox.x >= 0 && cardBox.x + cardBox.width <= 375, "mobile card exceeds viewport");
  await card.getByText("Use & video", { exact: true }).click();
  assert(await card.getByText(/demonstrates reach against dummies/).isVisible(), "mobile card did not expand");
  await mobile.screenshot({ path: path.join(artifactDir, "mvp-spells-mobile-expanded.png"), fullPage: true });

  await page.goto(`${baseUrl}/dungeons/northern-lands/`, { waitUntil: "networkidle" });
  await page.getByRole("navigation", { name: "Where are you stuck?" }).getByRole("link", { name: "Bob", exact: true }).click();
  assert(new URL(page.url()).hash === "#bob-orbs", "boss shortcut missed its section");
  const sourceTrigger = page.getByRole("link", { name: /Bob's explanation/ });
  await sourceTrigger.scrollIntoViewIfNeeded();
  const sourceScroll = await page.evaluate(() => scrollY);
  await sourceTrigger.click();
  assert((await page.getByRole("dialog").locator("iframe").getAttribute("src"))?.includes("start=409"), "source link lost its time");
  await page.getByRole("button", { name: "Close video", exact: true }).click();
  assert(Math.abs((await page.evaluate(() => scrollY)) - sourceScroll) < 3, "video close lost reading position");
  await mobile.goto(`${baseUrl}/dungeons/northern-lands/`, { waitUntil: "networkidle" });
  await mobile.getByRole("navigation", { name: "Where are you stuck?" }).getByRole("link", { name: "Odin", exact: true }).click();
  await mobile.waitForFunction(() => { const box = document.getElementById("route-odin")?.getBoundingClientRect(); return box && box.y >= 60 && box.y < 400; }, null, { timeout: 5000 });
  const odin = await mobile.locator("#route-odin").boundingBox();
  assert(odin && odin.y >= 60 && odin.y < 400, "mobile Odin shortcut did not reveal its advice");
  await assertNoOverflow(mobile, "mobile-odin-route");

  assert(consoleErrors.length === 0, { consoleErrors, badResponses });
  assert(pageErrors.length === 0, { pageErrors });
  process.stdout.write(`PASS routes=${routes.length} screenshots=9 media=lazy search=ok redirects=${redirects.size} noindex=ok desktop-nav=ok tablet-nav=ok mobile-nav=ok\n`);
} finally {
  await browser.close();
}
