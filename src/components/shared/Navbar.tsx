"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiCompass,
  FiMap,
  FiMessageCircle,
  FiTarget,
  FiFileText,
  FiMic,
  FiBookmark,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";

// TODO: replace with your real auth hook, e.g. const { data: session } = authClient.useSession();
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return {
    isLoggedIn,
    user: { name: "Rafi Hasan", plan: "Premium" },
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  };
};

const publicRoutes = [
  { label: "Home", href: "/" },
  { label: "Explore Careers", href: "/explore" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const dashboardItems = [
  { label: "Dashboard", href: "/dashboard", icon: FiGrid },
  { label: "Career Paths", href: "/dashboard/career-paths", icon: FiCompass },
  { label: "AI Roadmap", href: "/dashboard/ai-roadmap", icon: FiMap },
  { label: "AI Coach", href: "/dashboard/ai-coach", icon: FiMessageCircle },
  { label: "Goals", href: "/dashboard/goals", icon: FiTarget },
  { label: "Resume Review", href: "/dashboard/resume-review", icon: FiFileText },
  { label: "Interview Prep", href: "/dashboard/interview-prep", icon: FiMic },
  { label: "Bookmarks", href: "/dashboard/bookmarks", icon: FiBookmark },
  { label: "Progress", href: "/dashboard/progress", icon: FiTrendingUp },
  { label: "Settings", href: "/dashboard/settings", icon: FiSettings },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn, user, login, logout } = useAuth();

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDashboardOpen, setMobileDashboardOpen] = useState(false);

  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dashboardRef.current && !dashboardRef.current.contains(e.target as Node)) {
        setDashboardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - left */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold text-gray-900">
            CareerPilot <span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* Desktop links - right */}
        <div className="hidden items-center gap-1 lg:flex">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(route.href)
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {route.label}
            </Link>
          ))}

          {/* Dashboard dropdown - only when logged in */}
          {isLoggedIn && (
            <div className="relative ml-1" ref={dashboardRef}>
              <button
                onClick={() => setDashboardOpen((v) => !v)}
                className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  dashboardOpen ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Dashboard
                <FiChevronDown
                  className={`h-4 w-4 transition-transform ${dashboardOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dashboardOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg">
                  {dashboardItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDashboardOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Icon className="h-4 w-4 text-blue-600" />
                        {item.label}
                      </Link>
                    );
                  })}
                  <div className="my-1 border-t border-gray-100" />
                  <button
                    onClick={() => {
                      logout();
                      setDashboardOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side auth buttons - desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                onClick={login}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 pl-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <FiUser className="h-4 w-4" />
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-700 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(route.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {route.label}
              </Link>
            ))}

            {isLoggedIn && (
              <div>
                <button
                  onClick={() => setMobileDashboardOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                  <FiChevronDown
                    className={`h-4 w-4 transition-transform ${
                      mobileDashboardOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDashboardOpen && (
                  <div className="ml-2 flex flex-col gap-1 border-l border-gray-100 pl-3">
                    {dashboardItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Icon className="h-4 w-4 text-blue-600" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  className="rounded-md border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}