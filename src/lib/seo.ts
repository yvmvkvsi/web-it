import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { siteConfig } from "../config/site";

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
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

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

export function useSeo({
  title,
  description,
  image,
  noIndex = false,
}: SeoConfig) {
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = origin + pathname;
    const socialImage = image ?? siteConfig.defaultSocialImage;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", canonicalUrl);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", siteConfig.name);

    upsertMeta("name", "twitter:card", socialImage ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    if (socialImage) {
      const absoluteImage = new URL(socialImage, origin).toString();
      upsertMeta("property", "og:image", absoluteImage);
      upsertMeta("name", "twitter:image", absoluteImage);
    }
  }, [description, image, noIndex, pathname, title]);
}

export function useOrganizationJsonLd() {
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
      description: siteConfig.description,
      url: window.location.origin,
    });
  }, []);
}
