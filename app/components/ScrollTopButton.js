"use client";

import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

function ScrollTopButton() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const y = window.scrollY || 0;
        setShow((prev) => {
          const next = y > 700;
          return prev === next ? prev : next;
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Remonter en haut de la page"
          onClick={scrollToTop}
          initial={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.95 }}
          animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.95 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 460, damping: 34 }}
          className="scroll-top-btn fixed z-50 right-[calc(1rem+env(safe-area-inset-right))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] inline-flex h-12 w-12 items-center justify-center rounded-full shadow-none sm:shadow-[0_18px_55px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/70 group isolate overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/70 via-purple-500/55 to-pink-500/45 opacity-70 blur-[10px] transition-opacity group-hover:opacity-90"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/70 via-purple-500/60 to-pink-500/55 opacity-55"
          />
          <span
            aria-hidden="true"
            className="absolute inset-[1px] rounded-full border border-slate-200/70 bg-white/70 backdrop-blur-xl transition-colors group-hover:bg-white group-hover:border-slate-300 shadow-none sm:shadow-sm sm:shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950/70 dark:shadow-none dark:group-hover:bg-slate-950/60 dark:group-hover:border-white/15"
          />
          <span
            aria-hidden="true"
            className="absolute -left-10 top-0 h-full w-12 rotate-12 bg-white/10 blur-sm opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
          />
          <ArrowUp
            size={18}
            className="relative z-10 text-slate-900 drop-shadow-[0_0_12px_rgba(34,211,238,0.18)] dark:text-slate-100"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export default memo(ScrollTopButton);
