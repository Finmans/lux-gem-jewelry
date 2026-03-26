import Link from "next/link";

const stories = [
  {
    slug: "understanding-lab-diamond-grading",
    title: "Understanding Lab Diamond Grading",
    excerpt: "How to read a grading report and prioritize brilliance, not only carat size.",
  },
  {
    slug: "engagement-ring-proportions",
    title: "How Ring Proportions Change the Look",
    excerpt: "A practical guide to balancing center stone size, band width, and metal tone.",
  },
  {
    slug: "care-routine-for-daily-jewelry",
    title: "Care Routine for Daily Jewelry",
    excerpt: "Simple routines that keep white metals bright and stones visually crisp.",
  },
];

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Editorial</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">LUX GEM Journal</h1>
          <p className="text-[#8A8F98] font-light max-w-2xl">Education, design notes, and buying guidance from our gemologists.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map((story) => (
            <article key={story.slug} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[10px] tracking-[0.2em] text-[#C6A878] uppercase mb-3">Journal</p>
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-3">{story.title}</h2>
              <p className="text-[#8A8F98] font-light mb-5">{story.excerpt}</p>
              <Link href="/contact" className="text-[10px] tracking-[0.2em] text-[#C6A878] uppercase hover:text-[#D9C4A0]">
                Request Full Article Access
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
