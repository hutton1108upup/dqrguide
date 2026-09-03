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

  it("uses the fixed-size PNG for social previews", () => {
    const metadata = createPageMetadata(getPageByPath("/")!);
    const images = metadata.openGraph?.images;
    const openGraphImage = Array.isArray(images) ? images[0] : images;
    expect(openGraphImage).toMatchObject({ url: expect.stringContaining("/og.png"), width: 1200, height: 630 });
    expect(metadata.twitter?.images).toEqual([expect.stringContaining("/og.png")]);
  });

  it("keeps trust pages accessible but out of the content sitemap", () => {
    for (const path of ["/privacy/", "/contact/", "/source-policy/"]) {
      expect(getPageByPath(path)?.publicationStatus).toBe("published");
      expect(getPageByPath(path)?.indexable).toBe(false);
    }
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("/privacy"))).toBe(false);
    expect(urls.some((url) => url.includes("/contact"))).toBe(false);
    expect(urls.some((url) => url.includes("/source-policy"))).toBe(false);
  });
});
