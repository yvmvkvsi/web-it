export interface PublicEnvironment {
  siteUrl: string;
  leadEndpoint?: string;
}

export interface PublicEnvironmentSource {
  VITE_SITE_URL?: string;
  VITE_LEAD_ENDPOINT?: string;
}

export const PLACEHOLDER_SITE_URL = "https://example.com";

function parseOptionalHttpUrl(value: string | undefined, label: string) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error(`${label} must be an absolute http(s) URL.`);
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(`${label} must use http or https.`);
  }

  return url.toString();
}

export function parsePublicEnvironment(
  source: PublicEnvironmentSource,
): PublicEnvironment {
  const siteValue = source.VITE_SITE_URL?.trim() || PLACEHOLDER_SITE_URL;
  let siteUrl: URL;

  try {
    siteUrl = new URL(siteValue);
  } catch {
    throw new Error("VITE_SITE_URL must be an absolute http(s) URL.");
  }

  if (!["http:", "https:"].includes(siteUrl.protocol)) {
    throw new Error("VITE_SITE_URL must use http or https.");
  }

  if (siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
    throw new Error(
      "VITE_SITE_URL must be an origin without a path, query, or hash.",
    );
  }

  return {
    siteUrl: siteUrl.origin,
    leadEndpoint: parseOptionalHttpUrl(
      source.VITE_LEAD_ENDPOINT,
      "VITE_LEAD_ENDPOINT",
    ),
  };
}

export const publicEnvironment = parsePublicEnvironment({
  VITE_SITE_URL: import.meta.env?.VITE_SITE_URL,
  VITE_LEAD_ENDPOINT: import.meta.env?.VITE_LEAD_ENDPOINT,
});
