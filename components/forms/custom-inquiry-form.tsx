"use client";

import { useMemo, useState } from "react";

type CustomInquiryFormProps = {
  intent?: string;
  product?: string;
};

export function CustomInquiryForm({ intent, product }: CustomInquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Engagement Ring",
    budgetMinTHB: "",
    budgetMaxTHB: "",
    message: product ? `Interested in product: ${product}` : "",
    website: "",
  });
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const inquiryType = useMemo(() => (intent === "source" ? "SOURCE_DIAMOND" : "CUSTOM"), [intent]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: inquiryType,
          sourcePage: "/custom",
          budgetMinTHB: form.budgetMinTHB,
          budgetMaxTHB: form.budgetMaxTHB,
          metadataJson: JSON.stringify({ references: selectedFiles, product }),
        }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setStatus({ type: "error", message: payload.message ?? "Unable to submit custom brief" });
        return;
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        category: "Engagement Ring",
        budgetMinTHB: "",
        budgetMaxTHB: "",
        message: "",
        website: "",
      });
      setSelectedFiles([]);
      setStatus({ type: "success", message: "Custom design brief submitted. We will be in touch soon." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-[#1A1A1E] bg-[#0D0D10] p-6 space-y-4" noValidate aria-label="Custom design inquiry form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="custom-name" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="custom-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="custom-email" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Email <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
          </label>
          <input
            id="custom-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
            aria-required="true"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="custom-phone" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Phone
          </label>
          <input
            id="custom-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="custom-budget-min" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Budget Min (THB)
          </label>
          <input
            id="custom-budget-min"
            type="number"
            min={0}
            value={form.budgetMinTHB}
            onChange={(event) => setForm((prev) => ({ ...prev, budgetMinTHB: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
            aria-describedby="custom-budget-hint"
          />
        </div>
        <div>
          <label htmlFor="custom-budget-max" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Budget Max (THB)
          </label>
          <input
            id="custom-budget-max"
            type="number"
            min={0}
            value={form.budgetMaxTHB}
            onChange={(event) => setForm((prev) => ({ ...prev, budgetMaxTHB: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
            aria-describedby="custom-budget-hint"
          />
        </div>
        <p id="custom-budget-hint" className="sr-only">Enter your budget range in Thai Baht for the custom piece</p>
      </div>
      <div>
        <label htmlFor="custom-category" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
          Category
        </label>
        <select
          id="custom-category"
          value={form.category}
          onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          aria-describedby="custom-category-hint"
        >
          <option>Engagement Ring</option>
          <option>Wedding Band</option>
          <option>Earrings</option>
          <option>Pendant</option>
          <option>Bracelet</option>
          <option>High Jewelry</option>
        </select>
        <p id="custom-category-hint" className="sr-only">Select the type of jewelry you are interested in</p>
      </div>
      <div>
        <label htmlFor="custom-files" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
          Reference Images <span className="text-[#8A8F98]/50 normal-case text-[10px]">(optional)</span>
        </label>
        <input
          id="custom-files"
          type="file"
          multiple
          accept="image/*"
          onChange={(event) => {
            const files = event.target.files;
            if (!files) {
              setSelectedFiles([]);
              return;
            }
            setSelectedFiles(Array.from(files).map((file) => file.name));
          }}
          className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] file:mr-3 file:px-3 file:py-1 file:text-[10px] file:tracking-[0.15em] file:uppercase file:border file:border-[#2A2A30] file:text-[#8A8F98] file:bg-transparent hover:file:border-[#C6A878]/50 file:transition-colors"
          />
        <p id="custom-files-hint" className="sr-only">Upload reference images to help us understand your design vision. You may select multiple images.</p>
        {selectedFiles.length > 0 ? (
          <p className="mt-2 text-xs text-[#8A8F98]" role="status" aria-live="polite">
            Selected: {selectedFiles.join(", ")}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor="custom-message" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
          Design Brief <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
        </label>
        <textarea
          id="custom-message"
          rows={5}
          required
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          placeholder="Describe your vision..."
          aria-required="true"
          aria-describedby="custom-message-hint"
        />
        <p id="custom-message-hint" className="sr-only">Describe your custom design vision, including any specific details, metals, or diamond preferences</p>
      </div>
      <input type="text" value={form.website} onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))} autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />
      <button
        type="submit"
        disabled={submitting}
        aria-label={submitting ? "Submitting custom brief..." : (intent === "source" ? "Request diamond sourcing" : "Submit custom design brief")}
        className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70"
      >
        {submitting ? "Submitting" : intent === "source" ? "Request Sourcing" : "Submit Custom Brief"}
      </button>
      <div role="status" aria-live="polite" aria-atomic="true">
        {status.type !== "idle" ? (
          <p className={`text-sm ${status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
