// app/dashboard/page.tsx
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
  totalGoals: number;
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
  { key: "totalGoals" as const, label: "Total Goals", icon: FiTarget, bg: "bg-blue-50", color: "text-blue-600" },
  { key: "roadmapsGenerated" as const, label: "Roadmaps Generated", icon: FiMap, bg: "bg-green-50", color: "text-green-600" },
  { key: "aiConversations" as const, label: "AI Conversations", icon: FiMessageCircle, bg: "bg-purple-50", color: "text-purple-600" },
  { key: "skillsLearned" as const, label: "Skills Learned", icon: FiAward, bg: "bg-amber-50", color: "text-amber-600" },
];

function StatCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
      <div className="mb-3 h-9 w-9 rounded-xl bg-gray-100" />
      <div className="mb-2 h-3 w-1/2 rounded bg-gray-200" />
      <div className="h-5 w-1/3 rounded bg-gray-200" />
    </div>
  );
}

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading, isError: statsError, error: statsErrorObj } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats,
  });

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ["dashboard-progress"],
    queryFn: fetchProgressOverview,
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Welcome back! 👋</h1>
        <p className="mt-1 text-sm text-gray-500">Let's continue your journey toward your dream career.</p>
      </div>

      {statsError && (
        <div className="mb-5 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{(statsErrorObj as Error).message}</span>
        </div>
      )}

      {/* Stat cards - 4 per row on desktop */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 lg:grid-cols-4">
        {statsLoading &&
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}

        {!statsLoading &&
          stats &&
          statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.key}
                className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-xl ${card.bg} sm:h-10 sm:w-10`}>
                  <Icon className={`h-4.5 w-4.5 ${card.color} sm:h-5 sm:w-5`} />
                </div>
                <p className="text-xs text-gray-400">{card.label}</p>
                <p className="mt-0.5 text-lg font-bold text-gray-900 sm:text-xl">
                  {stats[card.key]}
                </p>
              </div>
            );
          })}
      </div>

      {/* Progress chart */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Your Progress Overview</h2>

        {progressLoading && (
          <div className="flex h-64 items-center justify-center text-sm text-gray-400">
            Loading chart...
          </div>
        )}

        {!progressLoading && (!progressData || progressData.length === 0) && (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-gray-600">No progress data yet</p>
            <p className="mt-1 text-xs text-gray-400">Add goals and track progress to see your chart.</p>
          </div>
        )}

        {!progressLoading && progressData && progressData.length > 0 && (
          <div className="h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
                  formatter={(value: number) => [`${value}%`, "Progress"]}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#2563eb" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}