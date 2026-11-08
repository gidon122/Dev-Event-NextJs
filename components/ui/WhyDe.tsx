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
    color: "text-primary",
    glow: "hover:border-primary/40",
  },
  {
    title: "Grow Your Network",
    description:
      "Meet developers, founders, recruiters and creators while building meaningful relationships within the tech ecosystem.",
    icon: Users,
    color: "text-primary",
    glow: "hover:border-primary/40",
  },
  {
    title: "Level Up Your Skills",
    description:
      "Learn directly from industry experts through workshops, technical talks and hands-on experiences.",
    icon: GraduationCap,
    color: "text-primary",
    glow: "hover:border-primary/40",
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
      className="surface relative overflow-hidden rounded-3xl px-6 py-16 md:px-10"
    >
      <div className="relative mx-auto max-w-6xl">

        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">

          <motion.span
            initial={{ opacity: 0, scale: .8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            Why Developers Love EventLoop
          </motion.span>

          <h2 className="mt-6 text-4xl font-bold text-foreground">

            Everything You Need to{" "}

            <span className="text-gradient">
              Learn, Connect & Build
            </span>

          </h2>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            EventLoop is more than an event directory.
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
                className={`surface group p-8 transition-all duration-300 ${value.glow}`}
              >
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.15,
                  }}
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ${value.color}`}
                >
                  <Icon size={30} />
                </motion.div>

                <h3 className="text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {value.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
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