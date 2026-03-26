import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warranty | LUX GEM",
  description: "LUX GEM warranty coverage, maintenance terms, and service eligibility.",
};

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Service Policy</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Warranty</h1>
          <p className="text-[#8A8F98] font-light leading-relaxed">
            LUX GEM jewelry includes a workmanship warranty and lifetime in-store inspection support.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {[
            ["Workmanship coverage", "Manufacturing defects in setting workmanship are covered for 12 months from delivery."],
            ["Stone security checks", "Complimentary prong and setting security checks are available during business hours with appointment."],
            ["Exclusions", "Damage from impact, accidental misuse, unauthorized modifications, and normal wear are not covered."],
            ["Service timelines", "Most warranty assessments are completed within 3-5 business days after item intake."],
          ].map(([title, body]) => (
            <article key={title} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{title}</h2>
              <p className="text-[#8A8F98] font-light leading-relaxed">{body}</p>
            </article>
          ))}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/appointment"
              className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors text-center"
            >
              Book Service Appointment
            </Link>
            <Link
              href="/returns"
              className="px-7 py-3 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/10 transition-colors text-center"
            >
              View Return Policy
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
