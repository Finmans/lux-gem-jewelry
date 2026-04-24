// Locale layout — wraps all [locale] pages with i18n provider
// Root layout (app/layout.tsx) provides <html> and <body>

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/routing";
import { ClientLayout } from "@/components/shared/client-layout";
import { Footer } from "@/components/shared/footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "th")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientLayout>
        {children}
        <Footer />
      </ClientLayout>
    </NextIntlClientProvider>
  );
}
