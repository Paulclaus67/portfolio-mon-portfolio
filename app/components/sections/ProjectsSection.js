"use client";

import { memo, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink, MapPin } from "lucide-react";

import { caseStudies } from "../../data";

function ProjectDetail({ activeStudy, projectActionBullets }) {
  const [showAllProjectActions, setShowAllProjectActions] = useState(false);

  return (
    <motion.div
      key={activeStudy.key}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="premium-card rounded-3xl p-6 md:p-8 min-h-[420px] sm:min-h-[520px] overflow-hidden"
    >
      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1 dark:text-white">{activeStudy.headline}</h3>
          <p className="text-cyan-700 font-medium dark:text-cyan-400">
            {activeStudy.company} — {activeStudy.role}
          </p>
        </div>
        {activeStudy.key === "portfolio" ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-900 backdrop-blur dark:text-sky-200">
            Vous êtes dessus <MapPin size={14} />
          </span>
        ) : activeStudy.link ? (
          <a
            href={activeStudy.link}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-white/70 hover:bg-white text-slate-800 px-4 py-2 text-sm font-semibold transition-colors border border-slate-200/70 hover:border-slate-300 backdrop-blur shadow-sm shadow-slate-900/5 dark:bg-slate-950/40 dark:hover:bg-slate-900/60 dark:text-slate-200 dark:border-slate-800/80 dark:hover:border-slate-700 dark:shadow-none"
          >
            Voir le projet <ExternalLink size={14} />
          </a>
        ) : null}
      </div>

      <p className="text-slate-600 leading-relaxed mb-8 text-lg dark:text-slate-300">{activeStudy.summary}</p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="premium-subcard p-4 rounded-2xl">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 dark:text-slate-500">
            Contexte
          </h4>
          <ul className="text-sm text-slate-600 space-y-2 dark:text-slate-300">
            {activeStudy.contextBullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-slate-600">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="premium-subcard p-4 rounded-2xl">
          <h4 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-3">Action</h4>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.ul
              key={showAllProjectActions ? "all" : "preview"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="text-sm text-slate-600 space-y-2 dark:text-slate-300"
            >
              {(showAllProjectActions ? projectActionBullets : projectActionBullets.slice(0, 3)).map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-sky-800">•</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {projectActionBullets.length > 3 ? (
            <button
              type="button"
              onClick={() => setShowAllProjectActions((v) => !v)}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-sm shadow-slate-900/5 hover:bg-white hover:border-slate-300 transition-colors dark:border-white/10 dark:bg-slate-950/30 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-900/40 dark:hover:border-white/15"
            >
              {showAllProjectActions ? "Voir moins" : `Voir plus (${projectActionBullets.length - 3})`}
              <ArrowRight
                size={14}
                className={`transition-transform ${showAllProjectActions ? "-rotate-90" : "rotate-90"}`}
              />
            </button>
          ) : null}
        </div>
        <div className="premium-subcard p-4 rounded-2xl">
          <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Impact</h4>
          <ul className="text-sm text-slate-600 space-y-2 dark:text-slate-300">
            {activeStudy.impactBullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-800">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeStudy.techs.map((tech) => (
          <span key={tech} className="premium-chip px-3 py-1 rounded-full text-xs text-slate-200 font-mono">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function MobileProjectCard({ project, isSelected, onSelect }) {
  return (
    <article
      className={`relative overflow-hidden rounded-[28px] border transition-colors ${
        isSelected
          ? "mobile-surface mobile-surface--strong border-cyan-400/35 bg-white/88 shadow-[0_18px_50px_rgba(15,23,42,0.10)] dark:border-cyan-400/25 dark:bg-slate-950/50 dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
          : "mobile-surface border-slate-200/70 bg-white/72 dark:border-white/10 dark:bg-slate-950/26"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1.5 rounded-r-full bg-gradient-to-b from-cyan-400 via-sky-400 to-pink-400 transition-opacity ${
          isSelected ? "opacity-100" : "opacity-35"
        }`}
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isSelected}
        className="flex w-full items-start gap-3 px-4 py-4 text-left"
      >
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ring-white/10 ${project.key === "muscu-pwa" ? "bg-cyan-600" : "bg-white"}`}>
          {project.logo ? (
            <Image src={project.logo} alt={project.company || project.headline} width={30} height={30} className="h-7 w-7 object-contain" />
          ) : (
            <span className="text-lg font-bold text-slate-900">{project.company[0]}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="mobile-chip inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                {project.category}
              </span>
              <h3 className="mt-1 text-base font-semibold leading-snug text-slate-900 dark:text-slate-100">{project.headline}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{project.company}</p>
            </div>
            <ChevronDown size={18} className={`mt-1 shrink-0 text-slate-500 transition-transform dark:text-slate-400 ${isSelected ? "rotate-180" : ""}`} />
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{project.summary}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.techs.slice(0, 3).map((tech) => (
              <span key={tech} className="mobile-chip rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isSelected ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-200/70 px-4 pb-4 pt-4 dark:border-white/10">
              <div className="grid gap-3">
                <div className="mobile-chip rounded-2xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Contexte</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    {project.contextBullets.slice(0, 2).map((bullet, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mobile-chip rounded-2xl p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">Impact</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    {project.impactBullets.slice(0, 2).map((bullet, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-sky-400">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
                >
                  Voir le projet <ExternalLink size={14} />
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function ProjectsSection({ recruiterMode, activeTab, onSelectTab, selectedProjectKey, onSelectProjectKey }) {
  const detailRef = useRef(null);

  const displayedProjects = useMemo(() => {
    return recruiterMode ? caseStudies.filter((p) => p.prioRecruiter) : caseStudies;
  }, [recruiterMode]);

  const filteredProjectsList = useMemo(() => {
    return activeTab === "all" ? displayedProjects : displayedProjects.filter((p) => p.category === activeTab);
  }, [activeTab, displayedProjects]);

  const activeStudy = useMemo(() => {
    return caseStudies.find((p) => p.key === selectedProjectKey) || caseStudies[0];
  }, [selectedProjectKey]);

  const projectActionBullets = useMemo(() => activeStudy.actionsBullets ?? [], [activeStudy.actionsBullets]);

  const scrollToProjectDetailOnMobile = () => {
    if (typeof window === "undefined" || !window.matchMedia("(max-width: 767px)").matches) return;

    const nav = document.querySelector("[data-nav='main']");
    const navOffset = Math.round((nav?.getBoundingClientRect().height ?? 80) + 16);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const detailTop = detailRef.current?.getBoundingClientRect().top;
        if (typeof detailTop !== "number") return;

        window.scrollTo({
          top: Math.max(0, window.scrollY + detailTop - navOffset),
          behavior: "smooth",
        });
      });
    });
  };

  return (
    <section id="projets" className="relative scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
      >
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-cyan-500/50" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Projets Sélectionnés</h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { key: "all", label: "Tous" },
            { key: "reseau", label: "Réseau" },
            { key: "web", label: "Web" },
            { key: "logiciel", label: "Logiciel" },
            { key: "ia", label: "IA" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => onSelectTab(cat.key)}
              className={`pill-tab px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap backdrop-blur ${
                activeTab === cat.key
                  ? "pill-tab--active bg-gradient-to-r from-cyan-500/30 to-purple-500/20 text-cyan-950 dark:text-cyan-100 border-cyan-400/40 shadow-[0_0_0_1px_rgba(34,211,238,0.10)] dark:shadow-[0_0_0_1px_rgba(34,211,238,0.10)]"
                  : "bg-white/70 text-slate-700 border-slate-200/70 shadow-sm shadow-slate-900/5 hover:border-slate-300 hover:bg-white dark:bg-slate-950/40 dark:text-slate-300 dark:border-slate-800/70 dark:shadow-none dark:hover:border-slate-700 dark:hover:bg-slate-900/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-4 md:hidden">
        {filteredProjectsList.map((project) => (
          <MobileProjectCard
            key={project.key}
            project={project}
            isSelected={selectedProjectKey === project.key}
            onSelect={() => onSelectProjectKey(project.key)}
          />
        ))}
      </div>

      <div className="hidden md:grid lg:grid-cols-[350px_1fr] gap-6">
        <div className="space-y-3">
          {filteredProjectsList.map((proj) =>
            (() => {
              const isSelected = selectedProjectKey === proj.key;

              return (
                <motion.button
                  key={proj.key}
                  onClick={() => {
                    onSelectProjectKey(proj.key);
                    scrollToProjectDetailOnMobile();
                  }}
                  aria-pressed={isSelected}
                  data-selected={isSelected ? "true" : undefined}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`premium-card premium-card--interactive w-full text-left p-4 md:p-5 rounded-2xl relative overflow-hidden group ${
                    isSelected ? "premium-card--selected" : ""
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transition-all ${
                      isSelected ? "opacity-100 w-[5px]" : "opacity-0 w-[3px] group-hover:opacity-40"
                    }`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-white/10 ${
                        proj.key === "muscu-pwa" ? "bg-cyan-600" : "bg-white"
                      }`}
                    >
                      {proj.logo ? (
                        <Image
                          src={proj.logo}
                          alt={
                            proj.company && proj.company !== "Projet personnel"
                              ? `Logo ${proj.company}`
                              : proj.headline
                                ? `Logo du projet ${proj.headline}`
                                : "Logo du projet"
                          }
                          width={28}
                          height={28}
                          className="w-7 h-7 object-contain"
                        />
                      ) : (
                        <span className="text-lg font-bold text-slate-900">{proj.company[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4
                        className={`text-sm font-semibold leading-snug line-clamp-2 break-words ${
                          isSelected ? "text-cyan-950 dark:text-cyan-100" : "text-slate-900 dark:text-slate-100"
                        }`}
                      >
                        {proj.headline}
                      </h4>
                      <p className="text-xs text-slate-600/90 dark:text-slate-300/90">{proj.company}</p>
                      {proj.stackLabel ? (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sky-900 dark:text-sky-200">
                            {proj.stackLabel}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="active-project-glow"
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/22 via-purple-500/14 to-transparent pointer-events-none"
                    />
                  )}
                </motion.button>
              );
            })()
          )}
        </div>

        <AnimatePresence mode="wait">
          <div ref={detailRef}>
            <ProjectDetail activeStudy={activeStudy} projectActionBullets={projectActionBullets} />
          </div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
