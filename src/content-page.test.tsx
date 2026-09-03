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

    expect(screen.getByRole("heading", { name: "Northern Lands Guide" })).toBeInTheDocument();
    expect(screen.getAllByText("Official").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Source notes" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Roblox Games API/i })).toBeInTheDocument();
  });

  it("shows the refresh state for content that needs evidence collection", () => {
    render(<ContentPage page={getPageByPath("/dungeons/northern-lands/")!} />);

    expect(screen.getByRole("status")).toHaveTextContent(/source refresh needed/i);
    expect(screen.getByText(/not been collected/i)).toBeInTheDocument();
  });

  it("renders the source policy trust page", () => {
    render(<ContentPage page={getPageByPath("/source-policy/")!} />);

    expect(screen.getByRole("heading", { name: /Source & Verification Policy/i })).toBeInTheDocument();
    expect(screen.getAllByText(/claim-level evidence/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("heading", { name: "Official place records" })).not.toBeInTheDocument();
  });

  it("renders planned database pages as structured first-pass queues", () => {
    render(<ContentPage page={getPageByPath("/weapons/")!} />);

    expect(screen.getByRole("heading", { name: "Dungeon Quest Reborn Weapons Database" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Required fields before publication" })).toBeInTheDocument();
    expect(screen.getByText("Source dungeon")).toBeInTheDocument();
    expect(screen.getByText("Public / noindex")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Official place records" })).not.toBeInTheDocument();
  });
});
