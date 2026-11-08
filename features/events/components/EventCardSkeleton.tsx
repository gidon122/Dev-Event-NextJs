/** Loading placeholder with the same footprint as EventCard. */
export function EventCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="surface flex animate-pulse flex-col justify-between p-5"
    >
      <div>
        <div className="h-5 w-20 rounded-full bg-surface-hover" />
        <div className="mt-4 h-5 w-3/4 rounded bg-surface-hover" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-1/2 rounded bg-surface-hover" />
          <div className="h-3 w-2/5 rounded bg-surface-hover" />
        </div>
      </div>
      <div className="mt-5 h-9 w-full rounded-xl bg-surface" />
    </div>
  );
}
