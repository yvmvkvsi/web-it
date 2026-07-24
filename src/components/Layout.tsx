import { Outlet } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { useLocale } from "../lib/locale";
import { ui } from "../content/ui";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const locale = useLocale();
  // One call for the whole app: the head is a function of the pathname.
  useSeo();

  return (
    <>
      <a className="skip-link" href="#main">
        {ui.skipToContent[locale]}
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
