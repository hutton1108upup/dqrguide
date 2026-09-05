import { ArrowRight, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { gamePassSnapshot, knownUniversePlaces, officialGameSnapshot, statusChecks, tierReview } from "@/content/game-data";
import { getFreshnessStatus, getSingaporeDate } from "@/content/freshness.mjs";
import { getPageByPath, getPlayerFacingStatus, getRuntimeEnvironment, getVisiblePages, isPageAvailable } from "@/content/routes";
import { siteConfig } from "@/content/site";
import type { SitePage } from "@/content/types";

import { EvidenceBadge } from "./evidence-badge";
import { ContentMedia } from "./content-media";
import { JsonLd } from "./json-ld";
import { GuideTable } from "./guide-table";
import { VideoLink } from "./video-dialog";

const firstPassFields: Record<string, string[]> = {
  "/spells/": ["Spell", "Class", "Role", "Source dungeon", "Difficulty", "Required level", "Best for", "Tier", "Verified"],
  "/drops/": ["Item", "Type", "Class", "Rarity", "Source dungeon", "Difficulty", "Tradable", "Rate status", "Verified"],
  "/weapons/": ["Weapon", "Class", "Rarity", "Source dungeon", "Difficulty", "Required level", "Best build", "Tier", "Verified"],
  "/armor/": ["Armor", "Slot", "Class", "Rarity", "Source dungeon", "Required level", "Set role", "Trade status", "Verified"],
  "/cosmetics/": ["Cosmetic", "Type", "Source / event", "Availability", "Trade status", "Version", "Verified"],
  "/beginner-guide/": ["First route", "Role", "Dungeon", "Upgrade", "Spell", "Common mistake", "Version", "Verified"],
  "/builds/": ["Role", "Stage", "Stat priority", "Spells", "Weapon goal", "Armor goal", "Alternative", "Version", "Verified"],
  "/builds/mage/": ["Mage job", "Stage", "Primary spell", "Weapon goal", "Armor goal", "Stat priority", "Alternative", "Verified"],
  "/builds/warrior/": ["Warrior job", "Stage", "Primary spell", "Weapon goal", "Armor goal", "Stat priority", "Alternative", "Verified"],
  "/builds/tank/": ["Survival goal", "Stage", "Utility", "Weapon goal", "Armor goal", "Stat priority", "Alternative", "Verified"],
  "/builds/healer/": ["Support goal", "Stage", "Recovery spell", "Weapon goal", "Armor goal", "Stat priority", "Alternative", "Verified"],
  "/scripts-macros/": ["Risk", "Tool type", "Account safety", "Policy status", "Safer alternative", "Source", "Verified"]
};

export function buildPageSchema(page: SitePage) {
  const url = new URL(page.path, siteConfig.url).toString();
  const childPages = getDirectChildPages(page);
  const breadcrumbItems = buildBreadcrumbItems(page);
  const schemas: Array<Record<string, unknown>> = [
    {
      "@context": "https://schema.org",
      "@type": page.kind === "hub" ? "CollectionPage" : "Article",
      headline: page.h1,
      description: page.description,
      url,
      datePublished: page.datePublished,
      dateModified: page.dateModified,
      isPartOf: { "@type": "WebSite", name: siteConfig.fullName, url: siteConfig.url }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems
    }
  ];

  if (page.faq.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer }
      }))
    });
  }

  if (page.kind === "hub" && childPages.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: childPages.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.h1,
        url: new URL(item.path, siteConfig.url).toString()
      }))
    });
  }

  return schemas;
}

function getDirectChildPages(page: SitePage): SitePage[] {
  return getVisiblePages(getRuntimeEnvironment()).filter((candidate) => {
    if (candidate.path === page.path || !candidate.path.startsWith(page.path)) return false;
    return candidate.path.slice(page.path.length).split("/").filter(Boolean).length === 1;
  });
}

export function buildBreadcrumbItems(page: SitePage) {
  const items: Array<{ "@type": "ListItem"; position: number; name: string; item: string }> = [
    { "@type": "ListItem", position: 1, name: "Home", item: new URL("/", siteConfig.url).toString() }
  ];
  const segments = page.path.split("/").filter(Boolean);
  if (segments.length > 1) {
    const parentPath = `/${segments.slice(0, -1).join("/")}/`;
    const parent = getPageByPath(parentPath);
    if (parent && isPageAvailable(parent, getRuntimeEnvironment())) {
      items.push({ "@type": "ListItem", position: items.length + 1, name: parent.h1, item: new URL(parent.path, siteConfig.url).toString() });
    }
  }
  items.push({ "@type": "ListItem", position: items.length + 1, name: page.h1, item: new URL(page.path, siteConfig.url).toString() });
  return items;
}

