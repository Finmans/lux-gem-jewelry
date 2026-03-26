import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns | LUX GEM",
  description: "LUX GEM return, exchange, and cancellation policy for consultation-first purchases.",
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Service Policy</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Returns & Exchanges</h1>
          <p className="text-[#8A8F98] font-light leading-relaxed">
            Because most pieces are made-to-order or configured by consultation, return eligibility depends on product type and production stage.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {[
            ["Made-to-order jewelry", "Custom and made-to-order items are non-refundable once production starts."],
            ["Stock item exchange", "Unworn stock items may be exchanged within 7 days with original documents and condition check."],
            ["Cancellation", "Requests canceled before production confirmation may be eligible for partial or full deposit refund."],
            ["Quality concerns", "If quality does not match approved specifications, we prioritize remake or corrective service."],
          ].map(([title, body]) => (
            <article key={title} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{title}</h2>
              <p className="text-[#8A8F98] font-light leading-relaxed">{body}</p>
            </article>
          ))}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors text-center"
            >
              Contact Support
            </Link>
            <Link
              href="/warranty"
              className="px-7 py-3 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-colors text-center"
            >
              View Warranty
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
