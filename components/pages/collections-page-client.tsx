"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CollectionCard, ProductCard } from "@/lib/site-data";

const categories = ["All", "Engagement", "Wedding", "Earrings", "Necklace", "Bracelet", "High Jewelry"];

type CollectionsPageClientProps = {
  collections: CollectionCard[];
  featuredProducts: ProductCard[];
};

export function CollectionsPageClient({ collections, featuredProducts }: CollectionsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCollections = useMemo(() => {
    if (selectedCategory === "All") {
      return collections;
    }

    return collections.filter((collection) =>
      collection.name.toLowerCase().includes(selectedCategory.toLowerCase())
      || collection.slug.toLowerCase().includes(selectedCategory.toLowerCase().replace(/\s+/g, "-"))
    );
  }, [collections, selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return featuredProducts;
    }

    return featuredProducts.filter((product) =>
      product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      || product.collectionSlug.toLowerCase().includes(selectedCategory.toLowerCase().replace(/\s+/g, "-"))
    );
  }, [featuredProducts, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      {/* Page hero */}
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-4">
              Fine Jewelry
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#F6F1E8] leading-tight">
              Our Collections
            </h1>
            <p className="mt-4 text-[#8A8F98] font-light max-w-xl">
              Timeless pieces crafted from the finest lab-grown diamonds and precious metals.
              Every design tells a story of exceptional beauty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-[#1A1A1E] py-5 sticky top-20 bg-[#0B0B0D]/95 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-5 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#C6A878] text-[#0B0B0D]"
                    : "text-[#8A8F98] hover:text-[#F6F1E8] border border-[#1A1A1E] hover:border-[#2A2A30]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Collection grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filteredCollections.map((col, i) => (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/collections/${col.slug}`}
                  className={`group block border border-[#1A1A1E] hover:border-[#C6A878]/30 transition-all duration-500 overflow-hidden`}
                >
                  <div className={`h-56 bg-gradient-to-br ${col.gradient} relative flex items-center justify-center`}>
                    <div className="w-16 h-16 border border-[#C6A878]/30 rotate-45 group-hover:scale-110 group-hover:border-[#C6A878]/60 transition-all duration-700" />
                  </div>
                  <div className="p-6 bg-[#0D0D10]">
                    <h2 className="font-display text-xl font-light text-[#F6F1E8] group-hover:text-[#C6A878] transition-colors mb-1">
                      {col.name}
                    </h2>
                    <p className="text-xs text-[#8A8F98] mb-3">{col.nameTH}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#C6A878] font-light">From ฿{col.startingPriceTHB.toLocaleString()}</span>
                      <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] text-[#8A8F98] uppercase">
                        Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Featured products */}
          <div className="border-t border-[#1A1A1E] pt-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-3xl font-light text-[#F6F1E8]">
                Featured Pieces
              </h2>
            </div>
            {filteredProducts.length === 0 ? (
              <div className="border border-[#1A1A1E] bg-[#0D0D10] p-5">
                <p className="text-[#8A8F98] text-sm font-light">
                  No featured products found for this category yet. Please browse the collection details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <Link
                    href={`/custom?product=${product.slug}`}
                    className="group block border border-[#1A1A1E] hover:border-[#C6A878]/30 transition-all duration-500"
                  >
                    {/* Product visual */}
                    <div className={`aspect-square bg-gradient-to-br ${product.gradient} relative flex items-center justify-center overflow-hidden`}>
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-[#C6A878] text-[#0B0B0D] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                          {product.badge}
                        </span>
                      )}
                      <div className="w-12 h-12 border border-[#C6A878]/40 rotate-45 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    {/* Info */}
                    <div className="p-4">
                      <p className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase mb-1">{product.category}</p>
                      <h3 className="font-display text-base font-light text-[#F6F1E8] mb-0.5">{product.name}</h3>
                      <p className="text-[10px] text-[#8A8F98] mb-2">{product.centerStone}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[#C6A878]">฿{product.priceTHB.toLocaleString()}</p>
                        <span className="text-[10px] tracking-[0.18em] uppercase text-[#8A8F98] group-hover:text-[#C6A878] transition-colors">
                          Inquire
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
