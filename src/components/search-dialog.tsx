"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { searchSite } from "./search-index";

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="search-trigger" type="button" aria-label="Search DQR.GG">
          <Search size={16} aria-hidden="true" />
          <span>Search guides</span>
          <kbd>Ctrl K</kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="search-dialog" aria-describedby="search-hint">
          <div className="search-dialog-head">
            <div>
              <Dialog.Title>Search the field guide</Dialog.Title>
              <Dialog.Description id="search-hint">Search by task, dungeon, status, or route.</Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Close search"><X size={18} aria-hidden="true" /></Dialog.Close>
          </div>
          <label className="search-input-wrap">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search query</span>
            <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “where does an item drop”" />
          </label>
          <div className="search-results" role="list" aria-label="Search results">
            {results.length ? results.map((item) => (
              <Dialog.Close asChild key={item.href}>
                <Link href={item.href} className="search-result">
                  <span><b>{item.title}</b><small>{item.description}</small></span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </Dialog.Close>
            )) : <div className="search-empty">No guide matches that query yet. Try a dungeon, drop, spell, or status page.</div>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
