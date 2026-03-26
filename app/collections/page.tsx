import { CollectionsPageClient } from "@/components/pages/collections-page-client";

import { getCollections, getFeaturedProducts } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
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
