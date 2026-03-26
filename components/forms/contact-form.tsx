"use client";

import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sourcePage: "/contact" }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setStatus({ type: "error", message: payload.message ?? "Unable to submit inquiry" });
        return;
      }

      setForm({ name: "", email: "", phone: "", message: "", website: "" });
      setStatus({ type: "success", message: "Inquiry sent. Our team will contact you shortly." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-[#1A1A1E] bg-[#0D0D10] p-6 space-y-4" noValidate>
      <div>
        <label htmlFor="contact-name" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Name</label>
        <input id="contact-name" required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Email</label>
          <input id="contact-email" type="email" required value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Phone</label>
          <input id="contact-phone" value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Message</label>
        <textarea id="contact-message" required minLength={10} rows={5} value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
      </div>
      <input
        type="text"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />
      <button type="submit" disabled={submitting} className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70">
        {submitting ? "Submitting" : "Send Inquiry"}
      </button>
      {status.type !== "idle" ? (
        <p className={`text-sm ${status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
