"use client";

import { motion } from "framer-motion";

interface VenueBlockProps {
  heading: string;
  venue: string;
  time: string;
}

function VenueBlock({ heading, venue, time }: VenueBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      {/* Heading */}
      <h3 className="font-[family-name:var(--font-caps)] text-foreground tracking-[0.3em] sm:tracking-[0.4em] uppercase text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4 md:mb-5">
        {heading}
      </h3>

      {/* Thin divider */}
      <div className="h-px w-12 sm:w-16 bg-foreground/20 mb-3 sm:mb-4 md:mb-5" />

      {/* Venue name */}
      <p className="font-[family-name:var(--font-body)] text-foreground text-base sm:text-lg md:text-xl italic mb-2 sm:mb-3 max-w-xs sm:max-w-sm">
        {venue}
      </p>

      {/* Time */}
      <p className="font-[family-name:var(--font-caps)] text-foreground tracking-[0.2em] sm:tracking-[0.25em] uppercase text-xs sm:text-sm md:text-base font-medium">
        {time}
      </p>
    </motion.div>
  );
}

export default function Venues() {
  return (
    <section className="py-10 sm:py-12 md:py-16 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-center md:justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <VenueBlock
            heading="La Ceremonia"
            venue="Catedral de Santa Catalina de Alejandría"
            time="5:00 PM"

          />

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div className="flex md:flex-col items-center gap-4">
            <div className="h-px w-8 sm:w-12 md:w-px md:h-20 bg-foreground/15" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            <div className="h-px w-8 sm:w-12 md:w-px md:h-20 bg-foreground/15" />
          </div>

          <VenueBlock
            heading="La Recepción"
            venue="Hotel Charleston Santa Teresa"
            time="6:00 PM"

          />
        </div>
      </div>
    </section>
  );
}
