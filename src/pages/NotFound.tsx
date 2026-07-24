import { Link } from "react-router-dom";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { notFound } from "../content/pages";
import { ui } from "../content/ui";

export default function NotFound() {
  const locale = useLocale();

  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <span className="label">404</span>
          <h1 className="display">{notFound.heading[locale]}</h1>
          <p className="lede">{notFound.lede[locale]}</p>
        </div>
        <div className="hero-actions">
          <Link className="button" to={routePath("home", locale)}>
            {notFound.home[locale]}
          </Link>
          <Link
            className="button button-quiet"
            to={routePath("prodotti", locale)}
          >
            {ui.allProducts[locale]}
          </Link>
        </div>
      </div>
    </section>
  );
}
