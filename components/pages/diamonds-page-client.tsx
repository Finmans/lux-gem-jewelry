"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Shield, ArrowUpDown, X } from "lucide-react";
import type { DiamondRecord } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const shapes = [
  "Round", "Oval", "Cushion", "Emerald", "Princess",
  "Pear", "Radiant", "Marquise", "Asscher", "Heart",
];
const shapeIcons: Record<string, string> = {
  Round: "◯", Oval: "⬭", Cushion: "▣", Emerald: "▬",
  Princess: "◻", Pear: "⊙", Radiant: "◈", Marquise: "◇",
  Heart: "♡", Asscher: "⊠",
};
const colors = ["D", "E", "F", "G", "H", "I"];
const clarities = ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"];
const labs = ["GIA", "IGI", "HRD"];

type DiamondsPageClientProps = {
  diamonds: DiamondRecord[];
};

export function DiamondsPageClient({ diamonds }: DiamondsPageClientProps) {
  const [selectedShape, setSelectedShape] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [selectedClarity, setSelectedClarity] = useState<string>("All");
  const [selectedLab, setSelectedLab] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"priceAsc" | "priceDesc" | "caratDesc">("priceAsc");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filtered = diamonds.filter((d) => {
    if (selectedShape !== "All" && d.shape !== selectedShape) return false;
    if (selectedColor !== "All" && d.color !== selectedColor) return false;
    if (selectedClarity !== "All" && d.clarity !== selectedClarity) return false;
    if (selectedLab !== "All" && d.lab !== selectedLab) return false;
    return true;
  });

  const hasFilters =
    selectedShape !== "All" || selectedColor !== "All" ||
    selectedClarity !== "All" || selectedLab !== "All";

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "priceDesc") return b.priceTHB - a.priceTHB;
    if (sortBy === "caratDesc") return b.carat - a.carat;
    return a.priceTHB - b.priceTHB;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      {/* Page hero */}
      <section className="border-b border-[#1A1A1E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-4">
              Diamond Stock
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8]">
                Select Your Diamond
              </h1>
              <p className="text-sm text-[#8A8F98] font-light">
                <span className="text-[#F6F1E8]">{diamonds.length}</span> certified stones available
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Shape selector */}
        <div className="mb-8">
          <p className="text-[9px] tracking-[0.3em] text-[#8A8F98] uppercase mb-4">Shape</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setSelectedShape("All");
                setPage(1);
              }}
              className={cn(
                "px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all duration-300",
                selectedShape === "All"
                  ? "bg-[#C6A878] text-[#0B0B0D] border-[#C6A878]"
                  : "border-[#1A1A1E] text-[#8A8F98] hover:border-[#C6A878]/40 hover:text-[#F6F1E8]"
              )}
            >
              All
            </button>
            {shapes.map((shape) => (
              <button
                key={shape}
                onClick={() => {
                  setSelectedShape(shape);
                  setPage(1);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2.5 border transition-all duration-300",
                  selectedShape === shape
                    ? "bg-[#C6A878]/10 border-[#C6A878]/60 text-[#C6A878]"
                    : "border-[#1A1A1E] text-[#8A8F98] hover:border-[#C6A878]/30"
                )}
              >
                <span className="text-lg leading-none">{shapeIcons[shape]}</span>
                <span className="text-[9px] tracking-wider">{shape}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 py-4 border-y border-[#1A1A1E]">
          {/* Color */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase">Color:</span>
            <div className="flex gap-1">
              {["All", ...colors].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedColor(c);
                    setPage(1);
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[10px] border transition-all",
                    selectedColor === c
                      ? "border-[#C6A878] text-[#C6A878]"
                      : "border-[#1A1A1E] text-[#8A8F98] hover:border-[#2A2A30]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-5 bg-[#1A1A1E]" />

          {/* Clarity */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase">Clarity:</span>
            <div className="flex flex-wrap gap-1">
              {["All", ...clarities].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedClarity(c);
                    setPage(1);
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[10px] border transition-all",
                    selectedClarity === c
                      ? "border-[#C6A878] text-[#C6A878]"
                      : "border-[#1A1A1E] text-[#8A8F98] hover:border-[#2A2A30]"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-5 bg-[#1A1A1E]" />

          {/* Lab */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase">Lab:</span>
            <div className="flex gap-1">
              {["All", ...labs].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setSelectedLab(l);
                    setPage(1);
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[10px] border transition-all",
                    selectedLab === l
                      ? "border-[#C6A878] text-[#C6A878]"
                      : "border-[#1A1A1E] text-[#8A8F98] hover:border-[#2A2A30]"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={() => {
                setSelectedShape("All");
                setSelectedColor("All");
                setSelectedClarity("All");
                setSelectedLab("All");
                setPage(1);
              }}
              className="ml-auto flex items-center gap-1 text-[10px] tracking-[0.15em] text-[#8A8F98] hover:text-[#C6A878] uppercase transition-colors"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#8A8F98] font-light">
            Showing <span className="text-[#F6F1E8]">{paginated.length}</span> of <span className="text-[#F6F1E8]">{filtered.length}</span> diamonds
          </p>
          <label className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-[#8A8F98] uppercase">
            <ArrowUpDown className="w-3 h-3" />
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value as "priceAsc" | "priceDesc" | "caratDesc");
                setPage(1);
              }}
              className="bg-[#111115] border border-[#2A2A30] px-2 py-1 text-[10px] text-[#F6F1E8]"
            >
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="caratDesc">Carat: High to Low</option>
            </select>
          </label>
        </div>

        {/* Diamond table */}
        <div className="border border-[#1A1A1E]">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[50px_70px_1fr_70px_60px_80px_70px_80px_120px] gap-3 px-5 py-3 border-b border-[#1A1A1E] bg-[#080809]">
            {["#", "Shape", "Certificate", "Carat", "Color", "Clarity", "Cut", "Lab", "Price"].map((h) => (
              <p key={h} className="text-[9px] tracking-[0.2em] text-[#8A8F98]/60 uppercase">{h}</p>
            ))}
          </div>

          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[#8A8F98] font-light">No diamonds match your filters.</p>
                <button
                  onClick={() => {
                    setSelectedShape("All");
                    setSelectedColor("All");
                    setSelectedClarity("All");
                    setSelectedLab("All");
                    setPage(1);
                  }}
                  className="mt-4 text-[#C6A878] text-sm underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              paginated.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={cn(i < paginated.length - 1 && "border-b border-[#1A1A1E]")}
                >
                  <Link
                    href={`/diamonds/${d.id}`}
                    className="group grid grid-cols-2 md:grid-cols-[50px_70px_1fr_70px_60px_80px_70px_80px_120px] gap-3 px-5 py-4 hover:bg-[#111115] transition-colors items-center"
                  >
                    <p className="text-[10px] text-[#8A8F98]/40 font-mono hidden md:block">{(currentPage - 1) * pageSize + i + 1}</p>
                    <div className="flex flex-col items-start md:items-center">
                      <span className="text-xl text-[#C6A878]/80">{shapeIcons[d.shape] ?? "◇"}</span>
                      <span className="text-[9px] text-[#8A8F98]/60 mt-0.5">{d.shape}</span>
                    </div>
                    <div className="col-span-1 md:col-auto">
                      <p className="text-xs font-mono text-[#8A8F98]">#{d.certificate}</p>
                    </div>
                    <p className="hidden md:block text-sm text-[#F6F1E8] font-light">{d.carat}ct</p>
                    <p className="hidden md:block text-sm text-[#F6F1E8] font-light">{d.color}</p>
                    <p className="hidden md:block text-sm text-[#C6A878] font-light">{d.clarity}</p>
                    <p className="hidden md:block text-xs text-[#8A8F98]">{d.cut}</p>
                    <div className="hidden md:flex items-center gap-1">
                      <Shield className="w-3 h-3 text-[#C6A878]/50" />
                      <span className="text-xs text-[#8A8F98]">{d.lab}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="text-sm text-[#C6A878] font-light">฿{d.priceTHB.toLocaleString()}</p>
                      <p className="text-[9px] text-[#8A8F98]/50 mt-0.5">${d.priceUSD.toLocaleString()}</p>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {totalPages > 1 ? (
          <div className="mt-4 flex items-center justify-between text-xs text-[#8A8F98]">
            <p>Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-[#2A2A30] disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-[#2A2A30] disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1A1A1E]">
          <p className="text-sm text-[#8A8F98] font-light">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/custom?intent=source" className="text-[#C6A878] underline underline-offset-4">
              Request a bespoke sourcing
            </Link>
          </p>
          <Link
            href="/build"
            className="px-8 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors"
          >
            Build Your Ring
          </Link>
        </div>
      </div>
    </main>
  );
}
