import { describe, expect, it } from "vitest";

import { parseSiteUrl } from "./site-url.mjs";

describe("production site URL", () => {
  it("normalizes the configured root URL", () => {
    expect(parseSiteUrl("https://example.com/", "production").toString()).toBe("https://example.com/");
  });

  it("rejects a missing URL in production", () => {
    expect(() => parseSiteUrl(undefined, "production")).toThrow(/NEXT_PUBLIC_SITE_URL is required/i);
  });

  it("rejects localhost and non-HTTPS production URLs", () => {
    expect(() => parseSiteUrl("http://localhost:3000", "production")).toThrow(/HTTPS/i);
    expect(() => parseSiteUrl("https://localhost:3000", "production")).toThrow(/localhost/i);
  });

  it("allows an explicit local test URL outside production", () => {
    expect(parseSiteUrl(undefined, "test").toString()).toBe("http://localhost:3000/");
  });
});
