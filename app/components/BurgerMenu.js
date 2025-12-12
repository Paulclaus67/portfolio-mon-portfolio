import React, { useState } from "react";

export default function BurgerMenu({ navLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700 shadow-sm hover:ring-2 hover:ring-cyan-400 transition-all"
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le menu"
      >
        <span className={`block h-0.5 w-6 my-1 rounded bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block h-0.5 w-6 my-1 rounded bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 transition-opacity ${open ? "opacity-0" : ""}`}></span>
        <span className={`block h-0.5 w-6 my-1 rounded bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm" />
          <div className="absolute top-14 right-4 min-w-[180px] bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-800/90 border border-cyan-500/30 shadow-2xl rounded-2xl p-4 z-50 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  link.onClick();
                  setOpen(false);
                }}
                className="text-base text-slate-200 font-medium rounded-lg px-3 py-2 text-left hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
