import type { Locale } from "./locales";

/**
 * Only facts approved in docs/project/SOURCE_OF_TRUTH.md appear here.
 *
 * The company's registered address, VAT number, telephone and mailbox are
 * recorded in the Source of Truth appendix as `[source]` — read off the
 * previous site, never confirmed by the owner — so they are deliberately
 * absent. See PENDING_DECISIONS P-002 and P-003.
 */
export const siteConfig = {
  /** Wordmark and `og:site_name`. Rendered as text: there is no logo. See P-001. */
  name: "Damon",
  legalName: "Damon S.r.l.",
  /**
   * Open Graph fallback image. `og-default` cannot be produced until the
   * official logo SVG arrives, so no social image is claimed. See P-001.
   */
  defaultSocialImage: undefined as string | undefined,
} as const;

/** One-line description of the business, per Source of Truth section 1. */
export const siteDescription: Record<Locale, string> = {
  it: "Distribuzione di materie prime per trasformatori di materie plastiche: masterbatch, polimeri, bio-polimeri, additivi, compound e rigenerati.",
  en: "Raw-material distribution for plastics converters: masterbatch, polymers, biopolymers, additives, compounds and recycled regranulate.",
};
