import { Link } from "react-router-dom";
import { getRoute, routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { productFamilies } from "../content/products";
import { sizes } from "../content/media";
import Media from "./Media";

/** The six material families as image-led cards. Used on home and products. */
export default function FamilyGrid() {
  const locale = useLocale();

  return (
    <div className="family-grid">
      {productFamilies.map((family) => (
        <Link
          key={family.routeId}
          className="family-card"
          to={routePath(family.routeId, locale)}
          data-marker={family.marker}
        >
          <div className="family-card-media">
            <Media asset={family.media} sizes={sizes.card} />
          </div>
          <div className="family-card-body">
            <span className="family-card-form">{family.form[locale]}</span>
            <span className="family-card-name">
              {getRoute(family.routeId).labels[locale]}
            </span>
            <span className="family-card-summary">{family.summary[locale]}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
