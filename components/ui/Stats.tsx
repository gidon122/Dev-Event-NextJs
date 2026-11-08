"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Users,
  MapPinned,
  TrendingUp,
} from "lucide-react";
import CountUp from "@/components/ui/Countup";

const stats = [
  {
    icon: CalendarDays,
    end: 120,
    suffix: "+",
    title: "Events Hosted",
    description:
      "Hackathons, conferences, workshops and meetups hosted every year.",
    color: "text-primary",
    glow: "hover:border-primary/40",
  },
  {
    icon: Users,
    end: 5000,
    suffix: "+",
    title: "Developers Connected",
    description:
      "Students, engineers and founders learning and networking together.",
    color: "text-primary",
    glow: "hover:border-primary/40",
  },
  {
    icon: MapPinned,
    end: 30,
    suffix: "+",
    title: "Cities Reached",
    description:
      "Connecting vibrant tech communities across different locations.",
    color: "text-primary",
    glow: "hover:border-primary/40",
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
      <div className="surface-raised relative overflow-hidden p-8 md:p-12">

        {/* Header */}

        <div className="text-center">

          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: .2 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <TrendingUp className="h-4 w-4" />
            Trusted by Developers
          </motion.div>

          <h2 className="mt-6 text-4xl font-bold text-foreground">

            Growing the{" "}

            <span className="text-gradient">
              Developer Community
            </span>

          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
            EventLoop helps developers discover opportunities,
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
                className={`surface group p-7 transition-all duration-300 ${stat.glow}`}
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
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ${stat.color}`}
                >
                  <Icon size={28} />
                </motion.div>

                <h3 className="text-5xl font-extrabold text-foreground tabular-nums">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </h3>

                <p className="mt-3 text-lg font-semibold text-foreground">
                  {stat.title}
                </p>

                <p className="mt-3 leading-7 text-muted-foreground">
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