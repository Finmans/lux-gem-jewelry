// @ts-nocheck
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/shared/client-layout";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "thai"] as any,
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "thai"] as any,
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "thai"] as any,
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
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUX GEM — Lab-Grown Diamond Jewelry",
    description:
      "Crafted Brilliance, Reimagined. Premium lab-grown diamond jewelry with uncompromising quality, transparency, and timeless design.",
  },
};

const skipLinkStyle = `
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    z-index: 1000;
    background: #C6A878;
    color: #0B0B0D;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: 0;
    outline: 2px solid #C6A878;
    outline-offset: 2px;
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: skipLinkStyle }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
