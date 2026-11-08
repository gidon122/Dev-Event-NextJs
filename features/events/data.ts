/**
 * Static reference data for the events feature.
 * Client-safe: no database, no server imports, no sample events.
 * Add a category here and the chips, the schema and the types all pick it up.
 */

export const EVENT_CATEGORIES = [
  {
    value: "hackathon",
    label: "Hackathon",
  },
  {
    value: "workshop",
    label: "Workshop",
  },
  {
    value: "conference",
    label: "Conference",
  },
  {
    value: "social",
    label: "Social",
  },
  {
    value: "religious",
    label: "Religious",
  },
  {
    value: "spiritual",
    label: "Spiritual",
  },
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number]["value"];

export const EVENT_CATEGORY_VALUES = EVENT_CATEGORIES.map((c) => c.value) as [
  EventCategory,
  ...EventCategory[],
];

export const DEFAULT_PAGE_SIZE = 12;
