import "server-only";

import { Types } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import "@/models/events";
import Registration, {
  type RegistrationStatus,
} from "@/models/registration";
import type { TicketSummary } from "./types";

type PopulatedEvent = {
  _id: Types.ObjectId;
  title: string;
  category: string;
  startsAt: Date;
  endsAt: Date;
  venue: string;
};

type PopulatedRegistration = {
  _id: Types.ObjectId;
  ticketId: string;
  name: string;
  department: string;
  level: string;
  status: RegistrationStatus;
  createdAt: Date;
  eventId: PopulatedEvent | null;
};

function toTicketSummary(
  registration: PopulatedRegistration,
): TicketSummary {
  const event = registration.eventId;

  return {
    id: registration._id.toString(),
    ticketId: registration.ticketId,
    name: registration.name,
    department: registration.department,
    level: registration.level,
    status: registration.status,
    createdAt: registration.createdAt.toISOString(),
    event: event
      ? {
          id: event._id.toString(),
          title: event.title,
          category: event.category,
          startsAt: event.startsAt.toISOString(),
          endsAt: event.endsAt.toISOString(),
          venue: event.venue,
        }
      : null,
  };
}

export async function listUserTickets(
  userId: string,
): Promise<TicketSummary[]> {
  await connectToDatabase();

  const registrations = await Registration.find({ userId })
    .sort({ createdAt: -1 })
    .populate<{ eventId: PopulatedEvent | null }>(
      "eventId",
      "title category startsAt endsAt venue",
    )
    .exec();

  return registrations.map(toTicketSummary);
}

export async function getUserTicket(
  userId: string,
  registrationId: string,
): Promise<TicketSummary | null> {
  if (!/^[\da-f]{24}$/i.test(registrationId)) return null;

  await connectToDatabase();

  const registration = await Registration.findOne({
    _id: registrationId,
    userId,
  })
    .populate<{ eventId: PopulatedEvent | null }>(
      "eventId",
      "title category startsAt endsAt venue",
    )
    .exec();

  return registration ? toTicketSummary(registration) : null;
}

export function partitionTicketsByDate(tickets: TicketSummary[]) {
  const now = Date.now();
  return {
    upcoming: tickets.filter(
      (ticket) => ticket.event && Date.parse(ticket.event.endsAt) >= now,
    ),
    past: tickets.filter(
      (ticket) => ticket.event && Date.parse(ticket.event.endsAt) < now,
    ),
    unavailable: tickets.filter((ticket) => ticket.event === null),
  };
}
