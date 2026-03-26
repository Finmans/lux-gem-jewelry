import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">About LUX GEM</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] leading-tight mb-6">
            Crafted brilliance with
            <br />
            modern transparency
          </h1>
          <p className="text-[#8A8F98] font-light max-w-3xl leading-relaxed">
            LUX GEM pairs Thai jewelry craftsmanship with modern lab-grown diamond sourcing.
            Every piece is built for lasting wear, clear provenance, and consultation-led service.
          </p>
        </div>
      </section>

      <section id="philosophy" className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6">
          {[
            {
              title: "Exceptional quality",
              body: "We focus on top-performing cut proportions and independent certification standards for each center stone.",
            },
            {
              title: "Responsible sourcing",
              body: "Our inventory is traceable and selected to align with lower-impact luxury values and transparent documentation.",
            },
            {
              title: "Consultation first",
              body: "From engagement rings to bespoke commissions, each order is guided by a gemologist and design specialist.",
            },
          ].map((item) => (
            <article key={item.title} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{item.title}</h2>
              <p className="text-[#8A8F98] font-light leading-relaxed">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/appointment"
            className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors text-center"
          >
            Book Consultation
          </Link>
          <Link
            href="/contact"
            className="px-7 py-3 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-colors text-center"
          >
            Contact Team
          </Link>
        </div>
      </section>
    </main>
  );
}
