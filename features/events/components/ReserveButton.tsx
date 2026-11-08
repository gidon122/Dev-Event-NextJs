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

const base = "w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition";
const primary = `btn btn-primary ${base} disabled:cursor-not-allowed disabled:opacity-60`;
const muted = `btn btn-ghost ${base} cursor-not-allowed text-muted-foreground`;
const ticketLink = `btn ${base} block border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20`;

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
