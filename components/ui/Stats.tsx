"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  MapPinned,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    value: "120+",
    title: "Events Hosted",
    description:
      "Hackathons, conferences, workshops and meetups hosted every year.",
    color: "text-indigo-400",
    glow: "hover:border-indigo-500/40 hover:shadow-[0_15px_45px_rgba(99,102,241,.25)]",
  },
  {
    icon: Users,
    value: "5,000+",
    title: "Developers Connected",
    description:
      "Students, engineers and founders learning and networking together.",
    color: "text-cyan-400",
    glow: "hover:border-cyan-500/40 hover:shadow-[0_15px_45px_rgba(34,211,238,.25)]",
  },
  {
    icon: MapPinned,
    value: "30+",
    title: "Cities Reached",
    description:
      "Connecting vibrant tech communities across different locations.",
    color: "text-violet-400",
    glow: "hover:border-violet-500/40 hover:shadow-[0_15px_45px_rgba(168,85,247,.25)]",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
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

const Stats = () => {
  return (
    <motion.section
      id="stats"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto my-24 max-w-7xl px-6"
    >
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#171225] via-[#1a1329] to-[#111827] p-8 md:p-12 backdrop-blur-xl">

        {/* Header */}

        <div className="text-center">

          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: .2 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300"
          >
            <TrendingUp className="h-4 w-4" />
            Trusted by Developers
          </motion.div>

          <h2 className="mt-6 text-4xl font-bold text-white">

            Growing the{" "}

            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Developer Community
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400 leading-7">
            DevEvent helps developers discover opportunities,
            attend world-class events and connect with amazing
            tech communities.
          </p>

        </div>

        {/* Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                variants={item}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                }}
                className={`group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-300 ${stat.glow}`}
              >
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.15,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ${stat.color}`}
                >
                  <Icon size={28} />
                </motion.div>

                <h3 className="text-5xl font-extrabold text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-lg font-semibold text-white">
                  {stat.title}
                </p>

                <p className="mt-3 leading-7 text-gray-400">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Stats;