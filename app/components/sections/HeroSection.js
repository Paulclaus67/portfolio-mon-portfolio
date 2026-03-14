"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../utils/motionVariants";

const MOBILE_PROOFS = [
  { label: "Poste", value: "Consultant .NET" },
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
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-slate-900/5 px-3 py-1 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/50"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">CDI en cours chez Actimage</span>
      </motion.div>

      <div className="md:hidden">
        <motion.h1 variants={fadeInUp} className="max-w-[10ch] text-[2.55rem] font-bold leading-[0.98] tracking-tight">
          Consultant
          <span className="block text-gradient-cyan">.NET, web</span>
          et C#.
        </motion.h1>

        <motion.p variants={fadeInUp} className="mt-4 max-w-[34ch] text-[15px] leading-7 text-slate-600 dark:text-slate-300">
          Je developpe des applications web metier en environnement .NET, avec une approche claire cote code, UX et
          maintenance. Sur mobile, l&apos;objectif est simple: comprendre vite mon profil, voir mes references, puis me
          contacter.
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-5 grid grid-cols-2 gap-2.5">
          {MOBILE_PROOFS.map((item) => (
            <div key={item.label} className="mobile-proof-card rounded-2xl px-4 py-3">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                {item.label}
              </span>
              <span className="mt-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-6 flex flex-col gap-3">
          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta btn-text-dark inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full border border-cyan-400/35 bg-white px-6 py-3.5 font-bold shadow-[0_12px_35px_rgba(0,0,0,0.18),0_0_30px_rgba(34,211,238,0.14)] transition-all hover:border-cyan-400/55 hover:bg-white"
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
            className="btn-cta glass-panel inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full border border-slate-200/70 px-6 py-3.5 font-medium text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-900/5 dark:border-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10"
          >
            <Download size={18} /> Telecharger CV
          </motion.a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { href: "https://github.com/Paulclaus67", label: "GitHub", icon: Github },
            { href: "https://www.linkedin.com/in/paul-claus/", label: "LinkedIn", icon: Linkedin },
            { href: "mailto:paul.claus@viacesi.fr", label: "Email", icon: Mail },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="mobile-chip inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                <Icon size={15} className="text-sky-600 dark:text-sky-300" />
                {item.label}
              </a>
            );
          })}
        </motion.div>
      </div>

      <div className="hidden md:block">
        <motion.h1 variants={fadeInUp} className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl">
          Consultant <span className="text-gradient-cyan">.NET</span>
          <br />
          et Developpeur C#.
        </motion.h1>

        <motion.p variants={fadeInUp} className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          Je suis <strong className="text-slate-900 dark:text-slate-200">Paul Claus</strong>. Consultant en informatique
          chez Actimage pour Euro Information, je concois des applications web metier en .NET et C#. Mon but:{" "}
          <span className="text-slate-900 dark:text-slate-200">
            transformer la complexite technique en outils utiles, maintenables et agreables a utiliser.
          </span>
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta btn-text-dark inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan-400/35 bg-white px-6 py-3 font-bold shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(34,211,238,0.18)] transition-all hover:border-cyan-400/55 hover:bg-white sm:w-auto"
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
            className="btn-cta glass-panel inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200/70 px-6 py-3 font-medium text-slate-900 transition-all hover:border-slate-300 hover:bg-slate-900/5 dark:border-white/10 dark:text-white dark:hover:border-white/20 dark:hover:bg-white/10 sm:w-auto"
          >
            <Download size={18} /> Telecharger CV
          </motion.a>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap justify-center gap-3 sm:justify-start">
          <a
            href="https://github.com/Paulclaus67"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="group inline-flex items-center justify-center rounded-full p-2 transition-all hover:-translate-y-0.5 hover:bg-sky-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <Github className="text-sky-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] transition-colors group-hover:text-sky-700 dark:text-sky-400 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)] dark:group-hover:text-sky-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/paul-claus/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="group inline-flex items-center justify-center rounded-full p-2 transition-all hover:-translate-y-0.5 hover:bg-sky-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <Linkedin className="text-sky-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] transition-colors group-hover:text-sky-700 dark:text-sky-400 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)] dark:group-hover:text-sky-300" />
          </a>
          <a
            href="mailto:paul.claus@viacesi.fr"
            aria-label="Email"
            className="group inline-flex items-center justify-center rounded-full p-2 transition-all hover:-translate-y-0.5 hover:bg-sky-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
          >
            <Mail className="text-sky-600 drop-shadow-[0_0_10px_rgba(56,189,248,0.12)] transition-colors group-hover:text-sky-700 dark:text-sky-400 dark:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)] dark:group-hover:text-sky-300" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(HeroSection);
