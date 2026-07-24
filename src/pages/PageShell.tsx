import { useLocale } from "../lib/locale";
import { useSeo } from "../lib/seo";
import { getRoute, type RouteId } from "../config/routes";
import { siteConfig } from "../config/site";

export interface PageShellProps {
  routeId: RouteId;
}

/**
 * Neutral shell for a route whose content has not been approved yet.
 * It renders the route label and nothing else on purpose: inventing copy for
 * this business is explicitly out of scope until the owner supplies it.
 */
export default function PageShell({ routeId }: PageShellProps) {
  const locale = useLocale();
  const route = getRoute(routeId);
  const label = route.labels[locale];

  useSeo({
    title: `${label} — ${siteConfig.name}`,
    description: siteConfig.description,
  });

  return (
    <section className="section">
      <div className="shell">
        <h1>{label}</h1>
      </div>
    </section>
  );
}
