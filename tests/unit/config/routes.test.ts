import { describe, expect, it } from "vitest";
import {
  buildRoutePath,
  getNavigationRoutes,
  getSitemapPaths,
} from "../../../src/config/routes";

describe("route registry", () => {
  it("builds encoded dynamic paths", () => {
    expect(buildRoutePath("work-item", { slug: "one two" })).toBe(
      "/work/one%20two",
    );
  });

  it("keeps navigation ordered and excludes unpublished routes", () => {
    expect(getNavigationRoutes("header").map((route) => route.id)).toEqual([
      "work",
      "about",
      "contact",
    ]);
  });

  it("expands data-driven sitemap routes", () => {
    const paths = getSitemapPaths(["alpha", "beta"]);
    expect(paths).toContain("/work/alpha");
    expect(paths).toContain("/work/beta");
    expect(paths).not.toContain("*");
  });
});
