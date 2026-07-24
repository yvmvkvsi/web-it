import { Link } from "react-router-dom";
import { routePath } from "../config/routes";
import { useLocale } from "../lib/locale";
import { useSeo } from "../lib/seo";

const copy = {
  it: {
    title: "Pagina non trovata",
    description: "La pagina richiesta non esiste.",
    heading: "Pagina non trovata.",
    action: "Torna alla home",
  },
  en: {
    title: "Page not found",
    description: "The requested page was not found.",
    heading: "Page not found.",
    action: "Return home",
  },
};

export default function NotFound() {
  const locale = useLocale();
  const text = copy[locale];

  useSeo({
    title: text.title,
    description: text.description,
    noIndex: true,
  });

  return (
    <section className="section page-intro">
      <div className="shell narrow">
        <p className="eyebrow">404</p>
        <h1>{text.heading}</h1>
        <Link className="button" to={routePath("home", locale)}>
          {text.action}
        </Link>
      </div>
    </section>
  );
}
