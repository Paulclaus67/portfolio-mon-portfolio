"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform
} from "framer-motion";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  X,
  CheckCircle2,
  Copy,
  Calendar,
  Terminal,
  Code2,
  Database,
  Server,
  Briefcase,
  Cpu
} from "lucide-react";

import {
  skills,
  skillCategories,
  skillDetails,
  skillExamples,
  experiences,
  companyLogos,
  caseStudies,
  trustedLogos,
} from "./data";

const caseStudyByKey = new Map(caseStudies.map((study) => [study.key, study]));

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

// --- COMPONENTS ---

// 1. TERMINAL EASTER EGG
function EasterEggTerminal({ onClose }) {
  const [lines, setLines] = useState([
    "> Initialisation du système...",
    "> Chargement du profil caché...",
  ]);

  useEffect(() => {
    const sequence = [
      { text: "> Accès autorisé.", delay: 800 },
      { text: "> Découverte du mode debug...", delay: 1600 },
      { text: "> Hint: Tapez le Konami Code (↑↑↓↓←→←→BA) sur la page d'accueil pour un mini-jeu.", delay: 2600 },
      { text: "> Fin de transmission.", delay: 4000 },
    ];

    let timeouts = [];
    sequence.forEach(({ text, delay }) => {
      const id = setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
      timeouts.push(id);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-sm text-green-400 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-slate-200">Terminal Administrateur</span>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-2">
          {lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p className="animate-pulse">_</p>
        </div>
      </div>
    </div>
  );
}

// 2. KONAMI GAME OVERLAY
function KonamiGameOverlay() {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);

  // Hook Konami Code simplifié pour l'exemple
  useEffect(() => {
    const code = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let index = 0;

    const handler = (e) => {
      if (e.key === code[index]) {
        index++;
        if (index === code.length) {
          setActive(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
        MODE KONAMI ACTIVÉ !
      </h1>
      <p className="text-slate-400 mb-8">Un mini-jeu caché se lancerait ici...</p>
      <button
        onClick={() => setActive(false)}
        className="px-6 py-2 bg-cyan-600 rounded-full hover:bg-cyan-500 text-white font-bold"
      >
        Fermer
      </button>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  // States
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSkillKey, setSelectedSkillKey] = useState("python");
  const [selectedCategory, setSelectedCategory] = useState("languages");
  const [selectedProjectKey, setSelectedProjectKey] = useState("thales");
  const [expandedExperienceKey, setExpandedExperienceKey] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Easter Egg states
  const [clicks, setClicks] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  // Derived state
  const currentSkillDetail = skillDetails[selectedSkillKey] || skillDetails.python;
  const currentSkillLabel = skills.find((s) => s.key === selectedSkillKey)?.label || "Python";
  const example = skillExamples[selectedSkillKey] || skillExamples.default;
  const filteredSkills = skills.filter((s) => s.category === selectedCategory);
  const levelColor =
    currentSkillDetail.level === "prod"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/50"
      : currentSkillDetail.level === "projet"
        ? "bg-sky-500/10 text-sky-200 border-sky-500/50"
        : "bg-slate-700/60 text-slate-100 border-slate-400/50";

  // Filter projects
  const activeStudy = caseStudies.find(p => p.key === selectedProjectKey) || caseStudies[0];
  const displayedProjects = recruiterMode
    ? caseStudies.filter(p => p.prioRecruiter)
    : caseStudies;

  const filteredProjectsList = activeTab === "all"
    ? displayedProjects
    : displayedProjects.filter(p => p.category === activeTab);

  const exampleText = ["// " + example.title, ...example.lines].join("\n");

  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(exampleText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const handleViewCaseStudy = (key) => {
    setSelectedProjectKey(key);
    setExpandedExperienceKey(null);
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Easter Egg Handler
  const handleProfileClick = () => {
    setClicks(c => c + 1);
    if (clicks + 1 === 5) {
      setShowTerminal(true);
      setClicks(0);
    }
  };

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700 cursor-pointer" onClick={handleProfileClick}>
              <Image src="/Paul_PDP.jpg" alt="Paul Claus" fill sizes="32px" className="object-cover" />
            </div>
            <span className="font-semibold text-slate-100 tracking-tight">Paul Claus</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {["Introduction", "Expérience", "Projets", "Compétences", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setRecruiterMode(!recruiterMode)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${recruiterMode
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/50 shadow-amber-900/20"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
            >
              {recruiterMode ? "⚡ Mode Recruteur ACTIF" : "Mode Standard"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-800 bg-slate-950 overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4 text-slate-300">
                {["Introduction", "Expérience", "Projets", "Compétences", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    onClick={() => setMenuOpen(false)}
                    className="block text-lg"
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setRecruiterMode(!recruiterMode);
                    setMenuOpen(false);
                  }}
                  className="w-full py-3 text-center rounded-lg bg-slate-800 text-slate-200 mt-4"
                >
                  {recruiterMode ? "Désactiver Mode Recruteur" : "Activer Mode Recruteur"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20 space-y-32 relative z-10">

        {/* HERO SECTION */}
        <motion.section
          id="introduction"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative scroll-mt-24"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 rounded-full bg-slate-900/50 border border-slate-700/50 px-3 py-1 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-emerald-300">Disponible dès maintenant</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Développeur <span className="text-gradient-cyan">Polyvalent</span><br />
            & Créatif.
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
            Je suis <strong className="text-slate-200">Paul Claus</strong>. Ingénieur généraliste (CESI), je conçois des solutions web, logicielles et IA concrètes.
            Mon but : <span className="text-slate-200">transformer la complexité technique en outils simples et performants.</span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="btn-text-dark inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold border border-cyan-400/35 bg-white hover:bg-white hover:border-cyan-400/55 transition-all hover:-translate-y-1 shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(34,211,238,0.18)]"
            >
              Me contacter <ArrowRight size={18} />
            </a>
            <a
              href="/Paul_Claus_CV.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 glass-panel hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full transition-all border border-white/10 hover:border-white/20"
            >
              <Download size={18} /> Télécharger CV
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex gap-4 text-slate-500">
            <a href="https://github.com/Paulclaus67" target="_blank" rel="noreferrer noopener" className="hover:text-white transition-colors"><Github /></a>
            <a href="https://www.linkedin.com/in/paul-claus/" target="_blank" rel="noreferrer noopener" className="hover:text-blue-400 transition-colors"><Linkedin /></a>
            <a href="mailto:paul.claus@viacesi.fr" className="hover:text-cyan-400 transition-colors"><Mail /></a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors"><MapPin /></a>
          </motion.div>
        </motion.section>

        {/* EXPÉRIENCE */}
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
                <h2 className="text-2xl font-bold text-slate-100">Expériences</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Résultats concrets, missions variées (réseau, web, IA) — cliquez pour voir les détails.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1">
                <Briefcase size={14} className="text-cyan-400" /> {experiences.length} expériences
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1">
                <CheckCircle2 size={14} className="text-emerald-400" /> Études de cas détaillées
              </span>
            </div>
          </div>

          <ol className="relative border-l border-slate-800/60 pl-6 lg:pl-10 space-y-6">
            {experiences.map((exp) => {
              const study = caseStudyByKey.get(exp.key);
              const isExpanded = expandedExperienceKey === exp.key;
              const primaryBullets = recruiterMode ? study?.impactBullets : study?.actionsBullets;

              return (
                <motion.li key={exp.key} variants={fadeInUp} className="relative">
                  <span className="absolute -left-[9px] top-7 h-4 w-4 rounded-full bg-slate-950 border border-cyan-500/40 shadow-[0_0_0_6px_rgba(6,182,212,0.08)]" />

                  <article className="glass-card experience-card rounded-2xl p-5 md:p-6">
                    <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 ring-1 ring-white/10">
                          <Image src={exp.logo} alt={exp.alt} width={40} height={40} className="object-contain w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-lg text-slate-100 leading-snug">{exp.title}</h3>
                          <p className="text-sm text-cyan-400 font-medium mt-0.5">
                            {study?.company ?? exp.place}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            {study?.location && (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin size={14} className="text-slate-600" /> {study.location}
                              </span>
                            )}
                            {study?.year && (
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar size={14} className="text-slate-600" /> {study.year}
                              </span>
                            )}
                            {study?.contractLabel && (
                              <span className="inline-flex items-center gap-1.5">
                                <Briefcase size={14} className="text-slate-600" /> {study.contractLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {exp.url && (
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
                          >
                            Site <ExternalLink size={14} />
                          </a>
                        )}

                        {study && (
                          <button
                            type="button"
                            onClick={() => handleViewCaseStudy(exp.key)}
                            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-200 hover:bg-cyan-500/15 transition-colors"
                          >
                            Étude de cas <ArrowRight size={14} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setExpandedExperienceKey((prev) => (prev === exp.key ? null : exp.key))}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/40 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-slate-700 hover:bg-slate-900/60 transition-colors"
                          aria-expanded={isExpanded}
                          aria-controls={`exp-${exp.key}-details`}
                        >
                          {isExpanded ? "Réduire" : "Détails"}
                        </button>
                      </div>
                    </header>

                    <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                      {recruiterMode ? exp.shortDesc : exp.desc}
                    </p>

                    {primaryBullets?.length ? (
                      <div className="mt-4">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          {recruiterMode ? "Impact" : "Actions"}
                        </p>
                        <ul className="space-y-2 text-sm text-slate-300">
                          {primaryBullets.slice(0, 2).map((b, i) => (
                            <li key={i} className="flex gap-2">
                              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${recruiterMode ? "bg-emerald-400/70" : "bg-sky-400/70"}`} />
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
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Contexte</h4>
                              <ul className="text-sm text-slate-400 space-y-2">
                                {study.contextBullets?.slice(0, 3).map((b, i) => (
                                  <li key={i} className="flex gap-2"><span className="text-slate-600">•</span>{b}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                              <h4 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-3">Action</h4>
                              <ul className="text-sm text-slate-400 space-y-2">
                                {study.actionsBullets?.slice(0, 3).map((b, i) => (
                                  <li key={i} className="flex gap-2"><span className="text-sky-800">•</span>{b}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Impact</h4>
                              <ul className="text-sm text-slate-400 space-y-2">
                                {study.impactBullets?.slice(0, 3).map((b, i) => (
                                  <li key={i} className="flex gap-2"><span className="text-emerald-800">•</span>{b}</li>
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
                      {exp.tags.map(tag => (
                        <span
                          key={tag.label}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50"
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

        {/* PROJETS */}
        <section id="projets" className="relative scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-cyan-500/50" />
              <h2 className="text-2xl font-bold text-slate-100">Projets Sélectionnés</h2>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { key: "all", label: "Tous" },
                { key: "reseau", label: "Réseau" },
                { key: "web", label: "Web" },
                { key: "ia", label: "IA" },
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap backdrop-blur ${activeTab === cat.key
                      ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/20 text-cyan-100 border-cyan-400/40 shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_12px_30px_rgba(0,0,0,0.35)]"
                      : "bg-slate-950/40 text-slate-300 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900/50"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-[350px_1fr] gap-6">
            {/* Project List */}
            <div className="space-y-3">
              {filteredProjectsList.map((proj) => (
                <motion.button
                  key={proj.key}
                  onClick={() => setSelectedProjectKey(proj.key)}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`premium-card premium-card--interactive w-full text-left p-4 md:p-5 rounded-2xl relative overflow-hidden group ${selectedProjectKey === proj.key ? "border-cyan-400/35" : ""}`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transition-opacity ${selectedProjectKey === proj.key ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ring-1 ring-white/10 ${proj.key === "muscu-pwa" ? "bg-cyan-600" : "bg-white"}`}>
                      {proj.logo ? (
                        <Image src={proj.logo} alt="" width={28} height={28} className="w-7 h-7 object-contain" />
                      ) : (
                        <span className="text-lg font-bold text-slate-900">{proj.company[0]}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className={`text-sm font-semibold leading-snug line-clamp-2 break-words ${selectedProjectKey === proj.key ? "text-cyan-200" : "text-slate-100"}`}>
                        {proj.headline}
                      </h4>
                      <p className="text-xs text-slate-400/90">{proj.company}</p>
                    </div>
                  </div>
                  {/* Active Indicator */}
                  {selectedProjectKey === proj.key && (
                    <motion.div
                      layoutId="active-project-glow"
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/14 via-purple-500/10 to-transparent pointer-events-none"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Project Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="premium-card rounded-3xl p-6 md:p-8 min-h-[520px] overflow-hidden"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{activeStudy.headline}</h3>
                    <p className="text-cyan-400 font-medium">{activeStudy.company} — {activeStudy.role}</p>
                  </div>
                  {activeStudy.link && (
                    <a
                      href={activeStudy.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-950/40 hover:bg-slate-900/60 text-slate-200 px-4 py-2 text-sm font-semibold transition-colors border border-slate-800/80 hover:border-slate-700 backdrop-blur"
                    >
                      Voir le projet <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  {activeStudy.summary}
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="premium-subcard p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Contexte</h4>
                    <ul className="text-sm text-slate-400 space-y-2">
                      {activeStudy.contextBullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-slate-600">•</span>{b}</li>)}
                    </ul>
                  </div>
                  <div className="premium-subcard p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-3">Action</h4>
                    <ul className="text-sm text-slate-400 space-y-2">
                      {activeStudy.actionsBullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-sky-800">•</span>{b}</li>)}
                    </ul>
                  </div>
                  <div className="premium-subcard p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Impact</h4>
                    <ul className="text-sm text-slate-400 space-y-2">
                      {activeStudy.impactBullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-emerald-800">•</span>{b}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeStudy.techs.map(tech => (
                    <span key={tech} className="premium-chip px-3 py-1 rounded-full text-xs text-slate-200 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* COMPÉTENCES */}
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
            <h2 className="text-2xl font-bold text-slate-100">Compétences Techniques</h2>
          </div>

          <div className="premium-card rounded-3xl p-6 md:p-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-5">
              {skillCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border backdrop-blur ${selectedCategory === cat.key
                      ? "bg-gradient-to-r from-cyan-500/25 to-purple-500/15 text-cyan-100 border-cyan-400/35 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
                      : "bg-slate-950/30 text-slate-300 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900/50"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="flex flex-wrap gap-3 mb-10">
              {filteredSkills.map(skill => (
                <button
                  key={skill.key}
                  onClick={() => setSelectedSkillKey(skill.key)}
                  className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all backdrop-blur ${selectedSkillKey === skill.key
                      ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_12px_25px_rgba(0,0,0,0.35)]"
                      : "bg-slate-950/30 border-slate-800/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900/40"
                    }`}
                >
                  {skill.label}
                </button>
              ))}
            </div>

            {/* Detailed View */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{currentSkillDetail.title}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${levelColor}`}>
                    {currentSkillDetail.level === "prod" ? "Production" : "Projet / Expérimentation"}
                  </div>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed">
                  {currentSkillDetail.desc}
                </p>

                <div className="premium-subcard p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm font-semibold">
                    <Briefcase size={16} /> {"Contexte d'utilisation"}
                  </div>
                  <p className="text-sm text-slate-400">{currentSkillDetail.context}</p>
                </div>

                <div className="premium-subcard p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 text-sm font-semibold">
                    <CheckCircle2 size={16} /> Valeur pour vous
                  </div>
                  <p className="text-sm text-slate-400">{currentSkillDetail.employerValue}</p>
                </div>
              </div>

              {/* Code Snippet Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                <div className="premium-card relative rounded-3xl p-6 md:p-7 font-mono text-sm overflow-hidden">
                  <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                    <span className="text-slate-500 text-xs">Exemple de code</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyExample}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-900/50 hover:border-white/20 transition-colors"
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
                  <div className="code-scroll-hint rounded-2xl border border-white/5 bg-slate-950/35 p-4">
                    <pre className="overflow-x-auto text-[13px] leading-6 text-slate-200">
                      <code className="block min-w-max whitespace-pre">{exampleText}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* TRUSTED BY */}
        <section className="py-14 md:py-18 border-y border-slate-800/50 bg-black/20 -mx-6 px-6">
          <p className="text-center text-slate-400 text-sm md:text-base font-semibold uppercase tracking-[0.3em] mb-10">
            {"Ils m'ont fait confiance"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {trustedLogos.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:scale-110 transition-transform"
              >
                <Image src={brand.src} alt={brand.name} width={140} height={56} className="h-10 md:h-12 w-auto object-contain" />
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="max-w-2xl mx-auto text-center scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

            <h2 className="text-3xl font-bold text-white mb-4">Prêt à collaborer ?</h2>
            <p className="text-slate-400 mb-8">
              {"Je suis actuellement à l'écoute d'opportunités pour des postes de développeur Fullstack ou Python."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:paul.claus@viacesi.fr"
                className="btn-text-dark inline-flex items-center justify-center gap-2 bg-white font-bold px-6 py-3 rounded-full transition-all border border-white/10 hover:border-cyan-400/35 shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <Mail size={18} className="icon-cyan" /> paul.claus@viacesi.fr
              </a>
              <a
                href="https://www.linkedin.com/in/paul-claus/"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold px-6 py-3 rounded-full transition-all shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(10,102,194,0.25)]"
              >
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>

            <p className="mt-8 text-xs text-slate-500 border-t border-slate-800/50 pt-6">
              Réalisé avec Next.js, Tailwind CSS & Framer Motion.<br />
              © {new Date().getFullYear()} Paul Claus.
            </p>
          </motion.div>
        </section>

      </div>

      {showTerminal && <EasterEggTerminal onClose={() => setShowTerminal(false)} />}
      <KonamiGameOverlay />
    </main>
  );
}
