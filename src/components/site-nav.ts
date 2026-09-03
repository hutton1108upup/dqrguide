import { getPageByPath, getRuntimeEnvironment, isPageAvailable, type RuntimeEnvironment } from "@/content/routes";

export type NavItem = readonly [label: string, href: string];
export type NavGroup = Readonly<{
  label: string;
  items: ReadonlyArray<NavItem>;
}>;

export const NAV_GROUPS = [
  {
    label: "Dungeons",
    items: [
      ["Dungeons Overview", "/dungeons/"],
      ["Northern Lands", "/dungeons/northern-lands/"],
      ["Winter Outpost", "/dungeons/winter-outpost/"]
    ]
  },
  {
    label: "Gear",
    items: [
      ["Drops", "/drops/"],
      ["Spells & Skills", "/spells/"],
      ["Weapons", "/weapons/"],
      ["Armor", "/armor/"],
      ["Cosmetics", "/cosmetics/"]
    ]
  },
  {
    label: "Builds",
    items: [
      ["Builds Overview", "/builds/"],
      ["Tier List", "/tier-list/"],
      ["Spell Tier List", "/spell-tier-list/"],
      ["Mage Build", "/builds/mage/"],
      ["Warrior Build", "/builds/warrior/"],
      ["Tank Build", "/builds/tank/"],
      ["Healer Build", "/builds/healer/"],
      ["Gamepasses", "/gamepasses/"]
    ]
  },
  {
    label: "Guides",
    items: [
      ["Beginner Guide", "/beginner-guide/"],
      ["Reborn vs Original", "/differences/"],
      ["Trading Guide", "/trading/"],
      ["Trello Status", "/trello/"],
      ["Discord Status", "/discord/"],
      ["Scripts & Macros Safety", "/scripts-macros/"]
    ]
  }
] as const satisfies ReadonlyArray<NavGroup>;

export const NAV_DIRECT_ITEMS = [
  ["Home", "/"],
  ["Codes", "/codes/"],
  ["Updates", "/updates/"]
] as const satisfies ReadonlyArray<NavItem>;

function isNavigationItemAvailable(item: NavItem, environment: RuntimeEnvironment) {
  const page = getPageByPath(item[1]);
  return page ? isPageAvailable(page, environment) : false;
}

export function getNavigationGroups(environment: RuntimeEnvironment = getRuntimeEnvironment()): NavGroup[] {
  return NAV_GROUPS
    .map((group) => ({
      label: group.label,
      items: group.items.filter((item) => isNavigationItemAvailable(item, environment))
    }))
    .filter((group) => group.items.length > 0);
}

export function getDirectNavigationItems(environment: RuntimeEnvironment = getRuntimeEnvironment()): NavItem[] {
  return NAV_DIRECT_ITEMS.filter((item) => isNavigationItemAvailable(item, environment));
}

export function getNavigationItems(environment: RuntimeEnvironment = getRuntimeEnvironment()): NavItem[] {
  return [
    ...getDirectNavigationItems(environment),
    ...getNavigationGroups(environment).flatMap((group) => group.items)
  ];
}

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return `${withLeadingSlash.replace(/\/+$/, "")}/`;
}

export function isNavigationPathActive(pathname: string, href: string) {
  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(href);

  if (targetPath === "/") return currentPath === "/";
  return currentPath === targetPath || currentPath.startsWith(targetPath);
}
