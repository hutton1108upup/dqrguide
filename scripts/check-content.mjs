import { failOrPass, parseManifestArg, readManifest } from "./content-manifest.mjs";

const manifest = readManifest(parseManifestArg(process.argv.slice(2)));
const errors = [];
const validStatuses = new Set(["draft", "review", "published"]);
const paths = manifest.pages.map((page) => page.path);

if (new Set(paths).size !== paths.length) errors.push("page paths must be unique");
for (const page of manifest.pages) {
  if (!page.path || !validStatuses.has(page.publicationStatus)) errors.push(`${page.path || "<missing>"}: invalid publication status`);
  if (page.publicationStatus !== "published" && page.indexable) errors.push(`${page.path}: review/draft page cannot be indexable`);
  if (page.publicationStatus === "published" && page.indexable && !page.quickAnswer?.trim()) errors.push(`${page.path}: quickAnswer is required for published indexable content`);
  if (page.sectionCount !== undefined && page.sectionCount < 3) errors.push(`${page.path}: at least 3 sections are required`);
  if (page.faqCount !== undefined && page.faqCount < 2) errors.push(`${page.path}: at least 2 FAQ items are required`);
  if (page.relatedCount !== undefined && page.relatedCount < 2) errors.push(`${page.path}: at least 2 related links are required`);
}
if (manifest.entityDraftCount !== undefined && manifest.entityDraftCount !== 8) errors.push("the first entity batch must contain exactly 8 drafts");

failOrPass("check-content", errors, `pages=${manifest.pages.length}`);
