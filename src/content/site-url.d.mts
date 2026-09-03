export type SiteEnvironment = "development" | "test" | "production";

export declare function parseSiteUrl(value: string | undefined, environment: SiteEnvironment): URL;
