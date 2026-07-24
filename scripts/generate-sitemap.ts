#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parsePublicEnvironment } from "../src/config/environment";
import { getSitemapPaths } from "../src/config/routes";
import { workItems } from "../src/data/work";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDirectory = path.join(root, "public");
const { siteUrl } = parsePublicEnvironment({
  VITE_SITE_URL: process.env.VITE_SITE_URL ?? process.env.SITE_URL,
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

const urls = getSitemapPaths(workItems.map((item) => item.slug))
  .map(
    (routePath) =>
      `  <url>\n    <loc>${escapeXml(`${siteUrl}${routePath}`)}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

mkdirSync(publicDirectory, { recursive: true });
writeFileSync(path.join(publicDirectory, "sitemap.xml"), sitemap);
writeFileSync(path.join(publicDirectory, "robots.txt"), robots);
