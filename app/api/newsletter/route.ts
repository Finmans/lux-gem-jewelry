import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema, formatZodError, isSpam } from "@/lib/validation";
import { sendBusinessNotification } from "@/lib/email";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = newsletterSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  if (isSpam(data.website)) {
    return NextResponse.json({ ok: true });
  }

  await prisma.newsletterSubscriber.upsert({
    where: { email: data.email },
    update: { sourcePage: data.sourcePage ?? "/" },
    create: {
      email: data.email,
      sourcePage: data.sourcePage ?? "/",
    },
  });

  await sendBusinessNotification({
    subject: "[LUX GEM] New newsletter subscriber",
    text: `Email: ${data.email}\nSource: ${data.sourcePage ?? "/"}`,
  });

  return NextResponse.json({ ok: true, message: "Subscribed successfully" });
}
