import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

// ── Auto-increment ID ────────────────────────────────────────
async function getNextDiamondId(): Promise<string> {
  const latest = await prisma.diamond.findFirst({
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  if (!latest) return "D001";
  const num = parseInt(latest.id.replace(/\D/g, ""), 10);
  return `D${String(num + 1).padStart(3, "0")}`;
}

// ── Validation schema ────────────────────────────────────────
const SHAPES = ["Round","Oval","Cushion","Princess","Emerald","Pear","Radiant","Marquise","Asscher","Heart"];
const COLORS = ["D","E","F","G","H","I","J"];
const CLARITIES = ["IF","VVS1","VVS2","VS1","VS2","SI1","SI2"];
const GRADES = ["Excellent","Very Good","Good","Fair"];
const FLUORS = ["None","Faint","Medium","Strong","Very Strong"];

function validateDiamond(body: Record<string, unknown>): string[] {
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
export async function GET() {
  try {
    const diamonds = await prisma.diamond.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(diamonds);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// ── POST ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const errors = validateDiamond(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join("; ") }, { status: 400 });
    }

    // Check for duplicate certificate
    const existing = await prisma.diamond.findUnique({
      where: { certificateNumber: body.certificateNumber },
    });
    if (existing) {
      return NextResponse.json(
        { error: `Certificate ${body.certificateNumber} already exists` },
        { status: 409 }
      );
    }

    const id = await getNextDiamondId();
    const diamond = await prisma.diamond.create({
      data: {
        id,
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
        available: body.available ?? true,
        imageUrl: body.imageUrl ?? null,
      },
    });
    return NextResponse.json(diamond, { status: 201 });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return NextResponse.json({ error: "Certificate number already exists" }, { status: 409 });
      }
    }
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
