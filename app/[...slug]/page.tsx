import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentPage } from "@/components/content-page";
import { getPageByPath, getRuntimeEnvironment, getVisiblePages, isPageAvailable } from "@/content/routes";
import { createPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string[] }>;
};

function slugToPath(slug: string[]) {
  return `/${slug.join("/")}/`;
}

export async function generateStaticParams() {
  return getVisiblePages(getRuntimeEnvironment())
    .filter((page) => page.path !== "/")
    .map((page) => ({
      slug: page.path.split("/").filter(Boolean)
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageByPath(slugToPath(slug));

  if (!page || !isPageAvailable(page, getRuntimeEnvironment())) {
    return {};
  }

  return createPageMetadata(page);
}

export default async function StaticCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const page = getPageByPath(slugToPath(slug));

  if (!page || !isPageAvailable(page, getRuntimeEnvironment())) {
    notFound();
  }

  return <ContentPage page={page} />;
}
