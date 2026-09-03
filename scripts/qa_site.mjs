import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.TEST_BASE || "http://127.0.0.1:3000";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), "src", "content", "publishing-manifest.json"), "utf8"));
const routes = manifest.pages.filter((page) => page.publicationStatus === "published").map((page) => page.path);
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
  assert(await page.getByRole("navigation", { name: "Guide sections" }).count() === 1, "guide silo navigation missing");
  assert(await page.getByRole("link", { name: "Weapons", exact: true }).count() === 1, "database navigation missing");
  assert(await page.getByRole("link", { name: "Mage build", exact: true }).count() === 1, "build navigation missing");
  await page.screenshot({ path: path.join(artifactDir, "home-desktop.png"), fullPage: true });
  await page.keyboard.press("Control+K");
  const search = page.getByPlaceholder("Try “where does an item drop”");
  await search.waitFor();
  await search.fill("codes");
  await page.getByRole("link", { name: /Codes/ }).waitFor();
  await page.keyboard.press("Escape");

  await page.goto(`${baseUrl}/codes/`, { waitUntil: "networkidle" });
  assert((await page.locator("body").innerText()).includes("No active code is published"), "codes empty state missing");
  assert(await page.getByRole("button", { name: /Copy/i }).count() === 0, "unexpected code copy button");

  await page.goto(`${baseUrl}/dungeons/northern-lands/`, { waitUntil: "networkidle" });
  const northernImage = page.getByRole("img", { name: /party facing a horned arena boss/i });
  await northernImage.waitFor();
  assert(await northernImage.evaluate((image) => image.complete && image.naturalWidth > 0), "Northern Lands official artwork did not load");
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

  const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "home-mobile");
  const navToggle = mobile.getByRole("button", { name: "Open navigation" });
  await navToggle.click();
  await mobile.locator("#mobile-navigation").getByRole("link", { name: "Codes", exact: true }).click();
  await mobile.waitForURL(`${baseUrl}/codes/`);
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

  assert(consoleErrors.length === 0, { consoleErrors, badResponses });
  assert(pageErrors.length === 0, { pageErrors });
  process.stdout.write(`PASS routes=${routes.length} screenshots=6 media=lazy search=ok redirects=${redirects.size} noindex=ok mobile-nav=ok\n`);
} finally {
  await browser.close();
}
