import { ArrowRight, BookOpen, Box, Gift, Map, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceBadge } from "@/components/evidence-badge";
import { JsonLd } from "@/components/json-ld";
import { GateMark } from "@/components/site-logo";
import { officialGameSnapshot, statusChecks, tierReview } from "@/content/game-data";
import { getPageByPath } from "@/content/routes";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

const home = getPageByPath("/")!;
export const metadata: Metadata = createPageMetadata(home);
const tasks = [
  { href: "/dungeons/", label: "Dungeon progression", note: "What should I run next?", icon: Map },
  { href: "/drops/", label: "Drop tables", note: "Where does this item come from?", icon: Box },
  { href: "/spells/", label: "Spells & skills", note: "Which role fits the build?", icon: Sparkles },
  { href: "/codes/", label: "Codes status", note: "Is anything verified active?", icon: Gift },
  { href: "/differences/", label: "Reborn differences", note: "What carries over?", icon: BookOpen },
  { href: "/trading/", label: "Trading safety", note: "How do I avoid a bad trade?", icon: Scale }
] as const;

export default function HomePage() {
  const homeSchema = [
    { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.fullName, url: siteConfig.url, description: siteConfig.description },
    { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, description: "Independent evidence-labelled Dungeon Quest Reborn fan reference." }
  ];

  return (
    <>
      <JsonLd data={homeSchema} />
      <main>
        <section className="home-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-mark"><GateMark /></div>
            <div className="version-pill"><span /> Current official title: Northern Lands</div>
            <p className="eyebrow">{home.eyebrow}</p>
            <h1>{home.h1}</h1>
            <p className="hero-copy">Fast answers for dungeons, drops, spells, and live-status questions—each separated by what is official, checked, observed, or still unknown.</p>
            <div className="verification-line">
              <ShieldCheck size={16} aria-hidden="true" /> Official Roblox metadata checked <b>Sep 2, 2026</b><span>Universe {officialGameSnapshot.universeId}</span>
            </div>
          </div>
        </section>

        <div className="shell home-stack">
          <section className="tldr-card" aria-labelledby="quick-answer-title">
            <div className="tldr-label">TL;DR / START HERE</div>
            <h2 id="quick-answer-title">One question. One evidence trail.</h2>
            <p>{home.quickAnswer}</p>
            <div className="answer-grid">
              <div><span>Official identity</span><b>Confirmed</b><small>Roblox + publisher relationship</small></div>
              <div><span>Current rankings</span><b>Under review</b><small>No mockup tier copied as fact</small></div>
              <div><span>Codes / links</span><b>Source-gated</b><small>No unverified action buttons</small></div>
            </div>
          </section>

          <section aria-labelledby="start-title">
            <div className="section-heading"><div><span>01 / ROUTES</span><h2 id="start-title">Start with the player task</h2></div><p>Six fast doors into the database</p></div>
            <div className="task-grid">
              {tasks.map(({ href, label, note, icon: Icon }) => (
                <Link href={href} className="task-card" key={href}>
                  <Icon size={20} aria-hidden="true" /><span><b>{label}</b><small>{note}</small></span><ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="tier-title">
            <div className="section-heading"><div><span>02 / META</span><h2 id="tier-title">Current tier review</h2></div><Link href="/tier-list/">Open methodology <ArrowRight size={14} /></Link></div>
            <div className="review-board">
              <div className="review-grade">?</div>
              <div className="review-copy">
                <div className="review-status"><span className="status-dot warning" /> {tierReview.state}</div>
                <h3>No launch tier is assigned without a repeatable current-version check.</h3>
                <p>The visual mockup&apos;s named items, stats, and letter grades remain examples only.</p>
                <div className="criteria-list">{tierReview.criteria.map((criterion) => <span key={criterion}>{criterion}</span>)}</div>
                <div className="review-links"><Link href="/spell-tier-list/">Spell tier method <ArrowRight size={12} /></Link><Link href="/gamepasses/">Gamepass review <ArrowRight size={12} /></Link></div>
              </div>
            </div>
          </section>

          <section aria-labelledby="dungeon-title">
            <div className="section-heading"><div><span>03 / PROGRESSION</span><h2 id="dungeon-title">Dungeon verification queue</h2></div><Link href="/dungeons/">Open progression hub <ArrowRight size={14} /></Link></div>
            <div className="dungeon-grid">
              <Link href="/dungeons/northern-lands/" className="dungeon-card current">
                <span className="dungeon-index">NL</span><span><b>Northern Lands</b><small>Confirmed in the current official experience title</small></span><EvidenceBadge level="Official" />
              </Link>
              <Link href="/dungeons/winter-outpost/" className="dungeon-card">
                <span className="dungeon-index">WO</span><span><b>Winter Outpost</b><small>Requirements, route, and drops still need a Reborn check</small></span><EvidenceBadge level="Legacy / Unconfirmed" />
              </Link>
            </div>
          </section>

          <section aria-labelledby="status-title">
            <div className="section-heading"><div><span>04 / LIVE CHECKS</span><h2 id="status-title">Codes, Trello and Discord</h2></div><p>Checked Sep 2, 2026</p></div>
            <p className="status-note">No active code is published; no Trello board or Discord invite is labelled official without a first-party URL.</p>
            <div className="status-grid">
              {([["Codes", "/codes/", statusChecks.codes], ["Trello", "/trello/", statusChecks.trello], ["Discord", "/discord/", statusChecks.discord]] as const).map(([name, href, status]) => (
                <Link href={href} className="status-card" key={name}>
                  <div><span className="status-dot warning" /><small>{status.state}</small></div><h3>{name}</h3><p>{status.label}</p><span className="text-link">Open evidence <ArrowRight size={13} /></span>
                </Link>
              ))}
            </div>
          </section>

          <section className="update-strip" aria-labelledby="updates-title">
            <div><span>05 / UPDATE SIGNAL</span><h2 id="updates-title">Latest verified platform change</h2></div>
            <p><b>Sep 1, 2026 UTC</b> — Roblox metadata updated for <em>[Northern Lands] Dungeon Quest Reborn</em>. This timestamp is not presented as a patch note.</p>
            <Link href="/updates/">Read the ledger <ArrowRight size={14} /></Link>
          </section>

          <section aria-labelledby="faq-title">
            <div className="section-heading"><div><span>06 / TRUST</span><h2 id="faq-title">Dungeon Quest Reborn FAQ</h2></div></div>
            <div className="faq-grid">{home.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
          </section>
        </div>
      </main>
    </>
  );
}
