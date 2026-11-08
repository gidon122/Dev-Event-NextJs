"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useEventFilters } from "../hooks/useEventFilters";

const DEBOUNCE_MS = 300;

/** Debounced search box. Writes the keyword to the URL (?q=). */
export function EventSearchBar() {
  const { q, setSearch } = useEventFilters();
  const [value, setValue] = useState(q);
  const lastSent = useRef(q);

  // The URL changed from outside (for example "Clear filters"): mirror it.
  useEffect(() => {
    if (q !== lastSent.current) {
      lastSent.current = q;
      setValue(q);
    }
  }, [q]);

  // Typing: wait for a pause, then write to the URL.
  useEffect(() => {
    const next = value.trim();
    if (next === lastSent.current) return;

    const id = setTimeout(() => {
      lastSent.current = next;
      setSearch(next);
    }, DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [value, setSearch]);

  return (
    <div className="relative flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by keyword"
        aria-label="Search events"
        className="w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-10 text-xs text-foreground placeholder:text-subtle focus:border-primary focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
