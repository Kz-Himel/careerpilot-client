"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";

const publicRoutes = [
  { label: "Home", href: "/" },
  { label: "Explore Careers", href: "/explore" },
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const isActive = (href: string) => pathname === href;

  if (!mounted || isPending) {
    return (
      <nav className="nav-glass h-16 w-full">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="skeleton h-8 w-40 rounded-lg" />
        </div>
      </nav>
    );
  }

  return (
    <nav className="nav-glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            C
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            CareerPilot{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              AI
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-150 ${
                isActive(route.href)
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                className="btn btn-ghost btn-md rounded-lg px-4"
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-primary btn-md rounded-xl px-5 shadow-sm"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 pl-2">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                  isActive("/dashboard")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-700">
                  <FiUser className="h-4 w-4" />
                </div>
                <span>Dashboard</span>
              </Link>

              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm gap-1.5 rounded-xl"
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
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200/60 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-3.5 py-3 text-sm font-medium transition-colors ${
                  isActive(route.href)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-secondary btn-md w-full rounded-xl"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn btn-primary btn-md w-full rounded-xl"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${
                    isActive("/dashboard")
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="btn btn-secondary btn-md w-full rounded-xl"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
