"use client";

import Link from "next/link";

const Create = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/90 px-5 py-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <p className="text-sm font-semibold text-emerald-100 sm:text-base">
          Host your own event
        </p>
        <Link
          href="/events/create"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 sm:mt-0"
        >
          Create event
        </Link>
      </div>
    </section>
  );
};

export default Create;
