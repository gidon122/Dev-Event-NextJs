import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { formatEventDate } from "@/lib/dates";
import type { EventSummary } from "../types";
import { CategoryBadge } from "./CategoryBadge";

interface EventCardProps {
  event: EventSummary;
  onViewMore?: (event: EventSummary, trigger: HTMLButtonElement) => void;
  actionHref?: string;
  actionLabel?: string;
}

export function EventCard({
  event,
  onViewMore,
  actionHref,
  actionLabel = "View event",
}: EventCardProps) {
  const buttonClasses =
    "btn btn-ghost w-full rounded-xl px-3 py-2 text-xs hover:border-primary hover:bg-primary hover:text-primary-foreground";

  return (
    <div className="surface group flex flex-col justify-between p-5 transition-all hover:border-line-strong hover:bg-surface-hover">
      <div>
        <CategoryBadge category={event.category} />

        <h3 className="mt-4 line-clamp-1 text-base font-bold text-foreground">
          {actionHref ? (
            <Link href={actionHref} className="transition-colors hover:text-primary">
              {event.title}
            </Link>
          ) : (
            event.title
          )}
        </h3>

        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-highlight" />
            <span>{formatEventDate(event.startsAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {actionHref ? (
          <Link href={actionHref} className={buttonClasses}>
            {actionLabel}
          </Link>
        ) : (
          <button
            type="button"
            onClick={(e) => onViewMore?.(event, e.currentTarget)}
            aria-haspopup="dialog"
            className={buttonClasses}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
