import { useLocation } from "react-router-dom";
import {
  defaultLocale,
  localeFromPathname,
  locales,
  type Locale,
} from "../config/locales";
import {
  localisePath,
  matchRouteByPathname,
  routePath,
  type RouteId,
} from "../config/routes";

/** Active locale, derived from the URL. There is no other source. */
export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPathname(pathname);
}

/** Build an in-app href for a route id in the active locale. */
export function useRoutePath() {
  const locale = useLocale();
  return (id: RouteId) => routePath(id, locale);
}

/**
 * The equivalent of the current pathname in another locale.
 * Falls back to that locale's home when the path matches no known route,
 * which is the correct behaviour on a 404.
 */
export function counterpartPath(pathname: string, target: Locale): string {
  const route = matchRouteByPathname(pathname);
  if (!route) return localisePath(target, "/");
  return localisePath(target, route.paths[target]);
}

export { defaultLocale, locales };
export type { Locale };
