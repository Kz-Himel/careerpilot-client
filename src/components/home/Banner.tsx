// components/home/Banner.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiTrendingUp } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
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
            className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base"
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
              className="flex min-h-[46px] items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors active:bg-blue-700 sm:hover:bg-blue-700"
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

        {/* Right illustration + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="relative flex h-[280px] items-center justify-center sm:h-[360px] lg:h-[420px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-56 w-56 rounded-full bg-blue-50 sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            />
          </div>

          <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-3xl bg-blue-600 shadow-lg sm:h-52 sm:w-52 lg:h-60 lg:w-60">
            <span className="text-4xl">💻</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.5 },
              x: { duration: 0.5, delay: 0.5 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            className="absolute left-2 top-4 z-20 w-36 rounded-xl border border-gray-100 bg-white p-3 shadow-md sm:left-4 sm:top-6 sm:w-44"
          >
            <p className="text-[10px] text-gray-400 sm:text-xs">Your Career Roadmap</p>
            <p className="text-xs font-semibold text-gray-900 sm:text-sm">Frontend Developer</p>
            <p className="text-[10px] text-gray-400 sm:text-xs">6 Month Plan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
            transition={{
              opacity: { duration: 0.5, delay: 0.6 },
              x: { duration: 0.5, delay: 0.6 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            }}
            className="absolute bottom-4 right-2 z-20 w-40 rounded-xl border border-gray-100 bg-white p-3 shadow-md sm:bottom-8 sm:right-4 sm:w-48"
          >
            <p className="mb-1 text-[10px] font-medium text-blue-700 sm:text-xs">Next Milestone</p>
            <p className="text-xs text-gray-700 sm:text-sm">Learn React</p>
            <p className="text-[10px] text-gray-400 sm:text-xs">Estimated: 1 week</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}