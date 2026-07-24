export const locales = ["it", "en"] as const;

export type Locale = (typeof locales)[number];

/**
 * Italian is served from the site root; English lives under a prefix.
 * Approved in SOURCE_OF_TRUTH.md section 4.
 */
export const defaultLocale: Locale = "it";

/** Path prefix per locale. The default locale has none. */
export const localePrefix: Readonly<Record<Locale, string>> = {
  it: "",
  en: "/en",
};

/** Value for the `lang` attribute and for hreflang annotations. */
export const localeTag: Readonly<Record<Locale, string>> = {
  it: "it-IT",
  en: "en",
};

/** Name of each locale in its own language, for the language switcher. */
export const localeName: Readonly<Record<Locale, string>> = {
  it: "Italiano",
  en: "English",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Resolve the locale from a pathname. Anything not under a known prefix
 * belongs to the default locale, including unmatched paths.
 */
export function localeFromPathname(pathname: string): Locale {
  const [, first] = pathname.split("/");
  if (first && isLocale(first) && first !== defaultLocale) return first;
  return defaultLocale;
}
