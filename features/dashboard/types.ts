import type { TicketSummary, TicketEvent } from "@/features/tickets/types";

export type DashboardTicket = TicketSummary & { event: TicketEvent };

export interface DashboardData {
  registeredCount: number;
  attendedCount: number;
  upcomingCount: number;
  upcomingTickets: DashboardTicket[];
  nextUp: DashboardTicket | null;
  unavailableCount: number;
  hasRegistrations: boolean;
}
