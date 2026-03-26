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
      setStatus({ type: "success", message: "Custom design brief submitted." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-[#1A1A1E] bg-[#0D0D10] p-6 space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="custom-name" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Name</label>
          <input id="custom-name" required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="custom-email" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Email</label>
          <input id="custom-email" type="email" required value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="custom-phone" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Phone</label>
          <input id="custom-phone" value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="custom-budget-min" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Budget Min (THB)</label>
          <input id="custom-budget-min" type="number" value={form.budgetMinTHB} onChange={(event) => setForm((prev) => ({ ...prev, budgetMinTHB: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="custom-budget-max" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Budget Max (THB)</label>
          <input id="custom-budget-max" type="number" value={form.budgetMaxTHB} onChange={(event) => setForm((prev) => ({ ...prev, budgetMaxTHB: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
      </div>
      <div>
        <label htmlFor="custom-category" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Category</label>
        <select id="custom-category" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]">
          <option>Engagement Ring</option>
          <option>Wedding Band</option>
          <option>Earrings</option>
          <option>Pendant</option>
          <option>Bracelet</option>
          <option>High Jewelry</option>
        </select>
      </div>
      <div>
        <label htmlFor="custom-files" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Reference Upload (local placeholder)</label>
        <input
          id="custom-files"
          type="file"
          multiple
          onChange={(event) => {
            const files = event.target.files;
            if (!files) {
              setSelectedFiles([]);
              return;
            }
            setSelectedFiles(Array.from(files).map((file) => file.name));
          }}
          className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]"
        />
        {selectedFiles.length > 0 ? (
          <p className="mt-2 text-xs text-[#8A8F98]">Selected: {selectedFiles.join(", ")}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="custom-message" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Design Brief</label>
        <textarea id="custom-message" rows={5} value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
      </div>
      <input type="text" value={form.website} onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))} autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />
      <button type="submit" disabled={submitting} className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70">
        {submitting ? "Submitting" : intent === "source" ? "Request Sourcing" : "Submit Custom Brief"}
      </button>
      {status.type !== "idle" ? (
        <p className={`text-sm ${status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
