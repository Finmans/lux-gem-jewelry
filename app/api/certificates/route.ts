import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number")?.trim();

  if (!number) {
    return NextResponse.json({ ok: false, message: "Certificate number is required" }, { status: 400 });
  }

  const record = await prisma.certificateRecord.findUnique({
    where: { certificateNumber: number },
    include: { diamond: true },
  });

  if (!record) {
    return NextResponse.json({ ok: true, found: false });
  }

  return NextResponse.json({
    ok: true,
    found: true,
    record: {
      certificateNumber: record.certificateNumber,
      lab: record.lab,
      notes: record.notes,
      diamond: record.diamond
        ? {
            id: record.diamond.id,
            shape: record.diamond.shape,
            carat: record.diamond.carat,
            color: record.diamond.color,
            clarity: record.diamond.clarity,
            cut: record.diamond.cut,
          }
        : null,
    },
  });
}
