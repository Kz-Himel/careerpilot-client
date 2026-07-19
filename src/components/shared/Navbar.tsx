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

  // Better-Auth এর সেশন হুক
  const { data: session, isPending } = authClient.useSession(); 
  const isLoggedIn = !!session;

  // প্রথম রেন্ডারে সার্ভার ও ক্লায়েন্টের সিঙ্ক ঠিক রাখতে এই useEffect ব্যবহার করা হয়েছে
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        }
      }
    });
  };

  const isActive = (href: string) => pathname === href;

  // যতক্ষণ না কম্পোনেন্টটি মাউন্ট হচ্ছে অথবা সেশন লোড হচ্ছে, 
  // ততক্ষণ সার্ভার ও ক্লায়েন্ট দুই জায়গাতেই এই সেম স্কেলিটন/প্লেসহোল্ডার লেআউট রেন্ডার হবে।
  if (!mounted || isPending) {
    return <nav className="h-16 w-full border-b border-gray-100 bg-white" />;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white backdrop-blur-md">
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

        {/* Desktop links - middle/right */}
        <div className="hidden items-center gap-1 lg:flex">
          {publicRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(route.href) ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Right side auth buttons - desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
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
            <div className="flex items-center gap-4 pl-2">
              <Link 
                href="/dashboard" 
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive("/dashboard") ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <FiUser className="h-4 w-4" />
                </div>
                <span>Dashboard</span>
              </Link>
              
              <button
                onClick={handleLogout}
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
                  isActive(route.href) ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
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
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
                    isActive("/dashboard") ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
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