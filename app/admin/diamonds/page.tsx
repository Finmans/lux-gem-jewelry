"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Plus, Search, Pencil, Trash2, ToggleLeft, ToggleRight,
  X, ChevronUp, ChevronDown, Gem, RefreshCw, Check,
} from "lucide-react";
import { loadDiamonds, saveDiamonds, generateId } from "@/lib/admin-store";
import type { Diamond, DiamondShape } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// ── Constants ────────────────────────────────────────────
const SHAPES: DiamondShape[] = [
  "Round","Oval","Cushion","Princess","Emerald",
  "Pear","Radiant","Marquise","Asscher","Heart",
];
const COLORS    = ["D","E","F","G","H","I","J"];
const CLARITIES = ["IF","VVS1","VVS2","VS1","VS2","SI1","SI2"];
const GRADES    = ["Excellent","Very Good","Good","Fair"];
const FLUORS    = ["None","Faint","Medium","Strong","Very Strong"];
const LABS      = ["GIA","IGI","HRD"] as const;

const SHAPE_ICON: Record<string, string> = {
  Round:"◯",Oval:"⬭",Cushion:"⬜",Princess:"◻",
  Emerald:"▬",Pear:"◖",Radiant:"⬡",Marquise:"◈",
  Asscher:"⬛",Heart:"♥",
};

const EMPTY: Omit<Diamond, "id"> = {
  shape: "Round", carat: 1.00, color: "D", clarity: "VVS1",
  cut: "Excellent", polish: "Excellent", symmetry: "Excellent",
  fluorescence: "None", lab: "GIA", certificate: "",
  priceTHB: 0, priceUSD: 0, available: true,
};

type SortKey = keyof Diamond;
type SortDir = "asc" | "desc";

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

function FormField({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.12em] uppercase text-[#8A8F98] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-[#0d1117] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 placeholder-[#8A8F98]/50 transition-colors";

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
        <option key={o} value={o} className="bg-[#0d1117]">
          {o}
        </option>
      ))}
    </select>
  );
}

// ── Modal ─────────────────────────────────────────────────

interface ModalProps {
  mode: "add" | "edit";
  form: Omit<Diamond, "id">;
  onChange: (k: keyof Omit<Diamond, "id">, v: unknown) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}

