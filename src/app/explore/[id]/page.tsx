"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiAlertCircle,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";
import type { Goal } from "@/types/goal";
import SaveGuideButton from "@/components/goals/SavedGuideButton";

interface GoalResponse {
  success: boolean;
  message: string;
  data: Goal;
}

async function fetchGoalById(id: string): Promise<Goal> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`);
  const data: GoalResponse & { message?: string } = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to load career guide");
  }
  return data.data;
}

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="skeleton mb-6 h-4 w-28 rounded-lg" />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </div>
      <div className="card card-body">
        <div className="skeleton mb-4 h-7 w-2/3 rounded-lg" />
        <div className="skeleton mb-2 h-3 w-full rounded-lg" />
        <div className="skeleton h-3 w-2/3 rounded-lg" />
      </div>
    </div>
  );
}

export default function GoalDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: goal, isLoading, isError, error } = useQuery({
    queryKey: ["goal-details", id],
    queryFn: () => fetchGoalById(id),
    enabled: !!id,
  });

  if (isLoading) return <DetailsSkeleton />;

  if (isError || !goal) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="btn btn-ghost btn-sm mb-6 gap-1.5 rounded-xl pl-0"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>
        <div className="alert alert-error">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(error as Error)?.message || "Career guide not found."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Link
        href="/explore"
        className="btn btn-ghost btn-sm mb-6 gap-1.5 rounded-xl pl-0 text-slate-600 hover:text-indigo-600"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card card-hover flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <FiDollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">Approx. Salary Range</p>
            <p className="truncate text-sm font-semibold text-slate-900">{goal.salaryRange}</p>
          </div>
        </div>

        <div className="card card-hover flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50">
            <FiClock className="h-5 w-5 text-violet-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">Estimated Time to Learn</p>
            <p className="truncate text-sm font-semibold text-slate-900">{goal.estimatedTime}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
        {/* Overview */}
        <div className="card card-body">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                <FiBriefcase className="h-5 w-5 text-indigo-600" />
              </div>
              <h1 className="heading-page text-xl sm:text-2xl">{goal.title}</h1>
            </div>
            <SaveGuideButton goalId={goal._id} />
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FiFileText className="h-4 w-4 text-indigo-600" />
              Overview
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {goal.description}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="card card-body h-fit mb-10">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FiCheckCircle className="h-4 w-4 text-indigo-600" />
            Required Skills
          </p>

          {goal.requiredSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {goal.requiredSkills.map((skill) => (
                <span key={skill} className="badge badge-primary px-3 py-1.5">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400">No specific skills listed.</p>
          )}
        </div>
      </div>
    </div>
  );
}