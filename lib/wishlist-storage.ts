"use client";

const STORAGE_KEY = "luxgem_wishlist_diamonds";
const STORAGE_EVENT = "luxgem:wishlist-updated";

function parseIds(raw: string | null): string[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function getWishlistIds(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  return parseIds(window.localStorage.getItem(STORAGE_KEY));
}

export function setWishlistIds(ids: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function toggleWishlistId(id: string) {
  const ids = getWishlistIds();

  if (ids.includes(id)) {
    setWishlistIds(ids.filter((value) => value !== id));
    return;
  }

  setWishlistIds([...ids, id]);
}

export function subscribeWishlist(listener: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      listener();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(STORAGE_EVENT, listener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STORAGE_EVENT, listener);
  };
}
