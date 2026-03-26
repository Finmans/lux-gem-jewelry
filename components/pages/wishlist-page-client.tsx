"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import type { DiamondRecord } from "@/lib/site-data";
import {
  getWishlistIds,
  setWishlistIds,
  subscribeWishlist,
} from "@/lib/wishlist-storage";

export function WishlistPageClient({ diamonds }: { diamonds: DiamondRecord[] }) {
  const ids = useSyncExternalStore(subscribeWishlist, getWishlistIds, () => []);

  const items = useMemo(() => diamonds.filter((diamond) => ids.includes(diamond.id)), [diamonds, ids]);

  function removeItem(id: string) {
    setWishlistIds(ids.filter((item) => item !== id));
  }

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Wishlist</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">Your Saved Diamonds</h1>
          <p className="text-[#8A8F98] font-light">Shortlist stones and continue with consultation when ready.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[#8A8F98] mb-4">Your wishlist is empty.</p>
              <Link href="/diamonds" className="inline-block px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors">
                Browse Diamond Stock
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((diamond) => (
                <article key={diamond.id} className="border border-[#1A1A1E] bg-[#0D0D10] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-[#F6F1E8] font-light">{diamond.id} · {diamond.carat}ct {diamond.shape} · {diamond.color} {diamond.clarity}</p>
                    <p className="text-[#C6A878] mt-1">฿{diamond.priceTHB.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/diamonds/${diamond.id}`} className="px-4 py-2 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.22em] uppercase hover:bg-[#C6A878]/10 transition-colors">
                      View
                    </Link>
                    <button type="button" onClick={() => removeItem(diamond.id)} className="px-4 py-2 border border-[#2A2A30] text-[#8A8F98] text-[10px] tracking-[0.22em] uppercase hover:border-[#d98f8f] hover:text-[#d98f8f] transition-colors">
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
