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
      setStatus({ type: "success", message: "Reserve request submitted." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-[#1A1A1E] bg-[#0D0D10] p-5 space-y-3" noValidate>
      <p className="text-xs tracking-[0.2em] text-[#C6A878] uppercase">Reserve This Diamond</p>
      <input required placeholder="Name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8]" />
      <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8]" />
      <input placeholder="Phone" value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8]" />
      <textarea rows={3} value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2 text-sm text-[#F6F1E8]" />
      <input type="text" value={form.website} onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))} autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />
      <button type="submit" disabled={submitting} className="w-full px-4 py-2.5 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.22em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70">
        {submitting ? "Submitting" : "Submit Reserve Request"}
      </button>
      {status.type !== "idle" ? (
        <p className={`text-xs ${status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
