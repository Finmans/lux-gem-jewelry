import type { Metadata } from "next";

import Link from "next/link";
import { getCollections, getDiamonds, getFeaturedProducts } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search | LUX GEM",
  description: "Search collections, featured products, and certified diamond stock at LUX GEM.",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const normalized = query.toLowerCase();

  const [collections, products, diamonds] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
    getDiamonds(),
  ]);

  const collectionResults = normalized
    ? collections.filter((collection) =>
        [collection.name, collection.nameTH, collection.description, collection.slug]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
    : [];

  const productResults = normalized
    ? products.filter((product) =>
        [product.name, product.category, product.centerStone, product.collectionSlug, product.slug]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
    : [];

  const diamondResults = normalized
    ? diamonds.filter((diamond) =>
        [diamond.id, diamond.shape, diamond.color, diamond.clarity, diamond.cut, diamond.lab, diamond.certificate]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
    : [];

  const totalResults = collectionResults.length + productResults.length + diamondResults.length;

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Search</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">Find Your Piece</h1>
          <p className="text-[#8A8F98] font-light max-w-3xl mb-8">
            Search collections, featured jewelry, and certified diamond inventory.
          </p>

          <form method="get" className="max-w-3xl flex flex-col sm:flex-row gap-3">
            <label htmlFor="search-query" className="sr-only">Search</label>
            <input
              id="search-query"
              name="q"
              defaultValue={query}
              placeholder="Try: oval, engagement, VS1, D007"
              className="flex-1 bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {!normalized ? (
            <div className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[#8A8F98]">Enter a keyword to search the live catalog.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#8A8F98]">
                Found <span className="text-[#F6F1E8]">{totalResults}</span> result{totalResults === 1 ? "" : "s"} for
                <span className="text-[#C6A878]"> “{query}”</span>
              </p>

              <div className="space-y-3">
                <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#C6A878]">Collections</h2>
                {collectionResults.length === 0 ? (
                  <p className="text-sm text-[#8A8F98]">No matching collections.</p>
                ) : (
                  collectionResults.map((collection) => (
                    <Link
                      key={collection.slug}
                      href={`/collections/${collection.slug}`}
                      className="block border border-[#1A1A1E] bg-[#0D0D10] p-4 hover:border-[#C6A878]/40 transition-colors"
                    >
                      <p className="text-[#F6F1E8] font-light">{collection.name}</p>
                      <p className="text-sm text-[#8A8F98] mt-1">{collection.description}</p>
                    </Link>
                  ))
                )}
              </div>

              <div className="space-y-3">
                <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#C6A878]">Featured Jewelry</h2>
                {productResults.length === 0 ? (
                  <p className="text-sm text-[#8A8F98]">No matching featured products.</p>
                ) : (
                  productResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/custom?product=${product.slug}`}
                      className="block border border-[#1A1A1E] bg-[#0D0D10] p-4 hover:border-[#C6A878]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[#F6F1E8] font-light">{product.name}</p>
                          <p className="text-sm text-[#8A8F98] mt-1">{product.category} · {product.centerStone}</p>
                        </div>
                        <p className="text-[#C6A878]">฿{product.priceTHB.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className="space-y-3">
                <h2 className="text-[10px] tracking-[0.25em] uppercase text-[#C6A878]">Diamonds</h2>
                {diamondResults.length === 0 ? (
                  <p className="text-sm text-[#8A8F98]">No matching diamonds.</p>
                ) : (
                  diamondResults.map((diamond) => (
                    <Link
                      key={diamond.id}
                      href={`/diamonds/${diamond.id}`}
                      className="block border border-[#1A1A1E] bg-[#0D0D10] p-4 hover:border-[#C6A878]/40 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[#F6F1E8] font-light">{diamond.id} · {diamond.carat}ct {diamond.shape}</p>
                          <p className="text-sm text-[#8A8F98] mt-1">{diamond.color} · {diamond.clarity} · {diamond.lab} #{diamond.certificate}</p>
                        </div>
                        <p className="text-[#C6A878]">฿{diamond.priceTHB.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
