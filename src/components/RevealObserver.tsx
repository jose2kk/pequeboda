"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal-on-scroll: elements with `.reveal` fade/translate in when they enter
 * the viewport. Re-runs on route change since the layout persists across
 * client-side navigation. Disabled visuals under prefers-reduced-motion are
 * handled in CSS.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)")
    );
    if (!reveals.length) return;

    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i % 4, 3) * 0.08 + "s";
      io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
