// components/GoalCard.tsx
import Link from "next/link";
import { FiTarget, FiCalendar } from "react-icons/fi";
import type { Goal } from "@/types/goal";

interface GoalCardProps {
  goal: Goal;
}

const priorityStyles: Record<string, string> = {
  high: "bg-red-50 text-red-600",
  medium: "bg-amber-50 text-amber-600",
  low: "bg-gray-100 text-gray-600",
};

export function GoalCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4">
      <div className="mb-3 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mb-2 h-3 w-full rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-200" />
      <div className="h-8 w-full rounded bg-gray-100" />
    </div>
  );
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
          {goal.title}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${priorityStyles[goal.priority] || "bg-gray-100 text-gray-600"
            }`}
        >
          {goal.priority}
        </span>
      </div>

      <p className="mb-3 line-clamp-2 text-xs text-gray-500">{goal.description}</p>

      <div className="mb-4 flex flex-col gap-1.5 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <FiTarget className="h-3.5 w-3.5 shrink-0" />
          {goal.targetRole}
        </span>
        <span className="flex items-center gap-1.5">
          <FiCalendar className="h-3.5 w-3.5 shrink-0" />
          {new Date(goal.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      <Link
        href={`/explore/${goal._id}`}
        className="mt-auto flex min-h-[38px] w-full items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white transition-colors active:bg-blue-700 sm:hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}