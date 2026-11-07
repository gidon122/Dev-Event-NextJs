import type { RegistrationStatus } from "@/models/registration";

export interface TicketEvent {
  id: string;
  title: string;
  category: string;
  startsAt: string;
  endsAt: string;
  venue: string;
}

export interface TicketSummary {
  id: string;
  ticketId: string;
  name: string;
  department: string;
  level: string;
  status: RegistrationStatus;
  createdAt: string;
  event: TicketEvent | null;
}