function DataPanel({ page }: { page: SitePage }) {
  const [robloxUpdatedDate, robloxUpdatedTime = ""] = officialGameSnapshot.robloxUpdatedAt.split("T");
  const robloxUpdatedClock = robloxUpdatedTime.replace("Z", "").split(".", 1)[0];
  if (page.kind === "trust") return null;
  // Enriched guides put their actual lookup or route first, not an empty checklist.
  if (page.sections.some(section => section.table)) return null;

  if (page.path === "/differences/") {
    return (
      <>
        <section className="surface-card" aria-labelledby="identity-title">
          <div className="card-heading"><span>OFFICIAL SNAPSHOT</span><h2 id="identity-title">Experience identity</h2></div>
          <div className="fact-grid">
            <article><span>Reborn universe</span><b>{officialGameSnapshot.universeId}</b></article>
            <article><span>Reborn root place</span><b>{officialGameSnapshot.rootPlaceId}</b></article>
            <article><span>Creator</span><b>{officialGameSnapshot.creatorName}</b></article>
            <article><span>Licensed by</span><b>{officialGameSnapshot.licensedBy}</b></article>
          </div>
        </section>
        <section className="surface-card" aria-labelledby="differences-table-title">
          <div className="card-heading"><span>PUBLIC API / DESCRIPTION COMPARISON</span><h2 id="differences-table-title">Differences by evidence row</h2></div>
          <div className="table-scroll"><table><thead><tr><th>Topic</th><th>Original</th><th>Reborn</th><th>Status</th><th>Source</th></tr></thead><tbody>
            {page.differenceRows.map((row) => <tr key={row.id}><td>{row.topic}</td><td>{row.originalValue}</td><td>{row.rebornValue}</td><td><span className={`claim-status ${row.claimStatus}`}>{row.claimStatus.replaceAll("_", " ")}</span><small className="claim-note">{row.lastChecked} · {row.verifiedForVersion ?? "Version not verified"}</small></td><td><a href={row.sourceURL ?? undefined} target="_blank" rel="noreferrer">Open source <ExternalLink size={11} aria-hidden="true" /></a></td></tr>)}
          </tbody></table></div>
          <p className="table-note">Confirmed rows describe public Roblox records or listing text. They do not prove account transfer, gameplay parity, or in-client purchase behavior.</p>
        </section>
      </>
    );
  }

  if (page.path === "/gamepasses/") {
    return (
      <section className="surface-card" aria-labelledby="passes-title">
        <div className="card-heading"><span>PUBLIC API / NOT A BUY LIST</span><h2 id="passes-title">Game-pass records returned</h2></div>
        <div className="table-scroll"><table><thead><tr><th>Name</th><th>For sale</th><th>Public price</th><th>Recommendation</th></tr></thead><tbody>
          {gamePassSnapshot.map((pass) => <tr key={pass.name}><td>{pass.name}</td><td>No</td><td>Not returned</td><td>Withheld</td></tr>)}
        </tbody></table></div>
        <p className="table-note">Technical API labels may not match a user-facing storefront. Open the live experience before spending.</p>
      </section>
    );
  }

  if (page.path === "/codes/") {
    return (
      <section className="surface-card status-surface" aria-labelledby="codes-panel-title">
        <div className="card-heading"><span>STATUS CHECK</span><h2 id="codes-panel-title">Code verification panel</h2></div>
        <div className="fact-grid">
          <article><span>Active codes</span><b>0 confirmed</b></article>
          <article><span>Redemption menu</span><b>Not confirmed</b></article>
          <article><span>Last checked</span><b>{page.lastVerified ?? "Not recorded"}</b></article>
          <article><span>Checked sources</span><b>Roblox page + API</b></article>
        </div>
        <div className="empty-state"><ShieldAlert size={19} aria-hidden="true" /><div><b>No active code is published</b><p>A copy action appears only after both the code and a current redemption path are confirmed.</p></div></div>
      </section>
    );
  }

  if (page.path === "/tier-list/" || page.path === "/spell-tier-list/") {
    return (
      <section className="surface-card" aria-labelledby="ranking-panel-title">
        <div className="pending-board"><div className="pending-grade">?</div><div><span>{tierReview.state}</span><h2 id="ranking-panel-title">No ranking yet</h2><p>Every grade needs a current source, use case, weakness, alternative, and repeatable result.</p></div></div>
        <div className="criteria-list">{tierReview.criteria.map((item) => <span key={item}>{item}</span>)}</div>
      </section>
    );
  }

  if (page.path === "/dungeons/") {
    return (
      <section className="surface-card" aria-labelledby="dossier-title">
        <div className="card-heading"><span>DOSSIER STATUS</span><h2 id="dossier-title">Current route evidence</h2></div>
        <div className="dossier-grid">
          <Link href="/dungeons/northern-lands/" className="dossier-card"><div><b>Northern Lands</b><EvidenceBadge level="Official" /></div><p>Confirmed as a current official experience label. Requirements and drops remain under review.</p></Link>
          <Link href="/dungeons/winter-outpost/" className="dossier-card"><div><b>Winter Outpost</b><EvidenceBadge level="Legacy / Unconfirmed" /></div><p>Current Reborn access, route, boss, and drop details still need direct evidence.</p></Link>
        </div>
        <p className="table-note">No fixed dungeon count is published until the live sequence is verified.</p>
      </section>
    );
  }

  if (page.path === "/dungeons/northern-lands/") {
    return (
      <section className="surface-card" aria-labelledby="northern-snapshot-title">
        <div className="card-heading"><span>CURRENT SOURCE SNAPSHOT</span><h2 id="northern-snapshot-title">Northern Lands source snapshot</h2></div>
        <div className="fact-grid">
          <article><span>Official title</span><b>Northern Lands confirmed</b></article>
          <article><span>Route footage</span><b>Two current community runs</b></article>
          <article><span>Exact requirements</span><b>Not collected</b></article>
          <article><span>Complete loot table</span><b>Not collected</b></article>
        </div>
        <p className="table-note">Use the videos to learn the visible route and telegraphs. Confirm difficulty, access, scaling, and rewards in the current client.</p>
      </section>
    );
  }

  if (page.path === "/dungeons/winter-outpost/") {
    return (
      <section className="surface-card" aria-labelledby="winter-snapshot-title">
        <div className="card-heading"><span>CURRENT SOURCE SNAPSHOT</span><h2 id="winter-snapshot-title">Winter Outpost source snapshot</h2></div>
        <div className="fact-grid">
          <article><span>Community footage</span><b>Manual review candidate</b></article>
          <article><span>Exact requirements</span><b>Not collected</b></article>
          <article><span>Boss details</span><b>Not collected</b></article>
          <article><span>Complete loot table</span><b>Not collected</b></article>
        </div>
      </section>
    );
  }

  const fields = firstPassFields[page.path];
  if (fields) {
    const checklistTitle = page.path === "/spells/"
      ? "What to verify on an ability card"
      : ["/weapons/", "/armor/", "/cosmetics/", "/drops/"].includes(page.path)
        ? "What to verify on an item card"
        : page.path === "/beginner-guide/"
          ? "What to check on your first run"
          : page.path.startsWith("/builds/") || page.path === "/builds/"
            ? "What to test in a build"
            : "What to check before trusting a tool";
    return (
      <section className="surface-card" aria-labelledby="data-gate-title">
        <div className="card-heading"><span>PLAYER CHECKLIST</span><h2 id="data-gate-title">{checklistTitle}</h2></div>
        <div className="field-strip">{fields.map((field) => <span key={field}>{field}</span>)}</div>
        <div className="empty-state"><ShieldAlert size={19} aria-hidden="true" /><div><b>No verified rows yet</b><p>Check the current Reborn name, source, version, and use case before treating a row as game data.</p></div></div>
      </section>
    );
  }

  if (page.path === "/updates/") {
    return (
      <>
        <section className="surface-card" aria-labelledby="api-signal-title">
          <div className="card-heading"><span>OFFICIAL API SIGNAL</span><h2 id="api-signal-title">Latest platform timestamp</h2></div>
          <div className="signal-line"><span>{robloxUpdatedDate}</span><b>{robloxUpdatedClock} UTC</b><p>Metadata updated for the current Northern Lands title. No gameplay patch detail is inferred.</p></div>
        </section>
        <section className="surface-card" aria-labelledby="updates-table-title">
          <div className="card-heading"><span>UPDATE LEDGER</span><h2 id="updates-table-title">Version and source records</h2></div>
          <div className="table-scroll"><table><thead><tr><th>Version / date</th><th>Actual change</th><th>Status</th><th>Affected pages</th><th>Source</th></tr></thead><tbody>
            {page.updates.map((update) => <tr key={update.id}><td><b>{update.versionTitle}</b><small className="claim-note">{update.publishedDate}</small></td><td>{update.actualChanges}</td><td><span className={`claim-status ${update.claimStatus}`}>{update.claimStatus.replaceAll("_", " ")}</span><small className="claim-note">{update.evidenceNote}</small></td><td>{update.affectedPaths.length ? update.affectedPaths.map((href) => <Link href={href} key={href}>{href}</Link>) : "None — no gameplay relationship inferred"}</td><td><a href={update.sourceURL ?? undefined} target="_blank" rel="noreferrer">Open source <ExternalLink size={11} aria-hidden="true" /></a></td></tr>)}
          </tbody></table></div>
          <p className="table-note">A metadata signal is not a patch note. No gameplay summary is shown until a first-party update body identifies the actual changes and affected pages.</p>
        </section>
      </>
    );
  }

  if (page.path === "/trello/" || page.path === "/discord/") {
    const status = page.path === "/trello/" ? statusChecks.trello : statusChecks.discord;
    return (
      <section className="surface-card status-surface" aria-labelledby="link-status-title">
        <div className="card-heading"><span>DIRECT-LINK CHECK</span><h2 id="link-status-title">{status.label}</h2></div>
        <div className="empty-state"><ShieldAlert size={19} aria-hidden="true" /><div><b>{status.state}</b><p>{status.detail}</p></div></div>
      </section>
    );
  }

  if (page.path === "/trading/") {
    return (
      <section className="surface-card" aria-labelledby="trade-check-title">
        <div className="card-heading"><span>SAFE PROCESS</span><h2 id="trade-check-title">Five checks before accepting</h2></div>
        <ol className="step-list"><li>Verify the destination player.</li><li>Add only the agreed items.</li><li>Re-check every slot after a change.</li><li>Read the final confirmation screen.</li><li>Never share account credentials or session tokens.</li></ol>
      </section>
    );
  }

  if (page.path === "/") return null;

  return (
    <section className="surface-card" aria-labelledby="universe-title">
      <div className="card-heading"><span>UNIVERSE PLACES</span><h2 id="universe-title">Official place records</h2></div>
      <div className="fact-grid">{knownUniversePlaces.map((place) => <article key={place.id}><span>{place.id}</span><b>{place.name}</b></article>)}</div>
    </section>
  );
}

