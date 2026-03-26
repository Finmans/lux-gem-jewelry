import { LuxHeroSection } from "@/components/sections/lux-hero";

import { EntryGateSection } from "@/components/sections/entry-gate";
import { FeaturedCollectionsSection } from "@/components/sections/featured-collections";
import { DiamondStockPreviewSection } from "@/components/sections/diamond-stock-preview";
import { BrandStorySection } from "@/components/sections/brand-story";
import { CustomJourneySection } from "@/components/sections/custom-journey";
import { TrustSection } from "@/components/sections/trust-section";
import { getCollections, getDiamonds } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [collections, diamonds] = await Promise.all([getCollections(), getDiamonds()]);

  return (
    <main>
      <LuxHeroSection diamondCount={diamonds.length} />
      <EntryGateSection />
      <FeaturedCollectionsSection collections={collections} />
      <DiamondStockPreviewSection diamonds={diamonds} />
      <BrandStorySection diamondCount={diamonds.length} />
      <CustomJourneySection />
      <TrustSection />
    </main>
  );
}
