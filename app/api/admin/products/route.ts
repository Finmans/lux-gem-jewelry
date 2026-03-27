import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collectionSlug = searchParams.get("collection");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    
    const where: any = {};
    if (collectionSlug) {
      where.collection = { slug: collectionSlug };
    }
    if (featured === "true") {
      where.isFeatured = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { collection: true },
    });
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        id: body.id || `P${Date.now()}`,
        slug: body.slug,
        name: body.name,
        category: body.category,
        collectionId: body.collectionId,
        metals: JSON.stringify(body.metals || []),
        centerStone: body.centerStone,
        priceTHB: body.priceTHB,
        priceUSD: body.priceUSD,
        badge: body.badge || null,
        description: body.description,
        gradient: body.gradient || null,
        isFeatured: body.isFeatured ?? false,
        inStock: body.inStock ?? true,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
