"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Grid3X3, Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type Collection = {
  id: string;
  slug: string;
  name: string;
  nameTH: string | null;
  description: string;
  startingPriceTHB: number;
  pieceCount: number;
  gradient: string | null;
  createdAt: string;
};

type CollectionForm = Omit<Collection, "id" | "slug" | "createdAt" | "gradient">;

const EMPTY: CollectionForm = {
  name: "", nameTH: "", description: "",
  startingPriceTHB: 0, pieceCount: 0,
};

export default function CollectionsPage() {
  const [data, setData] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState<CollectionForm>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/collections");
      const json = await r.json();
      setData(Array.isArray(json) ? json : []);
    } catch { setError("Failed to load"); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openAdd() { setEditing(null); setForm(EMPTY); setShow(true); }
  function openEdit(c: Collection) {
    setEditing(c);
    setForm({ name: c.name, nameTH: c.nameTH ?? "", description: c.description, startingPriceTHB: c.startingPriceTHB, pieceCount: c.pieceCount });
    setShow(true);
  }

  async function save() {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/collections/${editing.id}` : "/api/admin/collections";
      const method = editing ? "PUT" : "POST";
      const r = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error(await r.text());
      setShow(false);
      load();
    } catch (e) { alert(String(e)); }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this collection?")) return;
    await fetch(`/api/admin/collections/${id}`, { method: "DELETE" });
    load();
  }

  const inputCls = "w-full bg-[#0d1117] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#e8e4dc] focus:outline-none focus:border-[#C6A878]/40 placeholder-[#8A8F98]/50";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-serif text-[#F6F1E8]">Collections</h1>
          <p className="text-xs text-[#8A8F98] mt-1">{data.length} collections</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-[#C6A878] text-[#0B0B0D] rounded-lg text-xs tracking-wider hover:bg-[#D9C4A0] transition-colors">
          <Plus size={14} /> Add Collection
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#8A8F98]">
          <RefreshCw size={20} className="animate-spin mr-2" /> Loading...
        </div>
      ) : data.length === 0 ? (
        <div className="border border-white/[0.06] rounded-xl p-12 text-center text-[#8A8F98]">
          No collections yet
        </div>
      ) : (
        <div className="space-y-2">
          {data.map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4 bg-[#0d1117] border border-white/[0.06] rounded-xl hover:border-white/[0.10] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#C6A878]/10 flex items-center justify-center flex-shrink-0">
                <Grid3X3 size={16} className="text-[#C6A878]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#e8e4dc] font-medium">{c.name} {c.nameTH ? `(${c.nameTH})` : ""}</p>
                <p className="text-xs text-[#8A8F98] truncate">{c.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-[#C6A878]">฿{c.startingPriceTHB.toLocaleString()}</p>
                <p className="text-xs text-[#8A8F98]">{c.pieceCount} pieces</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(c)} className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8A8F98] hover:text-[#e8e4dc] transition-colors">
                  <Pencil size={13} />
                </button>
                <button onClick={() => remove(c.id)} className="w-8 h-8 rounded-lg hover:bg-[#f87171]/10 flex items-center justify-center text-[#8A8F98] hover:text-[#f87171] transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShow(false)} />
          <div className="relative w-full max-w-lg bg-[#0b0d13] border border-white/[0.08] rounded-2xl shadow-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2 className="font-serif text-base text-[#F6F1E8]">{editing ? "Edit Collection" : "Add Collection"}</h2>
              <button onClick={() => setShow(false)} className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center text-[#8A8F98]"><X size={15} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] tracking-wider uppercase text-[#8A8F98] mb-1.5">Name (EN)</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="e.g. Celestial" />
              </div>
              <div>
                <label className="block text-[10px] tracking-wider uppercase text-[#8A8F98] mb-1.5">Name (TH)</label>
                <input value={form.nameTH ?? ""} onChange={e => setForm({ ...form, nameTH: e.target.value })} className={inputCls} placeholder="e.g. ซีเลสเตียล" />
              </div>
              <div>
                <label className="block text-[10px] tracking-wider uppercase text-[#8A8F98] mb-1.5">Description</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className={inputCls} placeholder="Collection description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-[#8A8F98] mb-1.5">Starting Price (THB)</label>
                  <input type="number" value={form.startingPriceTHB} onChange={e => setForm({ ...form, startingPriceTHB: parseInt(e.target.value) || 0 })} className={inputCls} />
                </div>
                <div>
                  <label className="block text-[10px] tracking-wider uppercase text-[#8A8F98] mb-1.5">Piece Count</label>
                  <input type="number" value={form.pieceCount} onChange={e => setForm({ ...form, pieceCount: parseInt(e.target.value) || 0 })} className={inputCls} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
              <button onClick={() => setShow(false)} className="px-4 py-2 rounded-lg text-sm text-[#8A8F98] hover:text-[#e8e4dc] hover:bg-white/[0.05] transition-all">Cancel</button>
              <button onClick={save} disabled={saving} className="px-4 py-2 bg-[#C6A878] text-[#0B0B0D] rounded-lg text-xs tracking-wider hover:bg-[#D9C4A0] transition-colors disabled:opacity-50">
                {saving ? <RefreshCw size={13} className="animate-spin" /> : editing ? "Save Changes" : "Add Collection"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
