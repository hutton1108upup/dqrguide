export const siteConfig = {
  name: "DQR.GG",
  fullName: "Dungeon Quest Reborn Wiki",
  description:
    "Evidence-labelled guides for Dungeon Quest Reborn dungeons, spells, drops, progression, and status checks.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dqr.gg",
  locale: "en_US",
  published: "2026-09-02",
  disclaimer:
    "Unofficial fan site. Not affiliated with or endorsed by Roblox Corporation, Voldex, or Delta Quarters OG."
} as const;

