import type { TicketSummary } from "@/features/tickets/types";
import type { DashboardData, DashboardTicket } from "./types";

const UPCOMING_TICKET_LIMIT = 3;

export function buildDashboardData(
  registrations: TicketSummary[],
  now: number = Date.now(),
): DashboardData {
  const registeredCount = registrations.filter(
    (registration) =>
      registration.status === "CONFIRMED" || registration.status === "ATTENDED",
  ).length;
  const attendedCount = registrations.filter(
    (registration) => registration.status === "ATTENDED",
  ).length;

  const upcoming = registrations
    .filter(
      (registration): registration is DashboardTicket => {
        if (registration.status !== "CONFIRMED" || !registration.event) {
          return false;
        }

        const startsAt = Date.parse(registration.event.startsAt);
        return Number.isFinite(startsAt) && startsAt > now;
      },
    )
    .sort(
      (left, right) =>
        Date.parse(left.event.startsAt) - Date.parse(right.event.startsAt),
    );

  return {
    registeredCount,
    attendedCount,
    upcomingCount: upcoming.length,
    upcomingTickets: upcoming.slice(0, UPCOMING_TICKET_LIMIT),
    nextUp: upcoming[0] ?? null,
    unavailableCount: registrations.filter(
      (registration) => registration.event === null,
    ).length,
    hasRegistrations: registrations.length > 0,
  };
}
