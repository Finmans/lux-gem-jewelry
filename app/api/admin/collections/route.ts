import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    });
    return NextResponse.json(collections);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
