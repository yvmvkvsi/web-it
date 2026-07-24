import { describe, expect, it } from "vitest";
import { parsePublicEnvironment } from "../../../src/config/environment";

describe("public environment", () => {
  it("normalizes a valid origin", () => {
    expect(
      parsePublicEnvironment({ VITE_SITE_URL: "https://example.com/" }).siteUrl,
    ).toBe("https://example.com");
  });

  it("rejects a site URL containing a path", () => {
    expect(() =>
      parsePublicEnvironment({ VITE_SITE_URL: "https://example.com/site" }),
    ).toThrow(/origin without a path/i);
  });

  it("accepts an optional absolute lead endpoint", () => {
    expect(
      parsePublicEnvironment({
        VITE_SITE_URL: "https://example.com",
        VITE_LEAD_ENDPOINT: "https://api.example.com/leads",
      }).leadEndpoint,
    ).toBe("https://api.example.com/leads");
  });

  it("keeps a deployment out of search results unless explicitly opted in", () => {
    expect(parsePublicEnvironment({}).indexable).toBe(false);
    expect(
      parsePublicEnvironment({ VITE_SITE_INDEXABLE: "false" }).indexable,
    ).toBe(false);
    expect(
      parsePublicEnvironment({ VITE_SITE_INDEXABLE: "yes" }).indexable,
    ).toBe(false);
    expect(
      parsePublicEnvironment({ VITE_SITE_INDEXABLE: " TRUE " }).indexable,
    ).toBe(true);
  });

});
