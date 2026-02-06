"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { useScroll, useSpring, useTransform } from "framer-motion";

import KonamiTrigger from "./components/KonamiTrigger";
import BackgroundDecor from "./components/BackgroundDecor";
import TopProgressBar from "./components/TopProgressBar";
import MainNav from "./components/MainNav";
import ScrollTopButton from "./components/ScrollTopButton";

import HeroSection from "./components/sections/HeroSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import ContactSection from "./components/sections/ContactSection";

import { caseStudies } from "./data";

const NAV_ITEMS = [
  { label: "Introduction", id: "introduction" },
  { label: "Expérience", id: "experience" },
  { label: "Projets", id: "projets" },
  { label: "Compétences", id: "competences" },
  { label: "Contact", id: "contact" },
];

const EasterEggTerminal = dynamic(() => import("./components/EasterEggTerminal"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const recruiterMode = false;
  const [, startTransition] = useTransition();

  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProjectKey, setSelectedProjectKey] = useState("thales");
  const [expandedExperienceKey, setExpandedExperienceKey] = useState(null);

  const [, setClicks] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => observer.disconnect();
  }, []);

  const applyTheme = useCallback((nextTheme, { persist = true } = {}) => {
    const normalized = nextTheme === "dark" ? "dark" : "light";
    setTheme(normalized);

    const root = document.documentElement;
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 340);
    }
    root.dataset.theme = normalized;
    root.dataset.themeReady = "true";
    root.classList.toggle("dark", normalized === "dark");

    if (persist) {
      try {
        localStorage.setItem("theme", normalized);
      } catch {
        // ignore
      }
    }
  }, []);

  const handleProfileClick = useCallback(() => {
    setClicks((prev) => {
      const next = prev + 1;
      if (next === 5) {
        setShowTerminal(true);
        return 0;
      }
      return next;
    });
  }, [setClicks]);

  const handleToggleExperience = useCallback(
    (key) => {
      startTransition(() => {
        setExpandedExperienceKey((prev) => (prev === key ? null : key));
      });
    },
    [startTransition]
  );

  const handleViewCaseStudy = useCallback(
    (key) => {
      startTransition(() => {
        const project = caseStudies.find((p) => p.key === key);
        if (project && activeTab !== "all" && project.category !== activeTab) {
          setActiveTab("all");
        }
        setSelectedProjectKey(key);
        setExpandedExperienceKey(null);
      });
      document.getElementById("projets")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [activeTab, startTransition]
  );

  const handleSelectTab = useCallback(
    (key) => {
      startTransition(() => {
        setActiveTab(key);

        const displayedProjects = recruiterMode
          ? caseStudies.filter((p) => p.prioRecruiter)
          : caseStudies;
        const nextList =
          key === "all" ? displayedProjects : displayedProjects.filter((p) => p.category === key);

        const stillVisible = nextList.some((p) => p.key === selectedProjectKey);
        if (!stillVisible && nextList.length) {
          setSelectedProjectKey(nextList[0].key);
        }
      });
    },
    [recruiterMode, selectedProjectKey, startTransition]
  );

  const handleSelectProjectKey = useCallback(
    (key) => {
      startTransition(() => {
        setSelectedProjectKey(key);
      });
    },
    [startTransition]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    const navEntry = performance.getEntriesByType?.("navigation")?.[0];
    const navType = navEntry?.type;
    if (navType && navType !== "navigate") return;

    const isMobile = window.matchMedia?.("(max-width: 768px)")?.matches;
    if (!isMobile) return;

    const snapTop = () => {
      if ((window.scrollY || 0) > 0) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    window.requestAnimationFrame(() => {
      snapTop();
      window.setTimeout(snapTop, 80);
    });
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const progressWidth = useTransform(smoothProgress, (v) => `${v * 100}%`);

  return (
    <main className="relative min-h-[100dvh] bg-transparent text-slate-900 selection:bg-cyan-500/30 selection:text-cyan-950 dark:text-slate-200 dark:selection:text-cyan-100 font-sans overflow-x-hidden">
      <BackgroundDecor />
      <TopProgressBar progressWidth={progressWidth} />
      <MainNav
        navItems={NAV_ITEMS}
        theme={theme}
        onToggleTheme={() => applyTheme(theme === "dark" ? "light" : "dark")}
        onProfileClick={handleProfileClick}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 space-y-16 md:space-y-32 relative z-10">
        <HeroSection />
        <ExperienceSection
          recruiterMode={recruiterMode}
          expandedExperienceKey={expandedExperienceKey}
          onToggleExperience={handleToggleExperience}
          onViewCaseStudy={handleViewCaseStudy}
        />
        <ProjectsSection
          recruiterMode={recruiterMode}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          selectedProjectKey={selectedProjectKey}
          onSelectProjectKey={handleSelectProjectKey}
        />
        <SkillsSection />
        <ContactSection />
      </div>

      <ScrollTopButton />

      {showTerminal && <EasterEggTerminal onClose={() => setShowTerminal(false)} />}
      <KonamiTrigger />
    </main>
  );
}
