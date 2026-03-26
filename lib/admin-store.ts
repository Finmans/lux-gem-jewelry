import type { Diamond, JewelryProduct, Collection } from "./mock-data";
import {
  diamonds as initialDiamonds,
  featuredProducts as initialProducts,
  collections as initialCollections,
} from "./mock-data";

// ── localStorage helpers ───────────────────────────────────

export function loadDiamonds(): Diamond[] {
  if (typeof window === "undefined") return initialDiamonds;
  try {
    const s = localStorage.getItem("lux_admin_diamonds");
    return s ? (JSON.parse(s) as Diamond[]) : initialDiamonds;
  } catch {
    return initialDiamonds;
  }
}

export function saveDiamonds(data: Diamond[]) {
  if (typeof window !== "undefined")
    localStorage.setItem("lux_admin_diamonds", JSON.stringify(data));
}

export function loadProducts(): JewelryProduct[] {
  if (typeof window === "undefined") return initialProducts;
  try {
    const s = localStorage.getItem("lux_admin_products");
    return s ? (JSON.parse(s) as JewelryProduct[]) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export function saveProducts(data: JewelryProduct[]) {
  if (typeof window !== "undefined")
    localStorage.setItem("lux_admin_products", JSON.stringify(data));
}

export function loadCollections(): Collection[] {
  if (typeof window === "undefined") return initialCollections;
  try {
    const s = localStorage.getItem("lux_admin_collections");
    return s ? (JSON.parse(s) as Collection[]) : initialCollections;
  } catch {
    return initialCollections;
  }
}

export function saveCollections(data: Collection[]) {
  if (typeof window !== "undefined")
    localStorage.setItem("lux_admin_collections", JSON.stringify(data));
}

export function generateId(prefix: string): string {
  return `${prefix}${Date.now().toString().slice(-6)}`;
}

// ── Derived stats ──────────────────────────────────────────

export function getDiamondStats(diamonds: Diamond[]) {
  const total = diamonds.length;
  const inStock = diamonds.filter((d) => d.available).length;
  const totalValueTHB = diamonds
    .filter((d) => d.available)
    .reduce((sum, d) => sum + d.priceTHB, 0);
  const avgCarat =
    total > 0
      ? (diamonds.reduce((s, d) => s + d.carat, 0) / total).toFixed(2)
      : "0.00";
  return { total, inStock, outOfStock: total - inStock, totalValueTHB, avgCarat };
}

export function getProductStats(products: JewelryProduct[]) {
  const total = products.length;
  const totalValueTHB = products.reduce((s, p) => s + p.priceTHB, 0);
  const byCategory = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  return { total, totalValueTHB, byCategory };
}
