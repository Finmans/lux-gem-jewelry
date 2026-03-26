"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Plus, Search, Pencil, Trash2, X,
  ChevronUp, ChevronDown, Package, RefreshCw, Check,
} from "lucide-react";
import { loadProducts, saveProducts, generateId } from "@/lib/admin-store";
import type { JewelryProduct } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// ── Constants ────────────────────────────────────────────
const CATEGORIES = ["Engagement Ring", "Wedding Band", "Fine Earrings", "Pendant & Necklace", "Tennis Bracelet", "High Jewelry"];
const COLLECTIONS = ["engagement", "wedding", "earrings", "necklace", "bracelet", "high-jewelry"];
const METALS_LIST = ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"];
const BADGES = ["Best Seller", "New", "Classic", "Limited", "Exclusive", ""];

const EMPTY: Omit<JewelryProduct, "id"> = {
  name: "", collection: "engagement", category: "Engagement Ring",
  metals: ["White Gold"], centerStone: "", priceTHB: 0, priceUSD: 0,
  badge: undefined, description: "",
  gradient: "from-[#C6A878]/20 to-[#F6F1E8]/5",
};

type SortKey = keyof JewelryProduct;
type SortDir = "asc" | "desc";

const inputCls =
  "w-full bg-[#0d1117] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 placeholder-[#8A8F98]/50 transition-colors";

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

// ── Modal ─────────────────────────────────────────────────
interface ModalProps {
  mode: "add" | "edit";
  form: Omit<JewelryProduct, "id">;
  onChange: (k: keyof Omit<JewelryProduct, "id">, v: unknown) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}

