import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { getEventById } from "@/features/events/service.server";
import { getViewerState } from "@/features/events/utils";
import { getUserRegisteredEventIds } from "@/features/registration/service.server";
import { CategoryBadge } from "@/features/events/components/CategoryBadge";
import { ReserveButton } from "@/features/events/components/ReserveButton";
import { formatEventDate } from "@/lib/dates";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return { title: "Event Not Found | EventLoop" };
  return {
    title: `${event.title} | EventLoop`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Server-side authentication check using Clerk API
  const { userId } = await auth();
  if (!userId) {
    redirect(`/login?redirect=/event/${encodeURIComponent(id)}`);
  }

  const event = await getEventById(id);
  if (!event) {
    notFound();
  }

  const [registeredEventId] = await getUserRegisteredEventIds(userId, [event.id]);
  const state = getViewerState(event, Boolean(registeredEventId));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/event"
          className="inline-flex items-center gap-2 rounded-lg py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to events</span>
        </Link>
      </div>

      <div className="surface-raised relative overflow-hidden p-6 shadow-2xl sm:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category={event.category} />
        </div>

        <h1 className="page-title mt-5 sm:text-4xl">
          {event.title}
        </h1>

        <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
          Organized by{" "}
          <span className="font-medium text-foreground">
            {event.organizerName}
          </span>
        </p>

        <div className="surface mt-8 grid grid-cols-1 gap-4 p-5 text-xs text-muted-foreground sm:grid-cols-2 sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground">Date & Time</div>
              <div className="font-medium text-foreground">
                {formatEventDate(event.startsAt)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-highlight/10 text-highlight">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground">Location</div>
              <div className="font-medium text-foreground">{event.venue}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <h2 className="text-sm font-semibold text-foreground sm:text-base">
            About this event
          </h2>
          <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {event.description}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line-strong pt-6 sm:flex-row sm:items-center sm:justify-end">
          <div className="w-full sm:w-48">
            <ReserveButton
              event={event}
              state={state}
              isAuthenticated={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
