"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import posthog from 'posthog-js';
import { ArrowRight } from 'lucide-react';
import EventDetails from './EventDetails';
import { EventItems } from '@/lib/constants';

const EventCard = (event: EventItems) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, image, slug, location, date, time } = event;

  const handleOpenDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    posthog.capture("event_card_clicked", { title, slug, location });
  };

  return (
    <>
      <div 
        id='event-card' 
        className="cursor-pointer group flex flex-col gap-3 h-full justify-between"
        onClick={handleOpenDetails}
      >
        <div className="flex flex-col gap-3">
          <div className="relative overflow-hidden rounded-lg">
            <Image 
              src={image} 
              alt={title} 
              width={410} 
              height={300} 
              className='poster transition-transform duration-500 group-hover:scale-105'
            />
          </div>
          <div className="flex flex-row gap-2">
            <Image src="/icons/pin.svg" alt="location" width={14} height={14}/>
            <p>{location}</p>
          </div>
          <p className="title group-hover:text-primary transition-colors duration-200">{title}</p>
          <div className="datetime">
            <div>
              <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
              <p>{date}</p>
            </div>
            <div>
              <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
              <p>{time}</p>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button 
          onClick={handleOpenDetails}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-dark-200 hover:bg-primary hover:text-dark-100 text-light-100 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer text-center group/btn"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>

      <EventDetails 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        event={event} 
      />
    </>
  )
}

export default EventCard;