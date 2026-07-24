# Image assets

**Project:** Damon S.r.l. website rebuild
**Document status:** working specification
**Depends on:** `SOURCE_OF_TRUTH.md` (route registry, approved scope)

This file defines every image the site needs, the technical contract each file
must satisfy, and the art direction all of them share. Anyone producing an
asset — photographer, designer, or generative model — should be able to work
from this file alone.

Video and scroll choreography are explicitly **out of scope** for this document.
Interface motion is governed by the motion policy in `SOURCE_OF_TRUTH.md`
section 5, not here. See "Deferred" at the end.

---

## 1. Technical contract

These are enforced by code, not preference.

1. Every image renders through `src/components/ResponsiveImage.tsx`. That
   component requires `src`, `alt`, `width` and `height`. There is no default —
   a missing intrinsic dimension is a type error, and the unit test asserts the
   rendered `width` / `height` attributes.
2. `width` and `height` are the **intrinsic pixel dimensions of the fallback
   file**, not the CSS display size. They exist to reserve layout space and
   prevent cumulative layout shift.
3. Additional formats and breakpoints go in the `sources` array as
   `{ srcSet, type, media, sizes }`. Order matters: the browser takes the first
   `<source>` it can decode, so AVIF precedes WebP precedes the JPEG fallback.
4. The fallback `src` is always JPEG. Never make AVIF or WebP the fallback.
5. Files live under `public/media/`. Paths in code are absolute from the web
   root (`/media/...`), never relative.
6. Alt text is mandatory and localised. See section 5.
7. `loading="lazy"` is the component default. The homepage hero is the only
   asset that should override to `loading="eager"`, since it is above the fold
   and lazy-loading it delays Largest Contentful Paint.

### Naming

```
public/media/<group>/<slug>-<width>.<ext>
```

`<group>` is one of `hero`, `products`, `testlab`, `industries`, `company`.
Example: `public/media/products/masterbatch-1200.avif`

Do not put locale in the filename. Images are shared between `/it/` and `/en/`;
only the alt text differs.

### Formats and weight budget

| Format | Role | Target quality |
|---|---|---|
| AVIF | primary | q 50–58 |
| WebP | fallback for older Safari | q 72–78 |
| JPEG | universal fallback | q 78, progressive |

Hard budget: **hero under 250 KB, any other image under 120 KB**, measured on
the AVIF variant actually served at that breakpoint. An image that cannot meet
this at acceptable quality is too busy — simplify the composition rather than
raising the quality setting.

Strip all EXIF on export. It carries camera serials and GPS and adds weight for
nothing.

---

## 2. Art direction

One visual language across every asset. The failure mode to avoid is six
category images that each show generic pellets and are therefore
interchangeable — at that point the images carry no information and are
decoration paid for in bandwidth.

### Palette

Assets are graded to sit inside the site palette, not fought against it.

| Role | Hex |
|---|---|
| Page background | `#0F1215` |
| Card surface | `#191D21` |
| Hairline | `#2B3238` |
| Secondary text | `#8D979F` |
| Primary text | `#EDF0F2` |
| Accent | `#E2622C` |
| Bio marker | `#7BA43F` |

### Rules

- **Low key.** Deep graphite background, cool blue-grey shadow, a single warm
  directional key light. The image should read as dark before it reads as
  anything else, so it sits on `#0F1215` without a visible seam.
- **Desaturated, except the subject.** Colour belongs to the material — the
  pellets, the melt, the pigment. Everything around it is neutral.
- **Negative space is a requirement, not a leftover.** The hero needs a clear
  region for the headline. Specify which third stays empty before shooting or
  generating.
- **Macro over wide.** Close on material beats a wide shot of a warehouse. It
  is more specific, it compresses better, and it does not date.
- **No text inside the image.** No signage, no labels, no packaging, no
  watermarks. Text belongs in HTML: it is selectable, translatable, indexable,
  and it does not need a second render for the other language.
- **No people, no hands** unless a named asset below asks for them. People date
  a site faster than anything else and create a consent and release problem.
- **No third-party marks.** Do not include Avient, Novamont or any partner
  logo inside a photograph. Partner marks are separate SVG files placed by the
  layout, so they stay crisp and can be swapped when a distribution agreement
  changes.

---

## 3. Asset manifest

Priority 1 assets block launch. Priority 2 improves the page but a section can
ship without it.

Master size follows from **display role**, not from the directory an asset
happens to live in. Two assets in the same group can need different masters —
`testlab-extrusion` spans the full content column while `testlab-film-sample`
sits at card size, so they are not exported alike.

