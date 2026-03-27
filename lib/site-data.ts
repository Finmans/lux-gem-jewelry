/**
 * Site data layer — uses Prisma + Neon PostgreSQL
 * Falls back to mock data if database is not available
 */
import { prisma } from "@/lib/prisma";

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
  lab: "IGI";
  certificate: string;
  priceTHB: number;
  priceUSD: number;
  available: boolean;
  imageUrl?: string | null;
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
    id: "collection_engagement",
    slug: "engagement",
    name: "Engagement Rings",
    nameTH: "แหวนหมั้น",
    pieceCount: 24,
    startingPriceTHB: 45000,
    description: "Discover exceptional lab-grown diamond engagement rings that symbolize your unique love story.",
    gradient: "from-[#C6A878]/20 to-transparent",
  },
];

const MOCK_PRODUCTS: ProductCard[] = [
  {
    id: "P001",
    slug: "solitaire-classic-round",
    name: "Solitaire Classic Round",
    category: "Engagement Rings",
    collectionSlug: "engagement",
    metals: ["White Gold 18k", "Yellow Gold 18k", "Platinum 950"],
    centerStone: "1.0ct Round",
    priceTHB: 85000,
    priceUSD: 2430,
    badge: "Best Seller",
    description: "The timeless four-prong solitaire that maximizes light performance.",
    gradient: "from-[#C6A878]/15 to-transparent",
    isFeatured: true,
  },
];

const MOCK_DIAMONDS: DiamondRecord[] = [
  {
    id: "D001",
    shape: "Round",
    carat: 1.2,
    color: "F",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "IGI",
    certificate: "LG12345678",
    priceTHB: 85000,
    priceUSD: 2430,
    available: true,
  },
  {
    id: "D002",
    shape: "Oval",
    carat: 1.5,
    color: "G",
    clarity: "VS2",
    cut: "Excellent",
    polish: "Very Good",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "IGI",
    certificate: "1234567890",
    priceTHB: 95000,
    priceUSD: 2710,
    available: true,
  },
  {
    id: "dia_1",
    shape: "Round",
    carat: 1.0,
    color: "E",
    clarity: "VS1",
    cut: "Excellent",
    polish: "Excellent",
    symmetry: "Excellent",
    fluorescence: "None",
    lab: "IGI",
    certificate: "IGI123456",
    priceTHB: 65000,
    priceUSD: 1850,
    available: true,
  },
];

const MOCK_SETTINGS: SettingRecord[] = [
  {
    id: "solitaire",
    slug: "classic-solitaire",
    name: "Classic Solitaire",
    description: "Minimal four-prong solitaire emphasizing center stone brilliance.",
    metals: ["White Gold 18k", "Yellow Gold 18k", "Rose Gold 18k", "Platinum 950"],
    priceAddTHB: 0,
  },
];

// ─── Database Functions ──────────────────────────────────────────────────────

async function dbCollections(): Promise<CollectionCard[] | null> {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { createdAt: "asc" },
    });
    return collections.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      nameTH: c.nameTH || c.name,
      pieceCount: c.pieceCount,
      startingPriceTHB: c.startingPriceTHB,
      description: c.description,
      gradient: "from-[#C6A878]/20 to-transparent",
    }));
  } catch (e) {
    console.error("dbCollections error:", e);
    return null;
  }
}

async function dbCollectionBySlug(slug: string): Promise<CollectionCard | null> {
  try {
    const c = await prisma.collection.findUnique({ where: { slug } });
    if (!c) return null;
    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      nameTH: c.nameTH || c.name,
      pieceCount: c.pieceCount,
      startingPriceTHB: c.startingPriceTHB,
      description: c.description,
      gradient: "from-[#C6A878]/20 to-transparent",
    };
  } catch (e) {
    console.error("dbCollectionBySlug error:", e);
    return null;
  }
}

