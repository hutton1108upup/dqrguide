import { HomeSearch } from "@/components/home-search";
import { ArrowRight, BookOpen, Box, Gift, Map, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FeaturedGuide } from "@/components/featured-guide";

import { EvidenceBadge } from "@/components/evidence-badge";
import { JsonLd } from "@/components/json-ld";
import { officialGameSnapshot, statusChecks, tierReview } from "@/content/game-data";
import { getPageByPath, getRuntimeEnvironment, isPageAvailable, type RuntimeEnvironment } from "@/content/routes";
import { siteConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/seo";

const home = getPageByPath("/")!;
export const metadata: Metadata = createPageMetadata(home);
const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatRobloxUpdatedAt(value: string) {
  const [date, time = ""] = value.split("T");
  const [year, month, day] = date.split("-");
  return `${monthLabels[Number(month) - 1]} ${Number(day)}, ${year} · ${time.slice(0, 5)} UTC`;
}

const robloxUpdatedLabel = formatRobloxUpdatedAt(officialGameSnapshot.robloxUpdatedAt);
const tasks = [
  { href: "/dungeons/", label: "Dungeon progression", note: "What should I run next?", icon: Map },
  { href: "/drops/", label: "Drop tables", note: "Where does this item come from?", icon: Box },
  { href: "/spells/", label: "Spells & skills", note: "Which role fits the build?", icon: Sparkles },
  { href: "/codes/", label: "Codes status", note: "Is anything verified active?", icon: Gift },
  { href: "/differences/", label: "Reborn differences", note: "What carries over?", icon: BookOpen },
  { href: "/trading/", label: "Trading safety", note: "How do I avoid a bad trade?", icon: Scale }
] as const;
const demandQuestions = [
  { href: "/spells/", label: "Find a spell and how to use it", note: "Twelve named abilities, use filters and linked skill guides.", icon: Sparkles },
  { href: "/dungeons/northern-lands/", label: "Learn the Northern Lands route", note: "Seven route stages, Bob's orb explanation, Odin positioning and failure fixes.", icon: Map },
  { href: "/drops/", label: "Look up an item source", note: "Four item-location reports, with uncertain leads listed separately.", icon: Box },
  { href: "/trello/", label: "Find the Trello status and useful links", note: "A dated status answer and direct routes to game information.", icon: BookOpen }
] as const;

export function getHomeTasks(environment: RuntimeEnvironment = getRuntimeEnvironment()) {
  return tasks.filter(({ href }) => {
    const page = getPageByPath(href);
    return page ? isPageAvailable(page, environment) : false;
  });
}

export function getHomeLink(href: string, environment: RuntimeEnvironment = getRuntimeEnvironment()) {
  const page = getPageByPath(href);
  return page && isPageAvailable(page, environment) ? page.path : undefined;
}

function HomeLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const destination = getHomeLink(href);
  return destination
    ? <Link href={destination} className={className}>{children}</Link>
    : <span className={`${className} disabled-link`} aria-label="This guide is not published yet">{children}</span>;
}

