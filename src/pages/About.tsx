import { useSeo } from "../lib/seo";

export default function About() {
  useSeo({
    title: "About — Production Web Starter",
    description: "Replace this page with verified company information.",
  });

  return (
    <section className="section page-intro">
      <div className="shell narrow">
        <p className="eyebrow">About</p>
        <h1>Verified company story goes here.</h1>
        <p className="lede">
          Keep factual business content separate from layout components so it can be
          reviewed, translated and replaced without redesigning the page.
        </p>
      </div>
    </section>
  );
}
