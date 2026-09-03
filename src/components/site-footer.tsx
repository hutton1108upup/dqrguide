import Link from "next/link";

import { siteConfig } from "@/content/site";
import { getPageByPath, getRuntimeEnvironment, isPageAvailable } from "@/content/routes";

const FOOTER_ITEMS = [
  ["About Reborn", "/differences/"],
  ["Verification log", "/updates/"],
  ["Discord status", "/discord/"],
  ["Codes status", "/codes/"],
  ["Source policy", "/source-policy/"],
  ["Privacy", "/privacy/"],
  ["Contact", "/contact/"]
] as const;

function getFooterItems() {
  const environment = getRuntimeEnvironment();
  return FOOTER_ITEMS.filter(([, href]) => {
    const page = getPageByPath(href);
    return page ? isPageAvailable(page, environment) : false;
  });
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">DQR.GG <span>/ field notes, not folklore</span></p>
          <p className="footer-disclaimer">{siteConfig.disclaimer}</p>
        </div>
        <nav aria-label="Footer navigation">
          {getFooterItems().map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </div>
    </footer>
  );
}
