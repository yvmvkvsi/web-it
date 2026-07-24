# Current Handoff

**Updated:** `2026-07-25 (GMT+4)`
**Prepared by:** `Claude (Opus 5), v1.0 implementation`

This file is a factual continuation snapshot. It does not approve decisions and
cannot override `SOURCE_OF_TRUTH.md`.

## Repository state

- Repository: `https://github.com/yvmvkvsi/web-it`
- Active version: v1.0
- Current branch: `sandbox/claude/v1.0/complete-site`
- Target branch: `version/v1.0`, at `cc850f4` (merge of PR #3)
- Stable baseline: `main` at `c487604328bd7854717c9e2a397429b48cba4506`
- Rollback point: `cc850f4`
- Working tree: clean after the commits listed below.
- Preview URL: none. No preview environment has been provisioned.
- Production URL: none. Not provisioned. See P-002.

The previous handoff named `~/Developer/web-it` as the canonical working path.
That was machine-specific and has gone stale: this session worked from a
different machine entirely. The repository is the only authority. Clone it and
run `npm ci` — a `node_modules` older than the font dependencies will fail the
build with an unresolved `@fontsource-variable/ibm-plex-sans/wght.css`.

## Completed in this session

The site was finished: prerendering, the test suite, browser QA, the review
passes and the documentation. The preceding session had integrated the
localisation branch and built the design system, shell and pages.

- **Prerendering implemented.** Every published route is rendered to its own
  static `index.html` at build time using the existing React and Vite setup,
  with no added dependency. 28 route files plus `404.html`.
- **Metadata centralised.** `src/lib/pageMeta.ts` resolves title, description,
  canonical, `hreflang` and indexability from the pathname as a pure function.
  The prerender and the browser build the head from that one source, so the
  static head cannot drift from the hydrated one. Eleven per-page `useSeo`
  calls were replaced by one call in the layout.
- **Test suite expanded** from 12 tests to 82.
- **Browser QA executed** with Playwright across five viewports and all 29
  routes, plus an interaction pass of 38 checks.
- **Six defects found and fixed** — see below.
- **Documentation updated** to the actual state.

## Defects found and fixed

Each was found by QA, not by inspection, and each is covered by the notes in the
code that explain why the fix is shaped the way it is.

1. **Every route served the home page.** `vite preview`'s SPA fallback answered
   `/cookie`, `/azienda` and every other path with the root `index.html`, so
   the prerendered files were never exercised and hydration mismatched against
   markup meant for a different route — 1106 React hydration errors across the
   sweep. Preview now resolves each path against the build output and returns
   `404.html` with a real 404 for anything unmatched. The same reasoning
   removed the SPA rewrite from `vercel.json`: it would have made every
   mistyped URL a status-200 duplicate of the home page.
2. **The mobile menu never appeared.** `backdrop-filter` on the sticky header
   establishes a containing block for fixed-position descendants, so the panel
   resolved `inset: 4.25rem 0 0` against the 68px header box and collapsed to
   nothing — open and correct in the DOM, invisible on screen. The blur moved
   to an inner bar. DOM-level tests had passed; a screenshot caught it.
3. **A dead band roughly 11rem deep** under the heading on every page whose
   section head was the whole section, because that head's bottom margin
   stacked on the next section's padding.
4. **The field-label rule was inert.** `.field > span` never matched the span
   inside `<label>`, so "Telefono" and "facoltativo" ran together and the label
   typography never applied.
5. **The privacy-notice link in the consent row was indistinguishable** from
   the sentence around it — same colour, no underline.
6. **Two touch targets under the 24px minimum** of WCAG 2.2 SC 2.5.8: the
   wordmark at 22px and the consent checkbox at 18px.

Also corrected: a `fetchPriority` prop React 18 does not map, which warned on
every render; a `starter:` key left in `sessionStorage`; the `.rail-form` label
set in a hairline colour that failed contrast; a whole sentence set as an 11px
uppercase mono label on the industries page; and dead content keys and CSS.

## Validation

| Check | Result | Evidence |
| --- | --- | --- |
| Typecheck | Passed | `npm run verify` → `tsc -b` and the quality project |
| Lint | Passed | `npm run verify` → `eslint .` |
| Tests | Passed | 82 tests, 9 files |
| Production build | Passed | `npm run verify` |
| Sitemap generation | Passed | 28 URLs, `referenze` excluded |
| Prerender | Passed | 28 route files + `404.html` |
| Responsive QA | Passed | 29 routes × 5 viewports; 0 overflow, 0 console errors |
| Interaction QA | Passed | 38 checks |
| Deploy | Not run | not authorised; no environment exists |
| Indexing | Not enabled | `VITE_SITE_INDEXABLE` remains unset/false |

Never replace `Not run` with `Passed` without actually running the check.

Viewports covered: 390×844, 768×1024, 1024×768, 1440×900, 1920×1080. The sweep
checked horizontal overflow, heading order, landmarks, image alt text and
intrinsic dimensions, touch-target size, link names, placeholder hrefs, console
errors, failed requests, `lang`, canonical, `hreflang` count and the `noindex`
directive. The interaction pass covered the mobile panel (open, Escape, focus
return, scroll lock, tab order when closed, close on navigation), language
switching and its effect on `lang`/title/canonical/`hreflang`, active navigation
state, keyboard traversal and the skip link, the contact form's fail-closed
behaviour, reduced motion, deep links, refresh on nested routes, browser back,
and the absence of any link to `referenze`.

The remaining console entries are the browser logging the 404 page's own HTTP
404 status, which is correct for a 404 page.

## Known risks and blockers

- **Release blockers awaiting the business owner:** P-001 official logo in SVG,
  P-003 destination mailbox, P-004 certification evidence, P-005 Avient
  agreement status and MATER-BI® provenance.
- **Architecture and operations:** P-002 final domain and redirect map, P-007
  hosting, account ownership and running costs, P-008 launch date.
- **Open npm advisory, accepted with reasons.** `react-router` 7.18.1 carries a
  high-severity advisory: an RSC-mode CSRF bypass that allows an action to
  execute before a 400 response. It is not reachable here. The app uses only
  declarative routing — `BrowserRouter`, `StaticRouter`, `Routes`, `Route`,
  `Link`, `NavLink`, `Outlet`, `useLocation`, `useNavigationType` — with no
  data router, no route actions, no `<Form>`, no fetchers and no RSC runtime,
  and it ships as static files with no server to execute an action against.

  There is no fixed release to move to: 7.18.1 is the latest published
  `react-router-dom`, and `npm audit fix --force` would *downgrade* to 7.11.0,
  reinstating eleven other advisories. The fix exists in `react-router` 8.3.0,
  which is a major-version migration off `react-router-dom`. That is a real
  option and is recommended once the site is released and stable — but taking
  it during final implementation would add more risk than it removes.

  Revisit immediately if the app ever adopts a data router, route actions or
  any server runtime, at which point the advisory becomes reachable.
- **Two assets are below their specified master width.** `docs/assets.md`
  specifies a 2400px master for `testlab-extrusion` and `warehouse`; both were
  delivered at 1600px. `src/content/media.ts` advertises the honest 1600px
  width, because a `srcset` naming a 2400px candidate that does not exist would
  404. The missing exports were not fabricated. At their placements the 1600px
  master is adequate; regenerate only if a full-bleed use appears.
- **`og-default` is not produced and no favicon is declared.** Both depend on
  the official logo (P-001). The site declares an explicit empty icon rather
  than inventing a mark, and the Twitter card degrades to `summary`.
- Branch protection is not configured on `main` or `version/v1.0`.
- Company facts in the Source of Truth appendix remain `[source]` and
  unconfirmed. None is published anywhere in the site; tests assert this.

## Exact next action

1. Egor reviews the implementation pull request
   (`sandbox/claude/v1.0/complete-site` → `version/v1.0`).
2. Egor reviews the Italian copy, which is drafted and unreviewed.
3. The owner supplies P-001 and P-003, which are the two inputs that unblock the
   largest amount: the logo unblocks the favicon, `og-default` and the accent
   check; the mailbox unblocks the form and, with it, release acceptance.

## Merge or release state

- Pull request: `sandbox/claude/v1.0/complete-site` → `version/v1.0`,
  "Complete Damon v1.0 bilingual website".
- Review state: awaiting Egor's review. Not merged.
- Merge target: `version/v1.0`. `version/v1.0` has not been merged into `main`.
- Deployment: none. Indexing: not enabled.
- Release readiness: **not releasable.** The implementation is complete, but
  section 9 acceptance requires a confirmed form destination and receipt, a
  resolved domain and redirect map, owner-approved copy, and no unconfirmed
  claim in published copy. The first three are outstanding.
