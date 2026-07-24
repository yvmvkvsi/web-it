#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parsePublicEnvironment } from "../src/config/environment";
import { getSitemapEntries } from "../src/config/routes";
import { localeTag } from "../src/config/locales";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(root, "public");
const { siteUrl, indexable } = parsePublicEnvironment({
  VITE_SITE_URL: process.env.VITE_SITE_URL ?? process.env.SITE_URL,
  VITE_SITE_INDEXABLE: process.env.VITE_SITE_INDEXABLE,
});

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });

const urls = getSitemapEntries()
  .map((entry) => {
    const alternates = entry.alternates
      .map(
        ({ locale, path: alternatePath }) =>
          `    <xhtml:link rel="alternate" hreflang="${localeTag[locale]}" href="${escapeXml(
            `${siteUrl}${alternatePath}`,
          )}" />`,
      )
      .join("\n");

    return [
      "  <url>",
      `    <loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc>`,
      alternates,
      "    <changefreq>monthly</changefreq>",
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;

// A non-indexable deployment must not invite crawlers at all. Emitting a
// permissive robots.txt on a preview domain is how staging copies get indexed.
const robots = indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`;

mkdirSync(publicDirectory, { recursive: true });
writeFileSync(path.join(publicDirectory, "sitemap.xml"), sitemap);
writeFileSync(path.join(publicDirectory, "robots.txt"), robots);
