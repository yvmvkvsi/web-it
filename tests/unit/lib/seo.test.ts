import { describe, expect, it } from "vitest";
import { headTagsFor, isIndexable, robotsValue } from "../../../src/lib/seo";
import { resolvePageMeta } from "../../../src/lib/pageMeta";
import { getSitemapPaths } from "../../../src/config/routes";

const ORIGIN = "https://damon.example";

const contentOf = (tags: ReturnType<typeof headTagsFor>, key: string) =>
  tags.find(
    (tag) => tag.attributes.name === key || tag.attributes.property === key,
  )?.attributes.content;

describe("indexability contract", () => {
  it("keeps a page out of the index unless the environment opts in", () => {
    const meta = resolvePageMeta("/prodotti");
    expect(isIndexable(meta, false)).toBe(false);
    expect(isIndexable(meta, true)).toBe(true);
  });

  it("never indexes the not-found page, even in production", () => {
    const meta = resolvePageMeta("/no-such-page");
    expect(isIndexable(meta, true)).toBe(false);
  });

  it("emits noindex for every route while the flag is off", () => {
    for (const path of [...getSitemapPaths(), "/referenze", "/nope"]) {
      const tags = headTagsFor(resolvePageMeta(path), ORIGIN, false);
      expect(contentOf(tags, "robots")).toBe("noindex, nofollow");
    }
  });

  it("maps the decision to the robots directive", () => {
    expect(robotsValue(true)).toBe("index, follow");
    expect(robotsValue(false)).toBe("noindex, nofollow");
  });
});

describe("head tags", () => {
  const tags = headTagsFor(resolvePageMeta("/en/testlab"), ORIGIN, true);

  it("builds an absolute canonical from the origin and the route path", () => {
    const canonical = tags.find((tag) => tag.attributes.rel === "canonical");
    expect(canonical?.attributes.href).toBe(`${ORIGIN}/en/testlab`);
  });

  it("emits one alternate per locale plus x-default, all absolute", () => {
    const alternates = tags.filter(
      (tag) => tag.attributes.rel === "alternate",
    );
    expect(alternates.map((tag) => tag.attributes.hreflang)).toEqual([
      "it-IT",
      "en",
      "x-default",
    ]);
    expect(alternates.map((tag) => tag.attributes.href)).toEqual([
      `${ORIGIN}/testlab`,
      `${ORIGIN}/en/testlab`,
      `${ORIGIN}/testlab`,
    ]);
  });

  it("carries the page title and description into Open Graph", () => {
    expect(contentOf(tags, "og:title")).toBe("TestLab — Damon");
    expect(contentOf(tags, "og:url")).toBe(`${ORIGIN}/en/testlab`);
    expect(contentOf(tags, "og:locale")).toBe("en");
    expect(contentOf(tags, "description")).toBe(
      contentOf(tags, "og:description"),
    );
  });

  it("claims no social image while the logo is unavailable", () => {
    // `og-default` depends on the official logo SVG (P-001). Declaring a
    // large-image card with no image would render worse than a summary.
    expect(contentOf(tags, "twitter:card")).toBe("summary");
    expect(contentOf(tags, "og:image")).toBeUndefined();
    expect(contentOf(tags, "twitter:image")).toBeUndefined();
  });

  it("publishes no unconfirmed company fact in the head", () => {
    const serialised = JSON.stringify(
      getSitemapPaths().flatMap((path) =>
        headTagsFor(resolvePageMeta(path), ORIGIN, true),
      ),
    );

    // Every one of these is `[source]` in SOURCE_OF_TRUTH and unconfirmed.
    for (const forbidden of [
      "Bari",
      "Carboneria",
      "07080640720",
      "080 5742345",
      "Avient",
      "MATER-BI",
      "Montenero",
      "@damon",
    ]) {
      expect(serialised).not.toContain(forbidden);
    }
  });
});
