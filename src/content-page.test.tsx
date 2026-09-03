import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContentPage } from "@/components/content-page";
import { getPageByPath } from "@/content/routes";

describe("core content page", () => {
  it("renders the codes status without a fake copy action", () => {
    render(<ContentPage page={getPageByPath("/codes/")!} />);
    expect(screen.getByRole("heading", { name: /Codes — Current Status/i })).toBeInTheDocument();
    expect(screen.getAllByText("0 confirmed").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/No active code is published/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("button", { name: /copy/i })).not.toBeInTheDocument();
  });

  it("renders source evidence and related routes for a review-only guide", () => {
    render(<ContentPage page={getPageByPath("/dungeons/northern-lands/")!} />);
    expect(screen.getByRole("heading", { name: "Dungeon Quest Reborn Northern Lands" })).toBeInTheDocument();
    expect(screen.getByText("Official title")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Source notes" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Roblox Games API/i })).toBeInTheDocument();
  });

  it("keeps the Northern Lands detail panel focused on that dungeon", () => {
    render(<ContentPage page={getPageByPath("/dungeons/northern-lands/")!} />);
    expect(screen.getByRole("heading", { name: "Northern Lands source snapshot" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Room-by-Room Verification Plan" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Winter Outpost/i })).not.toBeInTheDocument();
  });

  it("shows the refresh state for content that needs evidence collection", () => {
    render(<ContentPage page={getPageByPath("/dungeons/northern-lands/")!} />);
    expect(screen.getByRole("status")).toHaveTextContent(/gameplay details still needed/i);
    expect(screen.getByText(/not been collected/i)).toBeInTheDocument();
  });

  it("renders the source policy trust page", () => {
    render(<ContentPage page={getPageByPath("/source-policy/")!} />);
    expect(screen.getByRole("heading", { name: /Source & Verification Policy/i })).toBeInTheDocument();
    expect(screen.getAllByText(/claim-level evidence/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { name: "Official place records" })).not.toBeInTheDocument();
  });

  it("renders database pages as player-facing verification checklists", () => {
    render(<ContentPage page={getPageByPath("/weapons/")!} />);
    expect(screen.getByRole("heading", { name: "Dungeon Quest Reborn Weapons Database" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "What to verify on an item card" })).toBeInTheDocument();
    expect(screen.getByText("Source dungeon")).toBeInTheDocument();
    expect(screen.getByText("Gameplay details in review")).toBeInTheDocument();
    expect(screen.queryByText(/Public \/ noindex|Review preview|Indexable/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Official place records" })).not.toBeInTheDocument();
  });

  it("keeps shared status panels in player language", () => {
    const tier = render(<ContentPage page={getPageByPath("/tier-list/")!} />);
    expect(document.body).not.toHaveTextContent(/deliberately empty|visual brief/i);
    tier.unmount();

    const dungeons = render(<ContentPage page={getPageByPath("/dungeons/")!} />);
    expect(document.body).not.toHaveTextContent(/publication gate/i);
    dungeons.unmount();

    render(<ContentPage page={getPageByPath("/updates/")!} />);
    expect(document.body).not.toHaveTextContent(/review-only/i);
  });
});
