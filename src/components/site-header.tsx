import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";
import { SiteLogo } from "./site-logo";
import { getDirectNavigationItems, getNavigationGroups } from "./site-nav";

export function SiteHeader() {
  const groups = getNavigationGroups();
  const directItems = getDirectNavigationItems();

  return (
    <header className="site-header">
      <div className="header-shell header-inner">
        <SiteLogo />
        <DesktopNav groups={groups} directItems={directItems} />
        <div className="header-actions">
          <SearchDialog />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
