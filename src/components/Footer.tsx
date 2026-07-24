import { NavLink } from "react-router-dom";
import { getNavigationRoutes } from "../config/routes";
import { siteConfig } from "../config/site";

const navigation = getNavigationRoutes("footer");

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <strong>{siteConfig.name}</strong>
          <p>{siteConfig.description}</p>
        </div>
        <nav aria-label="Footer navigation">
          {navigation.map((route) => (
            <NavLink key={route.id} to={route.path}>
              {route.label}
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
