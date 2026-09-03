import Link from "next/link";

import { getPageByPath, getRuntimeEnvironment, isPageAvailable, type RuntimeEnvironment } from "@/content/routes";

type GuideNavItem = readonly [label: string, href: string];

export const GUIDE_NAV_GROUPS = [
  {
    label: "Field notes",
    items: [
      ["Differences", "/differences/"],
      ["Codes", "/codes/"],
      ["Trello", "/trello/"],
      ["Discord", "/discord/"],
      ["Updates", "/updates/"],
      ["Safety", "/scripts-macros/"]
    ]
  },
  {
    label: "Database",
    items: [
      ["Dungeons", "/dungeons/"],
      ["Spells", "/spells/"],
      ["Drops", "/drops/"],
      ["Weapons", "/weapons/"],
      ["Armor", "/armor/"],
      ["Cosmetics", "/cosmetics/"]
    ]
  },
  {
    label: "Build & decisions",
    items: [
      ["Spell Tier List", "/spell-tier-list/"],
      ["Tier List", "/tier-list/"],
      ["Gamepasses", "/gamepasses/"],
      ["Trading", "/trading/"],
      ["Beginner Guide", "/beginner-guide/"],
      ["Builds", "/builds/"],
      ["Mage build", "/builds/mage/"],
      ["Warrior build", "/builds/warrior/"],
      ["Tank build", "/builds/tank/"],
      ["Healer build", "/builds/healer/"]
    ]
  }
] as const satisfies ReadonlyArray<{ label: string; items: ReadonlyArray<GuideNavItem> }>;

export function getGuideNavGroups(environment: RuntimeEnvironment = getRuntimeEnvironment()) {
  return GUIDE_NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter(([, href]) => {
      const page = getPageByPath(href);
      return page ? isPageAvailable(page, environment) : false;
    })
  })).filter((group) => group.items.length > 0);
}

export function GuideNav({ environment = getRuntimeEnvironment() }: { environment?: RuntimeEnvironment }) {
  return (
    <nav className="guide-nav" aria-label="Guide sections">
      <div className="shell guide-nav-inner">
        {getGuideNavGroups(environment).map((group) => (
          <div className="guide-nav-group" key={group.label}>
            <span>{group.label}</span>
            <div>
              {group.items.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
