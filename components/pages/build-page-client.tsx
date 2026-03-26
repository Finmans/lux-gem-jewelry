"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Phone } from "lucide-react";
import type { DiamondRecord, SettingRecord } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Choose Diamond", sublabel: "เลือกเพชร" },
  { id: 2, label: "Choose Setting", sublabel: "เลือกตัวเรือน" },
  { id: 3, label: "Review & Submit", sublabel: "ตรวจสอบและส่งคำขอ" },
];

const craftsmanshipTHB = 35000;

const shapeIcons: Record<string, string> = {
  Round: "◯",
  Oval: "⬭",
  Cushion: "▣",
  Emerald: "▬",
  Princess: "◻",
  Pear: "⊙",
  Radiant: "◈",
  Marquise: "◇",
  Heart: "♡",
  Asscher: "⊠",
};

type BuildPageClientProps = {
  diamonds: DiamondRecord[];
  settings: SettingRecord[];
  preselectedDiamondId?: string;
};

type SubmitStatus = {
  type: "idle" | "success" | "error";
  message: string;
  referenceCode?: string;
};

const initialStatus: SubmitStatus = { type: "idle", message: "" };

export function BuildPageClient({ diamonds, settings, preselectedDiamondId }: BuildPageClientProps) {
  const initialDiamondId = preselectedDiamondId && diamonds.some((diamond) => diamond.id === preselectedDiamondId)
    ? preselectedDiamondId
    : null;

  const [step, setStep] = useState(1);
  const [selectedDiamond, setSelectedDiamond] = useState<string | null>(initialDiamondId);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<string>("");
  const [ringSize, setRingSize] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [status, setStatus] = useState<SubmitStatus>(initialStatus);
  const [submitting, setSubmitting] = useState(false);

  const diamond = useMemo(
    () => diamonds.find((row) => row.id === selectedDiamond) ?? null,
    [diamonds, selectedDiamond]
  );
  const setting = useMemo(
    () => settings.find((row) => row.id === selectedSetting) ?? null,
    [settings, selectedSetting]
  );

  const availableMetals = setting?.metals ?? [];
  const selectedMetalValue = availableMetals.includes(selectedMetal)
    ? selectedMetal
    : availableMetals[0] ?? "";

  const totalTHB = (diamond?.priceTHB ?? 0) + (setting?.priceAddTHB ?? 0) + craftsmanshipTHB;

  function selectDiamond(diamondId: string) {
    setSelectedDiamond(diamondId);
    setStatus(initialStatus);
  }

  function selectSetting(settingId: string) {
    const picked = settings.find((row) => row.id === settingId);
    setSelectedSetting(settingId);
    setSelectedMetal(picked?.metals[0] ?? "");
    setStatus(initialStatus);
  }

  async function submitBuildRequest() {
    if (!diamond || !setting || !selectedMetalValue) {
      setStatus({ type: "error", message: "Please complete your ring configuration before submitting." });
      return;
    }

    if (!customerName || !customerEmail) {
      setStatus({ type: "error", message: "Please provide your name and email." });
      return;
    }

    setSubmitting(true);
    setStatus(initialStatus);

    try {
      const response = await fetch("/api/build-drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          diamondId: diamond.id,
          settingId: setting.id,
          selectedMetal: selectedMetalValue,
          ringSize,
          notes,
          estimatedPriceTHB: totalTHB,
          website,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        referenceCode?: string;
      };

      if (!response.ok || !payload.ok) {
        setStatus({ type: "error", message: payload.message ?? "Unable to submit your ring request right now." });
        return;
      }

      setStatus({
        type: "success",
        message: "Your build request has been submitted. Our concierge team will contact you shortly.",
        referenceCode: payload.referenceCode,
      });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <div className="border-b border-[#1A1A1E] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-3">Ring Builder</p>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-[#F6F1E8]">Build Your Ring</h1>
          <p className="text-sm text-[#8A8F98] mt-3 max-w-3xl font-light">
            Consultation-first commissioning. Configure your diamond and setting, then submit for confirmation.
          </p>
        </div>
      </div>

      <div className="border-b border-[#1A1A1E] py-5 sticky top-20 bg-[#0B0B0D]/95 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-0">
            {steps.map((current, index) => (
              <div key={current.id} className="flex items-center">
                <button
                  onClick={() => {
                    if (current.id === 2 && !selectedDiamond) {
                      return;
                    }
                    if (current.id === 3 && (!selectedDiamond || !selectedSetting)) {
                      return;
                    }
                    setStep(current.id);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2 transition-all duration-300",
                    step === current.id
                      ? "text-[#C6A878]"
                      : step > current.id
                        ? "text-[#8A8F98] hover:text-[#F6F1E8] cursor-pointer"
                        : "text-[#8A8F98]/40 cursor-not-allowed"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 border flex items-center justify-center shrink-0",
                      step === current.id
                        ? "border-[#C6A878] bg-[#C6A878]/10"
                        : step > current.id
                          ? "border-[#8A8F98]/50 bg-[#C6A878] text-[#0B0B0D]"
                          : "border-[#2A2A30]"
                    )}
                  >
                    {step > current.id ? <Check className="w-3 h-3" /> : <span className="text-[10px]">{current.id}</span>}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-[11px] tracking-[0.15em] uppercase leading-none">{current.label}</p>
                    <p className="text-[9px] text-[#8A8F98]/60 mt-0.5">{current.sublabel}</p>
                  </div>
                </button>
                {index < steps.length - 1 ? <div className="w-10 sm:w-16 h-px bg-[#1A1A1E] mx-1" /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 1 ? (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
              <div>
                <h2 className="font-display text-3xl font-light text-[#F6F1E8]">Choose Your Diamond</h2>
                <p className="text-sm text-[#8A8F98] mt-1 font-light">Select from live certified inventory.</p>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDiamond}
                className="flex items-center gap-2 px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-50"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              {diamonds.map((row) => (
                <button
                  key={row.id}
                  onClick={() => selectDiamond(row.id)}
                  className={cn(
                    "w-full text-left grid grid-cols-[50px_1fr_80px_70px_80px_80px_130px] gap-4 px-5 py-4 border transition-all duration-300 items-center",
                    selectedDiamond === row.id
                      ? "border-[#C6A878] bg-[#C6A878]/5"
                      : "border-[#1A1A1E] hover:border-[#C6A878]/30 hover:bg-[#111115]"
                  )}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xl text-[#C6A878]/80">{shapeIcons[row.shape] ?? "◇"}</span>
                    <span className="text-[8px] text-[#8A8F98]/60">{row.shape}</span>
                  </div>
                  <div>
                    <p className="text-sm text-[#F6F1E8] font-light">{row.carat}ct {row.shape}</p>
                    <p className="text-[10px] text-[#8A8F98] font-mono mt-0.5">#{row.certificate}</p>
                  </div>
                  <p className="text-sm text-[#F6F1E8] font-light">{row.color}</p>
                  <p className="text-sm text-[#C6A878] font-light">{row.clarity}</p>
                  <p className="text-xs text-[#8A8F98]">{row.cut}</p>
                  <p className="text-xs text-[#8A8F98]">{row.lab}</p>
                  <p className="text-sm text-[#C6A878] font-light text-right">฿{row.priceTHB.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}

        {step === 2 ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#8A8F98] uppercase hover:text-[#C6A878] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div>
                <h2 className="font-display text-3xl font-light text-[#F6F1E8]">Choose Your Setting</h2>
                <p className="text-sm text-[#8A8F98] mt-1 font-light">Pick a setting style and preferred metal.</p>
              </div>
            </div>

            {selectedSetting ? (
              <div className="mb-8">
                <p className="text-[9px] tracking-[0.3em] text-[#8A8F98] uppercase mb-3">Metal</p>
                <div className="flex flex-wrap gap-2">
                  {availableMetals.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={cn(
                        "px-5 py-2.5 text-[10px] tracking-[0.15em] uppercase border transition-all",
                        selectedMetalValue === metal
                          ? "border-[#C6A878] bg-[#C6A878]/10 text-[#C6A878]"
                          : "border-[#1A1A1E] text-[#8A8F98] hover:border-[#2A2A30]"
                      )}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.map((row) => (
                <button
                  key={row.id}
                  onClick={() => selectSetting(row.id)}
                  className={cn(
                    "text-left border p-6 transition-all duration-300 hover:border-[#C6A878]/40",
                    selectedSetting === row.id
                      ? "border-[#C6A878] bg-[#C6A878]/5"
                      : "border-[#1A1A1E]"
                  )}
                >
                  <div className="h-28 flex items-center justify-center mb-4 bg-[#080809]">
                    <div className="w-10 h-10 border border-[#C6A878]/40 rotate-45" />
                  </div>
                  <h3 className="font-display text-lg font-light text-[#F6F1E8] mb-1">{row.name}</h3>
                  {row.description ? <p className="text-xs text-[#8A8F98] mb-2">{row.description}</p> : null}
                  <p className="text-[9px] text-[#8A8F98] mb-3">Available in: {row.metals.join(" · ")}</p>
                  <p className="text-sm text-[#C6A878] font-light">
                    {row.priceAddTHB === 0 ? "Included" : `+฿${row.priceAddTHB.toLocaleString()}`}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setStep(3)}
                disabled={!selectedSetting}
                className="flex items-center gap-2 px-8 py-4 bg-[#C6A878] text-[#0B0B0D] text-[11px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-50"
              >
                Review Request <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === 3 && diamond && setting ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#8A8F98] uppercase hover:text-[#C6A878] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <h2 className="font-display text-3xl font-light text-[#F6F1E8]">Review & Submit</h2>
            </div>

            <div className="border border-[#1A1A1E] divide-y divide-[#1A1A1E]">
              <div className="p-5">
                <p className="text-[9px] tracking-[0.3em] text-[#C6A878] uppercase mb-3">Diamond</p>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <p className="text-sm text-[#F6F1E8] font-light">{diamond.carat}ct {diamond.shape} · {diamond.color} / {diamond.clarity} / {diamond.cut}</p>
                    <p className="text-[10px] text-[#8A8F98] mt-0.5">{diamond.lab} #{diamond.certificate}</p>
                  </div>
                  <p className="text-sm text-[#C6A878]">฿{diamond.priceTHB.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[9px] tracking-[0.3em] text-[#C6A878] uppercase mb-3">Setting</p>
                <div className="flex justify-between items-center gap-3">
                  <div>
                    <p className="text-sm text-[#F6F1E8] font-light">{setting.name}</p>
                    <p className="text-[10px] text-[#8A8F98] mt-0.5">{selectedMetalValue}</p>
                  </div>
                  <p className="text-sm text-[#C6A878]">{setting.priceAddTHB === 0 ? "Included" : `฿${setting.priceAddTHB.toLocaleString()}`}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[9px] tracking-[0.3em] text-[#C6A878] uppercase mb-3">Craftsmanship</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-[#F6F1E8] font-light">Handcrafting & Finishing</p>
                  <p className="text-sm text-[#C6A878]">฿{craftsmanshipTHB.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-5 bg-[#111115]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#F6F1E8] font-light">Total Estimate</p>
                    <p className="text-[9px] text-[#8A8F98] mt-0.5">Final confirmation after concierge review.</p>
                  </div>
                  <p className="font-display text-2xl font-light text-[#C6A878]">฿{totalTHB.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border border-[#1A1A1E] bg-[#0D0D10] p-5 space-y-4">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#C6A878]">Contact Details</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Name"
                  className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2.5 text-sm text-[#F6F1E8]"
                />
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(event) => setCustomerEmail(event.target.value)}
                  placeholder="Email"
                  className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2.5 text-sm text-[#F6F1E8]"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={customerPhone}
                  onChange={(event) => setCustomerPhone(event.target.value)}
                  placeholder="Phone"
                  className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2.5 text-sm text-[#F6F1E8]"
                />
                <input
                  value={ringSize}
                  onChange={(event) => setRingSize(event.target.value)}
                  placeholder="Ring size (optional)"
                  className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2.5 text-sm text-[#F6F1E8]"
                />
              </div>
              <textarea
                rows={4}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Special notes, timeline, or preferences"
                className="w-full bg-[#111115] border border-[#2A2A30] px-3 py-2.5 text-sm text-[#F6F1E8]"
              />
              <input
                type="text"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={submitBuildRequest}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C6A878] text-[#0B0B0D] text-[11px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors disabled:opacity-70"
                >
                  {submitting ? "Submitting" : "Submit Ring Request"}
                </button>
                <Link
                  href="/appointment"
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-[#C6A878]/40 text-[#C6A878] text-[10px] tracking-[0.25em] uppercase hover:bg-[#C6A878]/8 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Book Consultation
                </Link>
              </div>

              {status.type !== "idle" ? (
                <div className={cn("text-sm", status.type === "success" ? "text-[#C6A878]" : "text-[#d98f8f]")}>
                  <p>{status.message}</p>
                  {status.referenceCode ? <p className="mt-1 text-xs">Reference: {status.referenceCode}</p> : null}
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </div>
    </main>
  );
}
