import { Calendar, MapPin } from "lucide-react";
import { formatEventDate } from "@/lib/dates";
import type { EventSummary } from "../types";
import { CategoryBadge } from "./CategoryBadge";

interface EventCardProps {
  event: EventSummary;
  onViewMore: (event: EventSummary) => void;
}

export function EventCard({ event, onViewMore }: EventCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0f141d] p-5 transition-all hover:border-white/15 hover:bg-[#121924]">
      <div>
        <CategoryBadge category={event.category} />

        <h3 className="mt-4 line-clamp-1 text-base font-bold text-white">
          {event.title}
        </h3>

        <div className="mt-3 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{formatEventDate(event.startsAt)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={() => onViewMore(event)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white transition hover:border-[#59deca] hover:bg-[#59deca] hover:text-black"
        >
          View more
        </button>
      </div>
    </div>
  );
}
