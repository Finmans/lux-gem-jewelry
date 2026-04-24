import type { Metadata } from "next";
import { BuildPageClient } from "@/components/pages/build-page-client";
import { getDiamonds, getSettings } from "@/lib/site-data";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ diamond?: string }>;
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Build Your Ring | LUX GEM",
  description:
    "Choose a certified diamond, pair it with a setting, and submit your LUX GEM ring consultation request.",
};

export default async function BuildPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const [diamonds, settings] = await Promise.all([getDiamonds(), getSettings()]);

  return (
    <BuildPageClient
      diamonds={diamonds}
      settings={settings}
      preselectedDiamondId={sp.diamond}
    />
  );
}
