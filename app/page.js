"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useSpring,
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
  Cpu,
  ArrowUp
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

const NAV_ITEMS = [
  { label: "Introduction", id: "introduction" },
  { label: "Expérience", id: "experience" },
  { label: "Projets", id: "projets" },
  { label: "Compétences", id: "competences" },
  { label: "Contact", id: "contact" },
];

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
  const reduceMotion = useReducedMotion();
  const shakeControls = useAnimationControls();
  const [active, setActive] = useState(false);
  const [best, setBest] = useState(0);
  const [game, setGame] = useState(() => ({
    grid: Array(16).fill(null),
    tiles: {},
    score: 0,
    won: false,
    over: false,
    tick: 0,
    shakeTick: 0,
  }));
  const pointerStartRef = useRef(null);
  const nextTileIdRef = useRef(1);
  const lastShakeTickRef = useRef(0);

  const tileMeta = useMemo(() => {
    const mk = (label, cls) => ({ label, cls });
    return {
      2: mk("var", "from-slate-600/35 to-slate-900/25 border-slate-500/40"),
      4: mk("let", "from-sky-600/35 to-slate-900/25 border-sky-500/40"),
      8: mk("const", "from-cyan-600/35 to-slate-900/25 border-cyan-500/40"),
      16: mk("if", "from-emerald-600/35 to-slate-900/25 border-emerald-500/40"),
      32: mk("else", "from-lime-600/30 to-slate-900/25 border-lime-500/40"),
      64: mk("for", "from-amber-600/30 to-slate-900/25 border-amber-500/40"),
      128: mk("while", "from-orange-600/30 to-slate-900/25 border-orange-500/40"),
      256: mk("function", "from-rose-600/30 to-slate-900/25 border-rose-500/40"),
      512: mk("class", "from-fuchsia-600/30 to-slate-900/25 border-fuchsia-500/40"),
      1024: mk("async", "from-purple-600/30 to-slate-900/25 border-purple-500/40"),
      2048: mk("AI", "from-cyan-400/35 to-purple-500/25 border-cyan-300/50"),
      4096: mk("∞", "from-white/20 to-slate-900/25 border-white/30"),
    };
  }, []);

  const getValueAt = useCallback((tiles, id) => {
    if (!id) return 0;
    return tiles[id]?.value ?? 0;
  }, []);

  const pickEmptyCell = useCallback((grid) => {
    const empties = [];
    for (let i = 0; i < grid.length; i++) if (grid[i] == null) empties.push(i);
    if (!empties.length) return null;
    return empties[Math.floor(Math.random() * empties.length)];
  }, []);

  const isGameOver = useCallback(
    (grid, tiles) => {
      for (let i = 0; i < 16; i++) if (grid[i] == null) return false;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const i = r * 4 + c;
          const v = getValueAt(tiles, grid[i]);
          if (c < 3 && v === getValueAt(tiles, grid[i + 1])) return false;
          if (r < 3 && v === getValueAt(tiles, grid[i + 4])) return false;
        }
      }
      return true;
    },
    [getValueAt]
  );

  const spawnRandomTile = useCallback(
    ({ grid, tiles, tick }) => {
      const cell = pickEmptyCell(grid);
      if (cell == null) return { grid, tiles };

      const id = nextTileIdRef.current++;
      const value = Math.random() < 0.9 ? 2 : 4;
      const nextGrid = grid.slice();
      nextGrid[cell] = id;
      const nextTiles = {
        ...tiles,
        [id]: { id, value, spawnTick: tick, mergeTick: -1 },
      };
      return { grid: nextGrid, tiles: nextTiles };
    },
    [pickEmptyCell]
  );

  const buildInitialGame = useCallback(() => {
    nextTileIdRef.current = 1;
    let base = {
      grid: Array(16).fill(null),
      tiles: {},
      score: 0,
      won: false,
      over: false,
      tick: 1,
      shakeTick: 0,
    };
    base = { ...base, ...spawnRandomTile(base) };
    base = { ...base, ...spawnRandomTile(base) };
    return base;
  }, [spawnRandomTile]);

  const moveGrid = useCallback(
    (grid, tiles, dir, nextTick) => {
      const nextGrid = Array(16).fill(null);
      const nextTiles = { ...tiles };
      const mergedThisMove = new Set();
      let gained = 0;
      let moved = false;

      const readLine = (index) => {
        if (dir === "left" || dir === "right") {
          const row = index;
          const base = row * 4;
          const line = [grid[base], grid[base + 1], grid[base + 2], grid[base + 3]];
          return dir === "right" ? line.reverse() : line;
        }
        const col = index;
        const line = [grid[col], grid[col + 4], grid[col + 8], grid[col + 12]];
        return dir === "down" ? line.reverse() : line;
      };

      const writeLine = (index, line) => {
        const out = dir === "right" || dir === "down" ? line.slice().reverse() : line;
        if (dir === "left" || dir === "right") {
          const row = index;
          const base = row * 4;
          nextGrid[base] = out[0];
          nextGrid[base + 1] = out[1];
          nextGrid[base + 2] = out[2];
          nextGrid[base + 3] = out[3];
          return;
        }
        const col = index;
        nextGrid[col] = out[0];
        nextGrid[col + 4] = out[1];
        nextGrid[col + 8] = out[2];
        nextGrid[col + 12] = out[3];
      };

      const processLine = (line) => {
        const ids = line.filter((id) => id != null);
        const out = [];
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          const nextId = ids[i + 1];
          const value = getValueAt(nextTiles, id);

          if (
            nextId != null &&
            !mergedThisMove.has(id) &&
            !mergedThisMove.has(nextId) &&
            value !== 0 &&
            value === getValueAt(nextTiles, nextId)
          ) {
            const newValue = value * 2;
            nextTiles[id] = {
              ...nextTiles[id],
              value: newValue,
              mergeTick: nextTick,
            };
            mergedThisMove.add(id);
            mergedThisMove.add(nextId);
            delete nextTiles[nextId];
            gained += newValue;
            out.push(id);
            i++;
            moved = true;
            continue;
          }

          out.push(id);
        }

        while (out.length < 4) out.push(null);
        if (!moved) {
          for (let j = 0; j < 4; j++) {
            if (line[j] !== out[j]) {
              moved = true;
              break;
            }
          }
        }
        return out;
      };

      for (let i = 0; i < 4; i++) {
        const original = readLine(i);
        const out = processLine(original);
        writeLine(i, out);
      }

      return { grid: nextGrid, tiles: nextTiles, gained, moved };
    },
    [getValueAt]
  );

  const resetGame = useCallback(() => {
    setGame(buildInitialGame);
  }, [buildInitialGame]);

  const applyMove = useCallback(
    (dir) => {
      setGame((prev) => {
        if (prev.over) return prev;
        const nextTick = prev.tick + 1;
        const moved = moveGrid(prev.grid, prev.tiles, dir, nextTick);
        if (!moved.moved) return { ...prev, shakeTick: prev.shakeTick + 1 };

        let next = {
          ...prev,
          grid: moved.grid,
          tiles: moved.tiles,
          score: prev.score + moved.gained,
          tick: nextTick,
        };

        next = { ...next, ...spawnRandomTile(next) };

        const maxValue = Math.max(
          0,
          ...Object.values(next.tiles).map((t) => (typeof t.value === "number" ? t.value : 0))
        );
        const won = prev.won || maxValue >= 2048;
        const over = isGameOver(next.grid, next.tiles);
        return { ...next, won, over };
      });
    },
    [isGameOver, moveGrid, spawnRandomTile]
  );

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) return;
    if (game.shakeTick === lastShakeTickRef.current) return;
    lastShakeTickRef.current = game.shakeTick;

    shakeControls.start({
      x: [0, -10, 10, -7, 7, -4, 4, 0],
      transition: { duration: 0.32, ease: "easeInOut" },
    });
  }, [active, game.shakeTick, reduceMotion, shakeControls]);

  // Hook Konami Code (↑↑↓↓←→←→BA)
  useEffect(() => {
    if (active) return undefined;
    const code = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a"
    ];
    let index = 0;

    const handler = (e) => {
      const key = typeof e.key === "string" ? e.key : "";
      const normalized = key.length === 1 ? key.toLowerCase() : key;
      if (normalized === code[index]) {
        index++;
        if (index === code.length) {
          setGame(buildInitialGame);
          setActive(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, buildInitialGame]);

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem("konami2048_best") ?? "0");
      if (Number.isFinite(stored)) setBest(stored);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (game.score <= best) return undefined;
    setBest(game.score);
    try {
      window.localStorage.setItem("konami2048_best", String(game.score));
    } catch {
      // ignore
    }
    return undefined;
  }, [best, game.score]);

  useEffect(() => {
    if (!active) return undefined;

    const handler = (e) => {
      const key = e.key;
      const lower = typeof key === "string" ? key.toLowerCase() : "";
      const dir =
        key === "ArrowLeft" || lower === "q"
          ? "left"
          : key === "ArrowRight" || lower === "d"
            ? "right"
            : key === "ArrowUp" || lower === "z"
              ? "up"
              : key === "ArrowDown" || lower === "s"
                ? "down"
                : null;

      if (dir) {
        e.preventDefault();
        applyMove(dir);
        return;
      }

      if (lower === "r") {
        e.preventDefault();
        resetGame();
        return;
      }

      if (key === "Escape") {
        e.preventDefault();
        setActive(false);
      }
    };

    window.addEventListener("keydown", handler, { passive: false });
    return () => window.removeEventListener("keydown", handler);
  }, [active, applyMove, resetGame]);

  const handlePointerDown = (e) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    if (!pointerStartRef.current) return;
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (Math.max(absX, absY) < 28) return;
    applyMove(absX > absY ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up");
  };

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] text-white"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
    >
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.14),transparent_46%),radial-gradient(circle_at_60%_85%,rgba(236,72,153,0.10),transparent_48%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/35" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-2">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cyan-200">
                Konami
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-200">
                2048 Dev
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-purple-300">
              Merge ta stack
            </h1>
            <p className="mt-1 text-sm text-slate-300">
              Flèches ou <span className="font-mono">ZQSD</span> · <span className="font-mono">R</span> reset ·{" "}
              <span className="font-mono">Esc</span> fermer
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="w-full sm:w-auto rounded-2xl border border-slate-700/70 bg-slate-900/35 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.40)]">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Score</div>
                  <div className="font-mono text-xl text-slate-100">{game.score}</div>
                </div>
                <div className="h-9 w-px bg-slate-700/70" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400">Best</div>
                  <div className="font-mono text-xl text-slate-100">{best}</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => resetGame()}
              className="w-full sm:w-auto rounded-2xl border border-slate-700/70 bg-slate-900/35 px-4 py-3 text-sm font-semibold text-slate-200 shadow-[0_18px_60px_rgba(0,0,0,0.40)] hover:border-cyan-500/40 hover:text-white"
            >
              Rejouer
            </button>
            <button
              onClick={() => setActive(false)}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/35 p-3 text-slate-300 shadow-[0_18px_60px_rgba(0,0,0,0.40)] hover:border-rose-500/40 hover:text-white"
              aria-label="Fermer le mini-jeu"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex items-center justify-center">
            <motion.div
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 22 }}
              className="relative w-[min(92vw,520px)] rounded-3xl border border-slate-700/70 bg-slate-900/30 p-3 shadow-[0_32px_120px_rgba(0,0,0,0.55)]"
            >
              <motion.div
                className="relative select-none rounded-2xl bg-slate-950/35 p-3"
                style={{ touchAction: "none" }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                animate={shakeControls}
              >
                <div className={["relative", game.over ? "blur-sm opacity-80" : ""].join(" ")}>
                  <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={`bg-${i}`}
                        className="aspect-square rounded-xl border border-slate-800/60 bg-slate-950/30"
                      />
                    ))}
                  </div>

                  <LayoutGroup id="konami-2048">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2">
                      <AnimatePresence initial={false}>
                        {game.grid
                          .map((id, idx) => {
                            if (id == null) return null;
                            const tile = game.tiles[id];
                            if (!tile) return null;
                            return { idx, tile };
                          })
                          .filter(Boolean)
                          .map(({ idx, tile }) => {
                            const meta = tileMeta[tile.value];
                            const shouldSpawn = tile.spawnTick === game.tick;
                            const shouldMerge = tile.mergeTick === game.tick;
                            const row = Math.floor(idx / 4) + 1;
                            const col = (idx % 4) + 1;

                            return (
                              <motion.div
                                key={tile.id}
                                layout
                                layoutId={`konami-tile-${tile.id}`}
                                style={{ gridRowStart: row, gridColumnStart: col }}
                                initial={
                                  reduceMotion
                                    ? false
                                    : {
                                        opacity: 0,
                                        scale: shouldSpawn ? 0.35 : 0.95,
                                      }
                                }
                                animate={shouldMerge ? "merge" : shouldSpawn ? "spawn" : "idle"}
                                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                                variants={{
                                  idle: { opacity: 1, scale: 1 },
                                  spawn: { opacity: 1, scale: [0.35, 1.06, 1] },
                                  merge: { opacity: 1, scale: [1, 1.12, 1] },
                                }}
                                transition={
                                  reduceMotion
                                    ? { duration: 0 }
                                    : {
                                        layout: { type: "spring", stiffness: 520, damping: 34, mass: 0.72 },
                                        opacity: { duration: 0.12, ease: "easeOut" },
                                        scale:
                                          shouldSpawn || shouldMerge
                                            ? { duration: 0.22, ease: "easeOut" }
                                            : { type: "spring", stiffness: 520, damping: 34, mass: 0.72 },
                                      }
                                }
                                className={[
                                  "aspect-square rounded-xl border bg-gradient-to-br p-2 shadow-[0_18px_55px_rgba(0,0,0,0.35)]",
                                  meta?.cls ?? "from-slate-700/35 to-slate-900/25 border-slate-500/40",
                                ].join(" ")}
                              >
                                <div className="flex h-full flex-col items-center justify-center gap-1">
                                  <div className="font-mono text-base font-bold tracking-tight text-slate-100 sm:text-lg">
                                    {meta?.label ?? tile.value}
                                  </div>
                                  <div className="font-mono text-[10px] text-slate-300/90">{tile.value}</div>
                                </div>
                              </motion.div>
                            );
                          })}
                      </AnimatePresence>
                    </div>
                  </LayoutGroup>
                </div>

                <AnimatePresence>
                  {game.over && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center rounded-2xl"
                      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-slate-950/45 backdrop-blur-md" />
                      <motion.div
                        className="relative w-[min(92%,340px)] rounded-2xl border border-slate-700/70 bg-slate-900/50 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
                        initial={reduceMotion ? { scale: 1 } : { scale: 0.96, y: 6 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={reduceMotion ? { scale: 1 } : { scale: 0.96, y: 6 }}
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22 }}
                      >
                        <div className="text-sm font-semibold text-slate-100">Game Over</div>
                        <div className="mt-1 text-sm text-slate-300">Plus de moves possibles.</div>
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => resetGame()}
                            className="flex-1 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:border-cyan-400/45 hover:bg-cyan-500/15"
                          >
                            Rejouer
                          </button>
                          <button
                            onClick={() => setActive(false)}
                            className="rounded-xl border border-slate-700/70 bg-slate-950/20 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-rose-500/35"
                          >
                            Fermer
                          </button>
                        </div>
                        <div className="mt-3 text-xs text-slate-400">
                          Astuce : utilise <span className="font-mono">ZQSD</span> ou les flèches.
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span>Swipe (mobile) · ZQSD/Flèches (desktop)</span>
                <span className="font-mono">Objectif: 2048 (AI)</span>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            {game.won && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4"
              >
                <div className="font-semibold text-emerald-200">GG — AI atteint (2048).</div>
                <div className="mt-1 text-sm text-emerald-100/80">Continue pour viser 4096 (∞).</div>
              </motion.div>
            )}

            {/* Game over handled by overlay on the board */}

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/25 p-4">
              <div className="text-sm font-semibold text-slate-100">Contrôles</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div />
                <button
                  onClick={() => applyMove("up")}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/30 py-3 text-sm text-slate-200 hover:border-cyan-500/40"
                >
                  ↑
                </button>
                <div />
                <button
                  onClick={() => applyMove("left")}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/30 py-3 text-sm text-slate-200 hover:border-cyan-500/40"
                >
                  ←
                </button>
                <button
                  onClick={() => applyMove("down")}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/30 py-3 text-sm text-slate-200 hover:border-cyan-500/40"
                >
                  ↓
                </button>
                <button
                  onClick={() => applyMove("right")}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/30 py-3 text-sm text-slate-200 hover:border-cyan-500/40"
                >
                  →
                </button>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                Astuce: fusionne 2 tuiles identiques pour monter (var → let → const → … → AI).
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/70 bg-slate-900/25 p-4">
              <div className="text-sm font-semibold text-slate-100">Légende</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[2, 4, 8, 16, 32, 64, 128, 256].map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/25 px-3 py-1 text-xs text-slate-200"
                  >
                    <span className="font-mono">{tileMeta[v]?.label ?? v}</span>
                    <span className="font-mono text-slate-400">{v}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function Home() {
  // States
  const recruiterMode = false;
  const [activeSection, setActiveSection] = useState("introduction");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSkillKey, setSelectedSkillKey] = useState("python");
  const [selectedCategory, setSelectedCategory] = useState("languages");
  const [selectedProjectKey, setSelectedProjectKey] = useState("thales");
  const [expandedExperienceKey, setExpandedExperienceKey] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAllProjectActions, setShowAllProjectActions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const reduceMotion = useReducedMotion();

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
  const projectActionBullets = activeStudy.actionsBullets ?? [];
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
    setShowAllProjectActions(false);
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

  useEffect(() => {
    const getNavOffset = () => {
      const nav = document.querySelector("[data-nav='main']");
      const navHeight = nav?.getBoundingClientRect().height ?? 80;
      return Math.round(navHeight + 12);
    };

    const elements = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    let observer;

    const handleIntersect = (entries) => {
      const navOffset = getNavOffset();
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;

      visible.sort((a, b) => {
        const aDist = Math.abs(a.boundingClientRect.top - navOffset);
        const bDist = Math.abs(b.boundingClientRect.top - navOffset);
        return aDist - bDist;
      });

      setActiveSection(visible[0].target.id);
    };

    const setupObserver = () => {
      observer?.disconnect();
      const navOffset = getNavOffset();
      const bottomMarginPx = Math.round(window.innerHeight * 0.55);

      observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: `-${navOffset}px 0px -${bottomMarginPx}px 0px`,
        threshold: [0.05, 0.15, 0.3],
      });

      elements.forEach((el) => observer.observe(el));
    };

    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 80) setActiveSection("contact");
    };

    setupObserver();
    handleScroll();

    window.addEventListener("resize", setupObserver);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", setupObserver);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const progressWidth = useTransform(smoothProgress, (v) => `${v * 100}%`);

  return (
    <main className="relative min-h-[100dvh] bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100 font-sans overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-[calc(5rem+env(safe-area-inset-top))] left-0 right-0 h-[2px] md:h-[3px] z-40 pointer-events-none bg-white/5 ring-1 ring-white/5 overflow-hidden" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_12px_rgba(34,211,238,0.28)]"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Navigation */}
      <nav data-nav="main" className="fixed inset-x-0 top-0 w-full z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] pt-[env(safe-area-inset-top)]">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-600/70 cursor-pointer shadow-sm shadow-black/40" onClick={handleProfileClick}>
              <Image src="/Paul_PDP.jpg" alt="Paul Claus" fill sizes="40px" className="object-cover" />
            </div>
            <div className="leading-none">
              <span className="block font-semibold text-slate-100 tracking-tight text-[15px]">Paul Claus</span>
              <span className="hidden sm:block text-[11px] text-slate-400/90 mt-1">Développeur Fullstack</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold text-slate-300">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="nav-link"
                data-active={activeSection === item.id ? "true" : undefined}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="relative z-[1]">{item.label}</span>
                {activeSection === item.id ? (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="nav-indicator"
                    transition={{ type: "spring", stiffness: 560, damping: 44 }}
                  />
                ) : null}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/40 p-2.5 text-slate-200 hover:bg-slate-900/60 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
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
              className="md:hidden border-t border-white/10 bg-slate-950/80 backdrop-blur-xl overflow-hidden max-h-[calc(100dvh-5rem-env(safe-area-inset-top))] overflow-y-auto overscroll-contain"
            >
              <div className="flex flex-col p-4 sm:p-6 space-y-3 text-slate-200">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMenuOpen(false);
                    }}
                    className={`rounded-xl px-4 py-3 transition-colors text-base font-semibold border ${activeSection === item.id
                        ? "bg-white/6 border-cyan-400/30 text-cyan-100"
                        : "bg-white/0 hover:bg-white/5 border-white/0 hover:border-white/10"
                      }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 space-y-16 md:space-y-32 relative z-10">

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
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.08]"
          >
            Développeur <span className="text-gradient-cyan">Polyvalent</span><br />
            et Créatif.
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Je suis <strong className="text-slate-200">Paul Claus</strong>. Ingénieur informatique (CESI), je conçois des solutions web, logicielles et IA concrètes.
            Mon but : <span className="text-slate-200">transformer la complexité technique en outils simples et performants.</span>
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
              className="btn-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 glass-panel hover:bg-white/10 text-white font-medium px-6 py-3 rounded-full transition-all border border-white/10 hover:border-white/20"
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
              <Github className="text-sky-400 group-hover:text-sky-300 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
            </a>
            <a
              href="https://www.linkedin.com/in/paul-claus/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
            >
              <Linkedin className="text-sky-400 group-hover:text-sky-300 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
            </a>
            <a
              href="mailto:paul.claus@viacesi.fr"
              aria-label="Email"
              className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
            >
              <Mail className="text-sky-400 group-hover:text-sky-300 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
            </a>
            <a
              href="#contact"
              aria-label="Localisation"
              className="group inline-flex items-center justify-center rounded-full p-2 hover:bg-sky-400/10 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/70"
            >
              <MapPin className="text-sky-400 group-hover:text-sky-300 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.18)]" />
            </a>
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
                <p className="text-sm text-slate-300 mt-1">
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
                              <ul className="text-sm text-slate-300 space-y-2">
                                {study.contextBullets?.slice(0, 3).map((b, i) => (
                                  <li key={i} className="flex gap-2"><span className="text-slate-600">•</span>{b}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                              <h4 className="text-xs font-bold text-sky-500 uppercase tracking-wider mb-3">Action</h4>
                              <ul className="text-sm text-slate-300 space-y-2">
                                {study.actionsBullets?.slice(0, 3).map((b, i) => (
                                  <li key={i} className="flex gap-2"><span className="text-sky-800">•</span>{b}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Impact</h4>
                              <ul className="text-sm text-slate-300 space-y-2">
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
                { key: "logiciel", label: "Logiciel" },
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
                  onClick={() => {
                    setSelectedProjectKey(proj.key);
                    setShowAllProjectActions(false);
                  }}
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
                      <p className="text-xs text-slate-300/90">{proj.company}</p>
                      {proj.stackLabel ? (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-sky-200">
                            {proj.stackLabel}
                          </span>
                        </div>
                      ) : null}
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
                className="premium-card rounded-3xl p-6 md:p-8 min-h-[420px] sm:min-h-[520px] overflow-hidden"
              >
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{activeStudy.headline}</h3>
                    <p className="text-cyan-400 font-medium">{activeStudy.company} — {activeStudy.role}</p>
                  </div>
                  {activeStudy.key === "portfolio" ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-200 backdrop-blur">
                      Vous êtes dessus <MapPin size={14} />
                    </span>
                  ) : activeStudy.link ? (
                    <a
                      href={activeStudy.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-950/40 hover:bg-slate-900/60 text-slate-200 px-4 py-2 text-sm font-semibold transition-colors border border-slate-800/80 hover:border-slate-700 backdrop-blur"
                    >
                      Voir le projet <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>

                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  {activeStudy.summary}
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="premium-subcard p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Contexte</h4>
                    <ul className="text-sm text-slate-300 space-y-2">
                      {activeStudy.contextBullets.map((b, i) => <li key={i} className="flex gap-2"><span className="text-slate-600">•</span>{b}</li>)}
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
                        className="text-sm text-slate-300 space-y-2"
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
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/30 px-3 py-1.5 text-[11px] font-semibold text-slate-200 hover:bg-slate-900/40 hover:border-white/15 transition-colors"
                      >
                        {showAllProjectActions ? "Voir moins" : `Voir plus (${projectActionBullets.length - 3})`}
                        <ArrowRight size={14} className={`transition-transform ${showAllProjectActions ? "-rotate-90" : "rotate-90"}`} />
                      </button>
                    ) : null}
                  </div>
                  <div className="premium-subcard p-4 rounded-2xl">
                    <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Impact</h4>
                    <ul className="text-sm text-slate-300 space-y-2">
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
            <div className="flex gap-2 mb-8 border-b border-white/5 pb-4 overflow-x-auto scrollbar-none pr-2 md:flex-wrap md:overflow-visible md:pb-5 md:pr-0">
              {skillCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border backdrop-blur md:px-4 ${selectedCategory === cat.key
                      ? "bg-gradient-to-r from-cyan-500/25 to-purple-500/15 text-cyan-100 border-cyan-400/35 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]"
                      : "bg-slate-950/30 text-slate-300 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900/50"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="flex gap-2 mb-10 overflow-x-auto scrollbar-none pr-2 pb-2 md:flex-wrap md:overflow-visible md:pr-0 md:pb-0 md:gap-3">
              {filteredSkills.map(skill => (
                <button
                  key={skill.key}
                  onClick={() => setSelectedSkillKey(skill.key)}
                  className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all backdrop-blur md:px-4 ${selectedSkillKey === skill.key
                      ? "bg-cyan-500/10 border-cyan-400/50 text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.10),0_12px_25px_rgba(0,0,0,0.35)]"
                      : "bg-slate-950/30 border-slate-800/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900/40"
                    }`}
                >
                  {skill.label}
                </button>
              ))}
            </div>

            {/* Detailed View */}
            <div className="grid md:grid-cols-2 gap-8 items-start min-w-0">
              <div className="min-w-0 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 break-words">{currentSkillDetail.title}</h3>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${levelColor}`}>
                    {currentSkillDetail.level === "prod" ? "Production" : "Projet / Expérimentation"}
                  </div>
                </div>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed break-words">
                  {currentSkillDetail.desc}
                </p>

                <div className="premium-subcard p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm font-semibold">
                    <Briefcase size={16} /> {"Contexte d'utilisation"}
                  </div>
                  <p className="text-sm text-slate-300 break-words">{currentSkillDetail.context}</p>
                </div>

                <div className="premium-subcard p-5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 text-sm font-semibold">
                    <CheckCircle2 size={16} /> Valeur pour vous
                  </div>
                  <p className="text-sm text-slate-300 break-words">{currentSkillDetail.employerValue}</p>
                </div>
              </div>

              {/* Code Snippet Card */}
              <div className="relative group min-w-0">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity" />
                <div className="premium-card relative rounded-3xl p-6 md:p-7 font-mono text-sm overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap md:gap-2 mb-4 border-b border-white/5 pb-3">
                    <span className="text-slate-500 text-xs shrink-0">Exemple de code</span>
                    <div className="flex flex-wrap items-center justify-end gap-2 md:flex-nowrap">
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
                  <div className="code-scroll-hint rounded-2xl border border-white/5 bg-slate-950/35 p-4 overflow-hidden">
                    <pre className="overflow-x-auto max-w-full text-[13px] leading-6 text-slate-200">
                      <code className="block whitespace-pre">{exampleText}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* TRUSTED BY */}
        <section className="py-14 md:py-16 border-y border-slate-800/50 bg-black/20 -mx-4 sm:-mx-6 px-4 sm:px-6">
          <p className="text-center text-slate-300 text-sm md:text-base font-semibold uppercase tracking-[0.25em] md:tracking-[0.3em] mb-8 md:mb-10">
            {"Ils m'ont fait confiance"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 place-items-center gap-x-8 gap-y-8 opacity-90 transition-all duration-500 md:opacity-80 md:grayscale md:hover:grayscale-0 md:flex md:flex-wrap md:justify-center md:items-center md:gap-10">
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

        {/* CONTACT */}
        <section id="contact" className="max-w-2xl mx-auto text-center scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Prêt à collaborer ?</h2>
            <p className="text-slate-300 mb-8">
              {"Je suis actuellement à l'écoute d'opportunités pour des postes de développeur Fullstack ou Python/C#."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:paul.claus@viacesi.fr"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="btn-cta btn-text-dark inline-flex items-center justify-center gap-2 bg-white font-bold px-6 py-3 rounded-full transition-all border border-white/10 hover:border-cyan-400/35 shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
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
                className="btn-cta inline-flex items-center justify-center gap-2 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold px-6 py-3 rounded-full transition-all shadow-[0_12px_35px_rgba(0,0,0,0.45),0_0_30px_rgba(10,102,194,0.25)]"
              >
                <Linkedin size={18} /> LinkedIn
              </motion.a>
            </div>

            <p className="mt-8 text-xs text-slate-500 border-t border-slate-800/50 pt-6">
              Réalisé avec Next.js, Tailwind CSS & Framer Motion.<br />
              © {new Date().getFullYear()} Paul Claus.
            </p>
          </motion.div>
        </section>  

      </div>

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            type="button"
            aria-label="Remonter en haut de la page"
            onClick={scrollToTop}
            initial={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.95 }}
            animate={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 14, scale: 0.95 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 460, damping: 34 }}
            className="fixed z-50 right-[calc(1rem+env(safe-area-inset-right))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] inline-flex h-12 w-12 items-center justify-center rounded-full shadow-[0_18px_55px_rgba(0,0,0,0.55)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/70 group isolate overflow-hidden"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/70 via-purple-500/55 to-pink-500/45 opacity-70 blur-[10px] transition-opacity group-hover:opacity-90"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/70 via-purple-500/60 to-pink-500/55 opacity-55"
            />
            <span
              aria-hidden="true"
              className="absolute inset-[1px] rounded-full border border-white/10 bg-slate-950/70 backdrop-blur-xl transition-colors group-hover:bg-slate-950/60 group-hover:border-white/15"
            />
            <span
              aria-hidden="true"
              className="absolute -left-10 top-0 h-full w-12 rotate-12 bg-white/10 blur-sm opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
            />
            <ArrowUp size={18} className="relative z-10 text-slate-100 drop-shadow-[0_0_12px_rgba(34,211,238,0.18)]" />
          </motion.button>
        ) : null}
      </AnimatePresence>

      {showTerminal && <EasterEggTerminal onClose={() => setShowTerminal(false)} />}
      <KonamiGameOverlay />
    </main>
  );
}
