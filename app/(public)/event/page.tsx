import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { EventsBrowse, parseEventQuery } from "@/features/events";
import { listEvents } from "@/features/events/service.server";

export const metadata: Metadata = {
  title: "Events | DevEvent",
  description: "Browse upcoming developer hackathons, conferences, and meetups.",
};

export default async function PublicEventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = parseEventQuery(await searchParams);
  const result = await listEvents(query);

  const { userId } = await auth();
  const isAuthenticated = Boolean(userId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-medium text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Explore Developer Events</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Browse Events
        </h1>
        <p className="mt-2 text-sm text-slate-400 sm:text-base max-w-2xl">
          Discover hackathons, technical conferences, workshops, and meetups
          happening in our community.
        </p>
      </div>

      <EventsBrowse
        result={result}
        query={query}
        basePath="/event"
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}
