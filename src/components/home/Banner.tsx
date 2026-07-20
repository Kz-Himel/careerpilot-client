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
    <section className="hero-gradient relative flex min-h-[620px] h-[72vh] max-h-[820px] w-full items-center overflow-hidden border-b border-gray-100 bg-white py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Layout Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left content block */}
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-2xl">
            <motion.span
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 w-fit"
            >
              <FiTrendingUp className="h-3.5 w-3.5" />
              AI-Powered Career Coaching
            </motion.span>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]"
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
              className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg max-w-md"
            >
              Get personalized roadmaps, skill recommendations, interview preparation, and expert
              guidance — all powered by AI.
            </motion.p>

            {/* Action Buttons Block */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link 
                href="/register" 
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Get Started Free
              </Link>
              <Link 
                href="/explore" 
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
              >
                Explore Careers
              </Link>
            </motion.div>

            {/* Social Trust Metrics */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
              className="mt-10 flex items-center gap-3.5"
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
              <p className="text-xs font-medium text-gray-400">
                Trusted by{" "}
                <span className="font-semibold text-gray-900">10,000+</span> learners worldwide
              </p>
            </motion.div>
          </div>

          {/* Right graphics dashboard container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative hidden h-[450px] w-full items-center justify-center lg:flex"
          >
            {/* Ambient Lighting Blob */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="h-80 w-80 rounded-full bg-gradient-to-br from-indigo-100/70 to-violet-100/50 blur-3xl"
              />
            </div>

            {/* Swappable Interactive Card Grid Node */}
            <motion.div
              onClick={nextCard}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative z-10 flex h-72 w-72 cursor-pointer select-none flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-shadow hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm transition-all duration-300 ${interactiveCards[activeIndex].color}`}
                >
                  {interactiveCards[activeIndex].icon}
                </div>
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                  Interactive Demo
                </span>
              </div>

              <div>
                <motion.h3
                  key={activeIndex}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-base font-bold text-gray-900 sm:text-lg"
                >
                  {interactiveCards[activeIndex].title}
                </motion.h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">
                  {interactiveCards[activeIndex].desc}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-[11px] font-medium text-gray-400">Click to slide next</span>
                <div className="flex gap-1.5">
                  {interactiveCards.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeIndex === i ? "w-5 bg-indigo-600" : "w-1.5 bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Relative Layered Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.4 },
                x: { duration: 0.5, delay: 0.4 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
              }}
              className="absolute left-6 top-6 z-20 w-48 rounded-2xl border border-gray-100 bg-white p-4 shadow-md"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Your Career Roadmap
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">Frontend Developer</p>
              <p className="text-[10px] text-gray-400 mt-0.5">6 Month Plan</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.5 },
                x: { duration: 0.5, delay: 0.5 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              className="absolute bottom-8 right-6 z-20 w-52 rounded-2xl border border-gray-100 bg-white p-4 shadow-md"
            >
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">Next Milestone</p>
              <p className="text-sm font-bold text-gray-800 mt-0.5">Learn React Core</p>
              <p className="text-[10px] text-gray-400">Estimated: 1 week</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator Anchored in Container Boundaries */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 select-none flex-col items-center gap-1.5 sm:flex">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Scroll to Discover
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiChevronDown className="h-4 w-4 text-gray-400" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}