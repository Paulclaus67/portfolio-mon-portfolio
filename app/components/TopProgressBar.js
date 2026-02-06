"use client";

import { memo } from "react";
import { motion } from "framer-motion";

function TopProgressBar({ progressWidth }) {
  return (
    <div
      className="fixed top-[calc(5rem+env(safe-area-inset-top))] left-0 right-0 h-[2px] md:h-[3px] z-40 pointer-events-none bg-slate-900/5 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/5 overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(34,211,238,0.28)]"
        style={{ width: progressWidth }}
      />
    </div>
  );
}

export default memo(TopProgressBar);

