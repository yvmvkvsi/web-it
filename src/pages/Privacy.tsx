import { useSeo } from "../lib/seo";

export default function Privacy() {
  useSeo({
    title: "Privacy — Production Web Starter",
    description: "Replace this placeholder with counsel-approved privacy information.",
  });

  return (
    <section className="section page-intro">
      <div className="shell narrow prose">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy policy placeholder.</h1>
        <p>
          Do not publish this placeholder. Document what is collected, why it is
          collected, where it is stored, who receives it and how a person can request
          access or deletion.
        </p>
      </div>
    </section>
  );
}
