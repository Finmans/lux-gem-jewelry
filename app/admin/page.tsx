"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Gem, Package, TrendingUp, AlertCircle,
  ArrowRight, Plus, RefreshCw,
} from "lucide-react";
import {
  loadDiamonds, loadProducts, loadCollections,
  getDiamondStats, getProductStats,
} from "@/lib/admin-store";
import type { Diamond } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SHAPE_ICON: Record<string, string> = {
  Round: "◯", Oval: "⬭", Cushion: "⬜", Princess: "◻",
  Emerald: "▬", Pear: "🫧", Radiant: "⬡", Marquise: "◈",
  Asscher: "⬛", Heart: "♥",
};

export default function AdminDashboard() {
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [collectionCount, setCollectionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDiamonds(loadDiamonds());
    setProductCount(loadProducts().length);
    setCollectionCount(loadCollections().length);
    setLoading(false);
  }, []);

  const dStats = getDiamondStats(diamonds);
  const lowStock = diamonds.filter((d) => !d.available).length;
  const recentDiamonds = [...diamonds].slice(-5).reverse();

  const stats = [
    {
      label: "Total Diamonds",
      value: dStats.total,
      sub: `${dStats.inStock} in stock`,
      icon: Gem,
      color: "text-[#C6A878]",
      bg: "bg-[#C6A878]/10",
      href: "/admin/diamonds",
    },
    {
      label: "Total Products",
      value: productCount,
      sub: `${collectionCount} collections`,
      icon: Package,
      color: "text-[#90c8ff]",
      bg: "bg-[#90c8ff]/10",
      href: "/admin/products",
    },
    {
      label: "Stock Value",
      value: `฿${(dStats.totalValueTHB / 1_000_000).toFixed(2)}M`,
      sub: "available inventory",
      icon: TrendingUp,
      color: "text-[#6dd9a8]",
      bg: "bg-[#6dd9a8]/10",
      href: "/admin/diamonds",
    },
    {
      label: "Low / Out of Stock",
      value: lowStock,
      sub: "diamonds unavailable",
      icon: AlertCircle,
      color: lowStock > 0 ? "text-[#f87171]" : "text-[#6dd9a8]",
      bg: lowStock > 0 ? "bg-[#f87171]/10" : "bg-[#6dd9a8]/10",
      href: "/admin/diamonds",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="animate-spin text-[#C6A878]" size={24} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#F6F1E8] tracking-wide">Dashboard</h1>
        <p className="text-[#8A8F98] text-sm mt-1">
          Welcome back — LUX GEM Admin Portal
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color, bg, href }) => (
          <Link
            key={label}
            href={href}
            className="group bg-[#0d1117] border border-white/[0.06] rounded-xl p-5 hover:border-[#C6A878]/20 transition-all"
          >
            <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center mb-4", bg)}>
              <Icon size={16} className={color} />
            </div>
            <div className="text-2xl font-semibold text-[#F6F1E8]">{value}</div>
            <div className="text-xs text-[#8A8F98] mt-0.5">{label}</div>
            <div className="text-xs text-[#C6A878]/70 mt-1">{sub}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Diamond Stock */}
        <div className="lg:col-span-2 bg-[#0d1117] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="font-serif text-lg text-[#F6F1E8]">Recent Diamonds</h2>
            <Link
              href="/admin/diamonds"
              className="flex items-center gap-1 text-xs text-[#C6A878] hover:text-[#C6A878]/80 transition-colors"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {["ID", "Shape", "Carat", "Color / Clarity", "Price (THB)", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {recentDiamonds.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-[#8A8F98]">{d.id}</td>
                  <td className="px-4 py-3 text-[#e8e4dc]">
                    <span className="mr-1.5">{SHAPE_ICON[d.shape] ?? "◆"}</span>
                    {d.shape}
                  </td>
                  <td className="px-4 py-3 text-[#e8e4dc]">{d.carat}ct</td>
                  <td className="px-4 py-3 text-[#e8e4dc]">
                    {d.color} / {d.clarity}
                  </td>
                  <td className="px-4 py-3 text-[#C6A878]">
                    ฿{d.priceTHB.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-medium",
                        d.available
                          ? "bg-[#6dd9a8]/10 text-[#6dd9a8]"
                          : "bg-[#f87171]/10 text-[#f87171]"
                      )}
                    >
                      {d.available ? "In Stock" : "Sold"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-6">
            <h2 className="font-serif text-lg text-[#F6F1E8] mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "Add Diamond", href: "/admin/diamonds", icon: Gem },
                { label: "Add Product",  href: "/admin/products",  icon: Package },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.03] hover:bg-[#C6A878]/10 border border-white/[0.05] hover:border-[#C6A878]/20 transition-all text-sm text-[#e8e4dc] hover:text-[#C6A878] group"
                >
                  <Icon size={14} className="text-[#C6A878]/60 group-hover:text-[#C6A878]" />
                  {label}
                  <Plus size={12} className="ml-auto opacity-50" />
                </Link>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl p-6">
            <h2 className="font-serif text-lg text-[#F6F1E8] mb-4">Lab Breakdown</h2>
            {(["GIA", "IGI", "HRD"] as const).map((lab) => {
              const count = diamonds.filter((d) => d.lab === lab).length;
              const pct = dStats.total > 0 ? (count / dStats.total) * 100 : 0;
              return (
                <div key={lab} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#e8e4dc]">{lab}</span>
                    <span className="text-[#8A8F98]">
                      {count} ({pct.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#C6A878] to-[#f0d9a8] transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
