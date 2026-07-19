// components/home/PopularRoadmaps.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
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
              Explore Popular Career Goals
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              See what career goals other learners are working toward.
            </p>
          </div>
          <Link href="/explore" className="text-sm font-semibold text-blue-600 hover:underline">
            View All →
          </Link>
        </motion.div>

        {isError && (
          <p className="text-center text-sm text-red-500">Failed to load career goals.</p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => <GoalCardSkeleton key={i} />)}

          {!isLoading &&
            goals?.map((goal, i) => (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <GoalCard goal={goal} />
              </motion.div>
            ))}
        </div>

        {!isLoading && goals?.length === 0 && (
          <p className="text-center text-sm text-gray-400">No career goals yet.</p>
        )}
      </div>
    </section>
  );
}