import { LuxHeroSection } from "@/components/sections/lux-hero";
import { EntryGateSection } from "@/components/sections/entry-gate";
import { FeaturedCollectionsSection } from "@/components/sections/featured-collections";
import { DiamondStockPreviewSection } from "@/components/sections/diamond-stock-preview";
import { BrandStorySection } from "@/components/sections/brand-story";
import { CustomJourneySection } from "@/components/sections/custom-journey";
import { TrustSection } from "@/components/sections/trust-section";
import { getCollections, getDiamonds } from "@/lib/site-data";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: locale === "th"
      ? "LUX GEM Jewelry — เพชร Lab-Grown ระดับพรีเมียม | กรุงเทพ"
      : "LUX GEM Jewelry — Premium Lab-Grown Diamonds | Bangkok",
    description: locale === "th"
      ? "เพชร Lab-Grown คุณภาพพรีเมียม ผ่านการรับรอง IGI พร้อมสต็อกกว่า 8 เม็ด ออกแบบและประกอบในกรุงเทพ"
      : "Premium IGI-certified lab-grown diamonds. Shop engagement rings, wedding bands, and fine jewelry. Crafted in Bangkok.",
    openGraph: {
      title: "LUX GEM Jewelry",
      description: "Lab-grown diamonds of exceptional beauty.",
      type: "website",
    },
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
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
