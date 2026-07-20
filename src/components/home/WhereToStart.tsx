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
    iconColor: "text-indigo-600",
    bg: "bg-indigo-50",
    href: "/register",
  },
  {
    level: "Intermediate",
    title: "Some Experience",
    description: "Already know the basics? Sharpen your skills and target your next role.",
    icon: FiTrendingUp,
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/register",
  },
  {
    level: "Advanced",
    title: "Ready to Level Up",
    description: "Experienced professional? Get advanced roadmaps and interview prep.",
    icon: FiAward,
    iconColor: "text-violet-600",
    bg: "bg-violet-50",
    href: "/register",
  },
];

export default function WhereToStart() {
  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header-center"
        >
          <span className="eyebrow mb-3">Getting Started</span>
          <h2 className="heading-section">Not Sure Where to Start?</h2>
          <p className="text-body max-w-md">
            Tell us where you are, and we&apos;ll guide you from there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.level}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  href={path.href}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${path.bg} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className={`h-6 w-6 ${path.iconColor}`} />
                  </div>
                  <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {path.level}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{path.title}</h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500">
                    {path.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
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