// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogOut, FiX } from "react-icons/fi";
import { dashboardNavItems } from "@/utils/constants/dashboard-nav";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function Sidebar({ mobileOpen, onClose, onLogout }: SidebarProps) {
  const pathname = usePathname();

  const NavList = (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {dashboardNavItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-blue-600" : "text-gray-400"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar - sticky below navbar */}
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 flex-col border-r border-gray-100 bg-white lg:flex">
        {NavList}
        <div className="border-t border-gray-100 p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <FiLogOut className="h-[18px] w-[18px] shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile drawer backdrop and side menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[80vw] flex-col bg-white shadow-xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
              <span className="text-sm font-bold text-gray-900">Dashboard Menu</span>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-500 hover:bg-gray-50"
                aria-label="Close menu"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            {NavList}
            <div className="border-t border-gray-100 p-3">
              <button
                onClick={() => {
                  onLogout();
                  onClose();                }}
                className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 active:bg-red-50"
              >
                <FiLogOut className="h-[18px] w-[18px] shrink-0" />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}