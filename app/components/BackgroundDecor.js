"use client";

import { memo } from "react";

function BackgroundDecor() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
}

export default memo(BackgroundDecor);

