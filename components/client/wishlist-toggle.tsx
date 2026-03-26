"use client";

import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import {
  getWishlistIds,
  subscribeWishlist,
  toggleWishlistId,
} from "@/lib/wishlist-storage";

export function WishlistToggle({ diamondId }: { diamondId: string }) {
  const ids = useSyncExternalStore(subscribeWishlist, getWishlistIds, () => []);
  const active = ids.includes(diamondId);

  function onToggle() {
    toggleWishlistId(diamondId);
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-6 py-3 border text-[10px] tracking-[0.25em] uppercase transition-colors ${active ? "border-[#C6A878] text-[#C6A878] bg-[#C6A878]/10" : "border-[#2A2A30] text-[#8A8F98] hover:border-[#C6A878]/40 hover:text-[#C6A878]"}`}
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
