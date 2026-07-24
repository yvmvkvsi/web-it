import { Outlet } from "react-router-dom";
import { useOrganizationJsonLd } from "../lib/seo";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  useOrganizationJsonLd();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
