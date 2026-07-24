import { useLocale } from "../lib/locale";
import { useSeo } from "../lib/seo";
import { contact } from "../content/pages";
import ContactForm from "../components/ContactForm";
import PendingNote from "../components/PendingNote";

export default function Contact() {
  const locale = useLocale();

  useSeo({
    title: contact.meta.title[locale],
    description: contact.meta.description[locale],
  });

  return (
    <section className="section-tight">
      <div className="shell">
        <div className="section-head">
          <span className="label">{contact.eyebrow[locale]}</span>
          <h1 className="display">{contact.heading[locale]}</h1>
          <p className="lede">{contact.lede[locale]}</p>
        </div>

        <div className="contact-layout">
          <PendingNote title={contact.detailsHeading[locale]}>
            {contact.pending[locale]}
          </PendingNote>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
