import { useSeo } from "../lib/seo";
import { siteConfig } from "../config/site";

export default function Home() {
  useSeo({
    title: siteConfig.name,
    description: siteConfig.description,
  });

  return (
    <section className="section hero">
      <div className="shell">
        <h1>{siteConfig.name}</h1>
        <p className="lede">{siteConfig.description}</p>
      </div>
    </section>
  );
}
