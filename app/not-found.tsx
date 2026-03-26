import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">404</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">Page Not Found</h1>
          <p className="text-[#8A8F98] font-light max-w-2xl mx-auto mb-8">
            The page you requested is unavailable. Continue browsing our collections or diamond stock.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/collections"
              className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors"
            >
              View Collections
            </Link>
            <Link
              href="/diamonds"
              className="px-7 py-3 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-colors"
            >
              Browse Diamonds
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
