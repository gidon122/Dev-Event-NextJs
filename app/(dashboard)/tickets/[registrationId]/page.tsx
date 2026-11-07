import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import TicketPass from "@/features/tickets/components/TicketPass";
import { getUserTicket } from "@/features/tickets/service.server";

export default async function TicketPassPage({
  params,
}: {
  params: Promise<{ registrationId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login?redirect=%2Ftickets");
  }

  const { registrationId } = await params;
  const ticket = await getUserTicket(userId, registrationId);
  if (!ticket || ticket.status !== "CONFIRMED" || !ticket.event) {
    notFound();
  }

  return <TicketPass ticket={ticket} />;
}
