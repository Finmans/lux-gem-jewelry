import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json(inquiry);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
