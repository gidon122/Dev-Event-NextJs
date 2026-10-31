import { EventsBrowse, parseEventQuery } from "@/features/events";
import { listEvents } from "@/features/events/service.server";

// TODO: replace with the signed-in student's registrations once the
// registrations feature exists (one batch query for the ids on this page).
const registeredEventIds = ["evt-ai-hack-night"];

export default async function BrowseEventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseEventQuery(await searchParams);
  const result = await listEvents(query);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Browse events
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Discover upcoming campus sessions, workshops, and competitions
        </p>
      </div>

      <EventsBrowse
        result={result}
        query={query}
        basePath="/browse-events"
        isAuthenticated
        registeredEventIds={registeredEventIds}
      />
    </div>
  );
}
