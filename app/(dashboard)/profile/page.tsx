"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Camera, Check, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.name || "Amina Okafor");
  const [email, setEmail] = useState(user?.email || "amina.o@campus.edu.ng");
  const [department, setDepartment] = useState(user?.department || "Computer Engineering");
  const [level, setLevel] = useState(user?.level || "400 level");

  const [eventReminders, setEventReminders] = useState(true);
  const [reviewPrompts, setReviewPrompts] = useState(true);
  const [newEvents, setNewEvents] = useState(false);

  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const initials = user?.avatarInitials || "AO";

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Manage your personal attendee details and notification preferences
        </p>
      </div>

      {/* Profile summary card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#0f141d] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0d2a4a] text-xl font-bold text-[#93c5fa] ring-2 ring-[#1e3a5f]">
            {initials}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{fullName}</h2>
            <p className="text-xs text-slate-400">
              Student • Member since Sep 2026
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Photo upload dialog")}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white self-start sm:self-auto"
        >
          <Camera className="h-3.5 w-3.5" />
          <span>Change photo</span>
        </button>
      </div>

      {/* Account details card */}
      <form
        onSubmit={handleSave}
        className="rounded-2xl border border-white/5 bg-[#0f141d] p-5 sm:p-6 space-y-4"
      >
        <h3 className="text-sm font-semibold text-white">Account details</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070b10] px-3.5 py-2 text-xs text-white focus:border-[#59deca] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Campus email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070b10] px-3.5 py-2 text-xs text-white focus:border-[#59deca] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#070b10] px-3.5 py-2 text-xs text-white focus:border-[#59deca] focus:outline-none"
            />
          </div>
        </div>

        <div className="max-w-xs">
          <label className="mb-1.5 block text-xs font-medium text-slate-400">
            Level
          </label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#070b10] px-3.5 py-2 text-xs text-white focus:border-[#59deca] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20"
          >
            Save changes
          </button>
          {savedFeedback && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <Check className="h-3.5 w-3.5" />
              Changes saved
            </span>
          )}
        </div>
      </form>

      {/* Notifications card */}
      <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Notifications</h3>

        <div className="divide-y divide-white/5 text-xs">
          <div className="flex items-center justify-between py-3">
            <span className="text-slate-300">
              Event reminders (24 hours before)
            </span>
            <button
              type="button"
              onClick={() => setEventReminders(!eventReminders)}
              className={`h-5 w-9 rounded-full transition-colors relative ${
                eventReminders ? "bg-blue-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  eventReminders ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-slate-300">
              Review prompts after events
            </span>
            <button
              type="button"
              onClick={() => setReviewPrompts(!reviewPrompts)}
              className={`h-5 w-9 rounded-full transition-colors relative ${
                reviewPrompts ? "bg-blue-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  reviewPrompts ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-slate-300">
              New events in my categories
            </span>
            <button
              type="button"
              onClick={() => setNewEvents(!newEvents)}
              className={`h-5 w-9 rounded-full transition-colors relative ${
                newEvents ? "bg-blue-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  newEvents ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Change password card */}
      <div className="rounded-2xl border border-white/5 bg-[#0f141d] p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-semibold text-white">Change password</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Current password
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#070b10] px-3.5 py-2 text-xs text-white focus:border-[#59deca] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              New password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-[#070b10] px-3.5 py-2 text-xs text-white focus:border-[#59deca] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Password updated successfully.")}
          className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20"
        >
          Update password
        </button>
      </div>
    </div>
  );
}
