"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { fadeInUp, staggerContainer } from "../../utils/motionVariants";

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
    </motion.section>
  );
}

export default memo(HeroSection);

