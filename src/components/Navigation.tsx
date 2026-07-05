"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Inicio", match: "/" },
  { href: "/#fecha", label: "La Fecha", match: null },
  { href: "/dress-code", label: "Dress Code", match: "/dress-code" },
  { href: "/rsvp", label: "RSVP", match: "/rsvp" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <Link className="nav__logo" href="/" onClick={() => setOpen(false)}>
        A&amp;J
      </Link>
      <button
        className="nav__burger"
        aria-label="Menú"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className="nav__links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={
                link.match && pathname === link.match ? "page" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
