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
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4 custom-scrollbar">
      {dashboardNavItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              active
                ? "nav-link-active pl-4"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon
              className={`h-[18px] w-[18px] shrink-0 ${
                active ? "text-indigo-600" : "text-slate-400"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white lg:flex">
        <div className="border-b border-slate-100 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Dashboard
          </p>
        </div>
        {NavList}
        <div className="border-t border-slate-100 p-3">
          <button
            onClick={onLogout}
            className="btn btn-danger-outline btn-md w-full justify-start gap-3 rounded-xl"
          >
            <FiLogOut className="h-[18px] w-[18px] shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="text-sm font-bold text-slate-900">Dashboard Menu</span>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100"
                aria-label="Close menu"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            {NavList}
            <div className="border-t border-slate-100 p-3">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="btn btn-danger-outline btn-md w-full justify-start gap-3 rounded-xl"
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
