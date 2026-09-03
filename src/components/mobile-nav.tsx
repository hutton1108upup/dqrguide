"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { isNavigationItemCurrent, isNavigationPathActive } from "./navigation-path";
import type { NavGroup, NavItem } from "./site-nav";

type MobileNavProps = {
  groups: ReadonlyArray<NavGroup>;
  directItems: ReadonlyArray<NavItem>;
};

export function MobileNav({ groups, directItems }: MobileNavProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setOpenGroup(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeNavigation = () => {
    setOpen(false);
    setOpenGroup(null);
  };

  const toggleNavigation = () => {
    if (open) setOpenGroup(null);
    setOpen(!open);
  };

  return (
    <div className="mobile-nav">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={toggleNavigation}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation">
          <div className="mobile-nav-direct">
            {directItems.map(([label, href]) => {
              const isActive = isNavigationItemCurrent(pathname, href);
              return (
                <Link
                  href={href}
                  key={href}
                  className={isActive ? "active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeNavigation}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          {groups.map((group) => {
            const groupId = `mobile-nav-${group.label.toLowerCase().replaceAll(" ", "-")}`;
            const isExpanded = openGroup === group.label;
            const isActive = group.items.some(([, href]) => isNavigationPathActive(pathname, href));

            return (
              <div className="mobile-nav-group" key={group.label}>
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={groupId}
                  className={isActive ? "active" : undefined}
                  onClick={() => setOpenGroup((current) => current === group.label ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                {isExpanded ? (
                  <div id={groupId} className="mobile-nav-group-links">
                    {group.items.map(([label, href]) => {
                      const itemActive = isNavigationItemCurrent(pathname, href);
                      return (
                        <Link
                          href={href}
                          key={href}
                          className={itemActive ? "active" : undefined}
                          aria-current={itemActive ? "page" : undefined}
                          onClick={closeNavigation}
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
        </nav>
      ) : null}
    </div>
  );
}
