import {
  defaultLocale,
  localeFromPathname,
  localeTag,
  locales,
  type Locale,
} from "../config/locales";
import {
  getRoute,
  localisePath,
  matchRouteByPathname,
  type RouteId,
} from "../config/routes";
import { siteConfig } from "../config/site";
import {
  company,
  contact,
  cookie,
  home,
  industriesPage,
  notFound,
  privacy,
  products,
  testlab,
  type PageMeta,
} from "../content/pages";
import {
  getProductFamily,
  productRouteIds,
  type ProductRouteId,
} from "../content/products";

/**
 * Metadata is resolved from the pathname by a pure function rather than
 * declared inside each page component.
 *
 * The prerender step has to write `<title>`, the description, the canonical
 * and the `hreflang` set into static HTML, before any React effect could run.
 * A hook that only reaches `document.head` after hydration cannot do that, so
 * the source of the metadata has to live outside the component tree. The
 * browser then applies the same values on client-side navigation.
 */

const staticMeta: Partial<Record<RouteId, PageMeta>> = {
  home: home.meta,
  prodotti: products.meta,
  testlab: testlab.meta,
  settori: industriesPage.meta,
  azienda: company.meta,
  contatti: contact.meta,
  privacy: privacy.meta,
  cookie: cookie.meta,
};

const productIds = new Set<string>(productRouteIds);

const isProductRoute = (routeId: RouteId): routeId is ProductRouteId =>
  productIds.has(routeId);

export interface ResolvedPageMeta {
  locale: Locale;
  /** `undefined` when the pathname matches no route — the 404 state. */
  routeId?: RouteId;
  title: string;
  description: string;
  /**
   * `true` when the page itself must never be indexed regardless of the
   * environment flag. The 404 is the only such page: it is reachable at
   * unlimited URLs, all of which would otherwise be indexable duplicates.
   */
  noIndex: boolean;
  /** In-app path this page is canonical at. */
  canonicalPath: string;
  alternates: ReadonlyArray<{ hreflang: string; path: string }>;
}

/** Title and description for one route in one locale. */
function metaFor(
  routeId: RouteId,
  locale: Locale,
): { title: string; description: string } {
  // The six category pages take their title from the route label and their
  // description from the family summary, so a new family needs no entry here.
  if (isProductRoute(routeId)) {
    const family = getProductFamily(routeId);
    return {
      title: `${getRoute(routeId).labels[locale]} — ${siteConfig.name}`,
      description: family.summary[locale],
    };
  }

  const meta = staticMeta[routeId];
  if (!meta) throw new Error(`No metadata registered for route: ${routeId}`);
  return { title: meta.title[locale], description: meta.description[locale] };
}

/**
 * The set of locale alternates for a pathname. Every published route exists in
 * both locales, so the pair is complete; an unmatched path has no alternates
 * worth declaring and falls back to the two home pages.
 */
function alternatesFor(pathname: string) {
  const route = matchRouteByPathname(pathname);

  return [
    ...locales.map((candidate) => ({
      hreflang: localeTag[candidate],
      path: route
        ? localisePath(candidate, route.paths[candidate])
        : localisePath(candidate, "/"),
    })),
    {
      hreflang: "x-default",
      path: route
        ? localisePath(defaultLocale, route.paths[defaultLocale])
        : localisePath(defaultLocale, "/"),
    },
  ];
}

export function resolvePageMeta(pathname: string): ResolvedPageMeta {
  const locale = localeFromPathname(pathname);
  const route = matchRouteByPathname(pathname);
  const alternates = alternatesFor(pathname);

  // Unmatched, or matched but unpublished: `referenze` is a real registry
  // entry that must not become reachable content, so it resolves to the same
  // not-found state as a typo would.
  if (!route || !route.published) {
    return {
      locale,
      title: notFound.meta.title[locale],
      description: notFound.meta.description[locale],
      noIndex: true,
      canonicalPath: pathname,
      alternates,
    };
  }

  const routeId = route.id as RouteId;
  const meta = metaFor(routeId, locale);

  return {
    locale,
    routeId,
    title: meta.title,
    description: meta.description,
    noIndex: false,
    canonicalPath: localisePath(locale, route.paths[locale]),
    alternates,
  };
}
