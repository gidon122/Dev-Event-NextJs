"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface RegistrationModalProps {
  eventId: string;
  eventName: string;
  isOpen: boolean;
  onClose: () => void;
}

const levels = ["100", "200", "300", "400", "500", "600", "Graduate", "Other"];

export default function RegistrationModal({
  eventId,
  eventName,
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      eventId,
      name: String(formData.get("name") ?? "").trim(),
      department: String(formData.get("department") ?? "").trim(),
      level: String(formData.get("level") ?? "").trim(),
    };

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error ?? "We couldn't complete your registration.");
        return;
      }

      router.push("/tickets");
      router.refresh();
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0b0f19] p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="registration-modal-title" className="text-xl font-bold text-white">
            Register for event
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-sm text-slate-400 hover:text-white"
            aria-label="Close registration form"
          >
            Close
          </button>
        </div>

        <p className="mb-6 text-sm text-slate-300">
          Registering for <span className="font-semibold text-purple-300">{eventName}</span>
        </p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-red-800 bg-red-950/80 p-3 text-xs text-red-200"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5 text-xs text-slate-300">
            <span>Full name</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              required
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-400"
            />
          </label>

          <label className="block space-y-1.5 text-xs text-slate-300">
            <span>Department</span>
            <input
              name="department"
              type="text"
              maxLength={120}
              required
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-400"
            />
          </label>

          <label className="block space-y-1.5 text-xs text-slate-300">
            <span>Level / year</span>
            <select
              name="level"
              required
              defaultValue=""
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-400"
            >
              <option value="" disabled>
                Select your level
              </option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-purple-600 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Registering..." : "Confirm registration"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
