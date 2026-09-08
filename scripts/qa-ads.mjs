import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { chromium } from "playwright";

const base = process.env.TEST_BASE || "http://127.0.0.1:3419";
const live = process.argv.includes("--live");
const units = [
  { id: "advertising-31241049", type: "Popunder", parent: "HEAD", src: "https://pl31241049.profitableratecpmnetwork.com/61/33/40/6133405e6cca9562896c43fefd397e43.js" },
  { id: "advertising-31241050", type: "Social Bar", parent: "BODY", src: "https://pl31241050.profitableratecpmnetwork.com/04/e1/ed/04e1edad84c4bfa010a3d9f908fb5d32.js" }
];
const directory = "qa-artifacts/ads";
await fs.mkdir(directory, { recursive: true });
const report = { mode: live ? "live" : "controlled fixtures (not real ads)", base, checks: [] };
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [1440, 390]) {
    for (const blocked of live ? [false] : [false, true]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const requests = [];
      const errors = [];
      const responses = [];
      const failures = [];
      const responseTasks = [];
      const isAd = url => units.some(unit => unit.src === url);
      if (!live) {
        for (const unit of units) {
          await context.route(unit.src, route => blocked
            ? route.abort("blockedbyclient")
            : route.fulfill({ contentType: "application/javascript", body: `window.__adQaLoads = (window.__adQaLoads || 0) + 1;` }));
        }
      }
      page.on("request", request => { if (isAd(request.url())) requests.push(request.url()); });
      page.on("requestfailed", request => { if (isAd(request.url())) failures.push({ url: request.url(), error: request.failure()?.errorText }); });
      page.on("pageerror", error => errors.push(error.message));
      page.on("response", response => {
        if (isAd(response.url())) responseTasks.push((async () => {
          let bytes = null;
          try { bytes = (await response.body()).length; } catch { /* Recorded as unreadable, never as successful delivery. */ }
          responses.push({ url: response.url(), status: response.status(), bytes });
        })());
      });
      try {
        assert.equal((await page.goto(base, { waitUntil: "domcontentloaded" })).status(), 200);
        for (const unit of units) {
          const script = page.locator(`#${unit.id}`);
          await script.waitFor({ state: "attached" });
          assert.equal(await script.count(), 1);
          assert.equal(await script.getAttribute("src"), unit.src);
          assert.equal(await script.evaluate(element => element.parentElement.tagName), unit.parent, `${unit.type} placement`);
        }
        assert.equal(await page.locator("h1").count(), 1);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "horizontal overflow");
        if (!live && !blocked) await page.waitForFunction(() => window.__adQaLoads === 2);
        if (live) {
          // Wait for actual network completion, not merely a mounted <script>.
          // A provider timeout remains unconfirmed delivery in the report.
          await Promise.all(units.map(unit => page.waitForFunction(
            src => performance.getEntriesByName(src).some(entry => entry.responseEnd > 0),
            unit.src,
            { timeout: 20000 }
          ).catch(() => {})));
        }
        await page.screenshot({ path: `${directory}/${live ? "live" : blocked ? "blocked" : "fixture"}-${width}.png` });
        // A normal first-party link must work even when the provider is blocked.
        await page.locator('footer a[href="/privacy/"]').click();
        await page.waitForURL("**/privacy/");
        await page.getByRole("heading", { name: "Third-Party Advertising", exact: true }).waitFor();
        assert.match(await page.locator('meta[name="robots"]').getAttribute("content"), /noindex/);
        assert.equal(requests.length, 2, "navigation must not request ads again");
        assert.equal(errors.length, 0, "uncaught script errors");
        await Promise.all(responseTasks);
        if (!live && !blocked) assert.equal(await page.evaluate(() => window.__adQaLoads), 2);
        if (!live && blocked) assert.equal(failures.length, 2);
        const delivered = responses.length === 2 && responses.every(response => response.status === 200 && response.bytes > 0);
        report.checks.push({ width, blocked, integration: "passed", requests, responses, failures, errors, delivery: live ? (delivered ? "non-empty scripts received; visual ad fill still requires inspection" : "not confirmed: empty, failed or unreadable response") : "not tested: controlled fixture" });
      } finally {
        await context.close();
      }
    }
  }
  if (live && report.checks.some(check => check.delivery.startsWith("not confirmed"))) process.exitCode = 2;
} catch (error) {
  report.error = String(error);
  process.exitCode = 1;
} finally {
  await browser.close();
  await fs.writeFile(`${directory}/${live ? "live" : "integration"}-report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
