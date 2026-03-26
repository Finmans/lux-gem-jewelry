import Link from "next/link";
import { Camera, Globe, Play, MessageCircle } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const footerLinks = {
  Jewelry: [
    { label: "Engagement Rings", href: "/collections/engagement" },
    { label: "Wedding Bands", href: "/collections/wedding" },
    { label: "Fine Earrings", href: "/collections/earrings" },
    { label: "Pendants & Necklaces", href: "/collections/necklace" },
    { label: "Tennis Bracelets", href: "/collections/bracelet" },
    { label: "High Jewelry", href: "/collections/high-jewelry" },
  ],
  Diamonds: [
    { label: "Diamond Stock", href: "/diamonds" },
    { label: "Build Your Ring", href: "/build" },
    { label: "The 4Cs Guide", href: "/education/4cs" },
    { label: "Lab vs Natural", href: "/education/lab-diamonds" },
    { label: "Diamond Shapes", href: "/education/shapes" },
  ],
  Services: [
    { label: "Custom Design", href: "/custom" },
    { label: "Book Appointment", href: "/appointment" },
    { label: "Ring Sizing", href: "/services/sizing" },
    { label: "Cleaning & Care", href: "/services/care" },
    { label: "Certificate Verify", href: "/services/verify" },
    { label: "Warranty", href: "/warranty" },
    { label: "Returns & Exchanges", href: "/returns" },
  ],
  Company: [
    { label: "About LUX GEM", href: "/about" },
    { label: "Our Philosophy", href: "/about#philosophy" },
    { label: "Journal", href: "/journal" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socials = [
  { Icon: Camera, label: "Instagram", href: "/contact?channel=instagram" },
  { Icon: Globe, label: "Facebook", href: "/contact?channel=facebook" },
  { Icon: Play, label: "YouTube", href: "/contact?channel=youtube" },
  { Icon: MessageCircle, label: "LINE", href: "/contact?channel=line" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A30] bg-[#080809]">
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
                Lab-grown diamonds of exceptional beauty. Crafting timeless pieces
                with modern transparency and uncompromising precision.
              </p>
            </div>

            {/* Newsletter */}
            <div className="w-full lg:w-auto">
              <p className="text-[10px] tracking-[0.3em] text-[#C6A878] uppercase mb-3">
                Join our inner circle
              </p>
              <NewsletterForm sourcePage="footer" />
              <p className="text-xs text-[#8A8F98]/60 mt-2">
                Exclusive collections, events & diamond education.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main links */}
      <div className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-[10px] tracking-[0.3em] text-[#C6A878] uppercase mb-5">
                  {category}
                </p>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#8A8F98] hover:text-[#F6F1E8] transition-colors font-light"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1A1A1E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8A8F98]/60 font-light">
            © 2024 บริษัท ลักซ์เจมส์จิวเวลรี่ จำกัด / LUX GEM JEWELRY CO., LTD.
            All rights reserved.
          </p>
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
        </div>
      </div>
    </footer>
  );
}
