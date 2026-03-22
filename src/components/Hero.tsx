"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HERO_IMAGES = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
];

const TRANSITION_INTERVAL = 1200;

interface HeroProps {
  name1?: string;
  name2?: string;
  date?: string;
  location?: string;
}

export default function Hero({
  name1 = "Name",
  name2 = "Name",
  date,
  location,
}: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextImage, TRANSITION_INTERVAL);
    return () => clearInterval(timer);
  }, [nextImage]);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-between bg-background overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12">
      {/* Zone 1: Names + Image */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Title row — full viewport width, no padding, image pinned to center */}
        <div className="relative w-full flex items-center justify-center">
          {/* Image — absolutely positioned at exact viewport center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative h-[28vh] sm:h-[30vh] md:h-[33vh] aspect-[3/4] overflow-hidden z-10"
          >
            <div className="absolute inset-0 border-[5px] border-foreground z-10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0 }}
                className="absolute inset-0"
              >
                <Image
                  src={HERO_IMAGES[currentIndex]}
                  alt="Wedding photo"
                  fill
                  className="object-cover"
                  priority={currentIndex === 0}
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 35vw, 30vw"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Left name — flows from left edge to the image */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute right-1/2 font-[family-name:var(--font-title)] text-foreground font-normal italic tracking-[0.05em] uppercase text-[clamp(4.2rem,15vw,17rem)] leading-[0.9] pr-[calc(50vh*3/4/2+0.15rem)] sm:pr-[calc(50vh*3/4/2+0.2rem)] md:pr-[calc(50vh*3/4/2+0.25rem)] lg:pr-[calc(50vh*3/4/2+0.3rem)]"
          >
            {name1}
          </motion.h1>

          {/* Right name — flows from image to right edge */}
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 font-[family-name:var(--font-title)] text-foreground font-normal italic tracking-[0.05em] uppercase text-[clamp(4.2rem,15vw,17rem)] leading-[0.9] pl-[calc(50vh*3/4/2+0.15rem)] sm:pl-[calc(50vh*3/4/2+0.2rem)] md:pl-[calc(50vh*3/4/2+0.25rem)] lg:pl-[calc(50vh*3/4/2+0.3rem)]"
          >
            {name2}
          </motion.h1>
        </div>

        {/* Zone 2: Date & Location */}
        {(date || location) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-8 sm:mt-10 md:mt-12 text-center"
          >
            <p className="text-foreground tracking-[0.35em] uppercase text-sm sm:text-base md:text-lg font-medium font-[family-name:var(--font-caps)]">
              {[date, location].filter(Boolean).join("  |  ")}
            </p>
            <p className="text-foreground tracking-[0.2em] uppercase text-sm sm:text-base md:text-lg font-medium font-[family-name:var(--font-caps)] mt-3">
              ¡Nos Casamos!
            </p>
          </motion.div>
        )}
      </div>

      {/* Zone 3: Initials (Tangerine, black) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="font-[family-name:var(--font-script)] text-foreground text-5xl sm:text-6xl md:text-7xl font-light">
          {name1[0]} & {name2[0]}
        </p>
        <p className="text-foreground tracking-[0.3em] uppercase text-xs font-medium font-[family-name:var(--font-caps)]">
          Est. 2018
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            width="14"
            height="20"
            viewBox="0 0 16 24"
            fill="none"
            className="text-muted/50"
          >
            <path
              d="M7.29 23.71a1 1 0 001.42 0l6.36-6.36a1 1 0 00-1.42-1.42L8 21.59l-5.66-5.66a1 1 0 00-1.42 1.42l6.37 6.36zM7 0v23.3h2V0H7z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
