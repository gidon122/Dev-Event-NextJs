"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ChevronRight,
  Star,
} from "lucide-react";

interface DashboardClientProps {
  userName: string;
}

export default function DashboardClient({ userName }: DashboardClientProps) {
  const [rating, setRating] = useState(0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="page-title">
          Welcome back, {userName}
        </h1>
        <p className="page-subtitle sm:text-sm">
          Here&apos;s what&apos;s happening on campus
        </p>
      </div>

      {/* Next Up Highlight Card */}
      <div className="surface-raised relative overflow-hidden p-5 shadow-xl sm:p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-highlight/30 bg-highlight/10 px-3 py-1 text-xs font-medium text-highlight">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-highlight text-[10px] font-bold text-highlight-foreground">
                3
              </span>
              <span>Next up</span>
            </div>

            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              React Conference
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-highlight" />
                Sat 1 Nov, 10:00 AM
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Main Auditorium
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tickets"
                className="btn btn-primary px-4 py-2 text-xs"
              >
                View ticket
              </Link>
              <button
                type="button"
                onClick={() => alert("Registration cancellation requested.")}
                className="btn btn-ghost px-4 py-2 text-xs text-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Countdown block */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="surface flex flex-col items-center justify-center px-4 py-3">
              <span className="text-xl font-extrabold text-highlight sm:text-2xl">02</span>
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase">days</span>
            </div>
            <div className="surface flex flex-col items-center justify-center px-4 py-3">
              <span className="text-xl font-extrabold text-highlight sm:text-2xl">04</span>
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase">hrs</span>
            </div>
            <div className="surface flex flex-col items-center justify-center px-4 py-3">
              <span className="text-xl font-extrabold text-highlight sm:text-2xl">15</span>
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase">min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="surface p-5">
          <span className="text-xs font-medium text-muted-foreground">Registered</span>
          <p className="mt-2 text-3xl font-bold text-foreground">8</p>
        </div>
        <div className="surface p-5">
          <span className="text-xs font-medium text-muted-foreground">Attended</span>
          <p className="mt-2 text-3xl font-bold text-foreground">5</p>
        </div>
        <div className="surface p-5">
          <span className="text-xs font-medium text-muted-foreground">Reviews</span>
          <p className="mt-2 text-3xl font-bold text-foreground">3</p>
        </div>
      </div>

      {/* Grid: Upcoming tickets and recent reviews */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Tickets */}
        <div className="surface p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-xs font-semibold text-foreground">
                5
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Upcoming tickets
              </h3>
            </div>
            <Link
              href="/tickets"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-line">
            <Link
              href="/tickets"
              className="group flex items-center justify-between py-3.5 transition-colors hover:bg-surface-hover"
            >
              <div>
                <p className="text-xs font-semibold text-foreground group-hover:text-primary">
                  React Conference
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  1 Nov • Main Auditorium
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tickets"
              className="group flex items-center justify-between py-3.5 transition-colors hover:bg-surface-hover"
            >
              <div>
                <p className="text-xs font-semibold text-foreground group-hover:text-primary">
                  AI Hack Night
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  5 Nov • ICT Lab
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tickets"
              className="group flex items-center justify-between py-3.5 transition-colors hover:bg-surface-hover"
            >
              <div>
                <p className="text-xs font-semibold text-foreground group-hover:text-primary">
                  Career Fair
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  12 Nov • Sports Complex
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-subtle transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right side: Rate Recent Events */}
        <div className="space-y-6">
          <div className="surface p-5 sm:p-6">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover text-xs font-semibold text-foreground">
                6
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Rate your recent events
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Intro to ML workshop
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Attended 24 Oct
                </p>
              </div>

              {/* Star Rating Interactive */}
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-subtle transition-colors hover:text-highlight"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        star <= rating
                          ? "fill-highlight text-highlight"
                          : "text-subtle"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/reviews"
                  className="btn btn-ghost px-4 py-2 text-xs text-muted-foreground"
                >
                  Write review
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
