import Link from "next/link";
import { EVENT_CATEGORIES, type EventCategory } from "../data";
import type { EventQuery } from "../schemas";
import { buildEventsHref } from "../utils";

interface CategoryChipsProps {
  basePath: string;
  query: EventQuery;
}

const items: { value: EventCategory | undefined; label: string }[] = [
  { value: undefined, label: "All" },
  ...EVENT_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
];

/** Plain links, so the chips work without JavaScript and keep other filters. */
export function CategoryChips({ basePath, query }: CategoryChipsProps) {
  return (
    <nav aria-label="Event categories" className="flex flex-wrap items-center gap-2">
      {items.map((item) => {
        const active = query.category === item.value;
        return (
          <Link
            key={item.label}
            href={buildEventsHref(basePath, query, {
              category: item.value,
              page: 1,
            })}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "bg-white font-semibold text-black"
                : "border border-white/10 bg-[#0f141d] text-slate-400 hover:border-white/20 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
