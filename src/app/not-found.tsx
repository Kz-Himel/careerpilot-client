// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiSearch, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] items-center justify-center px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40"
        >
          <div className="absolute inset-0 rounded-full bg-blue-50" />
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative text-5xl sm:text-6xl"
          >
            🧭
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl font-bold text-blue-600 sm:text-7xl"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-xl font-bold text-gray-900 sm:text-2xl"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base"
        >
          Looks like this path isn't part of your career roadmap. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/"
            className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition-colors active:bg-blue-700 sm:hover:bg-blue-700"
          >
            <FiHome className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/explore"
            className="flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 text-sm font-semibold text-gray-700 transition-colors active:bg-gray-50 sm:hover:bg-gray-50"
          >
            <FiSearch className="h-4 w-4" />
            Explore Careers
          </Link>
        </motion.div>
      </div>
    </div>
  );
}