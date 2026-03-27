/**
 * Site data layer — uses Supabase JS client (via HTTPS API, works on Vercel Hobby)
 * Falls back to mock data if Supabase is not configured
 */
import { supabase } from "@/lib/supabase";

export type CollectionCard = {
  id: string;
  slug: string;
  name: string;
  nameTH: string;
  pieceCount: number;
  startingPriceTHB: number;
  description: string;
  gradient: string;
};

export type ProductCard = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collectionSlug: string;
  metals: string[];
  centerStone: string;
  priceTHB: number;
  priceUSD: number;
  badge?: string;
  description: string;
  gradient: string;
  isFeatured: boolean;
};

export type DiamondRecord = {
  id: string;
  shape: string;
  carat: number;
  color: string;
  clarity: string;
  cut: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  lab: "GIA" | "IGI" | "HRD";
  certificate: string;
  priceTHB: number;
  priceUSD: number;
  available: boolean;
};

export type SettingRecord = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  metals: string[];
  priceAddTHB: number;
};

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_COLLECTIONS: CollectionCard[] = [
  {
    id: "col-1",
    slug: "eternal-bands",
    name: "Eternal Bands",
    nameTH: "แหวนเอเวอร์แนล แบนด์ส",
    pieceCount: 24,
    startingPriceTHB: 45000,
    description: "Classic wedding bands crafted in platinum and 18K gold. Timeless elegance for your forever moment.",
    gradient: "from-[#C6A878]/30 via-[#F6F1E8]/10 to-[#C6A878]/20",
  },
  {
    id: "col-2",
    slug: "solitaire-collection",
    name: "Solitaire Collection",
    nameTH: "คอลเลกชันโซลิแทร์",
    pieceCount: 18,
    startingPriceTHB: 85000,
    description: "Single stone settings that celebrate the diamond's natural brilliance. Minimalist luxury.",
    gradient: "from-[#C6A878]/20 via-[#1A1A1E] to-[#C6A878]/10",
  },
  {
    id: "col-3",
    slug: "halo-crown",
    name: "Halo Crown",
    nameTH: "ฮาโล คราวน์",
    pieceCount: 12,
    startingPriceTHB: 120000,
    description: "A circle of smaller diamonds surrounds the center stone, amplifying its fire and brilliance.",
    gradient: "from-[#F6F1E8]/20 via-[#C6A878]/20 to-[#1A1A1E]",
  },
  {
    id: "col-4",
    slug: "three-stone",
    name: "Three Stone",
    nameTH: "ทรี สโตน",
    pieceCount: 15,
    startingPriceTHB: 95000,
    description: "Past, present, and future — three diamonds symbolize your journey together.",
    gradient: "from-[#C6A878]/30 via-[#F6F1E8]/15 to-[#C6A878]/30",
  },
];

const MOCK_PRODUCTS: ProductCard[] = [
  {
    id: "prod-1",
    slug: "eternal-platinum-band",
    name: "Eternal Platinum Band",
    category: "Wedding Band",
    collectionSlug: "eternal-bands",
    metals: ["Platinum 950"],
    centerStone: "–",
    priceTHB: 45000,
    priceUSD: 1290,
    badge: "Bestseller",
    description: "Polished platinum band with milgrain detailing.",
    gradient: "from-[#C6A878]/30 via-[#F6F1E8]/10 to-[#C6A878]/20",
    isFeatured: true,
  },
  {
    id: "prod-2",
    slug: "classic-six-prong",
    name: "Classic Six Prong Solitaire",
    category: "Engagement Ring",
    collectionSlug: "solitaire-collection",
    metals: ["18K White Gold", "18K Yellow Gold", "Platinum"],
    centerStone: "Round Brilliant",
    priceTHB: 95000,
    priceUSD: 2720,
    badge: "Classic",
    description: "The timeless six-prong setting that maximizes diamond brilliance.",
    gradient: "from-[#C6A878]/20 via-[#1A1A1E] to-[#C6A878]/10",
    isFeatured: true,
  },
  {
    id: "prod-3",
    slug: "double-halo-ring",
    name: "Double Halo Crown Ring",
    category: "Engagement Ring",
    collectionSlug: "halo-crown",
    metals: ["18K White Gold", "Platinum"],
    centerStone: "Round Brilliant",
    priceTHB: 185000,
    priceUSD: 5290,
    badge: "Statement",
    description: "Double halo of pavé diamonds crowns the center stone in spectacular fashion.",
    gradient: "from-[#F6F1E8]/20 via-[#C6A878]/20 to-[#1A1A1E]",
    isFeatured: true,
  },
  {
    id: "prod-4",
    slug: "three-stone-pear",
    name: "Three Stone Pear Trilogy",
    category: "Anniversary Ring",
    collectionSlug: "three-stone",
    metals: ["18K Yellow Gold", "18K White Gold"],
    centerStone: "Pear Brilliant",
    priceTHB: 135000,
    priceUSD: 3870,
    description: "Three pear-shaped diamonds in a flowing trilogy setting.",
    gradient: "from-[#C6A878]/30 via-[#F6F1E8]/15 to-[#C6A878]/30",
    isFeatured: false,
  },
];

