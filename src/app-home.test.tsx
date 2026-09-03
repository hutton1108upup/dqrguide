import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage, { getHomeLink, getHomeTasks } from "../app/page";
import { getPageByPath } from "@/content/routes";

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
    expect(screen.getByText(/Sep 2, 2026 · 23:30 UTC/)).toBeInTheDocument();
    expect(screen.queryByText(/2026-09-02T23:30:02/)).not.toBeInTheDocument();
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

  it("keeps the full first-pass task hub available in production", () => {
    const productionTasks = getHomeTasks("production");

    expect(productionTasks.every((task) => getPageByPath(task.href)?.publicationStatus === "published")).toBe(true);
    expect(productionTasks.some((task) => task.href === "/dungeons/")).toBe(true);
    expect(productionTasks.some((task) => task.href === "/codes/")).toBe(true);
  });

  it("returns production hrefs for the complete first-pass structure", () => {
    expect(getHomeLink("/discord/", "production")).toBe("/discord/");
    expect(getHomeLink("/updates/", "production")).toBe("/updates/");
    expect(getHomeLink("/codes/", "production")).toBe("/codes/");
  });
});