| Slug | Group | Used on | Display role | Ratio | Master size | Priority |
|---|---|---|---|---|---|---|
| `plant-hero` | hero | homepage, above the fold | full-bleed | 16:9 | 2560×1440 | 1 |
| `masterbatch` | products | `/prodotti/masterbatch/` | card | 4:3 | 1600×1200 | 1 |
| `polimeri` | products | `/prodotti/polimeri/` | card | 4:3 | 1600×1200 | 1 |
| `biopolimeri` | products | `/prodotti/biopolimeri/` | card | 4:3 | 1600×1200 | 1 |
| `additivi` | products | `/prodotti/additivi/` | card | 4:3 | 1600×1200 | 1 |
| `compound` | products | `/prodotti/compound/` | card | 4:3 | 1600×1200 | 1 |
| `rigenerati` | products | `/prodotti/rigenerati/` | card | 4:3 | 1600×1200 | 1 |
| `testlab-extrusion` | testlab | `/testlab/` header | full-width | 3:2 | 2400×1600 | 1 |
| `testlab-film-sample` | testlab | `/testlab/` body | card | 3:2 | 1600×1067 | 2 |
| `industry-packaging` | industries | `/settori/` | card | 4:3 | 1600×1200 | 2 |
| `industry-injection` | industries | `/settori/` | card | 4:3 | 1600×1200 | 2 |
| `industry-agriculture` | industries | `/settori/` | card | 4:3 | 1600×1200 | 2 |
| `warehouse` | company | `/azienda/` | full-width | 3:2 | 2400×1600 | 2 |
| `og-default` | hero | Open Graph fallback | social card | 1.91:1 | 1200×630 | 1 |

### Breakpoint variants

Content column is capped at 1216 px (`--shell: min(76rem, …)`).

Breakpoints follow the display role column above, not the group.

- **full-bleed** (`plant-hero`) — export at 2560, 1920, 1280, 768.
- **full-width** (`testlab-extrusion`, `warehouse`) — export at 2400, 1600,
  1200, 800. The content column is 1216 px, so a full-width image needs 2432 px
  to stay sharp on a 2× display; 1600 is visibly soft there.
- **card** (all product and industry assets, `testlab-film-sample`) — export at
  1600, 1200, 800, 480. These never exceed half the content column.
- **social card** (`og-default`) — single 1200×630 JPEG. Social scrapers are
  unreliable with AVIF; ship JPEG only, and keep it under 300 KB or some
  crawlers skip it.

The `width` / `height` passed to `ResponsiveImage` is the **JPEG fallback**,
which is the largest export in the list above.

### Current status of delivered assets

The asset set presently in `public/media/` is a **draft**. It satisfies every
technical rule in this document except one: `testlab-extrusion` and `warehouse`
were exported at a 1600 master, before the full-width role was distinguished
from the card role. Both need re-exporting at 2400 when the final assets are
produced. No other delivered asset is affected.

**How the implementation handles the gap.** `src/content/media.ts` declares the
widths that actually exist on disk — 480, 800, 1200, 1600 — not the widths
specified here. A `srcset` advertising a 2400 candidate that has not been
exported would make the browser request a URL that 404s. The missing exports
were not fabricated to close the gap on paper.

At their current placements both images are used inside the 1216px content
column rather than edge to edge, so a 1600 master is adequate at 1× and
acceptable at 2× on the sizes they actually render at. Re-export at 2400 if
either is ever moved to a genuinely full-bleed placement, and widen the
`widths` array in the same change.

`og-default` remains unproduced. It depends on the official logo (P-001), so
`siteConfig.defaultSocialImage` is `undefined`, no `og:image` is emitted, and
the Twitter card declares `summary` rather than claiming a large image that
does not exist. The site also declares an explicit empty favicon for the same
reason — see P-001.

---

## 4. Per-asset briefs

Each brief is written so it can be handed to a photographer or pasted into a
generative model. If generating, append the negative clause from section 2:
no people, no text, no lettering, no logos, no packaging, no labels.

### `plant-hero`

Stream of translucent natural polymer pellets falling into a steel hopper
inside a compounding plant. Deep graphite near-black background, cool blue-grey
shadow. Single warm amber key light from the right rim-lighting the falling
granules. Shallow depth of field, crisp on the stream. **Left third stays
empty** for the headline. Editorial industrial photography, 85 mm, low key.

### `masterbatch`

