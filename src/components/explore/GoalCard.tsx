// components/GoalCard.tsx
import Link from "next/link";
import { FiBriefcase, FiDollarSign, FiClock } from "react-icons/fi";
import type { Goal } from "@/types/goal";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
      <div className="mb-3 h-10 w-10 rounded-xl bg-gray-100" />
      <div className="mb-2 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-full rounded bg-gray-200" />
      <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/3 rounded bg-gray-200" />
      <div className="h-9 w-full rounded bg-gray-100" />
    </div>
  );
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      {/* Icon box - matches Popular Roadmaps card style */}
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <FiBriefcase className="h-5 w-5" />
      </div>

      <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
        {goal.title}
      </h3>

      <p className="mb-3 line-clamp-2 text-xs text-gray-500 sm:text-sm">{goal.description}</p>

      {/* Required skills - show up to 3 as tags */}
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

      <div className="mb-4 flex flex-col gap-1.5 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <FiDollarSign className="h-3.5 w-3.5 shrink-0" />
          {goal.salaryRange}
        </span>
        <span className="flex items-center gap-1.5">
          <FiClock className="h-3.5 w-3.5 shrink-0" />
          {goal.estimatedTime}
        </span>
      </div>

      <Link
        href={`/explore/${goal._id}`}
        className="mt-auto min-h-[38px] rounded-lg border border-gray-200 py-2 text-center text-xs font-medium text-gray-700 transition-colors active:bg-gray-50 sm:hover:bg-gray-50"
      >
        View Details
      </Link>
    </div>
  );
}