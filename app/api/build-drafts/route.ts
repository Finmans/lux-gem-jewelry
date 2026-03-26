import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildDraftSchema, formatZodError, isSpam } from "@/lib/validation";
import { sendBusinessNotification } from "@/lib/email";

function buildReferenceCode() {
  return `LG-${randomUUID().slice(0, 8).toUpperCase()}`;
}

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = buildDraftSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  if (isSpam(data.website)) {
    return NextResponse.json({ ok: true });
  }

  const buildDraft = await prisma.buildDraft.create({
    data: {
      referenceCode: buildReferenceCode(),
      status: "SUBMITTED",
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      diamondId: data.diamondId,
      settingId: data.settingId,
      selectedMetal: data.selectedMetal,
      ringSize: data.ringSize,
      notes: data.notes,
      estimatedPriceTHB: data.estimatedPriceTHB,
    },
  });

  await prisma.inquiry.create({
    data: {
      type: "BUILD_REQUEST",
      name: data.customerName,
      email: data.customerEmail,
      phone: data.customerPhone,
      message: data.notes,
      sourcePage: "/build",
      diamondId: data.diamondId,
      buildDraftId: buildDraft.id,
      metadataJson: JSON.stringify({ selectedMetal: data.selectedMetal, ringSize: data.ringSize }),
    },
  });

  await sendBusinessNotification({
    subject: `[LUX GEM] New ring build submission ${buildDraft.referenceCode}`,
    text: `Reference: ${buildDraft.referenceCode}\nName: ${data.customerName}\nEmail: ${data.customerEmail}\nDiamond: ${data.diamondId}\nSetting: ${data.settingId}\nMetal: ${data.selectedMetal}\nEstimated THB: ${data.estimatedPriceTHB ?? "-"}`,
  });

  return NextResponse.json({
    ok: true,
    message: "Build request submitted",
    referenceCode: buildDraft.referenceCode,
    buildDraftId: buildDraft.id,
  });
}
