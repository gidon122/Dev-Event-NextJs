import type { EventCategory } from "./data";

export type EventStatus = "draft" | "live" | "ended" | "cancelled";

/** What the current student can do with an event. Decided on the server. */
export type ViewerEventState = "open" | "registered" | "full" | "closed";

/**
 * The shape the UI receives. Dates are ISO strings (not Date objects) so
 * they pass cleanly from server components to client components.
 */
export interface EventSummary {
  id: string;
  title: string;
  category: EventCategory;
  startsAt: string;
  endsAt: string;
  venue: string;
  bannerUrl?: string;
  capacity: number;
  registeredCount: number;
  status: EventStatus;
}

/** Used by the full event page (/events/[id]). */
export interface EventFull extends EventSummary {
  description: string;
  organizerName?: string;
}

export interface PageMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface Paginated<T> {
  items: T[];
  meta: PageMeta;
}
