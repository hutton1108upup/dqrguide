import { ArrowRight, BookOpen, Box, Gift, Map, Scale, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EvidenceBadge } from "@/components/evidence-badge";
import { JsonLd } from "@/components/json-ld";
import { GateMark } from "@/components/site-logo";
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
    : <span className={`${className} disabled-link`} aria-label="Available in review preview only">{children}</span>;
}

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
              <ShieldCheck size={16} aria-hidden="true" /> Official Roblox metadata checked <b>{home.lastVerified}</b><span>Universe {officialGameSnapshot.universeId}</span>
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

          <section className="home-explainer" aria-labelledby="guide-use-title">
            <div className="section-heading">
              <div>
                <span>00 / FIELD NOTES</span>
                <h2 id="guide-use-title">How to use this Dungeon Quest Reborn wiki</h2>
              </div>
              <p>Read the status before the recommendation</p>
            </div>
            <div className="explainer-lead">
              <p>
                Dungeon Quest Reborn answers are easiest to use when the player task, the current version, and the evidence behind each claim stay together. This guide is organised around the decision you are trying to make: choose a run, find an item source, understand a spell role, check a live-status question, or decide whether an old-game tip is safe to reuse.
              </p>
              <p>
                Open the matching route first, then scan the quick answer and the checked date. A page can be useful without pretending that every value is known. The database keeps confirmed identity facts, current observations, community reports, legacy leads, and collection gaps visibly separate so a player can act on the first category and investigate the rest.
              </p>
            </div>
            <div className="explainer-grid">
              <article className="explainer-card">
                <span>01 / VERIFIED</span>
                <h3>What is verified right now</h3>
                <p>
                  The official Roblox experience record identifies the current title as [Northern Lands] Dungeon Quest Reborn, gives the experience a stable universe and root place, and names Delta Quarters OG as the creator. Those facts establish which experience this guide is about; they do not automatically prove a dungeon order, spell effect, drop rate, or player-transfer rule.
                </p>
                <p>
                  The home page also records the public platform update timestamp as a metadata signal. It is displayed with its UTC time and is deliberately not rewritten as a patch note. When a page uses a community run, video, Reddit discussion, or public invite, the source card explains what that material can show and what it cannot establish.
                </p>
                <ul>
                  <li>Official identity and public metadata</li>
                  <li>Source date and current-version label</li>
                  <li>Claim-level confidence and limits</li>
                </ul>
              </article>
              <article className="explainer-card">
                <span>02 / WORKFLOW</span>
                <h3>Start from the decision you need</h3>
                <p>
                  Use <Link href="/dungeons/">Dungeons</Link> when the question is “what should I run next?” Use <Link href="/drops/">Drops</Link> when the item is already known and the missing answer is its source. Use <Link href="/spells/">Spells &amp; skills</Link> to compare roles and evidence fields, not to copy an untested tier list. The <Link href="/beginner-guide/">beginner route</Link> is a checklist for building a repeatable loop, not a promise that one class or loadout is universally best.
                </p>
                <p>
                  After choosing a page, check whether its label says Indexable or Public / noindex. That label is a publishing signal, not a judgment that the page is useless. Public noindex pages are available because their method, questions, and links help with research while their changing data is still being collected.
                </p>
                <ul>
                  <li>Question first, database second</li>
                  <li>Source and version beside the answer</li>
                  <li>Related route for the next decision</li>
                </ul>
              </article>
              <article className="explainer-card">
                <span>03 / DATA BOUNDARY</span>
                <h3>Unknown values stay out of the database</h3>
                <p>
                  A blank rate, price, level, damage value, or requirement is not permission to fill the cell from the original Dungeon Quest or a search snippet. This release keeps those fields as Not yet verified, Not collected, or another explicit state until a Reborn-specific source supports them. That is why the <Link href="/spells/">spell table</Link> and <Link href="/dungeons/">dungeon hub</Link> may show their comparison fields without presenting placeholder rows as facts.
                </p>
                <p>
                  The same boundary applies to codes, Trello, Discord, gamepasses, builds, and trading. A working community link can be useful without being official. A video can reveal a visible route without proving a universal fastest route. An API can return a technical record without confirming how the feature behaves during a player session.
                </p>
                <ul>
                  <li>No copied code without a confirmed redemption path</li>
                  <li>No ranking without a repeatable current-version test</li>
                  <li>No legacy value promoted as Reborn data</li>
                </ul>
              </article>
              <article className="explainer-card">
                <span>04 / REFRESH</span>
                <h3>How an answer becomes publishable</h3>
                <p>
                  A useful update starts with a direct source, a clear claim, the version it applies to, and a check date. The editorial record then explains whether the item is confirmed, reported, not collected, or blocked by a failed fetch. This makes a later correction traceable: a player can see what changed, why it changed, and which route should be rechecked next.
                </p>
                <p>
                  Visit <Link href="/source-policy/">Source policy</Link> for the evidence ladder and <Link href="/updates/">Updates</Link> for the verification ledger. If the current official experience changes its public identity or exposes a new source, the affected page can be refreshed without turning a build date into a gameplay claim. If a page is still thin, it stays reachable for review but does not compete in the search index before it can answer a searcher well.
                </p>
                <ul>
                  <li>Direct source, claim, version, and date</li>
                  <li>Visible limits instead of hidden uncertainty</li>
                  <li>Freshness check before indexability</li>
                </ul>
              </article>
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
                <p>The visual mockup&apos;s named items, stats, and letter grades remain examples only.</p>
                <div className="criteria-list">{tierReview.criteria.map((criterion) => <span key={criterion}>{criterion}</span>)}</div>
                <div className="review-links"><HomeLink href="/spell-tier-list/" className="text-link">Spell tier method <ArrowRight size={12} /></HomeLink><HomeLink href="/gamepasses/" className="text-link">Gamepass review <ArrowRight size={12} /></HomeLink></div>
              </div>
            </div>
          </section>

          <section aria-labelledby="dungeon-title">
            <div className="section-heading"><div><span>03 / PROGRESSION</span><h2 id="dungeon-title">Dungeon verification queue</h2></div><HomeLink href="/dungeons/" className="text-link">Open progression hub <ArrowRight size={14} /></HomeLink></div>
            <div className="dungeon-grid">
              <HomeLink href="/dungeons/northern-lands/" className="dungeon-card current">
                <span className="dungeon-index">NL</span><span><b>Northern Lands</b><small>Confirmed in the current official experience title</small></span><EvidenceBadge level="Official" />
              </HomeLink>
              <HomeLink href="/dungeons/winter-outpost/" className="dungeon-card">
                <span className="dungeon-index">WO</span><span><b>Winter Outpost</b><small>Requirements, route, and drops still need a Reborn check</small></span><EvidenceBadge level="Legacy / Unconfirmed" />
              </HomeLink>
            </div>
          </section>

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

          <section className="update-strip" aria-labelledby="updates-title">
            <div><span>05 / UPDATE SIGNAL</span><h2 id="updates-title">Latest verified platform change</h2></div>
            <p><b>{robloxUpdatedLabel}</b> — Roblox metadata updated for <em>[Northern Lands] Dungeon Quest Reborn</em>. This timestamp is not presented as a patch note.</p>
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
