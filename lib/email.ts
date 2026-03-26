import { Resend } from "resend";

type EmailPayload = {
  subject: string;
  text: string;
};

const resendApiKey = process.env.RESEND_API_KEY;
const businessEmail = process.env.BUSINESS_EMAIL;
const fromEmail = process.env.EMAIL_FROM || "LUX GEM <noreply@luxgem.example>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendBusinessNotification({ subject, text }: EmailPayload) {
  if (!resend || !businessEmail) {
    console.info("[email-fallback]", { subject, text });
    return { delivered: false, mode: "fallback" as const };
  }

  await resend.emails.send({
    from: fromEmail,
    to: [businessEmail],
    subject,
    text,
  });

  return { delivered: true, mode: "resend" as const };
}
