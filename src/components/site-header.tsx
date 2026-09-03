import Link from "next/link";

import { MobileNav } from "./mobile-nav";
import { GuideNav } from "./guide-nav";
import { SearchDialog } from "./search-dialog";
import { SiteLogo } from "./site-logo";
import { getNavigationItems } from "./site-nav";

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <SiteLogo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {getNavigationItems().map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="header-actions">
            <SearchDialog />
            <MobileNav />
          </div>
        </div>
      </header>
      <GuideNav />
    </>
  );
}
