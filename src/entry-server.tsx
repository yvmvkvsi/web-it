import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App, { type PageModules } from "./App";
import { publicEnvironment } from "./config/environment";
import { localeTag } from "./config/locales";
import { resolvePageMeta } from "./lib/pageMeta";
import { headTagsFor, organizationJsonLd, type HeadTag } from "./lib/seo";

import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Cookie from "./pages/Cookie";
import Home from "./pages/Home";
import Industries from "./pages/Industries";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import ProductCategory from "./pages/ProductCategory";
import Products from "./pages/Products";
import TestLab from "./pages/TestLab";

/** The same pages the browser lazy-loads, imported eagerly for one render pass. */
const modules: PageModules = {
  ProductCategory,
  NotFound,
  pages: {
    home: Home,
    prodotti: Products,
    testlab: TestLab,
    settori: Industries,
    azienda: Company,
    contatti: Contact,
    privacy: Privacy,
    cookie: Cookie,
  },
};

export interface RenderedPage {
  /** Markup for `#root`, ready to be hydrated by the client bundle. */
  html: string;
  /** Value for the `lang` attribute on `<html>`. */
  lang: string;
  title: string;
  /** Serialised `<head>` children for this route. */
  head: string;
}

const escapeAttribute = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeText = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const serialise = (tag: HeadTag) => {
  const attributes = Object.entries(tag.attributes)
    .map(([name, value]) =>
      value === "" ? name : `${name}="${escapeAttribute(value)}"`,
    )
    .join(" ");
  return `    <${tag.tag} ${attributes} />`;
};

/**
 * Render one route to static HTML.
 *
 * The head is built from the same `headTagsFor` the browser uses, so a crawler
 * that never executes JavaScript sees exactly the title, description, canonical
 * and hreflang set a hydrated visitor would.
 */
export function render(pathname: string): RenderedPage {
  const meta = resolvePageMeta(pathname);
  const tags = headTagsFor(
    meta,
    publicEnvironment.siteUrl,
    publicEnvironment.indexable,
  );

  const head = [
    ...tags.map(serialise),
    `    <script type="application/ld+json">${organizationJsonLd(meta.locale)}</script>`,
  ].join("\n");

  return {
    html: renderToString(
      <StaticRouter location={pathname}>
        <App modules={modules} />
      </StaticRouter>,
    ),
    lang: localeTag[meta.locale],
    title: escapeText(meta.title),
    head,
  };
}
