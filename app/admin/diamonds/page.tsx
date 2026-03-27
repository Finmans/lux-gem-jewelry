"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight,
  X, ChevronUp, ChevronDown, Gem, RefreshCw, Check,
  Upload, ImageOff, Camera, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────

type DiamondLab = "IGI";

type Diamond = {
  id: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  lab: DiamondLab;
  certificateNumber: string;
  priceTHB: number;
  priceUSD: number;
  available: boolean;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

type DiamondFormData = Omit<Diamond, "id" | "createdAt" | "updatedAt">;

// ── Constants ─────────────────────────────────────────────

const SHAPES = [
  "Round","Oval","Cushion","Princess","Emerald",
  "Pear","Radiant","Marquise","Asscher","Heart",
];
const COLORS    = ["D","E","F","G","H","I","J"];
const CLARITIES = ["IF","VVS1","VVS2","VS1","VS2","SI1","SI2"];
const GRADES    = ["Excellent","Very Good","Good","Fair"];
const FLUORS    = ["None","Faint","Medium","Strong","Very Strong"];
const LABS: DiamondLab[] = ["IGI"];

const SHAPE_ICON: Record<string, string> = {
  Round:"◯",Oval:"⬭",Cushion:"⬜",Princess:"◻",
  Emerald:"▬",Pear:"◖",Radiant:"⬡",Marquise:"◈",
  Asscher:"⬛",Heart:"♥",
};

const EMPTY_FORM: DiamondFormData = {
  shape: "Round",
  carat: 1.00,
  color: "D",
  clarity: "VVS1",
  cut: "Excellent",
  polish: "Excellent",
  symmetry: "Excellent",
  fluorescence: "None",
  lab: "IGI",
  certificateNumber: "",
  priceTHB: 0,
  priceUSD: 0,
  available: true,
  imageUrl: null,
};

type SortKey = keyof Diamond;
type SortDir = "asc" | "desc";

// ── Shared styles ─────────────────────────────────────────

const inputCls =
  "w-full bg-[#0d1117] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 placeholder-[#8A8F98]/50 transition-colors";

// ── Sub-components ────────────────────────────────────────

function Badge({ children, green }: { children: React.ReactNode; green: boolean }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
      green ? "bg-[#6dd9a8]/10 text-[#6dd9a8]" : "bg-[#f87171]/10 text-[#f87171]"
    )}>
      {green ? <Check size={9} /> : <X size={9} />}
      {children}
    </span>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0d1117]">{o}</option>
      ))}
    </select>
  );
}

// ── Image Upload Zone ──────────────────────────────────────

interface ImageUploadZoneProps {
  imageUrl: string | null;
  onUpload: (url: string) => void;
  onRemove: () => void;
}

function ImageUploadZone({ imageUrl, onUpload, onRemove }: ImageUploadZoneProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const doUpload = useCallback(async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || json.error) {
        setError(json.error ?? "Upload failed");
      } else {
        onUpload(json.url);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    doUpload(files[0]);
  }, [doUpload]);

  return (
    <div className="col-span-2">
      <FormField label="Diamond Photo">
        <div className="flex gap-4 items-start">
          {/* Preview */}
          <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0d1117] flex-shrink-0 flex items-center justify-center">
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt="Diamond"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={onRemove}
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/70 hover:bg-[#f87171]/80 flex items-center justify-center transition-colors"
                  title="Remove image"
                >
                  <X size={10} className="text-white" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1 text-[#8A8F98]/40">
                <ImageOff size={24} />
                <span className="text-[9px]">No image</span>
              </div>
            )}
          </div>

          {/* Drop zone */}
          <div
            className={cn(
              "flex-1 h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all",
              dragOver
                ? "border-[#C6A878]/60 bg-[#C6A878]/5"
                : "border-white/[0.10] hover:border-[#C6A878]/30 hover:bg-white/[0.02]"
            )}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            {uploading ? (
              <>
                <RefreshCw size={18} className="text-[#C6A878] animate-spin" />
                <span className="text-xs text-[#8A8F98]">Uploading…</span>
              </>
            ) : (
              <>
                <Camera size={18} className="text-[#8A8F98]/60" />
                <span className="text-xs text-[#8A8F98]">
                  <span className="text-[#C6A878]">Click to upload</span> or drag &amp; drop
                </span>
                <span className="text-[10px] text-[#8A8F98]/50">JPG, PNG, WEBP</span>
              </>
            )}
          </div>
        </div>
        {error && (
          <p className="mt-1.5 text-[11px] text-[#f87171]">{error}</p>
        )}
      </FormField>
    </div>
  );
}

