# Source of Truth

**Project:** Damon S.r.l. website
**Document status:** canonical
**Last approved update:** 2026-07-25
**Current stable version:** v0.1 (foundation, merged to `main`)
**Active version:** v1.0

This file contains only approved current facts and decisions. If it conflicts
with Pending, Handoff or older chat, this file wins unless the project owner has
explicitly issued a newer decision.

Everything still unresolved lives in `PENDING_DECISIONS.md` and must not be
restated here as though it were settled.

### Provenance markers

Facts in this file carry one of two levels of confidence. The distinction is
load-bearing and must be preserved by anyone editing this document.

- **[approved]** — explicitly decided by Egor or the business owner.
- **[source]** — read off the previous site (damonsrl.com) or the repository.
  That site's content has not been updated since December 2022. Nothing marked
  `[source]` may be published as a claim until the owner confirms it.

## 1. Project identity and outcome

- **Product** — bilingual catalogue site for a B2B distributor of raw materials
  to plastics converters, built to be found in organic search and to generate
  sample requests. Not a brochure site. [approved]
- **Primary user** — technical buyer or process engineer at a plastics converter
  in Southern Italy: injection moulding, film extrusion, blow moulding. One
  segment, deliberately not "everyone". [approved]
- **Business outcome** — a measurable flow of sample requests originating from
  organic search on Italian product and certification queries. [approved]
- **Canonical production URL** — not decided. See P-002.
- **Repository** — `https://github.com/yvmvkvsi/web-it`

  The project handoff document states `yvmvksi/web-it`, which does not resolve.
  The address above is the working one.

## 2. Current baseline

