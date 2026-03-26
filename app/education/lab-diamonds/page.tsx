export default function LabDiamondsEducationPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Education</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Lab-Grown vs Natural</h1>
          <p className="text-[#8A8F98] font-light leading-relaxed">
            Lab-grown and natural diamonds share the same chemical structure. The difference is origin and traceability journey.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {[
            ["Composition", "Both are crystalline carbon and graded using the same 4Cs framework."],
            ["Optical performance", "Brilliance and scintillation depend on cut quality, not origin alone."],
            ["Traceability", "Lab-grown chains can offer highly transparent origin and production documentation."],
            ["Value positioning", "Consultation helps match budget, size target, and quality priorities."],
          ].map(([title, body]) => (
            <article key={title} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{title}</h2>
              <p className="text-[#8A8F98] font-light">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
