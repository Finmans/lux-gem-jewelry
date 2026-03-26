// Mock data for development without database
// Set USE_MOCK_DATA=true in .env to enable

const USE_MOCK = process.env.USE_MOCK_DATA === "true" ||
  !process.env.DATABASE_URL ||
  process.env.DATABASE_URL.startsWith("file:");

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

// ─── Functions ────────────────────────────────────────────────────────────────

export async function getCollections(): Promise<CollectionCard[]> {
  if (USE_MOCK) return MOCK_COLLECTIONS;
  const { prisma } = await import("@/lib/prisma");
  const rows = await prisma.collection.findMany({ orderBy: { startingPriceTHB: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameTH: row.nameTH ?? "",
    pieceCount: row.pieceCount,
    startingPriceTHB: row.startingPriceTHB,
    description: row.description,
    gradient: row.gradient ?? "from-[#1a1410] via-[#2d2318] to-[#1a1410]",
  }));
}

export async function getCollectionBySlug(slug: string): Promise<CollectionCard | null> {
  if (USE_MOCK) return MOCK_COLLECTIONS.find((c) => c.slug === slug) ?? null;
  const { prisma } = await import("@/lib/prisma");
  const row = await prisma.collection.findUnique({ where: { slug } });
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameTH: row.nameTH ?? "",
    pieceCount: row.pieceCount,
    startingPriceTHB: row.startingPriceTHB,
    description: row.description,
    gradient: row.gradient ?? "from-[#1a1410] via-[#2d2318] to-[#1a1410]",
  };
}

export async function getFeaturedProducts(collectionSlug?: string): Promise<ProductCard[]> {
  if (USE_MOCK) {
    return collectionSlug
      ? MOCK_PRODUCTS.filter((p) => p.collectionSlug === collectionSlug && p.isFeatured)
      : MOCK_PRODUCTS.filter((p) => p.isFeatured);
  }
  const { prisma } = await import("@/lib/prisma");
  const { prisma: P } = await import("@/lib/prisma");
  function parseStringArray(value: string): string[] {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
    } catch { return []; }
    return [];
  }
  const rows = await prisma.product.findMany({
    where: { isFeatured: true, ...(collectionSlug ? { collection: { slug: collectionSlug } } : {}) },
    include: { collection: true },
    orderBy: { priceTHB: "asc" },
  });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    collectionSlug: row.collection.slug,
    metals: parseStringArray(row.metals),
    centerStone: row.centerStone,
    priceTHB: row.priceTHB,
    priceUSD: row.priceUSD,
    badge: row.badge ?? undefined,
    description: row.description,
    gradient: row.gradient ?? "from-[#C6A878]/20 to-[#F6F1E8]/5",
    isFeatured: row.isFeatured,
  }));
}

export async function getDiamonds(): Promise<DiamondRecord[]> {
  if (USE_MOCK) return MOCK_DIAMONDS;
  const { prisma } = await import("@/lib/prisma");
  const rows = await prisma.diamond.findMany({ orderBy: [{ priceTHB: "asc" }, { id: "asc" }] });
  return rows.map((row) => ({
    id: row.id,
    shape: row.shape,
    carat: row.carat,
    color: row.color,
    clarity: row.clarity,
    cut: row.cut,
    polish: row.polish,
    symmetry: row.symmetry,
    fluorescence: row.fluorescence,
    lab: row.lab,
    certificate: row.certificateNumber,
    priceTHB: row.priceTHB,
    priceUSD: row.priceUSD,
    available: row.available,
  }));
}

export async function getDiamondById(id: string): Promise<DiamondRecord | null> {
  if (USE_MOCK) return MOCK_DIAMONDS.find((d) => d.id === id) ?? null;
  const { prisma } = await import("@/lib/prisma");
  const row = await prisma.diamond.findUnique({ where: { id } });
  if (!row) return null;
  return {
    id: row.id,
    shape: row.shape,
    carat: row.carat,
    color: row.color,
    clarity: row.clarity,
    cut: row.cut,
    polish: row.polish,
    symmetry: row.symmetry,
    fluorescence: row.fluorescence,
    lab: row.lab,
    certificate: row.certificateNumber,
    priceTHB: row.priceTHB,
    priceUSD: row.priceUSD,
    available: row.available,
  };
}

export async function getSettings(): Promise<SettingRecord[]> {
  if (USE_MOCK) return MOCK_SETTINGS;
  const { prisma } = await import("@/lib/prisma");
  function parseStringArray(value: string): string[] {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
    } catch { return []; }
    return [];
  }
  const rows = await prisma.setting.findMany({ where: { isActive: true }, orderBy: { priceAddTHB: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? undefined,
    metals: parseStringArray(row.metals),
    priceAddTHB: row.priceAddTHB,
  }));
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (USE_MOCK) return { siteName: "LUX GEM", tagline: "Luxury Diamond Jewelry" };
  const { prisma } = await import("@/lib/prisma");
  const rows = await prisma.siteSettings.findMany();
  return rows.reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}
