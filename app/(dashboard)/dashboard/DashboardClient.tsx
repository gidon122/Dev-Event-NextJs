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
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, {userName}
        </h1>
        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
          Here&apos;s what&apos;s happening on campus
        </p>
      </div>

      {/* Next Up Highlight Card */}
      <div className="relative overflow-hidden rounded-2xl border border-[#1e3a5f] bg-gradient-to-r from-[#0a1e38] via-[#0c284d] to-[#07192f] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1e40af]/30 px-3 py-1 text-xs font-medium text-blue-300">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                3
              </span>
              <span>Next up</span>
            </div>

            <h2 className="text-xl font-bold text-white sm:text-2xl">
              React Conference
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                Sat 1 Nov, 10:00 AM
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                Main Auditorium
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Link
                href="/tickets"
                className="rounded-xl bg-[#1d4ed8] px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-[#2563eb]"
              >
                View ticket
              </Link>
              <button
                type="button"
                onClick={() => alert("Registration cancellation requested.")}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Countdown block */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex flex-col items-center justify-center rounded-xl bg-[#081526] px-4 py-3 border border-[#1e3a5f]">
              <span className="text-xl font-extrabold text-blue-300 sm:text-2xl">02</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">days</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-[#081526] px-4 py-3 border border-[#1e3a5f]">
              <span className="text-xl font-extrabold text-blue-300 sm:text-2xl">04</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">hrs</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl bg-[#081526] px-4 py-3 border border-[#1e3a5f]">
              <span className="text-xl font-extrabold text-blue-300 sm:text-2xl">15</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5">
          <span className="text-xs font-medium text-slate-400">Registered</span>
          <p className="mt-2 text-3xl font-bold text-white">8</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5">
          <span className="text-xs font-medium text-slate-400">Attended</span>
          <p className="mt-2 text-3xl font-bold text-white">5</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5">
          <span className="text-xs font-medium text-slate-400">Reviews</span>
          <p className="mt-2 text-3xl font-bold text-white">3</p>
        </div>
      </div>

      {/* Grid: Upcoming tickets and recent reviews */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Tickets */}
        <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-slate-200">
                5
              </span>
              <h3 className="text-sm font-semibold text-white">
                Upcoming tickets
              </h3>
            </div>
            <Link
              href="/tickets"
              className="text-xs text-blue-400 hover:text-blue-300 hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            <Link
              href="/tickets"
              className="group flex items-center justify-between py-3.5 transition-colors hover:bg-white/[0.02]"
            >
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-blue-300">
                  React Conference
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  1 Nov • Main Auditorium
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tickets"
              className="group flex items-center justify-between py-3.5 transition-colors hover:bg-white/[0.02]"
            >
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-blue-300">
                  AI Hack Night
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  5 Nov • ICT Lab
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/tickets"
              className="group flex items-center justify-between py-3.5 transition-colors hover:bg-white/[0.02]"
            >
              <div>
                <p className="text-xs font-semibold text-white group-hover:text-blue-300">
                  Career Fair
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  12 Nov • Sports Complex
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right side: Rate Recent Events */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5 sm:p-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-slate-200">
                6
              </span>
              <h3 className="text-sm font-semibold text-white">
                Rate your recent events
              </h3>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs font-semibold text-white">
                  Intro to ML workshop
                </p>
                <p className="text-[11px] text-slate-400">
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
                    className="p-1 text-slate-600 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-500"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
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
