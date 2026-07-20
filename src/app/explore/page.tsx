"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiTarget,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiSliders,
} from "react-icons/fi";
import type { Goal } from "@/types/goal";
import GoalCard, { GoalCardSkeleton } from "@/components/explore/GoalCard";

interface GoalsResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: Goal[];
}

async function fetchExploreGoals(params: {
  search: string;
  priority: string;
  targetRole: string;
  sort: string;
  page: number;
}): Promise<GoalsResponse> {
  const query = new URLSearchParams({
    search: params.search,
    priority: params.priority,
    targetRole: params.targetRole,
    sort: params.sort,
    page: String(params.page),
    limit: "8",
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals?${query}`);
  const data = await res.json();

  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load goals");
  return data;
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["explore-goals", search, priority, targetRole, sort, page],
    queryFn: () => fetchExploreGoals({ search, priority, targetRole, sort, page }),
  });

  const resetPage = () => setPage(1);

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-block rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
          >
            Discover
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 sm:text-4xl"
          >
            Explore Career Goals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base"
          >
            See what career goals other learners are working toward and build your own momentum.
          </motion.p>
        </div>

        {/* Search + Filters Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm mb-8 sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:flex-nowrap">
            {/* Search Input Container */}
            <div className="relative flex-1 lg:min-w-[280px]">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search by title or role..."
                className="w-full rounded-xl border border-gray-100 bg-gray-50/60 py-2.5 pl-11 pr-4 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
              />
            </div>

            {/* Divider Line (Desktop only) */}
            <div className="hidden h-8 w-px bg-gray-100 lg:block" />

            {/* Mobile Filters Label */}
            <div className="flex items-center gap-2 text-gray-400 lg:hidden">
              <FiSliders className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Filters</span>
            </div>

            {/* Interactive Selectors Dropdowns */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:flex-nowrap lg:gap-4">
              <select
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  resetPage();
                }}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-2.5 text-sm text-gray-700 transition-all focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 lg:w-44"
              >
                <option value="">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>

              <div className="relative flex-1">
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => {
                    setTargetRole(e.target.value);
                    resetPage();
                  }}
                  placeholder="Filter by role..."
                  className="w-full rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-2.5 text-sm text-gray-700 transition-all placeholder:text-gray-400 focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5"
                />
              </div>

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  resetPage();
                }}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-2.5 text-sm text-gray-700 transition-all focus:border-blue-500/30 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 lg:w-44"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">By Priority</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Error Handling State */}
        {isError && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 mb-8"
          >
            <FiAlertCircle className="h-5 w-5 shrink-0" />
            <span>{(error as Error).message}</span>
          </motion.div>
        )}

        {/* Loading Skeleton States Grid */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <GoalCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Main Content Layout Block */}
        <AnimatePresence mode="wait">
          {!isLoading && data?.data.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 px-4 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                <FiTarget className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900 sm:text-lg">No goals found</h3>
              <p className="mt-1 max-w-xs text-sm text-gray-400">
                We couldn't find matches. Try modifying your key search terms or filters.
              </p>
            </motion.div>
          )}

          {!isLoading && data && data.data.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Product Cards Responsive Auto Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.data.map((goal, i) => (
                  <motion.div
                    key={goal._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="h-full transition-shadow duration-300"
                  >
                    <GoalCard goal={goal} />
                  </motion.div>
                ))}
              </div>

              {/* Navigation Dynamic Pagination Controls */}
              <div className="mt-12 flex items-center justify-center gap-5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold text-gray-600">
                  Page {data.page} of {data.totalPages || 1}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                  disabled={page >= data.totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}