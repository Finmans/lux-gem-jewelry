import { AppointmentForm } from "@/components/forms/appointment-form";

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Consultation</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">Book an Appointment</h1>
          <p className="text-[#8A8F98] font-light max-w-3xl leading-relaxed">
            Private appointments are available in Bangkok and via remote consultation.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-4">
          <AppointmentForm />
          <div className="space-y-4">
            <article className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[10px] tracking-[0.2em] text-[#C6A878] uppercase mb-3">What to expect</p>
              <ul className="space-y-2 text-sm text-[#8A8F98] font-light">
                <li>Diamond and setting consultation</li>
                <li>Budget and timeline planning</li>
                <li>Design recommendation summary</li>
              </ul>
            </article>
            <article className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
              <p className="text-[10px] tracking-[0.2em] text-[#C6A878] uppercase mb-3">Service style</p>
              <p className="text-sm text-[#8A8F98] font-light">Consultation-first. No obligation to purchase on first meeting.</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
