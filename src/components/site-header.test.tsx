import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/builds/mage/"
}));

describe("site header", () => {
  it("renders one primary navigation without the persistent guide strip", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Guide sections" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Builds" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("link", { name: "Codes" })).toHaveAttribute("href", "/codes");
  });
});
