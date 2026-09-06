import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = process.env.TEST_BASE ?? "http://localhost:3100";
const manifest = JSON.parse(fs.readFileSync("src/content/publishing-manifest.json", "utf8"));
const routes = manifest.pages.filter(page => page.dateModified === "2026-09-06" && page.publicationStatus === "published");
const output = path.resolve("qa-artifacts/expansion-sep6");
fs.mkdirSync(output, { recursive: true });
const assert = (condition, message) => { if (!condition) throw new Error(JSON.stringify(message)); };
const browser = await chromium.launch({ headless: true });
const report = [];
const errors = [];
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(String(error)));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  const sitemap = await (await context.request.get(`${base}/sitemap.xml`)).text();
  const internalLinks = new Set();
  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(`${base}${route.path}`, { waitUntil: "networkidle" });
    assert(response?.status() === 200, { path: route.path, status: response?.status() });
    assert(await page.locator("h1").count() === 1, { path: route.path, error: "h1" });
    const robots = await page.locator('meta[name="robots"]').getAttribute("content");
    assert(robots === (route.indexable ? "index, follow" : "noindex, follow"), { path: route.path, robots });
    assert(sitemap.includes(`https://dungeonquestrebornguide.wiki${route.path}</loc>`) === route.indexable, { path: route.path, error: "sitemap policy" });
    assert(await page.locator("iframe").count() === 0, { path: route.path, error: "eager iframe" });
    for (const href of await page.locator('main a[href^="/"]').evaluateAll(links => links.map(link => link.getAttribute("href")))) internalLinks.add(href);
    for (const size of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
      await page.setViewportSize(size);
      const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert(dimensions.scroll <= dimensions.width, { path: route.path, dimensions });
      await page.screenshot({ path: path.join(output, `${route.path.split("/").filter(Boolean).join("-") || "home"}-${size.width}.png`), fullPage: true });
    }
    report.push({ path: route.path, status: 200, robots });
  }
  for (const href of internalLinks) {
    const response = await context.request.get(new URL(href, base).toString());
    assert(response.status() === 200, { href, status: response.status() });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${base}/spells/`, { waitUntil: "networkidle" });
  await page.getByRole("searchbox", { name: "Find an ability" }).fill("Fire Bomb");
  assert(await page.getByText("1 of 12 abilities", { exact: true }).isVisible(), "new skill not found");
  await page.getByRole("table", { name: "Abilities by use case", exact: true }).getByRole("link", { name: "Fire Bomb", exact: true }).click();
  await page.waitForURL(`${base}/spells/fire-bomb/`);
  assert(await page.getByRole("link", { name: "Watch a demo", exact: true }).count() === 0, "unverified demo promise");
  await page.goto(`${base}/dungeons/northern-lands/odin-reincarnation/`, { waitUntil: "networkidle" });
  assert(await page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link").count() === 3, "nested breadcrumbs lost ancestor");
  await page.route("https://www.youtube-nocookie.com/**", route => route.fulfill({ contentType: "text/html", body: "<title>QA player stub</title>" }));
  await page.getByRole("button", { name: "Play Odin Reincarnation entry and fight", exact: true }).click();
  assert((await page.getByRole("dialog").locator("iframe").getAttribute("src"))?.includes("zNvSBG2Vp98"), "wrong bonus boss video");
  await page.keyboard.press("Escape");
  assert(await page.locator("iframe").count() === 0, "player remained mounted");
  assert(errors.length === 0, { errors });
  fs.writeFileSync(path.join(output, "report.json"), JSON.stringify({ pages: report, checkedInternalLinks: internalLinks.size, errors, interaction: "skill lookup, nested breadcrumbs, lazy bonus-boss player and Escape passed; video response stubbed" }, null, 2));
  console.log(`PASS expansion: pages=${report.length}, viewports=1440/375, links=${internalLinks.size}, robots/sitemap, lookup, video, console`);
} finally {
  await browser.close();
}