export default function HomePage() {
  const homeSchema = [
    { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.fullName, url: siteConfig.url, description: siteConfig.description },
    { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, description: "Independent evidence-labelled Dungeon Quest Reborn fan reference." }
  ];

  return (
    <>
      <JsonLd data={homeSchema} />
      <main className="home-visual-v11">
        <section className="home-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-composition">
            <div className="hero-text">
            <div className="version-pill"><span /> Current official title: {officialGameSnapshot.name}</div>
            <p className="eyebrow">{home.eyebrow}</p>
            <h1><em>{home.h1.slice(0, "Dungeon Quest Reborn".length)}</em>{home.h1.slice("Dungeon Quest Reborn".length)}</h1>
            <p className="hero-copy">Find Dungeon Quest Reborn spells, reported item drops and dungeon walkthroughs. Start with the item you want or the boss stopping your run.</p>
            <div className="hero-actions">
              <HomeLink href="/dungeons/" className="hero-button primary">Explore Dungeons <ArrowRight size={16} aria-hidden="true" /></HomeLink>
              <HomeLink href="/spells/" className="hero-button secondary">Browse Spells</HomeLink>
            </div>
            <div className="verification-line">
              <ShieldCheck size={16} aria-hidden="true" /> Official Roblox metadata checked <b>{home.lastVerified}</b><span>Universe {officialGameSnapshot.universeId}</span>
            </div>
            </div>
            <figure className="hero-artwork">
              {/* Roblox promotional artwork: identifies the source, not the pictured dungeon or mechanics. */}
              <Image src="/images/dqr/official-party-boss-arena.webp" alt="Adventurers fighting an armored enemy amid blue and orange effects in official Dungeon Quest Reborn promotional artwork" width={768} height={432} sizes="(max-width: 880px) calc(100vw - 36px), 480px" loading="eager" fetchPriority="high" />
              <figcaption><a href="https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn" target="_blank" rel="noreferrer">Official Dungeon Quest Reborn artwork ↗</a></figcaption>
            </figure>
            </div>
            <HomeSearch />
          </div>
        </section>

        <div className="shell home-stack">
          <section className="tldr-card" aria-labelledby="quick-answer-title">
            <div className="tldr-label">TL;DR / START HERE</div>
            <h2 id="quick-answer-title">Pick the guide for your next decision</h2>
            <p>{home.quickAnswer}</p>
            <div className="answer-grid">
              <div><span>Official identity</span><b>Confirmed</b><small>Roblox + publisher relationship</small></div>
              <div><span>Current rankings</span><b>Under review</b><small>No tier shown without a repeatable test</small></div>
              <div><span>Codes / links</span><b>Source-gated</b><small>No unverified action buttons</small></div>
            </div>
          </section>

          <section className="demand-section" aria-labelledby="demand-title">
            <div className="section-heading"><div><span>01 / PLAYER QUESTIONS</span><h2 id="demand-title">Most asked player questions</h2></div><p>Spells, item locations, Northern Lands and Trello</p></div>
            <div className="demand-grid">
              {demandQuestions.map(({ href, label, note, icon: Icon }) => (
                <HomeLink href={href} className="demand-card" key={href}>
                  <Icon size={20} aria-hidden="true" />
                  <span><b>{label}</b><small>{note}</small></span>
                  <ArrowRight size={16} aria-hidden="true" />
                </HomeLink>
              ))}
            </div>
          </section>

          <section className="home-explainer" aria-labelledby="guide-use-title">
            <div className="section-heading"><div><span>WIKI GUIDE</span><h2 id="guide-use-title">How to use this Dungeon Quest Reborn wiki</h2></div></div>
            <div className="explainer-lead">
              <p>Looking for a skill? Open <Link href="/spells/">Spells</Link> to compare uses, then follow its guide to the reported source. If you already know the item name, start with <Link href="/drops/">Drops</Link>.</p>
              <p>This fan wiki covers the Roblox experience by Delta Quarters OG. If you searched for “[Northern Lands] Dungeon Quest Reborn,” the <Link href="/dungeons/northern-lands/">Northern Lands walkthrough</Link> covers the regular route. <Link href="/dungeons/northern-lands/odin-reincarnation/">Odin Reincarnation</Link> has a separate bonus-fight guide.</p>
              <p>Guides link dated player videos and official records. Unknown requirements and drop rates stay marked; check the source date before planning a long farming session.</p>
            </div>
          </section>
          <section aria-labelledby="recent-guides-title">
            <div className="section-heading"><div><span>RECENT ADDITIONS</span><h2 id="recent-guides-title">More guides to explore</h2></div></div>
            <div className="demand-grid">
              <HomeLink href="/dungeons/northern-lands/odin-reincarnation/" className="demand-card"><Map size={20} aria-hidden="true" /><span><b>Odin Reincarnation</b><small>Bonus boss entry and attack warnings.</small></span><ArrowRight size={16} aria-hidden="true" /></HomeLink>
              <HomeLink href="/spells/enhanced-inner-focus/" className="demand-card"><Sparkles size={20} aria-hidden="true" /><span><b>Enhanced Inner Focus</b><small>Reported drops and comparison with regular Inner Focus.</small></span><ArrowRight size={16} aria-hidden="true" /></HomeLink>
            </div>
          </section>

          <section aria-labelledby="start-title">
            <div className="section-heading"><div><span>01 / ROUTES</span><h2 id="start-title">Start with the player task</h2></div><p>Six fast doors into the database</p></div>
            <div className="task-grid">
              {getHomeTasks().map(({ href, label, note, icon: Icon }) => (
                <Link href={href} className="task-card" key={href}>
                  <Icon size={20} aria-hidden="true" /><span><b>{label}</b><small>{note}</small></span><ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="tier-title">
            <div className="section-heading"><div><span>02 / META</span><h2 id="tier-title">Current tier review</h2></div><HomeLink href="/tier-list/" className="text-link">Open methodology <ArrowRight size={14} /></HomeLink></div>
            <div className="review-board">
              <div className="review-grade">?</div>
              <div className="review-copy">
                <div className="review-status"><span className="status-dot warning" /> {tierReview.state}</div>
                <h3>No launch tier is assigned without a repeatable current-version check.</h3>
                <p>Named items and letter grades stay off the board until a current test can explain where each recommendation works and where it fails.</p>
                <div className="criteria-list">{tierReview.criteria.map((criterion) => <span key={criterion}>{criterion}</span>)}</div>
                <div className="review-links"><HomeLink href="/spell-tier-list/" className="text-link">Spell tier method <ArrowRight size={12} /></HomeLink><HomeLink href="/gamepasses/" className="text-link">Gamepass review <ArrowRight size={12} /></HomeLink></div>
              </div>
            </div>
          </section>

          <section aria-labelledby="dungeon-title">
            <div className="section-heading"><div><span>03 / PROGRESSION</span><h2 id="dungeon-title">Dungeon routes being checked</h2></div><HomeLink href="/dungeons/" className="text-link">Open progression hub <ArrowRight size={14} /></HomeLink></div>
            <div className="dungeon-grid">
              <HomeLink href="/dungeons/northern-lands/" className="dungeon-card current illustrated-dungeon">
                {/* Concept illustration, not a screenshot or evidence of the dungeon layout. */}
                <span className="dungeon-artwork"><Image src="/images/dqr/hero-northern-lands.webp" alt="Northern Lands concept illustration: an icy stone gate under an aurora, AI-generated rather than an in-game screenshot" width={1200} height={800} sizes="(max-width: 880px) calc(100vw - 64px), 500px" /><small>AI concept illustration</small></span>
                <span className="dungeon-index">NL</span><span className="dungeon-card-copy"><b>Northern Lands</b><small>Timestamped solo-route companion and boss tactics</small></span><EvidenceBadge level="Community Confirmed" />
              </HomeLink>
              <HomeLink href="/dungeons/winter-outpost/" className="dungeon-card illustrated-dungeon">
                <span className="dungeon-artwork"><Image src="/images/dqr/banner-winter-outpost.webp" alt="Winter Outpost concept illustration: a snow-covered timber fortress, AI-generated rather than an in-game screenshot" width={1200} height={800} sizes="(max-width: 880px) calc(100vw - 64px), 500px" /><small>AI concept illustration</small></span>
                <span className="dungeon-index">WO</span><span className="dungeon-card-copy"><b>Winter Outpost</b><small>Warrior and Mage video chapters; current values unverified</small></span><EvidenceBadge level="Legacy / Unconfirmed" />
              </HomeLink>
            </div>
          </section>

          <figure className="wide-game-artwork">
            {/* A distinct official asset; existing inner-page media is intentionally untouched. */}
            <Image src="/images/dqr/official-cavern-boss.webp" alt="A cyan-armored adventurer facing a purple creature in a cavern, from the official Dungeon Quest Reborn promotional gallery" width={768} height={432} sizes="(max-width: 1096px) calc(100vw - 36px), 1060px" />
            <figcaption><a href="https://www.roblox.com/games/77649408247578/Dungeon-Quest-Reborn" target="_blank" rel="noreferrer">Official promotional artwork · Dungeon Quest Reborn ↗</a></figcaption>
          </figure>
          <section aria-labelledby="status-title">
            <div className="section-heading"><div><span>04 / LIVE CHECKS</span><h2 id="status-title">Codes, Trello and Discord</h2></div><p>Checked {statusChecks.codes.checked}</p></div>
            <p className="status-note">No active code is published; no Trello board or Discord invite is labelled official without a first-party URL.</p>
            <div className="status-grid">
              {([["Codes", "/codes/", statusChecks.codes], ["Trello", "/trello/", statusChecks.trello], ["Discord", "/discord/", statusChecks.discord]] as const).map(([name, href, status]) => (
                <HomeLink href={href} className="status-card" key={name}>
                  <div><span className="status-dot warning" /><small>{status.state}</small></div><h3>{name}</h3><p>{status.label}</p><span className="text-link">Open evidence <ArrowRight size={13} /></span>
                </HomeLink>
              ))}
            </div>
          </section>

          <FeaturedGuide />
          <section className="update-strip" aria-labelledby="updates-title">
            <div><span>05 / UPDATE SIGNAL</span><h2 id="updates-title">Latest verified platform change</h2></div>
            <p><b>{robloxUpdatedLabel}</b> — Roblox metadata updated for <em>{officialGameSnapshot.name}</em>. This timestamp is not presented as a patch note.</p>
            <HomeLink href="/updates/" className="text-link">Read the ledger <ArrowRight size={14} /></HomeLink>
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
