// Root layout — single HTML shell + i18n provider
// Locale is read from URL pathname directly (middleware handles routing and cookies)

import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import { cookies, headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/routing";
import { ClientLayout } from "@/components/shared/client-layout";
import { Footer } from "@/components/shared/footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-app-finmans-projects.vercel.app"),
  openGraph: {
    type: "website",
    siteName: "LUX GEM",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read locale from cookie (set by middleware based on URL pathname)
  const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value;
  const locale = (routing.locales.includes(cookieLocale as "en" | "th")
    ? cookieLocale
    : routing.defaultLocale) as "en" | "th";

  let messages;
  try {
    messages = await getMessages();
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>
            {children}
            <Footer />
          </ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
