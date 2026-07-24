import { useLocale } from "../lib/locale";
import { ui } from "../content/ui";

/** Shown while a route chunk loads. Announced, so the wait is not silent. */
export default function RouteFallback() {
  const locale = useLocale();

  return (
    <div className="route-status" role="status" aria-live="polite">
      {ui.loading[locale]}
    </div>
  );
}
