"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO date string
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(target: string): TimeLeft {
  const difference = new Date(target).getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-[family-name:var(--font-title)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-muted tracking-[0.3em] uppercase text-xs mt-3 font-[family-name:var(--font-caps)]">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center h-32" />
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-accent tracking-[0.4em] uppercase text-sm mb-12 font-[family-name:var(--font-caps)]">
            Cuenta Regresiva
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16">
            <TimeUnit value={timeLeft.days} label="Días" />
            <span className="font-[family-name:var(--font-title)] text-3xl md:text-4xl text-accent-light self-start mt-2">
              :
            </span>
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <span className="font-[family-name:var(--font-title)] text-3xl md:text-4xl text-accent-light self-start mt-2">
              :
            </span>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <span className="font-[family-name:var(--font-title)] text-3xl md:text-4xl text-accent-light self-start mt-2">
              :
            </span>
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
