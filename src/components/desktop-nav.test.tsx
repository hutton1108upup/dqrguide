import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DesktopNav } from "./desktop-nav";
import { getDirectNavigationItems, getNavigationGroups } from "./site-nav";

vi.mock("next/navigation", () => ({
  usePathname: () => "/builds/mage/"
}));

function renderNavigation() {
  return render(
    <div>
      <button type="button">Outside navigation</button>
      <DesktopNav
        groups={getNavigationGroups("production")}
        directItems={getDirectNavigationItems("production")}
      />
    </div>
  );
}

describe("desktop navigation", () => {
  it("opens one group at a time, marks the current page, and closes with Escape", async () => {
    const user = userEvent.setup();
    renderNavigation();

    const dungeons = screen.getByRole("button", { name: "Dungeons" });
    await user.click(dungeons);
    expect(dungeons).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Northern Lands" })).toBeVisible();

    const builds = screen.getByRole("button", { name: "Builds" });
    await user.click(builds);
    expect(dungeons).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Northern Lands" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mage Build" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Builds Overview" })).not.toHaveAttribute("aria-current");

    await user.keyboard("{Escape}");
    expect(builds).toHaveAttribute("aria-expanded", "false");
  });

  it("closes an open group after an outside pointer or menu-link activation", async () => {
    const user = userEvent.setup();
    renderNavigation();

    const guides = screen.getByRole("button", { name: "Guides" });
    await user.click(guides);
    await user.click(screen.getByRole("button", { name: "Outside navigation" }));
    expect(guides).toHaveAttribute("aria-expanded", "false");

    const gear = screen.getByRole("button", { name: "Gear" });
    await user.click(gear);
    const weapons = screen.getByRole("link", { name: "Weapons" });
    weapons.addEventListener("click", (event) => event.preventDefault());
    await user.click(weapons);
    expect(gear).toHaveAttribute("aria-expanded", "false");
  });
});
