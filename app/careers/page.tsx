import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Careers</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Join the LUX GEM Team</h1>
          <p className="text-[#8A8F98] font-light leading-relaxed">
            We hire jewelers, client advisors, and operations specialists who value precision, hospitality, and craftsmanship.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border border-[#1A1A1E] bg-[#0D0D10] p-6">
          <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-3">Open Application</h2>
          <p className="text-[#8A8F98] font-light mb-6">
            Send your profile and portfolio to our team. We review applications on a rolling basis.
          </p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors">
            Contact Hiring Team
          </Link>
        </div>
      </section>
    </main>
  );
}
