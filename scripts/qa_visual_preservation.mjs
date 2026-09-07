import fs from "node:fs";
import assert from "node:assert/strict";
import { chromium } from "playwright";

const base = process.env.TEST_BASE ?? "http://localhost:3101";
const output = "artifacts/visual-v11";
fs.mkdirSync(output, { recursive: true });
const baseline = JSON.parse(fs.readFileSync("scripts/fixtures/visual-v11-baseline.json", "utf8"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
const report = [];
page.on("pageerror", error => errors.push(String(error)));
const imageKey = src => src?.startsWith("/_next/image") ? new URL(src, base).searchParams.get("url") : src;
function containsAll(before, after, label) {
  const copy = [...after];
  for (const item of before) {
    const index = copy.indexOf(item);
    assert(index >= 0, `${label}: missing ${item}`);
    copy.splice(index, 1);
  }
}
try {
  for (const before of baseline) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(`${base}${before.path}`);
    assert.equal(response.status(), 200, before.path);
    const after = await page.evaluate(() => {
      const norm = value => value.replace(/\s+/g, " ").trim();
      return {
        title: document.title,
        h1: [...document.querySelectorAll("h1")].map(e => norm(e.textContent)),
        description: document.querySelector("meta[name=description]")?.content,
        canonical: document.querySelector("link[rel=canonical]")?.href,
        robots: document.querySelector("meta[name=robots]")?.content,
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => JSON.parse(e.textContent)),
        headings: [...document.querySelectorAll("main h2,main h3")].map(e => norm(e.textContent)),
        paragraphs: [...document.querySelectorAll("main p")].map(e => norm(e.textContent)),
        links: [...document.querySelectorAll("main a")].map(e => [norm(e.textContent), e.getAttribute("href")]),
        header: document.querySelector("header.site-header")?.innerHTML,
        images: [...document.querySelectorAll("main img")].map(e => ({ src: e.getAttribute("src"), alt: e.alt }))
      };
    });
    for (const key of ["title", "h1", "description", "canonical", "robots", "jsonld", "header"]) {
      assert.deepEqual(after[key], before[key], `${before.path}: ${key}`);
    }
    containsAll(before.headings, after.headings, `${before.path}: headings`);
    containsAll(before.paragraphs, after.paragraphs, `${before.path}: paragraphs`);
    for (const [text, href] of before.links) {
      assert(after.links.some(([newText, newHref]) => newHref === href && newText.includes(text)), `${before.path}: link ${text}`);
    }
    for (const image of before.images) {
      assert(after.images.some(candidate => imageKey(candidate.src) === imageKey(image.src) && candidate.alt === image.alt), `${before.path}: existing image`);
    }
    for (const width of [1440, 390, 375]) {
      await page.setViewportSize({ width, height: 1000 });
      const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
      assert(scroll <= width, `${before.path}: page overflow at ${width}: ${scroll}`);
    }
    report.push({ path: before.path, preserved: true, viewports: [1440, 390, 375] });
  }
  await page.goto(base);
  for (const width of [1440, 390, 375]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    const boxes = await page.locator(".hero-text,.hero-artwork,.home-wiki-search").evaluateAll(es => es.map(e => {
      const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, bottom: r.bottom };
    }));
    assert(boxes[2].y >= Math.max(boxes[0].bottom, boxes[1].bottom), "Search must remain below hero columns");
    assert(width > 880 ? boxes[1].x >= boxes[0].x + boxes[0].width : boxes[1].y >= boxes[0].bottom, "Hero overlap");
    for (const selector of [".demand-card>span", ".dungeon-card-copy"]) {
      const widths = await page.locator(selector).evaluateAll(es => es.map(e => e.getBoundingClientRect().width));
      assert(widths.every(w => w >= 150), `${selector}: narrow text column at ${width}: ${widths}`);
    }
    await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: true });
    await page.locator(".home-hero").screenshot({ path: `${output}/hero-${width}.png` });
    await page.locator(".dungeon-grid").screenshot({ path: `${output}/dungeons-${width}.png` });
  }
  const images = await page.locator("main img").evaluateAll(es => es.map(e => ({ src: e.getAttribute("src"), alt: e.alt, loaded: e.complete && e.naturalWidth > 0 })));
  assert.equal(new Set(images.map(i => imageKey(i.src))).size, images.length, "Duplicate homepage image");
  assert(images.every(i => i.alt && i.loaded), "Homepage image missing alt or failed load");
  assert.equal(await page.locator(".hero-artwork img").getAttribute("fetchpriority"), "high");
  assert.equal(await page.locator(".hero-artwork img").getAttribute("loading"), "eager");
  for (const image of await page.locator(".dungeon-artwork img,.wide-game-artwork img").all()) {
    assert.equal(await image.getAttribute("loading"), "lazy");
  }
  assert.equal(await page.locator(".guide-nav").count(), 0, "Rejected second navigation returned");
  await page.getByRole("searchbox", { name: "Search the Dungeon Quest Reborn wiki" }).fill("Phantom Flames");
  await page.locator(".home-wiki-search .search-result").first().waitFor();
  assert.equal(await page.locator("iframe").count(), 0, "Eager video iframe");
  await page.route("https://www.youtube-nocookie.com/**", route => route.fulfill({ contentType: "text/html", body: "<title>QA player stub</title>" }));
  const play = page.getByRole("button", { name: "Play featured Northern Lands guide" });
  await play.click();
  const frame = page.locator(".featured-inline-player iframe");
  assert((await frame.getAttribute("src")).includes("3pHhZpt-b-U?rel=0&start=94"));
  assert.equal(await page.getByRole("dialog").count(), 0, "Featured player must remain inline");
  await page.getByRole("button", { name: "Play Bob the Frost Giant at 6:49" }).click();
  assert((await frame.getAttribute("src")).includes("start=409"));
  await page.goto(`${base}/spells/`);
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert((await page.locator('#ability-list thead th').nth(2).boundingBox()).width >= 290, "Skill description column is too narrow");
  await page.locator('#ability-list .table-scroll').evaluate(e => { e.scrollLeft = e.scrollWidth; });
  const sourceHeader = await page.locator('#ability-list thead th').last().boundingBox();
  const tableContainer = await page.locator('#ability-list .table-scroll').boundingBox();
  assert(sourceHeader.x + sourceHeader.width <= tableContainer.x + tableContainer.width + 2, "Final table column is unreachable");
  await page.getByRole("combobox", { name: "Class report", exact: true }).selectOption("Mage (recommended)");
  assert(await page.getByText("1 of 12 abilities", { exact: true }).isVisible());
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert(await page.getByText("12 of 12 abilities", { exact: true }).isVisible());
  await page.goto(`${base}/drops/`);
  await page.getByRole("combobox", { name: "Reported location", exact: true }).selectOption("Pirate Island");
  assert(await page.getByText("2 of 4 items", { exact: true }).isVisible());
  assert.deepEqual(errors, []);
  fs.writeFileSync(`${output}/report.json`, JSON.stringify({ report, images, errors, videoTest: "stubbed inline player; click, chapter URLs and no dialog" }, null, 2));
  console.log(`PASS ${report.length} pages: content/SEO/header/media preserved, 3 viewports, Hero/card geometry, search/filters/video`);
} finally {
  await browser.close();
}
