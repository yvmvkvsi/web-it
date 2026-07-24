import { describe, expect, it } from "vitest";
import { resolvePageMeta } from "../../../src/lib/pageMeta";
import { getSitemapEntries, getSitemapPaths } from "../../../src/config/routes";

describe("page metadata", () => {
  it("derives the locale from the path prefix", () => {
    expect(resolvePageMeta("/").locale).toBe("it");
    expect(resolvePageMeta("/prodotti/masterbatch").locale).toBe("it");
    expect(resolvePageMeta("/en").locale).toBe("en");
    expect(resolvePageMeta("/en/products/masterbatch").locale).toBe("en");
  });

  it("falls back to the default locale for an unknown prefix", () => {
    expect(resolvePageMeta("/de/produkte").locale).toBe("it");
    expect(resolvePageMeta("/nonsense").locale).toBe("it");
  });

  it("gives every published route a unique title within its own locale", () => {
    // Uniqueness is a per-locale requirement: two pages competing in the same
    // language is the problem. "Masterbatch — Damon" and "TestLab — Damon" are
    // identical across locales because the terms are identical in both
    // languages, and the hreflang pair declares them as variants of each other
    // rather than as duplicates.
    for (const locale of ["it", "en"] as const) {
      const paths = getSitemapPaths().filter((path) =>
        locale === "en" ? path.startsWith("/en") : !path.startsWith("/en"),
      );
      const titles = paths.map((path) => resolvePageMeta(path).title);

      expect(paths.length).toBe(14);
      expect(new Set(titles).size).toBe(paths.length);
      expect(titles.every((title) => title.length > 5)).toBe(true);
    }
  });

  it("gives every published route a description of its own", () => {
    const paths = getSitemapPaths();
    const descriptions = paths.map((path) => resolvePageMeta(path).description);
    expect(new Set(descriptions).size).toBe(paths.length);
  });

  it("localises the title of a product category", () => {
    expect(resolvePageMeta("/prodotti/rigenerati").title).toBe(
      "Rigenerati — Damon",
    );
    expect(resolvePageMeta("/en/products/recycled").title).toBe(
      "Recycled — Damon",
    );
  });

  it("makes the canonical the route's own path in its own locale", () => {
    expect(resolvePageMeta("/en/company").canonicalPath).toBe("/en/company");
    expect(resolvePageMeta("/azienda").canonicalPath).toBe("/azienda");
    // A trailing slash is not a second URL.
    expect(resolvePageMeta("/azienda/").canonicalPath).toBe("/azienda");
  });

  it("pairs each page with its counterpart in the other locale", () => {
    expect(resolvePageMeta("/prodotti/biopolimeri").alternates).toEqual([
      { hreflang: "it-IT", path: "/prodotti/biopolimeri" },
      { hreflang: "en", path: "/en/products/biopolymers" },
      { hreflang: "x-default", path: "/prodotti/biopolimeri" },
    ]);
  });

  it("declares hreflang reciprocally for every published route", () => {
    for (const entry of getSitemapEntries()) {
      const meta = resolvePageMeta(entry.path);
      for (const alternate of meta.alternates) {
        if (alternate.hreflang === "x-default") continue;
        // Following an alternate must lead to a page that points back.
        expect(resolvePageMeta(alternate.path).alternates).toEqual(
          meta.alternates,
        );
      }
    }
  });

  it("marks an unmatched path as not-found and never indexable", () => {
    const meta = resolvePageMeta("/no-such-page");
    expect(meta.routeId).toBeUndefined();
    expect(meta.noIndex).toBe(true);
    expect(meta.title).toBe("Pagina non trovata — Damon");
    expect(resolvePageMeta("/en/no-such-page").title).toBe(
      "Page not found — Damon",
    );
  });

  it("treats the unpublished references route as not-found in both locales", () => {
    // The route exists in the registry so its strings stay reserved, but it
    // must not resolve to a page: no title, no canonical of its own, no index.
    for (const path of ["/referenze", "/en/references"]) {
      const meta = resolvePageMeta(path);
      expect(meta.routeId).toBeUndefined();
      expect(meta.noIndex).toBe(true);
    }
  });

  it("keeps published routes indexable in principle", () => {
    for (const path of getSitemapPaths()) {
      expect(resolvePageMeta(path).noIndex).toBe(false);
    }
  });
});
