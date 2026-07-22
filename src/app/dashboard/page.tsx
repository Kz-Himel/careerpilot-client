"use client";

import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiTarget, FiMap, FiMessageCircle, FiAward, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

interface DashboardStats {
  totalGuides: number;
  roadmapsGenerated: number;
  aiConversations: number;
  skillsLearned: number;
}

interface ProgressPoint {
  month: string;
  progress: number;
}

async function fetchStats(): Promise<DashboardStats> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load stats");
  return data.data;
}

async function fetchProgressOverview(): Promise<ProgressPoint[]> {
  const tokenRes = await authClient.token?.();
  const token = tokenRes?.data?.token;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/progress-overview`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.message || "Failed to load progress");
  return data.data;
}

const statCards = [
  { key: "totalGuides" as const, label: "Total Goals", icon: FiTarget, bg: "bg-indigo-50", color: "text-indigo-600" },
  { key: "roadmapsGenerated" as const, label: "Roadmaps Generated", icon: FiMap, bg: "bg-emerald-50", color: "text-emerald-600" },
  { key: "aiConversations" as const, label: "AI Conversations", icon: FiMessageCircle, bg: "bg-violet-50", color: "text-violet-600" },
  { key: "skillsLearned" as const, label: "Skills Learned", icon: FiAward, bg: "bg-amber-50", color: "text-amber-600" },
];

function StatCardSkeleton() {
  return (
    <div className="card card-body">
      <div className="skeleton mb-4 h-10 w-10 rounded-xl" />
      <div className="skeleton mb-2 h-3 w-1/2 rounded-lg" />
      <div className="skeleton h-6 w-1/3 rounded-lg" />
    </div>
  );
}

export default function DashboardPage() {
  // User profile / session data fetch
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "there";

  const { data: stats, isLoading: statsLoading, isError: statsError, error: statsErrorObj } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["dashboard-progress"],
    queryFn: fetchProgressOverview,
  });

  return (
    <div className="mx-auto max-w-6xl p-10 sm:p-5">
      <div className="mb-6 sm:mb-8">
        <h1 className="heading-page">Welcome back, {userName}! 👋</h1>
        <p className="mt-1.5 text-body">Let&apos;s continue your journey toward your dream career.</p>
      </div>

      {statsError && (
        <div className="alert alert-error mb-6">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(statsErrorObj as Error).message}</span>
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsLoading &&
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}

        {!statsLoading &&
          stats &&
          statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.key} className="card card-hover card-body">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <p className="text-xs font-medium text-slate-400">{card.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {stats[card.key]}
                </p>
              </div>
            );
          })}
      </div>

      <div className="card card-body">
        <h2 className="heading-card mb-5">Your Progress Overview</h2>

        {progressLoading && (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
              <p className="text-sm text-slate-400">Loading chart...</p>
            </div>
          </div>
        )}

        {!progressLoading && (!progressData || progressData.length === 0) && (
          <div className="empty-state py-12">
            <p className="text-sm font-semibold text-slate-600">No progress data yet</p>
            <p className="mt-1 text-xs text-slate-400">Add goals and track progress to see your chart.</p>
          </div>
        )}

        {!progressLoading && progressData && progressData.length > 0 && (
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                    boxShadow: "0 4px 6px -1px rgb(15 23 42 / 0.07)",
                  }}
                  formatter={(value) => [`${Number(value ?? 0)}%`, "Progress"]}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}