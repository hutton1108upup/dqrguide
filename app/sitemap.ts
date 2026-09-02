import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";
import { getIndexablePages } from "@/content/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexablePages().map((page) => ({
      url: new URL(page.path, siteConfig.url).toString(),
      lastModified: page.dateModified
    }));
}
