import { failOrPass, parseManifestArg, readManifest } from "./content-manifest.mjs";

const manifest = readManifest(parseManifestArg(process.argv.slice(2)));
const errors = [];
const statuses = new Set(["confirmed", "reported", "not_collected", "fetch_failed"]);
const confidences = new Set(["High", "Medium", "Low"]);

for (const page of manifest.pages) {
  const sourceURLs = page.sourceURLs ?? [];
  if (page.publicationStatus === "published" && page.indexable && sourceURLs.length === 0) errors.push(`${page.path}: published indexable page has no source URL`);
  for (const sourceURL of sourceURLs) {
    try {
      const url = new URL(sourceURL);
      if (url.protocol !== "https:") errors.push(`${page.path}: source URL must use HTTPS: ${sourceURL}`);
    } catch {
      errors.push(`${page.path}: invalid source URL: ${sourceURL}`);
    }
  }
  for (const [index, claim] of (page.claims ?? []).entries()) {
    const label = `${page.path} claim ${index + 1}`;
    if (!statuses.has(claim.claimStatus)) errors.push(`${label}: invalid claimStatus`);
    if (!confidences.has(claim.confidence)) errors.push(`${label}: invalid confidence`);
    if (!Object.prototype.hasOwnProperty.call(claim, "verifiedForVersion")) errors.push(`${label}: verifiedForVersion is required`);
    if (!claim.sourceURL) errors.push(`${label}: sourceURL is required`);
    if (!claim.evidenceNote?.trim()) errors.push(`${label}: evidenceNote is required`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(claim.lastChecked ?? "")) errors.push(`${label}: lastChecked must be YYYY-MM-DD`);
  }
}

failOrPass("check-sources", errors, `pages=${manifest.pages.length}`);
