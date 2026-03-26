import type { Metadata } from "next";

import { BuildPageClient } from "@/components/pages/build-page-client";
import { getDiamonds, getSettings } from "@/lib/site-data";

export const dynamic = "force-dynamic";

type BuildPageProps = {
  searchParams: Promise<{ diamond?: string }>;
};

export const metadata: Metadata = {
  title: "Build Your Ring | LUX GEM",
  description:
    "Choose a certified diamond, pair it with a setting, and submit your LUX GEM ring consultation request.",
};

export default async function BuildPage({ searchParams }: BuildPageProps) {
  const params = await searchParams;
  const [diamonds, settings] = await Promise.all([getDiamonds(), getSettings()]);

  return (
    <BuildPageClient
      diamonds={diamonds}
      settings={settings}
      preselectedDiamondId={params.diamond}
    />
  );
}
