import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { collection: { select: { name: true, slug: true } } },
    });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug =
      body.slug ||
      (body.name as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now();

    const product = await prisma.product.create({
      data: {
        id:          "P-" + Date.now(),
        slug,
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
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
