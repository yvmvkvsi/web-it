import { Link } from "react-router-dom";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { heroPlant, sizes, testlabFilmSample } from "../content/media";
import { home } from "../content/pages";
import { ui } from "../content/ui";
import FamilyGrid from "../components/FamilyGrid";
import Media from "../components/Media";

export default function Home() {
  const locale = useLocale();

  return (
    <>
      <section className="hero">
        {/* The hero photograph is subject matter, not atmosphere: it shows
            the material this business distributes, so it keeps its alt text
            rather than being hidden from assistive technology. */}
        <div className="hero-media">
          <Media asset={heroPlant} sizes={sizes.fullBleed} priority />
        </div>
        <div className="shell">
          <div className="hero-content">
            <span className="label-plain">{home.eyebrow[locale]}</span>
            <h1 className="display">{home.heading[locale]}</h1>
            <p className="lede">{home.lede[locale]}</p>
            <div className="hero-actions">
              <Link className="button" to={routePath("contatti", locale)}>
                {ui.requestSample[locale]}
              </Link>
              <Link
                className="button button-quiet"
                to={routePath("prodotti", locale)}
              >
                {ui.allProducts[locale]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="label">{ui.materialFamilies[locale]}</span>
            <h2 className="title">{home.familiesHeading[locale]}</h2>
            <p className="lede">{home.familiesLede[locale]}</p>
          </div>
          <FamilyGrid />
        </div>
      </section>

      <section className="section section-line">
        <div className="shell">
          <div className="split split-start">
            <div className="stack">
              <span className="label">TestLab</span>
              <h2 className="title">{home.testlabHeading[locale]}</h2>
              <p className="lede">{home.testlabBody[locale]}</p>
              <Link className="link" to={routePath("testlab", locale)}>
                {ui.readMore[locale]}
              </Link>
            </div>
            <figure className="page-media">
              <Media asset={testlabFilmSample} sizes={sizes.halfColumn} />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
