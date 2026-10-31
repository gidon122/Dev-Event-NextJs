"use client";

import { EVENT_SORTS } from "../data";
import { useEventFilters } from "../hooks/useEventFilters";

const control =
  "rounded-xl border border-white/10 bg-[#0f141d] px-3 py-2.5 text-xs text-white focus:border-[#59deca] focus:outline-none";

/** Date and sort controls. They write to the URL, like the search bar. */
export function EventFilters() {
  const { from, sort, hasFilters, setFrom, setSort, clear } = useEventFilters();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="events-from" className="sr-only">
        Show events starting from
      </label>
      <input
        id="events-from"
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className={`${control} [color-scheme:dark]`}
      />

      <label htmlFor="events-sort" className="sr-only">
        Sort events
      </label>
      <select
        id="events-sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={control}
      >
        {EVENT_SORTS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={clear}
          className="px-2 text-xs font-medium text-slate-400 transition hover:text-white"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
