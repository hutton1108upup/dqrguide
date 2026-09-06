"use client";

import Link from 'next/link';
import { useState } from 'react';
import { searchSite } from './search-index';

export function HomeSearch() {
  const [query, setQuery] = useState('');
  const results = query.trim() ? searchSite(query, 5) : [];
  return <div className="home-wiki-search">
    <label htmlFor="home-wiki-query">Search the Dungeon Quest Reborn wiki</label>
    <input id="home-wiki-query" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try Phantom Flames, drops or Northern Lands" />
    {query.trim() ? <div className="search-results" aria-live="polite">{results.length ? results.map(result => <Link className="search-result" key={result.href} href={result.href}>{result.title}</Link>) : <p>No matching guides. Try an item or dungeon name.</p>}</div> : null}
    <div className="hero-guide-links"><Link href="/spells/">Spells</Link><Link href="/drops/">Drops</Link><Link href="/dungeons/">Dungeons</Link></div>
  </div>;
}
