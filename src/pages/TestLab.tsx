import { Link } from "react-router-dom";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { testlab } from "../content/pages";
import { sizes } from "../content/media";
import { ui } from "../content/ui";
import Media from "../components/Media";
import PendingNote from "../components/PendingNote";

export default function TestLab() {
  const locale = useLocale();

  return (
    <>
      <section className="section-tight">
        <div className="shell">
          <div className="section-head">
            <span className="label">{testlab.eyebrow[locale]}</span>
            <h1 className="display">{testlab.heading[locale]}</h1>
            <p className="lede">{testlab.lede[locale]}</p>
          </div>
          <figure className="page-media">
            <Media asset={testlab.media.extrusion} sizes={sizes.fullWidth} />
          </figure>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="annotated">
            <span className="annotation">{testlab.eyebrow[locale]}</span>
            <div className="prose">
              {testlab.body[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="split split-start">
            <figure className="page-media">
              <Media asset={testlab.media.sample} sizes={sizes.halfColumn} />
            </figure>
            <div className="stack">
              <h2 className="title">{testlab.sampleHeading[locale]}</h2>
              <p className="lede">{testlab.sampleBody[locale]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="detail-grid">
            <div className="stack">
              <span className="label">{testlab.requestHeading[locale]}</span>
              <ul className="spec-list">
                {testlab.requestList[locale].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="button" to={routePath("contatti", locale)}>
                {ui.requestSample[locale]}
              </Link>
            </div>
            <PendingNote>{testlab.pending[locale]}</PendingNote>
          </div>
        </div>
      </section>
    </>
  );
}
