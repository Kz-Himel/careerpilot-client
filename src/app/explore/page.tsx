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
    <div className="section">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="section-header items-center mx-auto">
          <span className="eyebrow mb-3 w-fit">Discover</span>
          <h1 className="heading-page">Explore Career Goals</h1>
          <p className="text-body max-w-xl">
            See what career goals other learners are working toward.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="card mb-8 flex flex-col gap-3 p-4 sm:flex-row sm:flex-wrap sm:items-center sm:p-5">
          <div className="relative flex-1 sm:min-w-[240px]">
            <FiSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="Search by title or role..."
              className="form-input-icon"
            />
          </div>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              resetPage();
            }}
            className="form-select sm:w-44"
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
            className="form-input sm:w-48"
          />

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              resetPage();
            }}
            className="form-select sm:w-44"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>
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
