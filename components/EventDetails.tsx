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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0d161a] border border-[#182830] rounded-xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-[#182830] hover:bg-[#182830]/80 text-white rounded-full p-2 cursor-pointer transition-colors duration-200"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Wrapper (Scrollable) */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          <div id="event" className="p-6 sm:p-8 md:p-10">
            {/* Header / Category */}
            <div className="header">
              <span className="pill uppercase tracking-wider">{event.category}</span>
              <h1 className="mt-2 text-gradient">{event.title}</h1>
            </div>

            {/* Main grid */}
            <div className="details mt-8">
              {/* Left Column: Image and Description */}
              <div className="content">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden border border-[#182830]">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill
                    className="banner object-cover"
                    priority
                  />
                </div>
                
                <div className="mt-6 flex flex-col gap-4 bg-[#182830]/30 p-5 rounded-lg border border-[#182830]/50">
                  <h2 className="text-xl sm:text-2xl font-bold text-gradient">Event Overview</h2>
                  <p className="text-light-200 leading-relaxed font-light text-sm sm:text-base">{event.description}</p>
                </div>

                {/* Event Details Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 border-t border-[#182830] pt-6">
                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#182830] p-2.5 rounded-lg border border-[#182830]/50">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-light-200/60 uppercase">Date</span>
                      <span className="text-sm font-semibold text-light-100">{event.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#182830] p-2.5 rounded-lg border border-[#182830]/50">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-light-200/60 uppercase">Time</span>
                      <span className="text-sm font-semibold text-light-100">{event.time}</span>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <div className="bg-[#182830] p-2.5 rounded-lg border border-[#182830]/50">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-light-200/60 uppercase">Location</span>
                      <span className="text-sm font-semibold text-light-100">{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Card */}
              <div className="booking">
                <div className="signup-card">
                  <h3 className="text-lg font-bold text-gradient">Reserve Your Spot</h3>
                  <p className="text-xs text-light-200">Fill in your details below to secure your seat at this event.</p>
                  
                  <div id="book-event" className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="fullname" className="text-sm font-light text-light-100">Full Name</label>
                        <input 
                          type="text" 
                          id="fullname" 
                          placeholder="John Doe" 
                          required 
                          className="w-full text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm font-light text-light-100">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          placeholder="johndoe@example.com" 
                          required 
                          className="w-full text-white"
                        />
                      </div>
                      <button type="submit" className="transition-all duration-200 hover:scale-[1.02]">
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
