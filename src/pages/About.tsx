import { useSeo } from "../lib/seo";

export default function About() {
  useSeo({
    title: "About",
    description: "About the company.",
  });

  return (
    <section className="section page-intro">
      <div className="shell narrow">
        <p className="eyebrow">About</p>
        <h1>About</h1>
      </div>
    </section>
  );
}
