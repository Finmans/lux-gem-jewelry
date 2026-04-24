import { CollectionsPageClient } from "@/components/pages/collections-page-client";
import { getCollections, getFeaturedProducts } from "@/lib/site-data";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [collections, featuredProducts] = await Promise.all([
    getCollections(),
    getFeaturedProducts(),
  ]);

  return (
    <CollectionsPageClient
      collections={collections}
      featuredProducts={featuredProducts}
    />
  );
}
