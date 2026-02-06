"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function EasterEggTerminal({ onClose }) {
  const [lines, setLines] = useState([
    "> Initialisation du système...",
    "> Chargement du profil caché...",
  ]);

  useEffect(() => {
    const sequence = [
      { text: "> Accès autorisé.", delay: 800 },
      { text: "> Découverte du mode debug...", delay: 1600 },
      {
        text: "> Hint: Tapez le Konami Code (↑↑↓↓←→←→BA) sur la page d'accueil pour un mini-jeu.",
        delay: 2600,
      },
      { text: "> Fin de transmission.", delay: 4000 },
    ];

    const timeouts = [];
    for (const { text, delay } of sequence) {
      const id = setTimeout(() => {
        setLines((prev) => [...prev, text]);
      }, delay);
      timeouts.push(id);
    }

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm p-4 dark:bg-black/80">
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-4 font-mono text-sm text-green-600 shadow-2xl dark:border-slate-700 dark:bg-slate-950 dark:text-green-400">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
          <span className="text-slate-900 dark:text-slate-200">Terminal Administrateur</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white"
          >
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

