import { Suspense } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import type { EventQuery } from "../schemas";
import type { EventSummary, Paginated } from "../types";
import { buildEventsHref } from "../utils";
import { CategoryChips } from "./CategoryChips";
import { EventGrid } from "./EventGrid";
import { EventSearchBar } from "./EventSearchBar";

interface EventsBrowseProps {
  result: Paginated<EventSummary>;
  query: EventQuery;
  /** Where this view lives, e.g. "/browse-events" or "/events". Used for links. */
  basePath: string;
  isAuthenticated?: boolean;
  registeredEventIds?: string[];
}

/**
 * Search + category chips + grid + pagination.
 * It receives its data as props, so pages stay in charge of fetching and
 * both /browse-events and /events can render it.
 */
export function EventsBrowse({
  result,
  query,
  basePath,
  isAuthenticated = false,
  registeredEventIds,
}: EventsBrowseProps) {
  const hasFilters = Boolean(query.q || query.category);

  return (
    <div className="space-y-6">
      <Suspense
        fallback={<div className="h-10 rounded-xl bg-surface" />}
      >
        <EventSearchBar />
      </Suspense>

      <CategoryChips basePath={basePath} query={query} />

      {result.items.length > 0 ? (
        <EventGrid
          events={result.items}
          isAuthenticated={isAuthenticated}
          registeredEventIds={registeredEventIds}
          detailBasePath={basePath === "/event" ? basePath : undefined}
        />
      ) : (
        <EmptyState
          icon={<SearchX className="h-8 w-8" />}
          title={hasFilters ? "No events match your filters" : "No upcoming events yet"}
          description={
            hasFilters
              ? "Try different keywords, pick another category, or clear the filters."
              : "New events will show up here as soon as they are published."
          }
          action={
            hasFilters ? (
              <Link
                href={basePath}
                className="btn btn-ghost px-4 py-2 text-xs hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear filters
              </Link>
            ) : undefined
          }
        />
      )}

      <Pagination
        page={result.meta.page}
        pages={result.meta.pages}
        createHref={(page) => buildEventsHref(basePath, query, { page })}
      />
    </div>
  );
}
