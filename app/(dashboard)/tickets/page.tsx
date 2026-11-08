import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import TicketCard from "@/features/tickets/components/TicketCard";
import {
  listUserTickets,
  partitionTicketsByDate,
} from "@/features/tickets/service.server";

export default async function TicketsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/login?redirect=%2Ftickets");

  const registrations = await listUserTickets(userId);
  const { upcoming, past, unavailable } =
    partitionTicketsByDate(registrations);

  return (
    <div className="space-y-10">
      <header>
        <h1 className="page-title">
          My tickets
        </h1>
        <p className="page-subtitle">
          Your registered event passes and attendance records
        </p>
      </header>

      <section aria-labelledby="upcoming-tickets-heading" className="space-y-4">
        <h2
          id="upcoming-tickets-heading"
          className="text-lg font-semibold text-foreground"
        >
          Upcoming registered events
        </h2>
        {upcoming.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((registration) => (
              <TicketCard
                key={registration.id}
                registration={registration}
                isPast={false}
              />
            ))}
          </div>
        ) : (
          <p className="surface p-5 text-sm text-muted-foreground">
            You have no upcoming registered events.
          </p>
        )}
      </section>

      <section aria-labelledby="past-tickets-heading" className="space-y-4">
        <h2 id="past-tickets-heading" className="text-lg font-semibold text-foreground">
          Past registered events
        </h2>
        {past.length ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {past.map((registration) => (
              <TicketCard
                key={registration.id}
                registration={registration}
                isPast
              />
            ))}
          </div>
        ) : (
          <p className="surface p-5 text-sm text-muted-foreground">
            You have no past registered events.
          </p>
        )}
      </section>

      {unavailable.length > 0 && (
        <p
          role="status"
          className="rounded-xl border border-highlight/30 bg-highlight/10 p-4 text-sm text-highlight"
        >
          {unavailable.length} ticket
          {unavailable.length === 1 ? " has" : "s have"} an event that is no
          longer available.
        </p>
      )}
    </div>
  );
}
