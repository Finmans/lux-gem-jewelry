import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

// ── Validation schema ────────────────────────────────────────
const SHAPES = ["Round","Oval","Cushion","Princess","Emerald","Pear","Radiant","Marquise","Asscher","Heart"];
const COLORS = ["D","E","F","G","H","I","J"];
const CLARITIES = ["IF","VVS1","VVS2","VS1","VS2","SI1","SI2"];
const GRADES = ["Excellent","Very Good","Good","Fair"];
const FLUORS = ["None","Faint","Medium","Strong","Very Strong"];

function validateUpdate(body: Record<string, unknown>): string[] {
  const errors: string[] = [];
  if (!body.shape || !SHAPES.includes(body.shape as string)) errors.push("Invalid shape");
  if (typeof body.carat !== "number" || body.carat <= 0) errors.push("Carat must be a positive number");
  if (!body.color || !COLORS.includes(body.color as string)) errors.push("Invalid color grade");
  if (!body.clarity || !CLARITIES.includes(body.clarity as string)) errors.push("Invalid clarity grade");
  if (!body.cut || !GRADES.includes(body.cut as string)) errors.push("Invalid cut grade");
  if (!body.polish || !GRADES.includes(body.polish as string)) errors.push("Invalid polish grade");
  if (!body.symmetry || !GRADES.includes(body.symmetry as string)) errors.push("Invalid symmetry grade");
  if (!body.fluorescence || !FLUORS.includes(body.fluorescence as string)) errors.push("Invalid fluorescence");
  if (body.lab !== "IGI") errors.push("Lab must be IGI");
  if (!body.certificateNumber || typeof body.certificateNumber !== "string") errors.push("Certificate number is required");
  if (typeof body.priceTHB !== "number" || body.priceTHB < 0) errors.push("Price THB must be a non-negative number");
  if (typeof body.priceUSD !== "number" || body.priceUSD < 0) errors.push("Price USD must be a non-negative number");
  return errors;
}

// ── GET ───────────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const diamond = await prisma.diamond.findUnique({ where: { id } });
    if (!diamond) {
      return NextResponse.json({ error: "Diamond not found" }, { status: 404 });
    }
    return NextResponse.json(diamond);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ── PUT (update) ──────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Check exists
    const existing = await prisma.diamond.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Diamond not found" }, { status: 404 });
    }

    // Validate input
    const errors = validateUpdate(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    }

    // Check cert uniqueness (if changing)
    if (body.certificateNumber !== existing.certificateNumber) {
      const certExists = await prisma.diamond.findUnique({
        where: { certificateNumber: body.certificateNumber },
      });
      if (certExists) {
        return NextResponse.json(
          { error: `Certificate ${body.certificateNumber} already exists on another diamond` },
          { status: 409 }
        );
      }
    }

    const diamond = await prisma.diamond.update({
      where: { id },
      data: {
        shape: body.shape,
        carat: body.carat,
        color: body.color,
        clarity: body.clarity,
        cut: body.cut,
        polish: body.polish,
        symmetry: body.symmetry,
        fluorescence: body.fluorescence,
        lab: body.lab,
        certificateNumber: body.certificateNumber,
        priceTHB: body.priceTHB,
        priceUSD: body.priceUSD,
        available: body.available,
        imageUrl: body.imageUrl ?? null,
      },
    });
    return NextResponse.json(diamond);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json({ error: "Certificate number already exists" }, { status: 409 });
      }
      if (err.code === "P2025") {
        return NextResponse.json({ error: "Diamond not found" }, { status: 404 });
      }
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ── DELETE ───────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.diamond.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return NextResponse.json({ error: "Diamond not found" }, { status: 404 });
      }
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
