"use client";

import { motion } from "framer-motion";

interface OurStoryProps {
  story?: string;
}

export default function OurStory({
  story = "Nuestra historia comienza aquí. Nos conocimos, nos enamoramos, y ahora nos casamos. Más detalles próximamente.",
}: OurStoryProps) {
  return (
    <section className="relative py-32 md:py-44 bg-cream">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent tracking-[0.4em] uppercase text-sm mb-6 font-[family-name:var(--font-caps)]">
            Nuestra Historia
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-24 bg-accent-light" />
            <div className="h-px w-24 bg-accent-light" />
          </div>

          <p className="font-[family-name:var(--font-body)] text-foreground text-lg md:text-xl leading-relaxed italic">
            &ldquo;{story}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
