import "server-only";

import { listUserTickets } from "@/features/tickets/service.server";
import { buildDashboardData } from "./dashboard-data";
import type { DashboardData } from "./types";

export async function getUserDashboardData(
  userId: string,
): Promise<DashboardData> {
  const registrations = await listUserTickets(userId);
  return buildDashboardData(registrations);
}
