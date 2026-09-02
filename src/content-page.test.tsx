import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContentPage } from "@/components/content-page";
import { getPageByPath } from "@/content/routes";

describe("core content page", () => {
  it("renders the codes status without a fake copy action", () => {
    render(<ContentPage page={getPageByPath("/codes/")!} />);

    expect(screen.getByRole("heading", { name: /Codes — Current Status/i })).toBeInTheDocument();
    expect(screen.getByText("0 confirmed")).toBeInTheDocument();
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
});
