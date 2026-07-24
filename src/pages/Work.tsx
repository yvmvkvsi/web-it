import { Link } from "react-router-dom";
import ResponsiveImage from "../components/ResponsiveImage";
import { buildRoutePath } from "../config/routes";
import { workItems } from "../data/work";
import { useSeo } from "../lib/seo";

export default function Work() {
  useSeo({
    title: "Work",
    description: "Data-driven collection.",
  });

  return (
    <section className="section page-intro">
      <div className="shell">
        <p className="eyebrow">Work</p>
        <h1>Work</h1>
        <div className="work-grid">
          {workItems.map((item) => (
            <article key={item.slug} className="work-card">
              <ResponsiveImage
                src={item.image}
                alt={item.imageAlt}
                width={1600}
                height={900}
              />
              <div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <Link to={buildRoutePath("work-item", { slug: item.slug })}>
                  View item
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
