import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema, formatZodError, isSpam } from "@/lib/validation";
import { sendBusinessNotification } from "@/lib/email";

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = appointmentSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: formatZodError(parsed.error) }, { status: 400 });
  }

  const data = parsed.data;

  if (isSpam(data.website)) {
    return NextResponse.json({ ok: true });
  }

  const preferredDate = data.preferredDate ? new Date(data.preferredDate) : undefined;

  await prisma.appointment.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      consultationType: data.consultationType,
      preferredDate,
      preferredTime: data.preferredTime,
      notes: data.notes,
    },
  });

  await sendBusinessNotification({
    subject: "[LUX GEM] New appointment request",
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone ?? "-"}\nType: ${data.consultationType ?? "General"}\nDate: ${data.preferredDate ?? "-"}\nTime: ${data.preferredTime ?? "-"}\nNotes: ${data.notes ?? "-"}`,
  });

  return NextResponse.json({ ok: true, message: "Appointment request submitted" });
}
