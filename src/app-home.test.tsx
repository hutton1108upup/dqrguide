import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "../app/page";

describe("homepage", () => {
  it("renders an answer-first hub without fabricated live data", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: "Dungeon Quest Reborn Wiki & Progression Guide"
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/No active code is published/i)).toBeInTheDocument();
    expect(screen.getByText(/Ranking under review/i)).toBeInTheDocument();
    expect(screen.queryByText("NORTHERN")).not.toBeInTheDocument();
  });

  it("links directly to the main player tasks", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: /Dungeon progression/i })).toHaveAttribute(
      "href",
      "/dungeons"
    );
    expect(screen.getByRole("link", { name: /Drop tables/i })).toHaveAttribute(
      "href",
      "/drops"
    );
    expect(screen.getByRole("link", { name: /Codes status/i })).toHaveAttribute(
      "href",
      "/codes"
    );
  });
});
