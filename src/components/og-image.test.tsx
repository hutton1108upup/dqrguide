import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OgImage } from "./og-image";

describe("route social image", () => {
  it("shows player-facing status and the configured canonical host", () => {
    render(
      <OgImage
        title="Northern Lands Guide"
        eyebrow="Current dungeon"
        status="Gameplay details in review"
        siteHost="dungeonquestrebornguide.wiki"
      />
    );

    expect(screen.getByText("Gameplay details in review")).toBeInTheDocument();
    expect(screen.getByText("dungeonquestrebornguide.wiki")).toBeInTheDocument();
  });
});
