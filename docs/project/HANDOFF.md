# Current Handoff

**Updated:** `2026-07-25 (GMT+4)`  
**Prepared by:** `Claude (Opus 5), Phase 1 governance alignment`

This file is a factual continuation snapshot. It does not approve decisions and
cannot override `SOURCE_OF_TRUTH.md`.

## Repository state

- Repository: `https://github.com/yvmvkvsi/web-it`
- Local working path: `~/Developer/web-it`. This replaces the abandoned
  iCloud-synchronised copy at `~/Desktop/web-it`, which must not be used.
- Active version: v1.0
- Current branch: `sandbox/claude/v1.0/governance`
- Target branch: `version/v1.0`
- Stable baseline: `main` at `c487604328bd7854717c9e2a397429b48cba4506`
  (merge of PR #2). `version/v1.0` was created from that commit.
- HEAD commit: the governance commit at the tip of
  `sandbox/claude/v1.0/governance`; see the Phase 1 pull request.
- Working tree: clean at the start of the session and after the commit.
- Preview URL: none. No preview environment has been provisioned.
- Production URL: none. Not provisioned. See P-002.

## Completed in this session

- Phase 0 recovery, completed in the preceding session: 94 untracked duplicate
  artifacts under `public/media/` were quarantined outside the repository, the
  working tree was returned to a clean state, and `main` was verified in sync
  with `origin/main`. The project was subsequently moved out of iCloud to
  `~/Developer/web-it`, which resolves the native-binding ejection hazard that
  previously broke local verification.
- Phase 1: `version/v1.0` created and pushed from `c487604`.
- Phase 1: `sandbox/claude/v1.0/governance` created from `version/v1.0`.
- Phase 1: governance documents aligned with the owner decisions of 2026-07-25
  and project identity metadata updated from the starter's name to Damon's.

## Changed files and behaviour

- `docs/project/SOURCE_OF_TRUTH.md` — corrected baseline branch and commit;
  recorded PR #1 and PR #2 as merged; recorded `version/v1.0` as the active
  version branch; recorded the approved bilingual route contract and closed
  P-006; recorded the unpublished references section; replaced the blanket
  motion prohibition with the approved functional-motion policy; recorded the
  `VITE_SITE_INDEXABLE` indexability contract; restated the v1 objective and
  next approved action.
- `docs/project/PENDING_DECISIONS.md` — removed the resolved P-006; recorded
  that identifiers are not reused; added the current priority ordering. P-001
  through P-005, P-007 and P-008 remain open and unchanged.
- `docs/project/CHANGELOG.md` — recorded the PR #1 asset foundation, the PR #2
  project definition, the approved route decision, the functional-motion policy
  amendment, the indexability contract and the opening of v1.0.
- `docs/project/HANDOFF.md` — this file, replaced with the actual state.
- `docs/assets.md` — motion language corrected so it no longer prohibits all
  transitions; the document's own scope boundary is unchanged.
- `README.md` — retitled from the starter to the Damon website project;
  engineering and workflow documentation preserved.
- `package.json`, `package-lock.json` — package name changed from
  `production-web-starter` to `damon-website`.

No application code, route, localisation, asset or deployment behaviour was
changed. `src/`, `tests/`, `public/`, `vercel.json` and `.env.example` are
untouched on this branch.

## Validation

| Check | Result | Evidence or note |
| --- | --- | --- |
| Typecheck | Passed | `npm run verify`, `tsc -b` and quality project |
| Lint | Passed | `npm run verify`, `eslint .` |
| Tests | Passed | `npm run verify`, vitest suite |
| Production build | Passed | `npm run verify`, vite build |
| Desktop visual QA | Not run | no UI change in this phase |
| Mobile visual QA | Not run | no UI change in this phase |
| Preview smoke test | Not run | no preview environment exists |

Never replace `Not run` with `Passed` without actually running the check.

## Decisions and documentation

- Source of Truth updates: baseline; merged PR status; active version branch;
  approved route contract; unpublished references section; functional-motion
  policy; `VITE_SITE_INDEXABLE` contract; v1 objective; next approved action.
- Pending Decisions added or resolved: P-006 resolved and removed. No decision
  was added. P-001 through P-005, P-007 and P-008 remain open.
- Changelog updates: PR #1, PR #2, route decision, motion-policy amendment,
  indexability contract, opening of v1.0.
- Conflicts found: the Source of Truth carried a stale baseline commit
  (`e58a071`), named a sandbox branch as the active version branch, described
  PR #1 as unmerged, prohibited all motion while the assets document deferred
  the same subject, and pointed at a next action (`sandbox/claude/v1/i18n-and-prerender`)
  that was never created. All were corrected.

## Known risks and blockers

- Release blockers awaiting the business owner: P-001 official logo in SVG,
  P-003 destination mailbox for sample requests, P-004 certification evidence,
  P-005 Avient agreement status and MATER-BI® provenance.
- Architecture and operations: P-002 final domain and redirect map, P-007
  hosting, account ownership and running costs, P-008 launch date.
- `sandbox/claude/v1/localisation` is unmerged. Its route strings are now
  approved, but the branch itself has not been integrated into `version/v1.0`.
- No production or preview environment exists, so `VITE_SITE_INDEXABLE` has no
  environment in which it has yet been exercised.
- Company facts in the Source of Truth appendix remain `[source]` and
  unconfirmed. None may be published.
- Branch protection is not configured on `main` or `version/v1.0`.

## Exact next action

1. Egor reviews and merges the Phase 1 pull request
   (`sandbox/claude/v1.0/governance` → `version/v1.0`). Nothing else is
   approved to start before that merge.

## Merge or release state

- Pull request: `sandbox/claude/v1.0/governance` → `version/v1.0`, "Align Damon
  v1 governance and project metadata".
- Review state: awaiting Egor's review.
- Merge target: `version/v1.0`.
- Release readiness: not releasable. v1 has no implemented pages, no confirmed
  domain, no form destination and no deployment environment.
