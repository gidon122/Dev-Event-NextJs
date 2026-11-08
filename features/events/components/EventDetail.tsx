"use client";

import { useEffect, useId, useRef } from "react";
import { CalendarDays, MapPin, X } from "lucide-react";
import { formatEventDate } from "@/lib/dates";
import type { EventSummary, ViewerEventState } from "../types";
import { CategoryBadge } from "./CategoryBadge";
import { ReserveButton } from "./ReserveButton";

interface EventDetailProps {
  event: EventSummary;
  state: ViewerEventState;
  isAuthenticated: boolean;
  returnFocusTarget: HTMLButtonElement | null;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** The "View more" dialog. */
export function EventDetail({
  event,
  state,
  isAuthenticated,
  returnFocusTarget,
  onClose,
}: EventDetailProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const closeButton = dialog?.querySelector<HTMLElement>("[data-dialog-close]");
    const previousOverflow = document.body.style.overflow;

    closeButton?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab" || !dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusTarget?.focus();
    };
  }, [onClose, returnFocusTarget]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="surface-raised relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto p-6 shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <CategoryBadge category={event.category} />
          <button
            type="button"
            onClick={onClose}
            data-dialog-close
            className="ml-auto rounded-lg p-2 text-muted-foreground transition hover:bg-surface-hover hover:text-foreground"
            aria-label="Close event details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h2 id={titleId} className="page-title mt-5 sm:text-4xl">
          {event.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Organized by <span className="font-semibold text-foreground">{event.organizerName ?? "Event organizer"}</span>
        </p>

        <div className="surface mt-8 grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-muted-foreground">Date &amp; Time</div>
              <div className="text-sm font-semibold text-foreground">{formatEventDate(event.startsAt)}</div>
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-highlight/10 text-highlight">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] text-muted-foreground">Location</div>
              <div className="text-sm font-semibold text-foreground">{event.venue}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line-strong pt-7">
          <h3 className="text-base font-semibold text-foreground">About this event</h3>
          <p id={descriptionId} className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-line-strong pt-6 sm:flex-row sm:items-center sm:justify-end">
          <div className="w-full sm:max-w-48">
            <ReserveButton
              event={event}
              state={state}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
