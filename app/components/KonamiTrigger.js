"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const KonamiGameOverlay = dynamic(() => import("./KonamiGameOverlay"), {
  ssr: false,
  loading: () => null,
});

export default function KonamiTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) return undefined;

    // Konami Code (↑↑↓↓←→←→BA)
    const code = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let index = 0;

    const handler = (e) => {
      const key = typeof e.key === "string" ? e.key : "";
      const normalized = key.length === 1 ? key.toLowerCase() : key;

      if (normalized === code[index]) {
        index++;
        if (index === code.length) {
          setOpen(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;
  return <KonamiGameOverlay onClose={() => setOpen(false)} />;
}

