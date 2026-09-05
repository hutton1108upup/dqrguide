import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentPage } from "./components/content-page";
import { getPageByPath } from "./content/routes";
import sitemap from "../app/sitemap";

describe("player answer guides", () => {
  it("offers named spell lookups with attributed sources instead of an empty checklist", () => {
    render(<ContentPage page={getPageByPath("/spells/")!} />);
    expect(screen.queryByText("No verified rows yet")).not.toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Abilities by use case" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Phantom Flames guide/i })).toHaveAttribute("href", "/spells/phantom-flames");
    expect(screen.getAllByText(/Community report/).length).toBeGreaterThan(0);
  });

  it("keeps unverified drop rates out of the source lookup", () => {
    render(<ContentPage page={getPageByPath("/drops/")!} />);
    expect(screen.getByRole("table", { name: "Reported item locations" })).toBeInTheDocument();
    expect(screen.getAllByText(/Difficulty unknown/).length).toBeGreaterThan(0);
    expect(document.body).not.toHaveTextContent(/0\.18%|0\.05%|1 in 555/);
  });

  it("publishes complete attributed ability guides and keeps unsupported rankings excluded", () => {
    for (const path of ["/spells/phantom-flames/", "/spells/infernal-orbs/"]) {
      const page = getPageByPath(path);
      expect(page).toBeDefined();
      expect(page?.sources.some(source => source.url.includes("FzogFp907JM"))).toBe(true);
      expect(page?.claims.every(claim => claim.claimStatus === "reported")).toBe(true);
      expect(page?.sections.length).toBeGreaterThanOrEqual(3);
    }
    const urls = sitemap().map(item => item.url);
    expect(urls.some(url => url.endsWith("/trello/"))).toBe(true);
    expect(urls.some(url => url.endsWith("/spell-tier-list/"))).toBe(false);
  });
});
