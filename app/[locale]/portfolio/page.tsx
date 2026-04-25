import { getCollections, getFeaturedProducts } from "@/lib/site-data";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Portfolio uses the same data as collections
  const [collections, featuredProducts] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
  ]);

  // Re-export collections page with portfolio metadata
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-4">Our Work</p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-[#F6F1E8] leading-tight">
            Portfolio
          </h1>
          <p className="mt-4 text-[#8A8F98] font-light max-w-xl">
            A curated selection of our finest lab-grown diamond creations.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Pieces Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {featuredProducts.slice(0, 6).map((product) => (
              <a
                key={product.id}
                href={`/custom?product=${product.slug}`}
                className="group block border border-[#1A1A1E] hover:border-[#C6A878]/30 transition-all duration-500 overflow-hidden"
              >
                <div className={`h-72 bg-gradient-to-br ${product.gradient} relative flex items-center justify-center`}>
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-20 h-20 border border-[#C6A878]/30 rotate-45 group-hover:scale-110 group-hover:border-[#C6A878]/60 transition-all duration-700" />
                  )}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#C6A878] text-[#0B0B0D] text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6 bg-[#0D0D10]">
                  <p className="text-[9px] tracking-[0.2em] text-[#8A8F98] uppercase mb-1">
                    {product.category}
                  </p>
                  <h2 className="font-display text-xl font-light text-[#F6F1E8] group-hover:text-[#C6A878] transition-colors mb-1">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[#8A8F98] mb-3">{product.centerStone}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#C6A878] font-light">
                      ฿{product.priceTHB.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] tracking-[0.15em] text-[#8A8F98] uppercase">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* All Collections */}
          <div className="border-t border-[#1A1A1E] pt-16">
            <h2 className="font-display text-3xl font-light text-[#F6F1E8] mb-10">
              Browse by Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collections.map((collection) => (
                <a
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group block border border-[#1A1A1E] hover:border-[#C6A878]/30 transition-all duration-500 overflow-hidden"
                >
                  <div className={`h-48 bg-gradient-to-br ${collection.gradient} relative flex items-center justify-center`}>
                    <div className="w-16 h-16 border border-[#C6A878]/30 rotate-45 group-hover:scale-110 group-hover:border-[#C6A878]/60 transition-all duration-700" />
                  </div>
                  <div className="p-6 bg-[#0D0D10]">
                    <h3 className="font-display text-lg font-light text-[#F6F1E8] group-hover:text-[#C6A878] transition-colors mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-xs text-[#8A8F98] mb-2">{collection.nameTH}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#C6A878] font-light">
                        From ฿{collection.startingPriceTHB.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#8A8F98]">{collection.pieceCount} pieces</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
