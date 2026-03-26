import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const diamonds = await prisma.diamond.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(diamonds);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const diamond = await prisma.diamond.create({
      data: {
        id: "D-" + Date.now(),
        shape: body.shape,
        carat: body.carat,
        color: body.color,
        clarity: body.clarity,
        cut: body.cut,
        polish: body.polish,
        symmetry: body.symmetry,
        fluorescence: body.fluorescence,
        lab: body.lab,
        certificateNumber: body.certificateNumber,
        priceTHB: body.priceTHB,
        priceUSD: body.priceUSD,
        available: body.available ?? true,
        imageUrl: body.imageUrl ?? null,
      },
    });
    return NextResponse.json(diamond, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
