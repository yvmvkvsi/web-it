import { Link } from "react-router-dom";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { company } from "../content/pages";
import { sizes } from "../content/media";
import { ui } from "../content/ui";
import Media from "../components/Media";
import PendingNote from "../components/PendingNote";

export default function Company() {
  const locale = useLocale();

  return (
    <>
      <section className="section-tight">
        <div className="shell">
          <div className="section-head">
            <span className="label">{company.eyebrow[locale]}</span>
            <h1 className="display">{company.heading[locale]}</h1>
            <p className="lede">{company.lede[locale]}</p>
          </div>
          <figure className="page-media">
            <Media asset={company.media} sizes={sizes.fullWidth} />
          </figure>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="annotated">
            <span className="annotation">{company.eyebrow[locale]}</span>
            <div className="prose">
              {company.body[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell stack">
          <PendingNote title={company.pendingHeading[locale]}>
            {company.pending[locale]}
          </PendingNote>
          <Link className="button" to={routePath("contatti", locale)}>
            {ui.requestSample[locale]}
          </Link>
        </div>
      </section>
    </>
  );
}
