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
  const [className, setClassName] = useState("All classes");
  const [location, setLocation] = useState("All locations");
  const locationOf = (row: typeof table.rows[number]) => {
    const value = row.cells[variant === "spells" ? 3 : 1];
    return value.split(/ — | reward clip| encounter reference/)[0];
  };
  const locations = [...new Set(table.rows.map(locationOf))];
  const rows = table.rows.filter(row => !variant || (
    row.cells[0].toLowerCase().includes(query.trim().toLowerCase()) &&
    (variant !== "spells" || role === "All uses" || roleGroup(row.cells[1]) === role) &&
    (location === "All locations" || locationOf(row) === location) &&
    (variant !== "spells" || className === "All classes" || row.cells[4] === className)
  ));
  const name = (text: string) => detailLinks[text] ? <Link href={detailLinks[text]}>{text}</Link> : text;
  const source = (row: typeof rows[number]) => row.sourceURL
    ? <VideoLink url={row.sourceURL} title={`${row.cells[0]} · ${row.sourceLabel ?? "Explanation"}`}>{row.sourceLabel ?? "Watch explanation"}</VideoLink>
    : "Not recorded";
  return <div className={`guide-lookup ${variant ? "has-mobile-cards" : ""} ${Object.keys(rowIds).length ? "route-lookup" : ""}`}>
    {variant ? <>
      <div className="lookup-controls">
        <label>{variant === "spells" ? "Find an ability" : "Find an item"}<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try Phantom Flames" /></label>
        {variant === "spells" ? <label>Use case<select value={role} onChange={event => setRole(event.target.value)}>{["All uses", "Damage", "Recovery", "Buffs"].map(option => <option key={option}>{option}</option>)}</select></label> : null}
        {variant === "spells" ? <label>Class report<select value={className} onChange={event => setClassName(event.target.value)}>{["All classes", ...new Set(table.rows.map(row => row.cells[4]))].map(option => <option key={option}>{option}</option>)}</select></label> : null}
        <label>Reported location<select value={location} onChange={event => setLocation(event.target.value)}>{["All locations", ...locations].map(option => <option key={option}>{option}</option>)}</select></label>
        {(query || className !== "All classes" || role !== "All uses" || location !== "All locations") ? <button type="button" onClick={() => { setClassName("All classes"); setQuery(""); setRole("All uses"); setLocation("All locations"); }}>Clear filters</button> : null}
      </div>
      <p className="lookup-count" role="status">{rows.length} of {table.rows.length} {variant === "spells" ? "abilities" : "items"}</p>
    </> : null}
    {!rows.length ? <p className="lookup-empty">No results match these filters.</p> : <>
      <div className={`table-scroll lookup-table ${table.columns.length === 2 ? "two-column" : ""}`} tabIndex={0} role="region" aria-label={`${title} scrollable table`}>
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
            <div><dt>{variant === "spells" ? "Reported location" : table.columns[2]}</dt><dd>{row.cells[variant === "spells" ? 3 : 2]}</dd></div>
            {variant === "spells" ? row.cells.slice(4).map((cell, index) => <div key={table.columns[index + 4]}><dt>{table.columns[index + 4]}</dt><dd>{cell}</dd></div>) : null}
          </dl>
          {variant === "spells" ? <details><summary>Use & video</summary><p>{row.cells[2]}</p>{source(row)}</details>
            : <><p>{row.cells[3]}</p>{source(row)}</>}
        </article>)}
      </div> : <p className="table-scroll-hint">Scroll sideways if more columns are off screen.</p>}
    </>}
  </div>;
}
