"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/8 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium gap-1.5 rounded-full border border-border/60"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Introducing Spark 2.0 — Now in beta
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl mx-auto"
        >
          Build products your
          <span className="block relative">
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              customers love
            </span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Spark gives your team the tools to ship faster, collaborate better,
          and scale without limits — all in one beautifully crafted platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button size="lg" className="gap-2 px-8 rounded-full text-base">
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 px-8 rounded-full text-base"
          >
            View demo
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {["AB", "CK", "ML", "RS", "TN"].map((initials) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-primary/60 to-purple-500/60 flex items-center justify-center text-[10px] font-semibold text-white"
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Trusted by{" "}
            <span className="font-semibold text-foreground">12,000+</span>{" "}
            developers worldwide
          </p>
        </motion.div>

        {/* Preview window */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <div className="flex-1 mx-4 h-6 rounded-md bg-background/60 border border-border/40" />
            </div>
            {/* App mockup */}
            <div className="p-6 bg-gradient-to-br from-muted/20 to-muted/5 min-h-[280px] grid grid-cols-3 gap-4">
              <div className="col-span-1 space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 rounded-md bg-muted/60 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                ))}
              </div>
              <div className="col-span-2 rounded-xl bg-background/50 border border-border/40 p-4 space-y-3">
                <div className="h-4 w-1/3 rounded bg-muted/60" />
                <div className="h-24 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-16 rounded-lg bg-muted/40 border border-border/30" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
