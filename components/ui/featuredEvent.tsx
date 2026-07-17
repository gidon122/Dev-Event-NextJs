"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

import EventCard from "../events/EventCard";
import { events } from "@/lib/constants";

const FeaturedEvent: React.FC = () => {
  const featured = events.slice(0, 3);

  return (
    <section
      id="featured-events"
      className="relative w-full overflow-hidden py-10"
    >
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="glass relative rounded-2xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-xl"
      >
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <Sparkles className="h-4 w-4" />
            Featured This Week
          </div>

          <h2 className="font-schibsted-grotesk text-3xl font-bold text-white md:text-4xl">
            Discover{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Trending Tech Events
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-gray-400">
            Handpicked hackathons, conferences, workshops and meetups
            designed to help you learn, network and build with the developer
            community.
          </p>
        </div>

        {/* Event Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="events"
        >
          {featured.map((ev) => (
            <motion.div
              key={ev.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 40,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
            >
              <EventCard {...ev} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/events"
            className="group inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.45)]"
          >
            View All Events

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FeaturedEvent;