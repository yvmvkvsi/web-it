# Agent rules

These rules apply to every human or AI model working in a repository created
from this starter.

## Authority and required reading

Use this order when instructions conflict:

1. the project owner's latest explicit instruction;
2. `docs/project/SOURCE_OF_TRUTH.md`;
3. the approved scope of the active version branch;
4. `docs/project/PENDING_DECISIONS.md`;
5. `docs/project/HANDOFF.md`;
6. older chat, prompts and implementation notes.

At the start of every work session:

1. read this file and the four files in `docs/project`;
2. inspect the current branch, HEAD, working tree and recent commits;
3. confirm the target version and exact task scope;
4. stop and report any conflict before changing code or locked decisions.

`PENDING_DECISIONS.md` and `HANDOFF.md` provide context but cannot silently
override the Source of Truth.

## Branch and sandbox policy

- `main` is the latest approved stable baseline. Models never develop directly
  on `main`.
- Every new product version gets a new integration branch created from an
  explicitly approved baseline:
  `version/v<major>.<minor>[.<patch>][-slug]`.
- Models work only in isolated branches:
  `sandbox/<model>/<version>/<task>`.
- A version branch is an integration and Preview line, not a model workspace.
- Each sandbox branch has one bounded owner and one coherent scope. Do not let
  multiple models rewrite the same mutable branch in parallel.
- Merge sandbox work into the version branch through a reviewed pull request
  after required checks and Preview QA.
- Merge the version branch into `main` only after release acceptance. Tag the
  approved release when the project uses tags.
- Preserve previous version branches and release commits as rollback baselines.
- Never force-push, rewrite shared history, or commit secrets.
- Urgent production fixes use a dedicated `hotfix/v<version>/<scope>` branch
  and must be backported into the active version line when relevant.
- Documentation-only maintenance not tied to a product version still uses an
  isolated `sandbox/<model>/foundation/<task>` branch.

Before the first code change, state the current branch and intended target
branch. If the branch does not comply with this policy, create or switch to the
correct sandbox branch first.

## Decision and documentation policy

The project uses this decision flow:

`Live discussion -> Pending Decisions -> Source of Truth -> Implementation`

- Put only unresolved, material product or architecture questions in
  `PENDING_DECISIONS.md`. It is not a backlog.
- Put only approved, current decisions in `SOURCE_OF_TRUTH.md`.
- When a pending item is approved, remove it from Pending and update Source of
  Truth in the same documentation change.
- Record meaningful releases and governance changes in `CHANGELOG.md`.
- Update `HANDOFF.md` at the end of a material work session. A handoff records
  current state; it does not create new authority.
- Never create competing current Source or Pending files. Git history is the
  archive.
- Never mark a recommendation as approved without the project owner's decision.
- Do not silently change, weaken or reinterpret a locked decision. Record a
  conflict and ask.

The full workflow and document schemas are defined in
`docs/PROJECT_WORKFLOW.md`.

## Engineering behaviour

- Preserve requested behaviour. Never remove a feature to make an error
  disappear unless the project owner explicitly approves removal.
- Diagnose first, then make the smallest coherent change.
- Do not replace a difficult implementation with a simpler experience without
  approval.
- Keep routing, content, SEO and sitemap data centralized.
- Do not invent business facts or publish placeholder contact details.
- Do not introduce fonts, colours, motion or visual patterns from another
  brand.
- Do not claim a form is secure without a real server implementation and tests.
- Keep changes inside the approved task scope. Report useful out-of-scope
  findings instead of quietly expanding the task.

## Validation and handoff

- Commit completed slices separately with descriptive messages.
- Before handoff, run `npm run verify` and report any check that could not run.
- Visually inspect changed UI on desktop and mobile; a successful build is not
  visual proof.
- Smoke-test direct URLs and reloads on Preview for routing changes.
- Report the branch, commit, changed scope, tests, Preview result, known risks
  and exact next action.
- Never describe unrun checks as passed.
