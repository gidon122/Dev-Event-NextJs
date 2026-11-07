"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegistrationModal from "@/features/registration/components/RegistrationModal";
import type { EventSummary, ViewerEventState } from "../types";

interface ReserveButtonProps {
  event: Pick<EventSummary, "id" | "title">;
  state: ViewerEventState;
  isAuthenticated: boolean;
}

const base =
  "w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition";
const primary = `${base} bg-[#59deca] text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60`;
const muted = `${base} cursor-not-allowed border border-white/10 bg-white/5 text-slate-400`;
const ticketLink = `${base} block border border-[#59deca]/40 bg-[#59deca]/10 text-center text-[#59deca] hover:bg-[#59deca]/20`;

function loginHref() {
  const next = window.location.pathname + window.location.search;
  return `/login?redirect=${encodeURIComponent(next)}`;
}

export function ReserveButton({
  event,
  state,
  isAuthenticated,
}: ReserveButtonProps) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  if (state === "registered") {
    return (
      <Link href="/tickets" className={ticketLink}>
        View ticket
      </Link>
    );
  }
  if (state === "full") {
    return (
      <button type="button" disabled className={muted}>
        Event full
      </button>
    );
  }
  if (state === "closed") {
    return (
      <button type="button" disabled className={muted}>
        Registration closed
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!isAuthenticated) {
            router.push(loginHref());
            return;
          }
          setModalOpen(true);
        }}
        className={primary}
      >
        Register
      </button>
      <RegistrationModal
        eventId={event.id}
        eventName={event.title}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
