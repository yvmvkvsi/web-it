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
