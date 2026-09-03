import type { Metadata } from "next";

import { siteConfig } from "@/content/site";
import type { SitePage } from "@/content/types";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function createPageMetadata(page: Pick<SitePage, "path" | "title" | "description" | "indexable">): Metadata {
  const canonical = absoluteUrl(page.path);

  return {
    title: page.title,
    description: page.description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical
    },
    robots: {
      index: page.indexable,
      follow: true
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl("/og.png"),
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [absoluteUrl("/og.png")]
    }
  };
}
