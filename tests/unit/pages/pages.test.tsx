import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderAt } from "../../render";

import Company from "../../../src/pages/Company";
import Contact from "../../../src/pages/Contact";
import Cookie from "../../../src/pages/Cookie";
import Home from "../../../src/pages/Home";
import Industries from "../../../src/pages/Industries";
import NotFound from "../../../src/pages/NotFound";
import Privacy from "../../../src/pages/Privacy";
import ProductCategory from "../../../src/pages/ProductCategory";
import Products from "../../../src/pages/Products";
import TestLab from "../../../src/pages/TestLab";
import { productFamilies } from "../../../src/content/products";
import { getSitemapPaths, routePath } from "../../../src/config/routes";

const pages = [
  ["home", <Home />, "/", "/en"],
  ["products", <Products />, "/prodotti", "/en/products"],
  ["testlab", <TestLab />, "/testlab", "/en/testlab"],
  ["industries", <Industries />, "/settori", "/en/industries"],
  ["company", <Company />, "/azienda", "/en/company"],
  ["contact", <Contact />, "/contatti", "/en/contact"],
  ["privacy", <Privacy />, "/privacy", "/en/privacy"],
  ["cookie", <Cookie />, "/cookie", "/en/cookie"],
  ["not found", <NotFound />, "/nope", "/en/nope"],
] as const;

describe("page rendering", () => {
  it.each(pages)("renders %s in both locales with exactly one h1", (_name, element, it_, en) => {
    for (const path of [it_, en]) {
      const { unmount } = renderAt(element, path);
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      unmount();
    }
  });

  it.each(productFamilies.map((f) => [f.routeId, f] as const))(
    "renders the %s category page",
    (routeId, family) => {
      const { unmount } = renderAt(
        <ProductCategory routeId={routeId} />,
        routePath(routeId, "it"),
      );
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(family.definition.it)).toBeInTheDocument();
      unmount();
    },
  );

  it("gives every category page a distinct image and heading", () => {
    const seen = new Set<string>();
    for (const family of productFamilies) {
      const { unmount } = renderAt(
        <ProductCategory routeId={family.routeId} />,
        routePath(family.routeId, "it"),
      );
      const heading = screen.getByRole("heading", { level: 1 }).textContent!;
      const image = screen.getAllByRole("img")[0].getAttribute("src")!;
      expect(seen.has(heading)).toBe(false);
      expect(seen.has(image)).toBe(false);
      seen.add(heading);
      seen.add(image);
      unmount();
    }
  });

  it("gives every image alternative text and intrinsic dimensions", () => {
    for (const [, element, path] of pages) {
      const { unmount } = renderAt(element, path);
      for (const image of screen.queryAllByRole("img")) {
        expect(image.getAttribute("alt")).toBeTruthy();
        expect(image).toHaveAttribute("width");
        expect(image).toHaveAttribute("height");
      }
      unmount();
    }
  });

  it("loads the hero eagerly and everything else lazily", () => {
    const { container } = renderAt(<Home />, "/");
    const images = [...container.querySelectorAll("img")];
    expect(images[0]).toHaveAttribute("loading", "eager");
    expect(images[0]).toHaveAttribute("fetchpriority", "high");
    expect(images.slice(1).every((i) => i.getAttribute("loading") === "lazy")).toBe(true);
  });

  it("translates the page, not just the chrome", () => {
    const { unmount } = renderAt(<Industries />, "/settori");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Lo stesso polimero, tre problemi diversi",
    );
    unmount();

    renderAt(<Industries />, "/en/industries");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "The same polymer, three different problems",
    );
  });

  it("points every call to action at an implemented route", () => {
    const published = new Set(getSitemapPaths());
    for (const [, element, path] of pages) {
      const { container, unmount } = renderAt(element, path);
      for (const link of container.querySelectorAll("a[href]")) {
        const href = link.getAttribute("href")!;
        expect(href).not.toBe("#");
        expect(published.has(href)).toBe(true);
      }
      unmount();
    }
  });

  it("marks what is missing instead of inventing it", () => {
    for (const [, element, path] of [
      pages[1],
      pages[2],
      pages[3],
      pages[4],
      pages[5],
    ]) {
      const { unmount } = renderAt(element, path);
      expect(screen.getAllByText("In attesa di conferma").length).toBeGreaterThan(0);
      unmount();
    }
  });

  it("publishes no unconfirmed company fact on any page", () => {
    for (const [, element, path] of pages) {
      const { container, unmount } = renderAt(element, path);
      const text = container.textContent ?? "";

      // All `[source]` in SOURCE_OF_TRUTH, none owner-confirmed.
      for (const forbidden of [
        "Bari",
        "Carboneria",
        "07080640720",
        "5742345",
        "Avient",
        "MATER-BI",
        "Montenero",
        "150",
      ]) {
        expect(text).not.toContain(forbidden);
      }
      // No mailbox and no telephone anywhere.
      expect(text).not.toMatch(/[a-z0-9._-]+@[a-z0-9-]+\.[a-z]{2,}/i);
      expect(text).not.toMatch(/\+39/);
      unmount();
    }
  });

  it("offers a way out of the 404 in the reader's language", () => {
    renderAt(<NotFound />, "/en/nope");
    const links = screen.getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual(["/en", "/en/products"]);
  });

  it("keeps the legal notices structured as sections", () => {
    renderAt(<Privacy />, "/privacy");
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBeGreaterThanOrEqual(4);
    expect(
      within(document.body).getByText(/non invia nulla/),
    ).toBeInTheDocument();
  });
});
