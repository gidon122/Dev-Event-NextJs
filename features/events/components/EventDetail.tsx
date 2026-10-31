"use client";

import { useEffect } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { formatEventDate } from "@/lib/dates";
import type { EventSummary, ViewerEventState } from "../types";
import { spotsLabel, spotsLeft } from "../utils";
import { CategoryBadge } from "./CategoryBadge";
import { ReserveButton } from "./ReserveButton";

interface EventDetailProps {
  event: EventSummary;
  state: ViewerEventState;
  isAuthenticated: boolean;
  onClose: () => void;
}

function availabilityText(event: EventSummary, state: ViewerEventState) {
  if (state === "registered") return "You are registered for this event.";
  if (state === "full") return "This event is currently full.";
  if (state === "closed") {
    return event.status === "cancelled"
      ? "This event was cancelled."
      : "This event has ended.";
  }
  return spotsLabel(spotsLeft(event));
}

/** The "View more" dialog. */
export function EventDetail({
  event,
  state,
  isAuthenticated,
  onClose,
}: EventDetailProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-details-title"
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f141d] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close event details"
        >
          <X className="h-4 w-4" />
        </button>

        <CategoryBadge category={event.category} />
        <h2
          id="event-details-title"
          className="mt-4 pr-8 text-2xl font-bold text-white"
        >
          {event.title}
        </h2>

        <div className="mt-5 space-y-4 text-sm text-slate-300">
          <p className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-cyan-300" />
            {formatEventDate(event.startsAt)}
          </p>
          <p className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-cyan-300" />
            {event.venue}
          </p>
          <p className="border-t border-white/10 pt-4 text-slate-400">
            {availabilityText(event, state)}
          </p>
        </div>

        <div className="mt-6">
          <ReserveButton
            eventId={event.id}
            state={state}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </section>
    </div>
  );
}
