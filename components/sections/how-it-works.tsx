"use client";

import { motion } from "framer-motion";
import { Upload, Settings2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Connect your project",
    description:
      "Link your repository or start from a template. Spark auto-detects your stack and configures everything in seconds.",
  },
  {
    step: "02",
    icon: Settings2,
    title: "Configure & customize",
    description:
      "Set your environment, scaling rules, and integrations through our intuitive dashboard or config-as-code.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Ship with confidence",
    description:
      "Deploy globally with one command. Automatic rollbacks, canary releases, and zero-downtime deployments built in.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
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
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No PhD in DevOps required. Get from zero to production in three
            simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <p className="text-xs font-mono text-muted-foreground/60 mb-2">
                  {step.step}
                </p>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
