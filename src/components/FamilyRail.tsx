import { NavLink } from "react-router-dom";
import { getRoute, routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { productFamilies, type ProductRouteId } from "../content/products";
import { ui } from "../content/ui";

export interface FamilyRailProps {
  /** The family currently being read, marked as the current page. */
  current?: ProductRouteId;
}

/** Index of the six families, kept beside the reader on a detail page. */
export default function FamilyRail({ current }: FamilyRailProps) {
  const locale = useLocale();

  return (
    <div>
      <span className="label-plain">{ui.familyIndex[locale]}</span>
      <nav className="family-rail" aria-label={ui.familyIndex[locale]}>
        {productFamilies.map((family) => (
          <NavLink
            key={family.routeId}
            to={routePath(family.routeId, locale)}
            aria-current={family.routeId === current ? "page" : undefined}
          >
            <span>{getRoute(family.routeId).labels[locale]}</span>
            <span className="rail-form" aria-hidden="true">
              {family.form[locale]}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
