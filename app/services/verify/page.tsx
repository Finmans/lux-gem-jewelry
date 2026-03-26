import { CertificateVerifyForm } from "@/components/forms/certificate-verify-form";

export default function CertificateVerifyPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Service</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">Certificate Verification</h1>
          <p className="text-[#8A8F98] font-light max-w-3xl">
            Enter a certificate number to verify matching records from our seeded inventory.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CertificateVerifyForm />
        </div>
      </section>
    </main>
  );
}
