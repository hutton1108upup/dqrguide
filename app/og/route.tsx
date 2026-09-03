import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { OgImage } from "@/components/og-image";
import { getPageByPath, getPlayerFacingStatus, getRuntimeEnvironment, isPageAvailable } from "@/content/routes";
import { siteConfig } from "@/content/site";

const imageSize = { width: 1200, height: 630 } as const;

export async function GET(request: NextRequest) {
  const requestedPath = request.nextUrl.searchParams.get("path") ?? "/";
  const page = getPageByPath(requestedPath);
  const visiblePage = page && isPageAvailable(page, getRuntimeEnvironment()) ? page : undefined;

  return new ImageResponse(
    <OgImage
      title={visiblePage?.h1 ?? siteConfig.fullName}
      eyebrow={visiblePage?.eyebrow ?? "Evidence-labelled field guide"}
      status={visiblePage ? getPlayerFacingStatus(visiblePage) : "Source checked"}
      siteHost={new URL(siteConfig.url).hostname}
    />,
    imageSize
  );
}
