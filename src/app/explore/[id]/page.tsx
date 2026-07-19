// app/explore/[id]/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiTarget,
  FiCalendar,
  FiFlag,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";
import type { Goal } from "@/types/goal";

interface GoalResponse {
  success: boolean;
  message: string;
  data: Goal;
}

async function fetchGoalById(id: string): Promise<Goal> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`);
  const data: GoalResponse & { message?: string } = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to load goal details");
  }
  return data.data;
}

const priorityStyles: Record<string, { badge: string; ring: string }> = {
  high: { badge: "bg-red-50 text-red-600", ring: "text-red-500" },
  medium: { badge: "bg-amber-50 text-amber-600", ring: "text-amber-500" },
  low: { badge: "bg-gray-100 text-gray-600", ring: "text-gray-500" },
};

function DetailsSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 h-4 w-24 rounded bg-gray-200" />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="h-24 rounded-2xl bg-gray-100" />
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
          <span>{(error as Error)?.message || "Goal not found."}</span>
        </div>
      </div>
    );
  }

  const progress = (goal as any).currentProgress ?? 0;
  const priorityStyle = priorityStyles[goal.priority] ?? priorityStyles.low;

  // circular ring math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

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

      {/* Stat cards row - matches dashboard stat card style (icon box + label + value) */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-3 sm:gap-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <FiTarget className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Target Role</p>
            <p className="truncate text-sm font-semibold text-gray-900">{goal.targetRole}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
            <FiFlag className="h-5 w-5 text-amber-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Priority</p>
            <p className="truncate text-sm font-semibold capitalize text-gray-900">{goal.priority}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50">
            <FiCalendar className="h-5 w-5 text-purple-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Due Date</p>
            <p className="truncate text-sm font-semibold text-gray-900">
              {new Date(goal.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main content: overview card + progress ring card side by side (stacks on mobile) */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1fr_260px]">
        {/* Overview card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4">
            <span
              className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${priorityStyle.badge}`}
            >
              {goal.priority} priority
            </span>
            <h1 className="text-xl font-bold leading-snug text-gray-900 sm:text-2xl">
              {goal.title}
            </h1>
          </div>

          <div className="mb-5 border-t border-gray-100 pt-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FiFileText className="h-4 w-4 text-blue-600" />
              Overview
            </h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600 sm:text-[15px]">
              {goal.description}
            </p>
          </div>
        </div>

        {/* Progress ring card - mirrors "Roadmap Progress" panel style */}
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <p className="mb-4 self-start text-sm font-semibold text-gray-900">Goal Progress</p>

          <div className="relative flex h-32 w-32 items-center justify-center">
            <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#2563eb"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <span className="absolute text-xl font-bold text-gray-900">{progress}%</span>
          </div>

          <p className="mt-3 text-center text-xs text-gray-400">
            {progress >= 100
              ? "Goal completed!"
              : progress >= 50
              ? "Great progress, keep going."
              : "Just getting started."}
          </p>
        </div>
      </div>
    </div>
  );
}