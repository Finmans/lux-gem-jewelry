import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquirySchema, formatZodError, isSpam } from "@/lib/validation";
import { sendBusinessNotification } from "@/lib/email";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = inquirySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  if (isSpam(data.website)) {
    return NextResponse.json({ ok: true });
  }

  await prisma.inquiry.create({
    data: {
      type: data.type,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      category: data.category,
      sourcePage: data.sourcePage,
      budgetMinTHB: data.budgetMinTHB,
      budgetMaxTHB: data.budgetMaxTHB,
      metadataJson: data.metadataJson,
      diamondId: data.diamondId,
      buildDraftId: data.buildDraftId,
    },
  });

  await sendBusinessNotification({
    subject: `[LUX GEM] New ${data.type} inquiry`,
    text: `Type: ${data.type}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "-"}\nCategory: ${data.category ?? "-"}\nDiamond: ${data.diamondId ?? "-"}\nMessage: ${data.message ?? "-"}`,
  });

  return NextResponse.json({ ok: true, message: "Inquiry submitted" });
}
