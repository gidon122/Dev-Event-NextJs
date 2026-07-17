"use client";

import React, { useState } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";

import EventDetails from "./EventDetails";
import { EventItems } from "@/lib/constants";

const EventCard = (event: EventItems) => {
  const [isOpen, setIsOpen] = useState(false);

  const { title, image, slug, location, date, time } = event;

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.preventDefault();

    setIsOpen(true);

    posthog.capture("event_card_clicked", {
      title,
      slug,
      location,
    });
  };

  return (
    <>
      <div
        id="event-card"
        onClick={handleOpenDetails}
        className="
        group
        cursor-pointer
        h-full
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-md
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-indigo-400/40
        hover:shadow-[0_20px_50px_rgba(79,70,229,0.25)]
      "
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={410}
            height={300}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

          {/* Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            <Sparkles className="h-3 w-3" />
            Featured
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-5">

          <div>

            {/* Location */}
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 text-indigo-400" />
              {location}
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
              {title}
            </h3>

            {/* Date & Time */}
            <div className="mt-5 flex items-center justify-between text-sm text-gray-400">

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-cyan-400" />
                {date}
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-violet-400" />
                {time}
              </div>

            </div>

          </div>

          {/* CTA */}
          <button
            onClick={handleOpenDetails}
            className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-lg
            group/button
          "
          >
            View Details

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>

        </div>
      </div>

      <EventDetails
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        event={event}
      />
    </>
  );
};

export default EventCard;