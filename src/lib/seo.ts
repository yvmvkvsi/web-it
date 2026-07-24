import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig, siteDescription } from "../config/site";
import { publicEnvironment } from "../config/environment";
import { defaultLocale, localeTag, locales } from "../config/locales";
import { counterpartPath, useLocale } from "./locale";

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

const ALTERNATE_MARK = "data-locale-alternate";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

/**
 * Replace the hreflang set wholesale on every navigation. Alternates are
 * per-page, so stale ones from the previous route would be wrong rather than
 * merely redundant.
 */
function replaceAlternates(entries: ReadonlyArray<{ hreflang: string; href: string }>) {
  document.head
    .querySelectorAll(`link[${ALTERNATE_MARK}]`)
    .forEach((element) => element.remove());

  for (const { hreflang, href } of entries) {
    const element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = hreflang;
    element.href = href;
    element.setAttribute(ALTERNATE_MARK, "");
    document.head.appendChild(element);
  }
}

export function useSeo({ title, description, image, noIndex = false }: SeoConfig) {
  const { pathname } = useLocation();
  const locale = useLocale();

  useEffect(() => {
    const origin = publicEnvironment.siteUrl;
    const canonicalUrl = origin + pathname;
    const socialImage = image ?? siteConfig.defaultSocialImage;

    // A non-indexable environment (any preview or temporary domain) must never
    // be crawled: an indexed staging copy competes with production for the
    // same queries.
    const blockIndexing = noIndex || !publicEnvironment.indexable;

    document.documentElement.lang = localeTag[locale];
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      blockIndexing ? "noindex, nofollow" : "index, follow",
    );
    upsertLink("canonical", canonicalUrl);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", siteConfig.name);
    upsertMeta("property", "og:locale", localeTag[locale].replace("-", "_"));

    upsertMeta("name", "twitter:card", socialImage ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (socialImage) {
      const absoluteImage = new URL(socialImage, origin).toString();
      upsertMeta("property", "og:image", absoluteImage);
      upsertMeta("name", "twitter:image", absoluteImage);
    }

    const alternates = locales.map((candidate) => ({
      hreflang: localeTag[candidate],
      href: origin + counterpartPath(pathname, candidate),
    }));

    replaceAlternates([
      ...alternates,
      {
        hreflang: "x-default",
        href: origin + counterpartPath(pathname, defaultLocale),
      },
    ]);
  }, [description, image, locale, noIndex, pathname, title]);
}

/**
 * Organization data, restricted to the three facts that are approved: legal
 * name, the one-line description of the business, and the site's own origin.
 *
 * Nothing else goes in here. `address`, `telephone`, `email`, `vatID` and
 * `sameAs` are exactly the properties a rich result would want, and every one
 * of them is unconfirmed — structured data is machine-readable, so an
 * unverified claim here propagates further than the same claim in prose.
 */
export function useOrganizationJsonLd() {
  const locale = useLocale();

  useEffect(() => {
    const id = "organization-jsonld";
    let element = document.getElementById(id) as HTMLScriptElement | null;
    if (!element) {
      element = document.createElement("script");
      element.id = id;
      element.type = "application/ld+json";
      document.head.appendChild(element);
    }

    element.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.legalName,
      description: siteDescription[locale],
      url: publicEnvironment.siteUrl,
    });
  }, [locale]);
}