async function dbProducts(collectionSlug?: string): Promise<ProductCard[]> {
  try {
    const products = await prisma.product.findMany({
      where: collectionSlug ? { collection: { slug: collectionSlug } } : undefined,
      orderBy: { createdAt: "asc" },
    });
    return products.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category: p.category,
      collectionSlug: p.collectionId,
      metals: JSON.parse(p.metals || "[]"),
      centerStone: p.centerStone,
      priceTHB: p.priceTHB,
      priceUSD: p.priceUSD,
      badge: p.badge || undefined,
      description: p.description,
      gradient: p.gradient || "from-[#C6A878]/15 to-transparent",
      isFeatured: p.isFeatured,
    }));
  } catch (e) {
    console.error("dbProducts error:", e);
    return [];
  }
}

async function dbDiamonds(): Promise<DiamondRecord[]> {
  try {
    const diamonds = await prisma.diamond.findMany({
      where: { available: true },
      orderBy: { createdAt: "desc" },
    });
    return diamonds.map((d) => ({
      id: d.id,
      shape: d.shape,
      carat: d.carat,
      color: d.color,
      clarity: d.clarity,
      cut: d.cut,
      polish: d.polish,
      symmetry: d.symmetry,
      fluorescence: d.fluorescence,
      lab: d.lab as "IGI",
      certificate: d.certificateNumber,
      priceTHB: d.priceTHB,
      priceUSD: d.priceUSD,
      available: d.available,
    }));
  } catch (e) {
    console.error("dbDiamonds error:", e);
    return [];
  }
}

async function dbDiamondById(id: string): Promise<DiamondRecord | null> {
  try {
    const d = await prisma.diamond.findUnique({ where: { id } });
    if (!d) return null;
    return {
      id: d.id,
      shape: d.shape,
      carat: d.carat,
      color: d.color,
      clarity: d.clarity,
      cut: d.cut,
      polish: d.polish,
      symmetry: d.symmetry,
      fluorescence: d.fluorescence,
      lab: d.lab as "IGI",
      certificate: d.certificateNumber,
      priceTHB: d.priceTHB,
      priceUSD: d.priceUSD,
      available: d.available,
    };
  } catch (e) {
    console.error("dbDiamondById error:", e);
    return null;
  }
}

async function dbSettings(): Promise<SettingRecord[]> {
  try {
    const settings = await prisma.setting.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
    return settings.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      description: s.description || undefined,
      metals: JSON.parse(s.metals || "[]"),
      priceAddTHB: s.priceAddTHB,
    }));
  } catch (e) {
    console.error("dbSettings error:", e);
    return [];
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function getCollections(): Promise<CollectionCard[]> {
  const data = await dbCollections();
  return data ?? MOCK_COLLECTIONS;
}

export async function getCollectionBySlug(slug: string): Promise<CollectionCard | null> {
  const data = await dbCollectionBySlug(slug);
  return data ?? MOCK_COLLECTIONS.find((c) => c.slug === slug) ?? null;
}

export async function getFeaturedProducts(collectionSlug?: string): Promise<ProductCard[]> {
  const data = await dbProducts(collectionSlug);
  return data.length > 0 ? data.filter((p) => p.isFeatured) : MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export async function getProducts(collectionSlug?: string): Promise<ProductCard[]> {
  const data = await dbProducts(collectionSlug);
  return data.length > 0 ? data : MOCK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<ProductCard | null> {
  try {
    const products = await dbProducts();
    return products.find((p) => p.slug === slug) ?? null;
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getDiamonds(): Promise<DiamondRecord[]> {
  const data = await dbDiamonds();
  return data.length > 0 ? data : MOCK_DIAMONDS;
}

export async function getDiamondById(id: string): Promise<DiamondRecord | null> {
  const data = await dbDiamondById(id);
  return data ?? MOCK_DIAMONDS.find((d) => d.id === id) ?? null;
}

export async function getSettings(): Promise<SettingRecord[]> {
  const data = await dbSettings();
  return data.length > 0 ? data : MOCK_SETTINGS;
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  return { siteName: "LUX GEM", tagline: "Luxury Diamond Jewelry" };
}
