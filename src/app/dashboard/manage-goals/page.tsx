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
    <div className="card card-body">
      <div className="skeleton mb-4 h-9 w-9 rounded-xl" />
      <div className="skeleton mb-2 h-4 w-2/3 rounded-lg" />
      <div className="skeleton mb-4 h-3 w-full rounded-lg" />
      <div className="skeleton h-9 w-full rounded-xl" />
    </div>
  );
}

export default function ManageGoalsPage() {
  const [editTarget, setEditTarget] = useState<Goal | null>(null);

  const { data: goals, isLoading, isError, error } = useQuery({
    queryKey: ["goals"],
    queryFn: fetchGoals,
  });

  return (
    <div className="mx-auto max-w-5xl px-10 sm:px-5">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="heading-page">My Career Guides</h1>
          <p className="mt-1.5 text-body">Manage the career guides you&apos;ve posted.</p>
        </div>
        <Link href="/dashboard/add-goal" className="btn btn-primary btn-md rounded-xl">
          <FiPlus className="h-4 w-4" />
          Add Guide
        </Link>
      </div>

      {isError && (
        <div className="alert alert-error mb-6">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(error as Error).message}</span>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && goals?.length === 0 && (
        <div className="empty-state">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FiBriefcase className="h-7 w-7 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No career guides yet</p>
          <p className="mt-1 text-xs text-slate-400">Post your first career guide to get started.</p>
          <Link href="/dashboard/add-goal" className="btn btn-primary btn-md mt-5 rounded-xl">
            Add Guide
          </Link>
        </div>
      )}

      {!isLoading && goals && goals.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {goals.map((goal) => (
            <div key={goal._id} className="card card-hover flex flex-col card-body">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                <FiBriefcase className="h-5 w-5 text-indigo-600" />
              </div>

              <h3 className="mb-1 line-clamp-1 text-base font-semibold text-slate-900">
                {goal.title}
              </h3>

              <p className="mb-4 line-clamp-2 text-sm text-slate-500">{goal.description}</p>

              {goal.requiredSkills?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {goal.requiredSkills.slice(0, 3).map((skill) => (
                    <span key={skill} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                  {goal.requiredSkills.length > 3 && (
                    <span className="badge badge-muted">+{goal.requiredSkills.length - 3}</span>
                  )}
                </div>
              )}

              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <FiDollarSign className="h-3.5 w-3.5 text-emerald-500" />
                  {goal.salaryRange}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="h-3.5 w-3.5 text-violet-500" />
                  {goal.estimatedTime}
                </span>
              </div>

              <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4">
                <Link
                  href={`/explore/${goal._id}`}
                  className="btn btn-secondary btn-sm flex-1 rounded-xl"
                >
                  <FiEye className="h-3.5 w-3.5" />
                  View
                </Link>
                <button
                  onClick={() => setEditTarget(goal)}
                  className="btn btn-sm flex-1 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
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

      {editTarget && (
        <div className="modal-overlay">
          <div className="w-full max-w-lg">
            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-base font-bold text-white sm:text-lg">Edit Career Guide</h3>
              <button
                onClick={() => setEditTarget(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition-colors hover:bg-white/10"
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
