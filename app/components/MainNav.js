"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Moon, Sun, X } from "lucide-react";

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

    const elements = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!elements.length) return undefined;

    let observer;

    const handleIntersect = (entries) => {
      const navOffset = getNavOffset();
      const visible = entries.filter((entry) => entry.isIntersecting);
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

      elements.forEach((element) => observer.observe(element));
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

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (menuOpen) {
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
      body.style.overflow = "";
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <nav
      data-nav="main"
      className="fixed inset-x-0 top-0 z-50 w-full border-b border-slate-200/70 bg-white/70 pt-[env(safe-area-inset-top)] shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20 md:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex min-w-0 items-center gap-3">
          <div
            className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full border border-slate-300 shadow-sm shadow-slate-900/10 dark:border-slate-600/70 dark:shadow-black/40 md:h-10 md:w-10"
            onClick={onProfileClick}
            data-konami-anchor="profile"
          >
            <Image src="/Paul_PDP_New.jpg" alt="Paul Claus" fill sizes="(max-width: 767px) 36px, 40px" className="object-cover" />
          </div>
          <div className="min-w-0 leading-none">
            <span className="block text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-100">Paul Claus</span>
            <span className="mt-1 block truncate text-[11px] text-slate-600 dark:text-slate-400/90 sm:hidden">Développeur web, logiciel et IA</span>
            <span className="mt-1 hidden text-[11px] text-slate-600 dark:text-slate-400/90 sm:block">Ingénieur Développeur C#</span>
          </div>
        </motion.div>

        <div className="hidden items-center gap-10 text-[13px] font-semibold text-slate-600 dark:text-slate-300 md:flex">
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
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 p-2.5 text-slate-700 shadow-sm shadow-slate-900/10 transition-colors hover:bg-white dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-200 dark:shadow-black/40 dark:hover:bg-slate-900/60 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Fermer le menu"
              className="fixed inset-0 top-[calc(4rem+env(safe-area-inset-top))] bg-slate-950/28 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className="mobile-surface mobile-surface--strong absolute inset-x-3 top-[calc(100%+0.75rem)] rounded-[28px] p-4 md:hidden"
            >
              <div className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300/70 dark:bg-white/10" aria-hidden="true" />
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 px-3 py-3 dark:border-white/10 dark:bg-white/5">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Navigation mobile</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Accès rapide aux sections clés</p>
                </div>
                <a
                  href="#contact"
                  onClick={() => {
                    setActiveSectionSafe("contact");
                    setMenuOpen(false);
                  }}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/12 px-3.5 py-2 text-xs font-semibold text-cyan-950 shadow-[0_8px_20px_rgba(34,211,238,0.10)] dark:border-cyan-400/20 dark:bg-cyan-400/12 dark:text-cyan-100 dark:shadow-[0_8px_20px_rgba(0,0,0,0.24)]"
                >
                  <Mail size={13} />
                  Me joindre
                </a>
              </div>

              <div className="mt-4 grid gap-2.5">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSectionSafe(item.id);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-colors ${
                      activeSection === item.id
                        ? "border-cyan-400/35 bg-gradient-to-r from-cyan-500/14 to-sky-400/8 text-cyan-950 shadow-[0_12px_30px_rgba(34,211,238,0.10)] dark:bg-white/7 dark:text-cyan-100"
                        : "border-slate-200/70 bg-slate-50/60 text-slate-800 dark:border-white/8 dark:bg-white/4 dark:text-slate-200"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">0{index + 1}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}

export default memo(MainNav);
