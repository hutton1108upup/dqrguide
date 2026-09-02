import Link from "next/link";

import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">DQR.GG <span>/ field notes, not folklore</span></p>
          <p className="footer-disclaimer">{siteConfig.disclaimer}</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/differences/">About Reborn</Link><Link href="/updates/">Verification log</Link><Link href="/discord/">Discord status</Link><Link href="/codes/">Codes status</Link>
        </nav>
      </div>
    </footer>
  );
}