// ── Inline Upload Zone (used directly in modal header) ────
function UploadZoneInline({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver]   = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [done, setDone]           = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const doUpload = useCallback(async (file: File) => {
    setUploading(true); setError(null); setDone(false);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || json.error) { setError(json.error ?? "Upload failed"); }
      else { onUpload(json.url); setDone(true); }
    } catch (e) { setError(String(e)); }
    finally { setUploading(false); }
  }, [onUpload]);

  return (
    <div className="flex-1 flex flex-col">
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); doUpload(e.dataTransfer.files[0]); }}
        className={cn(
          "flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all select-none",
          dragOver   ? "border-[#C6A878] bg-[#C6A878]/10 scale-[1.01]" :
          done       ? "border-[#6dd9a8]/60 bg-[#6dd9a8]/5" :
                       "border-[#C6A878]/30 hover:border-[#C6A878]/70 hover:bg-[#C6A878]/5"
        )}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && doUpload(e.target.files[0])} />

        {uploading ? (
          <>
            <RefreshCw size={22} className="text-[#C6A878] animate-spin" />
            <span className="text-sm text-[#8A8F98]">กำลังอัปโหลด...</span>
          </>
        ) : done ? (
          <>
            <Check size={22} className="text-[#6dd9a8]" />
            <span className="text-sm text-[#6dd9a8] font-medium">อัปโหลดสำเร็จ!</span>
            <span className="text-[11px] text-[#8A8F98]">คลิกเพื่อเปลี่ยนรูป</span>
          </>
        ) : (
          <>
            <Upload size={22} className="text-[#C6A878]" />
            <div className="text-center">
              <p className="text-sm font-medium text-[#C6A878]">คลิกเพื่อเลือกรูป</p>
              <p className="text-xs text-[#8A8F98] mt-0.5">หรือลากรูปมาวางตรงนี้</p>
            </div>
            <span className="text-[10px] text-[#8A8F98]/50 tracking-wider">JPG · PNG · WEBP</span>
          </>
        )}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-[#f87171]">⚠ {error}</p>}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────

interface ModalProps {
  mode: "add" | "edit";
  form: DiamondFormData;
  onChange: (k: keyof DiamondFormData, v: unknown) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}

function DiamondModal({ mode, form, onChange, onSave, onClose, saving }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-[#0b0d13] border border-white/[0.08] rounded-2xl shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C6A878]/10 flex items-center justify-center">
              <Gem size={14} className="text-[#C6A878]" />
            </div>
            <h2 className="font-serif text-lg text-[#F6F1E8]">
              {mode === "add" ? "Add Diamond" : "Edit Diamond"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8A8F98] hover:text-[#e8e4dc] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Image Upload — TOP of modal, full width, impossible to miss ── */}
        <div className="px-6 pt-5 pb-4 border-b border-white/[0.06] bg-white/[0.01]">
          <p className="text-[10px] tracking-[0.14em] uppercase text-[#C6A878] mb-3 flex items-center gap-2">
            <Camera size={11} /> อัปโหลดรูปเพชร / Diamond Photo
          </p>
          <div className="flex gap-4 items-stretch">
            {/* Preview box */}
            <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-white/[0.10] bg-[#0d1117] flex-shrink-0 flex items-center justify-center">
              {(form.imageUrl) ? (
                <>
                  <Image src={form.imageUrl} alt="Diamond" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => onChange("imageUrl", "")}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/80 hover:bg-[#f87171] flex items-center justify-center transition-colors"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-[#8A8F98]/40">
                  <Gem size={28} />
                  <span className="text-[9px] tracking-wider">NO PHOTO</span>
                </div>
              )}
            </div>

            {/* Big drop zone */}
            <UploadZoneInline
              onUpload={(url) => onChange("imageUrl", url)}
            />
          </div>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-2 gap-4">
          {/* Shape */}
          <FormField label="Shape">
            <SelectField
              value={form.shape}
              onChange={(v) => onChange("shape", v)}
              options={SHAPES}
            />
          </FormField>

          {/* Carat */}
          <FormField label="Carat Weight">
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={form.carat}
              onChange={(e) => onChange("carat", parseFloat(e.target.value) || 0)}
              className={inputCls}
              placeholder="1.00"
            />
          </FormField>

          {/* Color */}
          <FormField label="Color Grade">
            <SelectField value={form.color} onChange={(v) => onChange("color", v)} options={COLORS} />
          </FormField>

          {/* Clarity */}
          <FormField label="Clarity Grade">
            <SelectField value={form.clarity} onChange={(v) => onChange("clarity", v)} options={CLARITIES} />
          </FormField>

          {/* Cut */}
          <FormField label="Cut Grade">
            <SelectField value={form.cut} onChange={(v) => onChange("cut", v)} options={GRADES} />
          </FormField>

          {/* Polish */}
          <FormField label="Polish">
            <SelectField value={form.polish} onChange={(v) => onChange("polish", v)} options={GRADES} />
          </FormField>

          {/* Symmetry */}
          <FormField label="Symmetry">
            <SelectField value={form.symmetry} onChange={(v) => onChange("symmetry", v)} options={GRADES} />
          </FormField>

          {/* Fluorescence */}
          <FormField label="Fluorescence">
            <SelectField value={form.fluorescence} onChange={(v) => onChange("fluorescence", v)} options={FLUORS} />
          </FormField>

          {/* Lab */}
          <FormField label="Certification Lab">
            <SelectField
              value={form.lab}
              onChange={(v) => onChange("lab", v as DiamondLab)}
              options={LABS}
            />
          </FormField>

          {/* Certificate Number */}
          <FormField label="Certificate No.">
            <input
              type="text"
              value={form.certificateNumber}
              onChange={(e) => onChange("certificateNumber", e.target.value)}
              className={inputCls}
              placeholder="e.g. 2387654321"
            />
          </FormField>

          {/* Price THB */}
          <FormField label="Price (THB)">
            <input
              type="number"
              step="1000"
              min="0"
              value={form.priceTHB}
              onChange={(e) => onChange("priceTHB", parseInt(e.target.value) || 0)}
              className={inputCls}
              placeholder="0"
            />
          </FormField>

          {/* Price USD */}
          <FormField label="Price (USD)">
            <input
              type="number"
              step="100"
              min="0"
              value={form.priceUSD}
              onChange={(e) => onChange("priceUSD", parseInt(e.target.value) || 0)}
              className={inputCls}
              placeholder="0"
            />
          </FormField>

          {/* Available */}
          <div className="col-span-2">
            <FormField label="Availability">
              <button
                type="button"
                onClick={() => onChange("available", !form.available)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all",
                  form.available
                    ? "bg-[#6dd9a8]/10 border-[#6dd9a8]/20 text-[#6dd9a8]"
                    : "bg-[#f87171]/10 border-[#f87171]/20 text-[#f87171]"
                )}
              >
                {form.available ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                {form.available ? "In Stock — Available for purchase" : "Out of Stock / Sold"}
              </button>
            </FormField>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#e8e4dc] hover:bg-white/[0.05] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#C6A878] hover:bg-[#d4b98a] text-[#0b0d13] text-sm font-medium transition-all disabled:opacity-60"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
            {mode === "add" ? "Add Diamond" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Image Lightbox ─────────────────────────────────────────

function Lightbox({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white transition-colors"
      >
        <X size={18} />
      </button>
      <div
        className="relative max-w-2xl max-h-[80vh] w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/[0.10] shadow-2xl">
          <Image src={url} alt={name} fill className="object-contain" unoptimized />
        </div>
        <p className="mt-3 text-center text-sm text-[#8A8F98] font-serif">{name}</p>
      </div>
    </div>
  );
}

// ── Loading Skeleton ───────────────────────────────────────

function TableSkeleton() {
  return (
    <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/[0.04] flex gap-3">
        {[120, 80, 60, 60, 80].map((w, i) => (
          <div key={i} className={`h-4 rounded bg-white/[0.04] animate-pulse`} style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-white/[0.03] flex gap-3 items-center">
          <div className="w-8 h-8 rounded bg-white/[0.04] animate-pulse flex-shrink-0" />
          {[80, 60, 40, 40, 70, 50, 60, 60].map((w, j) => (
            <div key={j} className="h-3 rounded bg-white/[0.04] animate-pulse" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────

export default function DiamondStockPage() {
  const [rows, setRows] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterShape, setFilterShape] = useState("All");
  const [filterLab, setFilterLab] = useState("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "In Stock" | "Sold">("All");

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Modal
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<DiamondFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Lightbox
  const [lightbox, setLightbox] = useState<{ url: string; name: string } | null>(null);

  // ── Fetch ───────────────────────────────────────────────
  const fetchDiamonds = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/admin/diamonds");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Diamond[] = await res.json();
      setRows(data);
    } catch (e) {
      setFetchError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiamonds();
  }, [fetchDiamonds]);

  // ── Derived rows ────────────────────────────────────────
  const filtered = useMemo(() => {
    let d = [...rows];
    if (search)
      d = d.filter((r) =>
        [r.id, r.shape, r.color, r.clarity, r.cut, r.lab, r.certificateNumber]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    if (filterShape !== "All") d = d.filter((r) => r.shape === filterShape);
    if (filterLab !== "All")   d = d.filter((r) => r.lab === filterLab);
    if (filterStatus === "In Stock") d = d.filter((r) => r.available);
    if (filterStatus === "Sold")     d = d.filter((r) => !r.available);

    d.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      const dir = sortDir === "asc" ? 1 : -1;
      // handle nulls
      if (av == null) return dir;
      if (bv == null) return -dir;
      return av > bv ? dir : -dir;
    });
    return d;
  }, [rows, search, filterShape, filterLab, filterStatus, sortKey, sortDir]);

  // ── Stats ───────────────────────────────────────────────
  const inStock    = rows.filter((r) => r.available).length;
  const totalValue = rows.filter((r) => r.available).reduce((s, r) => s + r.priceTHB, 0);

  // ── Handlers ────────────────────────────────────────────
  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setModal("add");
  }

  function openEdit(d: Diamond) {
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = d;
    setForm(rest);
    setEditId(d.id);
    setModal("edit");
  }

  function handleFormChange(k: keyof DiamondFormData, v: unknown) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...form, imageUrl: form.imageUrl || null };
      let res: Response;
      if (modal === "add") {
        res = await fetch("/api/admin/diamonds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/diamonds/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (res.ok) {
        await fetchDiamonds();
        setModal(null);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id: string) {
    const diamond = rows.find((r) => r.id === id);
    if (!diamond) return;
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = diamond;
    await fetch(`/api/admin/diamonds/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...rest, available: !diamond.available }),
    });
    setRows((prev) => prev.map((r) => r.id === id ? { ...r, available: !r.available } : r));
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      await fetch(`/api/admin/diamonds/${id}`, { method: "DELETE" });
      setRows((prev) => prev.filter((r) => r.id !== id));
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  }

  // ── Sort Icon ────────────────────────────────────────────
  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={11} className="opacity-20" />;
    return sortDir === "asc"
      ? <ChevronUp size={11} className="text-[#C6A878]" />
      : <ChevronDown size={11} className="text-[#C6A878]" />;
  }

  // ── Table columns ────────────────────────────────────────
  const cols: [SortKey, string][] = [
    ["id",        "ID"],
    ["shape",     "Shape"],
    ["carat",     "Carat"],
    ["color",     "Color"],
    ["clarity",   "Clarity"],
    ["cut",       "Cut"],
    ["lab",       "Lab"],
    ["priceTHB",  "Price (THB)"],
    ["available", "Status"],
  ];

  return (
    <div className="p-8">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-[#F6F1E8] tracking-wide">Diamond Stock</h1>
          <p className="text-[#8A8F98] text-sm mt-1">
            Manage diamond inventory with real-time database sync
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchDiamonds}
            disabled={loading}
            className="w-9 h-9 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] flex items-center justify-center text-[#8A8F98] hover:text-[#e8e4dc] transition-all disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C6A878] hover:bg-[#d4b98a] text-[#0b0d13] text-sm font-medium transition-all"
          >
            <Plus size={15} />
            Add Diamond
          </button>
        </div>
      </div>

      {/* ── Stats Bar ───────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Diamonds", value: rows.length, color: "text-[#e8e4dc]" },
          { label: "In Stock", value: inStock, color: "text-[#6dd9a8]" },
          { label: "Stock Value (THB)", value: `฿${totalValue.toLocaleString()}`, color: "text-[#C6A878]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0d1117] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] mb-1">{label}</p>
            <p className={cn("text-2xl font-serif", color)}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID, shape, color, certificate…"
            className="w-full pl-9 pr-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] placeholder-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/40 transition-colors"
          />
        </div>

        <select
          value={filterShape}
          onChange={(e) => setFilterShape(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          <option value="All" className="bg-[#0d1117]">All Shapes</option>
          {SHAPES.map((s) => <option key={s} value={s} className="bg-[#0d1117]">{s}</option>)}
        </select>

        <select
          value={filterLab}
          onChange={(e) => setFilterLab(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          <option value="All" className="bg-[#0d1117]">All Labs</option>
          {LABS.map((l) => <option key={l} value={l} className="bg-[#0d1117]">{l}</option>)}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "All" | "In Stock" | "Sold")}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          {["All", "In Stock", "Sold"].map((s) => (
            <option key={s} value={s} className="bg-[#0d1117]">{s}</option>
          ))}
        </select>

        {(search || filterShape !== "All" || filterLab !== "All" || filterStatus !== "All") && (
          <button
            onClick={() => {
              setSearch(""); setFilterShape("All");
              setFilterLab("All"); setFilterStatus("All");
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#f87171] hover:bg-[#f87171]/10 border border-white/[0.06] transition-all"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* ── Error state ──────────────────────────────────────── */}
      {fetchError && (
        <div className="mb-4 px-4 py-3 bg-[#f87171]/10 border border-[#f87171]/20 rounded-lg text-sm text-[#f87171]">
          Failed to load diamonds: {fetchError}
        </div>
      )}

      {/* ── Table ────────────────────────────────────────────── */}
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[1000px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {/* Image column */}
                  <th className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal w-14">
                    <Upload size={11} className="inline opacity-60" />
                  </th>
                  {cols.map(([key, label]) => (
                    <th
                      key={key}
                      onClick={() => toggleSort(key)}
                      className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal cursor-pointer hover:text-[#C6A878] transition-colors select-none"
                    >
                      <span className="inline-flex items-center gap-1">
                        {label}
                        <SortIcon k={key} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={cols.length + 2} className="text-center py-16 text-[#8A8F98] text-sm">
                      <Gem size={24} className="mx-auto mb-3 opacity-20" />
                      No diamonds match your filters
                    </td>
                  </tr>
                ) : (
                  filtered.map((d, i) => (
                    <tr
                      key={d.id}
                      className={cn(
                        "border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors group",
                        i % 2 === 0 ? "" : "bg-white/[0.01]"
                      )}
                    >
                      {/* Thumbnail */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => d.imageUrl && setLightbox({ url: d.imageUrl, name: `${d.shape} ${d.carat}ct ${d.color} ${d.clarity}` })}
                          className={cn(
                            "relative w-10 h-10 rounded-lg overflow-hidden border border-white/[0.06] bg-[#0B0B0D] flex items-center justify-center flex-shrink-0 transition-all",
                            d.imageUrl ? "hover:border-[#C6A878]/40 hover:scale-110 cursor-pointer" : "cursor-default"
                          )}
                          title={d.imageUrl ? "View full image" : "No image"}
                        >
                          {d.imageUrl ? (
                            <>
                              <Image src={d.imageUrl} alt={d.shape} width={40} height={40} className="object-cover w-10 h-10" unoptimized />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                <Eye size={12} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </>
                          ) : (
                            <span className="text-[#C6A878]/40 text-base">{SHAPE_ICON[d.shape] ?? "◆"}</span>
                          )}
                        </button>
                      </td>

                      <td className="px-4 py-3 font-mono text-xs text-[#8A8F98]">{d.id}</td>
                      <td className="px-4 py-3 text-[#e8e4dc]">
                        <span className="mr-1.5 text-[#C6A878]/60">{SHAPE_ICON[d.shape] ?? "◆"}</span>
                        {d.shape}
                      </td>
                      <td className="px-4 py-3 text-[#e8e4dc] font-medium">{d.carat}ct</td>
                      <td className="px-4 py-3 text-[#e8e4dc]">{d.color}</td>
                      <td className="px-4 py-3 text-[#e8e4dc]">{d.clarity}</td>
                      <td className="px-4 py-3 text-[#e8e4dc]">{d.cut}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C6A878]/10 text-[#C6A878] font-medium">
                          {d.lab}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#C6A878] font-medium">
                        ฿{d.priceTHB.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge green={d.available}>
                          {d.available ? "In Stock" : "Sold"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {/* View image */}
                          {d.imageUrl && (
                            <button
                              onClick={() => setLightbox({ url: d.imageUrl!, name: `${d.shape} ${d.carat}ct ${d.color} ${d.clarity}` })}
                              className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#90c8ff] hover:bg-[#90c8ff]/10 transition-colors"
                              title="View image"
                            >
                              <Eye size={13} />
                            </button>
                          )}
                          <button
                            onClick={() => handleToggle(d.id)}
                            title={d.available ? "Mark as Sold" : "Mark In Stock"}
                            className={cn(
                              "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                              d.available
                                ? "hover:bg-[#f87171]/10 text-[#6dd9a8] hover:text-[#f87171]"
                                : "hover:bg-[#6dd9a8]/10 text-[#f87171] hover:text-[#6dd9a8]"
                            )}
                          >
                            {d.available ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                          </button>
                          <button
                            onClick={() => openEdit(d)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#C6A878] hover:bg-[#C6A878]/10 transition-colors"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => setDeleteId(d.id)}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#f87171] hover:bg-[#f87171]/10 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          <div className="px-4 py-3 border-t border-white/[0.04] text-xs text-[#8A8F98] flex items-center justify-between">
            <span>Showing {filtered.length} of {rows.length} diamonds</span>
            {filtered.length !== rows.length && (
              <span className="text-[#C6A878]/60">{rows.length - filtered.length} hidden by filters</span>
            )}
          </div>
        </div>
      )}

      {/* ── Add / Edit Modal ─────────────────────────────────── */}
      {modal && (
        <DiamondModal
          mode={modal}
          form={form}
          onChange={handleFormChange}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !deleting && setDeleteId(null)}
          />
          <div className="relative bg-[#0b0d13] border border-white/[0.08] rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full">
            <div className="w-10 h-10 rounded-full bg-[#f87171]/10 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-[#f87171]" />
            </div>
            <h3 className="font-serif text-lg text-[#F6F1E8] mb-2">Delete Diamond?</h3>
            <p className="text-sm text-[#8A8F98] mb-6">
              Diamond{" "}
              <span className="text-[#C6A878] font-mono">{deleteId}</span> will be
              permanently removed from stock. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#e8e4dc] border border-white/[0.08] hover:bg-white/[0.04] transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2 rounded-lg text-sm bg-[#f87171]/10 text-[#f87171] hover:bg-[#f87171]/20 border border-[#f87171]/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? <RefreshCw size={13} className="animate-spin" /> : <Trash2 size={13} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox url={lightbox.url} name={lightbox.name} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
