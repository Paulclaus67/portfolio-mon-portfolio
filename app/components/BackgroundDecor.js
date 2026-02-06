"use client";

import { memo } from "react";

function BackgroundDecor() {
  return (
    <div className="background-decor fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-vignette vignette-layer" aria-hidden="true" />
      <div className="absolute inset-0 bg-noise noise-layer" aria-hidden="true" />
      <div className="bg-blob absolute top-[-10%] left-[-10%] w-[42%] h-[42%] bg-purple-500/14 dark:bg-purple-900/22 rounded-full blur-[90px] md:blur-[120px] animate-pulse-slow"></div>
      <div
        className="bg-blob absolute bottom-[-10%] right-[-10%] w-[42%] h-[42%] bg-cyan-400/14 dark:bg-cyan-900/22 rounded-full blur-[90px] md:blur-[120px] animate-pulse-slow"
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
