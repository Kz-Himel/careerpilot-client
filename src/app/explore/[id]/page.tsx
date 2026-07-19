// app/explore/[id]/page.tsx
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
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 h-4 w-24 rounded bg-gray-200" />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-24 rounded-2xl bg-gray-100" />
        <div className="h-24 rounded-2xl bg-gray-100" />
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-8">
        <div className="mb-4 h-6 w-2/3 rounded bg-gray-200" />
        <div className="mb-2 h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-2/3 rounded bg-gray-200" />
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
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <button
          onClick={() => router.back()}
          className="mb-6 flex min-h-[40px] items-center gap-1.5 text-sm font-medium text-gray-600 active:text-blue-700 sm:hover:text-blue-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Explore
        </button>
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(error as Error)?.message || "Career guide not found."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Back link */}
      <Link
        href="/explore"
        className="mb-5 flex min-h-[40px] w-fit items-center gap-1.5 text-sm font-medium text-gray-600 active:text-blue-700 sm:mb-6 sm:hover:text-blue-600"
      >
        <FiArrowLeft className="h-4 w-4" />
        Back to Explore
      </Link>

      {/* Stat cards row - Salary + Estimated Time */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
            <FiDollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Approx. Salary Range</p>
            <p className="truncate text-sm font-semibold text-gray-900">{goal.salaryRange}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
            <FiClock className="h-5 w-5 text-purple-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Estimated Time to Learn</p>
            <p className="truncate text-sm font-semibold text-gray-900">{goal.estimatedTime}</p>
          </div>
        </div>
      </div>

      {/* Main content: overview + skills side by side (stacks on mobile) */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1fr_260px]">
        {/* Overview card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
  <div className="flex items-center gap-2">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50">
      <FiBriefcase className="h-4.5 w-4.5 text-blue-600" />
    </div>
    <h1 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
      {goal.title}
    </h1>
  </div>

  <SaveGuideButton goalId={goal._id} />
</div>

          <div className="border-t border-gray-100 pt-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FiFileText className="h-4 w-4 text-blue-600" />
              Overview
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              {goal.description}
            </p>
          </div>
        </div>

        {/* Required Skills card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FiCheckCircle className="h-4 w-4 text-blue-600" />
            Required Skills
          </p>

          {goal.requiredSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {goal.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400">No specific skills listed.</p>
          )}
        </div>
      </div>
    </div>
  );
}