import { Link, useParams } from "react-router-dom";
import ResponsiveImage from "../components/ResponsiveImage";
import { getRoute } from "../config/routes";
import { getWorkItem } from "../data/work";
import { useSeo } from "../lib/seo";

export default function WorkItem() {
  const { slug = "" } = useParams();
  const item = getWorkItem(slug);

  useSeo({
    title: item ? `${item.title} — Production Web Starter` : "Not found",
    description: item?.summary ?? "The requested work item was not found.",
    noIndex: !item,
  });

  if (!item) {
    return (
      <section className="section page-intro">
        <div className="shell narrow">
          <h1>Work item not found.</h1>
          <Link to={getRoute("work").path}>Return to work</Link>
        </div>
      </section>
    );
  }

  return (
    <article className="section page-intro">
      <div className="shell narrow">
        <p className="eyebrow">Work item</p>
        <h1>{item.title}</h1>
        <p className="lede">{item.summary}</p>
        <ResponsiveImage
          src={item.image}
          alt={item.imageAlt}
          width={1600}
          height={900}
        />
      </div>
    </article>
  );
}
