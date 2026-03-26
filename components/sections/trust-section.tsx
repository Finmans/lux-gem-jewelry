"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, RotateCcw, CreditCard, Award, Phone, Star } from "lucide-react";
import { testimonials } from "@/lib/mock-data";
import { GemSparkle } from "@/components/ui/gem-sparkle";

const trustPoints = [
  {
    Icon: Shield,
    title: "Lifetime Warranty",
    description:
      "Every piece is backed by our lifetime craftsmanship warranty. Annual complimentary cleaning and inspection included.",
  },
  {
    Icon: RotateCcw,
    title: "30-Day Returns",
    description:
      "Not in love with it? Return any item in original condition within 30 days for a full refund.",
  },
  {
    Icon: Award,
    title: "GIA & IGI Certified",
    description:
      "Every diamond over 0.30ct ships with its official grading certificate from the world's leading gemological labs.",
  },
  {
    Icon: CreditCard,
    title: "Flexible Payment",
    description:
      "Bank transfer, all major credit cards, and 0% installment plans. Secure, encrypted transactions every time.",
  },
];

// Animated diamond divider
function DiamondDivider() {
  return (
    <div className="flex items-center gap-3 my-12">
      <motion.div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(198,168,120,0.3))" }}
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rotate-45 bg-[#C6A878]/30" />
        <motion.div
          className="w-2.5 h-2.5 rotate-45 border border-[#C6A878]/60"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="w-1 h-1 rotate-45 bg-[#C6A878]/30" />
      </div>
      <motion.div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to left, transparent, rgba(198,168,120,0.3))" }}
        initial={{ scaleX: 0, transformOrigin: "right" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="bg-[#080809] relative overflow-hidden">
      {/* Subtle facet background */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='70,6 134,70 70,134 6,70' stroke='%23C6A878' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "140px 140px",
        }}
      />

      {/* Trust pillars */}
      <div className="border-y border-[#1A1A1E] py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-3">
              Our Promise
            </p>
            <h2 className="font-display text-4xl font-light text-[#F6F1E8]">
              Buy with complete confidence
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1E]">
            {trustPoints.map((tp, i) => (
              <motion.div
                key={tp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="bg-[#080809] p-8 group relative overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top_left,rgba(198,168,120,0.07)_0%,transparent_65%)]" />

                {/* Sparkle on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <GemSparkle size={8} delay={0} duration={1.3} repeatDelay={2.5} color="#C6A878" className="relative" />
                </div>

                {/* Animated bottom sweep */}
                <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-transparent via-[#C6A878]/50 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 + i * 0.5, ease: "easeInOut" }}
                  />
                </div>

                {/* Icon container with animated border */}
                <div className="relative w-11 h-11 mb-5">
                  {/* Rotating dashed border */}
                  <motion.div
                    className="absolute inset-0 border border-dashed border-[#C6A878]/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transform: "rotate(45deg)" }}
                  />
                  <div className="absolute inset-[3px] border border-[#C6A878]/30 group-hover:border-[#C6A878]/60 transition-colors duration-300 flex items-center justify-center bg-[#080809]">
                    <tp.Icon className="w-4 h-4 text-[#C6A878]" />
                  </div>
                </div>

                <h3 className="text-sm font-light text-[#F6F1E8] mb-2 tracking-wide relative">
                  {tp.title}
                </h3>
                <p className="text-xs text-[#8A8F98] font-light leading-relaxed relative">
                  {tp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-3">
              Client Stories
            </p>
            <h2 className="font-display text-4xl font-light text-[#F6F1E8]">
              Moments that last forever
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.nameEN}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-[#1A1A1E] p-8 hover:border-[#C6A878]/30 transition-colors duration-500 group relative overflow-hidden"
              >
                {/* Hover bg shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-[#C6A878]/3 via-transparent to-transparent" />

                {/* Quote mark decoration */}
                <div className="absolute top-4 right-6 font-display text-5xl text-[#C6A878]/8 leading-none select-none">&ldquo;</div>

                {/* Stars with animation */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + j * 0.06 }}
                    >
                      <Star className="w-3 h-3 fill-[#C6A878] text-[#C6A878]" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[#8A8F98] font-light leading-relaxed mb-6 italic relative">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Diamond divider */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex-1 h-px bg-[#1A1A1E] group-hover:bg-[#C6A878]/15 transition-colors duration-500" />
                  <div className="w-1 h-1 rotate-45 bg-[#C6A878]/30" />
                  <div className="flex-1 h-px bg-[#1A1A1E] group-hover:bg-[#C6A878]/15 transition-colors duration-500" />
                </div>

                {/* Attribution */}
                <div className="flex items-end justify-between relative">
                  <div>
                    <p className="text-sm font-light text-[#F6F1E8]">{t.name}</p>
                    <p className="text-[10px] tracking-[0.1em] text-[#8A8F98]/70 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                  <p className="text-[9px] text-[#C6A878]/60 tracking-[0.1em] text-right">
                    {t.ring}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <DiamondDivider />

      {/* Appointment CTA */}
      <div className="border-t border-[#1A1A1E] py-20 relative">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(198,168,120,0.04)_0%,transparent_60%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div>
              <p className="text-[10px] tracking-[0.4em] text-[#C6A878] uppercase mb-3">
                Visit Us
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-[#F6F1E8] mb-2">
                Experience LUX GEM in person
              </h2>
              <p className="text-sm text-[#8A8F98] font-light">
                Private appointments available at our Bangkok showroom. Our gemologists are
                ready to guide you through every diamond in our collection.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/appointment"
                className="relative flex items-center gap-2 px-8 py-4 bg-[#C6A878] text-[#0B0B0D] text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-[#D9C4A0] transition-colors group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <Phone className="w-3.5 h-3.5 relative" />
                Book Appointment
              </Link>
              <Link
                href="/contact"
                className="relative flex items-center gap-2 px-8 py-4 border border-[#C6A878]/40 text-[#C6A878] text-[11px] tracking-[0.25em] uppercase hover:border-[#C6A878]/70 transition-colors group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C6A878]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
