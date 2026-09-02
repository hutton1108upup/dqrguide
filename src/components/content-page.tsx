import { ArrowRight, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { gamePassSnapshot, knownUniversePlaces, officialGameSnapshot, statusChecks, tierReview } from "@/content/game-data";
import { siteConfig } from "@/content/site";
import type { SitePage } from "@/content/types";

import { EvidenceBadge } from "./evidence-badge";
import { JsonLd } from "./json-ld";

export function buildPageSchema(page: SitePage) {
  const url = new URL(page.path, siteConfig.url).toString();
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
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: page.h1, item: url }
      ]
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

  if (page.kind === "hub") {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: page.related.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        url: new URL(item.href, siteConfig.url).toString()
      }))
    });
  }

  return schemas;
}

function DataPanel({ page }: { page: SitePage }) {
  if (page.path === "/differences/") {
    return (
      <section className="surface-card" aria-labelledby="identity-title">
        <div className="card-heading"><span>OFFICIAL SNAPSHOT</span><h2 id="identity-title">Experience identity</h2></div>
        <div className="fact-grid">
          <article><span>Universe ID</span><b>{officialGameSnapshot.universeId}</b></article>
          <article><span>Root Place ID</span><b>{officialGameSnapshot.rootPlaceId}</b></article>
          <article><span>Creator</span><b>{officialGameSnapshot.creatorName}</b></article>
          <article><span>Licensed by</span><b>{officialGameSnapshot.licensedBy}</b></article>
        </div>
      </section>
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
          <article><span>Last checked</span><b>Sep 2, 2026</b></article>
          <article><span>Checked sources</span><b>Roblox page + API</b></article>
        </div>
        <div className="empty-state"><ShieldAlert size={19} aria-hidden="true" /><div><b>No active code is published</b><p>A copy action appears only after both the code and a current redemption path are confirmed.</p></div></div>
      </section>
    );
  }

  if (page.path === "/tier-list/" || page.path === "/spell-tier-list/") {
    return (
      <section className="surface-card" aria-labelledby="ranking-panel-title">
        <div className="pending-board"><div className="pending-grade">?</div><div><span>{tierReview.state}</span><h2 id="ranking-panel-title">The board is deliberately empty</h2><p>Named chips and grades from the visual brief are not current-game evidence.</p></div></div>
        <div className="criteria-list">{tierReview.criteria.map((item) => <span key={item}>{item}</span>)}</div>
      </section>
    );
  }

  if (page.path === "/dungeons/" || page.path.startsWith("/dungeons/")) {
    return (
      <section className="surface-card" aria-labelledby="dossier-title">
        <div className="card-heading"><span>DOSSIER STATUS</span><h2 id="dossier-title">Current route evidence</h2></div>
        <div className="dossier-grid">
          <Link href="/dungeons/northern-lands/" className="dossier-card"><div><b>Northern Lands</b><EvidenceBadge level="Official" /></div><p>Confirmed as a current official experience label. Requirements and drops remain under review.</p></Link>
          <Link href="/dungeons/winter-outpost/" className="dossier-card"><div><b>Winter Outpost</b><EvidenceBadge level="Legacy / Unconfirmed" /></div><p>Requested dossier route; current Reborn facts have not passed the publication gate.</p></Link>
        </div>
        {page.path === "/dungeons/" ? <p className="table-note">No fixed dungeon count is published until the live sequence is verified.</p> : null}
      </section>
    );
  }

  if (page.path === "/spells/" || page.path === "/drops/") {
    const fields = page.path === "/spells/"
      ? ["Spell", "Class", "Role", "Source", "Difficulty", "Level", "Best for", "Tier", "Verified"]
      : ["Item", "Type", "Class", "Rarity", "Dungeon", "Difficulty", "Tradable", "Rate status", "Verified"];
    return (
      <section className="surface-card" aria-labelledby="data-gate-title">
        <div className="card-heading"><span>DATABASE GATE</span><h2 id="data-gate-title">Required fields before publication</h2></div>
        <div className="field-strip">{fields.map((field) => <span key={field}>{field}</span>)}</div>
        <div className="empty-state"><ShieldAlert size={19} aria-hidden="true" /><div><b>No placeholder rows published</b><p>Records stay off the public table until a Reborn-specific name and source pass review.</p></div></div>
      </section>
    );
  }

  if (page.path === "/updates/") {
    return (
      <section className="surface-card" aria-labelledby="api-signal-title">
        <div className="card-heading"><span>OFFICIAL API SIGNAL</span><h2 id="api-signal-title">Latest platform timestamp</h2></div>
        <div className="signal-line"><span>2026-09-01</span><b>22:28:10 UTC</b><p>Metadata updated for the current Northern Lands title. No gameplay patch detail is inferred.</p></div>
      </section>
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

export function ContentPage({ page }: { page: SitePage }) {
  return (
    <>
      <JsonLd data={buildPageSchema(page)} />
      <main className="shell page-stack">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">DQR.GG</Link><span>/</span><span>{page.h1}</span></nav>
        <header className="page-hero">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.h1}</h1>
          <p>{page.summary}</p>
          <div className="meta-strip"><EvidenceBadge level={page.evidenceLevel} /><span>Checked {page.lastVerified}</span><span>Version: {page.verifiedForVersion ?? "Not yet verified"}</span>{page.indexable ? <span className="index-state index">Indexable</span> : <span className="index-state">Review preview / noindex</span>}</div>
        </header>

        <section className="quick-answer" aria-labelledby="quick-answer-heading"><span>QUICK ANSWER</span><h2 id="quick-answer-heading">What you can safely act on</h2><p>{page.quickAnswer}</p></section>

        <nav className="toc" aria-label="On this page"><span>ON THIS PAGE</span>{page.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>

        <div className="content-layout">
          <div className="article-column">
            <DataPanel page={page} />
            {page.sections.map((section) => (
              <section className="surface-card editorial-section" id={section.id} key={section.id}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
              </section>
            ))}
          </div>

          <aside className="sidebar-column">
            <section className="surface-card"><div className="card-heading"><span>NEXT ROUTES</span><h2>Related pages</h2></div><div className="related-stack">{page.related.map((item) => <Link href={item.href} key={item.href}><b>{item.label}</b><small>{item.description}</small><ArrowRight size={14} aria-hidden="true" /></Link>)}</div></section>
            <section className="surface-card"><div className="card-heading"><span>VISIBLE FAQ</span><h2>Questions players ask</h2></div><div className="side-faq">{page.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>
            <section className="surface-card"><div className="card-heading"><span>EVIDENCE</span><h2>Source notes</h2></div><div className="source-stack">{page.sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}><b>{source.title}</b><small>{source.evidenceNote}</small><span>{source.evidenceLevel} · checked {source.lastChecked} <ExternalLink size={11} /></span></a>)}</div></section>
          </aside>
        </div>
      </main>
    </>
  );
}
