"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Copy } from "lucide-react";

import { skills, skillCategories, skillDetails, skillExamples, trustedLogos } from "../../data";
import { staggerContainer } from "../../utils/motionVariants";

function SkillsSection() {
  const [selectedSkillKey, setSelectedSkillKey] = useState("python");
  const [selectedCategory, setSelectedCategory] = useState("languages");
  const [copied, setCopied] = useState(false);

  const pickFirstSkillKey = useCallback((categoryKey) => {
    return skills.find((s) => s.category === categoryKey)?.key ?? "python";
  }, []);

  const handleSelectCategory = useCallback(
    (categoryKey) => {
      setSelectedCategory(categoryKey);
      setSelectedSkillKey(pickFirstSkillKey(categoryKey));
    },
    [pickFirstSkillKey]
  );

  const currentSkillDetail = useMemo(
    () => skillDetails[selectedSkillKey] || skillDetails.python,
    [selectedSkillKey]
  );

  const filteredSkills = useMemo(
    () => skills.filter((s) => s.category === selectedCategory),
    [selectedCategory]
  );

  const levelColor = useMemo(() => {
    if (currentSkillDetail.level === "prod") {
      return "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/50";
    }
    if (currentSkillDetail.level === "projet") {
      return "bg-sky-500/10 text-sky-800 dark:text-sky-200 border-sky-500/50";
    }
    return "bg-slate-900/5 text-slate-800 border-slate-200/70 dark:bg-slate-700/60 dark:text-slate-100 dark:border-slate-400/50";
  }, [currentSkillDetail.level]);

  const example = useMemo(
    () => skillExamples[selectedSkillKey] || skillExamples.default,
    [selectedSkillKey]
  );

  const exampleText = useMemo(() => ["// " + example.title, ...example.lines].join("\n"), [example.lines, example.title]);

  const handleCopyExample = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exampleText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }, [exampleText]);

  return (
    <>
      <motion.section
        id="competences"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="scroll-mt-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-cyan-500/50" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Compétences Techniques</h2>
        </div>

        <div className="premium-card rounded-3xl p-6 md:p-8">
          <div className="flex gap-2 mb-8 border-b border-slate-200/70 pb-4 overflow-x-auto scrollbar-none pr-2 md:flex-wrap md:overflow-visible md:pb-5 md:pr-0 dark:border-white/5">
            {skillCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleSelectCategory(cat.key)}
                className={`pill-tab shrink-0 whitespace-nowrap px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border backdrop-blur md:px-4 ${
                  selectedCategory === cat.key
                    ? "bg-gradient-to-r from-cyan-500/25 to-purple-500/15 text-cyan-950 dark:text-cyan-100 border-cyan-400/35 shadow-[0_0_0_1px_rgba(34,211,238,0.08),0_10px_22px_rgba(15,23,42,0.08)] dark:shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
                    : "bg-white/70 text-slate-700 border-slate-200/70 shadow-sm shadow-slate-900/5 hover:border-slate-300 hover:bg-white dark:bg-slate-950/30 dark:text-slate-300 dark:border-slate-800/70 dark:shadow-none dark:hover:border-slate-700 dark:hover:bg-slate-900/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-none pr-2 pb-2 md:flex-wrap md:overflow-visible md:pr-0 md:pb-0 md:gap-3">
            {filteredSkills.map((skill) => (
              <button
                key={skill.key}
                onClick={() => setSelectedSkillKey(skill.key)}
                className={`pill-tab shrink-0 whitespace-nowrap px-3 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all backdrop-blur md:px-4 ${
                  selectedSkillKey === skill.key
                    ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-950 dark:text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_12px_25px_rgba(15,23,42,0.10)] dark:shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_12px_25px_rgba(0,0,0,0.35)]"
                    : "bg-white/70 border-slate-200/70 text-slate-700 shadow-sm shadow-slate-900/5 hover:border-slate-300 hover:bg-white dark:bg-slate-950/30 dark:border-slate-800/70 dark:text-slate-300 dark:shadow-none dark:hover:border-slate-700 dark:hover:bg-slate-900/40"
                }`}
              >
                {skill.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start min-w-0">
            <div className="min-w-0 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 break-words dark:text-white">
                  {currentSkillDetail.title}
                </h3>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${levelColor}`}
                >
                  {currentSkillDetail.level === "prod" ? "Production" : "Projet / Expérimentation"}
                </div>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed break-words dark:text-slate-300">
                {currentSkillDetail.desc}
              </p>

              <div className="premium-subcard p-5 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-cyan-700 dark:text-cyan-300 text-sm font-semibold">
                  <Briefcase size={16} /> {"Contexte d'utilisation"}
                </div>
                <p className="text-sm text-slate-600 break-words dark:text-slate-300">{currentSkillDetail.context}</p>
              </div>

              <div className="premium-subcard p-5 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
                  <CheckCircle2 size={16} /> Valeur pour vous
                </div>
                <p className="text-sm text-slate-600 break-words dark:text-slate-300">{currentSkillDetail.employerValue}</p>
              </div>
            </div>

            <div className="relative group min-w-0">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
              <div className="premium-card relative rounded-3xl p-6 md:p-7 font-mono text-sm overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap md:gap-2 mb-4 border-b border-white/5 pb-3">
                  <span className="text-slate-700 text-xs shrink-0 dark:text-slate-500">Exemple de code</span>
                  <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap">
                    <button
                      type="button"
                      onClick={handleCopyExample}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1.5 text-[11px] font-semibold text-slate-800 shadow-sm shadow-slate-900/5 hover:bg-white hover:border-slate-300 transition-colors dark:border-white/10 dark:bg-slate-950/40 dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-900/50 dark:hover:border-white/20"
                      aria-label="Copier l'exemple de code"
                    >
                      <Copy size={14} />
                      {copied ? "Copié" : "Copier"}
                    </button>
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                  </div>
                </div>
                <div className="code-scroll-hint rounded-2xl border border-slate-200/70 bg-white/70 p-4 overflow-hidden shadow-sm shadow-slate-900/5 dark:border-white/5 dark:bg-slate-950/35 dark:shadow-none">
                  <pre className="overflow-x-auto max-w-full text-[13px] leading-6 text-slate-900 dark:text-slate-200">
                    <code className="block whitespace-pre">{exampleText}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-14 md:py-16 border-y border-slate-200/70 bg-slate-900/3 -mx-4 sm:-mx-6 px-4 sm:px-6 dark:border-slate-800/50 dark:bg-black/20">
        <p className="text-center text-slate-600 text-sm md:text-base font-semibold uppercase tracking-[0.25em] md:tracking-[0.3em] mb-8 md:mb-10 dark:text-slate-300">
          {"Ils m'ont fait confiance"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 place-items-center gap-x-8 gap-y-8 opacity-90 transition-all duration-500 md:opacity-80 md:flex md:flex-wrap md:justify-center md:items-center md:gap-10">
          {trustedLogos.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center justify-center p-1.5 md:p-2 hover:scale-105 md:hover:scale-105 transition-transform"
            >
              <div className="relative h-10 w-[140px] sm:h-11 sm:w-[160px] md:h-12 md:w-[168px] lg:h-14 lg:w-[190px]">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  fill
                  sizes="(min-width: 1024px) 190px, (min-width: 768px) 168px, (min-width: 640px) 160px, 140px"
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

export default memo(SkillsSection);
