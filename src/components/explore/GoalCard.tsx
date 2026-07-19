import Link from "next/link";
import { FiBriefcase, FiDollarSign, FiClock, FiArrowRight } from "react-icons/fi";
import type { Goal } from "@/types/goal";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCardSkeleton() {
  return (
    <div className="card card-body">
      <div className="skeleton mb-4 h-11 w-11 rounded-xl" />
      <div className="skeleton mb-2 h-4 w-2/3 rounded-lg" />
      <div className="skeleton mb-2 h-3 w-full rounded-lg" />
      <div className="skeleton mb-2 h-3 w-4/5 rounded-lg" />
      <div className="skeleton mb-5 h-3 w-1/3 rounded-lg" />
      <div className="skeleton h-10 w-full rounded-xl" />
    </div>
  );
}

export default function GoalCard({ goal }: GoalCardProps) {
  return (
    <div className="card card-hover group flex h-full flex-col card-body">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 transition-transform duration-200 group-hover:scale-105">
        <FiBriefcase className="h-5 w-5 text-indigo-600" />
      </div>

      <h3 className="mb-1.5 line-clamp-1 text-base font-semibold text-slate-900 transition-colors group-hover:text-indigo-700">
        {goal.title}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
        {goal.description}
      </p>

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

      <div className="mb-5 flex flex-col gap-1.5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <FiDollarSign className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
          {goal.salaryRange}
        </span>
        <span className="flex items-center gap-1.5">
          <FiClock className="h-3.5 w-3.5 shrink-0 text-violet-500" />
          {goal.estimatedTime}
        </span>
      </div>

      <Link
        href={`/explore/${goal._id}`}
        className="btn btn-secondary btn-sm mt-auto w-full rounded-xl group/btn"
      >
        View Details
        <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
      </Link>
    </div>
  );
}