const MOCK_DIAMONDS: DiamondRecord[] = [
  {
    id: "dia-1",
    shape: "Round",
    carat: 1.02,
    color: "D",
    clarity: "VVS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "GIA",
    certificate: "GIA-1234567890",
    priceTHB: 485000,
    priceUSD: 13900,
    available: true,
  },
  {
    id: "dia-2",
    shape: "Oval",
    carat: 1.55,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Very Good",
    symmetry: "Excellent",
    fluorescence: "Faint",
    lab: "IGI",
    certificate: "IGI-LG12345678",
    priceTHB: 320000,
    priceUSD: 9170,
    available: true,
  },
  {
    id: "dia-3",
    shape: "Cushion",
    carat: 2.10,
    color: "G",
    clarity: "VS2",
    cut: "Very Good",
    polish: "Excellent",
    symmetry: "Very Good",
    fluorescence: "Medium Blue",
    lab: "GIA",
    certificate: "GIA-2345678901",
    priceTHB: 580000,
    priceUSD: 16620,
    available: true,
  },
  {
    id: "dia-4",
    shape: "Emerald",
    carat: 1.80,
    color: "E",
    clarity: "VVS2",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "HRD",
    certificate: "HRD-HRD1234567",
    priceTHB: 750000,
    priceUSD: 21490,
    available: false,
  },
  {
    id: "dia-5",
    shape: "Pear",
    carat: 1.25,
    color: "H",
    clarity: "SI1",
    cut: "Very Good",
    polish: "Good",
    symmetry: "Very Good",
    fluorescence: "Faint",
    lab: "IGI",
    certificate: "IGI-LG98765432",
    priceTHB: 185000,
    priceUSD: 5300,
    available: true,
  },
  {
    id: "dia-6",
    shape: "Princess",
    carat: 1.00,
    color: "D",
    clarity: "IF",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "GIA",
    certificate: "GIA-3456789012",
    priceTHB: 420000,
    priceUSD: 12030,
    available: true,
  },
];

const MOCK_SETTINGS: SettingRecord[] = [
  {
    id: "set-1",
    slug: "classic-solitaire",
    name: "Classic Solitaire",
    description: "Timeless six-prong platinum setting",
    metals: ["Platinum 950"],
    priceAddTHB: 25000,
  },
  {
    id: "set-2",
    slug: "halo-platinum",
    name: "Halo Crown",
    description: "Double halo pavé setting in platinum",
    metals: ["Platinum 950", "18K White Gold"],
    priceAddTHB: 45000,
  },
  {
    id: "set-3",
    slug: "three-stone-ygold",
    name: "Three Stone Trilogy",
    description: "Two shoulder diamonds with custom engraving",
    metals: ["18K Yellow Gold", "18K White Gold"],
    priceAddTHB: 38000,
  },
];

// ─── Supabase Functions ───────────────────────────────────────────────────────

async function sbCollections() {
  const { data, error } = await supabase
    .from("Collection")
    .select("*")
    .order("startingPriceTHB", { ascending: true });
  if (error || !data) return null;
  return data.map((row: Record<string, unknown>) => ({
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    nameTH: (row.nameTH as string) ?? "",
    pieceCount: row.pieceCount as number,
    startingPriceTHB: row.startingPriceTHB as number,
    description: row.description as string,
    gradient: (row.gradient as string) ?? "from-[#1a1410] via-[#2d2318] to-[#1a1410]",
  }));
}