function DiamondModal({ mode, form, onChange, onSave, onClose, saving }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
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

        {/* Form */}
        <div className="p-6 grid grid-cols-2 gap-4">
          {/* Shape */}
          <FormField label="Shape">
            <SelectField
              value={form.shape}
              onChange={(v) => onChange("shape", v as DiamondShape)}
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
            <SelectField value={form.lab} onChange={(v) => onChange("lab", v as "GIA" | "IGI" | "HRD")} options={LABS} />
          </FormField>

          {/* Certificate */}
          <FormField label="Certificate No.">
            <input
              type="text"
              value={form.certificate}
              onChange={(e) => onChange("certificate", e.target.value)}
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
                {form.available ? (
                  <ToggleRight size={18} />
                ) : (
                  <ToggleLeft size={18} />
                )}
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
            {saving ? (
              <RefreshCw size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {mode === "add" ? "Add Diamond" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────

export default function DiamondStockPage() {
  const [rows, setRows] = useState<Diamond[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [filterShape, setFilterShape] = useState<string>("All");
  const [filterLab, setFilterLab] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<"All" | "In Stock" | "Sold">("All");

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // Modal
  const [modal, setModal] = useState<null | "add" | "edit">(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Diamond, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setRows(loadDiamonds());
    setLoading(false);
  }, []);

  // ── Derived rows ───────────────────────────────────────
  const filtered = useMemo(() => {
    let d = [...rows];
    if (search)
      d = d.filter((r) =>
        [r.id, r.shape, r.color, r.clarity, r.cut, r.lab, r.certificate]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    if (filterShape !== "All") d = d.filter((r) => r.shape === filterShape);
    if (filterLab   !== "All") d = d.filter((r) => r.lab   === filterLab);
    if (filterStatus === "In Stock") d = d.filter((r) => r.available);
    if (filterStatus === "Sold")     d = d.filter((r) => !r.available);

    d.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av === bv) return 0;
      const dir = sortDir === "asc" ? 1 : -1;
      return av! > bv! ? dir : -dir;
    });
    return d;
  }, [rows, search, filterShape, filterLab, filterStatus, sortKey, sortDir]);

  // ── Handlers ───────────────────────────────────────────
  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function openAdd() {
    setForm(EMPTY);
    setModal("add");
    setEditId(null);
  }

  function openEdit(d: Diamond) {
    const { id: _, ...rest } = d;
    setForm(rest);
    setEditId(d.id);
    setModal("edit");
  }

  function handleFormChange(k: keyof Omit<Diamond, "id">, v: unknown) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      let updated: Diamond[];
      if (modal === "add") {
        const newDiamond: Diamond = { id: generateId("D"), ...form };
        updated = [...rows, newDiamond];
      } else {
        updated = rows.map((r) => (r.id === editId ? { id: editId, ...form } : r));
      }
      saveDiamonds(updated);
      setRows(updated);
      setSaving(false);
      setModal(null);
    }, 400);
  }

  function handleToggle(id: string) {
    const updated = rows.map((r) =>
      r.id === id ? { ...r, available: !r.available } : r
    );
    saveDiamonds(updated);
    setRows(updated);
  }

  function handleDelete(id: string) {
    const updated = rows.filter((r) => r.id !== id);
    saveDiamonds(updated);
    setRows(updated);
    setDeleteId(null);
  }

  // ── Sorting icon helper ─────────────────────────────────
  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k)
      return <ChevronUp size={11} className="opacity-20" />;
    return sortDir === "asc" ? (
      <ChevronUp size={11} className="text-[#C6A878]" />
    ) : (
      <ChevronDown size={11} className="text-[#C6A878]" />
    );
  }

  const inStock    = rows.filter((r) => r.available).length;
  const totalValue = rows
    .filter((r) => r.available)
    .reduce((s, r) => s + r.priceTHB, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="animate-spin text-[#C6A878]" size={24} />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-[#F6F1E8] tracking-wide">Diamond Stock</h1>
          <p className="text-[#8A8F98] text-sm mt-1">
            {rows.length} diamonds &nbsp;·&nbsp;{" "}
            <span className="text-[#6dd9a8]">{inStock} in stock</span>&nbsp;·&nbsp;
            <span className="text-[#C6A878]">฿{totalValue.toLocaleString()} value</span>
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#C6A878] hover:bg-[#d4b98a] text-[#0b0d13] text-sm font-medium transition-all"
        >
          <Plus size={15} />
          Add Diamond
        </button>
      </div>

      {/* ── Filters ────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F98]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID, shape, color, certificate…"
            className="w-full pl-9 pr-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] placeholder-[#8A8F98]/50 focus:outline-none focus:border-[#C6A878]/40 transition-colors"
          />
        </div>

        {/* Shape filter */}
        <select
          value={filterShape}
          onChange={(e) => setFilterShape(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          <option value="All" className="bg-[#0d1117]">All Shapes</option>
          {SHAPES.map((s) => (
            <option key={s} value={s} className="bg-[#0d1117]">
              {s}
            </option>
          ))}
        </select>

        {/* Lab filter */}
        <select
          value={filterLab}
          onChange={(e) => setFilterLab(e.target.value)}
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          <option value="All" className="bg-[#0d1117]">All Labs</option>
          {LABS.map((l) => (
            <option key={l} value={l} className="bg-[#0d1117]">
              {l}
            </option>
          ))}
        </select>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as "All" | "In Stock" | "Sold")
          }
          className="px-3 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 transition-colors"
        >
          {["All", "In Stock", "Sold"].map((s) => (
            <option key={s} value={s} className="bg-[#0d1117]">
              {s}
            </option>
          ))}
        </select>

        {/* Clear */}
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

      {/* ── Table ──────────────────────────────────────────── */}
      <div className="bg-[#0d1117] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {(
                  [
                    ["id",        "ID"],
                    ["shape",     "Shape"],
                    ["carat",     "Carat"],
                    ["color",     "Color"],
                    ["clarity",   "Clarity"],
                    ["cut",       "Cut"],
                    ["lab",       "Lab"],
                    ["priceTHB",  "Price (THB)"],
                    ["available", "Status"],
                  ] as [SortKey, string][]
                ).map(([key, label]) => (
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
                  <td
                    colSpan={10}
                    className="text-center py-16 text-[#8A8F98] text-sm"
                  >
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
                    <td className="px-4 py-3 font-mono text-xs text-[#8A8F98]">
                      {d.id}
                    </td>
                    <td className="px-4 py-3 text-[#e8e4dc]">
                      <span className="mr-1.5 text-[#C6A878]/60">
                        {SHAPE_ICON[d.shape] ?? "◆"}
                      </span>
                      {d.shape}
                    </td>
                    <td className="px-4 py-3 text-[#e8e4dc] font-medium">
                      {d.carat}ct
                    </td>
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
                        {/* Toggle */}
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
                          {d.available ? (
                            <ToggleRight size={15} />
                          ) : (
                            <ToggleLeft size={15} />
                          )}
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEdit(d)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#8A8F98] hover:text-[#C6A878] hover:bg-[#C6A878]/10 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>

                        {/* Delete */}
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
        <div className="px-4 py-3 border-t border-white/[0.04] text-xs text-[#8A8F98]">
          Showing {filtered.length} of {rows.length} diamonds
        </div>
      </div>

      {/* ── Add / Edit Modal ────────────────────────────────── */}
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

      {/* ── Delete Confirm ──────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative bg-[#0b0d13] border border-white/[0.08] rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full">
            <h3 className="font-serif text-lg text-[#F6F1E8] mb-2">Delete Diamond?</h3>
            <p className="text-sm text-[#8A8F98] mb-6">
              Diamond{" "}
              <span className="text-[#C6A878] font-mono">{deleteId}</span> will be
              permanently removed from stock.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#e8e4dc] border border-white/[0.08] hover:bg-white/[0.04] transition-all"
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
