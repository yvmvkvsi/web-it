import { useSeo } from "../lib/seo";

export default function Privacy() {
  useSeo({
    title: "Privacy",
    description: "Privacy information.",
    noIndex: true,
  });

  return (
    <section className="section page-intro">
      <div className="shell narrow prose">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy</h1>
      </div>
    </section>
  );
}
