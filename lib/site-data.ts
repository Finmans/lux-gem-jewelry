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

function parseStringArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    return [];
  }
  return [];
}

export async function getCollections(): Promise<CollectionCard[]> {
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
  const rows = await prisma.product.findMany({
    where: {
      isFeatured: true,
      ...(collectionSlug ? { collection: { slug: collectionSlug } } : {}),
    },
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
  const rows = await prisma.siteSettings.findMany();
  return rows.reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}
