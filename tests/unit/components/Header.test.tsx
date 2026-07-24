import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Header from "../../../src/components/Header";
import { renderAt } from "../../render";

const primaryNav = () =>
  screen.getAllByRole("navigation", { name: "Navigazione principale" })[0];

describe("header navigation", () => {
  it("marks the current page and nothing else", () => {
    renderAt(<Header />, "/testlab");
    const current = within(primaryNav()).getAllByRole("link", {
      current: "page",
    });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveTextContent("TestLab");
  });

  it("marks the products entry on a category page beneath it", () => {
    renderAt(<Header />, "/prodotti/masterbatch");
    expect(
      within(primaryNav()).getByRole("link", { current: "page" }),
    ).toHaveTextContent("Prodotti");
  });

  it("links the English tree when read in English", () => {
    renderAt(<Header />, "/en/company");
    const links = within(
      screen.getAllByRole("navigation", { name: "Primary navigation" })[0],
    ).getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/en/products",
      "/en/testlab",
      "/en/industries",
      "/en/company",
      "/en/contact",
    ]);
  });

  it("offers the counterpart page, not the other home page", () => {
    renderAt(<Header />, "/prodotti/rigenerati");
    const [switcher] = screen.getAllByRole("navigation", { name: "Lingua" });
    expect(
      within(switcher).getByRole("link", { name: "English" }),
    ).toHaveAttribute("href", "/en/products/recycled");
  });

  it("falls back to the home page when the path matches no route", () => {
    renderAt(<Header />, "/en/nothing-here");
    const [switcher] = screen.getAllByRole("navigation", { name: "Language" });
    expect(
      within(switcher).getByRole("link", { name: "Italiano" }),
    ).toHaveAttribute("href", "/");
  });

  it("never links the unpublished references route", () => {
    const { container } = renderAt(<Header />, "/");
    const hrefs = [...container.querySelectorAll("a[href]")].map((a) =>
      a.getAttribute("href"),
    );
    expect(hrefs.some((href) => /referen/i.test(href ?? ""))).toBe(false);
  });

  it("does not claim the wordmark is the current page", () => {
    renderAt(<Header />, "/");
    // The wordmark is identity, not a navigation item: a second
    // `aria-current="page"` in the header would be a competing claim.
    expect(screen.getAllByRole("link", { name: "Damon" })[0]).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("opens and closes the mobile panel, returning focus to the toggle", async () => {
    const user = userEvent.setup();
    renderAt(<Header />, "/prodotti");
    const toggle = screen.getByRole("button");

    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.body.dataset.scrollLocked).toBe("true");

    await user.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
    expect(document.body.dataset.scrollLocked).toBeUndefined();
  });

  it("controls the panel it names", async () => {
    const user = userEvent.setup();
    const { container } = renderAt(<Header />, "/");
    const toggle = screen.getByRole("button");

    const panelId = toggle.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    const panel = container.querySelector(`#${CSS.escape(panelId!)}`);
    expect(panel).toHaveClass("mobile-nav");

    await user.click(toggle);
    expect(panel).toHaveAttribute("data-open", "true");
  });
});
