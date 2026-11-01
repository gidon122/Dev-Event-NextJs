"use client";

import { useCallback, useMemo, useState } from "react";
import type { EventSummary } from "../types";
import { getViewerState } from "../utils";
import { EventCard } from "./EventCard";
import { EventDetail } from "./EventDetail";

interface EventGridProps {
  events: EventSummary[];
  isAuthenticated: boolean;
  /** Ids the current student is already registered for. */
  registeredEventIds?: string[];
  /** Optional base path for card link actions (e.g. "/event" routes to "/event/[id]"). */
  detailBasePath?: string;
  actionHref?: (event: EventSummary) => string;
  actionLabel?: string;
}

const NONE: string[] = [];

export function EventGrid({
  events,
  isAuthenticated,
  registeredEventIds = NONE,
  detailBasePath,
  actionHref,
  actionLabel,
}: EventGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const registered = useMemo(
    () => new Set(registeredEventIds),
    [registeredEventIds],
  );
  const close = useCallback(() => setSelectedId(null), []);

  // Keep only the id so the dialog always shows the latest data.
  const selected = events.find((event) => event.id === selectedId) ?? null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const cardActionHref = actionHref
            ? actionHref(event)
            : detailBasePath
              ? `${detailBasePath}/${event.id}`
              : undefined;

          return (
            <EventCard
              key={event.id}
              event={event}
              actionHref={cardActionHref}
              actionLabel={
                actionLabel ?? (cardActionHref ? "View event" : "View more")
              }
              onViewMore={(e) => setSelectedId(e.id)}
            />
          );
        })}
      </div>

      {selected && (
        <EventDetail
          event={selected}
          state={getViewerState(selected, registered.has(selected.id))}
          isAuthenticated={isAuthenticated}
          onClose={close}
        />
      )}
    </>
  );
}
