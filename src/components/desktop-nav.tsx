"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { isNavigationItemCurrent, isNavigationPathActive } from "./navigation-path";
import type { NavGroup, NavItem } from "./site-nav";

type DesktopNavProps = {
  groups: ReadonlyArray<NavGroup>;
  directItems: ReadonlyArray<NavItem>;
};

export function DesktopNav({ groups, directItems }: DesktopNavProps) {
  const pathname = usePathname() ?? "/";
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openGroup) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenGroup(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroup(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroup]);

  return (
    <nav ref={navRef} className="desktop-nav" aria-label="Primary navigation">
      {groups.map((group) => {
        const groupId = `desktop-nav-${group.label.toLowerCase().replaceAll(" ", "-")}`;
        const isOpen = openGroup === group.label;
        const isActive = group.items.some(([, href]) => isNavigationPathActive(pathname, href));

        return (
          <div className="desktop-nav-group" key={group.label}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={groupId}
              className={isActive ? "active" : undefined}
              onClick={() => setOpenGroup((current) => current === group.label ? null : group.label)}
            >
              {group.label}
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            {isOpen ? (
              <div id={groupId} className="desktop-nav-panel" role="group" aria-label={`${group.label} links`}>
                <span className="desktop-nav-panel-label">{group.label}</span>
                {group.items.map(([label, href]) => {
                  const itemActive = isNavigationItemCurrent(pathname, href);
                  return (
                    <Link
                      href={href}
                      key={href}
                      className={itemActive ? "active" : undefined}
                      aria-current={itemActive ? "page" : undefined}
                      onClick={() => setOpenGroup(null)}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
      {directItems.filter(([, href]) => href !== "/").map(([label, href]) => (
        <Link
          href={href}
          key={href}
          className={isNavigationItemCurrent(pathname, href) ? "active" : undefined}
          aria-current={isNavigationItemCurrent(pathname, href) ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