function ProductModal({ mode, form, onChange, onSave, onClose, saving }: ModalProps) {
  function toggleMetal(m: string) {
    const cur = form.metals ?? [];
    onChange(
      "metals",
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]
    );
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
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8A8F98] hover:text-[#e8e4dc] transition-colors"
          >
            <X size={16} />
          </button>
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
            <select
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#0d1117]">{c}</option>
              ))}
            </select>
          </FormField>

          {/* Collection */}
          <FormField label="Collection">
            <select
              value={form.collection}
              onChange={(e) => onChange("collection", e.target.value)}
              className={inputCls}
            >
              {COLLECTIONS.map((c) => (
                <option key={c} value={c} className="bg-[#0d1117]">{c}</option>
              ))}
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
                    key={m}
                    type="button"
                    onClick={() => toggleMetal(m)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs border transition-all",
                      (form.metals ?? []).includes(m)
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
            <input
              type="number" step="1000" min="0"
              value={form.priceTHB}
              onChange={(e) => onChange("priceTHB", parseInt(e.target.value) || 0)}
              className={inputCls}
            />
          </FormField>

          {/* Price USD */}
          <FormField label="Price (USD)">
            <input
              type="number" step="100" min="0"
              value={form.priceUSD}
              onChange={(e) => onChange("priceUSD", parseInt(e.target.value) || 0)}
              className={inputCls}
            />
          </FormField>

          {/* Badge */}
          <FormField label="Badge (optional)">
            <select
              value={form.badge ?? ""}
              onChange={(e) => onChange("badge", e.target.value || undefined)}
              className={inputCls}
            >
              {BADGES.map((b) => (
                <option key={b} value={b} className="bg-[#0d1117]">
                  {b === "" ? "— None —" : b}
                </option>
              ))}
            </select>
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
            {mode === "add" ? "Add Product" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function ProductsPage() {
  const [rows, setRows] = useState<JewelryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<JewelryProduct, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setRows(loadProducts());
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    let d = [...rows];
    if (search)
      d = d.filter((r) =>
        [r.id, r.name, r.category, r.collection, r.centerStone]
          .join(" ").toLowerCase().includes(search.toLowerCase())
      );
    if (filterCategory !== "All") d = d.filter((r) => r.category === filterCategory);
    d.sort((a, b) => {
      const av = a[sortKey]; const bv = b[sortKey];
      if (av === bv) return 0;
      const dir = sortDir === "asc" ? 1 : -1;
      return av! > bv! ? dir : -dir;
    });
    return d;
  }, [rows, search, filterCategory, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function openAdd() {
    setForm(EMPTY); setModal("add"); setEditId(null);
  }

  function openEdit(p: JewelryProduct) {
    const { id: _, ...rest } = p;
    setForm(rest); setEditId(p.id); setModal("edit");
  }

  function handleFormChange(k: keyof Omit<JewelryProduct, "id">, v: unknown) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      let updated: JewelryProduct[];
      if (modal === "add") {
        updated = [...rows, { id: generateId("P"), ...form }];
      } else {
        updated = rows.map((r) => (r.id === editId ? { id: editId!, ...form } : r));
      }
      saveProducts(updated);
      setRows(updated);
      setSaving(false);
      setModal(null);
    }, 400);
  }

  function handleDelete(id: string) {
    const updated = rows.filter((r) => r.id !== id);
    saveProducts(updated);
    setRows(updated);
    setDeleteId(null);
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={11} className="opacity-20" />;
    return sortDir === "asc"
      ? <ChevronUp size={11} className="text-[#C6A878]" />
      : <ChevronDown size={11} className="text-[#C6A878]" />;
  }

  const totalValue = rows.reduce((s, r) => s + r.priceTHB, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="animate-spin text-[#C6A878]" size={24} />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#F6F1E8] tracking-wide">Products</h1>
          <p className="text-[#8A8F98] text-sm mt-1">
            {rows.length} products&nbsp;·&nbsp;
            <span className="text-[#C6A878]">฿{totalValue.toLocaleString()} total value</span>
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C6A878] hover:bg-[#d4b98a] text-[#0b0d13] text-sm font-medium transition-all"
        >
          <Plus size={15} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, category, stone…"
            className="w-full pl-9 pr-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] placeholder-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/40 transition-colors"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          <option value="All" className="bg-[#0d1117]">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#0d1117]">{c}</option>
          ))}
        </select>
        {(search || filterCategory !== "All") && (
          <button
            onClick={() => { setSearch(""); setFilterCategory("All"); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#f87171] hover:bg-[#f87171]/10 border border-white/[0.06] transition-all"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {(
                  [
                    ["id",        "ID"],
                    ["name",      "Name"],
                    ["category",  "Category"],
                    ["collection","Collection"],
                    ["centerStone","Center Stone"],
                    ["priceTHB",  "Price (THB)"],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => toggleSort(key)}
                    className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal cursor-pointer hover:text-[#C6A878] transition-colors select-none"
                  >
                    <span className="inline-flex items-center gap-1">
                      {label} <SortIcon k={key} />
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal">Badge</th>
                <th className="px-4 py-3 text-left text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-[#8A8F98] text-sm">
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className={cn(
                      "border-b border-white/[0.03] hover:bg-white/[0.025] transition-colors group",
                      i % 2 === 0 ? "" : "bg-white/[0.01]"
                    )}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[#8A8F98]">{p.id}</td>
                    <td className="px-4 py-3 text-[#e8e4dc] font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-[#e8e4dc] text-xs">{p.category}</td>
                    <td className="px-4 py-3 text-[#8A8F98] text-xs">{p.collection}</td>
                    <td className="px-4 py-3 text-[#8A8F98] text-xs">{p.centerStone}</td>
                    <td className="px-4 py-3 text-[#C6A878] font-medium">฿{p.priceTHB.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {p.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#C6A878]/10 text-[#C6A878]">
                          {p.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#C6A878] hover:bg-[#C6A878]/10 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
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
        <div className="px-4 py-3 border-t border-white/[0.04] text-xs text-[#8A8F98]">
          Showing {filtered.length} of {rows.length} products
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <ProductModal
          mode={modal}
          form={form}
          onChange={handleFormChange}
          onSave={handleSave}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
          <div className="relative bg-[#0b0d13] border border-white/[0.08] rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="font-serif text-lg text-[#F6F1E8] mb-2">Delete Product?</h3>
            <p className="text-sm text-[#8A8F98] mb-6">
              Product <span className="text-[#C6A878] font-mono">{deleteId}</span> will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg text-sm text-[#8A8F98] border border-white/[0.08] hover:bg-white/[0.04] transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-2 rounded-lg text-sm bg-[#f87171]/10 text-[#f87171] hover:bg-[#f87171]/20 border border-[#f87171]/20 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
