import { NavLink } from "react-router-dom";
import { getNavigationRoutes, getRoute } from "../config/routes";
import { siteConfig } from "../config/site";

const navigation = getNavigationRoutes("header");

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <NavLink className="wordmark" to={getRoute("home").path}>
          {siteConfig.name}
        </NavLink>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navigation.map((route) => (
            <NavLink key={route.id} to={route.path}>
              {route.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
