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
      <article className="rounded-xl border border-amber-900/50 bg-[#0b0f19] p-5 text-sm text-amber-200">
        Event details are no longer available for ticket {ticketId}.
      </article>
    );
  }

  return (
    <article className="flex flex-col justify-between rounded-xl border border-gray-800 bg-[#0b0f19] p-5 shadow-lg">
      <div>
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className="rounded-full border border-purple-800/50 bg-purple-950/60 px-2.5 py-1 text-xs font-medium text-purple-300">
            {event.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              status === "CONFIRMED"
                ? "border border-emerald-800/50 bg-emerald-950/60 text-emerald-300"
                : status === "ATTENDED"
                  ? "border border-blue-800/50 bg-blue-950/60 text-blue-300"
                  : "bg-gray-800 text-gray-400"
            }`}
          >
            {status}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-white">{event.title}</h3>
        <div className="mb-4 space-y-1.5 text-xs text-gray-400">
          <p>
            Date &amp; time:{" "}
            <span className="text-gray-200">
              {formatEventDate(event.startsAt)}
            </span>
          </p>
          <p>
            Venue: <span className="text-gray-200">{event.venue}</span>
          </p>
          <p className="pt-1 font-mono text-purple-300">Ticket ID: {ticketId}</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-800/80 pt-3">
        {isPast ? (
          <div className="flex w-full items-center justify-between gap-3 text-xs">
            <span className="text-gray-500">Event completed</span>
            <Link
              href={`/reviews?eventId=${encodeURIComponent(event.id)}`}
              className="font-medium text-purple-300 hover:underline"
            >
              Leave a review
            </Link>
          </div>
        ) : status === "CONFIRMED" ? (
          <Link
            href={`/tickets/${registration.id}`}
            className="w-full rounded-lg bg-purple-600 py-2 text-center text-xs font-medium text-white transition hover:bg-purple-700"
          >
            View digital pass &amp; QR code
          </Link>
        ) : (
          <p className="w-full text-center text-xs text-gray-500">
            This ticket is {status.toLowerCase()}.
          </p>
        )}
      </div>
    </article>
  );
}
