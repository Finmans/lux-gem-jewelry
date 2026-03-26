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
    const product = await prisma.product.update({
      where: { id },
      data: {
        name:        body.name,
        category:    body.category,
        collectionId: body.collectionId,
        metals:      Array.isArray(body.metals) ? body.metals.join(", ") : body.metals,
        centerStone: body.centerStone ?? "",
        priceTHB:    body.priceTHB,
        priceUSD:    body.priceUSD,
        badge:       body.badge || null,
        description: body.description ?? "",
        gradient:    body.gradient ?? null,
        imageUrl:    body.imageUrl ?? null,
        isFeatured:  body.isFeatured ?? false,
        inStock:     body.inStock ?? true,
      },
      include: { collection: { select: { name: true, slug: true } } },
    });
    return NextResponse.json(product);
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
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
