// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import Sidebar from "@/components/dashboard/Sidebar";
import { authClient } from "@/lib/auth-client"; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl items-start">
      {/* Bame Sidebar standalone bॉndho thakbe */}
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      {/* Dane active content ba page layout */}
      <div className="min-w-0 flex-1 w-full">
        {/* Mobile top navigation header layer */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 lg:hidden bg-white sticky top-16 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600 hover:bg-gray-50"
            aria-label="Open dashboard menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-gray-900">Dashboard Menu</span>
        </div>

        {/* Dynamic page context (Goals/Roadmap/Chat etc.) wrapper */}
        <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}