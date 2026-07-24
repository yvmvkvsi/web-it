#!/usr/bin/env node
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getSitemapPaths } from "../src/config/routes";

/**
 * Writes one static HTML file per published route.
 *
 * SOURCE_OF_TRUTH section 6 requires static HTML per route: the business
 * outcome is organic search, and a client-only render asks every crawler to
 * execute JavaScript before it sees a title. This does not turn the project
 * into a different framework — it renders the existing React tree once at
 * build time and leaves the client bundle to hydrate it.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle).
 */
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDirectory = path.join(root, "dist");
const serverDirectory = path.join(root, "dist-ssr");

const template = readFileSync(path.join(clientDirectory, "index.html"), "utf8");

const { render } = (await import(
  path.join(serverDirectory, "entry-server.js")
)) as typeof import("../src/entry-server");

/**
 * Every route the sitemap advertises, plus the 404. `getSitemapPaths` already
 * excludes unpublished routes, so `referenze` gets no file — an unpublished
 * route must not exist as static HTML either.
 */
const paths = getSitemapPaths();

const outputFileFor = (pathname: string) =>
  pathname === "/"
    ? path.join(clientDirectory, "index.html")
    : path.join(clientDirectory, pathname.replace(/^\//, ""), "index.html");

let written = 0;

for (const pathname of paths) {
  const page = render(pathname);

  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, page.head.trim())
    .replace("<!--app-html-->", page.html);

  const file = outputFileFor(pathname);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
  written += 1;
}

/**
 * The SPA fallback, served for any URL with no static file — a mistyped path,
 * or a deep link the host does not resolve to a directory index. It renders
 * the 404 page and is `noindex` regardless of environment.
 */
const notFound = render("/__not-found__");
writeFileSync(
  path.join(clientDirectory, "404.html"),
  template
    .replace(/<html lang="[^"]*">/, `<html lang="${notFound.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${notFound.title}</title>`)
    .replace(/<!--app-head-->[\s\S]*?<!--\/app-head-->/, notFound.head.trim())
    .replace("<!--app-html-->", notFound.html),
);

// The server bundle is a build artefact, not something to deploy.
rmSync(serverDirectory, { recursive: true, force: true });

console.log(`prerendered ${written} routes + 404.html`);
