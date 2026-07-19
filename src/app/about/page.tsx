// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { FiTarget, FiUsers, FiTrendingUp, FiHeart } from "react-icons/fi";

const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Career Paths", value: "250+" },
  { label: "AI Sessions", value: "50K+" },
  { label: "Happy Users", value: "95%" },
];

const values = [
  {
    icon: FiTarget,
    title: "Personalized Guidance",
    description: "Every roadmap and recommendation is tailored to your unique skills and goals.",
  },
  {
    icon: FiUsers,
    title: "Accessible to Everyone",
    description: "Quality career guidance shouldn't be a privilege — we make it available to all.",
  },
  {
    icon: FiTrendingUp,
    title: "Continuous Growth",
    description: "We believe in progress over perfection, one milestone at a time.",
  },
  {
    icon: FiHeart,
    title: "Genuine Care",
    description: "Behind every AI response is a design built to actually help, not just impress.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            About CareerPilot AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base"
          >
            We're on a mission to make quality career guidance accessible to everyone through the
            power of AI.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:grid-cols-4 sm:p-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-blue-600 sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Mission */}
      <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Our Mission</h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-500 sm:text-base">
              Career growth shouldn't depend on expensive coaching or who you know. We built
              CareerPilot AI to give everyone — students, career switchers, and professionals — a
              personal AI coach available anytime.
            </p>
            <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
              From generating step-by-step learning roadmaps to answering late-night "am I ready for
              this job?" questions, we want to be the guide people actually needed but never had.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <div className="flex h-56 w-56 items-center justify-center rounded-3xl bg-blue-50 sm:h-64 sm:w-64">
              <span className="text-6xl">🎯</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-10 sm:text-3xl"
          >
            What We Value
          </motion.h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-gray-900 sm:text-base">
                    {value.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}