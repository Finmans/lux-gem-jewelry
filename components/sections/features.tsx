"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  Layers,
  Terminal,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Lightning fast",
    description:
      "Deploy in seconds, not minutes. Our edge network ensures your users get sub-100ms responses globally.",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Enterprise security",
    description:
      "SOC 2 Type II certified with end-to-end encryption, SSO, and advanced audit logs out of the box.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: BarChart3,
    title: "Powerful analytics",
    description:
      "Real-time dashboards with deep insights into performance, usage, and user behavior — no setup required.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Globe,
    title: "Global scale",
    description:
      "Automatically distributes across 50+ regions. Handle millions of users without managing infrastructure.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Layers,
    title: "Composable APIs",
    description:
      "Clean, well-documented REST & GraphQL APIs that integrate seamlessly with your existing stack.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Terminal,
    title: "Developer first",
    description:
      "Built by developers, for developers. CLI tools, SDKs, and type-safe clients in every major language.",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
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
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            A complete platform designed to make your team move faster and your
            product shine brighter.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card className="h-full border-border/60 hover:border-border hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110",
                      feature.bg
                    )}
                  >
                    <feature.icon className={cn("w-5 h-5", feature.color)} />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
