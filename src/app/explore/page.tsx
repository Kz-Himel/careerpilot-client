// app/explore/page.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiSearch,
  FiTarget,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Explore Career Goals</h1>
        <p className="mt-1 text-sm text-gray-500">
          See what career goals other learners are working toward.
        </p>
      </div>

      {/* Search + Filters + Sort */}
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Search */}
        <div className="relative flex-1 sm:min-w-[220px]">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              resetPage();
            }}
            placeholder="Search by title or role..."
            className="min-h-[44px] w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filter 1: Priority */}
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            resetPage();
          }}
          className="min-h-[44px] rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-40"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Filter 2: Target Role */}
        <input
          type="text"
          value={targetRole}
          onChange={(e) => {
            setTargetRole(e.target.value);
            resetPage();
          }}
          placeholder="Filter by role..."
          className="min-h-[44px] rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-44"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            resetPage();
          }}
          className="min-h-[44px] rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:w-44"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">By Priority</option>
        </select>
      </div>

      {/* Error State */}
      {isError && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <FiTarget className="mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm font-medium text-gray-600">No goals found</p>
          <p className="mt-1 text-xs text-gray-400">Try adjusting your search or filters.</p>
        </div>
      )}

      {/* Cards Grid & Pagination */}
      {!isLoading && data && data.data.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.data.map((goal) => (
              <GoalCard key={goal._id} goal={goal} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 sm:hover:bg-gray-50"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600">
              Page {data.page} of {data.totalPages || 1}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page >= data.totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 sm:hover:bg-gray-50"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}