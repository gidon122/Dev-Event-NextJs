"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

import { EventGrid } from "@/features/events";
import type { EventSummary } from "@/features/events";

const FeaturedEvent: React.FC<{ events: EventSummary[] }> = ({ events }) => {
  return (
    <section
      id="featured-events"
      className="relative w-full overflow-hidden py-0"
    >
      <div id="events" className="sr-only" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className="surface-raised relative px-8 py-10"
      >
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Featured This Week
          </div>

          <h2 className="font-sans text-3xl font-bold text-foreground md:text-4xl">
            Discover{" "}
            <span className="text-gradient">
              Trending Tech Events
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-muted-foreground">
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
          className="w-full"
        >
          {events.length > 0 ? (
            <EventGrid
              events={events}
              isAuthenticated={false}
              actionHref={() => "/event"}
              actionLabel="View event"
            />
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              New events will show up here as soon as they are published.
            </p>
          )}
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
            href="/event"
            className="btn btn-primary group rounded-full px-7 py-3 transition-transform duration-300 hover:scale-105"
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
