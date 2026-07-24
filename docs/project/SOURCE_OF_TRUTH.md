# Source of Truth

**Project:** Damon S.r.l. website
**Document status:** canonical
**Last approved update:** 2026-07-24
**Current stable version:** v0.1

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
- Stable commit: `e58a0716f361abd6b86dde2e3c24757c9f460731`
- Active version branch: `sandbox/claude/foundation/project-definition`
- Preview environment: temporary domain, not yet specified. See P-002.
- Production environment: not provisioned.
- Working tree status at last handoff: clean.

PR #1 (`sandbox/opus/foundation/cleanup-and-plastics-assets`, head `8194631`)
was reviewed and found safe to merge subject to two corrections to the asset
specification. It is not yet merged.

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
- Motion, transitions and scroll choreography — deferred pending a separate
  decision. [approved]

## 4. Users, routes and content

- **Primary user journey** — organic search on a grade or certification →
  product category page → compatibility table → sample request. The homepage is
  not part of this path; it serves visitors who already know the company.
  [approved]
- **Supported languages** — Italian at the site root, English under `/en/`.
  `hreflang` and a localised sitemap are required. [approved]
- **Route registry** — `src/config/routes.ts` remains the single source for
  navigation and sitemap generation. Product category routes are not yet defined
  in it: the information architecture is approved in principle, the final route
  strings are open. See P-006.
- **`work` route** — retained. It will hold client case studies, not product
  records. [approved] Its final path, language and publication status are open.
  See P-006.
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
- **Motion policy** — none. No transitions, parallax or scroll effects until a
  motion language is separately approved. [approved]

## 6. Technical architecture

- **Frontend** — React 18, TypeScript strict, Vite, Tailwind, react-router.
- **Rendering** — prerendering is required. The site must ship static HTML per
  route; a client-only render works against the stated business outcome.
  [approved] The specific tool is not yet fixed. See P-007.
- **Backend** — none beyond a form endpoint. The starter ships
  `VITE_LEAD_ENDPOINT` unimplemented; a minimal endpoint must be written.
- **Data store** — none.
- **Authentication** — none.
- **External integrations** — Plausible analytics. [approved by delegation:
  Egor delegated the choice; the subscription is an owner cost, see P-007.]
- **Hosting and environments** — Vercel configuration is present in the
  repository. Account ownership is unsettled. See P-007.
- **Migration policy** — the temporary domain must serve `noindex`. Indexing a
  staging copy would create a duplicate competing with the production site.
  [approved]

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

- **Version** — v0.1, foundation.
- **Objective** — record the approved project definition; establish localisation
  and prerendering before any page implementation.
- **Baseline commit** — `e58a071`.
- **Acceptance criteria** — governance documents reflect only approved
  decisions; open decisions are recorded in `PENDING_DECISIONS.md` with an owner
  and a closure condition.
- **Explicit non-goals** — no page implementation, no copy, no asset wiring and
  no route changes in this version.

## 11. Next approved action

Merge PR #1 once the two asset-specification corrections are pushed, then open
`sandbox/claude/v1/i18n-and-prerender`.

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
