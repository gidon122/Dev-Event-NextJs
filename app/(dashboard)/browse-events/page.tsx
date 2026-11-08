import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EventsBrowse, parseEventQuery } from "@/features/events";
import { listEvents } from "@/features/events/service.server";
import { getUserRegisteredEventIds } from "@/features/registration/service.server";

export default async function BrowseEventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseEventQuery(await searchParams);
  const result = await listEvents(query);
  const { userId } = await auth();
  if (!userId) {
    redirect("/login?redirect=%2Fbrowse-events");
  }
  const registeredEventIds = await getUserRegisteredEventIds(
    userId,
    result.items.map((event) => event.id),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">
          Browse events
        </h1>
        <p className="page-subtitle">
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
