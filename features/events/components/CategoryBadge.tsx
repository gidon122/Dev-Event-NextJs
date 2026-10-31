import { EVENT_CATEGORIES, type EventCategory } from "../data";

export function CategoryBadge({ category }: { category: EventCategory }) {
  const meta = EVENT_CATEGORIES.find((c) => c.value === category);

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
        meta?.badgeClass ?? "border-white/10 bg-white/10 text-white"
      }`}
    >
      {meta?.label ?? category}
    </span>
  );
}
