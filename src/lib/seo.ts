import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig, siteDescription } from "../config/site";
import { publicEnvironment } from "../config/environment";
import { localeTag, type Locale } from "../config/locales";
import { resolvePageMeta, type ResolvedPageMeta } from "./pageMeta";

const ALTERNATE_MARK = "data-locale-alternate";

/**
 * Whether this page may be indexed at all.
 *
 * Two independent conditions have to hold: the page must be indexable in
 * principle (the 404 never is), and the deployment must be the confirmed
 * production one. The environment flag defaults to false, so a preview or
 * temporary domain is excluded by omission rather than by remembering to
 * exclude it. See SOURCE_OF_TRUTH section 6.
 */
export function isIndexable(meta: ResolvedPageMeta, indexable: boolean) {
  return indexable && !meta.noIndex;
}

/** The `<meta name="robots">` value for a page. */
export const robotsValue = (indexed: boolean) =>
  indexed ? "index, follow" : "noindex, nofollow";

/**
 * Organization data, restricted to the three facts that are approved: legal
 * name, the one-line description of the business, and the site's own origin.
 *
 * Nothing else goes in here. `address`, `telephone`, `email`, `vatID` and
 * `sameAs` are exactly the properties a rich result would want, and every one
 * of them is unconfirmed — structured data is machine-readable, so an
 * unverified claim here propagates further than the same claim in prose.
 */
export function organizationJsonLd(locale: Locale) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    description: siteDescription[locale],
    url: publicEnvironment.siteUrl,
  });
}

export interface HeadTag {
  tag: "meta" | "link";
  attributes: Record<string, string>;
}

/**
 * The complete per-route head, as data.
 *
 * Both consumers build from this one list: the prerender script serialises it
 * into static HTML, and the browser applies it to `document.head` on every
 * client-side navigation. Deriving them separately is how a static head and a
 * hydrated head drift apart.
 */
export function headTagsFor(
  meta: ResolvedPageMeta,
  origin: string,
  indexable: boolean,
): HeadTag[] {
  const canonical = origin + meta.canonicalPath;
  const socialImage = siteConfig.defaultSocialImage;

  const tags: HeadTag[] = [
    { tag: "meta", attributes: { name: "description", content: meta.description } },
    {
      tag: "meta",
      attributes: {
        name: "robots",
        content: robotsValue(isIndexable(meta, indexable)),
      },
    },
    { tag: "link", attributes: { rel: "canonical", href: canonical } },

    { tag: "meta", attributes: { property: "og:title", content: meta.title } },
    {
      tag: "meta",
      attributes: { property: "og:description", content: meta.description },
    },
    { tag: "meta", attributes: { property: "og:type", content: "website" } },
    { tag: "meta", attributes: { property: "og:url", content: canonical } },
    {
      tag: "meta",
      attributes: { property: "og:site_name", content: siteConfig.name },
    },
    {
      tag: "meta",
      attributes: {
        property: "og:locale",
        content: localeTag[meta.locale].replace("-", "_"),
      },
    },

    {
      tag: "meta",
      attributes: {
        name: "twitter:card",
        // No `og-default` image exists: it depends on the official logo, which
        // has not been supplied (P-001). A `summary_large_image` card with no
        // image renders worse than a plain summary, so the card type follows
        // the asset rather than being asserted optimistically.
        content: socialImage ? "summary_large_image" : "summary",
      },
    },
    { tag: "meta", attributes: { name: "twitter:title", content: meta.title } },
    {
      tag: "meta",
      attributes: { name: "twitter:description", content: meta.description },
    },
  ];

  if (socialImage) {
    const absolute = new URL(socialImage, origin).toString();
    tags.push(
      { tag: "meta", attributes: { property: "og:image", content: absolute } },
      { tag: "meta", attributes: { name: "twitter:image", content: absolute } },
    );
  }

  for (const alternate of meta.alternates) {
    tags.push({
      tag: "link",
      attributes: {
        rel: "alternate",
        hreflang: alternate.hreflang,
        href: origin + alternate.path,
        [ALTERNATE_MARK]: "",
      },
    });
  }

  return tags;
}

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

function applyToDocument(tags: readonly HeadTag[]) {
  // Alternates are per-page, so one left over from the previous route would be
  // actively wrong rather than merely redundant. The whole set is replaced.
  document.head
    .querySelectorAll(`link[${ALTERNATE_MARK}]`)
    .forEach((element) => element.remove());

  for (const { tag, attributes } of tags) {
    if (tag === "meta") {
      const attribute = "name" in attributes ? "name" : "property";
      upsertMeta(attribute, attributes[attribute], attributes.content);
      continue;
    }

    if (attributes.rel === "canonical") {
      let element = document.head.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!element) {
        element = document.createElement("link");
        element.rel = "canonical";
        document.head.appendChild(element);
      }
      element.href = attributes.href;
      continue;
    }

    const element = document.createElement("link");
    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, value);
    }
    document.head.appendChild(element);
  }
}

/**
 * Applies the head for the current route.
 *
 * Called once, from the layout: the metadata is a function of the pathname, so
 * a page component has nothing to add, and eleven separate call sites would be
 * eleven chances to disagree with the sitemap.
 */
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = resolvePageMeta(pathname);
    document.documentElement.lang = localeTag[meta.locale];
    document.title = meta.title;

    applyToDocument(
      headTagsFor(meta, publicEnvironment.siteUrl, publicEnvironment.indexable),
    );

    const id = "organization-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = organizationJsonLd(meta.locale);
  }, [pathname]);
}
