import ContactForm from "../components/ContactForm";
import { useSeo } from "../lib/seo";

export default function Contact() {
  useSeo({
    title: "Contact — Production Web Starter",
    description: "Example contact page with an explicit server integration boundary.",
  });

  return (
    <section className="section page-intro">
      <div className="shell two-column align-start">
        <div>
          <p className="eyebrow">Contact</p>
          <h1>Connect a real lead endpoint before launch.</h1>
          <p className="lede">
            The browser form is only the client. Validation, rate limiting, spam
            protection, storage and notifications belong on the server.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
