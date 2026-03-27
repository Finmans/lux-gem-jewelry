"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, Phone, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/client/theme-provider";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Diamond Stock", href: "/diamonds" },
  { label: "Build Your Ring", href: "/build" },
  { label: "Custom Design", href: "/custom" },
  { label: "About LUX GEM", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "dark:bg-[#0B0B0D]/90 bg-white/90 backdrop-blur-xl dark:border-[#2A2A30] border-neutral-200"
          : "dark:bg-transparent bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-display text-xl font-light tracking-[0.25em] dark:text-[#F6F1E8] text-neutral-900 group-hover:dark:text-[#C6A878] group-hover:text-[#C6A878] transition-colors duration-300">
            LUX GEM
          </span>
          <span className="text-[9px] tracking-[0.4em] dark:text-[#8A8F98] text-neutral-500 uppercase font-light -mt-0.5">
            Jewelry Co., Ltd.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-xs tracking-[0.15em] dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 uppercase font-light transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/search"
            className="p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href="/wishlist"
            className="p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
          </Link>
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Moon className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Sun className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <Link
            href="/appointment"
            className="ml-2 flex items-center gap-1.5 px-5 py-2 border border-[#C6A878]/60 dark:text-[#C6A878] text-[#8B6914] dark:hover:bg-[#C6A878]/10 hover:bg-[#C6A878]/10 text-[10px] tracking-[0.25em] uppercase hover:border-[#C6A878] transition-all duration-300"
          >
            <Phone className="w-3 h-3" />
            Book Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#F6F1E8] hover:text-neutral-900 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t dark:border-[#2A2A30] border-neutral-200 dark:bg-[#0B0B0D]/98 bg-white/98 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-0 py-3 text-sm tracking-[0.15em] dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 uppercase font-light border-b dark:border-[#1A1A1E] border-neutral-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 mt-4 pt-4">
                <Link href="/search" className="p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </Link>
                <Link href="/wishlist" className="p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 transition-colors" aria-label="Wishlist">
                  <Heart className="w-5 h-5" />
                </Link>
                <button onClick={toggle} className="p-2 dark:text-[#8A8F98] text-neutral-600 hover:dark:text-[#C6A878] hover:text-neutral-900 transition-colors" aria-label="Toggle theme">
                  {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>
              </div>
              <Link
                href="/appointment"
                className="mt-4 flex items-center justify-center gap-2 px-5 py-3 border border-[#C6A878]/60 dark:text-[#C6A878] text-[#8B6914] hover:bg-[#C6A878]/10 text-xs tracking-[0.25em] uppercase transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
