// components/GoalCard.tsx
import Link from "next/link";
import { FiTarget, FiCalendar, FiFlag } from "react-icons/fi";
import type { Goal } from "@/types/goal";

interface GoalCardProps {
  goal: Goal;
}

const priorityConfig: Record<string, { badge: string; icon: string }> = {
  high: { badge: "bg-red-50 text-red-600", icon: "bg-red-50 text-red-600" },
  medium: { badge: "bg-amber-50 text-amber-600", icon: "bg-amber-50 text-amber-600" },
  low: { badge: "bg-gray-100 text-gray-600", icon: "bg-gray-100 text-gray-600" },
};

export function GoalCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
      <div className="mb-3 h-10 w-10 rounded-xl bg-gray-100" />
      <div className="mb-2 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/3 rounded bg-gray-200" />
      <div className="h-9 w-full rounded bg-gray-100" />
    </div>
  );
}

export default function GoalCard({ goal }: GoalCardProps) {
  const config = priorityConfig[goal.priority] ?? priorityConfig.low;

  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
      {/* Icon box - matches Popular Roadmaps card style */}
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${config.icon}`}>
        <FiFlag className="h-5 w-5" />
      </div>

      <h3 className="mb-1 line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base">
        {goal.title}
      </h3>

      <span className={`mb-2 w-fit rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${config.badge}`}>
        {goal.priority} priority
      </span>

      <p className="mb-1 line-clamp-1 text-xs text-gray-500 sm:text-sm">{goal.targetRole}</p>

      <p className="mb-4 flex items-center gap-1 text-xs text-gray-400">
        <FiCalendar className="h-3.5 w-3.5 shrink-0" />
        {new Date(goal.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <Link
        href={`/explore/${goal._id}`}
        className="mt-auto min-h-[38px] rounded-lg border border-gray-200 py-2 text-center text-xs font-medium text-gray-700 transition-colors active:bg-gray-50 sm:hover:bg-gray-50"
      >
        View Details
      </Link>
    </div>
  );
}