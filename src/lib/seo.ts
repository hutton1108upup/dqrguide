import type { Metadata } from "next";

import { siteConfig } from "@/content/site";
import type { SitePage } from "@/content/types";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getOpenGraphImagePath(pagePath: string): string {
  const normalized = pagePath === "/"
    ? "/"
    : `/${pagePath.replace(/^\/+|\/+$/g, "")}/`;

  return `/og/?path=${encodeURIComponent(normalized)}`;
}

export function createPageMetadata(page: Pick<SitePage, "path" | "title" | "description" | "indexable">): Metadata {
  const canonical = absoluteUrl(page.path);
  const socialImage = absoluteUrl(getOpenGraphImagePath(page.path));

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
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${page.title} preview`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [socialImage]
    }
  };
}
