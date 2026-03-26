"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Plus, Search, Pencil, Trash2, X,
  ChevronUp, ChevronDown, Package, RefreshCw, Check,
  Upload, Camera, ImageOff, Eye, ToggleLeft, ToggleRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────

type Product = {
  id:           string;
  slug:         string;
  name:         string;
  category:     string;
  collectionId: string;
  collection?:  { name: string; slug: string };
  metals:       string;
  centerStone:  string;
  priceTHB:     number;
  priceUSD:     number;
  badge:        string | null;
  description:  string;
  imageUrl:     string | null;
  isFeatured:   boolean;
  inStock:      boolean;
  createdAt:    string;
  updatedAt:    string;
};

type ProductForm = Omit<Product, "id" | "slug" | "collection" | "createdAt" | "updatedAt" | "metals"> & {
  metals: string[];
};

// ── Constants ─────────────────────────────────────────────

const CATEGORIES = [
  "Engagement Ring", "Wedding Band", "Fine Earrings",
  "Pendant & Necklace", "Tennis Bracelet", "High Jewelry",
];
const METALS_LIST = ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"];
const BADGES      = ["Best Seller", "New", "Classic", "Limited", "Exclusive", ""];

const EMPTY_FORM: ProductForm = {
  name: "", category: "Engagement Ring",
  collectionId: "", metals: ["White Gold"],
  centerStone: "", priceTHB: 0, priceUSD: 0,
  badge: null, description: "",
  imageUrl: null, isFeatured: false, inStock: true,
};

type SortKey = keyof Product;
type SortDir = "asc" | "desc";

const inputCls =
  "w-full bg-[#0d1117] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 placeholder-[#8A8F98]/50 transition-colors";

// ── Shared helpers ─────────────────────────────────────────

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

