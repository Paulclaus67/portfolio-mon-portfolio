"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";

function MainNav({ navItems, theme, onToggleTheme, onProfileClick }) {
  const [activeSection, setActiveSection] = useState("introduction");
  const [menuOpen, setMenuOpen] = useState(false);

  const setActiveSectionSafe = useCallback((id) => {
    setActiveSection((prev) => (prev === id ? prev : id));
  }, []);

  useEffect(() => {
    const getNavOffset = () => {
      const nav = document.querySelector("[data-nav='main']");
      const navHeight = nav?.getBoundingClientRect().height ?? 80;
      return Math.round(navHeight + 12);
    };

    const elements = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    let observer;

    const handleIntersect = (entries) => {
      const navOffset = getNavOffset();
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;

      visible.sort((a, b) => {
        const aDist = Math.abs(a.boundingClientRect.top - navOffset);
        const bDist = Math.abs(b.boundingClientRect.top - navOffset);
        return aDist - bDist;
      });

      setActiveSectionSafe(visible[0].target.id);
    };

    const setupObserver = () => {
      observer?.disconnect();
      const navOffset = getNavOffset();
      const bottomMarginPx = Math.round(window.innerHeight * 0.55);

      observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: `-${navOffset}px 0px -${bottomMarginPx}px 0px`,
        threshold: [0.05, 0.15, 0.3],
      });

      elements.forEach((el) => observer.observe(el));
    };

    setupObserver();

    window.addEventListener("resize", setupObserver);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", setupObserver);
    };
  }, [navItems, setActiveSectionSafe]);

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;

        const y = window.scrollY || 0;
        const scrollBottom = y + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        if (docHeight - scrollBottom < 80) setActiveSectionSafe("contact");
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [setActiveSectionSafe]);

  return (
    <nav
      data-nav="main"
      className="fixed inset-x-0 top-0 w-full z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950/90 dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)] pt-[env(safe-area-inset-top)]"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <div
            className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-300 cursor-pointer shadow-sm shadow-slate-900/10 dark:border-slate-600/70 dark:shadow-black/40"
            onClick={onProfileClick}
            data-konami-anchor="profile"
          >
            <Image src="/Paul_PDP.jpg" alt="Paul Claus" fill sizes="40px" className="object-cover" />
          </div>
          <div className="leading-none">
            <span className="block font-semibold text-slate-900 tracking-tight text-[15px] dark:text-slate-100">
              Paul Claus
            </span>
            <span className="hidden sm:block text-[11px] text-slate-600 mt-1 dark:text-slate-400/90">
              Développeur Fullstack
            </span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              data-active={activeSection === item.id ? "true" : undefined}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={() => setActiveSectionSafe(item.id)}
            >
              <span className="relative z-[1]">{item.label}</span>
              {activeSection === item.id ? (
                <motion.span
                  layoutId="nav-active-indicator"
                  className="nav-indicator"
                  transition={{ type: "spring", stiffness: 560, damping: 44 }}
                />
              ) : null}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle group inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-700 shadow-sm shadow-slate-900/10 transition-colors hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:shadow-black/40 dark:hover:bg-slate-900/60"
            aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}
          >
            <span className="theme-toggle__fx" aria-hidden="true" />
            <span className="relative h-[18px] w-[18px] theme-toggle__glyph" aria-hidden="true">
              <span
                className={[
                  "absolute inset-0 grid place-items-center transition-all duration-300 ease-out",
                  theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75",
                ].join(" ")}
              >
                <Sun size={18} className="theme-toggle__icon drop-shadow-[0_0_10px_rgba(34,211,238,0.18)]" />
              </span>
              <span
                className={[
                  "absolute inset-0 grid place-items-center transition-all duration-300 ease-out",
                  theme === "dark" ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100",
                ].join(" ")}
              >
                <Moon size={18} className="theme-toggle__icon drop-shadow-[0_0_10px_rgba(168,85,247,0.16)]" />
              </span>
            </span>
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-700 shadow-sm shadow-slate-900/10 transition-colors hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:shadow-black/40 dark:hover:bg-slate-900/60"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-200/70 bg-white/85 backdrop-blur-xl overflow-hidden max-h-[calc(100dvh-5rem-env(safe-area-inset-top))] overflow-y-auto overscroll-contain dark:border-white/10 dark:bg-slate-950/80"
          >
            <div className="flex flex-col p-4 sm:p-6 space-y-3 text-slate-800 dark:text-slate-200">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSectionSafe(item.id);
                    setMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 transition-colors text-base font-semibold border ${
                    activeSection === item.id
                      ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-950 dark:bg-white/6 dark:text-cyan-100"
                      : "bg-white/0 hover:bg-slate-900/5 border-slate-200/0 hover:border-slate-200/70 dark:hover:bg-white/5 dark:hover:border-white/10"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default memo(MainNav);
