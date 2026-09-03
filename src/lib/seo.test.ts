import { describe, expect, it } from "vitest";

import sitemap from "../../app/sitemap";
import { metadata as homeMetadata } from "../../app/page";
import robots from "../../app/robots";
import { buildPageSchema } from "@/components/content-page";
import { getPageByPath } from "@/content/routes";
import { absoluteUrl, createPageMetadata, getOpenGraphImagePath } from "./seo";

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

  it("emits a single-slash sitemap URL from robots", () => {
    expect(robots().sitemap).toBe(absoluteUrl("/sitemap.xml"));
    expect(robots().sitemap).not.toContain("//sitemap");
  });

  it("sets a canonical for the homepage without a fake SearchAction", () => {
    expect(homeMetadata.alternates?.canonical).toBe(absoluteUrl("/"));
    expect(JSON.stringify(homeMetadata)).not.toContain("SearchAction");
  });

  it("uses real direct child pages for hub ItemLists", () => {
    const schema = buildPageSchema(getPageByPath("/dungeons/")!);
    const itemList = schema.find((item) => item["@type"] === "ItemList")!;
    const items = itemList.itemListElement as Array<{ url: string }>;

    expect(items.map((item) => item.url)).toEqual([
      absoluteUrl("/dungeons/winter-outpost/"),
      absoluteUrl("/dungeons/northern-lands/")
    ]);

    const spellsSchema = buildPageSchema(getPageByPath("/spells/")!);
    expect(spellsSchema.some((item) => item["@type"] === "ItemList")).toBe(false);
  });

  it("emits the full route hierarchy for nested-page breadcrumbs", () => {
    const schema = buildPageSchema(getPageByPath("/dungeons/northern-lands/")!);
    const breadcrumbs = schema.find((item) => item["@type"] === "BreadcrumbList")!;
    const items = breadcrumbs.itemListElement as Array<{ position: number; name: string; item: string }>;

    expect(items).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Dungeon Quest Reborn Dungeon Progression", item: absoluteUrl("/dungeons/") },
      { "@type": "ListItem", position: 3, name: "Dungeon Quest Reborn Northern Lands", item: absoluteUrl("/dungeons/northern-lands/") }
    ]);
  });

  it("uses route-specific fixed-size social previews", () => {
    const home = createPageMetadata(getPageByPath("/")!);
    const spells = createPageMetadata(getPageByPath("/spells/")!);
    const images = home.openGraph?.images;
    const openGraphImage = Array.isArray(images) ? images[0] : images;
    const spellsImages = spells.openGraph?.images;
    const spellsOpenGraphImage = Array.isArray(spellsImages) ? spellsImages[0] : spellsImages;

    expect(openGraphImage).toMatchObject({ url: absoluteUrl("/og/?path=%2F"), width: 1200, height: 630 });
    expect(spellsOpenGraphImage).toMatchObject({ url: absoluteUrl("/og/?path=%2Fspells%2F"), width: 1200, height: 630 });
    expect(openGraphImage).not.toEqual(spellsOpenGraphImage);
    expect(home.twitter?.images).toEqual([absoluteUrl("/og/?path=%2F")]);
    expect(spells.twitter?.images).toEqual([absoluteUrl("/og/?path=%2Fspells%2F")]);
  });

  it("keeps the image URL mapper stable for slash variants", () => {
    expect(getOpenGraphImagePath("/")).toBe("/og/?path=%2F");
    expect(getOpenGraphImagePath("/spells")).toBe("/og/?path=%2Fspells%2F");
    expect(getOpenGraphImagePath("/spells/")).toBe("/og/?path=%2Fspells%2F");
  });

  it("keeps social preview dimensions explicit", () => {
    const metadata = createPageMetadata(getPageByPath("/")!);
    const images = metadata.openGraph?.images;
    const openGraphImage = Array.isArray(images) ? images[0] : images;
    expect(openGraphImage).toMatchObject({ width: 1200, height: 630 });
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
