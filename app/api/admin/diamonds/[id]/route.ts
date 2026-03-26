import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const diamond = await prisma.diamond.update({
      where: { id },
      data: {
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
        available: body.available,
        imageUrl: body.imageUrl ?? null,
      },
    });
    return NextResponse.json(diamond);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.diamond.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
