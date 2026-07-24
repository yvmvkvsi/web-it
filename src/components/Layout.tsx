import { Outlet } from "react-router-dom";
import { useOrganizationJsonLd } from "../lib/seo";
import { useLocale } from "../lib/locale";
import Footer from "./Footer";
import Header from "./Header";

const skipLabel = {
  it: "Vai al contenuto principale",
  en: "Skip to main content",
};

export default function Layout() {
  const locale = useLocale();
  useOrganizationJsonLd();

  return (
    <>
      <a className="skip-link" href="#main">
        {skipLabel[locale]}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
