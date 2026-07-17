"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Users,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const values = [
  {
    title: "Discover Curated Events",
    description:
      "Explore carefully selected hackathons, conferences, meetups and workshops tailored for developers at every stage.",
    icon: Compass,
    color: "text-cyan-400",
    glow:
      "hover:border-cyan-500/40 hover:shadow-[0_20px_45px_rgba(34,211,238,.25)]",
  },
  {
    title: "Grow Your Network",
    description:
      "Meet developers, founders, recruiters and creators while building meaningful relationships within the tech ecosystem.",
    icon: Users,
    color: "text-indigo-400",
    glow:
      "hover:border-indigo-500/40 hover:shadow-[0_20px_45px_rgba(99,102,241,.25)]",
  },
  {
    title: "Level Up Your Skills",
    description:
      "Learn directly from industry experts through workshops, technical talks and hands-on experiences.",
    icon: GraduationCap,
    color: "text-violet-400",
    glow:
      "hover:border-violet-500/40 hover:shadow-[0_20px_45px_rgba(168,85,247,.25)]",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const WhyDe = () => {
  return (
    <motion.section
      id="why-de"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#151827] to-slate-900 px-6 py-16 md:px-10"
    >
      {/* Background Glow */}

      <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <motion.span
            initial={{ opacity: 0, scale: .8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300"
          >
            Why Developers Love DevEvent
          </motion.span>

          <h2 className="mt-6 text-4xl font-bold text-white">

            Everything You Need to{" "}

            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Learn, Connect & Build
            </span>

          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            DevEvent is more than an event directory.
            It&apos;s a growing community where developers discover
            opportunities, connect with peers and accelerate
            their careers.
          </p>

        </div>

        {/* Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 grid gap-8 md:grid-cols-3"
        >
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.title}
                variants={item}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                }}
                className={`group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 ${value.glow}`}
              >
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.15,
                  }}
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ${value.color}`}
                >
                  <Icon size={30} />
                </motion.div>

                <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-300">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {value.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn More

                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default WhyDe;