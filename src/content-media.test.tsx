import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContentPage } from "@/components/content-page";
import { getPageByPath } from "@/content/routes";

describe("evidence media on content pages", () => {
  it("keeps a Northern Lands video dormant until the reader asks to play it", () => {
    render(<ContentPage page={getPageByPath("/dungeons/northern-lands/")!} />);

    const officialImage = screen.getByRole("img", { name: /party facing a horned arena boss/i });
    expect(officialImage).toBeInTheDocument();
    expect(officialImage.parentElement).toHaveClass("image-frame");
    expect(screen.getByText(/official experience artwork does not identify the dungeon or boss by name/i)).toBeInTheDocument();
    expect(screen.queryByTitle(/Northern Lands solo route/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /play Northern Lands solo route/i }));

    const player = screen.getByTitle(/Northern Lands solo route/i);
    expect(player).toHaveAttribute("src", expect.stringContaining("youtube-nocookie.com/embed/3pHhZpt-b-U"));
    expect(player).toHaveAttribute("src", expect.stringContaining("start=94"));
  });

  it("adds actionable research-backed sections to the first enrichment batch", () => {
    const expectations = [
      ["/dungeons/northern-lands/", "Room-by-Room Verification Plan"],
      ["/updates/", "Northern Lands Community Demonstrations"],
      ["/gamepasses/", "Why the Gold Price Can Change"],
      ["/beginner-guide/", "If Progress Stops"],
      ["/differences/", "What Players Mean by Same as the Original"],
      ["/trading/", "Why a Trade Can Be Blocked"],
      ["/discord/", "Community Invite Candidate"]
    ] as const;

    for (const [path, heading] of expectations) {
      const { unmount } = render(<ContentPage page={getPageByPath(path)!} />);
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
      unmount();
    }
  });

  it("labels videos as community demonstrations rather than official proof", () => {
    render(<ContentPage page={getPageByPath("/gamepasses/")!} />);

    expect(screen.getByRole("button", { name: /play Gamepass storefront walkthrough/i })).toBeInTheDocument();
    expect(screen.getByText(/community demonstration, not a current price guarantee/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /watch on YouTube/i })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=8ZVfKMwvWoo"
    );
  });

  it("adds evidence-aware media to the database and dungeon pages", () => {
    const expectations = [
      ["/spells/", "Ability review queue"],
      ["/spell-tier-list/", "Why Video Rankings Are Not Final"],
      ["/dungeons/", "Build the Progression Map"],
      ["/dungeons/winter-outpost/", "Community Walkthrough Coverage"],
      ["/drops/", "Proof Bundle for One Drop Row"],
      ["/weapons/", "Community Weapon Showcase"],
      ["/builds/mage/", "Mage Video Review Queue"],
      ["/builds/warrior/", "Warrior Video Review Queue"]
    ] as const;

    for (const [path, heading] of expectations) {
      const { unmount } = render(<ContentPage page={getPageByPath(path)!} />);
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
      unmount();
    }
  });

  it("keeps weak-source and safety pages useful without unsafe embeds", () => {
    const checks = [
      ["/cosmetics/", "Why Glitch Videos Are Excluded"],
      ["/builds/tank/", "A Party Job, Not a Confirmed Class"],
      ["/builds/healer/", "A Party Job, Not a Confirmed Class"],
      ["/source-policy/", "Evidence Ladder"]
    ] as const;

    for (const [path, heading] of checks) {
      const { unmount } = render(<ContentPage page={getPageByPath(path)!} />);
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /play/i })).not.toBeInTheDocument();
      unmount();
    }

    const { unmount } = render(<ContentPage page={getPageByPath("/scripts-macros/")!} />);
    expect(screen.getByRole("link", { name: /Roblox Support — Cheating and Exploiting/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /play/i })).not.toBeInTheDocument();
    unmount();
  });
});
