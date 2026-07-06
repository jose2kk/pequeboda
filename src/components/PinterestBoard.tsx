"use client";

import { useEffect, useRef, useState } from "react";

const PINIT_SRC = "https://assets.pinterest.com/js/pinit.js";

export default function PinterestBoard({ boardUrl }: { boardUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reveal the board (and drop the skeleton) as soon as Pinterest injects
    // its iframe into our container.
    if (container.querySelector("iframe")) setLoaded(true);
    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    // Load pinit.js once; if it's already present, just rebuild the widgets.
    if (document.querySelector(`script[src="${PINIT_SRC}"]`)) {
      window.PinUtils?.build?.();
    } else {
      const script = document.createElement("script");
      script.src = PINIT_SRC;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Safety net: never leave the skeleton up forever if detection misses.
    const fallback = window.setTimeout(() => setLoaded(true), 8000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [boardUrl]);

  return (
    <div
      className={`inspo__board${loaded ? " is-loaded" : ""}`}
      ref={containerRef}
    >
      {!loaded && (
        <div className="inspo__board-skeleton" aria-hidden="true">
          Cargando tablero…
        </div>
      )}
      <a
        data-pin-do="embedBoard"
        data-pin-board-width="900"
        data-pin-scale-height="320"
        data-pin-scale-width="115"
        href={boardUrl}
      >
        Tablero de Pinterest
      </a>
    </div>
  );
}

declare global {
  interface Window {
    PinUtils?: { build: () => void };
  }
}
