import { NavLink } from "react-router-dom";
import { getNavigationRoutes, localisePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { siteConfig } from "../config/site";

const navigation = getNavigationRoutes("footer");

const footerLabel = { it: "Navigazione a piè di pagina", en: "Footer navigation" };

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.description}</p>
        </div>
        <nav aria-label={footerLabel[locale]}>
          {navigation.map((route) => (
            <NavLink key={route.id} to={localisePath(locale, route.paths[locale])}>
              {route.labels[locale]}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="shell legal-line">
        © {new Date().getFullYear()} {siteConfig.legalName}
      </div>
    </footer>
  );
}
