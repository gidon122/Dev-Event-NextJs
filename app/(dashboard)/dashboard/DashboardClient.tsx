import Link from "next/link";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import { formatEventDate } from "@/lib/dates";
import type { DashboardData } from "@/features/dashboard/types";

interface DashboardClientProps {
  userName: string;
  data: DashboardData;
}

export default function DashboardClient({
  userName,
  data,
}: DashboardClientProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Welcome back, {userName}</h1>
        <p className="page-subtitle sm:text-sm">
          Here&apos;s what&apos;s happening on campus
        </p>
      </div>

      <section className="surface-raised relative overflow-hidden p-5 shadow-xl sm:p-6">
        {data.nextUp ? (
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <span className="badge badge-pending">Next up</span>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                {data.nextUp.event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-highlight" />
                  {formatEventDate(data.nextUp.event.startsAt)}
                </span>
                <span aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {data.nextUp.event.venue}
                </span>
              </div>
              <Link
                href={`/tickets/${data.nextUp.id}`}
                className="btn btn-primary px-4 py-2 text-xs"
              >
                View ticket
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              No upcoming events
            </h2>
            <p className="text-sm text-muted-foreground">
              {data.hasRegistrations
                ? "You don’t have any confirmed future event registrations."
                : "You haven’t registered for an event yet."}
            </p>
            <Link href="/event" className="btn btn-primary px-4 py-2 text-xs">
              Browse events
            </Link>
          </div>
        )}
      </section>

      <section
        aria-label="Registration summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="surface p-5">
          <span className="text-xs font-medium text-muted-foreground">
            Registered
          </span>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {data.registeredCount}
          </p>
        </div>
        <div className="surface p-5">
          <span className="text-xs font-medium text-muted-foreground">
            Attended
          </span>
          <p className="mt-2 text-3xl font-bold text-foreground">
            {data.attendedCount}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="surface p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="text-sm font-semibold text-foreground">
              Upcoming tickets
            </h2>
            <Link
              href="/tickets"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {data.upcomingTickets.length ? (
            <div className="divide-y divide-line">
              {data.upcomingTickets.map((registration) => (
                <Link
                  key={registration.id}
                  href={`/tickets/${registration.id}`}
                  className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:bg-surface-hover"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-foreground group-hover:text-primary">
                      {registration.event.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      {formatEventDate(registration.event.startsAt)} ·{" "}
                      {registration.event.venue}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-subtle transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="pt-4 text-sm text-muted-foreground">
              {data.hasRegistrations
                ? "No confirmed upcoming tickets. Check My tickets for past or cancelled registrations."
                : "Your registered events will appear here."}
            </p>
          )}
          {data.upcomingCount > data.upcomingTickets.length && (
            <p className="pt-3 text-xs text-muted-foreground">
              Showing {data.upcomingTickets.length} of {data.upcomingCount}{" "}
              upcoming tickets.
            </p>
          )}
          {data.unavailableCount > 0 && (
            <p
              role="status"
              className="mt-4 rounded-lg border border-highlight/30 bg-highlight/10 p-3 text-xs text-highlight"
            >
              Event details are unavailable for {data.unavailableCount}{" "}
              {data.unavailableCount === 1 ? "registration" : "registrations"}.
              View My tickets for those records.
            </p>
          )}
        </section>

        <section className="surface p-5 sm:p-6">
          <h2 className="border-b border-line pb-4 text-sm font-semibold text-foreground">
            Reviews coming soon
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            {data.attendedCount > 0
              ? `You’ve attended ${data.attendedCount} ${
                  data.attendedCount === 1 ? "event" : "events"
                }. Review submissions aren’t available yet.`
              : "You don’t have any attended events yet. Review submissions aren’t available yet."}
          </p>
        </section>
      </div>
    </div>
  );
}
