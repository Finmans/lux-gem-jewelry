import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { collection: true },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        name:         body.name,
        category:     body.category,
        collectionId: body.collectionId,
        metals:       body.metals ? JSON.stringify(body.metals) : undefined,
        centerStone:  body.centerStone,
        priceTHB:     body.priceTHB,
        priceUSD:     body.priceUSD,
        badge:        body.badge,
        description:  body.description,
        gradient:     body.gradient,
        isFeatured:   body.isFeatured,
        inStock:      body.inStock,
        imageUrl:      body.imageUrl ?? null,
      },
    });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id },
      data: {
        slug: body.slug,
        name: body.name,
        category: body.category,
        collectionId: body.collectionId,
        metals: body.metals ? JSON.stringify(body.metals) : undefined,
        centerStone: body.centerStone,
        priceTHB: body.priceTHB,
        priceUSD: body.priceUSD,
        badge: body.badge,
        description: body.description,
        gradient: body.gradient,
        isFeatured: body.isFeatured,
        inStock: body.inStock,
        imageUrl: body.imageUrl ?? null,
      },
    });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
