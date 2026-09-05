import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import { MicrosoftClarity, MICROSOFT_CLARITY_PROJECT_ID } from "@/components/microsoft-clarity";
import { getPageByPath } from "@/content/routes";

describe("Microsoft Clarity analytics", () => {
  it("renders the supplied Clarity bootstrap after hydration", () => {
    const script = MicrosoftClarity() as ReactElement<{
      id: string;
      strategy: string;
      dangerouslySetInnerHTML: { __html: string };
    }>;

    expect(MICROSOFT_CLARITY_PROJECT_ID).toBe("ydkmvn5oq2");
    expect(script.props.id).toBe("microsoft-clarity");
    expect(script.props.strategy).toBe("afterInteractive");
    expect(script.props.dangerouslySetInnerHTML.__html).toContain("https://www.clarity.ms/tag/");
    expect(script.props.dangerouslySetInnerHTML.__html).toContain("ydkmvn5oq2");
  });

  it("mounts analytics once from the root layout", () => {
    const layout = readFileSync(resolve(process.cwd(), "app/layout.tsx"), "utf8");

    expect(layout).toContain('import { MicrosoftClarity } from "@/components/microsoft-clarity";');
    expect(layout.match(/<MicrosoftClarity\s*\/>/g)).toHaveLength(1);
  });

  it("documents the active third-party analytics on the privacy page", () => {
    const privacy = getPageByPath("/privacy/")!;
    const copy = JSON.stringify({
      summary: privacy.summary,
      quickAnswer: privacy.quickAnswer,
      sections: privacy.sections,
      faq: privacy.faq
    });

    expect(copy).toContain("Microsoft Clarity");
    expect(copy).toMatch(/page views|interactions/i);
    expect(copy).not.toContain("If analytics");
    expect(privacy.dateModified).toBe("2026-09-04");
  });
});
