"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "Spark completely changed how we ship software. Deployment time dropped from 45 minutes to under 2. It's the platform we always wished existed.",
    name: "Sarah Chen",
    role: "CTO at Lumos",
    avatar: "SC",
  },
  {
    quote:
      "We evaluated six platforms and Spark won on every dimension — performance, DX, and support. Our team was productive on day one.",
    name: "Marcus Williams",
    role: "VP Engineering at Reframe",
    avatar: "MW",
  },
  {
    quote:
      "The analytics alone are worth it. We finally have visibility into what's actually happening in production without drowning in noise.",
    name: "Priya Nair",
    role: "Lead Engineer at Axiom",
    avatar: "PN",
  },
  {
    quote:
      "Scaled from 100 to 10 million users without touching a config. Spark just handled it. That's what I call infrastructure done right.",
    name: "James Park",
    role: "Founder at Streamline",
    avatar: "JP",
  },
  {
    quote:
      "Security audit took half the time it normally would because Spark had everything we needed already documented and certified.",
    name: "Elena Vasquez",
    role: "Head of Security at Kova",
    avatar: "EV",
  },
  {
    quote:
      "The developer experience is phenomenal. TypeScript SDK, great docs, fast support. It's rare to feel this good about a vendor.",
    name: "Ryo Tanaka",
    role: "Staff Engineer at Optic",
    avatar: "RT",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Loved by engineering teams
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="border-border/60 hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                        {t.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
