import { parseSiteUrl } from "../src/content/site-url.mjs";
import { failOrPass } from "./content-manifest.mjs";

const environment = process.env.NODE_ENV === "production" ? "production" : "development";
const errors = [];
try {
  const url = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, environment);
  if (environment === "production" && url.protocol !== "https:") errors.push("production URL must use HTTPS");
  process.stdout.write(`PASS check-config url=${url.toString()} environment=${environment}\n`);
} catch (error) {
  errors.push(error instanceof Error ? error.message : String(error));
  failOrPass("check-config", errors);
}
