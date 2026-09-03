import Fuse from "fuse.js";

import { getRuntimeEnvironment, getVisiblePages, type RuntimeEnvironment } from "@/content/routes";

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
  "/updates/": "patch notes latest version changes",
  "/beginner-guide/": "new player tips stats route upgrades mistakes",
  "/weapons/": "weapon stats drops rarity class upgrades",
  "/armor/": "armor sets stats slots drops survivability",
  "/cosmetics/": "cosmetics titles enchant event collection",
  "/builds/": "mage warrior tank healer builds progression",
  "/builds/mage/": "mage build spells gear stats",
  "/builds/warrior/": "warrior build spells gear stats",
  "/builds/tank/": "tank build defense gear team",
  "/builds/healer/": "healer build support spells gear team",
  "/scripts-macros/": "scripts macros executor safety account risk"
};

export function buildSearchItems(environment?: RuntimeEnvironment): SearchItem[] {
  return getVisiblePages(environment)
    .filter((page) => page.kind !== "trust")
    .map((page) => ({
      href: page.path,
      title: page.h1,
      description: page.description,
      intent: intents[page.path] ?? "",
      kind: page.kind
    }));
}

const defaultEnvironment = getRuntimeEnvironment();
const searchIndex = new Fuse(buildSearchItems(defaultEnvironment), {
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

export function searchSite(query: string, limit = 7, environment: RuntimeEnvironment = getRuntimeEnvironment()): SearchItem[] {
  const clean = query.trim();
  if (!clean) return buildSearchItems(environment).slice(0, limit);
  const index = environment === defaultEnvironment ? searchIndex : new Fuse(buildSearchItems(environment), {
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
  return index.search(clean, { limit }).map((result) => result.item);
}
