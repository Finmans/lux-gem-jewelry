"use client";

import { Heart } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "luxgem_wishlist_diamonds";

function parseIds(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function WishlistToggle({ diamondId }: { diamondId: string }) {
  const [active, setActive] = useState(false);

  // Sync with localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const ids = parseIds(raw);
      setActive(ids.includes(diamondId));
    } catch {
      // localStorage not available
    }
  }, [diamondId]);

  // Toggle handler — updates localStorage and state optimistically
  const onToggle = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const ids = parseIds(raw);
      const newIds = ids.includes(diamondId)
        ? ids.filter((id) => id !== diamondId)
        : [...ids, diamondId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      setActive(!active);
    } catch {
      // localStorage not available
    }
  }, [active, diamondId]);

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-6 py-3 border text-[10px] tracking-[0.25em] uppercase transition-colors ${
        active
          ? "border-[#C6A878] text-[#C6A878] bg-[#C6A878]/10"
          : "border-[#2A2A30] text-[#8A8F98] hover:border-[#C6A878]/40 hover:text-[#C6A878]"
      }`}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
    >
      <span className="inline-flex items-center gap-2">
        <Heart className={`w-3.5 h-3.5 ${active ? "fill-[#C6A878]" : ""}`} />
        {active ? "Saved" : "Wishlist"}
      </span>
    </button>
  );
}
