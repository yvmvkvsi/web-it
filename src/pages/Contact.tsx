import ContactForm from "../components/ContactForm";
import { useSeo } from "../lib/seo";

export default function Contact() {
  useSeo({
    title: "Contact",
    description: "Contact the company.",
  });

  return (
    <section className="section page-intro">
      <div className="shell two-column align-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Contact</h1>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
