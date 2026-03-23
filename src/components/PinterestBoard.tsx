"use client";

import { useEffect, useRef } from "react";

interface PinterestBoardProps {
  boardUrl: string;
}

export default function PinterestBoard({ boardUrl }: PinterestBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Pinterest SDK
    const existingScript = document.querySelector(
      'script[src="https://assets.pinterest.com/js/pinit.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    } else {
      // If script already loaded, re-render widgets
      if (window.PinUtils) {
        window.PinUtils.build();
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center">
      <a
        data-pin-do="embedBoard"
        data-pin-board-width="900"
        data-pin-scale-height="600"
        data-pin-scale-width="115"
        href={boardUrl}
      />
    </div>
  );
}

declare global {
  interface Window {
    PinUtils?: {
      build: () => void;
    };
  }
}
