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
- one typed route registry for navigation, lazy pages and sitemap generation;
- direct SPA routes and reload support on Vercel;
- Back/Forward scroll restoration keyed by browser history entry;
- route-level metadata, canonical URLs, Open Graph, Twitter and JSON-LD helpers;
- responsive image contract with required intrinsic dimensions;
- data-driven dynamic routes;
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
npm install
npm run dev
```

`VITE_SITE_URL` must be set per environment. `VITE_SITE_INDEXABLE` defaults to
false and must stay false on every preview and temporary domain; only the
confirmed production environment may set it to true. Before any release, run:

```bash
npm run verify
```

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