- Stable branch: `main`
- Stable commit: `c487604328bd7854717c9e2a397429b48cba4506`
- Active version branch: `version/v1.0`, at `cc850f4` (merge of PR #3)
- Implementation branch: `sandbox/claude/v1.0/complete-site`
- Local working path: not fixed. The repository is the only authority; the
  project has been worked on from more than one machine and any path recorded
  here goes stale. Clone fresh and run `npm ci`.
- Preview environment: temporary domain, not yet specified. See P-002.
- Production environment: not provisioned.

Merged pull requests:

- **PR #1** — `sandbox/opus/foundation/cleanup-and-plastics-assets`, merged at
  `edc3a21`. Delivered the plastics image assets, removed unrelated starter and
  cross-project content, and corrected the asset specification.
- **PR #2** — `sandbox/claude/foundation/project-definition`, merged at
  `c487604`. Recorded the initial Damon project definition.
- **PR #3** — `sandbox/claude/v1.0/governance`, merged at `cc850f4`. Aligned the
  governance documents and project metadata for v1.0.

`sandbox/claude/v1/localisation` has been integrated into the implementation
branch. Its bilingual route registry and localisation infrastructure are in
place and its route contract is preserved exactly as recorded in section 4.

## 3. Approved scope

### Included in v1

- Italian and English. [approved]
- Home, azienda, product index and six product category pages, TestLab,
  contatti, privacy, cookie policy. [approved]
- Sample-request form. [approved]
- Company registration details in the footer. [approved]
- Redirect map from the previous site's URLs, applied at domain cutover.
  [approved]

### Should-have

- Industry pages (`settori`).
- Certifications page, gated on evidence. See P-004.

### Non-goals

- Online shop, cart, payment, customer accounts. [approved]
- CMS. [approved]
- Published pricing. [approved]
- Decorative and cinematic motion. Functional interface motion is permitted;
  see section 5. [approved]

## 4. Users, routes and content

- **Primary user journey** — organic search on a grade or certification →
  product category page → compatibility table → sample request. The homepage is
  not part of this path; it serves visitors who already know the company.
  [approved]
- **Supported languages** — Italian at the site root, English under `/en/`.
  `hreflang` and a localised sitemap are required. [approved]
- **Route registry** — `src/config/routes.ts` remains the single source for
  navigation and sitemap generation.
- **Approved route contract** — the route strings below are approved as
  implemented on `sandbox/claude/v1/localisation`. [approved 2026-07-25,
  closes P-006] Italian is served from the site root without a prefix; the
  English tree is served under the `/en` prefix. Paths carry no trailing slash,
  so the English home page is `/en`.

  | Route id | Italian | English |
  |---|---|---|
  | `home` | `/` | `/en` |
  | `prodotti` | `/prodotti` | `/en/products` |
  | `prodotti-masterbatch` | `/prodotti/masterbatch` | `/en/products/masterbatch` |
  | `prodotti-polimeri` | `/prodotti/polimeri` | `/en/products/polymers` |
  | `prodotti-biopolimeri` | `/prodotti/biopolimeri` | `/en/products/biopolymers` |
  | `prodotti-additivi` | `/prodotti/additivi` | `/en/products/additives` |
  | `prodotti-compound` | `/prodotti/compound` | `/en/products/compounds` |
  | `prodotti-rigenerati` | `/prodotti/rigenerati` | `/en/products/recycled` |
  | `testlab` | `/testlab` | `/en/testlab` |
  | `settori` | `/settori` | `/en/industries` |
  | `azienda` | `/azienda` | `/en/company` |
  | `contatti` | `/contatti` | `/en/contact` |
  | `referenze` | `/referenze` | `/en/references` |
  | `privacy` | `/privacy` | `/en/privacy` |
  | `cookie` | `/cookie` | `/en/cookie` |

  Changing an approved route string after implementation requires a new owner
  decision, because the strings feed navigation, canonical tags, `hreflang` and
  the sitemap.

- **References route** — the former `work` route is renamed `referenze` /
  `references` and holds client case studies, not product records. It stays
  `published: false` — absent from navigation and from the sitemap — until named
  clients and written permission from each of them exist. [approved]
- **Content ownership** — Claude drafts the Italian copy; the business owner
  reviews and corrects it. [approved] Factual claims are left as explicit gaps
  in drafts rather than invented.

## 5. Product and design constraints

- **Logo** — the existing Damon logo is retained. [approved] The official SVG has
  not been supplied. See P-001.
- **Palette** — graphite base, a single warm industrial accent, and green
  reserved exclusively for the biopolymer line and certification markers.
  [approved]

  | Role | Hex |
  |---|---|
  | Page background | `#0F1215` |
  | Card surface | `#191D21` |
  | Hairline | `#2B3238` |
  | Secondary text | `#8D979F` |
  | Primary text | `#EDF0F2` |
  | Accent | `#E2622C` |
  | Bio marker | `#7BA43F` |

  The accent has not been checked against the official logo and may need
  adjusting once the SVG arrives.

- **Typography** — IBM Plex Sans for text, IBM Plex Mono for grades, codes and
  specification tables. [approved]
- **Visual tone** — dark industrial: low key, macro on material, single warm key
  light. [approved]
- **Anti-direction** — stock corporate imagery, eco clichés (leaves, soil,
  globes), people in hard hats, and anything resembling architecture,
  construction, interiors or real estate. [approved]
- **Accessibility** — the starter's skip link, semantic navigation, focus
  handling and scroll restoration are locked and must not be removed.
- **Motion policy** — restrained functional interface motion is permitted.
  [approved 2026-07-25] Motion must communicate hierarchy, continuity or
  feedback; it is not decoration.

  Permitted:

  - slide and carousel transitions;
  - menu opening and closing;
  - accordion and disclosure transitions;
  - hover, focus, press and selection feedback;
  - form-state transitions;
  - restrained content-state and page transitions.

  Prohibited:

  - parallax;
  - scroll hijacking;
  - cinematic scroll choreography;
  - pinned storytelling;
  - continuous decorative movement;
  - distracting autoplay;
  - excessive repeated reveals;
  - motion copied from NP or any other project.

  Every motion implementation must honour `prefers-reduced-motion`. A motion
  that cannot be meaningfully reduced must not ship.

## 6. Technical architecture

- **Frontend** — React 18, TypeScript strict, Vite, Tailwind, react-router.
- **Rendering** — prerendering is required. The site must ship static HTML per
  route; a client-only render works against the stated business outcome.
  [approved]

  **Implemented.** `scripts/prerender.ts` renders every published route to its
  own `index.html` at build time, using the project's existing React and Vite
  setup and no additional dependency. `npm run build` runs the client build,
  then an SSR build of `src/entry-server.tsx`, then the prerender step; the
  server bundle is deleted afterwards and is not deployed. The client bundle
  hydrates the delivered markup.

  Per-route metadata is resolved by `src/lib/pageMeta.ts`, a pure function of
  the pathname, and serialised by `src/lib/seo.ts`. The prerender and the
  browser build their `<head>` from that one source, so the static head and the
  hydrated head cannot drift.

  Output: 28 route files (14 routes × 2 locales) plus `404.html`. Unpublished
  routes get no file, so `referenze` does not exist as static HTML.

  This resolves the prerender-tool question that was raised under P-007 by
  removing it: no tool was adopted, so no tool needs choosing. The rest of
  P-007 — hosting, account ownership and cost — remains open.
- **Backend** — none beyond a form endpoint. The starter ships
  `VITE_LEAD_ENDPOINT` unimplemented; a minimal endpoint must be written.
- **Data store** — none.
- **Authentication** — none.
- **External integrations** — Plausible analytics. [approved by delegation:
  Egor delegated the choice; the subscription is an owner cost, see P-007.]
- **Hosting and environments** — Vercel configuration is present in the
  repository. Account ownership is unsettled. See P-007.

  `vercel.json` no longer carries an SPA rewrite. With every published route
  prerendered to a real file, the rewrite was actively harmful: it answered
  unknown URLs with the home page's HTML at status 200, so every mistyped path
  became a soft duplicate of the home page. The filesystem now serves each
  route and anything unmatched falls through to `404.html` with a real 404.
  `vite preview` is configured to behave the same way, so the contract is
  verifiable locally rather than assumed of the host.
- **Migration policy** — the temporary domain must serve `noindex`. Indexing a
  staging copy would create a duplicate competing with the production site.
  [approved]
- **Indexability contract** — `VITE_SITE_INDEXABLE` is the fail-safe
  implementation of that policy. [approved 2026-07-25]

  - The flag defaults to `false`. Any value other than `true` is treated as
    `false`, so a missing or malformed value fails closed.
  - Preview, staging and every temporary deployment must emit `noindex` and a
    `robots.txt` that disallows crawling.
  - Only the confirmed Production environment may set it to `true`.
  - Setting it to `true` requires the confirmed production domain (P-002) and
    an explicit release approval.

  Recording this contract is not approval to deploy or to index the current
  site.

## 7. Security, privacy and operations

- **Data collected** — sample-request form: company, name, email, process type,
  request description. Telephone optional. No file upload in v1. [approved]
- **Lead destination** — the company email inbox. [approved] The address has not
  been supplied. See P-003.
- **Validation and abuse protection** — the starter's honeypot is retained;
  server-side validation and rate limiting are required on the endpoint.
- **Consent** — Plausible sets no cookies, so no consent banner is required
  provided no other tracker is added. A privacy page and a statement on
  technical cookies remain mandatory. Italian jurisdiction, GDPR applies.
  [approved]
- **Secrets policy** — no credentials in the repository. Environment values come
  from the host's environment configuration only.

## 8. Quality gates

- **Automated checks** — `npm run verify` must pass: typecheck, lint, tests,
  production build. Enforced in CI.
- **SEO checks** — every route emits a unique title, meta description, canonical
  and `hreflang` pair; the sitemap is generated from the route registry; the
  temporary domain serves `noindex`.
- **Image checks** — assets conform to `docs/assets.md`, including the weight
  budget and the intrinsic-dimension contract on `ResponsiveImage`.
- **Accessibility checks** — keyboard traversal of every interactive element;
  every image carries localised alternative text or a deliberate empty `alt`.

## 9. Release acceptance

A version is accepted only when:

- `npm run verify` passes on the release commit;
- every published route renders as static HTML with correct metadata and
  `hreflang`;
- the sample-request form delivers to the confirmed destination and receipt is
  confirmed;
- no unconfirmed factual, partnership or certification claim appears in any
  published copy;
- the redirect map resolves every previously indexed URL;
- the owner has approved the Italian copy.

## 10. Active version

- **Version** — v1.0, on `version/v1.0`.
- **Objective** — bring the site to a releasable bilingual catalogue: integrate
  the approved localisation infrastructure, establish prerendering, then
  implement pages and copy against the approved route contract.
- **Baseline commit** — `cc850f4`.
- **Acceptance criteria** — section 9 release acceptance, plus governance
  documents reflecting only approved decisions and every open decision recorded
  in `PENDING_DECISIONS.md` with an owner and a closure condition.
- **Implementation status** — the site is implemented. Every published route
  renders in both locales, all fourteen approved assets are wired, prerendering
  produces static HTML per route, and the sample-request form is present in a
  truthful unavailable state. What remains before release is not implementation
  work: it is the owner-supplied information listed in `PENDING_DECISIONS.md`.
- **Development rule** — no direct development on `main` or on `version/v1.0`.
  All work lands through a `sandbox/<model>/v1.0/<task>` branch and a reviewed
  pull request into `version/v1.0`.

## 11. Next approved action

Review the implementation pull request
(`sandbox/claude/v1.0/complete-site` → `version/v1.0`).

Nothing beyond that review is approved. The site is not releasable: section 9
acceptance cannot be met while P-001 to P-005 and P-007 are open. It must not be
deployed or indexed, and `VITE_SITE_INDEXABLE` stays false.

## Appendix — company facts pending confirmation

Every item below is `[source]`. None may be published as a claim until the owner
confirms it.

- DAMON S.r.l., Corso della Carboneria 15, 70123 Bari (BA), Italy.
- P.IVA IT07080640720. Telephone +39 080 5742345.
- Distributor of masterbatches, polymers, biopolymers, additives, compounds and
  recycled regranulate to plastics converters.
- Avient distributor: Puglia from 2012, Sicily from 2018, exclusive for Southern
  Italy from 2019; Balkans from 2015.
- In-house TestLab performing extrusion trials and coloured film samples ahead of
  industrial runs.
- Founded by the Montenero family. Claimed 150+ client companies.

The previous site places MATER-BI® in the Avient product block. MATER-BI® is a
Novamont mark. This inconsistency is unresolved. See P-005.
