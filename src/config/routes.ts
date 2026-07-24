export type RoutePlacement = "header" | "footer";
export type SitemapMode = "static" | "work-slugs" | false;

export interface RouteDefinition {
  id: string;
  path: string;
  label: string;
  published: boolean;
  navigation: readonly RoutePlacement[];
  navigationOrder: Partial<Record<RoutePlacement, number>>;
  sitemap: SitemapMode;
}

export const routeRegistry = [
  {
    id: "home",
    path: "/",
    label: "Home",
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "static",
  },
  {
    id: "about",
    path: "/about",
    label: "About",
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 1, footer: 1 },
    sitemap: "static",
  },
  {
    id: "work",
    path: "/work",
    label: "Work",
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 0, footer: 0 },
    sitemap: "static",
  },
  {
    id: "work-item",
    path: "/work/:slug",
    label: "Work item",
    published: true,
    navigation: [],
    navigationOrder: {},
    sitemap: "work-slugs",
  },
  {
    id: "contact",
    path: "/contact",
    label: "Contact",
    published: true,
    navigation: ["header", "footer"],
    navigationOrder: { header: 2, footer: 2 },
    sitemap: "static",
  },
  {
    id: "privacy",
    path: "/privacy",
    label: "Privacy",
    published: true,
    navigation: ["footer"],
    navigationOrder: { footer: 3 },
    sitemap: "static",
  },
  {
    id: "not-found",
    path: "*",
    label: "Not found",
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

export const getNavigationRoutes = (placement: RoutePlacement) =>
  (routeRegistry as readonly RouteDefinition[])
    .filter(
      (route) => route.published && route.navigation.includes(placement),
    )
    .sort(
      (left, right) =>
        (left.navigationOrder[placement] ?? Number.MAX_SAFE_INTEGER) -
        (right.navigationOrder[placement] ?? Number.MAX_SAFE_INTEGER),
    );

export function buildRoutePath(
  id: RouteId,
  params: Record<string, string> = {},
): string {
  const route = getRoute(id);
  return route.path.replace(/:([A-Za-z0-9_]+)/g, (_, key: string) => {
    const value = params[key];
    if (!value) throw new Error(`Missing route parameter "${key}" for ${id}`);
    return encodeURIComponent(value);
  });
}

export function getSitemapPaths(workSlugs: readonly string[]): string[] {
  return routeRegistry.flatMap((route) => {
    if (!route.published) return [];
    if (route.sitemap === "work-slugs") {
      return workSlugs.map((slug) => buildRoutePath(route.id, { slug }));
    }
    return route.sitemap === "static" ? [route.path] : [];
  });
}
