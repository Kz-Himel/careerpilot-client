// app/dashboard/manage-goals/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  FiPlus,
  FiEye,
  FiEdit2,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import type { Goal } from "@/types/goal";
import EditGoalForm from "@/components/goals/EditGoalForm";
import DeleteGoalDialog from "@/components/goals/DeleteGoalDialog";

async function fetchGoals(): Promise<Goal[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load career guides");
  return data.data;
}

function GoalCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
      <div className="mb-3 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-full rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-200" />
      <div className="h-8 w-full rounded bg-gray-100" />
    </div>
  );
}

export default function ManageGoalsPage() {
  const [editTarget, setEditTarget] = useState<Goal | null>(null);

  const {
    data: goals,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">My Career Guides</h1>
          <p className="mt-1 text-sm text-gray-500">Manage the career guides you've posted.</p>
        </div>
        <Link
          href="/dashboard/add-goal"
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors active:bg-blue-700 sm:hover:bg-blue-700"
        >
          <FiPlus className="h-4 w-4" />
          Add Guide
        </Link>
      </div>

      {isError && (
        <div className="mb-5 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      {/* Loading skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && goals?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <FiBriefcase className="mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm font-medium text-gray-600">No career guides yet</p>
          <p className="mt-1 text-xs text-gray-400">Post your first career guide to get started.</p>
          <Link
            href="/dashboard/add-goal"
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add Guide
          </Link>
        </div>
      )}

      {/* Guides grid */}
      {!isLoading && goals && goals.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                <FiBriefcase className="h-4.5 w-4.5 text-blue-600" />
              </div>

              <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
                {goal.title}
              </h3>

              <p className="mb-3 line-clamp-2 text-xs text-gray-500 sm:text-sm">
                {goal.description}
              </p>

              {goal.requiredSkills?.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1">
                  {goal.requiredSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                  {goal.requiredSkills.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                      +{goal.requiredSkills.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <FiDollarSign className="h-3.5 w-3.5" />
                  {goal.salaryRange}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="h-3.5 w-3.5" />
                  {goal.estimatedTime}
                </span>
              </div>

              {/* Action buttons - View / Edit / Delete */}
              <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-3">
                <Link
                  href={`/explore/${goal._id}`}
                  className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 active:bg-gray-50 sm:hover:bg-gray-50"
                >
                  <FiEye className="h-3.5 w-3.5" />
                  View
                </Link>
                <button
                  onClick={() => setEditTarget(goal)}
                  className="flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-100 text-xs font-medium text-blue-600 active:bg-blue-50 sm:hover:bg-blue-50"
                >
                  <FiEdit2 className="h-3.5 w-3.5" />
                  Edit
                </button>

                <DeleteGoalDialog goalId={goal._id} goalTitle={goal.title} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg">
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-white sm:text-lg">Edit Career Guide</h3>
              <button
                onClick={() => setEditTarget(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-white/80 hover:bg-white/10"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
            <EditGoalForm
              goal={editTarget}
              onSuccess={() => setEditTarget(null)}
              onCancel={() => setEditTarget(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}