import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:3000";
const routes = [
  "/", "/differences/", "/gamepasses/", "/spells/", "/spell-tier-list/",
  "/trading/", "/dungeons/", "/dungeons/winter-outpost/",
  "/dungeons/northern-lands/", "/drops/", "/codes/", "/trello/",
  "/discord/", "/tier-list/", "/updates/"
];
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
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(String(error)));

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    assert(response && response.status() === 200, { route, status: response?.status() });
    assert(await page.locator("h1").count() === 1, { route, h1: await page.locator("h1").count() });
  }

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  assert(canonical === "https://dqr.gg/", `home canonical=${canonical}`);
  await page.screenshot({ path: path.join(artifactDir, "home-desktop.png"), fullPage: true });
  await page.keyboard.press("Control+K");
  const search = page.getByPlaceholder("Try “where does an item drop”");
  await search.waitFor();
  await search.fill("winter");
  await page.getByRole("link", { name: /Winter Outpost Guide/ }).waitFor();
  await page.keyboard.press("Escape");

  await page.goto(`${baseUrl}/codes/`, { waitUntil: "networkidle" });
  assert((await page.locator("body").innerText()).includes("No active code is published"), "codes empty state missing");
  assert(await page.getByRole("button", { name: /Copy/i }).count() === 0, "unexpected code copy button");

  await page.goto(`${baseUrl}/tier-list/`, { waitUntil: "networkidle" });
  const robots = (await page.locator('meta[name="robots"]').getAttribute("content")) || "";
  assert(robots.toLowerCase().includes("noindex"), `tier-list robots=${robots}`);

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
  await mobile.getByRole("link", { name: "Dungeons" }).click();
  await mobile.waitForURL(`${baseUrl}/dungeons/`);
  assert(await mobile.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded") === "false", "mobile menu remained open");
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  await mobile.screenshot({ path: path.join(artifactDir, "home-mobile.png"), fullPage: true });
  await mobile.goto(`${baseUrl}/dungeons/northern-lands/`, { waitUntil: "networkidle" });
  await assertNoOverflow(mobile, "northern-mobile");
  await mobile.screenshot({ path: path.join(artifactDir, "northern-mobile.png"), fullPage: true });

  assert(consoleErrors.length === 0, { consoleErrors });
  assert(pageErrors.length === 0, { pageErrors });
  process.stdout.write(`PASS routes=${routes.length} screenshots=3 search=ok redirects=${redirects.size} noindex=ok mobile-nav=ok\n`);
} finally {
  await browser.close();
}
