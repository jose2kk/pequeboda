"use client";

import { motion } from "framer-motion";

interface FooterProps {
  name1?: string;
  name2?: string;
  hashtag?: string;
}

export default function Footer({
  name1 = "Name",
  name2 = "Name",
  hashtag,
}: FooterProps) {
  return (
    <footer className="py-10 sm:py-12 md:py-16 bg-dark text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Script monogram */}
          <p className="font-[family-name:var(--font-script)] text-5xl md:text-6xl text-white/80 mb-6">
            {name1[0]} & {name2[0]}
          </p>

          <p className="font-[family-name:var(--font-title)] text-xl md:text-2xl font-light tracking-[0.1em] mb-4">
            {name1} & {name2}
          </p>

          {hashtag && (
            <p className="text-white/50 tracking-[0.3em] uppercase text-xs mb-8 font-[family-name:var(--font-caps)]">
              {hashtag}
            </p>
          )}

          <div className="h-px w-16 bg-white/20 mx-auto mb-8" />

          <p className="text-white/40 text-xs tracking-[0.2em] font-[family-name:var(--font-body)]">
            No podemos esperar para celebrar con ustedes
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
