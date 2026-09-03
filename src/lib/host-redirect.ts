const CANONICAL_ORIGIN = "https://dungeonquestrebornguide.wiki";
const CANONICAL_ALIASES = new Set([
  "dqr.gg",
  "www.dqr.gg"
]);

export function getCanonicalHostRedirect(host: string | null, pathname: string, search: string): string | null {
  if (!host) return null;

  let hostname: string;
  try {
    hostname = new URL(`http://${host}`).hostname.toLowerCase();
  } catch {
    return null;
  }

  if (!CANONICAL_ALIASES.has(hostname)) return null;

  const target = new URL(pathname.startsWith("/") ? pathname : `/${pathname}`, CANONICAL_ORIGIN);
  target.search = search.startsWith("?") ? search : search ? `?${search}` : "";
  return target.toString();
}
