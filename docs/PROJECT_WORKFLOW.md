# Project workflow

This repository uses a lightweight control system for projects developed by
people and AI models. Its purpose is to preserve intent, isolate risky work and
make every version recoverable without turning documentation into a second
product.

## 1. Canonical project documents

There are four current files:

| File | Purpose | May contain |
| --- | --- | --- |
| `project/SOURCE_OF_TRUTH.md` | Official current project contract | Approved facts, decisions, constraints and acceptance criteria |
| `project/PENDING_DECISIONS.md` | Decision queue | Unresolved material choices, options and recommendations |
| `project/HANDOFF.md` | Continuation snapshot | Branch, commit, completed work, validation, blockers and next action |
| `project/CHANGELOG.md` | Durable history | Releases and meaningful governance changes |

Do not create dated copies such as `SOURCE_OF_TRUTH_FINAL_v7.md` inside the
active documentation set. Git already preserves history. If an external
snapshot is required, export it separately and keep the canonical files above
unambiguous.

## 2. Decision states

### Live discussion

A working idea in chat, a meeting or a prompt. It can change freely and is not
official merely because a model repeated it.

### Pending decision

Use Pending when an unresolved choice materially affects product scope,
architecture, design direction, security, cost, schedule or release acceptance.

Each pending item must contain:

- a stable ID such as `P-001`;
- the decision required;
- why it matters now;
- known facts and constraints;
- viable options;
- a recommendation clearly labelled as a recommendation;
- the owner or approver;
- what evidence or answer will close it;
- blocked work, if any.

Pending is not a task list. Bugs, implementation steps and minor copy edits
belong in issues, a plan or the active PR.

### Approved decision

When the project owner approves an item:

1. update the relevant section of Source of Truth;
2. remove the resolved item from Pending;
3. record a short entry in Changelog when the decision is material;
4. make those documentation edits in the same PR or commit.

An urgent explicit owner decision is operationally binding immediately, but it
must still be written into Source of Truth before the affected release is
approved.

### Superseded decision

Do not silently overwrite a conflicting locked decision. Record what changed,
why, who approved it and which release first applies it. Git history remains the
archive; Source of Truth shows only the current rule.

## 3. Source of Truth writing rules

Source of Truth should be concise enough to read at the beginning of every
serious work session. It should define:

1. project identity and outcome;
2. current stable baseline, repository, branch and commit;
3. approved scope and non-goals;
4. users, routes and content model;
5. product and design constraints;
6. technical architecture and integration contracts;
7. security, privacy and operational requirements;
8. quality gates and release acceptance;
9. current version and approved next objective.

Write facts and locked decisions as direct statements. Separate facts,
decisions, recommendations and unresolved questions. Do not paste brainstorms,
full chat transcripts, daily status notes or speculative implementation ideas
into Source of Truth.

The current repository path, baseline branch and commit must be updated when a
release becomes the new stable baseline.

## 4. Pending Decisions writing rules

Pending should remain short and actionable:

- keep only unresolved material decisions;
- order items by release impact and dependency;
- state whether an item blocks implementation or can use a reversible default;
- never convert a model recommendation into a decision without approval;
- remove resolved items promptly after updating Source of Truth;
- flag conflicts with Source of Truth explicitly.

If Pending becomes a large backlog, it is being used incorrectly.

## 5. Branch architecture

```text
main
└── version/v1.0
    ├── sandbox/codex/v1.0/routing
    ├── sandbox/opus/v1.0/frontend-review
    └── sandbox/fable/v1.0/responsive-layout
```

### Stable branch

`main` contains the latest approved stable baseline. It is protected from
direct model development.

### Version branch

Every new product version starts in a new branch:

`version/v<major>.<minor>[.<patch>][-slug]`

Examples:

- `version/v1.0-foundation`
- `version/v1.1-lead-pipeline`
- `version/v1.1.1-form-hotfix`
- `version/v2.0-redesign`

