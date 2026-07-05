"use client";

import { useEffect } from "react";

export default function PinterestBoard({ boardUrl }: { boardUrl: string }) {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.pinterest.com/js/pinit.js"]'
    );
    if (existing) {
      window.PinUtils?.build?.();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.pinterest.com/js/pinit.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="inspo__board">
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
