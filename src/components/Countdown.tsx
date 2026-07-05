"use client";

import { useEffect, useState } from "react";

// 8 May 2027, 17:00 in Cartagena (UTC-5)
const TARGET = new Date("2027-05-08T17:00:00-05:00").getTime();
const pad = (n: number) => (n < 10 ? "0" : "") + n;

interface TimeLeft {
  d: number;
  h: number;
  m: number;
  s: number;
}

export default function Countdown() {
  const [t, setT] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      let diff = TARGET - Date.now();
      if (diff < 0) diff = 0;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="count" id="cuenta">
      <div className="wrap count__inner reveal">
        <span className="eyebrow">La cuenta regresiva</span>
        <div className="count__grid">
          <div className="count__cell">
            <div className="count__num">{t ? t.d : "—"}</div>
            <div className="count__label">Días</div>
          </div>
          <div className="count__cell">
            <div className="count__num">{t ? pad(t.h) : "—"}</div>
            <div className="count__label">Horas</div>
          </div>
          <div className="count__cell">
            <div className="count__num">{t ? pad(t.m) : "—"}</div>
            <div className="count__label">Minutos</div>
          </div>
          <div className="count__cell">
            <div className="count__num">{t ? pad(t.s) : "—"}</div>
            <div className="count__label">Segundos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
