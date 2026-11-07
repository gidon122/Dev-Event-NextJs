import "server-only";

import connectToDatabase from "@/lib/mongodb";
import Event, { type EventLean } from "@/models/events";
import type { EventQuery } from "./schemas";
import type { EventFull, EventSummary, Paginated } from "./types";

function toSummary(record: EventLean, now: Date): EventSummary {
  const status =
    record.status === "live" && record.endsAt.getTime() < now.getTime()
      ? "ended"
      : record.status;

  return {
    id: record._id.toString(),
    title: record.title,
    category: record.category,
    startsAt: record.startsAt.toISOString(),
    endsAt: record.endsAt.toISOString(),
    venue: record.venue,
    description: record.description,
    organizerName: record.organizerName,
    capacity: record.capacity,
    registeredCount: record.registeredCount ?? 0,
    status,
  };
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Upcoming, published events, filtered, sorted and paginated. */
export async function listEvents(
  query: EventQuery,
): Promise<Paginated<EventSummary>> {
  await connectToDatabase();

  const now = new Date();
  const filter = {
    status: "live" as const,
    endsAt: { $gte: now },
    ...(query.category ? { category: query.category } : {}),
    ...(query.q
      ? {
          $or: [
            { title: new RegExp(escapeRegExp(query.q), "i") },
            { venue: new RegExp(escapeRegExp(query.q), "i") },
            { description: new RegExp(escapeRegExp(query.q), "i") },
          ],
        }
      : {}),
  };

  const total = await Event.countDocuments(filter).exec();
  const pages = Math.max(1, Math.ceil(total / query.limit));
  const page = Math.min(query.page, pages);
  const skip = (page - 1) * query.limit;
  const records = await Event.find(filter)
    .sort({ startsAt: 1, _id: 1 })
    .skip(skip)
    .limit(query.limit)
    .lean<EventLean[]>()
    .exec();

  return {
    items: records.map((record) => toSummary(record, now)),
    meta: { total, page, limit: query.limit, pages },
  };
}

/** One non-draft event, or null. Used by the full event page. */
export async function getEventById(id: string): Promise<EventFull | null> {
  if (!/^[\da-f]{24}$/i.test(id)) return null;

  await connectToDatabase();
  const record = await Event.findById(id).lean<EventLean>().exec();
  if (!record || record.status === "draft") return null;

  return toSummary(record, new Date());
}
