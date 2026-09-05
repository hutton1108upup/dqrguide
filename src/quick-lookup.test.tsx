import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContentPage } from "./components/content-page";
import { getPageByPath } from "./content/routes";

describe("quick lookup interactions", () => {
  it("combines spell name and role filters and recovers from no results", () => {
    render(<ContentPage page={getPageByPath("/spells/")!} />);
    const search = screen.getByRole("searchbox", { name: "Find an ability" });
    fireEvent.change(search, { target: { value: "Phantom" } });
    expect(screen.getByText("1 of 10 abilities")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Use case"), { target: { value: "Recovery" } });
    expect(screen.getByText("No abilities match these filters.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(search).toHaveValue("");
    expect(screen.getByText("10 of 10 abilities")).toBeInTheDocument();
    expect(within(screen.getByRole("table", { name: "Abilities by use case" })).getByRole("link", { name: "Phantom Flames" })).toHaveAttribute("href", "/spells/phantom-flames");
  });

  it("opens a timestamp in a dismissible player without an eager iframe", () => {
    render(<ContentPage page={getPageByPath("/spells/phantom-flames/")!} />);
    expect(document.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("link", { name: /Pirate Island source statement/i }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByTitle("Pirate Island source statement")).toHaveAttribute("src", expect.stringContaining("start=345"));
    expect(within(dialog).getByRole("link", { name: /Open on YouTube/i })).toHaveAttribute("href", expect.stringContaining("t=345s"));
    fireEvent.click(within(dialog).getByRole("button", { name: "Close video" }));
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("offers direct links to the boss that blocked the run", () => {
    render(<ContentPage page={getPageByPath("/dungeons/northern-lands/")!} />);
    const shortcuts = screen.getByRole("navigation", { name: "Where are you stuck?" });
    expect(within(shortcuts).getByRole("link", { name: "Bob" })).toHaveAttribute("href", "#bob-orbs");
    expect(document.getElementById("route-odin")).not.toBeNull();
  });
});
