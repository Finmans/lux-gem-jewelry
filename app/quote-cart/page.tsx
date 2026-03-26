import Link from "next/link";

export default function QuoteCartPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Quote Cart</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Consultation Cart</h1>
          <p className="text-[#8A8F98] font-light">Checkout is consultation-first. Add selections and request a personalized quote.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/appointment" className="inline-block px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors">
            Start Quote Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
