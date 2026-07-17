"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import { EventItems } from "@/lib/constants";
import posthog from "posthog-js";

interface EventDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItems;
}

const EventDetails = ({ isOpen, onClose, event }: EventDetailsProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      posthog.capture("event_details_viewed", {
        title: event.title,
        slug: event.slug,
        category: event.category,
      });
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, event]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    posthog.capture("event_booking_submitted", {
      title: event.title,
      slug: event.slug,
    });
    alert(`Successfully registered for ${event.title}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#0d161a] border border-[#182830] rounded-xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 bg-[#182830] hover:bg-[#182830]/80 text-white rounded-full p-1.5 cursor-pointer transition-colors duration-200"
          aria-label="Close details"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content Wrapper (Scrollable) */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div id="event" className="p-4 sm:p-6 md:p-8">

            {/* Header / Category */}
            <div className="header pr-8">
              <span className="pill uppercase tracking-wider text-xs">{event.category}</span>
              <h1 className="mt-1.5 text-xl sm:text-2xl md:text-3xl text-gradient leading-tight">{event.title}</h1>
            </div>

            {/* Main grid */}
            <div className="details grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 mt-5">

              {/* Left Column: Image and Description */}
              <div className="content flex flex-col gap-4">
                <div className="relative w-full h-[180px] sm:h-[240px] md:h-[280px] rounded-lg overflow-hidden border border-[#182830]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="banner object-cover"
                    priority
                  />
                </div>

                <div className="flex flex-col gap-2 bg-[#182830]/30 p-3.5 sm:p-4 rounded-lg border border-[#182830]/50">
                  <h2 className="text-base sm:text-lg font-bold text-gradient">Event Overview</h2>
                  <p className="text-light-200 leading-relaxed font-light text-xs sm:text-sm">{event.description}</p>
                </div>

                {/* Event Details Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#182830] pt-4">
                  <div className="flex flex-row items-center gap-2.5">
                    <div className="bg-[#182830] p-2 rounded-lg border border-[#182830]/50 shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-light-200/60 uppercase">Date</span>
                      <span className="text-xs sm:text-sm font-semibold text-light-100 truncate">{event.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2.5">
                    <div className="bg-[#182830] p-2 rounded-lg border border-[#182830]/50 shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-light-200/60 uppercase">Time</span>
                      <span className="text-xs sm:text-sm font-semibold text-light-100 truncate">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-2.5">
                    <div className="bg-[#182830] p-2 rounded-lg border border-[#182830]/50 shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-light-200/60 uppercase">Location</span>
                      <span className="text-xs sm:text-sm font-semibold text-light-100 truncate">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Card */}
              <div className="booking">
                <div className="signup-card p-4 sm:p-5 rounded-lg border border-[#182830] bg-[#182830]/20 sticky top-0">
                  <h3 className="text-base sm:text-lg font-bold text-gradient">Reserve Your Spot</h3>
                  <p className="text-xs text-light-200 mt-1">Fill in your details below to secure your seat at this event.</p>

                  <div id="book-event" className="mt-3">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullname" className="text-xs font-light text-light-100">Full Name</label>
                        <input
                          type="text"
                          id="fullname"
                          placeholder="John Doe"
                          required
                          className="w-full text-white text-sm px-3 py-2 rounded-md bg-[#0d161a] border border-[#182830] focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-xs font-light text-light-100">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="johndoe@example.com"
                          required
                          className="w-full text-white text-sm px-3 py-2 rounded-md bg-[#0d161a] border border-[#182830] focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full mt-1 py-2.5 text-sm font-semibold rounded-md bg-primary text-white transition-all duration-200 hover:scale-[1.02]"
                      >
                        Register Now
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;