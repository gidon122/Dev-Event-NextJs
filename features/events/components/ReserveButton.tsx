"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ViewerEventState } from "../types";

interface ReserveButtonProps {
  eventId: string;
  state: ViewerEventState;
  isAuthenticated: boolean;
}

const base = "w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition";
const primary = `${base} bg-[#59deca] text-black hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60`;
const muted = `${base} cursor-not-allowed border border-white/10 bg-white/5 text-slate-400`;
const ticketLink = `${base} block border border-[#59deca]/40 bg-[#59deca]/10 text-center text-[#59deca] hover:bg-[#59deca]/20`;

function loginHref() {
  const next = window.location.pathname + window.location.search;
  return `/login?redirect=${encodeURIComponent(next)}`;
}

/**
 * Guest: sends them to /login and brings them back to this page.
 * Signed in: reserves a spot through POST /api/registrations.
 */
export function ReserveButton({
  eventId,
  state,
  isAuthenticated,
}: ReserveButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (state === "registered" || reserved) {
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

  async function handleReserve() {
    if (!isAuthenticated) {
      router.push(loginHref());
      return;
    }

    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId }),
      });

      if (res.status === 401) {
        router.push(loginHref());
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setError(
          body?.error?.message ?? "We couldn't reserve your spot. Try again.",
        );
        return;
      }

      setReserved(true);
      router.refresh();
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleReserve}
        disabled={pending}
        className={primary}
      >
        {pending ? "Reserving..." : "Reserve spot"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
