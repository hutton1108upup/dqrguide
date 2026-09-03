import { NextResponse, type NextRequest } from "next/server";

import { getLegacyHostRedirect } from "@/lib/host-redirect";

export function proxy(request: NextRequest) {
  const target = getLegacyHostRedirect(
    request.headers.get("host"),
    request.nextUrl.pathname,
    request.nextUrl.search
  );

  return target ? NextResponse.redirect(target, 308) : NextResponse.next();
}
