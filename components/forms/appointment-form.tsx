"use client";

import { useState } from "react";

export function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "Showroom Visit",
    preferredDate: "",
    preferredTime: "",
    notes: "",
    website: "",
  });
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setStatus({ type: "error", message: payload.message ?? "Unable to submit appointment" });
        return;
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        consultationType: "Showroom Visit",
        preferredDate: "",
        preferredTime: "",
        notes: "",
        website: "",
      });
      setStatus({ type: "success", message: "Appointment request received." });
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
          <label htmlFor="appointment-name" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Name</label>
          <input id="appointment-name" required value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="appointment-email" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Email</label>
          <input id="appointment-email" type="email" required value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="appointment-phone" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Phone</label>
          <input id="appointment-phone" value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="appointment-date" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Preferred Date</label>
          <input id="appointment-date" type="date" value={form.preferredDate} onChange={(event) => setForm((prev) => ({ ...prev, preferredDate: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
        <div>
          <label htmlFor="appointment-time" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Preferred Time</label>
          <input id="appointment-time" placeholder="14:00" value={form.preferredTime} onChange={(event) => setForm((prev) => ({ ...prev, preferredTime: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
        </div>
      </div>

      <div>
        <label htmlFor="appointment-type" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Consultation Type</label>
        <select id="appointment-type" value={form.consultationType} onChange={(event) => setForm((prev) => ({ ...prev, consultationType: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]">
          <option>Showroom Visit</option>
          <option>Video Consultation</option>
          <option>Diamond Sourcing</option>
          <option>Custom Design</option>
        </select>
      </div>

      <div>
        <label htmlFor="appointment-notes" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase mb-2">Notes</label>
        <textarea id="appointment-notes" rows={4} value={form.notes} onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))} className="w-full bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]" />
      </div>

      <input type="text" value={form.website} onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))} autoComplete="off" tabIndex={-1} aria-hidden="true" className="hidden" />

      <button type="submit" disabled={submitting} className="px-7 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70">
        {submitting ? "Submitting" : "Request Appointment"}
      </button>

      {status.type !== "idle" ? (
        <p className={`text-sm ${status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]"}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
