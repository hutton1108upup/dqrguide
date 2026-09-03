import { failOrPass, normalizePath, parseManifestArg, readManifest } from "./content-manifest.mjs";

const args = process.argv.slice(2);
const manifest = readManifest(parseManifestArg(args));
const offline = args.includes("--offline");
const errors = [];
const knownPaths = new Set(["/", ...manifest.pages.map((page) => normalizePath(page.path))]);

for (const page of manifest.pages) {
  for (const relatedPath of page.relatedPaths ?? []) {
    if (!knownPaths.has(normalizePath(relatedPath))) errors.push(`${page.path}: missing internal link ${relatedPath}`);
  }
}

async function checkExternalLinks() {
  if (offline) return;
  const urls = [...new Set(manifest.pages.flatMap((page) => page.sourceURLs ?? []))];
  for (const sourceURL of urls) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      let response = await fetch(sourceURL, { method: "HEAD", redirect: "manual", signal: controller.signal });
      if (response.status >= 400 || [405, 501].includes(response.status)) response = await fetch(sourceURL, { method: "GET", redirect: "manual", signal: controller.signal });
      if (response.status < 200 || response.status >= 400) errors.push(`external link ${sourceURL}: HTTP ${response.status}`);
    } catch (error) {
      errors.push(`external link ${sourceURL}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      clearTimeout(timer);
    }
  }
}

await checkExternalLinks();
failOrPass("check-links", errors, `offline=${offline}`);
