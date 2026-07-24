import { Link, NavLink } from "react-router-dom";
import {
  getNavigationRoutes,
  getRoute,
  localisePath,
  routePath,
} from "../config/routes";
import { useLocale } from "../lib/locale";
import { siteConfig, siteDescription } from "../config/site";
import { productFamilies } from "../content/products";
import { ui } from "../content/ui";

const navigation = getNavigationRoutes("footer");

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="wordmark" to={routePath("home", locale)}>
              {siteConfig.name}
            </Link>
            <p>{siteDescription[locale]}</p>
          </div>

          <div className="footer-column">
            <span className="label-plain">{ui.materialFamilies[locale]}</span>
            <nav aria-label={ui.familyIndex[locale]}>
              {productFamilies.map((family) => (
                <NavLink
                  key={family.routeId}
                  to={routePath(family.routeId, locale)}
                >
                  {getRoute(family.routeId).labels[locale]}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <span className="label-plain">{ui.menu[locale]}</span>
            <nav aria-label={ui.footerNavigation[locale]}>
              {navigation.map((route) => (
                <NavLink
                  key={route.id}
                  to={localisePath(locale, route.paths[locale])}
                >
                  {route.labels[locale]}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Registered office, VAT number and registration details belong here
            and are absent on purpose: they are unconfirmed. See P-002. */}
        <div className="legal-line">
          <span>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </span>
        </div>
      </div>
    </footer>
  );
}
