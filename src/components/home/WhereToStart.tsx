// components/home/WhereToStart.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiUser, FiTrendingUp, FiAward, FiArrowRight } from "react-icons/fi";

const paths = [
  {
    level: "Beginner",
    title: "New to Tech",
    description: "Just starting out? Get a step-by-step roadmap built for absolute beginners.",
    icon: FiUser,
    color: "bg-blue-50 text-blue-600",
    href: "/register",
  },
  {
    level: "Intermediate",
    title: "Some Experience",
    description: "Already know the basics? Sharpen your skills and target your next role.",
    icon: FiTrendingUp,
    color: "bg-green-50 text-green-600",
    href: "/register",
  },
  {
    level: "Advanced",
    title: "Ready to Level Up",
    description: "Experienced professional? Get advanced roadmaps and interview prep.",
    icon: FiAward,
    color: "bg-purple-50 text-purple-600",
    href: "/register",
  },
];

export default function WhereToStart() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Not Sure Where to Start?</h2>
          <p className="mt-1 text-sm text-gray-500">
            Tell us where you are, and we'll guide you from there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.level}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={path.href}
                  className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${path.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                    {path.level}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
                    {path.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm text-gray-500">{path.description}</p>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                    Get Started
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}