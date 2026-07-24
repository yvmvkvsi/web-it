import { useLocale } from "../lib/locale";
import { products } from "../content/pages";
import FamilyGrid from "../components/FamilyGrid";
import PendingNote from "../components/PendingNote";

export default function Products() {
  const locale = useLocale();

  return (
    <>
      <section className="section-tight">
        <div className="shell">
          <div className="section-head">
            <span className="label">{products.eyebrow[locale]}</span>
            <h1 className="display">{products.heading[locale]}</h1>
            <p className="lede">{products.lede[locale]}</p>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <FamilyGrid />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <PendingNote>{products.pending[locale]}</PendingNote>
        </div>
      </section>
    </>
  );
}
