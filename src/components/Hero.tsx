"use client";

/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

// Originals are 960×1280 (3:4) shown in a 5:6 frame; each photo carries its
// own user-approved crop (--z zoom, --ox/--oy pan) so the framing stays bound
// to the image regardless of order.
const PHOTOS = [
  { src: "/images/hero-01.jpg", alt: "Ana Isabel y José Andrés", z: 1.6, ox: 0.74, oy: 0.4 },
  { src: "/images/hero-02.jpg", alt: "Ana Isabel mostrando el anillo", z: 1.4, ox: 0.46, oy: 0.27 },
  { src: "/images/hero-05.jpg", alt: "Un beso", z: 1.4, ox: 0.52, oy: 0.37 },
  { src: "/images/hero-04.jpg", alt: "Ana Isabel y José Andrés sonriendo", z: 1.7, ox: 0.46, oy: 0.51 },
];

const INTERVAL = 2000;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % PHOTOS.length),
      INTERVAL
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="hero" id="home">
      <p className="overline hero__overline">
        Save <span className="script">the</span> Date
      </p>

      <div className="namerow">
        <div className="namerow__name namerow__name--l">ANA</div>
        <figure className="namerow__photo frame">
          {PHOTOS.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              className={i === active ? "is-on" : ""}
              loading={i === 0 ? "eager" : "lazy"}
              style={
                { "--z": p.z, "--ox": p.ox, "--oy": p.oy } as CSSProperties
              }
            />
          ))}
        </figure>
        <div className="namerow__name namerow__name--r">JOSE</div>
      </div>

      <p className="hero__meta">
        8 de Mayo, 2027 <span className="sep">|</span> Cartagena, Colombia
      </p>
      <p className="hero__tagline">¡Nos Casamos!</p>

      <div className="hero__monogram">
        <div className="mark">A&amp;J</div>
        <div className="hero__est">Est. 2018</div>
      </div>

      <a className="scrolldown" href="#cuenta" aria-label="Desplázate">
        <span className="ln"></span>
      </a>
    </header>
  );
}
