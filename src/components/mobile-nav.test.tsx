import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/weapons/"
}));

describe("mobile navigation", () => {
  it("exposes categorized pages and closes after a navigation link is activated", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const navigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    expect(within(navigation).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(navigation).getByRole("link", { name: "Codes" })).toBeInTheDocument();

    fireEvent.click(within(navigation).getByRole("button", { name: "Gear" }));
    const weapons = within(navigation).getByRole("link", { name: "Weapons" });
    expect(weapons).toHaveAttribute("aria-current", "page");
    expect(within(navigation).getByRole("link", { name: "Cosmetics" })).toBeInTheDocument();

    weapons.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(weapons);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps one accordion open and closes the entire menu with Escape", () => {
    render(<SiteHeader />);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    const navigation = screen.getByRole("navigation", { name: "Mobile navigation" });

    fireEvent.click(within(navigation).getByRole("button", { name: "Dungeons" }));
    expect(within(navigation).getByRole("link", { name: "Northern Lands" })).toBeInTheDocument();

    fireEvent.click(within(navigation).getByRole("button", { name: "Guides" }));
    expect(within(navigation).queryByRole("link", { name: "Northern Lands" })).not.toBeInTheDocument();
    expect(within(navigation).getByRole("link", { name: "Beginner Guide" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile navigation" })).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
