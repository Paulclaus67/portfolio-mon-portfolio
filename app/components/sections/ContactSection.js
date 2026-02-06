"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

function ContactSection() {
  return (
    <section id="contact" className="max-w-2xl mx-auto text-center scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 dark:text-white">Prêt à collaborer ?</h2>
        <p className="text-slate-600 mb-8 dark:text-slate-300">
          {"Je suis actuellement à l'écoute d'opportunités pour des postes de développeur Fullstack ou Python/C#."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="mailto:paul.claus@viacesi.fr"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ y: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="btn-cta btn-text-dark inline-flex items-center justify-center gap-2 bg-white font-bold px-6 py-3 rounded-full transition-all border border-slate-200/70 hover:border-cyan-400/35 shadow-[0_12px_35px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
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
            className="btn-cta inline-flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0958A8] !text-white hover:!text-white font-bold px-6 py-3 rounded-full transition-all shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(10,102,194,0.25)]"
          >
            <Linkedin size={18} /> LinkedIn
          </motion.a>
        </div>

        <p className="mt-8 text-xs text-slate-500 border-t border-slate-200/70 pt-6 dark:border-slate-800/50">
          Réalisé avec Next.js, Tailwind CSS & Framer Motion.
          <br />© {new Date().getFullYear()} Paul Claus.
        </p>
      </motion.div>
    </section>
  );
}

export default memo(ContactSection);

