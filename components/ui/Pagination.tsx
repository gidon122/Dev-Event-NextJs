import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pages: number;
  createHref: (page: number) => string;
}

const item =
  "inline-flex items-center gap-1 rounded-xl border border-line bg-surface px-3 py-2 text-xs font-medium text-foreground transition";
const enabled = `${item} hover:border-line-strong hover:bg-surface-hover`;
const disabled = `${item} cursor-not-allowed opacity-40`;

/** Generic previous / next pager. Renders nothing for a single page. */
export function Pagination({ page, pages, createHref }: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between">
      {page > 1 ? (
        <Link href={createHref(page - 1)} scroll={false} className={enabled}>
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </span>
      )}

      <span className="text-xs text-muted-foreground">
        Page {page} of {pages}
      </span>

      {page < pages ? (
        <Link href={createHref(page + 1)} scroll={false} className={enabled}>
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      ) : (
        <span aria-disabled="true" className={disabled}>
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      )}
    </nav>
  );
}
