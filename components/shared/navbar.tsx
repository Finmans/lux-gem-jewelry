"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Heart, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t("collections"), href: `/${locale}/collections` },
    { label: t("diamondStock"), href: `/${locale}/diamonds` },
    { label: t("buildYourRing"), href: `/${locale}/build` },
    { label: t("customDesign"), href: `/${locale}/custom` },
    { label: t("aboutLUXGEM"), href: `/${locale}/about` },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#0B0B0D]/90 backdrop-blur-xl border-b border-[#2A2A30]"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="font-display text-xl font-light tracking-[0.25em] text-[#F6F1E8] group-hover:text-[#C6A878] transition-colors duration-300">
            LUX GEM
          </span>
          <span className="text-[9px] tracking-[0.4em] text-[#8A8F98] uppercase font-light -mt-0.5">
            Jewelry Co., Ltd.
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-xs tracking-[0.15em] text-[#8A8F98] hover:text-[#C6A878] uppercase font-light transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={`/${locale}/search`}
            className="p-2 text-[#8A8F98] hover:text-[#C6A878] transition-colors"
            aria-label={t("search")}
          >
            <Search className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/wishlist`}
            className="p-2 text-[#8A8F98] hover:text-[#C6A878] transition-colors"
            aria-label={t("wishlist")}
          >
            <Heart className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/appointment`}
            className="ml-2 flex items-center gap-1.5 px-5 py-2 border border-[#C6A878]/60 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-all duration-300"
          >
            <Phone className="w-3 h-3" />
            {t("bookConsultation")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#8A8F98] hover:text-[#F6F1E8] transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
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
            className="lg:hidden border-t border-[#2A2A30] bg-[#0B0B0D]/98 backdrop-blur-xl"
            aria-label="Mobile navigation"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-0 py-3 text-sm tracking-[0.15em] text-[#8A8F98] hover:text-[#C6A878] uppercase font-light border-b border-[#1A1A1E] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 mt-4 pt-4">
                <LanguageSwitcher />
                <Link
                  href={`/${locale}/search`}
                  className="p-2 text-[#8A8F98] hover:text-[#C6A878] transition-colors"
                  aria-label={t("search")}
                >
                  <Search className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/wishlist`}
                  className="p-2 text-[#8A8F98] hover:text-[#C6A878] transition-colors"
                  aria-label={t("wishlist")}
                >
                  <Heart className="w-5 h-5" />
                </Link>
              </div>
              <Link
                href={`/${locale}/appointment`}
                className="mt-4 flex items-center justify-center gap-2 px-5 py-3 border border-[#C6A878]/60 text-[#C6A878] text-xs tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                {t("bookConsultation")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
