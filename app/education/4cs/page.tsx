import { fourCs } from "@/lib/mock-data";

export default function FourCsPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Education</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">The 4Cs Guide</h1>
          <p className="text-[#8A8F98] font-light max-w-3xl">
            Understand cut, color, clarity, and carat so every purchase decision is made with confidence.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-4">
          {fourCs.map((item) => (
            <article key={item.name} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[10px] tracking-[0.25em] text-[#C6A878] uppercase mb-2">{item.letter}</p>
              <h2 className="font-display text-3xl font-light text-[#F6F1E8] mb-3">{item.name}</h2>
              <p className="text-[#8A8F98] font-light mb-4 leading-relaxed">{item.description}</p>
              <p className="text-[10px] tracking-[0.2em] text-[#C6A878] uppercase">Key Grade: {item.activeGrade}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
