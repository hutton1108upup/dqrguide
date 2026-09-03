import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GuideNav, getGuideNavGroups } from "./guide-nav";

describe("guide navigation", () => {
  it("exposes the three planned content silos in production", () => {
    const groups = getGuideNavGroups("production");

    expect(groups.map((group) => group.label)).toEqual([
      "Field notes",
      "Database",
      "Build & decisions"
    ]);
    expect(groups.flatMap((group) => group.items).map(([, href]) => href)).toEqual(
      expect.arrayContaining([
        "/differences/",
        "/updates/",
        "/dungeons/",
        "/spells/",
        "/weapons/",
        "/armor/",
        "/cosmetics/",
        "/beginner-guide/",
        "/builds/",
        "/scripts-macros/"
      ])
    );
  });

  it("renders group labels and page links", () => {
    render(<GuideNav environment="production" />);

    expect(screen.getByRole("navigation", { name: "Guide sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Weapons" })).toHaveAttribute("href", "/weapons");
    expect(screen.getByRole("link", { name: "Mage build" })).toHaveAttribute("href", "/builds/mage");
  });
});
