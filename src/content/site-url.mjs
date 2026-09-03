const LOCAL_FALLBACK = "http://localhost:3000/";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

export function parseSiteUrl(value, environment) {
  const raw = value?.trim();

  if (!raw) {
    if (environment === "production") {
      throw new Error("NEXT_PUBLIC_SITE_URL is required for production builds.");
    }
    return new URL(LOCAL_FALLBACK);
  }

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute URL.");
  }

  if (!parsed.hostname || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must contain only a public origin.");
  }

  if (parsed.pathname !== "/" && parsed.pathname !== "") {
    throw new Error("NEXT_PUBLIC_SITE_URL must not contain a path.");
  }

  if (environment === "production" && parsed.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS in production.");
  }

  if (environment === "production" && (LOCAL_HOSTS.has(parsed.hostname.toLowerCase()) || parsed.hostname.endsWith(".local"))) {
    throw new Error("NEXT_PUBLIC_SITE_URL must not point to localhost in production.");
  }

  parsed.pathname = "/";
  return parsed;
}
