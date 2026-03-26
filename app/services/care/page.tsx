export default function CarePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Service</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Cleaning & Care</h1>
          <p className="text-[#8A8F98] font-light">Guidance and professional service to keep your piece bright for daily wear.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-4">
          {[
            ["At-home care", "Use mild soap, warm water, and a soft brush. Avoid harsh chemicals."],
            ["Professional checks", "Annual inspection and cleaning ensures stone security and polish condition."],
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
