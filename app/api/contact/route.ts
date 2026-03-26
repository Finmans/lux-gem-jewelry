import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema, formatZodError, isSpam } from "@/lib/validation";
import { sendBusinessNotification } from "@/lib/email";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  if (isSpam(data.website)) {
    return NextResponse.json({ ok: true });
  }

  await prisma.inquiry.create({
    data: {
      type: "CONTACT",
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      sourcePage: data.sourcePage ?? "/contact",
    },
  });

  await sendBusinessNotification({
    subject: "[LUX GEM] New contact inquiry",
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "-"}\nMessage:\n${data.message}`,
  });

  return NextResponse.json({ ok: true, message: "Inquiry submitted" });
}
