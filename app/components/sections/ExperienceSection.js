"use client";

import { memo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  MapPin,
} from "lucide-react";

import { experiences, caseStudies } from "../../data";
import { fadeInUp, staggerContainer } from "../../utils/motionVariants";

const caseStudyByKey = new Map(caseStudies.map((study) => [study.key, study]));

function ExperienceSection({ recruiterMode, expandedExperienceKey, onToggleExperience, onViewCaseStudy }) {
  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="scroll-mt-24"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-cyan-500/50" />
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Expériences</h2>
            <p className="text-sm text-slate-600 mt-1 dark:text-slate-300">
              Résultats concrets, missions variées (réseau, web, IA) — cliquez pour voir les détails.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
            <Briefcase size={14} className="text-cyan-400" /> {experiences.length} expériences
          </span>
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950/40 dark:shadow-none">
            <CheckCircle2 size={14} className="text-emerald-400" /> Études de cas détaillées
          </span>
        </div>
      </div>

      <ol className="relative border-l border-slate-200/70 pl-6 lg:pl-10 space-y-6 dark:border-slate-800/60">
        {experiences.map((exp) => {
          const study = caseStudyByKey.get(exp.key);
          const isExpanded = expandedExperienceKey === exp.key;
          const primaryBullets = recruiterMode ? study?.impactBullets : study?.actionsBullets;
          const topTechs = study?.techs?.slice(0, 4) ?? [];

          return (
            <motion.li key={exp.key} variants={fadeInUp} className="relative">
              <span
                className="experience-dot absolute -left-[9px] top-7 h-4 w-4 rounded-full bg-white border border-cyan-500/40 dark:bg-slate-950"
                data-expanded={isExpanded ? "true" : undefined}
                aria-hidden="true"
              />

              <article className="glass-card experience-card rounded-2xl p-5 md:p-6" data-expanded={isExpanded ? "true" : undefined}>
                <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 ring-1 ring-white/10">
                      <Image src={exp.logo} alt={exp.alt} width={40} height={40} className="object-contain w-full h-full" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-lg text-slate-900 leading-snug dark:text-slate-100">{exp.title}</h3>
                      <p className="text-sm text-cyan-700 font-medium mt-0.5 dark:text-cyan-400">
                        {study?.company ?? exp.place}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-500">
                        {study?.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={14} className="text-slate-700 dark:text-slate-600" /> {study.location}
                          </span>
                        )}
                        {study?.year && (
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar size={14} className="text-slate-700 dark:text-slate-600" /> {study.year}
                          </span>
                        )}
                        {study?.contractLabel && (
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase size={14} className="text-slate-700 dark:text-slate-600" /> {study.contractLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {isExpanded && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/35 bg-cyan-500/15 px-3 py-1.5 text-xs font-bold text-cyan-950 dark:border-cyan-500/25 dark:bg-cyan-500/10 dark:text-cyan-200">
                        Sélectionnée
                      </span>
                    )}

                    {exp.url && (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm shadow-slate-900/5 transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300 dark:shadow-none dark:hover:border-slate-700 dark:hover:bg-slate-900/60"
                      >
                        Site <ExternalLink size={14} />
                      </a>
                    )}

                    {study && (
                      <button
                        type="button"
                        onClick={() => onViewCaseStudy(exp.key)}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-900 hover:bg-cyan-500/15 transition-colors dark:text-cyan-200"
                      >
                        Étude de cas <ArrowRight size={14} />
                      </button>
                    )}

                    {study ? (
                      <button
                        type="button"
                        onClick={() => onToggleExperience(exp.key)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm shadow-slate-900/5 transition-colors hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-200 dark:shadow-none dark:hover:border-slate-700 dark:hover:bg-slate-900/60"
                        aria-expanded={isExpanded}
                        aria-controls={`exp-${exp.key}-details`}
                      >
                        <span>{isExpanded ? "Masquer" : "Voir détails"}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                          aria-hidden="true"
                        />
                      </button>
                    ) : null}
                  </div>
                </header>

                <p className="text-sm text-slate-600 mt-4 leading-relaxed dark:text-slate-300">
                  {recruiterMode ? exp.shortDesc : exp.desc}
                </p>

                {!isExpanded && topTechs.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topTechs.map((tech) => (
                      <span key={tech} className="premium-chip px-2.5 py-1 rounded-full text-[11px] text-slate-200 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}

                {primaryBullets?.length ? (
                  <div className="mt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 dark:text-slate-500">
                      {recruiterMode ? "Impact" : "Actions"}
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {primaryBullets.slice(0, 2).map((b, i) => (
                        <li key={i} className="flex gap-2">
                          <span
                            className={`mt-1.5 h-1.5 w-1.5 rounded-full ${
                              recruiterMode ? "bg-emerald-400/70" : "bg-sky-400/70"
                            }`}
                          />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <AnimatePresence initial={false}>
                  {isExpanded && study && (
                    <motion.div
                      id={`exp-${exp.key}-details`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-3 gap-3 mt-5">
                        <div className="bg-white/70 p-4 rounded-xl border border-slate-200/70 shadow-sm shadow-slate-900/5 dark:bg-slate-950/50 dark:border-slate-800/50 dark:shadow-none">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 dark:text-slate-500">
                            Contexte
                          </h4>
                          <ul className="text-sm text-slate-600 space-y-2 dark:text-slate-300">
                            {study.contextBullets?.slice(0, 3).map((b, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-slate-600">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/70 p-4 rounded-xl border border-slate-200/70 shadow-sm shadow-slate-900/5 dark:bg-slate-950/50 dark:border-slate-800/50 dark:shadow-none">
                          <h4 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-3">Action</h4>
                          <ul className="text-sm text-slate-600 space-y-2 dark:text-slate-300">
                            {study.actionsBullets?.slice(0, 3).map((b, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-sky-800">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/70 p-4 rounded-xl border border-slate-200/70 shadow-sm shadow-slate-900/5 dark:bg-slate-950/50 dark:border-slate-800/50 dark:shadow-none">
                          <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Impact</h4>
                          <ul className="text-sm text-slate-600 space-y-2 dark:text-slate-300">
                            {study.impactBullets?.slice(0, 3).map((b, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-emerald-800">•</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {study.techs?.length ? (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {study.techs.map((tech) => (
                            <span key={tech} className="premium-chip px-3 py-1 rounded-full text-xs text-slate-200 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-900/5 text-slate-700 border border-slate-200/70 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700/50"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </article>
            </motion.li>
          );
        })}
      </ol>
    </motion.section>
  );
}

export default memo(ExperienceSection);
