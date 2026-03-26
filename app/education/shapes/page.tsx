const shapeNotes = [
  ["Round", "Maximum brilliance and classic balance."],
  ["Oval", "Elongated silhouette with soft brilliance."],
  ["Cushion", "Pillow-like outline with romantic sparkle."],
  ["Emerald", "Step-cut elegance emphasizing clarity."],
  ["Pear", "Distinctive teardrop shape with directional grace."],
];

export default function DiamondShapesPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Education</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Diamond Shapes</h1>
          <p className="text-[#8A8F98] font-light">Shape defines visual personality, finger coverage, and setting compatibility.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shapeNotes.map(([shape, note]) => (
            <article key={shape} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{shape}</h2>
              <p className="text-[#8A8F98] font-light">{note}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
