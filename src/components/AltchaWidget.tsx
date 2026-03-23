"use client";

import { useEffect, useRef, useCallback } from "react";

interface AltchaWidgetProps {
  onVerified: (payload: string) => void;
  onError?: () => void;
}

export default function AltchaWidget({ onVerified, onError }: AltchaWidgetProps) {
  const widgetRef = useRef<HTMLElement>(null);
  const importedRef = useRef(false);

  const handleVerified = useCallback(
    (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.payload) {
        onVerified(detail.payload);
      }
    },
    [onVerified]
  );

  const handleError = useCallback(() => {
    onError?.();
  }, [onError]);

  useEffect(() => {
    if (!importedRef.current) {
      importedRef.current = true;
      import("altcha");
    }
  }, []);

  useEffect(() => {
    const el = widgetRef.current;
    if (!el) return;

    el.addEventListener("verified", handleVerified);
    el.addEventListener("error", handleError);

    return () => {
      el.removeEventListener("verified", handleVerified);
      el.removeEventListener("error", handleError);
    };
  }, [handleVerified, handleError]);

  return (
    <div className="flex justify-center" style={{ height: "33px", overflow: "visible" }}>
      <div style={{ transform: "scale(0.72)", transformOrigin: "center center" }}>
        <altcha-widget
          ref={widgetRef}
          challengeurl="/api/altcha-challenge"
          hidefooter
          style={Object.assign({}, {
            "--altcha-max-width": "260px",
            "--altcha-border-width": "1px",
            "--altcha-color-border": "rgba(0,0,0,0.1)",
            "--altcha-color-text": "#000000",
          })}
        />
      </div>
    </div>
  );
}
