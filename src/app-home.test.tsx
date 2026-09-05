import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage, { getHomeLink, getHomeTasks } from "../app/page";
import { getPageByPath } from "@/content/routes";

describe("homepage", () => {
  it("renders an answer-first hub without fabricated live data", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "Dungeon Quest Reborn Wiki & Progression Guide" })).toBeInTheDocument();
    expect(screen.getByText(/No active code is published/i)).toBeInTheDocument();
    expect(screen.getByText(/Ranking under review/i)).toBeInTheDocument();
    expect(screen.queryByText("NORTHERN")).not.toBeInTheDocument();
    expect(screen.getByText(/Sep 3, 2026 · \d{2}:\d{2} UTC/)).toBeInTheDocument();
    expect(screen.queryByText(/2026-09-03T05:19:40/)).not.toBeInTheDocument();
  });

  it("explains the evidence boundary before asking players to act", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { name: "How to use this Dungeon Quest Reborn wiki" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What is verified right now" })).toBeInTheDocument();
    expect(screen.getByText(/Unknown values stay out of the database/i)).toBeInTheDocument();
  });

  it("links directly to the main player tasks", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /Dungeon progression/i })).toHaveAttribute("href", "/dungeons");
    expect(screen.getByRole("link", { name: /Drop tables/i })).toHaveAttribute("href", "/drops");
    expect(screen.getByRole("link", { name: /Codes status/i })).toHaveAttribute("href", "/codes");
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

  it("surfaces the player questions driving current research", () => {
    render(<HomePage />);
    const demandHeading = screen.getByRole("heading", { name: "Most asked player questions" });
    const evidenceHeading = screen.getByRole("heading", { name: "How to use this Dungeon Quest Reborn wiki" });
    expect(demandHeading.compareDocumentPosition(evidenceHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("link", { name: /Find a spell and how to use it/i })).toHaveAttribute("href", "/spells");
    expect(screen.getByRole("link", { name: /Learn the Northern Lands route/i })).toHaveAttribute("href", "/dungeons/northern-lands");
    expect(screen.getByRole("link", { name: /Look up an item source/i })).toHaveAttribute("href", "/drops");
    expect(screen.getByRole("link", { name: /Find the Trello status and useful links/i })).toHaveAttribute("href", "/trello");
  });
});
