import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const appointment = await prisma.appointment.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json(appointment);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
