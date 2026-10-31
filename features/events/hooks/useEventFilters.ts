"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { EventCategory, EventSort } from "../data";

type FilterPatch = Partial<
  Record<"q" | "category" | "from" | "sort", string | undefined>
>;

/**
 * The only place that reads or writes the events filters in the URL.
 * Filters live in the URL so views are shareable and the back button works.
 */
export function useEventFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const category = (searchParams.get("category") ?? "") as EventCategory | "";
  const from = searchParams.get("from") ?? "";
  const sort = (searchParams.get("sort") ?? "soonest") as EventSort;
  const hasFilters = Boolean(q || category || from);

  const update = useCallback(
    (patch: FilterPatch) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(patch)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.delete("page"); // any filter change goes back to page 1
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const setSearch = useCallback((value: string) => update({ q: value }), [update]);
  const setFrom = useCallback((value: string) => update({ from: value }), [update]);
  const setSort = useCallback(
    (value: string) => update({ sort: value === "soonest" ? undefined : value }),
    [update],
  );
  const clear = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { q, category, from, sort, hasFilters, setSearch, setFrom, setSort, clear };
}
