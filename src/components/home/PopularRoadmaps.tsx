"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { FiArrowRight } from "react-icons/fi";
import GoalCard, { GoalCardSkeleton } from "@/components/explore/GoalCard";
import type { Goal } from "@/types/goal";

async function fetchPopularGoals(): Promise<Goal[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/popular`);
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to load popular goals");
  }
  return data.data;
}

export default function PopularRoadmaps() {
  const { data: goals, isLoading, isError } = useQuery({
    queryKey: ["popular-goals"],
    queryFn: fetchPopularGoals,
  });

  return (
    <section className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header flex flex-col items-center text-center gap-4 sm:flex-row sm:justify-between sm:text-left"
        >
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow mb-3">Trending</span>
            <h2 className="heading-section">Explore Popular Career Goals</h2>
            <p className="mt-2 text-body max-w-md">
              See what career goals other learners are working toward.
            </p>
          </div>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
          >
            View All
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {isError && (
          <div className="alert alert-error mb-6">
            <span>Failed to load career goals.</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <GoalCardSkeleton key={i} />)}

          {!isLoading &&
            goals?.map((goal, i) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <GoalCard goal={goal} />
              </motion.div>
            ))}
        </div>

        {!isLoading && goals?.length === 0 && (
          <div className="empty-state">
            <p className="text-sm font-medium text-slate-600">No career goals yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}