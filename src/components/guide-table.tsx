"use client";

import Link from "next/link";
import { useState } from "react";
import type { PageSection } from "@/content/types";
import { VideoLink } from "./video-dialog";

type Props = {
  table: NonNullable<PageSection["table"]>;
  title: string;
  variant?: "spells" | "drops";
  detailLinks?: Record<string, string>;
  rowIds?: Record<string, string>;
};

function roleGroup(role: string) {
  if (/recovery/i.test(role)) return "Recovery";
  if (/buff/i.test(role)) return "Buffs";
  return "Damage";
}

export function GuideTable({ table, title, variant, detailLinks = {}, rowIds = {} }: Props) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All uses");
  const rows = table.rows.filter(row => !variant || variant === "drops" || (
    row.cells[0].toLowerCase().includes(query.trim().toLowerCase()) &&
    (role === "All uses" || roleGroup(row.cells[1]) === role)
  ));
  const name = (text: string) => detailLinks[text] ? <Link href={detailLinks[text]}>{text}</Link> : text;
  const source = (row: typeof rows[number]) => row.sourceURL
    ? <VideoLink url={row.sourceURL} title={`${row.cells[0]} · ${row.sourceLabel ?? "Explanation"}`}>{row.sourceLabel ?? "Watch explanation"}</VideoLink>
    : "Not recorded";
  return <div className={`guide-lookup ${variant ? "has-mobile-cards" : ""} ${Object.keys(rowIds).length ? "route-lookup" : ""}`}>
    {variant === "spells" ? <>
      <div className="lookup-controls">
        <label>Find an ability<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try Phantom Flames" /></label>
        <label>Use case<select value={role} onChange={event => setRole(event.target.value)}>{["All uses", "Damage", "Recovery", "Buffs"].map(option => <option key={option}>{option}</option>)}</select></label>
        {(query || role !== "All uses") ? <button type="button" onClick={() => { setQuery(""); setRole("All uses"); }}>Clear filters</button> : null}
      </div>
      <p className="lookup-count" role="status">{rows.length} of {table.rows.length} abilities</p>
    </> : null}
    {!rows.length ? <p className="lookup-empty">No abilities match these filters.</p> : <>
      <div className="table-scroll lookup-table" tabIndex={0} role="region" aria-label={`${title} scrollable table`}>
        <table aria-label={title}>
          <thead><tr>{table.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row.cells[0]} id={rowIds[row.cells[0]]}>
            {row.cells.map((cell, index) => index === 0 ? <th scope="row" key={index}>{name(cell)}</th> : <td key={index} data-label={table.columns[index]}>{cell}</td>)}
            {table.columns.length > row.cells.length ? <td data-label="Explanation">{source(row)}</td> : null}
          </tr>)}</tbody>
        </table>
      </div>
      {variant ? <div className="lookup-cards" aria-label={`${title} cards`}>
        {rows.map(row => <article className="lookup-card" key={row.cells[0]}>
          <h3>{name(row.cells[0])}</h3>
          <dl>
            <div><dt>{table.columns[1]}</dt><dd>{row.cells[1]}</dd></div>
            <div><dt>{variant === "spells" ? "Source status" : table.columns[2]}</dt><dd>{row.cells[variant === "spells" ? 3 : 2]}</dd></div>
          </dl>
          {variant === "spells" ? <details><summary>Use & video</summary><p>{row.cells[2]}</p>{source(row)}</details>
            : <><p>{row.cells[3]}</p>{source(row)}</>}
        </article>)}
      </div> : <p className="table-scroll-hint">Scroll sideways if more columns are off screen.</p>}
    </>}
  </div>;
}
