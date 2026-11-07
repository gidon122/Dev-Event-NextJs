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
        className="mb-6 inline-flex text-sm text-slate-400 transition hover:text-white"
      >
        Back to my tickets
      </Link>
      <section className="rounded-2xl border border-white/10 bg-[#0b0f19] p-6 text-center shadow-xl sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
          EventLoop digital pass
        </p>
        <h1 className="mt-3 text-2xl font-bold text-white">{ticket.event.title}</h1>
        <p className="mt-2 text-sm text-slate-400">
          {formatEventDate(ticket.event.startsAt)}
        </p>
        <p className="mt-1 text-sm text-slate-400">{ticket.event.venue}</p>

        <div className="mx-auto my-7 w-fit rounded-xl bg-white p-3">
          <Image
            src={qrCode}
            alt={`QR code for ticket ${ticket.ticketId}`}
            width={280}
            height={280}
            unoptimized
          />
        </div>

        <p className="text-xs text-slate-400">Attendee</p>
        <p className="mt-1 font-semibold text-white">{ticket.name}</p>
        <p className="mt-4 text-xs text-slate-400">Ticket ID</p>
        <p className="mt-1 break-all font-mono text-sm text-purple-300">
          {ticket.ticketId}
        </p>
        <p className="mt-4 text-xs text-slate-400">
          Present this QR code at event check-in.
        </p>
      </section>
    </main>
  );
}
