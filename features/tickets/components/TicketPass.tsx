import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { formatEventDate } from "@/lib/dates";
import type { TicketSummary } from "../types";

export default async function TicketPass({
  ticket,
}: {
  ticket: TicketSummary;
}) {
  if (!ticket.event) return null;

  const qrCode = await QRCode.toDataURL(ticket.ticketId, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 280,
    color: { dark: "#111827", light: "#ffffff" },
  });

  return (
    <main className="mx-auto max-w-xl">
      <Link
        href="/tickets"
        className="mb-6 inline-flex text-sm text-muted-foreground transition hover:text-foreground"
      >
        Back to my tickets
      </Link>
      <section className="surface-raised p-6 text-center shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          EventLoop digital pass
        </p>
        <h1 className="mt-3 text-2xl font-bold text-foreground">{ticket.event.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatEventDate(ticket.event.startsAt)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{ticket.event.venue}</p>

        <div className="mx-auto my-7 w-fit rounded-xl bg-white p-3">
          <Image
            src={qrCode}
            alt={`QR code for ticket ${ticket.ticketId}`}
            width={280}
            height={280}
            unoptimized
          />
        </div>

        <p className="text-xs text-muted-foreground">Attendee</p>
        <p className="mt-1 font-semibold text-foreground">{ticket.name}</p>
        <p className="mt-4 text-xs text-muted-foreground">Ticket ID</p>
        <p className="mt-1 break-all font-mono text-sm text-primary">
          {ticket.ticketId}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Present this QR code at event check-in.
        </p>
      </section>
    </main>
  );
}
