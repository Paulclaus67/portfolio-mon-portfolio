"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Moon, RotateCcw, Sun, X } from "lucide-react";

export default function KonamiGameOverlay({ onClose }) {
  const reduceMotion = useReducedMotion();
  const shakeControls = useAnimationControls();
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  });

  const pointerStartRef = useRef(null);
  const lastShakeTickRef = useRef(0);

  const tileMeta = useMemo(() => {
    const mk = (label, cls) => ({ label, cls });
    return {
      2: mk(
        "var",
        "from-slate-200/90 to-white/70 border-slate-300/80 dark:from-slate-600/35 dark:to-slate-900/25 dark:border-slate-500/40"
      ),
      4: mk(
        "let",
        "from-sky-200/90 to-white/70 border-sky-300/80 dark:from-sky-600/35 dark:to-slate-900/25 dark:border-sky-500/40"
      ),
      8: mk(
        "const",
        "from-cyan-200/90 to-white/70 border-cyan-300/80 dark:from-cyan-600/35 dark:to-slate-900/25 dark:border-cyan-500/40"
      ),
      16: mk(
        "if",
        "from-emerald-200/90 to-white/70 border-emerald-300/80 dark:from-emerald-600/35 dark:to-slate-900/25 dark:border-emerald-500/40"
      ),
      32: mk(
        "else",
        "from-lime-200/85 to-white/70 border-lime-300/80 dark:from-lime-600/30 dark:to-slate-900/25 dark:border-lime-500/40"
      ),
      64: mk(
        "for",
        "from-amber-200/85 to-white/70 border-amber-300/80 dark:from-amber-600/30 dark:to-slate-900/25 dark:border-amber-500/40"
      ),
      128: mk(
        "while",
        "from-orange-200/85 to-white/70 border-orange-300/80 dark:from-orange-600/30 dark:to-slate-900/25 dark:border-orange-500/40"
      ),
      256: mk(
        "function",
        "from-rose-200/85 to-white/70 border-rose-300/80 dark:from-rose-600/30 dark:to-slate-900/25 dark:border-rose-500/40"
      ),
      512: mk(
        "class",
        "from-fuchsia-200/85 to-white/70 border-fuchsia-300/80 dark:from-fuchsia-600/30 dark:to-slate-900/25 dark:border-fuchsia-500/40"
      ),
      1024: mk(
        "async",
        "from-purple-200/85 to-white/70 border-purple-300/80 dark:from-purple-600/30 dark:to-slate-900/25 dark:border-purple-500/40"
      ),
      2048: mk(
        "AI",
        "from-cyan-200/90 to-purple-200/70 border-cyan-300/80 dark:from-cyan-400/35 dark:to-purple-500/25 dark:border-cyan-300/50"
      ),
      4096: mk(
        "∞",
        "from-white/90 to-slate-200/70 border-slate-300/80 dark:from-white/20 dark:to-slate-900/25 dark:border-white/30"
      ),
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
    ({ grid, tiles, tick, nextId }) => {
      const cell = pickEmptyCell(grid);
      if (cell == null) return { grid, tiles, nextId };

      const id = nextId;
      const value = Math.random() < 0.9 ? 2 : 4;
      const nextGrid = grid.slice();
      nextGrid[cell] = id;
      const nextTiles = {
        ...tiles,
        [id]: { id, value, spawnTick: tick, mergeTick: -1 },
      };
      return { grid: nextGrid, tiles: nextTiles, nextId: nextId + 1 };
    },
    [pickEmptyCell]
  );

  const buildInitialGame = useCallback(() => {
    let base = {
      grid: Array(16).fill(null),
      tiles: {},
      score: 0,
      won: false,
      over: false,
      tick: 1,
      shakeTick: 0,
      nextId: 1,
    };
    base = { ...base, ...spawnRandomTile(base) };
    base = { ...base, ...spawnRandomTile(base) };
    return base;
  }, [spawnRandomTile]);

  const [game, setGame] = useState(() => {
    let storedBest = 0;
    try {
      const v = Number(window.localStorage.getItem("konami2048_best") ?? "0");
      if (Number.isFinite(v)) storedBest = v;
    } catch {
      // ignore
    }
    const base = buildInitialGame();
    return { ...base, best: storedBest };
  });

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

      const compressAndMerge = (line) => {
        const ids = line.filter((id) => id != null);
        const out = [];

        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          const nextId = ids[i + 1];
          const v = getValueAt(tiles, id);
          const nv = getValueAt(tiles, nextId);

          if (nextId && v === nv && !mergedThisMove.has(id) && !mergedThisMove.has(nextId)) {
            mergedThisMove.add(id);
            mergedThisMove.add(nextId);
            const mergedId = id;
            const newValue = v * 2;
            gained += newValue;

            nextTiles[mergedId] = {
              ...nextTiles[mergedId],
              value: newValue,
              mergeTick: nextTick,
            };
            delete nextTiles[nextId];
            out.push(mergedId);
            i++;
          } else {
            out.push(id);
          }
        }

        while (out.length < 4) out.push(null);
        return out;
      };

      for (let i = 0; i < 4; i++) {
        const line = readLine(i);
        const merged = compressAndMerge(line);
        writeLine(i, merged);
        if (!moved) {
          for (let j = 0; j < 4; j++) if (line[j] !== merged[j]) moved = true;
        }
      }

      return { grid: nextGrid, tiles: nextTiles, moved, gained };
    },
    [getValueAt]
  );

  const resetGame = useCallback(() => {
    setGame((prev) => ({ ...buildInitialGame(), best: prev.best ?? 0 }));
  }, [buildInitialGame]);

  const applyMove = useCallback(
    (dir) => {
      setGame((prev) => {
        if (prev.over) return prev;

        const nextTick = prev.tick + 1;
        const moved = moveGrid(prev.grid, prev.tiles, dir, nextTick);
        if (!moved.moved) {
          return { ...prev, tick: nextTick, shakeTick: prev.shakeTick + 1 };
        }

        let next = {
          ...prev,
          grid: moved.grid,
          tiles: moved.tiles,
          score: prev.score + moved.gained,
          tick: nextTick,
        };

        next = { ...next, ...spawnRandomTile(next) };
        next.best = Math.max(prev.best ?? 0, next.score);

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
    if (reduceMotion) return;
    if (game.shakeTick === lastShakeTickRef.current) return;
    lastShakeTickRef.current = game.shakeTick;

    shakeControls.start({
      x: [0, -10, 10, -7, 7, -4, 4, 0],
      transition: { duration: 0.32, ease: "easeInOut" },
    });
  }, [game.shakeTick, reduceMotion, shakeControls]);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setCurrentTheme(root.dataset.theme === "dark" ? "dark" : "light");
    update();

    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 340);
    }

    root.dataset.theme = next;
    root.dataset.themeReady = "true";
    root.classList.toggle("dark", next === "dark");

    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // ignore
    }

    setCurrentTheme(next);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("konami2048_best", String(game.best ?? 0));
    } catch {
      // ignore
    }
  }, [game.best]);

  useEffect(() => {
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
        onClose?.();
      }
    };

    window.addEventListener("keydown", handler, { passive: false });
    return () => window.removeEventListener("keydown", handler);
  }, [applyMove, onClose, resetGame]);

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

  return (
    <motion.div
      className="fixed inset-0 z-[60] text-slate-900 dark:text-white"
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
    >
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.14),transparent_46%),radial-gradient(circle_at_60%_85%,rgba(236,72,153,0.10),transparent_48%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-slate-900/10 dark:to-black/35" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-4 sm:py-6 overflow-y-auto overscroll-contain">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 flex-wrap">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cyan-800 dark:text-cyan-200">
                Konami
              </span>
              <span className="rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:shadow-none">
                2048 Dev
              </span>
            </div>
            <h1 className="mt-2 text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-sky-600 to-purple-700 dark:from-cyan-300 dark:via-sky-200 dark:to-purple-300">
              Merge ta stack
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Flèches ou <span className="font-mono">ZQSD</span> · <span className="font-mono">R</span> reset ·{" "}
              <span className="font-mono">Esc</span> fermer
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-3 py-2 shadow-sm shadow-slate-900/10 dark:border-slate-700/70 dark:bg-slate-900/35 dark:shadow-[0_18px_60px_rgba(0,0,0,0.40)]">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Score
                  </div>
                  <div className="font-mono text-lg sm:text-xl text-slate-900 dark:text-slate-100">{game.score}</div>
                </div>
                <div className="h-8 w-px bg-slate-200/70 dark:bg-slate-700/70" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Best
                  </div>
                  <div className="font-mono text-lg sm:text-xl text-slate-900 dark:text-slate-100">{game.best ?? 0}</div>
                </div>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-slate-700 shadow-sm shadow-slate-900/10 hover:border-cyan-500/40 hover:text-slate-900 dark:border-slate-700/70 dark:bg-slate-900/35 dark:text-slate-300 dark:shadow-[0_18px_60px_rgba(0,0,0,0.40)] dark:hover:text-white"
              aria-label="Changer le thème"
              title="Changer le thème"
            >
              {currentTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => resetGame()}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-slate-900 shadow-sm shadow-slate-900/10 hover:border-cyan-500/40 dark:border-slate-700/70 dark:bg-slate-900/35 dark:text-slate-200 dark:shadow-[0_18px_60px_rgba(0,0,0,0.40)] dark:hover:text-white sm:px-4 sm:py-3"
              aria-label="Rejouer"
              title="Rejouer"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline text-sm font-semibold">Rejouer</span>
            </button>
            <button
              onClick={() => onClose?.()}
              className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 text-slate-700 shadow-sm shadow-slate-900/10 hover:border-rose-500/40 hover:text-slate-900 dark:border-slate-700/70 dark:bg-slate-900/35 dark:text-slate-300 dark:shadow-[0_18px_60px_rgba(0,0,0,0.40)] dark:hover:text-white"
              aria-label="Fermer le mini-jeu"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="mt-4 grid flex-1 grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex items-start justify-center lg:items-center">
            <motion.div
              initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 22 }}
              className="relative w-[min(92vw,420px)] sm:w-[min(92vw,520px)] rounded-2xl border border-slate-200/70 bg-white/70 p-2 shadow-[0_32px_120px_rgba(15,23,42,0.12)] dark:border-slate-700/70 dark:bg-slate-900/30 dark:shadow-[0_32px_120px_rgba(0,0,0,0.55)] sm:rounded-3xl sm:p-3"
            >
              <motion.div
                className="relative select-none rounded-2xl bg-white/65 p-3 dark:bg-slate-950/35"
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
                        className="aspect-square rounded-xl border border-slate-200/70 bg-white/60 dark:border-slate-800/60 dark:bg-slate-950/30"
                      />
                    ))}
                  </div>

                  <div className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-2">
                    {Array.from({ length: 16 }).map((_, i) => {
                      const id = game.grid[i];
                      if (!id) return <div key={`empty-${i}`} className="aspect-square" />;
                      const tile = game.tiles[id];
                      if (!tile) return <div key={`missing-${i}`} className="aspect-square" />;
                      const meta = tileMeta[tile.value] ?? { label: tile.value, cls: "" };
                      const isNew = tile.spawnTick === game.tick;
                      const isMerged = tile.mergeTick === game.tick;

                      return (
                        <motion.div
                          key={`tile-${id}`}
                          initial={
                            reduceMotion
                              ? { opacity: 1, scale: 1 }
                              : isNew
                                ? { opacity: 0, scale: 0.6 }
                                : { opacity: 1, scale: 1 }
                          }
                          animate={
                            reduceMotion
                              ? { opacity: 1, scale: 1 }
                              : {
                                  opacity: 1,
                                  scale: isMerged ? [1, 1.12, 1] : 1,
                                }
                          }
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : isMerged
                                ? { type: "tween", duration: 0.18, ease: "easeOut", times: [0, 0.5, 1] }
                                : { type: "spring", stiffness: 420, damping: 28 }
                          }
                          className={[
                            "aspect-square rounded-xl border bg-gradient-to-br shadow-sm shadow-slate-900/10 dark:shadow-none",
                            meta.cls,
                          ].join(" ")}
                        >
                          <div className="flex h-full w-full flex-col items-center justify-center">
                            <div className="text-xs sm:text-sm font-mono font-semibold text-slate-900/90 dark:text-white/90">
                              {meta.label}
                            </div>
                            <div className="text-[10px] sm:text-[11px] font-mono text-slate-700/80 dark:text-slate-300/80">
                              {tile.value}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {game.over ? (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-6 text-center shadow-[0_20px_80px_rgba(15,23,42,0.20)] backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/60 dark:shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
                      <div className="text-lg font-bold text-slate-900 dark:text-slate-100">Game Over</div>
                      <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Score: <span className="font-mono text-slate-900 dark:text-slate-200">{game.score}</span>
                      </div>
                      <button
                        onClick={resetGame}
                        className="mt-4 w-full rounded-xl border border-slate-200/70 bg-white/70 py-3 text-sm font-semibold text-slate-900 hover:border-cyan-500/40 dark:border-slate-700/70 dark:bg-slate-900/25 dark:text-slate-200"
                      >
                        Rejouer
                      </button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Mobile-first controls: big targets + short hint */}
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 sm:p-4 shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-900/25 dark:shadow-none">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Contrôles</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 lg:hidden">Swipe ou boutons</div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div />
                <button
                  onClick={() => applyMove("up")}
                  className="rounded-xl border border-slate-200/70 bg-white/70 py-3 text-lg leading-none text-slate-800 hover:border-cyan-500/40 active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-950/30 dark:text-slate-200 lg:py-3 lg:text-sm"
                >
                  ↑
                </button>
                <div />
                <button
                  onClick={() => applyMove("left")}
                  className="rounded-xl border border-slate-200/70 bg-white/70 py-3 text-lg leading-none text-slate-800 hover:border-cyan-500/40 active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-950/30 dark:text-slate-200 lg:py-3 lg:text-sm"
                >
                  ←
                </button>
                <button
                  onClick={() => applyMove("down")}
                  className="rounded-xl border border-slate-200/70 bg-white/70 py-3 text-lg leading-none text-slate-800 hover:border-cyan-500/40 active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-950/30 dark:text-slate-200 lg:py-3 lg:text-sm"
                >
                  ↓
                </button>
                <button
                  onClick={() => applyMove("right")}
                  className="rounded-xl border border-slate-200/70 bg-white/70 py-3 text-lg leading-none text-slate-800 hover:border-cyan-500/40 active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-950/30 dark:text-slate-200 lg:py-3 lg:text-sm"
                >
                  →
                </button>
              </div>
              <div className="mt-4 text-xs text-slate-600 dark:text-slate-400 hidden lg:block">
                Astuce: fusionne 2 tuiles identiques pour monter (var → let → const → … → AI).
              </div>
            </div>

            {/* Mobile: collapsible legend to keep the screen focused on the board */}
            <details className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 sm:p-4 shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-900/25 dark:shadow-none lg:hidden">
              <summary className="cursor-pointer select-none text-sm font-semibold text-slate-900 dark:text-slate-100">
                Légende
              </summary>
              <div className="mt-3 flex flex-wrap gap-2">
                {[2, 4, 8, 16, 32, 64, 128, 256].map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-950/25 dark:text-slate-200 dark:shadow-none"
                  >
                    <span className="font-mono">{tileMeta[v]?.label ?? v}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">{v}</span>
                  </span>
                ))}
              </div>
            </details>

            {/* Desktop: always-visible legend */}
            <div className="hidden lg:block rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-900/25 dark:shadow-none">
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Légende</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[2, 4, 8, 16, 32, 64, 128, 256].map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-700/70 dark:bg-slate-950/25 dark:text-slate-200 dark:shadow-none"
                  >
                    <span className="font-mono">{tileMeta[v]?.label ?? v}</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">{v}</span>
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
