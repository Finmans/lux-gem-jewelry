import Link from "next/link";
import { notFound } from "next/navigation";
import { getDiamondById } from "@/lib/site-data";
import { ReserveDiamondForm } from "@/components/forms/reserve-diamond-form";
import { WishlistToggle } from "@/components/client/wishlist-toggle";

type DiamondPageProps = {
  params: Promise<{ id: string }>;
};

const shapeIcons: Record<string, string> = {
  Round: "◯",
  Oval: "⬭",
  Cushion: "▣",
  Emerald: "▬",
  Princess: "◻",
  Pear: "⊙",
  Radiant: "◈",
  Marquise: "◇",
  Heart: "♡",
  Asscher: "⊠",
};

export const dynamic = "force-dynamic";

export default async function DiamondDetailPage({ params }: DiamondPageProps) {
  const { id } = await params;
  const diamond = await getDiamondById(id);

  if (!diamond) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B0B0D] pt-20">
      <section className="border-b border-[#1A1A1E] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start">
          <div className="border border-[#1A1A1E] bg-[#0D0D10] aspect-square flex items-center justify-center text-8xl text-[#C6A878]/70">
            {shapeIcons[diamond.shape] ?? "◇"}
          </div>
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#C6A878] uppercase mb-4">Diamond Detail</p>
            <h1 className="font-display text-5xl font-light text-[#F6F1E8] mb-2">
              {diamond.carat}ct {diamond.shape}
            </h1>
            <p className="text-[#8A8F98] font-mono text-sm mb-5">#{diamond.certificate}</p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="border border-[#1A1A1E] p-3 text-[#8A8F98]">Color: <span className="text-[#F6F1E8]">{diamond.color}</span></div>
              <div className="border border-[#1A1A1E] p-3 text-[#8A8F98]">Clarity: <span className="text-[#F6F1E8]">{diamond.clarity}</span></div>
              <div className="border border-[#1A1A1E] p-3 text-[#8A8F98]">Cut: <span className="text-[#F6F1E8]">{diamond.cut}</span></div>
              <div className="border border-[#1A1A1E] p-3 text-[#8A8F98]">Lab: <span className="text-[#F6F1E8]">{diamond.lab}</span></div>
            </div>
            <p className="font-display text-3xl font-light text-[#C6A878] mb-6">฿{diamond.priceTHB.toLocaleString()}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/build?diamond=${diamond.id}`}
                className="px-6 py-3 bg-[#C6A878] text-[#0B0B0D] text-[10px] tracking-[0.25em] uppercase hover:bg-[#D9C4A0] transition-colors text-center"
              >
                Build With This Diamond
              </Link>
              <WishlistToggle diamondId={diamond.id} />
            </div>
            <div className="mt-5">
              <ReserveDiamondForm diamondId={diamond.id} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
