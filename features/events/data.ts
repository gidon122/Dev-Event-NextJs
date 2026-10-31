/**
 * Static reference data for the events feature.
 * Client-safe: no database, no server imports, no sample events.
 * Add a category here and the chips, the schema and the types all pick it up.
 */

export const EVENT_CATEGORIES = [
  {
    value: "hackathon",
    label: "Hackathon",
    badgeClass: "bg-cyan-600/30 text-cyan-300 border-cyan-500/30",
  },
  {
    value: "workshop",
    label: "Workshop",
    badgeClass: "bg-indigo-600/30 text-indigo-300 border-indigo-500/30",
  },
  {
    value: "conference",
    label: "Conference",
    badgeClass: "bg-blue-600/30 text-blue-300 border-blue-500/30",
  },
  {
    value: "social",
    label: "Social",
    badgeClass: "bg-purple-600/30 text-purple-300 border-purple-500/30",
  },
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number]["value"];

export const EVENT_CATEGORY_VALUES = EVENT_CATEGORIES.map((c) => c.value) as [
  EventCategory,
  ...EventCategory[],
];

export const EVENT_SORTS = [
  { value: "soonest", label: "Soonest first" },
  { value: "latest", label: "Latest first" },
] as const;

export type EventSort = (typeof EVENT_SORTS)[number]["value"];

export const EVENT_SORT_VALUES = EVENT_SORTS.map((s) => s.value) as [
  EventSort,
  ...EventSort[],
];

export const DEFAULT_PAGE_SIZE = 12;
