import { WishlistPageClient } from "@/components/pages/wishlist-page-client";
import { getDiamonds } from "@/lib/site-data";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export default async function WishlistPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const diamonds = await getDiamonds();
  return <WishlistPageClient diamonds={diamonds} />;
}
