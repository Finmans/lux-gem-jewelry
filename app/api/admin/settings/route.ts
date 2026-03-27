import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.setting.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const setting = await prisma.setting.create({
      data: {
        id: body.id || `setting_${Date.now()}`,
        slug: body.slug,
        name: body.name,
        description: body.description || null,
        metals: JSON.stringify(body.metals || []),
        priceAddTHB: body.priceAddTHB || 0,
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(setting, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
