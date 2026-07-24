import { describe, expect, it } from "vitest";
import {
  getNavigationRoutes,
  getSitemapEntries,
  getSitemapPaths,
  localisePath,
  matchRouteByPathname,
  routePath,
} from "../../../src/config/routes";
import { locales } from "../../../src/config/locales";

describe("route registry", () => {
  it("serves the default locale from the root and prefixes the other", () => {
    expect(routePath("home", "it")).toBe("/");
    expect(routePath("home", "en")).toBe("/en");
    expect(routePath("prodotti-masterbatch", "it")).toBe(
      "/prodotti/masterbatch",
    );
    expect(routePath("prodotti-masterbatch", "en")).toBe(
      "/en/products/masterbatch",
    );
  });

  it("translates route strings rather than reusing the Italian ones", () => {
    expect(routePath("prodotti-polimeri", "en")).toBe("/en/products/polymers");
    expect(routePath("settori", "en")).toBe("/en/industries");
    expect(routePath("azienda", "en")).toBe("/en/company");
  });

  it("keeps navigation ordered and excludes unpublished routes", () => {
    expect(getNavigationRoutes("header").map((route) => route.id)).toEqual([
      "prodotti",
      "testlab",
      "settori",
      "azienda",
      "contatti",
    ]);
    expect(getNavigationRoutes("footer").map((route) => route.id)).not.toContain(
      "referenze",
    );
  });

  it("omits unpublished routes from the sitemap in every locale", () => {
    const paths = getSitemapPaths();
    expect(paths).not.toContain("/referenze");
    expect(paths).not.toContain("/en/references");
    expect(paths).not.toContain("*");
  });

  it("emits one sitemap entry per locale, each listing every alternate", () => {
    const entries = getSitemapEntries();
    const italianHome = entries.find(
      (entry) => entry.path === "/" && entry.locale === "it",
    );

    expect(italianHome).toBeDefined();
    expect(italianHome?.alternates.map((alternate) => alternate.path)).toEqual([
      "/",
      "/en",
    ]);
    expect(entries.filter((entry) => entry.path === "/en")).toHaveLength(1);
  });

  it("resolves a pathname back to its route so locales can be swapped", () => {
    expect(matchRouteByPathname("/en/products/recycled")?.id).toBe(
      "prodotti-rigenerati",
    );
    expect(matchRouteByPathname("/prodotti/rigenerati/")?.id).toBe(
      "prodotti-rigenerati",
    );
    expect(matchRouteByPathname("/nothing-here")).toBeUndefined();
  });

  it("prefixes only the non-default locale", () => {
    expect(localisePath("it", "/testlab")).toBe("/testlab");
    expect(localisePath("en", "/testlab")).toBe("/en/testlab");
    expect(locales).toEqual(["it", "en"]);
  });
});
