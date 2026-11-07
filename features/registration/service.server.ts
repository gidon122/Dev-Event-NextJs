import "server-only";

import connectToDatabase from "@/lib/mongodb";
import Registration from "@/models/registration";

export async function getUserRegisteredEventIds(
  userId: string,
  eventIds: string[],
): Promise<string[]> {
  if (eventIds.length === 0) return [];

  await connectToDatabase();

  const registrations = await Registration.find({
    userId,
    eventId: { $in: eventIds },
  })
    .select("eventId")
    .lean()
    .exec();

  return [...new Set(registrations.map(({ eventId }) => eventId.toString()))];
}
