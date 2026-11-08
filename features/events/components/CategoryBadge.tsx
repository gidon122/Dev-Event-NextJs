import { EVENT_CATEGORIES, type EventCategory } from "../data";

export function CategoryBadge({ category }: { category: EventCategory }) {
  const meta = EVENT_CATEGORIES.find((c) => c.value === category);

  return (
    <span
      className="badge"
    >
      {meta?.label ?? category}
    </span>
  );
}
