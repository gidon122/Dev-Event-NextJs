"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Download,
  CalendarPlus,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          My tickets
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Your registered access passes and attendance records
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab("upcoming")}
          className={`relative pb-3 text-xs sm:text-sm font-semibold transition-colors ${
            activeTab === "upcoming"
              ? "text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Upcoming <span className="text-xs text-blue-400">3</span>
          {activeTab === "upcoming" && (
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("past")}
          className={`relative ml-6 pb-3 text-xs sm:text-sm font-medium transition-colors ${
            activeTab === "past"
              ? "text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Past events <span className="text-xs text-slate-500">5</span>
          {activeTab === "past" && (
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
          )}
        </button>
      </div>

      {activeTab === "upcoming" ? (
        <div className="space-y-4">
          {/* Featured Ticket (matches wireframe) */}
          <div className="rounded-2xl border border-blue-500/40 bg-gradient-to-br from-[#0c1b30] to-[#081220] p-6 shadow-xl">
            <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
              {/* Left Details */}
              <div className="space-y-3 flex-1">
                <span className="inline-block rounded-full bg-blue-600/30 px-3 py-1 text-xs font-semibold text-blue-300">
                  Starts in 2 days
                </span>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  React Conference
                </h2>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    <span>Sat 1 Nov, 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    <span>Main Auditorium</span>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-400 pt-1">
                  Ticket ID: <span className="text-slate-200">EL-7F3A-0192</span>
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => alert("Added to device calendar!")}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
                  >
                    <CalendarPlus className="h-3.5 w-3.5" />
                    <span>Add to calendar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => alert("Registration cancellation requested.")}
                    className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-xs font-medium text-rose-300 transition hover:bg-rose-500/10"
                  >
                    Cancel registration
                  </button>
                </div>
              </div>

              {/* Right QR Code Showcase */}
              <div className="flex flex-col items-center justify-center self-center rounded-2xl bg-white p-4 text-center text-black shadow-lg">
                <div className="flex h-28 w-28 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50">
                  <QrCode className="h-20 w-20 text-gray-900" />
                </div>
                <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-gray-700">
                  Show at the door
                </span>
              </div>
            </div>
          </div>

          {/* Other upcoming passes */}
          <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-4 transition hover:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">AI Hack Night</h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Thu 5 Nov, 6:00 PM • ICT Lab
                </p>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => alert("Downloading digital ticket...")}
                  className="rounded-lg p-2 hover:bg-white/5 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </button>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-4 transition hover:border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Career Fair</h3>
                <p className="mt-0.5 text-xs text-slate-400">
                  Thu 12 Nov, 9:00 AM • Sports Complex
                </p>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => alert("Downloading digital ticket...")}
                  className="rounded-lg p-2 hover:bg-white/5 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </button>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Past Events Tab */
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0f141d] p-4">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Intro to ML workshop
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                24 Oct • Room 204
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                Attended
              </span>
              <Link
                href="/reviews"
                className="text-xs font-medium text-blue-400 hover:underline"
              >
                Write review
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#0f141d] p-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Campus Mixer</h3>
              <p className="mt-0.5 text-xs text-slate-400">
                10 Oct • Student Centre
              </p>
            </div>
            <div>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400">
                Missed
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
