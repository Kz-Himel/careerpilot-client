"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiCode,
  FiServer,
  FiPieChart,
  FiShield,
  FiSmartphone,
  FiCloud,
} from "react-icons/fi";

const categories = [
  { title: "Frontend", count: "45+ Roles", icon: FiCode, iconColor: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "Backend", count: "38+ Roles", icon: FiServer, iconColor: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Data & Analytics", count: "29+ Roles", icon: FiPieChart, iconColor: "text-violet-600", bg: "bg-violet-50" },
  { title: "Cybersecurity", count: "22+ Roles", icon: FiShield, iconColor: "text-rose-600", bg: "bg-rose-50" },
  { title: "Mobile Development", count: "18+ Roles", icon: FiSmartphone, iconColor: "text-amber-600", bg: "bg-amber-50" },
  { title: "Cloud & DevOps", count: "25+ Roles", icon: FiCloud, iconColor: "text-sky-600", bg: "bg-sky-50" },
];

export default function PopularCategories() {
  return (
    <section className="section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header-center"
        >
          <span className="eyebrow mb-3">Categories</span>
          <h2 className="heading-section">Browse by Category</h2>
          <p className="text-body max-w-md">
            Find your ideal career path across every domain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Link
                  href={`/explore?category=${encodeURIComponent(cat.title)}`}
                  className="card card-hover group flex items-center gap-4 p-5"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.bg} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <Icon className={`h-5 w-5 ${cat.iconColor}`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-700 sm:text-base">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400">{cat.count}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}