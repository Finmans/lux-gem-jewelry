import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    
    const where: any = {};
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
