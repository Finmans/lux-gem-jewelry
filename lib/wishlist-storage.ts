"use client";

const STORAGE_KEY = "luxgem_wishlist_diamonds";
const STORAGE_EVENT = "luxgem:wishlist-updated";

// Stable empty array to prevent hydration mismatch on server
const EMPTY_ARRAY: string[] = Object.freeze([]);

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
    return EMPTY_ARRAY;
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

// Stable unsubscribe — stored once so reference never changes between renders
let _unsubscribe: (() => void) | null = null;
let _currentListener: (() => void) | null = null;

export function subscribeWishlist(listener: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  // If listener changed, tear down old listeners and re-subscribe with new one
  if (listener !== _currentListener) {
    if (_unsubscribe) {
      _unsubscribe();
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        listener();
      }
    };

    const onWishlistEvent = () => listener();

    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, onWishlistEvent);

    _currentListener = listener;
    _unsubscribe = () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, onWishlistEvent);
      _unsubscribe = null;
      _currentListener = null;
    };
  }

  return _unsubscribe ?? (() => {});
}
