// components/home/PopularRoadmaps.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiCode, FiDatabase, FiFigma, FiServer } from "react-icons/fi";

const roadmaps = [
  { title: "Frontend Developer", demand: "High Demand", salary: "$80k - $120k", level: "Beginner Friendly", icon: FiCode, color: "bg-blue-50 text-blue-600" },
  { title: "Full Stack Developer", demand: "High Demand", salary: "$90k - $130k", level: "Intermediate", icon: FiServer, color: "bg-green-50 text-green-600" },
  { title: "UI/UX Designer", demand: "High Demand", salary: "$70k - $110k", level: "Beginner Friendly", icon: FiFigma, color: "bg-purple-50 text-purple-600" },
  { title: "Data Analyst", demand: "High Demand", salary: "$70k - $100k", level: "Beginner Friendly", icon: FiDatabase, color: "bg-amber-50 text-amber-600" },
];

export default function PopularRoadmaps() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Explore Popular Career Paths
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Discover career paths and start your journey today.
            </p>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-blue-600 hover:underline">
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roadmaps.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base">
                  {item.title}
                </h3>
                <span className="mb-2 w-fit rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600">
                  {item.demand}
                </span>
                <p className="mb-1 text-xs text-gray-500 sm:text-sm">{item.salary}</p>
                <p className="mb-4 text-xs text-gray-400">{item.level}</p>
                <Link
                  href="/explore"
                  className="mt-auto min-h-[38px] rounded-lg border border-gray-200 py-2 text-center text-xs font-medium text-gray-700 transition-colors active:bg-gray-50 sm:hover:bg-gray-50"
                >
                  View Details
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}