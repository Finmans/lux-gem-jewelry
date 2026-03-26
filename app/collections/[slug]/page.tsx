import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionBySlug, getFeaturedProducts } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const [collection, products] = await Promise.all([
    getCollectionBySlug(slug),
    getFeaturedProducts(slug),
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Collection</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-3">{collection.name}</h1>
          <p className="text-[#8A8F98] font-light mb-4">{collection.description}</p>
          <p className="text-sm text-[#C6A878] font-light">Starting from ฿{collection.startingPriceTHB.toLocaleString()}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[#8A8F98] font-light mb-5">Featured products for this collection are currently available by consultation.</p>
              <Link href="/custom" className="inline-block px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors">
                Request Design Guidance
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <article key={product.id} className="border border-[#1A1A1E] bg-[#0D0D10]">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${product.gradient}`} />
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.2em] text-[#8A8F98] uppercase mb-2">{product.category}</p>
                    <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{product.name}</h2>
                    <p className="text-[#8A8F98] text-sm font-light mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[#C6A878] font-light">฿{product.priceTHB.toLocaleString()}</p>
                      <Link href={`/custom?product=${product.slug}`} className="text-[10px] tracking-[0.2em] text-[#C6A878] uppercase hover:text-[#D9C4A0]">
                        Inquire
                      </Link>
                    </div>
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
