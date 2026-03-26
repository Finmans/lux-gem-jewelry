import { CustomInquiryForm } from "@/components/forms/custom-inquiry-form";

type CustomPageProps = {
  searchParams: Promise<{ intent?: string; product?: string }>;
};

export default async function CustomDesignPage({ searchParams }: CustomPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Bespoke</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-[#F6F1E8] mb-4">
            {params.intent === "source" ? "Diamond Sourcing Request" : "Custom Design"}
          </h1>
          <p className="text-[#8A8F98] font-light max-w-3xl leading-relaxed">
            Submit your brief, budget range, and style references. Our team will respond with a tailored proposal.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <CustomInquiryForm intent={params.intent} product={params.product} />
        </div>
      </section>
    </main>
  );
}
