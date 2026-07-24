import { Link } from "react-router-dom";
import ResponsiveImage from "../components/ResponsiveImage";
import { getRoute } from "../config/routes";
import { useSeo } from "../lib/seo";

export default function Home() {
  useSeo({
    title: "Production Web Starter",
    description: "Neutral, typed and testable foundation for a production website.",
  });

  return (
    <>
      <section className="section hero">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">Neutral starter</p>
            <h1>Replace the content and design. Keep the engineering foundation.</h1>
            <p className="lede">
              This interface is intentionally plain. It demonstrates route, content,
              media, SEO and verification contracts without prescribing a brand.
            </p>
            <Link className="button" to={getRoute("work").path}>
              View example structure
            </Link>
          </div>
          <ResponsiveImage
            src="/media/placeholder-landscape.svg"
            alt="Neutral media placeholder"
            width={1600}
            height={900}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell">
          <p className="eyebrow">Foundation</p>
          <h2>One source of truth for routes, content and public metadata.</h2>
          <div className="card-grid">
            <article>
              <h3>Typed routing</h3>
              <p>Navigation, lazy pages and sitemap generation share one registry.</p>
            </article>
            <article>
              <h3>Media contract</h3>
              <p>Intrinsic dimensions and optional picture sources protect layout stability.</p>
            </article>
            <article>
              <h3>Quality gates</h3>
              <p>Typecheck, lint, tests and production build run through one command.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
