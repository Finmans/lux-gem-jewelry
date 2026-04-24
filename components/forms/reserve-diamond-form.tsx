"use client";

import { useState } from "react";

export function ReserveDiamondForm({ diamondId }: { diamondId: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "Please reserve this diamond for consultation.",
    website: "",
  });
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

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
          type: "RESERVE_DIAMOND",
          sourcePage: `/diamonds/${diamondId}`,
          diamondId,
        }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setStatus({ type: "error", message: payload.message ?? "Unable to submit reserve request" });
        return;
      }

      setForm({ name: "", email: "", phone: "", message: "Please reserve this diamond for consultation.", website: "" });
      setStatus({ type: "success", message: "Reserve request submitted. We will contact you shortly." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-[#1A1A1E] bg-[#0D0D10] p-5 space-y-3" noValidate aria-label="Reserve diamond form">
      <p className="text-xs tracking-[0.2em] text-[#C6A878] uppercase" id="reserve-form-title">Reserve This Diamond</p>

      <div>
        <label htmlFor="reserve-name" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-1">
          Name <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
        </label>
        <input
          id="reserve-name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          aria-required="true"
          aria-describedby="reserve-form-title"
        />
      </div>

      <div>
        <label htmlFor="reserve-email" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-1">
          Email <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
        </label>
        <input
          id="reserve-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="reserve-phone" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-1">
          Phone
        </label>
        <input
          id="reserve-phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="reserve-message" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-1">
          Message
        </label>
        <textarea
          id="reserve-message"
          rows={3}
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8] placeholder:text-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/50 transition-colors"
          aria-describedby="reserve-message-hint"
        />
        <p id="reserve-message-hint" className="sr-only">Optionally add a message about your interest in this diamond</p>
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
        aria-label={submitting ? "Submitting reserve request..." : "Submit reserve request"}
        className="w-full px-4 py-2.5 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.22em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70"
      >
        {submitting ? "Submitting" : "Submit Reserve Request"}
      </button>

      <div role="status" aria-live="polite" aria-atomic="true">
        {status.type !== "idle" ? (
          <p className={`text-xs ${status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
