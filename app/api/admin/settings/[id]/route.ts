import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const setting = await prisma.setting.update({
      where: { id },
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        metals: body.metals ? JSON.stringify(body.metals) : undefined,
        priceAddTHB: body.priceAddTHB,
        isActive: body.isActive,
      },
    });
    return NextResponse.json(setting);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.setting.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
