"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTASection() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-primary text-primary-foreground px-8 py-20 text-center"
        >
          {/* Decorative orbs */}
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-[80px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-white/8 blur-[60px] translate-y-1/2" />

          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest opacity-70 mb-4">
              Get started today
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
              Ship your best work, starting now
            </h2>
            <p className="mt-4 text-lg opacity-80 max-w-lg mx-auto">
              Join thousands of teams building on Spark. Free forever for solo
              developers. No credit card required.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white/30 flex-1"
              />
              <Button
                variant="secondary"
                size="default"
                className="gap-2 whitespace-nowrap w-full sm:w-auto"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <p className="mt-4 text-xs opacity-50">
              Free plan includes 3 projects, 100GB bandwidth, and community
              support.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
