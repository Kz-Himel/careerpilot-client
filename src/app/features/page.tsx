// app/features/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMap,
  FiMessageCircle,
  FiFileText,
  FiTarget,
  FiBarChart2,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

const features = [
  {
    icon: FiMap,
    title: "AI Roadmap Generator",
    description:
      "Get a personalized 3-6 month learning roadmap based on your current skills, target role, and available study time. Adjustable, regenerable, and always tailored to you.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FiMessageCircle,
    title: "AI Career Coach Chat",
    description:
      "Chat with an AI coach that remembers your conversation history. Ask about skills, job readiness, resumes, or interviews — with suggested follow-up prompts.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FiTarget,
    title: "Career Goal Tracking",
    description:
      "Set goals with target roles, due dates, and priorities. Track your progress visually and stay accountable to your career growth.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: FiBarChart2,
    title: "Progress Dashboard",
    description:
      "Visualize your journey with charts showing goals completed, skills learned, and roadmap progress over time.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: FiFileText,
    title: "Career Path Explorer",
    description:
      "Browse and filter career paths by category, difficulty, and salary range. Find detailed breakdowns of skills and responsibilities for every role.",
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: FiUsers,
    title: "Community Driven Insights",
    description:
      "See what career goals others are working toward, browse popular career paths, and get inspired by real learner progress.",
    color: "bg-sky-50 text-sky-600",
  },
];

export default function FeaturesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
            >
              Everything You Need
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Powerful Features to Guide Your Career
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base"
            >
              CareerPilot AI combines smart automation with real career guidance to help you go from
              "where am I now" to "where I want to be."
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${feature.color} sm:h-12 sm:w-12`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-gray-900 sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl bg-blue-600 px-6 py-10 text-center sm:py-12"
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Start Your Journey?
            </h2>
            <p className="max-w-md text-sm text-blue-100 sm:text-base">
              Join thousands of learners already using CareerPilot AI to reach their dream careers.
            </p>
            <Link
              href="/register"
              className="mt-2 flex min-h-[46px] items-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
            >
              Get Started Free
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}