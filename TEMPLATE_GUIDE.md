# Template adaptation guide

## Non-negotiable engineering contracts

1. `src/config/routes.ts` remains the canonical source for public paths,
   navigation placement and sitemap inclusion.
2. Published routes must have a lazy page mapping in `src/App.tsx`.
3. Dynamic content routes must be generated from verified data, not duplicated
   by hand in the sitemap script.
4. Images must have useful alt text plus intrinsic width and height. Add
   responsive sources when the project has real variants.
5. Back/Forward navigation must restore the previous position; normal route
   navigation starts at the top.
6. Public environment values are validated. Secrets never use `VITE_` and never
   enter browser code.
7. A green build is not enough: `npm run verify` is the minimum local and CI gate.
8. Direct URLs and reloads must be smoke-tested on Preview, not only localhost.

## Replace for every project

- `src/config/site.ts`;
- all page copy and example records in `src/data`;
- neutral CSS tokens and layout;
- static metadata in `index.html`;
- placeholder SVG media;
- legal and privacy content;
- `VITE_SITE_URL`;
- the lead endpoint and its actual server implementation.

## Do not reintroduce accidentally

- another project's fonts, colour values, assets or component names;
- copied page order or visual composition presented as an original design;
- motion code before the new project has explicitly designed its own motion
  language;
- client-side-only validation presented as security;
- unverified claims, prices, addresses, awards or contact details.

## Recommended delivery sequence

1. Read `AGENTS.md` and `docs/PROJECT_WORKFLOW.md`.
2. Fill in `docs/project/SOURCE_OF_TRUTH.md` with the approved project baseline.
3. Put unresolved material questions in
   `docs/project/PENDING_DECISIONS.md`.
4. Create the first version branch, normally `version/v1.0`.
5. Create one isolated `sandbox/<model>/v1.0/<task>` branch per bounded task.
6. Confirm scope, routes, content model and launch requirements.
7. Replace neutral content and design tokens.
8. Build pages from the registry and verified data.
9. Connect server-side lead handling and abuse protection.
10. Add analytics, consent, SEO and legal requirements for the actual market.
11. Run accessibility, responsive, browser and direct-route checks.
12. Run `npm run verify`, deploy Preview, smoke-test, then merge the approved
    version into `main`.

## Project control

- Never build a new version on the previous version's working branch.
- Never let a model work directly on `main` or a shared version branch.
- Keep one current Source of Truth and one current Pending Decisions file.
- Update Source and Pending together when a decision is approved.
- Use the handoff as a factual continuation note, not as a second Source of
  Truth.
- Keep task backlogs in issues or a task tracker, not in Pending Decisions.
- Preserve approved version commits as rollback baselines.

See [docs/PROJECT_WORKFLOW.md](./docs/PROJECT_WORKFLOW.md) for the complete
branch, documentation and release protocol.
