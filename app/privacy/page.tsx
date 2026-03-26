export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Legal</p>
          <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-4">Privacy Policy</h1>
          <p className="text-[#8A8F98] font-light leading-relaxed">
            We collect only data required to support consultations, order planning, and customer support.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {[
            ["Data we collect", "Contact details, consultation preferences, inquiry metadata, and technical logs for service reliability."],
            ["How we use data", "To reply to your requests, prepare design consultations, and maintain account/service operations."],
            ["Retention", "Records are retained as needed for service quality, legal obligations, and customer support continuity."],
            ["Your rights", "You may request correction, export, or deletion of personal data by contacting our support team."],
          ].map(([title, body]) => (
            <article key={title} className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <h2 className="font-display text-2xl font-light text-[#F6F1E8] mb-2">{title}</h2>
              <p className="text-[#8A8F98] font-light leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
