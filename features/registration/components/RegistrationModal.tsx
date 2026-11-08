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
        className="surface-raised w-full max-w-md p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="registration-modal-title" className="text-xl font-bold text-foreground">
            Register for event
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-sm text-muted-foreground hover:text-foreground"
            aria-label="Close registration form"
          >
            Close
          </button>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Registering for <span className="font-semibold text-primary">{eventName}</span>
        </p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1.5 text-xs text-muted-foreground">
            <span>Full name</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              maxLength={120}
              required
              className="w-full rounded-lg border border-line-strong bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>

          <label className="block space-y-1.5 text-xs text-muted-foreground">
            <span>Department</span>
            <input
              name="department"
              type="text"
              maxLength={120}
              required
              className="w-full rounded-lg border border-line-strong bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            />
          </label>

          <label className="block space-y-1.5 text-xs text-muted-foreground">
            <span>Level / year</span>
            <select
              name="level"
              required
              defaultValue=""
              className="w-full rounded-lg border border-line-strong bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
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
              className="btn btn-ghost flex-1 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Registering..." : "Confirm registration"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
