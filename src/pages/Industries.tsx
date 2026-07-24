import { Link } from "react-router-dom";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { useSeo } from "../lib/seo";
import { industries, industriesPage } from "../content/pages";
import { sizes } from "../content/media";
import { ui } from "../content/ui";
import Media from "../components/Media";
import PendingNote from "../components/PendingNote";

export default function Industries() {
  const locale = useLocale();

  useSeo({
    title: industriesPage.meta.title[locale],
    description: industriesPage.meta.description[locale],
  });

  return (
    <>
      <section className="section-tight">
        <div className="shell">
          <div className="section-head">
            <span className="label">{industriesPage.eyebrow[locale]}</span>
            <h1 className="display">{industriesPage.heading[locale]}</h1>
            <p className="lede">{industriesPage.lede[locale]}</p>
          </div>
        </div>
      </section>

      {industries.map((industry, index) => (
        <section
          key={industry.id}
          className={index === 0 ? "section-tight" : "section-tight section-line"}
        >
          <div className="shell">
            <div
              className={
                index % 2 === 0
                  ? "split split-start"
                  : "split split-start split-reverse"
              }
            >
              <figure className="page-media">
                <Media asset={industry.media} sizes={sizes.halfColumn} />
              </figure>
              {/* The mono label carries an index, not prose: set in uppercase
                  at 11px with wide tracking, a whole sentence there is
                  unreadable. The summary is a deck and is set as one. */}
              <div className="stack">
                <span className="label-plain">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(industries.length).padStart(2, "0")}
                </span>
                <h2 className="title">{industry.name[locale]}</h2>
                <p className="subtitle">{industry.summary[locale]}</p>
                <p className="lede">{industry.body[locale]}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="shell stack">
          <PendingNote>{industriesPage.pending[locale]}</PendingNote>
          <Link className="button" to={routePath("contatti", locale)}>
            {ui.requestSample[locale]}
          </Link>
        </div>
      </section>
    </>
  );
}
