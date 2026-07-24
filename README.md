# Damon S.r.l. website

The bilingual catalogue site for Damon S.r.l., a B2B distributor of raw
materials to plastics converters in Southern Italy. Italian is served from the
site root, English under `/en/`. The site exists to be found in organic search
and to generate sample requests.

Approved scope, routes, design constraints and release criteria live in
[Source of Truth](./docs/project/SOURCE_OF_TRUTH.md). It is canonical: if this
README ever conflicts with it, that file wins.

The codebase began as a neutral React + TypeScript + Vite starter extracted from
proven engineering patterns, carrying over none of the source project's brand,
copy, visual composition, assets, fonts, colours or motion choreography.

## Engineering foundation

- strict TypeScript;
- one typed route registry driving navigation, routing, sitemap and prerender;
- build-time prerendering: one static HTML file per published route;
- per-route metadata resolved by a pure function of the pathname, shared by the
  prerender and the browser so the two heads cannot diverge;
- canonical URLs, reciprocal `hreflang`, Open Graph, Twitter and JSON-LD;
- fail-closed indexability: `VITE_SITE_INDEXABLE` defaults to false;
- Back/Forward scroll restoration keyed by browser history entry;
- responsive image contract with required intrinsic dimensions;
- accessible skip link, semantic navigation, focus treatment and form status;
- explicit client/server boundary for lead forms;
- typecheck, lint, unit tests, build and CI through `npm run verify`.

## Deliberately not included

- an online shop, cart, payment or customer accounts;
- a CMS;
- published pricing;
- decorative or cinematic motion — parallax, scroll hijacking, pinned
  storytelling and continuous movement are prohibited. Restrained functional
  interface motion is approved and specified in Source of Truth section 5;
- a fake backend, database or email integration;
- secrets committed to the repository.

## Start

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Use `npm ci`, not `npm install`: an out-of-date `node_modules` fails the build
on the self-hosted font imports.

`VITE_SITE_URL` must be set per environment; it drives canonical URLs and the
sitemap. `VITE_LEAD_ENDPOINT` stays empty until a real endpoint exists — while
it is empty the sample-request form refuses to submit and says so.
`VITE_SITE_INDEXABLE` defaults to false and must stay false on every preview
and temporary domain; only the confirmed production environment may set it to
true, and only with the confirmed production domain and release approval.

Before any release, run:

```bash
npm run verify   # typecheck, lint, tests, production build
```

## Build and preview

`npm run build` runs four steps in order: sitemap generation, the client build,
an SSR build of `src/entry-server.tsx`, and the prerender. The prerender writes
one `index.html` per published route plus a `404.html`, then deletes the server
bundle — it is a build artefact and is not deployed.

```bash
npm run build
npm run preview   # serves dist/ the way a static host would
```

`vite preview` is configured to resolve each request against the build output
and return `404.html` with a real 404 for anything unmatched, rather than
falling back to the home page. That makes the hosting contract verifiable
locally.

## Hosting contract

The build output is static. A host must:

- resolve a directory to its `index.html` (`/azienda` → `/azienda/index.html`);
- serve `404.html` with a 404 status for anything unmatched.

It must **not** rewrite every path to `/index.html`. That answers unknown URLs
with the home page at status 200, turning each one into a duplicate of the home
page and discarding the prerendering. `vercel.json` configures the static
behaviour and deliberately carries no SPA rewrite.

## Localisation

Italian is served from the site root and English under `/en`. The locale is
derived from the pathname and from nothing else — there is no cookie, no
storage and no redirect. `src/config/routes.ts` is the single registry of route
strings per locale, and navigation, the language switcher, canonical URLs,
`hreflang`, the sitemap and the prerender all read from it. Changing a route
string there changes all of them together.

Copy lives in `src/content/` as typed records keyed by locale, so a missing
translation is a type error rather than a blank page.

## Form security boundary

`ContactForm` can POST JSON to `VITE_LEAD_ENDPOINT`, but browser code cannot
provide real security. The server must independently validate and normalize
fields, reject the honeypot, rate-limit by appropriate signals, prevent replay
and duplicates, store leads durably, keep secrets server-side, and send
notifications without making email the only copy.

## Project governance

Work is shared between people and AI models and is governed by:

- [project workflow](./docs/PROJECT_WORKFLOW.md);
- [Source of Truth](./docs/project/SOURCE_OF_TRUTH.md);
- [Pending Decisions](./docs/project/PENDING_DECISIONS.md);
- [current handoff](./docs/project/HANDOFF.md);
- [project changelog](./docs/project/CHANGELOG.md);
- [image asset specification](./docs/assets.md).

Every product version uses a new `version/*` branch. Models implement work only
in isolated `sandbox/*` branches and merge through reviewed pull requests. No
development happens directly on `main` or on an active `version/*` branch.

The starter's own adaptation notes are retained in
[TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md).
