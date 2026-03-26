"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  Package,
  Grid3X3,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin",          label: "Dashboard",     icon: LayoutDashboard },
  { href: "/admin/diamonds", label: "Diamond Stock", icon: Gem            },
  { href: "/admin/products", label: "Products",      icon: Package        },
  { href: "/admin/collections", label: "Collections",icon: Grid3X3        },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#07090c] text-[#e8e4dc]">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-60 flex-shrink-0 flex flex-col bg-[#0b0d13] border-r border-white/[0.06]">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-white/[0.06]">
          <div className="text-[#C6A878] font-serif tracking-[0.25em] text-lg">LUX GEM</div>
          <div className="text-[#8A8F98] text-[9px] tracking-[0.35em] uppercase mt-0.5 flex items-center gap-1.5">
            <Sparkles size={8} />
            Admin Portal
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href ||
              (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  active
                    ? "bg-[#C6A878]/10 text-[#C6A878] border border-[#C6A878]/15"
                    : "text-[#8A8F98] hover:text-[#e8e4dc] hover:bg-white/[0.04]"
                )}
              >
                <Icon
                  size={15}
                  className={cn(
                    "transition-colors",
                    active ? "text-[#C6A878]" : "group-hover:text-[#C6A878]/70"
                  )}
                />
                <span className="flex-1">{label}</span>
                {active && (
                  <ChevronRight size={12} className="text-[#C6A878]/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Back to site */}
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8A8F98] hover:text-[#e8e4dc] hover:bg-white/[0.04] transition-all"
          >
            <ArrowLeft size={15} />
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
