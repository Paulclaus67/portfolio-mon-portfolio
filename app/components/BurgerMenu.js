import React, { useState } from "react";

export default function BurgerMenu({ navLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="flex flex-col justify-center items-center w-10 h-10 rounded-xl bg-white/70 border border-slate-200/70 shadow-sm shadow-slate-900/10 hover:ring-2 hover:ring-cyan-400 transition-all dark:bg-slate-900/80 dark:border-slate-700 dark:shadow-black/40"
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le menu"
      >
        <span className={`block h-0.5 w-6 my-1 rounded bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 transition-transform ${open ? "rotate-45 translate-y-2" : ""}`}></span>
        <span className={`block h-0.5 w-6 my-1 rounded bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 transition-opacity ${open ? "opacity-0" : ""}`}></span>
        <span className={`block h-0.5 w-6 my-1 rounded bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Backdrop sous le menu, ne bloque pas la croix */}
          <div className="absolute top-14 left-0 w-full h-[calc(100vh-theme(spacing.14))] bg-slate-900/20 backdrop-blur-sm pointer-events-auto dark:bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute top-14 right-4 min-w-[180px] bg-gradient-to-br from-white via-white/85 to-slate-50 border border-slate-200/70 shadow-2xl rounded-2xl p-4 z-50 flex flex-col gap-2 pointer-events-auto dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-800/90 dark:border-cyan-500/30">
            <button
              className="absolute top-2 right-2 text-slate-600 hover:text-cyan-700 text-xl font-bold px-1 rounded transition dark:text-slate-400 dark:hover:text-cyan-400"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
              tabIndex={0}
              style={{ zIndex: 60 }}
            >×</button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  link.onClick();
                  setOpen(false);
                }}
                className="text-base text-slate-800 font-medium rounded-lg px-3 py-2 text-left hover:bg-cyan-500/10 hover:text-cyan-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:text-slate-200 dark:hover:text-cyan-300"
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
