import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileNav } from "./mobile-nav";

describe("mobile navigation", () => {
  it("closes after a navigation link is activated", () => {
    render(<MobileNav />);

    const toggle = screen.getByRole("button", { name: "Open navigation" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const destination = screen.getByRole("link", { name: "Dungeons" });
    destination.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(destination);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
