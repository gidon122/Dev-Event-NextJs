import "server-only";

import type { EventQuery } from "./schemas";
import type { EventFull, EventSummary, Paginated } from "./types";
import { MOCK_EVENTS, type EventRecord } from "./mock-events.server";

/**
 * Business rules and data access for events.
 *
 * Today this reads from mock-events.server.ts. When the Event model is
 * ready, replace the data source inside listEvents and getEventById.
 * The function signatures and the DTOs stay the same, so no component changes.
 */

const LAGOS_OFFSET = "+01:00";

/** Maps a raw record to the DTO the UI receives. Models never reach components. */
function toSummary(record: EventRecord, now: Date): EventSummary {
  // "ended" is derived from the dates, so it never depends on a cron job.
  const status =
    record.status === "live" && record.endsAt.getTime() < now.getTime()
      ? "ended"
      : record.status;

  return {
    id: record.id,
    title: record.title,
    category: record.category,
    startsAt: record.startsAt.toISOString(),
    endsAt: record.endsAt.toISOString(),
    venue: record.venue,
    capacity: record.capacity,
    registeredCount: record.registeredCount,
    status,
  };
}

/** Upcoming, published events, filtered, sorted and paginated. */
export async function listEvents(
  query: EventQuery,
): Promise<Paginated<EventSummary>> {
  const now = new Date();
  const needle = query.q?.toLowerCase();
  const from = query.from
    ? new Date(`${query.from}T00:00:00${LAGOS_OFFSET}`)
    : null;

  const matches = MOCK_EVENTS.filter((event) => {
    if (event.status !== "live") return false; // no drafts or cancelled events
    if (event.endsAt.getTime() < now.getTime()) return false; // browse = upcoming only
    if (query.category && event.category !== query.category) return false;
    if (from && event.startsAt.getTime() < from.getTime()) return false;
    if (needle) {
      const haystack =
        `${event.title} ${event.venue} ${event.description}`.toLowerCase();
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  matches.sort((a, b) =>
    query.sort === "latest"
      ? b.startsAt.getTime() - a.startsAt.getTime()
      : a.startsAt.getTime() - b.startsAt.getTime(),
  );

  const total = matches.length;
  const pages = Math.max(1, Math.ceil(total / query.limit));
  const page = Math.min(query.page, pages);
  const start = (page - 1) * query.limit;

  return {
    items: matches
      .slice(start, start + query.limit)
      .map((event) => toSummary(event, now)),
    meta: { total, page, limit: query.limit, pages },
  };
}

/** One published event, or null. Used by the full event page. */
export async function getEventById(id: string): Promise<EventFull | null> {
  const record = MOCK_EVENTS.find((e) => e.id === id);
  if (!record || record.status === "draft") return null;

  return {
    ...toSummary(record, new Date()),
    description: record.description,
    organizerName: record.organizerName,
  };
}
