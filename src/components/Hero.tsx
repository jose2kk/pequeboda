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

  /*
   * Image width = height * 3/4 (aspect ratio).
   * We use a CSS custom property --img-h set per breakpoint via the class,
   * but since Tailwind can't do calc with vh in arbitrary padding easily
   * across breakpoints, we use a simpler approach:
   * fixed vw-based image width on mobile, vh-based on desktop.
   */

  return (
    <section className="relative h-[100svh] w-full flex flex-col items-center justify-between bg-background overflow-hidden pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-8 md:pb-12">
      {/* Zone 1: Save the Date + Names + Image */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* "Save the Date" heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="flex items-baseline justify-center gap-1.5 sm:gap-2 md:gap-3 mb-8 sm:mb-6 md:mb-8"
        >
          <span className="font-[family-name:var(--font-caps)] text-foreground tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-xl sm:text-lg md:text-2xl lg:text-3xl font-medium">
            Save
          </span>
          <span className="font-[family-name:var(--font-script)] text-foreground text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-light relative top-[0.1em] sm:top-[0.12em]">
            the
          </span>
          <span className="font-[family-name:var(--font-caps)] text-foreground tracking-[0.3em] sm:tracking-[0.4em] md:tracking-[0.5em] uppercase text-xl sm:text-lg md:text-2xl lg:text-3xl font-medium">
            Date
          </span>
        </motion.div>

        {/* Title row — image always centered on screen */}
        <div className="relative w-full flex items-center justify-center">
          {/* Image — centered in flow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative h-[22vh] sm:h-[26vh] md:h-[33vh] aspect-[3/4] overflow-hidden z-10"
          >
            <div className="absolute inset-0 border-[3px] sm:border-[4px] md:border-[5px] border-foreground z-10 pointer-events-none" />

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
                  loading="eager"
                  sizes="(max-width: 640px) 30vw, (max-width: 1024px) 25vw, 20vw"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Left name */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute right-1/2 font-[family-name:var(--font-title)] text-foreground font-normal italic tracking-[0.05em] uppercase leading-[0.9] text-[clamp(2.2rem,10vw,17rem)] pr-[calc(22vh*3/4/2+0.5rem)] sm:text-[clamp(3rem,12vw,17rem)] sm:pr-[calc(26vh*3/4/2+0.2rem)] md:text-[clamp(4.2rem,15vw,17rem)] md:pr-[calc(33vh*3/4/2+0.25rem)] lg:pr-[calc(33vh*3/4/2+0.3rem)]"
          >
            {name1}
          </motion.h1>

          {/* Right name */}
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 font-[family-name:var(--font-title)] text-foreground font-normal italic tracking-[0.05em] uppercase leading-[0.9] text-[clamp(2.2rem,10vw,17rem)] pl-[calc(22vh*3/4/2+0.5rem)] sm:text-[clamp(3rem,12vw,17rem)] sm:pl-[calc(26vh*3/4/2+0.2rem)] md:text-[clamp(4.2rem,15vw,17rem)] md:pl-[calc(33vh*3/4/2+1rem)] lg:pl-[calc(33vh*3/4/2+1.2rem)]"
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
            className="mt-10 sm:mt-10 md:mt-12 text-center px-4"
          >
            <p className="text-foreground tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] uppercase text-xs sm:text-sm md:text-lg font-medium font-[family-name:var(--font-caps)]">
              {[date, location].filter(Boolean).join("  |  ")}
            </p>
            <p className="text-foreground tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase text-xs sm:text-sm md:text-lg font-medium font-[family-name:var(--font-caps)] mt-1.5 sm:mt-2 md:mt-3">
              ¡Nos Casamos!
            </p>
          </motion.div>
        )}
      </div>

      {/* Zone 3: Initials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4"
      >
        <p className="font-[family-name:var(--font-script)] text-foreground text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-light">
          {name1[0]} & {name2[0]}
        </p>
        <p className="text-foreground tracking-[0.3em] uppercase text-[9px] sm:text-[10px] md:text-xs font-medium font-[family-name:var(--font-caps)]">
          Est. 2018
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg
            width="12"
            height="18"
            viewBox="0 0 16 24"
            fill="none"
            className="text-muted/50 sm:w-[14px] sm:h-[20px]"
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
