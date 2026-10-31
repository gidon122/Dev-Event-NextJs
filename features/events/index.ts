/**
 * Public API of the events feature. Client-safe exports only.
 * Server code is imported directly: "@/features/events/service.server".
 */
export { EventsBrowse } from "./components/EventsBrowse";
export { EventGrid } from "./components/EventGrid";
export { EventCardSkeleton } from "./components/EventCardSkeleton";

export { parseEventQuery } from "./schemas";
export type { EventQuery } from "./schemas";

export { EVENT_CATEGORIES } from "./data";
export type { EventCategory, EventSort } from "./data";

export type {
  EventFull,
  EventStatus,
  EventSummary,
  Paginated,
  ViewerEventState,
} from "./types";