function ClaimEvidencePanel({ page }: { page: SitePage }) {
  if (!page.claims.length) return null;

  return (
    <section className="surface-card claim-evidence" aria-labelledby="claim-evidence-title">
      <div className="card-heading"><span>SOURCE CHECK</span><h2 id="claim-evidence-title">What the sources confirm</h2></div>
      <div className="table-scroll">
        <table>
          <thead><tr><th>Topic</th><th>Fact</th><th>Status</th><th>Version</th><th>Source</th></tr></thead>
          <tbody>
            {page.claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.topic}</td>
                <td><b>{claim.value}</b><small className="claim-note">{claim.evidenceNote}</small></td>
                <td><span className={`claim-status ${claim.claimStatus}`}>{claim.claimStatus.replaceAll("_", " ")}</span><small className="claim-note">{claim.confidence} confidence · checked {claim.lastChecked}</small></td>
                <td>{claim.verifiedForVersion ?? "Not yet verified"}</td>
                <td>{claim.sourceURL ? <a href={claim.sourceURL} target="_blank" rel="noreferrer">Open source <ExternalLink size={11} aria-hidden="true" /></a> : "No source URL"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ContentPage({ page }: { page: SitePage }) {
  const freshness = getFreshnessStatus(page, getSingaporeDate());
  const showRefreshBanner = freshness.state !== "current";
  const refreshTitle = freshness.state === "not_collected"
    ? "Gameplay details still needed"
    : freshness.state === "fetch_failed"
      ? "Source check incomplete"
      : freshness.state === "version_gap"
        ? "Current-version check needed"
        : "Page check due";
  const visibleRelated = page.related.filter((item) => {
    const linkedPage = getPageByPath(item.href);
    return linkedPage ? isPageAvailable(linkedPage, getRuntimeEnvironment()) : true;
  });
  const breadcrumbItems = buildBreadcrumbItems(page);

  return (
    <>
      <JsonLd data={buildPageSchema(page)} />
      <main className="shell page-stack">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbItems.map((item, index) => index === breadcrumbItems.length - 1
            ? <span key={item.item}>{item.name}</span>
            : <span className="breadcrumb-link" key={item.item}><Link href={new URL(item.item).pathname}>{index === 0 ? siteConfig.name : item.name}</Link><span>/</span></span>)}
        </nav>
        <header className="page-hero">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.h1}</h1>
          {page.path !== "/spells/" && page.path !== "/drops/" && !page.path.startsWith("/spells/") ? <p>{page.summary}</p> : null}
          <div className="meta-strip"><span className="content-state">{getPlayerFacingStatus(page)}</span><span>Checked {page.lastVerified}</span><span>Version: {page.verifiedForVersion ?? "Not yet verified"}</span></div>
        </header>

        {page.path === "/spells/" || page.path === "/drops/" || page.path.startsWith("/spells/") ? <nav className="quick-jumps" aria-label="Quick lookup">
          <a href={page.path === "/spells/" ? "#ability-list" : page.path === "/drops/" ? "#reported-locations" : "#ability-overview"}>Quick lookup</a>
          <a href={page.path === "/spells/" ? "#source-dungeons" : page.path === "/drops/" ? "#reported-locations" : "#where-to-get"}>Find a source</a>
          {page.path !== "/drops/" ? <a href={page.path === "/spells/" ? "#ability-walkthrough" : "#demonstration"}>Watch a demo</a> : null}
        </nav> : null}

        {page.path === "/dungeons/northern-lands/" ? <nav className="quick-jumps boss-jumps" aria-label="Where are you stuck?">
          <span>Where are you stuck?</span><a href="#route-opening">Opening rooms</a><a href="#route-champion">First boss</a><a href="#bob-orbs">Bob</a><a href="#route-odin">Odin</a>
        </nav> : null}

        {showRefreshBanner ? <aside className={`refresh-banner ${freshness.state}`} role="status"><b>{refreshTitle}</b><span>{freshness.reason}</span><small>Last checked {page.lastVerified ?? "not recorded"} · Next check {page.nextScheduledCheck ?? "not scheduled"}</small></aside> : null}

        <section className="quick-answer" aria-labelledby="quick-answer-heading"><span>QUICK ANSWER</span><h2 id="quick-answer-heading">What to do now</h2><p>{page.quickAnswer}</p></section>

        <nav className="toc" aria-label="On this page"><span>ON THIS PAGE</span>{page.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>

        <div className="content-layout">
          <div className="article-column">
            <DataPanel page={page} />
            {page.sections.map((section) => (
              <section className="surface-card editorial-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.id === "ability-list" ? <>
                  <p>Community-reported ability uses. Exact values and drop conditions remain unverified.</p>
                  <details className="lookup-notes"><summary>Source & coverage notes</summary>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</details>
                </> : section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                {section.table ? <GuideTable table={section.table} title={section.title}
                  variant={page.path === "/spells/" && section.id === "ability-list" ? "spells" : page.path === "/drops/" && section.id === "reported-locations" ? "drops" : undefined}
                  detailLinks={Object.fromEntries(section.table.rows.flatMap(row => {
                    const path = `/spells/${row.cells[0].toLowerCase().replaceAll(" ", "-")}/`;
                    const detail = getPageByPath(path);
                    return detail && isPageAvailable(detail, getRuntimeEnvironment()) ? [[row.cells[0], path]] : [];
                  }))}
                  rowIds={section.id === "room-route" ? { "Opening groups": "route-opening", "Midgardian Champion": "route-champion", "Odin": "route-odin" } : undefined}
                /> : null}
                {section.links ? <div className="section-links">{section.links.map(item => item.href.startsWith("/")
                  ? <Link key={item.href} href={item.href}><b>{item.label}</b><small>{item.description}</small><ArrowRight size={14} aria-hidden="true" /></Link>
                  : <VideoLink key={item.href} url={item.href} title={item.label}><b>{item.label}</b><small>{item.description}</small><ExternalLink size={14} aria-hidden="true" /></VideoLink>)}</div> : null}
                {section.media ? <ContentMedia items={section.media} /> : null}
              </section>
            ))}
            <ClaimEvidencePanel page={page} />
          </div>

          <aside className="sidebar-column">
            <section className="surface-card"><div className="card-heading"><span>NEXT ROUTES</span><h2>Related pages</h2></div><div className="related-stack">{visibleRelated.map((item) => <Link href={item.href} key={item.href}><b>{item.label}</b><small>{item.description}</small><ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
            <section className="surface-card"><div className="card-heading"><span>VISIBLE FAQ</span><h2>Questions players ask</h2></div><div className="side-faq">{page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
            <section className="surface-card"><div className="card-heading"><span>EVIDENCE</span><h2>Source notes</h2></div><div className="source-stack">{page.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><b>{source.title}</b><small>{source.evidenceNote}</small><span>{source.evidenceLevel} · checked {source.lastChecked} <ExternalLink size={11} /></span></a>)}</div></section>
          </aside>
        </div>
      </main>
    </>
  );
}
