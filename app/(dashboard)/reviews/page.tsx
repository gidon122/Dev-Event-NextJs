"use client";

import React, { useState } from "react";
import { Star, Clock, Trash2, Edit3, CheckCircle } from "lucide-react";

export default function MyReviewsPage() {
  const [rating, setRating] = useState(4);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const pastReviews = [
    {
      id: 1,
      title: "Web Dev Bootcamp",
      date: "Posted 15 Oct",
      stars: 4,
      comment: "Hands-on and well paced. The mentors were very helpful.",
    },
    {
      id: 2,
      title: "Campus Hackathon",
      date: "Posted 2 Oct",
      stars: 3,
      comment: "Good idea, but the schedule ran late.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          My reviews
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Share your feedback on campus events you attended
        </p>
      </div>

      {/* Waiting for your review */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Waiting for your review
        </h2>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-blue-500/30 bg-[#0d1624] p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Intro to ML workshop
                </h3>
                <p className="text-xs text-slate-400">
                  Attended 24 Oct • Room 204
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                Review open
              </span>
            </div>

            {/* Interactive Stars */}
            <div className="mt-3 flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition hover:scale-110"
                >
                  <Star
                    className={`h-4 w-4 ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Textarea */}
            <div className="mt-3">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value.slice(0, 500))}
                rows={3}
                placeholder="Great speakers, but the room was crowded"
                className="w-full rounded-xl border border-white/10 bg-[#070b10] p-3 text-xs text-white placeholder-slate-500 focus:border-[#59deca] focus:outline-none"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                <span>{reviewText.length} / 500</span>
                <button
                  type="submit"
                  disabled={!reviewText.trim()}
                  className="rounded-xl border border-white/10 bg-white/10 px-4 py-1.5 font-medium text-white transition hover:bg-white/20 disabled:opacity-40"
                >
                  Submit review
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-emerald-300">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>Thank you! Your review for Intro to ML workshop has been recorded.</span>
          </div>
        )}

        {/* Future event locked review */}
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/10 bg-[#0f141d]/50 p-4 text-xs text-slate-400">
          <Clock className="h-4 w-4 text-slate-500 shrink-0" />
          <div>
            <span className="font-semibold text-slate-300">React Conference</span>
            <p className="text-[11px] text-slate-500">
              Reviews open after the event ends on 1 Nov
            </p>
          </div>
        </div>
      </div>

      {/* Your reviews */}
      <div className="space-y-3 pt-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Your reviews
        </h2>

        {pastReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-2xl border border-white/5 bg-[#0f141d] p-4 text-xs space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{rev.title}</h3>
              <span className="text-[11px] text-slate-500">{rev.date}</span>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-3 w-3 ${
                    s <= rev.stars
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-600"
                  }`}
                />
              ))}
            </div>

            <p className="text-slate-300">{rev.comment}</p>

            <div className="flex items-center gap-3 pt-1 text-[11px]">
              <button
                type="button"
                onClick={() => alert("Edit review modal")}
                className="flex items-center gap-1 text-blue-400 hover:underline"
              >
                <Edit3 className="h-3 w-3" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Review deleted")}
                className="flex items-center gap-1 text-rose-400 hover:underline"
              >
                <Trash2 className="h-3 w-3" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
