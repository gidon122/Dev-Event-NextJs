import { EventCardSkeleton } from "@/features/events";

export default function Loading() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading events">
      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded bg-surface-hover" />
        <div className="h-3 w-80 max-w-full animate-pulse rounded bg-surface" />
      </div>
      <div className="h-10 animate-pulse rounded-xl bg-surface" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
