import Link from "next/link";
import { useTranslations } from "next-intl";
import { Camera, Globe, Play, MessageCircle } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const footerLinks = {
  Jewelry: [
    { labelKey: "engagementRings", href: "/collections/engagement" },
    { labelKey: "weddingBands", href: "/collections/wedding" },
    { labelKey: "fineEarrings", href: "/collections/earrings" },
    { labelKey: "pendants", href: "/collections/necklace" },
    { labelKey: "bracelets", href: "/collections/bracelet" },
    { labelKey: "highJewelry", href: "/collections/high-jewelry" },
  ],
  Diamonds: [
    { labelKey: "diamondStock", href: "/diamonds" },
    { labelKey: "buildYourRing", href: "/build" },
    { labelKey: "the4Cs", href: "/education/4cs" },
    { labelKey: "labVsNatural", href: "/education/lab-diamonds" },
    { labelKey: "diamondShapes", href: "/education/shapes" },
  ],
  Services: [
    { labelKey: "customDesign", href: "/custom" },
    { labelKey: "bookAppointment", href: "/appointment" },
    { labelKey: "ringSizing", href: "/services/sizing" },
    { labelKey: "cleaningCare", href: "/services/care" },
    { labelKey: "certificateVerify", href: "/services/verify" },
    { labelKey: "warranty", href: "/warranty" },
  ],
  Company: [
    { labelKey: "aboutLUXGEM", href: "/about" },
    { labelKey: "ourPhilosophy", href: "/about#philosophy" },
    { labelKey: "journal", href: "/journal" },
    { labelKey: "careers", href: "/careers" },
    { labelKey: "contact", href: "/contact" },
    { labelKey: "privacyPolicy", href: "/privacy" },
  ],
};

const socials = [
  { Icon: Camera, label: "Instagram", href: "/contact?channel=instagram" },
  { Icon: Globe, label: "Facebook", href: "/contact?facebook" },
  { Icon: Play, label: "YouTube", href: "/contact?channel=youtube" },
  { Icon: MessageCircle, label: "LINE", href: "/contact?channel=line" },
];

type FooterLink = {
  labelKey: string;
  href: string;
};

// Prepend locale to href — root hrefs like "/about" become "/th/about"
function localizedHref(href: string, locale: string): string {
  if (href.startsWith("/" + locale) || href.startsWith("http") || href.includes("#")) {
    return href;
  }
  return `/${locale}${href}`;
}

type FooterProps = { locale: string };

export async function Footer({ locale }: FooterProps) {
  const t = await useTranslations("footer");

  return (
    <footer aria-label="Site footer" className="border-t border-[#2A2A30] bg-[#080809]">
      {/* Top band */}
      <div className="border-b border-[#1A1A1E] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            {/* Brand */}
            <div className="max-w-xs">
              <p className="font-display text-2xl font-light tracking-[0.3em] text-[#F6F1E8]">
                LUX GEM
              </p>
              <p className="text-[9px] tracking-[0.4em] text-[#8A8F98] uppercase mt-0.5 mb-4">
                Jewelry Co., Ltd.
              </p>
              <p className="text-sm text-[#8A8F98] leading-relaxed font-light">
                Lab-grown diamonds of exceptional beauty. Crafting timeless
                pieces with modern transparency and uncompromising precision.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto">
              <p className="text-[10px] tracking-[0.3em] text-[#C6A878] uppercase mb-3">
                {t("joinInnerCircle")}
              </p>
              <NewsletterForm sourcePage="footer" />
              <p className="text-xs text-[#8A8F98]/60 mt-2">
                {t("exclusiveText")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {Object.entries(footerLinks).map(([categoryKey, links]) => (
              <nav key={categoryKey} aria-label={`${categoryKey} links`}>
                <p className="text-[10px] tracking-[0.3em] text-[#C6A878] uppercase mb-5">
                  {t(categoryKey.toLowerCase() as "jewelry" | "diamonds" | "services" | "company")}
                </p>
                <ul className="space-y-3">
                  {(links as FooterLink[]).map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localizedHref(link.href, locale)}
                        className="text-sm text-[#8A8F98] hover:text-[#F6F1E8] transition-colors font-light"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A1E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A8F98]/60 font-light">
            © 2024 บริษัท ลักซ์เจมส์จิวเวลรี่ จำกัด / LUX GEM JEWELRY CO., LTD.{" "}
            {t("copyright")}
          </p>
          <nav aria-label="Social media links">
            <div className="flex items-center gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center border border-[#2A2A30] text-[#8A8F98] hover:border-[#C6A878]/50 hover:text-[#C6A878] transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
