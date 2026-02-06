"use client";

import { memo, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";

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

function ProjectsSection({
  recruiterMode,
  activeTab,
  onSelectTab,
  selectedProjectKey,
  onSelectProjectKey,
}) {
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

      <div className="grid lg:grid-cols-[350px_1fr] gap-6">
        <div className="space-y-3">
          {filteredProjectsList.map((proj) =>
            (() => {
              const isSelected = selectedProjectKey === proj.key;

              return (
                <motion.button
                  key={proj.key}
                  onClick={() => {
                    onSelectProjectKey(proj.key);
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
                        <Image src={proj.logo} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
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
          <ProjectDetail activeStudy={activeStudy} projectActionBullets={projectActionBullets} />
        </AnimatePresence>
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
