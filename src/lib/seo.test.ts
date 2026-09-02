import { describe, expect, it } from "vitest";

import sitemap from "../../app/sitemap";
import { metadata as homeMetadata } from "../../app/page";
import { buildPageSchema } from "@/components/content-page";
import { getPageByPath } from "@/content/routes";
import { absoluteUrl, createPageMetadata } from "./seo";

describe("technical SEO", () => {
  it("builds a self-referencing canonical and noindex directive", () => {
    const page = getPageByPath("/tier-list/")!;
    const metadata = createPageMetadata(page);

    expect(metadata.alternates?.canonical).toBe(absoluteUrl("/tier-list/"));
    expect(metadata.robots).toMatchObject({ index: false, follow: true });
  });

  it("only emits indexable core pages in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl("/"));
    expect(urls).toContain(absoluteUrl("/codes/"));
    expect(urls).not.toContain(absoluteUrl("/tier-list/"));
    expect(urls.some((url) => url.includes("enhanced-inner-rage"))).toBe(false);
  });

  it("sets a canonical for the homepage without a fake SearchAction", () => {
    expect(homeMetadata.alternates?.canonical).toBe(absoluteUrl("/"));
    expect(JSON.stringify(homeMetadata)).not.toContain("SearchAction");
  });

  it("adds an ItemList to hub schema using visible related links", () => {
    const schema = buildPageSchema(getPageByPath("/dungeons/")!);
    expect(schema.some((item) => item["@type"] === "ItemList")).toBe(true);
  });
});
