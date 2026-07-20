"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
    <div className="section">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="section-header flex flex-col items-center text-center mx-auto">
          <span className="eyebrow mb-3 w-fit">Discover</span>
          <h1 className="heading-page">Explore Career Goals</h1>
          <p className="text-body max-w-xl">
            See what career goals other learners are working toward.
          </p>
        </div>

        {/* Search + Filters - single line, premium look */}
        <div className="card mb-8 p-3 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-3 lg:flex-nowrap">
            <div className="relative flex-1 lg:min-w-[220px]">
              <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  resetPage();
                }}
                placeholder="Search by title or role..."
                className="form-input-icon w-full border-slate-200 bg-slate-50/60 transition-colors focus:bg-white"
              />
            </div>

            <div className="hidden h-9 w-px bg-slate-200 lg:block" />

            <div className="flex items-center gap-2 text-slate-400 lg:hidden">
              <FiSliders className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Filters</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex lg:flex-1 lg:flex-nowrap lg:gap-3">
              <select
                value={priority}
                onChange={(e) => {
                  setPriority(e.target.value);
                  resetPage();
                }}
                className="form-select border-slate-200 bg-slate-50/60 transition-colors focus:bg-white lg:w-40"
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <input
                type="text"
                value={targetRole}
                onChange={(e) => {
                  setTargetRole(e.target.value);
                  resetPage();
                }}
                placeholder="Filter by role..."
                className="form-input border-slate-200 bg-slate-50/60 transition-colors focus:bg-white lg:w-44"
              />

              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  resetPage();
                }}
                className="form-select border-slate-200 bg-slate-50/60 transition-colors focus:bg-white lg:w-40"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">By Priority</option>
              </select>
            </div>
          </div>
        </div>

        {isError && (
          <div className="alert alert-error mb-6">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{(error as Error).message}</span>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <GoalCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && data?.data.length === 0 && (
          <div className="empty-state">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
              <FiTarget className="h-7 w-7 text-slate-300" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No goals found</p>
            <p className="mt-1 text-xs text-slate-400">Try adjusting your search or filters.</p>
          </div>
        )}

        {!isLoading && data && data.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.data.map((goal) => (
                <GoalCard key={goal._id} goal={goal} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn btn-secondary btn-sm h-10 w-10 rounded-xl p-0 disabled:opacity-40"
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium text-slate-600">
                Page {data.page} of {data.totalPages || 1}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="btn btn-secondary btn-sm h-10 w-10 rounded-xl p-0 disabled:opacity-40"
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}