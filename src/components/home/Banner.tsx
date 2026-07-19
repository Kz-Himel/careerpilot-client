"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  FiTrendingUp,
  FiChevronDown,
  FiBookOpen,
  FiTerminal,
  FiBriefcase,
} from "react-icons/fi";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const interactiveCards = [
  {
    icon: <FiTerminal className="h-6 w-6 text-white" />,
    title: "Fullstack Dev Roadmap",
    desc: "6-Month customized AI training timeline",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: <FiBookOpen className="h-6 w-6 text-white" />,
    title: "Nextjs & AI Skills",
    desc: "High impact node tasks tailored for you",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: <FiBriefcase className="h-6 w-6 text-white" />,
    title: "Mock Interview Prep",
    desc: "Real-time AI behavioral analysis",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % interactiveCards.length);
  };

  return (
    <section className="hero-gradient relative flex min-h-[580px] h-[68vh] max-h-[780px] w-full items-center overflow-hidden border-b border-slate-200/60 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left content */}
        <div className="max-w-xl">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="eyebrow mb-5"
          >
            <FiTrendingUp className="h-3.5 w-3.5" />
            AI-Powered Career Coaching
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="heading-display leading-[1.1]"
          >
            Your AI Career Coach,{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              For a Better Future
            </span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-4 text-body max-w-md"
          >
            Get personalized roadmaps, skill recommendations, interview preparation, and expert
            guidance — all powered by AI.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/register" className="btn btn-primary btn-lg rounded-xl shadow-md">
              Get Started Free
            </Link>
            <Link href="/explore" className="btn btn-secondary btn-lg rounded-xl">
              Explore Careers
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-8 flex items-center gap-3"
          >
            <div className="flex -space-x-2.5">
              {["S", "R", "N"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-indigo-100 to-violet-100 text-xs font-bold text-indigo-700 shadow-sm"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-caption">
              Trusted by{" "}
              <span className="font-semibold text-slate-800">10,000+</span> learners worldwide
            </p>
          </motion.div>
        </div>

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative hidden h-[400px] w-full items-center justify-center lg:flex"
        >
          {/* Background blob */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="h-80 w-80 rounded-full bg-gradient-to-br from-indigo-100/80 to-violet-100/60 blur-3xl"
            />
          </div>

          {/* Main interactive card */}
          <motion.div
            onClick={nextCard}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="card relative z-10 flex h-72 w-72 cursor-pointer select-none flex-col justify-between p-6 shadow-xl transition-shadow hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md transition-all duration-300 ${interactiveCards[activeIndex].color}`}
              >
                {interactiveCards[activeIndex].icon}
              </div>
              <span className="badge badge-primary">Interactive Demo</span>
            </div>

            <div>
              <motion.h3
                key={activeIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="heading-card"
              >
                {interactiveCards[activeIndex].title}
              </motion.h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                {interactiveCards[activeIndex].desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[11px] font-medium text-slate-400">Click to slide next</span>
              <div className="flex gap-1.5">
                {interactiveCards.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i ? "w-5 bg-indigo-600" : "w-1.5 bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.5 },
              x: { duration: 0.5, delay: 0.5 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="card absolute left-4 top-6 z-20 w-48 p-4 shadow-lg"
          >
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Your Career Roadmap
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">Frontend Developer</p>
            <p className="text-[10px] text-slate-400">6 Month Plan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 },
              x: { duration: 0.5, delay: 0.6 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            }}
            className="card absolute bottom-8 right-4 z-20 w-52 p-4 shadow-lg"
          >
            <p className="mb-1 text-[10px] font-semibold text-indigo-600">Next Milestone</p>
            <p className="text-sm font-semibold text-slate-800">Learn React Core</p>
            <p className="text-[10px] text-slate-400">Estimated: 1 week</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 select-none flex-col items-center gap-1.5 sm:flex">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Scroll to Discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown className="h-4 w-4 text-slate-400" />
        </motion.div>
      </div>
    </section>
  );
}
