import { getPageByPath, getRuntimeEnvironment, isPageAvailable, type RuntimeEnvironment } from "@/content/routes";

export const NAV_ITEMS = [
  ["Dungeons", "/dungeons/"],
  ["Spells", "/spells/"],
  ["Drops", "/drops/"],
  ["Tier List", "/tier-list/"],
  ["Codes", "/codes/"],
  ["Trading", "/trading/"],
  ["Updates", "/updates/"]
] as const;

export function getNavigationItems(environment: RuntimeEnvironment = getRuntimeEnvironment()) {
  return NAV_ITEMS.filter(([, href]) => {
    const page = getPageByPath(href);
    return page ? isPageAvailable(page, environment) : false;
  });
}
