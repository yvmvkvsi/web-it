import { NavLink, useLocation } from "react-router-dom";
import { getNavigationRoutes, localisePath, routePath } from "../config/routes";
import { localeName, locales } from "../config/locales";
import { counterpartPath, useLocale } from "../lib/locale";
import { siteConfig } from "../config/site";

const navigation = getNavigationRoutes("header");

const navigationLabel = { it: "Navigazione principale", en: "Primary navigation" };
const languageLabel = { it: "Lingua", en: "Language" };

export default function Header() {
  const locale = useLocale();
  const { pathname } = useLocation();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <NavLink className="wordmark" to={routePath("home", locale)}>
          {siteConfig.name}
        </NavLink>
        <nav className="primary-nav" aria-label={navigationLabel[locale]}>
          {navigation.map((route) => (
            <NavLink key={route.id} to={localisePath(locale, route.paths[locale])}>
              {route.labels[locale]}
            </NavLink>
          ))}
        </nav>
        <nav className="locale-nav" aria-label={languageLabel[locale]}>
          {locales
            .filter((candidate) => candidate !== locale)
            .map((candidate) => (
              <NavLink
                key={candidate}
                to={counterpartPath(pathname, candidate)}
                hrefLang={candidate}
              >
                {localeName[candidate]}
              </NavLink>
            ))}
        </nav>
      </div>
    </header>
  );
}
