"use client";

import { motion } from "framer-motion";

interface SaveTheDateProps {
  date?: string;
  venue?: string;
  location?: string;
}

export default function SaveTheDate({
  date = "Fecha por confirmar",
  venue = "Lugar por confirmar",
  location = "Ubicación por confirmar",
}: SaveTheDateProps) {
  return (
    <section className="relative py-32 md:py-44 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent tracking-[0.4em] uppercase text-sm mb-6 font-[family-name:var(--font-caps)]">
            Reserva la Fecha
          </p>

          <h2 className="font-[family-name:var(--font-title)] text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] mb-12">
            {date}
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-accent-light" />
          </div>

          <p className="font-[family-name:var(--font-body)] text-foreground text-xl md:text-2xl font-normal mb-2">
            {venue}
          </p>
          <p className="text-muted tracking-[0.2em] uppercase text-sm font-[family-name:var(--font-caps)]">
            {location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
