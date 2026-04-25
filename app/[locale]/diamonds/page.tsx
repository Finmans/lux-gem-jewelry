import { DiamondsPageClient } from "@/components/pages/diamonds-page-client";
import { getDiamonds } from "@/lib/site-data";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return {
    title: `เพชร Lab-Grown คงคลัง | LUX GEM Jewelry`,
    description: `ชมเพชร Lab-Grown ที่ได้รับการรับรอง IGI พร้อมสต็อกกว่า 8 เม็ด คัดสรรตามรูปทรง กะรัต สี ความใส และการเจียระไน`,
  };
}

export default async function DiamondsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const diamonds = await getDiamonds();
  return <DiamondsPageClient diamonds={diamonds} />;
}
