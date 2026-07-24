# Project Changelog

Record approved releases and meaningful governance changes here. Do not use this
file as a daily activity log.

## Unreleased — v1.0

### Baseline

- Opened version v1.0. Branch `version/v1.0` created from
  `c487604328bd7854717c9e2a397429b48cba4506`, the merge of PR #2 on `main`.
  Development proceeds only on `sandbox/<model>/v1.0/<task>` branches merged
  into `version/v1.0` through reviewed pull requests.

### Added

- **PR #1** — asset foundation. Approved Damon plastics image assets created,
  unrelated starter and cross-project content removed, and the asset
  specification corrected. Merged at `edc3a21`.
- **PR #2** — project definition. The initial Damon project scope recorded in
  the governance documents. Merged at `c487604`.
- **PR #3** — governance alignment. Governance documents and project metadata
  aligned for v1.0. Merged at `cc850f4`.

- **Bilingual routing and localisation integrated.** The approved route
  registry, locale detection, locale-aware navigation, language switching,
  `hreflang` and canonical behaviour, sitemap generation and the fail-closed
  `VITE_SITE_INDEXABLE` contract are in place. `referenze` stays unpublished:
  absent from navigation and the sitemap, with no static file, resolving to the
  404 page in both locales.

- **Design system and site shell.** The approved graphite palette, IBM Plex Sans
  and Mono self-hosted, the mono label as the structural device, an asymmetric
  annotated grid, a sticky header with an accessible mobile panel, a language
  switcher and a footer. Motion is functional only and collapses under
  `prefers-reduced-motion`.

- **All approved public pages, in both locales.** Home, products overview, six
  product-category pages from one parameterised implementation, TestLab,
  industries, company, contact, privacy, cookie and 404.

- **All fourteen approved assets wired** through a responsive image contract:
  AVIF, then WebP, then JPEG, with honest on-disk widths, intrinsic dimensions,
  localised alternative text, an eager high-priority hero and lazy loading
  everywhere else.

- **Sample-request form, fail-closed.** The complete accessible form, validation
  model, honeypot and privacy acknowledgement. With no configured endpoint it
  disables its fields, explains that nothing would be delivered, issues no
  request and never reports success.

- **Prerendering.** Every published route is rendered to its own static
  `index.html` at build time using the project's existing React and Vite setup
  and no added dependency — 28 route files plus `404.html`. Per-route metadata
  is resolved by one pure function shared by the prerender and the browser, so
  the static and hydrated heads cannot diverge.

- **Test suite expanded from 12 tests to 82**, covering the route registry and
  locale mapping, metadata and reciprocal `hreflang`, the indexability contract,
  validation in both languages, the form's fail-closed state, navigation state,
  page rendering, asset wiring, and the absence of any unconfirmed company fact
  in rendered output.

### Fixed

- **Unknown URLs no longer answer with the home page.** The SPA rewrite in
  `vercel.json` returned the home page's HTML at status 200 for every unmatched
  path, making each mistyped URL a duplicate of the home page. Static hosting
  now serves each prerendered route from its own file and `404.html` with a
  real 404 status for anything else. `vite preview` was made to behave the same
  way so the contract is verifiable locally.
- **The mobile navigation panel rendered at zero height.** `backdrop-filter` on
  the sticky header established a containing block for fixed-position
  descendants, trapping the panel inside the header's box.
- Dead vertical space beneath any heading that was the whole of its section.
- An inert label rule that ran "Telefono" into "facoltativo" and left the field
  labels unstyled.
- A privacy-notice link visually indistinguishable from the text around it.
- Two touch targets below the 24px minimum of WCAG 2.2 SC 2.5.8.
- A `fetchPriority` prop React 18 does not map, which warned on every render.
- A hairline-coloured label that failed text contrast, a whole sentence set as
  an 11px uppercase mono label, and a `starter:` key left in `sessionStorage`.

### Changed

- **Route contract approved.** The bilingual route strings implemented on
  `sandbox/claude/v1/localisation` are approved: Italian at the site root,
  English under `/en/`, `/prodotti` and `/en/products` with six localised
  product-category paths, `/testlab`, `/settori` and `/en/industries`,
  `/azienda` and `/en/company`, `/contatti` and `/en/contact`, `/referenze` and
  `/en/references`. The references section stays `published: false` until named
  clients and written permissions exist. This closes P-006; the contract is
  recorded in `SOURCE_OF_TRUTH.md` section 4.
- **Motion policy amended.** The blanket prohibition on motion is replaced by an
  approved policy permitting restrained functional interface motion — slides and
  carousels, menus, accordions and disclosures, hover, focus, press and
  selection feedback, form-state transitions, and restrained content-state and
  page transitions. Parallax, scroll hijacking, cinematic scroll choreography,
  pinned storytelling, continuous decorative movement, distracting autoplay,
  excessive repeated reveals and motion copied from another project remain
  prohibited. Every implementation must honour `prefers-reduced-motion`.

### Documentation

- Recorded the `VITE_SITE_INDEXABLE` indexability contract: the flag defaults to
  false and fails closed; preview and temporary deployments must emit `noindex`
  and disallow crawling; only the confirmed production environment may set it to
  true, and only with the confirmed production domain and release approval.
- Project identity metadata moved off the starter: README retitled to the Damon
  website project and the package renamed `damon-website`.

### Governance

- Added branch-per-version development, isolated model sandboxes and the
  Source/Pending/Handoff documentation workflow.

<!--
Release example:

## [1.1.0] - YYYY-MM-DD

### Added

- User-visible or operational capability.

### Changed

- Meaningful approved behaviour or architecture change.

### Fixed

- Production-impacting correction.

### Documentation

- Material Source of Truth decision or workflow change.

### Baseline

- Version branch: `version/v1.1`
- Release commit: `<sha>`
- Production deployment: `<url or deployment id>`
-->