// ── Upload Zone ────────────────────────────────────────────

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
      if (!res.ok || json.error) setError(json.error ?? "Upload failed");
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
          "flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all select-none min-h-[9rem]",
          dragOver   ? "border-[#C6A878] bg-[#C6A878]/10 scale-[1.01]" :
          done       ? "border-[#6dd9a8]/60 bg-[#6dd9a8]/5" :
                       "border-[#C6A878]/30 hover:border-[#C6A878]/70 hover:bg-[#C6A878]/5"
        )}
      >
        <input ref={fileRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => e.target.files?.[0] && doUpload(e.target.files[0])} />
        {uploading ? (
          <><RefreshCw size={22} className="text-[#C6A878] animate-spin" />
            <span className="text-sm text-[#8A8F98]">กำลังอัปโหลด...</span></>
        ) : done ? (
          <><Check size={22} className="text-[#6dd9a8]" />
            <span className="text-sm text-[#6dd9a8] font-medium">อัปโหลดสำเร็จ!</span>
            <span className="text-[11px] text-[#8A8F98]">คลิกเพื่อเปลี่ยนรูป</span></>
        ) : (
          <><Upload size={22} className="text-[#C6A878]" />
            <div className="text-center">
              <p className="text-sm font-medium text-[#C6A878]">คลิกเพื่อเลือกรูป</p>
              <p className="text-xs text-[#8A8F98] mt-0.5">หรือลากรูปมาวางตรงนี้</p>
            </div>
            <span className="text-[10px] text-[#8A8F98]/50 tracking-wider">JPG · PNG · WEBP</span></>
        )}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-[#f87171]">⚠ {error}</p>}
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
          <div key={i} className="h-4 rounded bg-white/[0.04] animate-pulse" style={{ width: w }} />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-white/[0.03] flex gap-3 items-center">
          <div className="w-10 h-10 rounded-lg bg-white/[0.04] animate-pulse flex-shrink-0" />
          {[120, 80, 70, 60, 80].map((w, j) => (
            <div key={j} className="h-3 rounded bg-white/[0.04] animate-pulse" style={{ width: w }} />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── Product Modal ──────────────────────────────────────────

interface ModalProps {
  mode:        "add" | "edit";
  form:        ProductForm;
  collections: { id: string; name: string }[];
  onChange:    (k: keyof ProductForm, v: unknown) => void;
  onSave:      () => void;
  onClose:     () => void;
  saving:      boolean;
}

function ProductModal({ mode, form, collections, onChange, onSave, onClose, saving }: ModalProps) {
  function toggleMetal(m: string) {
    const cur = form.metals ?? [];
    onChange("metals", cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-[#0b0d13] border border-white/[0.08] rounded-2xl shadow-2xl mx-4">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C6A878]/10 flex items-center justify-center">
              <Package size={14} className="text-[#C6A878]" />
            </div>
            <h2 className="font-serif text-lg text-[#F6F1E8]">
              {mode === "add" ? "Add Product" : "Edit Product"}
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8A8F98] hover:text-[#e8e4dc] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* ── Image Upload Section ── */}
        <div className="px-6 pt-5 pb-4 border-b border-white/[0.06] bg-white/[0.01]">
          <p className="text-[10px] tracking-[0.14em] uppercase text-[#C6A878] mb-3 flex items-center gap-2">
            <Camera size={11} /> อัปโหลดรูปสินค้า / Product Photo
          </p>
          <div className="flex gap-4 items-stretch">
            {/* Preview */}
            <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-white/[0.10] bg-[#0d1117] flex-shrink-0 flex items-center justify-center">
              {form.imageUrl ? (
                <>
                  <Image src={form.imageUrl} alt="Product" fill className="object-cover" unoptimized />
                  <button
                    type="button"
                    onClick={() => onChange("imageUrl", null)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/80 hover:bg-[#f87171] flex items-center justify-center transition-colors"
                  >
                    <X size={10} className="text-white" />
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1.5 text-[#8A8F98]/40">
                  <Package size={28} />
                  <span className="text-[9px] tracking-wider">NO PHOTO</span>
                </div>
              )}
            </div>
            {/* Drop zone */}
            <UploadZoneInline onUpload={(url) => onChange("imageUrl", url)} />
          </div>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-2 gap-4">

          {/* Name */}
          <div className="col-span-2">
            <FormField label="Product Name">
              <input
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
                className={inputCls}
                placeholder="e.g. Aurora Solitaire"
              />
            </FormField>
          </div>

          {/* Category */}
          <FormField label="Category">
            <select value={form.category} onChange={(e) => onChange("category", e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0d1117]">{c}</option>)}
            </select>
          </FormField>

          {/* Collection */}
          <FormField label="Collection">
            <select value={form.collectionId} onChange={(e) => onChange("collectionId", e.target.value)} className={inputCls}>
              <option value="" className="bg-[#0d1117]">— Select collection —</option>
              {collections.map((c) => <option key={c.id} value={c.id} className="bg-[#0d1117]">{c.name}</option>)}
            </select>
          </FormField>

          {/* Center Stone */}
          <div className="col-span-2">
            <FormField label="Center Stone">
              <input
                value={form.centerStone}
                onChange={(e) => onChange("centerStone", e.target.value)}
                className={inputCls}
                placeholder="e.g. 1.0ct Round D VVS1"
              />
            </FormField>
          </div>

          {/* Metals */}
          <div className="col-span-2">
            <FormField label="Available Metals">
              <div className="flex flex-wrap gap-2 mt-1">
                {METALS_LIST.map((m) => (
                  <button
                    key={m} type="button" onClick={() => toggleMetal(m)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs border transition-all",
                      form.metals.includes(m)
                        ? "bg-[#C6A878]/10 border-[#C6A878]/30 text-[#C6A878]"
                        : "bg-transparent border-white/[0.08] text-[#8A8F98] hover:text-[#e8e4dc]"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </FormField>
          </div>

          {/* Price THB */}
          <FormField label="Price (THB)">
            <input type="number" step="1000" min="0" value={form.priceTHB}
              onChange={(e) => onChange("priceTHB", parseInt(e.target.value) || 0)} className={inputCls} />
          </FormField>

          {/* Price USD */}
          <FormField label="Price (USD)">
            <input type="number" step="100" min="0" value={form.priceUSD}
              onChange={(e) => onChange("priceUSD", parseInt(e.target.value) || 0)} className={inputCls} />
          </FormField>

          {/* Badge */}
          <FormField label="Badge (optional)">
            <select value={form.badge ?? ""} onChange={(e) => onChange("badge", e.target.value || null)} className={inputCls}>
              {BADGES.map((b) => <option key={b} value={b} className="bg-[#0d1117]">{b === "" ? "— None —" : b}</option>)}
            </select>
          </FormField>

          {/* In Stock */}
          <FormField label="Availability">
            <button
              type="button"
              onClick={() => onChange("inStock", !form.inStock)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-all",
                form.inStock
                  ? "bg-[#6dd9a8]/10 border-[#6dd9a8]/20 text-[#6dd9a8]"
                  : "bg-[#f87171]/10 border-[#f87171]/20 text-[#f87171]"
              )}
            >
              {form.inStock ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              {form.inStock ? "In Stock" : "Out of Stock"}
            </button>
          </FormField>

          {/* Description */}
          <div className="col-span-2">
            <FormField label="Description">
              <textarea
                value={form.description}
                onChange={(e) => onChange("description", e.target.value)}
                rows={3}
                className={cn(inputCls, "resize-none")}
                placeholder="Short product description…"
              />
            </FormField>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#e8e4dc] hover:bg-white/[0.05] transition-all">
            Cancel
          </button>
          <button
            onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#C6A878] hover:bg-[#d4b98a] text-[#0b0d13] text-sm font-medium transition-all disabled:opacity-60"
          >
            {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
            {mode === "add" ? "Add Product" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────

export default function ProductsPage() {
  const [rows, setRows]               = useState<Product[]>([]);
  const [collections, setCollections] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading]         = useState(true);
  const [fetchError, setFetchError]   = useState<string | null>(null);

  const [search, setSearch]               = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStock, setFilterStock]     = useState<"All" | "In Stock" | "Out">("All");

  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const [modal, setModal]   = useState<null | "add" | "edit">(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm]     = useState<ProductForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Lightbox
  const [lightbox, setLightbox] = useState<{ url: string; name: string } | null>(null);

  // ── Fetch ────────────────────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/collections"),
      ]);
      if (pRes.ok) setRows(await pRes.json());
      if (cRes.ok) {
        const cols = await cRes.json();
        setCollections(cols);
      }
    } catch (e) {
      setFetchError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // ── Derived ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    let d = [...rows];
    if (search)
      d = d.filter((r) =>
        [r.id, r.name, r.category, r.centerStone, r.metals]
          .join(" ").toLowerCase().includes(search.toLowerCase())
      );
    if (filterCategory !== "All") d = d.filter((r) => r.category === filterCategory);
    if (filterStock === "In Stock") d = d.filter((r) => r.inStock);
    if (filterStock === "Out")      d = d.filter((r) => !r.inStock);
    d.sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (av === bv) return 0;
      const dir = sortDir === "asc" ? 1 : -1;
      if (av == null) return dir;
      if (bv == null) return -dir;
      return av > bv ? dir : -dir;
    });
    return d;
  }, [rows, search, filterCategory, filterStock, sortKey, sortDir]);

  // ── Handlers ─────────────────────────────────────────────
  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function openAdd() {
    setForm(EMPTY_FORM); setEditId(null); setModal("add");
  }

  function openEdit(p: Product) {
    setForm({
      name:         p.name,
      category:     p.category,
      collectionId: p.collectionId,
      metals:       p.metals.split(", ").filter(Boolean),
      centerStone:  p.centerStone,
      priceTHB:     p.priceTHB,
      priceUSD:     p.priceUSD,
      badge:        p.badge,
      description:  p.description,
      imageUrl:     p.imageUrl,
      isFeatured:   p.isFeatured,
      inStock:      p.inStock,
    });
    setEditId(p.id); setModal("edit");
  }

  function handleFormChange(k: keyof ProductForm, v: unknown) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        metals:   form.metals,
        imageUrl: form.imageUrl || null,
      };
      const res = modal === "add"
        ? await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/products/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      if (res.ok) { await fetchAll(); setModal(null); }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setRows((prev) => prev.filter((r) => r.id !== id));
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  }

  async function handleToggleStock(p: Product) {
    await fetch(`/api/admin/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: p.name, category: p.category, collectionId: p.collectionId,
        metals: p.metals, centerStone: p.centerStone, priceTHB: p.priceTHB,
        priceUSD: p.priceUSD, badge: p.badge, description: p.description,
        imageUrl: p.imageUrl, isFeatured: p.isFeatured, inStock: !p.inStock,
      }),
    });
    setRows((prev) => prev.map((r) => r.id === p.id ? { ...r, inStock: !r.inStock } : r));
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={11} className="opacity-20" />;
    return sortDir === "asc"
      ? <ChevronUp size={11} className="text-[#C6A878]" />
      : <ChevronDown size={11} className="text-[#C6A878]" />;
  }

  const inStockCount = rows.filter((r) => r.inStock).length;
  const totalValue   = rows.reduce((s, r) => s + r.priceTHB, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-[#F6F1E8] tracking-wide">Products</h1>
          <p className="text-[#8A8F98] text-sm mt-1">Manage jewelry products with images and real-time sync</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAll} disabled={loading}
            className="w-9 h-9 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] flex items-center justify-center text-[#8A8F98] hover:text-[#e8e4dc] transition-all disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C6A878] hover:bg-[#d4b98a] text-[#0b0d13] text-sm font-medium transition-all"
          >
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Products", value: rows.length,                       color: "text-[#e8e4dc]" },
          { label: "In Stock",       value: inStockCount,                      color: "text-[#6dd9a8]" },
          { label: "Total Value",    value: `฿${totalValue.toLocaleString()}`, color: "text-[#C6A878]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0d1117] border border-white/[0.06] rounded-xl px-5 py-4">
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] mb-1">{label}</p>
            <p className={cn("text-2xl font-serif", color)}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, category, stone…"
            className="w-full pl-9 pr-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] placeholder-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/40 transition-colors"
          />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors">
          <option value="All" className="bg-[#0d1117]">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0d1117]">{c}</option>)}
        </select>
        <select value={filterStock} onChange={(e) => setFilterStock(e.target.value as typeof filterStock)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors">
          {["All", "In Stock", "Out"].map((s) => <option key={s} value={s} className="bg-[#0d1117]">{s === "Out" ? "Out of Stock" : s}</option>)}
        </select>
        {(search || filterCategory !== "All" || filterStock !== "All") && (
          <button onClick={() => { setSearch(""); setFilterCategory("All"); setFilterStock("All"); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#f87171] hover:bg-[#f87171]/10 border border-white/[0.06] transition-all">
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Error */}
      {fetchError && (
        <div className="mb-4 px-4 py-3 bg-[#f87171]/10 border border-[#f87171]/20 rounded-lg text-sm text-[#f87171]">
          Failed to load: {fetchError}
        </div>
      )}

      {/* Table */}
      {loading ? <TableSkeleton /> : (
        <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {/* Photo col */}
                  <th className="px-4 py-3 w-14 text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal text-left">
                    <Camera size={11} className="inline opacity-60" />
                  </th>
                  {([
                    ["name",      "Name"],
                    ["category",  "Category"],
                    ["metals",    "Metals"],
                    ["centerStone","Center Stone"],
                    ["priceTHB",  "Price (THB)"],
                    ["inStock",   "Stock"],
                  ] as [SortKey, string][]).map(([key, label]) => (
                    <th key={key} onClick={() => toggleSort(key)}
                      className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal cursor-pointer hover:text-[#C6A878] transition-colors select-none">
                      <span className="inline-flex items-center gap-1">{label}<SortIcon k={key} /></span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal">Badge</th>
                  <th className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-[#8A8F98] text-sm">
                      <Package size={24} className="mx-auto mb-3 opacity-20" />
                      No products found
                    </td>
                  </tr>
                ) : filtered.map((p, i) => (
                  <tr key={p.id} className={cn(
                    "border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors group",
                    i % 2 === 0 ? "" : "bg-white/[0.01]"
                  )}>
                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => p.imageUrl && setLightbox({ url: p.imageUrl, name: p.name })}
                        className={cn(
                          "relative w-10 h-10 rounded-lg overflow-hidden border border-white/[0.06] bg-[#0B0B0D] flex items-center justify-center flex-shrink-0 transition-all",
                          p.imageUrl ? "hover:border-[#C6A878]/40 hover:scale-110 cursor-pointer" : "cursor-default"
                        )}
                        title={p.imageUrl ? "View full image" : "No image"}
                      >
                        {p.imageUrl ? (
                          <>
                            <Image src={p.imageUrl} alt={p.name} width={40} height={40} className="object-cover w-10 h-10" unoptimized />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                              <Eye size={12} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </>
                        ) : (
                          <ImageOff size={14} className="text-[#8A8F98]/30" />
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium text-[#e8e4dc]">{p.name}</div>
                      <div className="text-[10px] text-[#8A8F98]/60 mt-0.5">{p.collection?.name}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#e8e4dc]">{p.category}</td>
                    <td className="px-4 py-3 text-xs text-[#8A8F98]">{p.metals}</td>
                    <td className="px-4 py-3 text-xs text-[#8A8F98]">{p.centerStone || "—"}</td>
                    <td className="px-4 py-3 text-[#C6A878] font-medium">฿{p.priceTHB.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                        p.inStock ? "bg-[#6dd9a8]/10 text-[#6dd9a8]" : "bg-[#f87171]/10 text-[#f87171]"
                      )}>
                        {p.inStock ? <Check size={9} /> : <X size={9} />}
                        {p.inStock ? "In Stock" : "Out"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {p.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C6A878]/10 text-[#C6A878]">{p.badge}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* View image */}
                        {p.imageUrl && (
                          <button
                            onClick={() => setLightbox({ url: p.imageUrl!, name: p.name })}
                            className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#90c8ff] hover:bg-[#90c8ff]/10 transition-colors"
                            title="View image"
                          >
                            <Eye size={13} />
                          </button>
                        )}
                        {/* Toggle stock */}
                        <button
                          onClick={() => handleToggleStock(p)}
                          className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                            p.inStock
                              ? "text-[#6dd9a8] hover:text-[#f87171] hover:bg-[#f87171]/10"
                              : "text-[#f87171] hover:text-[#6dd9a8] hover:bg-[#6dd9a8]/10"
                          )}
                          title={p.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                        >
                          {p.inStock ? <ToggleRight size={15} /> : <ToggleLeft size={15} />}
                        </button>
                        {/* Edit */}
                        <button onClick={() => openEdit(p)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#C6A878] hover:bg-[#C6A878]/10 transition-colors">
                          <Pencil size={13} />
                        </button>
                        {/* Delete */}
                        <button onClick={() => setDeleteId(p.id)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#f87171] hover:bg-[#f87171]/10 transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-white/[0.04] text-xs text-[#8A8F98] flex items-center justify-between">
            <span>Showing {filtered.length} of {rows.length} products</span>
            {filtered.length !== rows.length && (
              <span className="text-[#C6A878]/60">{rows.length - filtered.length} hidden by filters</span>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <ProductModal
          mode={modal} form={form} collections={collections}
          onChange={handleFormChange} onSave={handleSave}
          onClose={() => setModal(null)} saving={saving}
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !deleting && setDeleteId(null)} />
          <div className="relative bg-[#0b0d13] border border-white/[0.08] rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full">
            <div className="w-10 h-10 rounded-full bg-[#f87171]/10 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-[#f87171]" />
            </div>
            <h3 className="font-serif text-lg text-[#F6F1E8] mb-2">Delete Product?</h3>
            <p className="text-sm text-[#8A8F98] mb-6">
              <span className="text-[#C6A878]">{rows.find((r) => r.id === deleteId)?.name}</span> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg text-sm text-[#8A8F98] border border-white/[0.08] hover:bg-white/[0.04] transition-all">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} disabled={deleting}
                className="flex-1 py-2 rounded-lg text-sm bg-[#f87171]/10 text-[#f87171] hover:bg-[#f87171]/20 border border-[#f87171]/20 transition-all disabled:opacity-60">
                {deleting ? <RefreshCw size={13} className="animate-spin mx-auto" /> : "Delete"}
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
