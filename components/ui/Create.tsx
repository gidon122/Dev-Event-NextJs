"use client";

import Link from "next/link";

const Create = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="surface px-5 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <p className="text-sm font-semibold text-foreground sm:text-base">
          Host your own event
        </p>
        <Link
          href="/events/create"
          className="btn btn-primary mt-4 rounded-full px-5 py-2.5 sm:mt-0"
        >
          Create event
        </Link>
      </div>
    </section>
  );
};

export default Create;
