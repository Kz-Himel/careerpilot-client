// components/home/PopularCategories.tsx
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
  { title: "Frontend", count: "45+ Roles", icon: FiCode, color: "bg-blue-50 text-blue-600" },
  { title: "Backend", count: "38+ Roles", icon: FiServer, color: "bg-green-50 text-green-600" },
  { title: "Data & Analytics", count: "29+ Roles", icon: FiPieChart, color: "bg-purple-50 text-purple-600" },
  { title: "Cybersecurity", count: "22+ Roles", icon: FiShield, color: "bg-red-50 text-red-600" },
  { title: "Mobile Development", count: "18+ Roles", icon: FiSmartphone, color: "bg-amber-50 text-amber-600" },
  { title: "Cloud & DevOps", count: "25+ Roles", icon: FiCloud, color: "bg-sky-50 text-sky-600" },
];

export default function PopularCategories() {
  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Browse by Category</h2>
          <p className="mt-1 text-sm text-gray-500">
            Find your ideal career path across every domain.
          </p>
        </motion.div>

        {/* এখানে গ্রিড কলামের অর্ডার ঠিক করা হয়েছে */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/explore?category=${encodeURIComponent(cat.title)}`}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${cat.color} sm:h-12 sm:w-12`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-400">{cat.count}</p>
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