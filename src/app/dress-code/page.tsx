"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PinterestBoard from "@/components/PinterestBoard";

const PINTEREST_BOARD_URL =
  "https://www.pinterest.com/anatudares/dresscode-pequeboda/";

const dressCodeGuidance = [
  {
    title: "Mujeres",
    description:
      "Vestido largo. Evitar el blanco, reservado para la novia.",
  },
  {
    title: "Hombres",
    description:
      "Traje formal/tropical.",
  },
];

export default function DressCodePage() {
  return (
    <main>
      <Navigation name1="Ana" name2="Jose" />

      {/* Hero header */}
      <section className="min-h-[60svh] bg-background pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-12 md:pb-16 flex items-center">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-[family-name:var(--font-script)] text-foreground text-5xl sm:text-6xl md:text-7xl mb-4"
          >
            Dress Code
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-px w-16 bg-foreground/20 mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="font-[family-name:var(--font-caps)] text-accent tracking-[0.3em] uppercase text-[11px] sm:text-xs mb-6"
          >
            Código de Vestimenta
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="font-[family-name:var(--font-body)] text-muted text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            Nuestra celebración será de etiqueta formal. A continuación
            encontrarás algunas sugerencias e inspiración.
          </motion.p>
        </div>
      </section>

      {/* Dress code guidance cards */}
      <section className="bg-cream py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {dressCodeGuidance.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-title)] text-foreground text-2xl sm:text-3xl font-light tracking-wide mb-3">
                  {item.title}
                </p>
                <div className="h-px w-10 bg-accent-light mx-auto mb-4" />
                <p className="font-[family-name:var(--font-body)] text-muted text-sm sm:text-[15px] leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider between guidance and Pinterest */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-14 sm:mt-18 md:mt-20"
          >
            <div className="h-px w-12 bg-accent-light" />
            <p className="font-[family-name:var(--font-caps)] text-accent tracking-[0.3em] uppercase text-[10px] sm:text-[11px]">
              Inspiración
            </p>
            <div className="h-px w-12 bg-accent-light" />
          </motion.div>
        </div>
      </section>

      {/* Pinterest board embed */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <p className="font-[family-name:var(--font-title)] text-foreground text-2xl sm:text-3xl md:text-4xl font-light tracking-wide mb-3">
              Tablero de Ideas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="overflow-hidden rounded-sm"
          >
            <PinterestBoard boardUrl={PINTEREST_BOARD_URL} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 sm:mt-10"
          >
            <a
              href={PINTEREST_BOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-caps)] text-accent tracking-[0.2em] uppercase text-[11px] sm:text-xs hover:opacity-70 transition-opacity duration-300"
            >
              Ver tablero completo en Pinterest
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer
        name1="Ana Isabel"
        name2="José Andrés"
        hashtag="#PequeBoda"
      />
    </main>
  );
}
