import { useLocale } from "../lib/locale";
import { useSeo } from "../lib/seo";
import type { PageMeta } from "../content/pages";
import type { Locale } from "../config/locales";
import PendingNote from "../components/PendingNote";

interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalContent {
  meta: PageMeta;
  eyebrow: Record<Locale, string>;
  heading: Record<Locale, string>;
  lede: Record<Locale, string>;
  sections: Record<Locale, readonly LegalSection[]>;
  pending?: Record<Locale, string>;
}

/** Shared layout for the privacy and cookie notices. */
export default function LegalPage({ content }: { content: LegalContent }) {
  const locale = useLocale();

  useSeo({
    title: content.meta.title[locale],
    description: content.meta.description[locale],
  });

  return (
    <section className="section-tight">
      <div className="shell">
        <div className="section-head">
          <span className="label">{content.eyebrow[locale]}</span>
          <h1 className="title">{content.heading[locale]}</h1>
          <p className="lede">{content.lede[locale]}</p>
        </div>

        <div className="stack">
          {content.sections[locale].map((section) => (
            <div className="annotated" key={section.heading}>
              <h2 className="annotation">{section.heading}</h2>
              <div className="prose">
                <p>{section.body}</p>
              </div>
            </div>
          ))}

          {content.pending ? (
            <PendingNote>{content.pending[locale]}</PendingNote>
          ) : null}
        </div>
      </div>
    </section>
  );
}