Extreme macro of coloured masterbatch granules in small separated piles on dark
graphite: burnt orange, olive, charcoal, off-white. One warm directional key
from upper right, deep shadow, near-black background. Very shallow depth of
field, crisp on the foreground pile.

### `polimeri`

Extreme macro of natural uncoloured polymer pellets — translucent milky white
and pale amber — heaped on dark graphite. Same lighting as `masterbatch`. The
distinction from that asset must be legible at card size: **uncoloured and
uniform**, against masterbatch's separated colour piles.

### `biopolimeri`

Macro of matte off-white and pale beige biopolymer granules on dark graphite,
slightly irregular in shape and less glossy than petrochemical pellets. Cooler
overall grade than the other product shots. This is the one asset where a
restrained green cast in the shadow is acceptable — it echoes the bio marker
without turning the image into a sustainability cliché. No leaves, no soil, no
plants, no globes.

### `additivi`

Macro of fine white and pale powder additive alongside small translucent
carrier pellets on dark graphite, one warm directional key, deep shadow. The
subject is the contrast between powder and pellet — additives are the one
category that is not simply another granule.

### `compound`

Macro of dense mineral-filled compound pellets, matte chalky off-white with
visible surface texture from the calcium carbonate load. Heavier and less
translucent than the `polimeri` shot. Same lighting.

### `rigenerati`

Macro of recycled regranulate on dark graphite: pellets of visibly mixed and
inconsistent colour — grey, muted blue, olive, brown — with slight variation in
size and cut. The honest look of second-life material is the point. Do not
clean it up into a uniform product shot.

### `testlab-extrusion`

Close shot of a small laboratory extruder producing a thin coloured film
ribbon. Dark plant interior, one warm key on the die head, cool ambient fill.
Shallow depth of field on the emerging film. Hands in the frame are acceptable
here and only here — gloved, no faces, no identifiable people.

### `testlab-film-sample`

Overhead flat lay of several small coloured film squares fanned on a dark
graphite surface, each a slightly different shade of the same hue. Even soft
light with one warm directional accent. This asset carries the TestLab argument
visually: tone, gradation and intensity differ before industrialisation.

### `industry-packaging` / `industry-injection` / `industry-agriculture`

Macro of the finished output for each sector — film web on a roll, moulded
part still warm from the tool, agricultural mulch film across soil. Same low-key
grade. These sit on `/settori/` and must look like end products, not raw
material, or they duplicate the product images.

### `warehouse`

Wide low-key interior of a raw-material warehouse: stacked big bags and pallets
receding into shadow. Cool ambient with one warm accent. Deep negative space in
the upper third.

### `og-default`

Not a photograph. A flat composition on `#0F1215` with the Damon logo centred
and generous margin. Social cards render small and are frequently cropped —
anything photographic becomes unreadable mush at thumbnail size.

---

## 5. Alt text

Alt text is content, so it is localised and lives with the copy, not with the
file. Each asset needs an Italian and an English string.

- Describe what the image shows and why it is on that page. `alt="masterbatch"`
  is useless to a screen reader and to a search engine.
- Do not open with "image of" or "photo of". The element already announces it.
- Keep it under about 125 characters.
- If an image is purely decorative and its meaning is fully carried by adjacent
  text, pass `alt=""` deliberately rather than inventing a description.

Example for `masterbatch`:

- `it` — Granuli di masterbatch colorati in cumuli separati su superficie scura
- `en` — Coloured masterbatch granules in separated piles on a dark surface

---

## 6. Delivery checklist

Per asset, before it enters the repository:

- [ ] All breakpoint widths exported in AVIF, WebP and JPEG
- [ ] Weight budget met on the AVIF variant
- [ ] EXIF stripped
- [ ] Filename follows the naming convention
- [ ] Intrinsic width and height recorded for the `ResponsiveImage` call
- [ ] Italian and English alt text written
- [ ] Verified against `#0F1215` at both card and full-bleed size
- [ ] No text, marks or identifiable faces in frame

---

## 7. Deferred

The following are deliberately not specified here and must not be added
without an approved decision recorded in `SOURCE_OF_TRUTH.md`:

- parallax, scroll hijacking, cinematic scroll choreography, pinned
  storytelling and continuous decorative movement — prohibited outright by the
  motion policy in `SOURCE_OF_TRUTH.md` section 5. Restrained functional
  interface motion is approved and is specified there, not in this document;
- video assets and autoplaying backgrounds;
- illustration or icon style beyond the flat category markers;
- partner logo lockups, pending confirmation of current distribution
  agreements and permitted mark usage.
