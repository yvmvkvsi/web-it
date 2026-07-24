import { Link } from "react-router-dom";
import { getRoute } from "../config/routes";
import { useSeo } from "../lib/seo";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "The requested page was not found.",
    noIndex: true,
  });

  return (
    <section className="section page-intro">
      <div className="shell narrow">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <Link className="button" to={getRoute("home").path}>
          Return home
        </Link>
      </div>
    </section>
  );
}
