import { Link } from "react-router-dom";
import { getRoute, routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { useSeo } from "../lib/seo";
import { getProductFamily, type ProductRouteId } from "../content/products";
import { productDetail } from "../content/pages";
import { sizes } from "../content/media";
import { ui } from "../content/ui";
import { siteConfig } from "../config/site";
import FamilyRail from "../components/FamilyRail";
import Media from "../components/Media";
import PendingNote from "../components/PendingNote";

export interface ProductCategoryProps {
  routeId: ProductRouteId;
}

/**
 * One implementation for all six category pages. They differ in content, not
 * in structure, so they share a component rather than six near-identical files.
 */
export default function ProductCategory({ routeId }: ProductCategoryProps) {
  const locale = useLocale();
  const family = getProductFamily(routeId);
  const name = getRoute(routeId).labels[locale];

  useSeo({
    title: `${name} — ${siteConfig.name}`,
    description: family.summary[locale],
  });

  return (
    <>
      <section className="section-tight">
        <div className="shell">
          <div className="section-head">
            <span className="label">{ui.materialFamilies[locale]}</span>
            <h1 className="display">{name}</h1>
            <p className="lede">{family.definition[locale]}</p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="detail-grid">
            <div className="stack">
              <figure className="page-media">
                <Media asset={family.media} sizes={sizes.fullWidth} />
              </figure>

              <div className="annotated">
                <span className="annotation">
                  {ui.form[locale]}
                  <br />
                  <span className={family.marker === "bio" ? "marker-bio" : ""}>
                    {family.form[locale]}
                  </span>
                </span>
                <div className="prose">
                  {family.detail[locale].map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <PendingNote>{productDetail.pending[locale]}</PendingNote>
            </div>

            <aside className="detail-aside">
              <FamilyRail current={routeId} />
              <div className="stack">
                <span className="subtitle">
                  {productDetail.ctaHeading[locale]}
                </span>
                <p className="field-hint">{productDetail.ctaBody[locale]}</p>
                <Link className="button" to={routePath("contatti", locale)}>
                  {ui.requestSample[locale]}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <Link className="link" to={routePath("prodotti", locale)}>
            {ui.backToProducts[locale]}
          </Link>
        </div>
      </section>
    </>
  );
}
