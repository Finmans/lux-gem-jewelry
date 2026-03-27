import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { products: true } } },
    });
    return NextResponse.json(collections);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collection = await prisma.collection.create({
      data: {
        id: body.id || `collection_${Date.now()}`,
        slug: body.slug,
        name: body.name,
        nameTH: body.nameTH || null,
        description: body.description,
        startingPriceTHB: body.startingPriceTHB,
        pieceCount: body.pieceCount || 0,
        gradient: body.gradient || null,
      },
    });
    return NextResponse.json(collection, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
