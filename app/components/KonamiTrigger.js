"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const KonamiGameOverlay = dynamic(() => import("./KonamiGameOverlay"), {
  ssr: false,
  loading: () => null,
});

const KONAMI = [
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

function isMobileViewport() {
  try {
    return window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  } catch {
    return false;
  }
}

function closestKonamiAnchorProfile(target) {
  if (!target || typeof target.closest !== "function") return false;
  return Boolean(target.closest('[data-konami-anchor="profile"]'));
}

export default function KonamiTrigger() {
  const [open, setOpen] = useState(false);

  const indexRef = useRef(0);
  const armedRef = useRef(false);
  const lastActionAtRef = useRef(0);
  const pointerStartRef = useRef(null);

  useEffect(() => {
    if (open) return undefined;

    const onKeyDown = (e) => {
      const key = typeof e.key === "string" ? e.key : "";
      const normalized = key.length === 1 ? key.toLowerCase() : key;

      if (normalized === KONAMI[indexRef.current]) {
        indexRef.current += 1;
        if (indexRef.current === KONAMI.length) {
          setOpen(true);
          indexRef.current = 0;
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) return undefined;

    // Mobile-only activation:
    // 1) Touch the profile picture in the navbar (arms the trigger).
    // 2) Perform Konami as swipes + 2 taps (B,A).
    const armTimeoutMs = 8000;
    const swipeMinPx = 44;
    const swipeAxisRatio = 1.25;

    const reset = () => {
      indexRef.current = 0;
      armedRef.current = false;
      lastActionAtRef.current = 0;
      pointerStartRef.current = null;
    };

    const feed = (token) => {
      lastActionAtRef.current = Date.now();

      if (token === KONAMI[indexRef.current]) {
        indexRef.current += 1;
        if (indexRef.current === KONAMI.length) {
          setOpen(true);
          reset();
        }
        return;
      }

      indexRef.current = 0;
    };

    const onPointerDown = (e) => {
      if (!isMobileViewport()) return;

      if (closestKonamiAnchorProfile(e.target)) {
        armedRef.current = true;
        indexRef.current = 0;
        lastActionAtRef.current = Date.now();
      }

      if (!armedRef.current) return;
      pointerStartRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      if (!isMobileViewport()) return;
      if (!armedRef.current) return;

      const now = Date.now();
      if (now - (lastActionAtRef.current || 0) > armTimeoutMs) {
        reset();
        return;
      }

      const start = pointerStartRef.current;
      pointerStartRef.current = null;
      if (!start) return;

      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      // Tap: used for the final B,A (two taps).
      if (Math.max(absX, absY) < 10) {
        const expected = KONAMI[indexRef.current];
        if (expected === "b" || expected === "a") feed(expected);
        return;
      }

      // Swipe: detect direction without preventing scroll.
      if (absX >= absY * swipeAxisRatio && absX >= swipeMinPx) {
        feed(dx > 0 ? "ArrowRight" : "ArrowLeft");
        return;
      }
      if (absY >= absX * swipeAxisRatio && absY >= swipeMinPx) {
        feed(dy > 0 ? "ArrowDown" : "ArrowUp");
      }
    };

    const onScroll = () => {
      if (!armedRef.current) return;
      const now = Date.now();
      if (now - (lastActionAtRef.current || 0) > armTimeoutMs) reset();
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  if (!open) return null;
  return <KonamiGameOverlay onClose={() => setOpen(false)} />;
}

