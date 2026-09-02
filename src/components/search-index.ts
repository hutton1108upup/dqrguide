import Fuse from "fuse.js";

import { sitePages } from "@/content/routes";

export interface SearchItem {
  href: string;
  title: string;
  description: string;
  intent: string;
  kind: string;
}

const intents: Record<string, string> = {
  "/": "wiki start home overview",
  "/differences/": "original vs reborn transfer separate game",
  "/gamepasses/": "boost purchase robux gold value",
  "/spells/": "skills abilities magic class role",
  "/spell-tier-list/": "best spell ranking skills",
  "/trading/": "how to trade value scam safety",
  "/dungeons/": "where should I farm run next progression",
  "/dungeons/winter-outpost/": "winter dungeon route drops",
  "/dungeons/northern-lands/": "northern current dungeon boss drops",
  "/drops/": "where does an item drop loot source location",
  "/codes/": "redeem code rewards active codes",
  "/trello/": "roadmap board official updates",
  "/discord/": "server invite community party",
  "/tier-list/": "best weapons spells builds meta ranking",
  "/updates/": "patch notes latest version changes"
};

export function buildSearchItems(): SearchItem[] {
  return sitePages
    .filter((page) => page.published)
    .map((page) => ({
      href: page.path,
      title: page.h1,
      description: page.description,
      intent: intents[page.path] ?? "",
      kind: page.kind
    }));
}

const searchIndex = new Fuse(buildSearchItems(), {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "intent", weight: 0.35 },
    { name: "href", weight: 0.1 },
    { name: "description", weight: 0.05 }
  ],
  threshold: 0.32,
  ignoreLocation: true,
  minMatchCharLength: 2
});

export function searchSite(query: string, limit = 7): SearchItem[] {
  const clean = query.trim();
  if (!clean) return buildSearchItems().slice(0, limit);
  return searchIndex.search(clean, { limit }).map((result) => result.item);
}

