import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    
    const where: any = {};
    if (type) where.type = type;
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { diamond: true },
    });
    return NextResponse.json(inquiries);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
