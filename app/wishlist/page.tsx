import { WishlistPageClient } from "@/components/pages/wishlist-page-client";

import { getDiamonds } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const diamonds = await getDiamonds();
  return <WishlistPageClient diamonds={diamonds} />;
}
