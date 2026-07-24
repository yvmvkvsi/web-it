import type { Locale } from "../config/locales";
import type { ImageSource } from "../components/ResponsiveImage";

/**
 * The delivered asset set, described exactly as it exists in `public/media`.
 *
 * `docs/assets.md` specifies a 2400 px master for the two full-width assets
 * (`testlab-extrusion`, `warehouse`); both were delivered at a 1600 px master
 * before the full-width role was distinguished from the card role. The widths
 * below are therefore the honest widths on disk, not the specified ones — a
 * srcset that advertises a 2400 px candidate which does not exist would 404.
 * See docs/assets.md section 3, "Current status of delivered assets".
 */
export interface MediaAsset {
  /** `public/media/<group>/<slug>-<width>.<ext>` */
  group: string;
  slug: string;
  /** Exported widths, ascending. The largest is the JPEG fallback. */
  widths: readonly number[];
  /** Intrinsic size of the JPEG fallback, for layout reservation. */
  width: number;
  height: number;
  alt: Record<Locale, string>;
}

const path = (asset: MediaAsset, width: number, extension: string) =>
  `/media/${asset.group}/${asset.slug}-${width}.${extension}`;

const srcSet = (asset: MediaAsset, extension: string) =>
  asset.widths.map((width) => `${path(asset, width, extension)} ${width}w`).join(", ");

/**
 * AVIF first, WebP second, JPEG fallback last: the browser takes the first
 * `<source>` it can decode, so ordering is load-bearing.
 */
export function imageSources(asset: MediaAsset, sizes: string): ImageSource[] {
  return [
    { type: "image/avif", srcSet: srcSet(asset, "avif"), sizes },
    { type: "image/webp", srcSet: srcSet(asset, "webp"), sizes },
  ];
}

export function imageFallback(asset: MediaAsset) {
  return path(asset, asset.width, "jpg");
}

/** Fallback `srcset` on the `<img>` itself, so JPEG is also responsive. */
export function imageFallbackSrcSet(asset: MediaAsset) {
  return srcSet(asset, "jpg");
}

const cardWidths = [480, 800, 1200, 1600] as const;

export const heroPlant: MediaAsset = {
  group: "hero",
  slug: "plant-hero",
  widths: [768, 1280, 1920, 2560],
  width: 2560,
  height: 1440,
  alt: {
    it: "Granuli polimerici traslucidi che cadono in una tramoggia d'acciaio in un impianto di compounding",
    en: "Translucent polymer pellets falling into a steel hopper inside a compounding plant",
  },
};

export const productMedia = {
  masterbatch: {
    group: "products",
    slug: "masterbatch",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Granuli di masterbatch in cumuli separati: arancio, oliva, antracite e avorio, su superficie scura",
      en: "Masterbatch granules in separate piles — orange, olive, charcoal and off-white — on a dark surface",
    },
  },
  polimeri: {
    group: "products",
    slug: "polimeri",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Cumulo di granuli polimerici naturali, traslucidi e uniformi, su superficie scura",
      en: "Heap of natural polymer pellets, translucent and uniform, on a dark surface",
    },
  },
  biopolimeri: {
    group: "products",
    slug: "biopolimeri",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Granuli bio-polimerici opachi, avorio e beige, di forma irregolare, su superficie scura",
      en: "Matte off-white and beige biopolymer granules, irregular in shape, on a dark surface",
    },
  },
  additivi: {
    group: "products",
    slug: "additivi",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Polvere additiva bianca accanto a granuli veicolanti traslucidi su superficie scura",
      en: "White additive powder beside translucent carrier pellets on a dark surface",
    },
  },
  compound: {
    group: "products",
    slug: "compound",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Granuli di compound caricato a minerale, opachi e con superficie ruvida, su fondo scuro",
      en: "Mineral-filled compound pellets, matte with a chalky surface, on a dark background",
    },
  },
  rigenerati: {
    group: "products",
    slug: "rigenerati",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Rigranulato riciclato di colore misto e disomogeneo su un piano industriale scuro",
      en: "Recycled regranulate of mixed, inconsistent colour on a dark industrial surface",
    },
  },
} as const satisfies Record<string, MediaAsset>;

export const industryMedia = {
  packaging: {
    group: "industries",
    slug: "industry-packaging",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Bobina di film plastico trasparente ripresa da vicino su fondo scuro",
      en: "Roll of clear plastic film photographed close up against a dark background",
    },
  },
  injection: {
    group: "industries",
    slug: "industry-injection",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Particolare stampato a iniezione appena estratto dallo stampo, ancora caldo",
      en: "Injection-moulded part just released from the tool, still warm",
    },
  },
  agriculture: {
    group: "industries",
    slug: "industry-agriculture",
    widths: cardWidths,
    width: 1600,
    height: 1200,
    alt: {
      it: "Film per pacciamatura steso sul terreno di un campo",
      en: "Mulch film laid across the soil of a field",
    },
  },
} as const satisfies Record<string, MediaAsset>;

export const testlabExtrusion: MediaAsset = {
  group: "testlab",
  slug: "testlab-extrusion",
  widths: cardWidths,
  width: 1600,
  height: 1067,
  alt: {
    it: "Estrusore da laboratorio che produce un sottile nastro di film colorato, con mani guantate all'attrezzatura",
    en: "Laboratory extruder producing a thin coloured film ribbon, with gloved hands at the equipment",
  },
};

export const testlabFilmSample: MediaAsset = {
  group: "testlab",
  slug: "testlab-film-sample",
  widths: cardWidths,
  width: 1600,
  height: 1067,
  alt: {
    it: "Quadrati di film colorato disposti a ventaglio, ciascuno di una tonalità leggermente diversa",
    en: "Squares of coloured film fanned out, each a slightly different shade",
  },
};

export const warehouse: MediaAsset = {
  group: "company",
  slug: "warehouse",
  widths: cardWidths,
  width: 1600,
  height: 1067,
  alt: {
    it: "Magazzino di materie prime in penombra con big bag e pallet accatastati",
    en: "Low-lit raw-material warehouse with stacked big bags and pallets",
  },
};

/** Content column is capped at 1216 px; cards never exceed half of it. */
export const sizes = {
  fullBleed: "100vw",
  fullWidth: "(min-width: 1216px) 1216px, 100vw",
  card: "(min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw",
  halfColumn: "(min-width: 900px) 608px, 100vw",
} as const;
