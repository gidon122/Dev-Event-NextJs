"use client";

import React, { useState } from "react";
import posthog from "posthog-js";

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    category: "Conference",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    posthog.capture("event_creation_submitted", {
      title: formData.title,
      category: formData.category,
      location: formData.location,
    });
    alert(`Event "${formData.title}" created successfully (simulation)!`);
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      category: "Conference",
      description: "",
    });
  };

  return (
    <section className="mt-20 max-w-2xl mx-auto p-6 bg-[#0d161a] border border-[#182830] rounded-xl shadow-2xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gradient mb-2">
        Create New Event
      </h1>
      <p className="text-center text-light-200/80 text-sm mb-8">
        Fill in the details below to host your developer event.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-light-100 mb-2">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. NextJS Conf 2026"
            required
            className="w-full px-4 py-2.5 bg-[#182830]/40 border border-[#182830] rounded-lg text-white placeholder-light-200/30 focus:outline-none focus:border-primary transition-all duration-200"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-light-100 mb-2">
              Date
            </label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. Oct 24, 2026"
              required
              className="w-full px-4 py-2.5 bg-[#182830]/40 border border-[#182830] rounded-lg text-white placeholder-light-200/30 focus:outline-none focus:border-primary transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-semibold text-light-100 mb-2">
              Time
            </label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g. 10:00 AM"
              required
              className="w-full px-4 py-2.5 bg-[#182830]/40 border border-[#182830] rounded-lg text-white placeholder-light-200/30 focus:outline-none focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-light-100 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Paris, France or Virtual"
              required
              className="w-full px-4 py-2.5 bg-[#182830]/40 border border-[#182830] rounded-lg text-white placeholder-light-200/30 focus:outline-none focus:border-primary transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-light-100 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-[#182830] border border-[#182830] rounded-lg text-white focus:outline-none focus:border-primary transition-all duration-200"
            >
              <option value="Conference">Conference</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Meetup">Meetup</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-light-100 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell developers what this event is about..."
            required
            rows={4}
            className="w-full px-4 py-2.5 bg-[#182830]/40 border border-[#182830] rounded-lg text-white placeholder-light-200/30 focus:outline-none focus:border-primary transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#5dfeca] hover:bg-[#5dfeca]/90 text-[#0d161a] font-bold rounded-lg transition-all duration-200 cursor-pointer shadow-lg hover:scale-[1.01]"
        >
          Submit Event
        </button>
      </form>
    </section>
  );
};

export default CreateEventPage;
