import Link from "next/link";
import { formatEventDate } from "@/lib/dates";
import type { TicketSummary } from "../types";

interface TicketCardProps {
  registration: TicketSummary;
  isPast: boolean;
}

export default function TicketCard({
  registration,
  isPast,
}: TicketCardProps) {
  const { event, ticketId, status } = registration;

  if (!event) {
    return (
      <article className="surface-raised rounded-xl border-highlight/30 p-5 text-sm text-highlight">
        Event details are no longer available for ticket {ticketId}.
      </article>
    );
  }

  return (
    <article className="surface-raised flex flex-col justify-between p-5 shadow-lg">
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="badge">
            {event.category}
          </span>
          <span
            className={`badge ${
              status === "CONFIRMED"
                ? "badge-confirmed"
                : status === "ATTENDED"
                  ? "badge-confirmed"
                  : "badge-danger"
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-foreground">{event.title}</h3>
        <div className="mb-4 space-y-1.5 text-xs text-muted-foreground">
          <p>
            Date &amp; time:{" "}
            <span className="text-foreground">
              {formatEventDate(event.startsAt)}
            </span>
          </p>
          <p>
            Venue: <span className="text-foreground">{event.venue}</span>
          </p>
          <p className="pt-1 font-mono text-primary">Ticket ID: {ticketId}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line-strong pt-3">
        {isPast ? (
          <div className="flex w-full items-center justify-between gap-3 text-xs">
            <span className="text-subtle">Event completed</span>
            <Link
              href={`/reviews?eventId=${encodeURIComponent(event.id)}`}
              className="font-medium text-primary hover:underline"
            >
              Leave a review
            </Link>
          </div>
        ) : status === "CONFIRMED" ? (
          <Link
            href={`/tickets/${registration.id}`}
            className="btn btn-primary w-full rounded-lg py-2 text-xs"
          >
            View digital pass &amp; QR code
          </Link>
        ) : (
          <p className="w-full text-center text-xs text-subtle">
            This ticket is {status.toLowerCase()}.
          </p>
        )}
      </div>
    </article>
  );
}
