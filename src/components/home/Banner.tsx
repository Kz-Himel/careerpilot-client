"use client";

import { motion, useMotionValue, useTransform, Variants } from "framer-motion"; // Variants ইম্পোর্ট করা হয়েছে
import Link from "next/link";
import { useState } from "react";
import { FiTrendingUp, FiChevronDown, FiBookOpen, FiTerminal, FiBriefcase } from "react-icons/fi";

// fadeUp অবজেক্টের টাইপ Variants সেট করা হয়েছে যেন TypeScript লাল দাগ না দেখায়
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

// স্লাইডারের ডাটা
const interactiveCards = [
  { icon: <FiTerminal className="text-white h-6 w-6" />, title: "Fullstack Dev Roadmap", desc: "6-Month customized AI training timeline", color: "bg-blue-600" },
  { icon: <FiBookOpen className="text-white h-6 w-6" />, title: "Nextjs & AI Skills", desc: "High impact node tasks tailored for you", color: "bg-indigo-600" },
  { icon: <FiBriefcase className="text-white h-6 w-6" />, title: "Mock Interview Prep", desc: "Real-time AI behavioral analysis", color: "bg-emerald-600" }
];

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % interactiveCards.length);
  };

  return (
    <section className="relative flex min-h-[550px] h-[65vh] max-h-[750px] w-full items-center overflow-hidden bg-white px-4 sm:px-6 lg:px-8 border-b border-gray-50">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
        
        {/* Left content */}
        <div className="max-w-xl">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
          >
            <FiTrendingUp className="h-3.5 w-3.5" />
            AI-Powered Career Coaching
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-[42px]"
          >
            Your AI Career Coach,{" "}
            <span className="text-blue-600">For a Better Future</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-3 text-sm leading-relaxed text-gray-500 sm:text-base"
          >
            Get personalized roadmaps, skill recommendations, interview preparation, and expert
            guidance — all powered by AI.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className="flex min-h-[46px] items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] sm:hover:bg-blue-700 shadow-sm"
            >
              Get Started Free
            </Link>
            <Link
              href="/explore"
              className="flex min-h-[46px] items-center justify-center rounded-lg border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition-colors active:bg-gray-50 sm:hover:bg-gray-50"
            >
              Explore Careers
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={4}
            className="mt-6 flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {["S", "R", "N"].map((initial, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-semibold text-blue-700"
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 sm:text-sm">
              Trusted by <span className="font-semibold text-gray-800">10,000+</span> learners worldwide
            </p>
          </motion.div>
        </div>

        {/* Right content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative hidden h-[380px] w-full items-center justify-center lg:flex"
        >
          {/* Background Decorative Blob */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="h-72 w-72 rounded-full bg-blue-50/70 blur-xl"
            />
          </div>

          {/* Main Interactive Card Block */}
          <motion.div 
            onClick={nextCard}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative z-10 flex h-64 w-64 cursor-pointer flex-col justify-between rounded-3xl bg-white p-6 shadow-xl border border-gray-100 select-none transition-all"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ${interactiveCards[activeIndex].color} transition-colors duration-300`}>
                {interactiveCards[activeIndex].icon}
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Interactive Demo</span>
            </div>
            
            <div>
              <motion.h3 
                key={activeIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-base font-bold text-gray-900"
              >
                {interactiveCards[activeIndex].title}
              </motion.h3>
              <p className="mt-1 text-xs text-gray-400 leading-normal">
                {interactiveCards[activeIndex].desc}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <span className="text-[11px] text-gray-400 font-medium">Click to slide next</span>
              <div className="flex gap-1.5">
                {interactiveCards.map((_, i) => (
                  <span 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === i ? "w-4 bg-blue-600" : "w-1.5 bg-gray-200"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Left Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.5 },
              x: { duration: 0.5, delay: 0.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute left-6 top-8 z-20 w-44 rounded-xl border border-gray-100 bg-white p-3 shadow-md"
          >
            <p className="text-[10px] text-gray-400">Your Career Roadmap</p>
            <p className="text-xs font-semibold text-gray-900">Frontend Developer</p>
            <p className="text-[10px] text-gray-400">6 Month Plan</p>
          </motion.div>

          {/* Right Floating Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 },
              x: { duration: 0.5, delay: 0.6 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            }}
            className="absolute bottom-10 right-6 z-20 w-48 rounded-xl border border-gray-100 bg-white p-3 shadow-md"
          >
            <p className="mb-1 text-[10px] font-medium text-blue-700">Next Milestone</p>
            <p className="text-xs text-gray-700 font-semibold">Learn React Core</p>
            <p className="text-[10px] text-gray-400">Estimated: 1 week</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll flow */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 sm:flex pointer-events-none select-none">
        <span className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase">Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </div>
    </section>
  );
}