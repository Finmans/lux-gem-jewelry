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
    <form onSubmit={onSubmit} className="border border-[#1A1A1E] bg-[#0D0D10] p-6 space-y-4" noValidate aria-label="Contact inquiry form">
      <div>
        <label htmlFor="contact-name" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
          Name <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          placeholder="Your full name"
          aria-required="true"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Email <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
            placeholder="your@email.com"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
            Phone
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
            placeholder="+66..."
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">
          Message <span aria-hidden="true">*</span>
          <span className="sr-only">(required)</span>
        </label>
        <textarea
          id="contact-message"
          required
          minLength={10}
          rows={5}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          placeholder="How can we help you?"
          aria-required="true"
          aria-describedby="contact-message-hint"
        />
        <p id="contact-message-hint" className="sr-only">Please write at least 10 characters describing your inquiry</p>
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
      <button
        type="submit"
        disabled={submitting}
        aria-label={submitting ? "Sending inquiry..." : "Send inquiry"}
        className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70"
      >
        {submitting ? "Submitting" : "Send Inquiry"}
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
