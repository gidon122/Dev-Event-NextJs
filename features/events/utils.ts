import type { EventQuery } from "./schemas";
import type { EventSummary, ViewerEventState } from "./types";

/** Pure helpers. Safe to import from server and client code. */

export function getViewerState(
  event: EventSummary,
  isRegistered: boolean,
): ViewerEventState {
  if (isRegistered) return "registered";
  if (event.status === "ended" || event.status === "cancelled") return "closed";
  if (event.registeredCount >= event.capacity) return "full";
  return "open";
}

type HrefQuery = Partial<
  Pick<EventQuery, "q" | "category" | "page">
>;

/** Builds a link that keeps the current filters and changes only `patch`. */
export function buildEventsHref(
  basePath: string,
  query: HrefQuery,
  patch: HrefQuery = {},
): string {
  const merged = { ...query, ...patch };
  const params = new URLSearchParams();
  if (merged.q) params.set("q", merged.q);
  if (merged.category) params.set("category", merged.category);
  if (merged.page && merged.page > 1) params.set("page", String(merged.page));
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
