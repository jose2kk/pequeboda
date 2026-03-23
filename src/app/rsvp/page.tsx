"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function RSVPPage() {
  return (
    <main>
      <Navigation name1="Ana" name2="Jose" />

      <section className="min-h-[100svh] bg-background pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-12 md:pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <p className="font-[family-name:var(--font-script)] text-foreground text-4xl sm:text-5xl md:text-6xl mb-4">
              Confirma tu Asistencia
            </p>
            <div className="h-px w-16 bg-foreground/20 mx-auto mb-4" />
            <p className="font-[family-name:var(--font-body)] text-muted text-sm sm:text-base max-w-md mx-auto">
              Selecciona los invitados que asistirán, completa tus datos de
              contacto y confirma. Nos pondremos en contacto contigo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <RSVPForm />
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
