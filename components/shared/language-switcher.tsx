"use client";

import { useTransition, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "th", label: "ภาษาไทย", flag: "TH" },
    { code: "en", label: "English", flag: "EN" },
  ];

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

  function onSelect(newLocale: string) {
    setOpen(false);
    if (newLocale === locale) return;
    // Persist the choice in a cookie so middleware can read it
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    startTransition(() => {
      // Force a re-render by navigating to the same page
      window.location.href = `/${newLocale}${window.location.pathname.replace(/^\/(en|th)/, "") || ""}`;
    });
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1.5 text-[#8A8F98] hover:text-[#C6A878] transition-colors text-xs tracking-wider"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{currentLang.flag}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 bg-[#0B0B0D] border border-[#2A2A30] rounded-md shadow-xl overflow-hidden min-w-[140px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelect(lang.code)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-xs tracking-wider transition-colors",
                  lang.code === locale
                    ? "text-[#C6A878] bg-[#C6A878]/5"
                    : "text-[#8A8F98] hover:text-[#F6F1E8] hover:bg-white/5"
                )}
              >
                <span>{lang.label}</span>
                {lang.code === locale && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
