"use client";

import { memo } from "react";

function BackgroundDecor() {
  return (
    <div className="background-decor fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-vignette vignette-layer" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise noise-layer hidden md:block" aria-hidden="true" />
      <div className="bg-blob absolute top-[-12%] left-[-14%] w-[34%] h-[34%] bg-purple-500/10 dark:bg-purple-900/16 rounded-full blur-[64px] animate-pulse-slow md:top-[-10%] md:left-[-10%] md:w-[42%] md:h-[42%] md:bg-purple-500/14 md:dark:bg-purple-900/22 md:blur-[120px]"></div>
      <div
        className="bg-blob absolute bottom-[-12%] right-[-14%] w-[34%] h-[34%] bg-cyan-400/10 dark:bg-cyan-900/16 rounded-full blur-[64px] animate-pulse-slow md:bottom-[-10%] md:right-[-10%] md:w-[42%] md:h-[42%] md:bg-cyan-400/14 md:dark:bg-cyan-900/22 md:blur-[120px]"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="bg-blob hidden md:block absolute top-[35%] right-[-8%] w-[30%] h-[30%] bg-emerald-400/10 dark:bg-fuchsia-900/14 rounded-full blur-[120px] animate-pulse-slow"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}

export default memo(BackgroundDecor);
