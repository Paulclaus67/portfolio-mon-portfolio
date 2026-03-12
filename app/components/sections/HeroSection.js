"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../utils/motionVariants";

const MOBILE_HIGHLIGHTS = [
  { label: "Disponible", value: "Maintenant" },
  { label: "Focus", value: "Web, C#, IA" },
  { label: "Base", value: "Strasbourg" },
];

function HeroSection() {
  return (
    <motion.section
      id="introduction"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="relative scroll-mt-24"
    >
      <motion.div
        variants={fadeInUp}
        className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 border border-slate-200/70 px-3 py-1 mb-6 backdrop-blur-md dark:bg-slate-900/50 dark:border-slate-700/50"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Disponible dès maintenant</span>
      </motion.div>

      <div className="md:hidden">
        <motion.h1
          variants={fadeInUp}
          className="max-w-[11ch] text-[2.7rem] font-bold leading-[0.98] tracking-tight"
        >
          Développeur <span className="text-gradient-cyan">polyvalent</span>
          <br />
          pour des produits utiles.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-300"
        >
          Je conçois des expériences web, logicielles et IA concrètes. L’objectif mobile est simple :
          comprendre vite ce que je fais, voir les bons projets, puis me contacter sans friction.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-5 grid grid-cols-1 gap-2.5">
          {MOBILE_HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="mobile-surface mobile-chip flex items-center justify-between rounded-2xl px-4 py-3 text-sm"
            >
              <span className="text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-6 flex flex-col gap-3">
          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta btn-text-dark inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold border border-cyan-400/35 bg-white hover:bg-white hover:border-cyan-400/55 transition-all shadow-[0_12px_35px_rgba(0,0,0,0.18),0_0_30px_rgba(34,211,238,0.14)]"
          >
            Me contacter <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="/Paul_Claus_CV.pdf"
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ y: 0, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta inline-flex min-h-13 w-full items-center justify-center gap-2 glass-panel hover:bg-slate-900/5 text-slate-900 font-medium px-6 py-3.5 rounded-full transition-all border border-slate-200/70 hover:border-slate-300 dark:hover:bg-white/10 dark:text-white dark:border-white/10 dark:hover:border-white/20"
          >
            <Download size={18} /> Télécharger CV
          </motion.a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mobile-surface mobile-surface--strong mt-5 rounded-[28px] p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Accès rapide</p>
              <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">Liens utiles en un tap</p>
            </div>
            <div className="rounded-full bg-gradient-to-r from-cyan-400/20 to-sky-400/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-200">
              Mobile
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              { href: "https://github.com/Paulclaus67", label: "GitHub", icon: Github },
              { href: "https://www.linkedin.com/in/paul-claus/", label: "LinkedIn", icon: Linkedin },
              { href: "mailto:paul.claus@viacesi.fr", label: "Email", icon: Mail },
              { href: "#contact", label: "Contact", icon: MapPin },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-label={item.label}
                  className="mobile-chip group relative flex min-h-17 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl px-2 py-3 text-center transition-colors"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/55 to-transparent" aria-hidden="true" />
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow-sm shadow-slate-900/5 dark:bg-white/8 dark:shadow-none">
                    <Icon size={16} className="text-sky-600 dark:text-sky-300" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block">
        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]"
        >
          Développeur <span className="text-gradient-cyan">Polyvalent</span>
          <br />
          et Créatif.
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-base sm:text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed dark:text-slate-300"
        >
          Je suis <strong className="text-slate-900 dark:text-slate-200">Paul Claus</strong>. Ingénieur informatique
          (CESI), je conçois des solutions web, logicielles et IA concrètes. Mon but :{" "}
          <span className="text-slate-900 dark:text-slate-200">
            transformer la complexité technique en outils simples et performants.
          </span>
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta btn-text-dark inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 py-3 font-bold border border-cyan-400/35 bg-white hover:bg-white hover:border-cyan-400/55 transition-all shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(34,211,238,0.18)]"
          >
            Me contacter <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="/Paul_Claus_CV.pdf"
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ y: 0, scale: 0.99 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 glass-panel hover:bg-slate-900/5 text-slate-900 font-medium px-6 py-3 rounded-full transition-all border border-slate-200/70 hover:border-slate-300 dark:hover:bg-white/10 dark:text-white dark:border-white/10 dark:hover:border-white/20"
          >
            <Download size={18} /> Télécharger CV
          </motion.a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap justify-center sm:justify-start gap-3">
          <a
            href="https://github.com/Paulclaus67"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <Github className="text-sky-600 group-hover:text-sky-700 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] dark:text-sky-400 dark:group-hover:text-sky-300 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
          </a>
          <a
            href="https://www.linkedin.com/in/paul-claus/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <Linkedin className="text-sky-600 group-hover:text-sky-700 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] dark:text-sky-400 dark:group-hover:text-sky-300 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
          </a>
          <a
            href="mailto:paul.claus@viacesi.fr"
            aria-label="Email"
            className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <Mail className="text-sky-600 group-hover:text-sky-700 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] dark:text-sky-400 dark:group-hover:text-sky-300 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
          </a>
          <a
            href="#contact"
            aria-label="Localisation"
            className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <MapPin className="text-sky-600 group-hover:text-sky-700 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] dark:text-sky-400 dark:group-hover:text-sky-300 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(HeroSection);
