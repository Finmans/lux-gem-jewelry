import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/shared/client-layout";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-app-ebon-alpha-25.vercel.app"),
  title: {
    default: "LUX GEM — Lab-Grown Diamond Jewelry",
    template: "%s | LUX GEM",
  },
  description:
    "Crafted Brilliance, Reimagined. Premium lab-grown diamond jewelry with uncompromising quality, transparency, and timeless design.",
  openGraph: {
    title: "LUX GEM — Lab-Grown Diamond Jewelry",
    description:
      "Crafted Brilliance, Reimagined. Premium lab-grown diamond jewelry with uncompromising quality, transparency, and timeless design.",
    url: "https://my-app-ebon-alpha-25.vercel.app",
    siteName: "LUX GEM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUX GEM — Lab-Grown Diamond Jewelry",
    description:
      "Crafted Brilliance, Reimagined. Premium lab-grown diamond jewelry with uncompromising quality, transparency, and timeless design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
