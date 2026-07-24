import { defaultLocale, localePrefix, locales, type Locale } from "./locales";

export type RoutePlacement = "header" | "footer";
export type SitemapMode = "static" | "collection" | false;

export interface RouteDefinition {
  id: string;
  /** Locale-relative path, without the locale prefix. */
  paths: Readonly<Record<Locale, string>>;
  labels: Readonly<Record<Locale, string>>;
  published: boolean;
  navigation: readonly RoutePlacement[];
  navigationOrder: Partial<Record<RoutePlacement, number>>;
  sitemap: SitemapMode;
}

/**
 * Single source of truth for navigation, routing and sitemap generation.
 * Route strings approved 2026-07-24; see SOURCE_OF_TRUTH.md section 4.
 *
 * Paths carry no trailing slash. The root path is "/".
 */
export const routeRegistry = [
  {
    id: "home",
    paths: { it: "/", en: "/" },
    labels: { it: "Home", en: "Home" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "prodotti",
    paths: { it: "/prodotti", en: "/products" },
    labels: { it: "Prodotti", en: "Products" },
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 0, footer: 0 },
    sitemap: "static",
  },
  {
    id: "prodotti-masterbatch",
    paths: { it: "/prodotti/masterbatch", en: "/products/masterbatch" },
    labels: { it: "Masterbatch", en: "Masterbatch" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "prodotti-polimeri",
    paths: { it: "/prodotti/polimeri", en: "/products/polymers" },
    labels: { it: "Polimeri", en: "Polymers" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "prodotti-biopolimeri",
    paths: { it: "/prodotti/biopolimeri", en: "/products/biopolymers" },
    labels: { it: "Bio-polimeri", en: "Biopolymers" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "prodotti-additivi",
    paths: { it: "/prodotti/additivi", en: "/products/additives" },
    labels: { it: "Additivi", en: "Additives" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "prodotti-compound",
    paths: { it: "/prodotti/compound", en: "/products/compounds" },
    labels: { it: "Compound", en: "Compounds" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "prodotti-rigenerati",
    paths: { it: "/prodotti/rigenerati", en: "/products/recycled" },
    labels: { it: "Rigenerati", en: "Recycled" },
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "testlab",
    paths: { it: "/testlab", en: "/testlab" },
    labels: { it: "TestLab", en: "TestLab" },
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 1, footer: 1 },
    sitemap: "static",
  },
  {
    id: "settori",
    paths: { it: "/settori", en: "/industries" },
    labels: { it: "Settori", en: "Industries" },
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 2, footer: 2 },
    sitemap: "static",
  },
  {
    id: "azienda",
    paths: { it: "/azienda", en: "/company" },
    labels: { it: "Azienda", en: "Company" },
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 3, footer: 3 },
    sitemap: "static",
  },
  {
    id: "contatti",
    paths: { it: "/contatti", en: "/contact" },
    labels: { it: "Contatti", en: "Contact" },
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 4, footer: 4 },
    sitemap: "static",
  },
  {
    // Client case studies. Retained by decision, unpublished until named
    // clients and written permission exist. See PENDING_DECISIONS P-006.
    id: "referenze",
    paths: { it: "/referenze", en: "/references" },
    labels: { it: "Referenze", en: "References" },
    published: false,
    navigation: [],
    navigationOrder: {},
    sitemap: false,
  },
  {
    id: "privacy",
    paths: { it: "/privacy", en: "/privacy" },
    labels: { it: "Privacy", en: "Privacy" },
    published: true,
    navigation: ["footer"],
    navigationOrder: { footer: 5 },
    sitemap: "static",
  },
  {
    id: "cookie",
    paths: { it: "/cookie", en: "/cookie" },
    labels: { it: "Cookie", en: "Cookie" },
    published: true,
    navigation: ["footer"],
    navigationOrder: { footer: 6 },
    sitemap: "static",
  },
  {
    id: "not-found",
    paths: { it: "*", en: "*" },
    labels: { it: "Pagina non trovata", en: "Page not found" },
    published: false,
    navigation: [],
    navigationOrder: {},
    sitemap: false,
  },
] as const satisfies readonly RouteDefinition[];

export type AppRoute = (typeof routeRegistry)[number];
export type RouteId = AppRoute["id"];
export type PublishedRoute = Extract<AppRoute, { published: true }>;
export type PublishedRouteId = PublishedRoute["id"];

export const getRoute = <Id extends RouteId>(id: Id) => {
  const route = routeRegistry.find((candidate) => candidate.id === id);
  if (!route) throw new Error(`Unknown route id: ${id}`);
  return route as Extract<AppRoute, { id: Id }>;
};

/**
 * Prepend the locale prefix to a locale-relative path.
 * The default locale is served from the root and takes no prefix.
 */
export function localisePath(locale: Locale, path: string): string {
  const prefix = localePrefix[locale];
  if (!prefix) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/** Absolute in-app path for a route in a given locale. */
export function routePath(id: RouteId, locale: Locale): string {
  return localisePath(locale, getRoute(id).paths[locale]);
}

export const getNavigationRoutes = (
  placement: RoutePlacement,
): readonly RouteDefinition[] =>
  (routeRegistry as readonly RouteDefinition[])
    .filter((route) => route.published && route.navigation.includes(placement))
    .sort(
      (left, right) =>
        (left.navigationOrder[placement] ?? Number.MAX_SAFE_INTEGER) -
        (right.navigationOrder[placement] ?? Number.MAX_SAFE_INTEGER),
    );

/** Every published route resolved for one locale. */
export const getPublishedRoutes = (): readonly RouteDefinition[] =>
  (routeRegistry as readonly RouteDefinition[]).filter(
    (route) => route.published,
  );

/** Find the route that owns a pathname, so its counterpart locale can be linked. */
export function matchRouteByPathname(pathname: string): RouteDefinition | undefined {
  const normalised =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  return (routeRegistry as readonly RouteDefinition[]).find((route) =>
    locales.some(
      (locale) => localisePath(locale, route.paths[locale]) === normalised,
    ),
  );
}

export interface SitemapEntry {
  path: string;
  locale: Locale;
  alternates: ReadonlyArray<{ locale: Locale; path: string }>;
}

/**
 * One entry per published route per locale, each carrying the full set of
 * alternates so the sitemap can declare hreflang.
 */
export function getSitemapEntries(): SitemapEntry[] {
  return getPublishedRoutes().flatMap((route) => {
    if (route.sitemap !== "static") return [];

    const alternates = locales.map((locale) => ({
      locale,
      path: localisePath(locale, route.paths[locale]),
    }));

    return alternates.map(({ locale, path }) => ({
      path,
      locale,
      alternates,
    }));
  });
}

/** Flat list of published paths across all locales. */
export function getSitemapPaths(): string[] {
  return getSitemapEntries().map((entry) => entry.path);
}

export { defaultLocale, locales };
export type { Locale };
