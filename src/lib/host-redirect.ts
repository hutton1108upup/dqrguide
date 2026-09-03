const CANONICAL_ORIGIN = "https://dqr.gg";
const LEGACY_HOSTS = new Set([
  "dungeonquestrebornguide.wiki",
  "www.dungeonquestrebornguide.wiki"
]);

export function getLegacyHostRedirect(host: string | null, pathname: string, search: string): string | null {
  if (!host) return null;

  let hostname: string;
  try {
    hostname = new URL(`http://${host}`).hostname.toLowerCase();
  } catch {
    return null;
  }

  if (!LEGACY_HOSTS.has(hostname)) return null;

  const target = new URL(pathname.startsWith("/") ? pathname : `/${pathname}`, CANONICAL_ORIGIN);
  target.search = search.startsWith("?") ? search : search ? `?${search}` : "";
  return target.toString();
}
