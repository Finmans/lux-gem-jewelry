"use client";

import { useState } from "react";

type VerifyResult = {
  ok: boolean;
  found?: boolean;
  record?: {
    certificateNumber: string;
    lab: string;
    notes?: string | null;
    diamond?: {
      id: string;
      shape: string;
      carat: number;
      color: string;
      clarity: string;
      cut: string;
    } | null;
  };
  message?: string;
};

export function CertificateVerifyForm() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/certificates?number=${encodeURIComponent(number.trim())}`);
      const payload = (await response.json()) as VerifyResult;
      setResult(payload);
    } catch {
      setResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-[#1A1A1E] bg-[#0D0D10] p-6">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label htmlFor="certificate-number" className="block text-xs tracking-[0.2em] text-[#8A8F98] uppercase">
          Certificate Number
        </label>
        <div className="flex gap-2">
          <input
            id="certificate-number"
            required
            value={number}
            onChange={(event) => setNumber(event.target.value)}
            placeholder="e.g. 2387654321"
            className="flex-1 bg-[#111115] border border-[#2A2A30] px-4 py-3 text-sm text-[#F6F1E8]"
          />
          <button type="submit" disabled={loading} className="px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.2em] uppercase disabled:opacity-70">
            {loading ? "Checking" : "Verify"}
          </button>
        </div>
      </form>

      {result ? (
        <div className="mt-5 border-t border-[#1A1A1E] pt-4">
          {!result.ok ? (
            <p className="text-sm text-[#d98f8f]">{result.message ?? "Unable to verify."}</p>
          ) : !result.found ? (
            <p className="text-sm text-[#8A8F98]">No certificate record was found.</p>
          ) : (
            <div className="space-y-2 text-sm text-[#8A8F98]">
              <p><span className="text-[#F6F1E8]">Certificate:</span> {result.record?.certificateNumber}</p>
              <p><span className="text-[#F6F1E8]">Lab:</span> {result.record?.lab}</p>
              {result.record?.diamond ? (
                <p>
                  <span className="text-[#F6F1E8]">Diamond:</span> {result.record.diamond.id} · {result.record.diamond.carat}ct {result.record.diamond.shape} · {result.record.diamond.color} {result.record.diamond.clarity}
                </p>
              ) : null}
              {result.record?.notes ? <p><span className="text-[#F6F1E8]">Notes:</span> {result.record.notes}</p> : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