async function sbCollectionBySlug(slug: string) {
  const { data, error } = await supabase
    .from("Collection")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return {
    id: data.id as string,
    slug: data.slug as string,
    name: data.name as string,
    nameTH: (data.nameTH as string) ?? "",
    pieceCount: data.pieceCount as number,
    startingPriceTHB: data.startingPriceTHB as number,
    description: data.description as string,
    gradient: (data.gradient as string) ?? "from-[#1a1410] via-[#2d2318] to-[#1a1410]",
  };
}

async function sbFeaturedProducts(collectionSlug?: string) {
  let query = supabase
    .from("Product")
    .select("*, Collection:collectionId(slug)")
    .eq("isFeatured", "true");
  const { data, error } = await query;
  if (error || !data) return null;
  return (data as Record<string, unknown>[])
    .filter((row) => !collectionSlug || (row.Collection as Record<string, unknown>)?.slug === collectionSlug)
    .map((row) => ({
      id: row.id as string,
      slug: row.slug as string,
      name: row.name as string,
      category: row.category as string,
      collectionSlug: (row.Collection as Record<string, unknown>)?.slug as string,
      metals: ((row.metals as string) || "").split(",").map((m: string) => m.trim()).filter(Boolean),
      centerStone: row.centerStone as string,
      priceTHB: row.priceTHB as number,
      priceUSD: row.priceUSD as number,
      badge: row.badge as string | undefined,
      description: row.description as string,
      gradient: (row.gradient as string) ?? "from-[#C6A878]/20 to-[#F6F1E8]/5",
      isFeatured: row.isFeatured as boolean,
    }));
}

async function sbDiamonds() {
  const { data, error } = await supabase
    .from("Diamond")
    .select("*")
    .order("priceTHB", { ascending: true });
  if (error || !data) return null;
  return (data as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    shape: row.shape as string,
    carat: row.carat as number,
    color: row.color as string,
    clarity: row.clarity as string,
    cut: row.cut as string,
    polish: row.polish as string,
    symmetry: row.symmetry as string,
    fluorescence: row.fluorescence as string,
    lab: row.lab as "GIA" | "IGI" | "HRD",
    certificate: row.certificateNumber as string,
    priceTHB: row.priceTHB as number,
    priceUSD: row.priceUSD as number,
    available: row.available as boolean,
  }));
}

async function sbDiamondById(id: string) {
  const { data, error } = await supabase
    .from("Diamond")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return {
    id: data.id as string,
    shape: data.shape as string,
    carat: data.carat as number,
    color: data.color as string,
    clarity: data.clarity as string,
    cut: data.cut as string,
    polish: data.polish as string,
    symmetry: data.symmetry as string,
    fluorescence: data.fluorescence as string,
    lab: data.lab as "GIA" | "IGI" | "HRD",
    certificate: data.certificateNumber as string,
    priceTHB: data.priceTHB as number,
    priceUSD: data.priceUSD as number,
    available: data.available as boolean,
  };
}

async function sbSettings() {
  const { data, error } = await supabase
    .from("Setting")
    .select("*")
    .eq("isActive", "true")
    .order("priceAddTHB", { ascending: true });
  if (error || !data) return null;
  return (data as Record<string, unknown>[]).map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    description: row.description as string | undefined,
    metals: ((row.metals as string) || "").split(",").map((m: string) => m.trim()).filter(Boolean),
    priceAddTHB: row.priceAddTHB as number,
  }));
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getCollections(): Promise<CollectionCard[]> {
  const data = await sbCollections();
  return data ?? MOCK_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string): Promise<CollectionCard | null> {
  const data = await sbCollectionBySlug(slug);
  return data ?? MOCK_COLLECTIONS.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedProducts(collectionSlug?: string): Promise<ProductCard[]> {
  const data = await sbFeaturedProducts(collectionSlug);
  return data ?? (
    collectionSlug
      ? MOCK_PRODUCTS.filter((p) => p.collectionSlug === collectionSlug && p.isFeatured)
      : MOCK_PRODUCTS.filter((p) => p.isFeatured)
  );
}

export async function getDiamonds(): Promise<DiamondRecord[]> {
  const data = await sbDiamonds();
  return data ?? MOCK_DIAMONDS;
}

export async function getDiamondById(id: string): Promise<DiamondRecord | null> {
  const data = await sbDiamondById(id);
  return data ?? MOCK_DIAMONDS.find((d) => d.id === id) ?? null;
}

export async function getSettings(): Promise<SettingRecord[]> {
  const data = await sbSettings();
  return data ?? MOCK_SETTINGS;
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  return { siteName: "LUX GEM", tagline: "Luxury Diamond Jewelry" };
}
