# Pending Decisions

**Project:** Damon S.r.l. website
**Last reviewed:** 2026-07-25
**Status:** active decision queue

This file contains only unresolved material decisions. It is not a backlog,
implementation plan or archive. Approved decisions move into
`SOURCE_OF_TRUTH.md` and are removed from this file in the same documentation
change.

Recommendations recorded here are recommendations. None of them is approved.

Identifiers are never reused. P-006 (route strings and case-study section) was
resolved on 2026-07-25; the approved route contract lives in
`SOURCE_OF_TRUTH.md` section 4.

## Decision priority

1. Release blockers
2. Architecture and data contracts
3. Product and design choices
4. Operational and launch choices

Open decisions in current priority order: P-001, P-003, P-004, P-005 (release
blockers, all awaiting owner-supplied evidence), P-002 and P-007 (architecture
and operational contracts, needed before cutover and first deploy), P-008
(scope framing).

## Open decisions

---

## P-001. Official logo in SVG

**Status:** blocked
**Owner/approver:** business owner
**Needed by:** before any public deploy
**Blocks:** `og-default` asset, header typography, final accent colour

### Decision required

Supply the official Damon logo as SVG.

### Why it matters

The logo cannot be traced, redrawn, approximated or generated. Without it the
Open Graph fallback asset cannot be produced, and the accent `#E2622C` cannot
be checked for clash against the real brand colour.

### Known facts and constraints

- The previous site serves a 153×45 raster logo; the origin returns 403 to
  direct requests, so it could not be sampled.
- `docs/assets.md` marks `og-default` as intentionally not produced.

### Recommendation

Request the original vector file from whoever produced the previous site's
branding. A high-resolution PNG is a fallback but forces a redraw decision.

### Closure evidence

SVG committed to the repository and the accent colour re-checked against it.

---

## P-002. Final domain and redirect map

**Status:** open
**Owner/approver:** business owner
**Needed by:** before cutover
**Blocks:** canonical URLs, sitemap host, redirect work

### Decision required

Does the site launch on `damonsrl.com`, and what is the temporary domain used
during development?

### Why it matters

If the domain is retained, every previously indexed URL needs a 301 or the
existing search positions are lost at cutover. If it changes, the migration is
larger still. `VITE_SITE_URL` drives canonical tags and the generated sitemap,
so the value must be known per environment.

### Known facts and constraints

- Egor indicated the development domain differs and the final domain will most
  likely be `damonsrl.com`.
- The previous site exposes two coexisting path prefixes, `/` and `/damon/`,
  suggesting a legacy subfolder installation that must be enumerated before the
  redirect map can be considered complete.
- The temporary domain must serve `noindex` — already approved.

### Recommendation

Confirm the final domain now, and crawl the live site to enumerate every
indexed URL before cutover rather than after.

### Closure evidence

Owner confirmation of the production hostname, plus a committed redirect map
covering every enumerated legacy URL.

---

## P-003. Destination address for sample requests

**Status:** blocked
**Owner/approver:** business owner
**Needed by:** before the form goes live
**Blocks:** working form endpoint, release acceptance

### Decision required

Which mailbox receives sample requests, and who is responsible for answering
them?

### Why it matters

Delivery to the company inbox is approved; the address is not known. A form that
submits nowhere is worse than no form. Release acceptance requires a confirmed
received test submission.

### Known facts and constraints

- `VITE_LEAD_ENDPOINT` is unimplemented in the starter.
- The previous site publishes a telephone number but the mailbox behind it is
  unverified.

### Recommendation

Use a role address rather than a personal one, so responsibility survives staff
changes.

### Closure evidence

Address supplied and a test submission confirmed received.

---

## P-004. Certification claims and evidence

**Status:** blocked
**Owner/approver:** business owner
**Needed by:** before any copy mentioning certification is published
**Blocks:** certifications page, product page badges, biopolymer copy

### Decision required

Which certifications can Damon evidence in writing: food contact, medical use,
OK compost, Vinçotte, any other?

### Why it matters

These are regulatory claims in the Italian market, not marketing copy.
Publishing an unevidenced compliance claim creates liability for the business.
The draft product page design currently shows three such badges.

### Known facts and constraints

- The previous site asserts food contact, medical use and OK compost for
  masterbatches, and Vinçotte certification for biopolymers.
- No supporting documents have been supplied.

### Recommendation

Publish nothing in this category without the certificate on file. Where a
certificate belongs to a supplier rather than to Damon, the copy must attribute
it to the supplier.

### Closure evidence

Certificates on file, with the certifying body and holder identified for each.

---

## P-005. Avient agreement status and MATER-BI® provenance

**Status:** blocked
**Owner/approver:** business owner
**Needed by:** before partner marks or distribution claims are published
**Blocks:** partner logo lockups, azienda copy, product range copy

### Decision required

Is the Avient distribution agreement still in force with the same territory, and
on what basis does MATER-BI® appear in the product range?

### Why it matters

Distribution territory is a competitive claim with contractual backing; stating
it wrongly is a commercial and legal exposure. Partner mark usage is usually
governed by the agreement itself.

### Known facts and constraints

- The previous site claims Avient distribution for Puglia (2012), Sicily (2018),
  exclusive Southern Italy (2019), Balkans (2015). Content dates from 2022.
- The previous homepage labels a logo block "Avient" but links to clariant.com,
  while the products page links correctly to avient.com.
- MATER-BI® is a Novamont mark yet appears inside the Avient product block.

### Recommendation

Obtain the current agreement, confirm permitted mark usage, and resolve whether
MATER-BI® is distributed directly, indirectly, or no longer at all.

### Closure evidence

Owner confirmation of current territory and a written statement of permitted
mark usage.

---

## P-007. Hosting, accounts and running costs

**Status:** open
**Owner/approver:** business owner
**Needed by:** before first deploy
**Blocks:** deployment, analytics activation, prerender tool choice

### Decision required

Who owns the hosting, domain and analytics accounts, who holds production
access, and who pays the recurring costs?

### Why it matters

Production credentials owned by a contractor rather than the business is a
common and avoidable failure. Plausible is a paid subscription of roughly €9 per
month and cannot be activated without an account holder. The prerender tool
choice is cheap to make but should be made against the confirmed host.

### Known facts and constraints

- `vercel.json` is present in the repository with SPA rewrites.
- Plausible is the approved analytics choice, delegated by Egor.
- Prerendering is approved; `vite-react-ssg` is the candidate but not fixed.

### Recommendation

Register the domain, hosting and analytics under the business's own accounts and
grant access to whoever maintains the site, rather than the reverse.

### Closure evidence

Account ownership confirmed and production access granted.

---

## P-008. Launch date and approval turnaround

**Status:** open
**Owner/approver:** business owner
**Needed by:** before v1 scope is frozen
**Blocks:** scope trade-offs

### Decision required

Is there a hard launch date, what drives it, and how quickly can the owner
review copy and supply the missing inputs?

### Why it matters

Scope trade-offs cannot be judged without a deadline. The critical path runs
through owner-supplied inputs — logo, certificates, agreement status, copy
review — not through implementation.

### Recommendation

If no external event drives a date, sequence the launch behind the owner inputs
rather than fixing a date the content cannot meet.

### Closure evidence

Owner statement of the date and its driver, or explicit confirmation that none
exists.
