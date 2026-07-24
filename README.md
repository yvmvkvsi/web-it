# Production Web Starter

A neutral React + TypeScript + Vite starter extracted from proven engineering
patterns in a production website, without carrying over its brand, copy, visual
composition, assets, fonts, colours or animation choreography.

## Included

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

- a brand identity or design system;
- custom fonts, branded colours, proprietary assets or page composition;
- motion, parallax, cinematic scenes or scroll choreography;
- a fake backend, database or email integration;
- analytics, consent or legal text selected without project requirements;
- secrets committed to the repository.

## Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Before launch, replace all placeholder metadata and content, set
`VITE_SITE_URL`, connect a secure lead endpoint, review legal requirements, and
run:

```bash
npm run verify
```

## Form security boundary

`ContactForm` can POST JSON to `VITE_LEAD_ENDPOINT`, but browser code cannot
provide real security. The server must independently validate and normalize
fields, reject the honeypot, rate-limit by appropriate signals, prevent replay
and duplicates, store leads durably, keep secrets server-side, and send
notifications without making email the only copy.

## Template use

Read [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) before adapting the starter.

The repository also includes a project governance system designed for work
shared between people and AI models:

- [project workflow](./docs/PROJECT_WORKFLOW.md);
- [Source of Truth](./docs/project/SOURCE_OF_TRUTH.md);
- [Pending Decisions](./docs/project/PENDING_DECISIONS.md);
- [current handoff](./docs/project/HANDOFF.md);
- [project changelog](./docs/project/CHANGELOG.md).

Every new product version uses a new `version/*` branch. Models implement work
only in isolated `sandbox/*` branches and merge through reviewed pull requests.
