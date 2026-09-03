import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getFreshnessStatus } from "../src/content/freshness.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "src", "content", "publishing-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function singaporeDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Singapore",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function parseArgs(args) {
  const options = { asOf: singaporeDate(), outputDir: path.join(root, "artifacts", "refresh-audit"), sitemapFile: process.env.REFRESH_AUDIT_SITEMAP_FILE || null };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--as-of") options.asOf = args[++index];
    else if (arg === "--output-dir") options.outputDir = path.resolve(args[++index]);
    else if (arg === "--sitemap-file") options.sitemapFile = path.resolve(args[++index]);
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.asOf)) throw new Error(`--as-of must be YYYY-MM-DD: ${options.asOf}`);
  return options;
}

function priorityFor(state) {
  if (["overdue", "version_gap", "not_collected", "fetch_failed"].includes(state)) return "P0";
  if (state === "due_soon") return "P1";
  return "-";
}

function readSitemapPaths(file) {
  if (!file || !fs.existsSync(file)) return null;
  const xml = fs.readFileSync(file, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname.replace(/\/$/, "") || "/");
}

function buildSitemapGaps(pages, sitemapPaths) {
  const expected = pages.filter((page) => page.publicationStatus === "published" && page.indexable).map((page) => page.path.replace(/\/$/, "") || "/");
  if (!sitemapPaths) return [];
  const actual = new Set(sitemapPaths);
  return [
    ...expected.filter((pathName) => !actual.has(pathName)).map((pathName) => ({ type: "missing", path: pathName })),
    ...sitemapPaths.filter((pathName) => !expected.includes(pathName)).map((pathName) => ({ type: "unexpected", path: pathName }))
  ];
}

function buildReport(options) {
  const pages = manifest.pages.map((page) => {
    const freshness = getFreshnessStatus(page, options.asOf);
    return {
      path: page.path,
      publicationStatus: page.publicationStatus,
      indexable: page.indexable,
      lastVerified: page.lastVerified,
      nextScheduledCheck: page.nextScheduledCheck,
      state: freshness.state,
      reason: freshness.reason,
      priority: priorityFor(freshness.state)
    };
  });
  const sitemapPaths = readSitemapPaths(options.sitemapFile);
  const summary = pages.reduce((counts, page) => {
    counts[page.state] = (counts[page.state] ?? 0) + 1;
    if (page.priority !== "-") counts[page.priority] = (counts[page.priority] ?? 0) + 1;
    return counts;
  }, {});

  return {
    generatedAt: new Date().toISOString(),
    asOf: options.asOf,
    currentVersion: manifest.currentVersion,
    pages,
    sitemapChecked: Boolean(sitemapPaths),
    sitemapGaps: buildSitemapGaps(manifest.pages, sitemapPaths),
    summary
  };
}

function renderMarkdown(report) {
  const rows = report.pages.map((page) => `| ${page.path} | ${page.publicationStatus} | ${page.lastVerified ?? "-"} | ${page.nextScheduledCheck ?? "-"} | ${page.state} | ${page.priority} | ${page.reason} |`);
  const gaps = report.sitemapGaps.length
    ? report.sitemapGaps.map((gap) => `- ${gap.type}: ${gap.path}`).join("\n")
    : report.sitemapChecked ? "- None" : "- Not checked (pass --sitemap-file after build)";
  return [
    "# DQR.GG Refresh Audit",
    "",
    `- As of (Singapore): ${report.asOf}`,
    `- Current version: ${report.currentVersion}`,
    `- Sitemap checked: ${report.sitemapChecked ? "yes" : "no"}`,
    "",
    "| Page | Publication | Last verified | Next check | State | Priority | Reason |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...rows,
    "",
    "## Sitemap gaps",
    "",
    gaps,
    "",
    "## Summary",
    "",
    "```json",
    JSON.stringify(report.summary, null, 2),
    "```",
    ""
  ].join("\n");
}

function writeReport(file, content) {
  const temporaryFile = `${file}.tmp`;
  fs.writeFileSync(temporaryFile, content, "utf8");
  if (fs.existsSync(file)) fs.rmSync(file);
  fs.renameSync(temporaryFile, file);
}

const options = parseArgs(process.argv.slice(2));
const report = buildReport(options);
fs.mkdirSync(options.outputDir, { recursive: true });
writeReport(path.join(options.outputDir, "refresh-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
writeReport(path.join(options.outputDir, "refresh-audit.md"), renderMarkdown(report));
process.stdout.write(`PASS refresh-audit pages=${report.pages.length} p0=${report.summary.P0 ?? 0} sitemapGaps=${report.sitemapGaps.length}\n`);