Create it from an explicitly recorded baseline commit. Never recycle the
previous version branch for a new version.

The version branch collects reviewed slices and powers the integrated Preview.
It is not a scratchpad.

### Model sandbox branch

Each model works in an isolated branch:

`sandbox/<model>/<version>/<bounded-task>`

Examples:

- `sandbox/codex/v1.1/form-endpoint`
- `sandbox/opus/v1.1/security-review`
- `sandbox/fable/v2.0/mobile-header`

Create the sandbox from the active version branch. A sandbox should have one
owner, one task and a short lifetime. Separate models may work in parallel only
when their file ownership and integration boundaries are clear.

If a model needs another model's completed work, merge that dependency into the
version branch first or create the new sandbox from the reviewed dependency
commit. Do not pass unreviewed mutable branches between models as if they were
stable.

### Hotfix branch

Use `hotfix/v<version>/<scope>` for urgent production repairs. Start from the
production commit, verify the smallest safe fix, merge to `main`, and backport
the same fix into the active version branch when applicable.

## 6. Version lifecycle

### A. Open the version

1. Confirm the previous stable baseline and working tree.
2. Approve the new version objective and explicit non-goals.
3. Resolve decisions that block architecture.
4. Create the new version branch from the recorded baseline.
5. Update Source of Truth with the active version and acceptance criteria.

### B. Implement in slices

1. Create a sandbox branch for a bounded task.
2. Diagnose and write an implementation plan.
3. Change only the approved scope.
4. Run relevant automated and visual checks.
5. Commit a coherent slice.
6. Open a PR into the version branch.
7. Review the diff, regressions and documentation impact.
8. Merge only after required gates pass.

### C. Integrate and preview

After each meaningful merge:

- deploy or refresh the integrated Preview;
- smoke-test affected routes and workflows;
- record newly discovered material decisions in Pending;
- update the handoff with the exact branch and commit.

### D. Approve the release

Before merging the version branch into `main`:

- all release acceptance criteria are satisfied;
- `npm run verify` passes;
- desktop and mobile visual QA pass;
- direct URLs and reloads pass on Preview;
- security and data flows are tested where relevant;
- Source, Pending, Handoff and Changelog match reality;
- rollback points and required environment changes are known.

After approval, merge the version branch into `main`, tag the release when tags
are used, deploy Production, run production smoke tests, and record the new
baseline commit in Source of Truth.

## 7. Model session protocol

At session start, every model reports:

- repository and current branch;
- HEAD commit and working tree state;
- active version;
- exact scope;
- documents read;
- conflicts or blockers.

During work, the model must:

- stay in its sandbox branch;
- preserve existing behaviour and approved design intent;
- ask before removing, replacing or materially simplifying a feature;
- keep secrets out of code, output and documentation;
- use evidence from the repository instead of guessing;
- update documentation when the implementation changes an approved contract.

At handoff, the model reports:

- sandbox branch and final commit;
- files and behaviour changed;
- automated tests and results;
- visual and Preview checks;
- known risks and unverified areas;
- documentation updates;
- exact next action and intended merge target.

## 8. Pull request contract

Every implementation PR should state:

- target version and task scope;
- what changed and why;
- what deliberately did not change;
- affected routes, data, environment or migrations;
- tests and QA evidence;
- screenshots or recordings for visual changes when useful;
- rollback considerations;
- Source/Pending/Handoff impact.

A passing build does not prove visual correctness. A visual check does not prove
security or data correctness. Use the gate appropriate to the changed system.

## 9. Recommended repository protection

When GitHub settings are available:

- protect `main` from direct pushes and force pushes;
- require a pull request and passing CI before merging;
- protect active `version/*` branches from direct model pushes;
- allow sandbox branches to be short-lived;
- require review for security, authentication, payments and destructive data
  migrations;
- keep Preview and Production environments separate.

These settings reinforce the workflow but do not replace it.
