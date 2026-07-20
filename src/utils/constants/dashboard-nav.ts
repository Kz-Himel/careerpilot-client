// // utils/constants/dashboard-nav.ts
// import {
//   FiGrid,
//   FiCompass,
//   FiMap,
//   FiMessageCircle,
//   FiTarget,
//   FiFileText,
//   FiMic,
//   FiBookmark,
//   FiTrendingUp,
//   FiSettings,
// } from "react-icons/fi";
// import type { IconType } from "react-icons";

// export interface DashboardNavItem {
//   label: string;
//   href: string;
//   icon: IconType;
// }

// export const dashboardNavItems: DashboardNavItem[] = [
//   { label: "Dashboard", href: "/dashboard", icon: FiGrid },
//   { label: "Career Paths", href: "/dashboard/career-paths", icon: FiCompass },
//   { label: "AI Roadmap", href: "/dashboard/ai-roadmap", icon: FiMap },
//   { label: "AI Coach", href: "/dashboard/ai-coach", icon: FiMessageCircle },
//   { label: "Goals", href: "/dashboard/goals", icon: FiTarget },
//   { label: "Resume Review", href: "/dashboard/resume-review", icon: FiFileText },
//   { label: "Interview Prep", href: "/dashboard/interview-prep", icon: FiMic },
//   { label: "Bookmarks", href: "/dashboard/bookmarks", icon: FiBookmark },
//   { label: "Progress", href: "/dashboard/progress", icon: FiTrendingUp },
//   { label: "Settings", href: "/dashboard/settings", icon: FiSettings },
// ];


// utils/constants/dashboard-nav.ts
import { FiGrid, FiTarget, FiMessageCircle, FiMap } from "react-icons/fi";
import type { IconType } from "react-icons";
import { IoMdAddCircleOutline } from "react-icons/io";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const dashboardNavItems: DashboardNavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Add Roadmap", href: "/dashboard/add-goal", icon: IoMdAddCircleOutline },
  { label: "Manage Roadmaps", href: "/dashboard/manage-goals", icon: FiTarget },
  { label: "AI Roadmap", href: "/dashboard/ai-roadmap", icon: FiMap },
  { label: "AI Chat", href: "/dashboard/ai-chat", icon: FiMessageCircle },
];