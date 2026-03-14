"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-2xl scroll-mt-24 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden"
      >
        <div className="mobile-surface mobile-surface--strong rounded-[28px] p-5 text-left md:hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Echanger sur vos projets ?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Je suis actuellement en CDI chez Actimage et disponible pour echanger autour de sujets C#, ASP.NET Core,
            applications web metier et full-stack.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <motion.a
              href="mailto:paul.claus@viacesi.fr"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="btn-cta btn-text-dark inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200/70 bg-white px-5 py-3 font-bold shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
            >
              <Mail size={18} className="icon-cyan" /> M&apos;ecrire
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/paul-claus/"
              target="_blank"
              rel="noreferrer noopener"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className="btn-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-5 py-3 font-bold !text-white shadow-[0_12px_35px_rgba(0,0,0,0.35),0_0_30px_rgba(10,102,194,0.20)]"
            >
              <Linkedin size={18} /> LinkedIn
            </motion.a>
          </div>

          <p className="mt-5 border-t border-slate-200/70 pt-4 text-xs text-slate-500 dark:border-white/10">
            Realise avec Next.js, Tailwind CSS et Framer Motion.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="glass-panel relative overflow-hidden p-6 sm:p-10">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Echanger sur vos projets ?</h2>
            <p className="mb-8 text-slate-600 dark:text-slate-300">
              Je suis actuellement consultant en informatique chez Actimage pour Euro Information. Je reste disponible
              pour discuter architecture applicative, C#, ASP.NET Core et experiences web metier.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <motion.a
                href="mailto:paul.claus@viacesi.fr"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="btn-cta btn-text-dark inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/70 bg-white px-6 py-3 font-bold transition-all hover:border-cyan-400/35 shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                <Mail size={18} className="icon-cyan" /> paul.claus@viacesi.fr
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/paul-claus/"
                target="_blank"
                rel="noreferrer noopener"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="btn-cta inline-flex items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 font-bold !text-white transition-all hover:bg-[#0958A8] hover:!text-white shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(10,102,194,0.25)]"
              >
                <Linkedin size={18} /> LinkedIn
              </motion.a>
            </div>

            <p className="mt-8 border-t border-slate-200/70 pt-6 text-xs text-slate-500 dark:border-slate-800/50">
              Realise avec Next.js, Tailwind CSS & Framer Motion.
              <br />&copy; {new Date().getFullYear()} Paul Claus.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(ContactSection);
