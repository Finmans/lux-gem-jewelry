"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "12k+", label: "Teams using Spark" },
  { value: "<50ms", label: "Median response time" },
  { value: "190+", label: "Countries served" },
];

export function StatsSection() {
  return (
    <section className="border-y border-border/50 bg-muted/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
