import { DiamondsPageClient } from "@/components/pages/diamonds-page-client";

import { getDiamonds } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function DiamondsPage() {
  const diamonds = await getDiamonds();
  return <DiamondsPageClient diamonds={diamonds} />;
}
