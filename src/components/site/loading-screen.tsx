"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * LoadingScreen — Écran de chargement premium "I · rtl lift".
 *
 * Source : phikra.com/animation-lab — animation I "rtl lift" (qalam-rtl).
 * Trois pétales cramoisis (forme du logo PHIKRA) révélés par un balayage
 * diagonal 135° (effet plume de roseau / encre qui coule), DE DROITE À GAUCHE
 * (sens calligraphie arabe), stagger 180ms inversé, boucle 2.2s, puis fondu.
 *
 * Séquence (≈6s) :
 *  1. Fond noir complet + grain
 *  2. Lueur cramoisi centrale
 *  3. Trois pétales "qalam-slow" s'encrent en diagonale (stagger)
 *  4. "WE THINK." se révèle (remontée masquée)
 *  5. "YOU LEAD." se révèle en cramoisi
 *  6. Tagline "Creative Intelligence Studio"
 *  7. Fondu vers le site
 *
 * Ne se joue qu'une fois par session (sessionStorage).
 * Respecte prefers-reduced-motion (skip direct).
 */
const STORAGE_KEY = "phikra-intro-seen";
const DURATION = 6200;

type Phase = "intro" | "exiting" | "done";

// Path du pétale PHIKRA (extrait du logo officiel)
const PETAL_PATH =
  "M77.02 35.61C53.29 22.15 36.29 10.31 26.02 0C8.71 38.98 0 60.78 0 65.35C0 71.36 12.38 81.45 37.18 95.63C59.83 109.09 72.79 115.81 75.98 115.81C82.35 115.81 88.36 108.36 94.01 93.52C98.27 81.1 100.38 70.69 100.38 62.17C100.38 53.65 92.62 44.45 77.01 35.62L77.02 35.61Z";

export function LoadingScreen() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === "undefined") return "intro";
    // Skip si reduced motion ou déjà vu dans la session — SAUF si ?intro dans l'URL
    const forceIntro = window.location.hash.includes("intro") || window.location.search.includes("intro");
    if (forceIntro) {
      sessionStorage.removeItem(STORAGE_KEY);
      return "intro";
    }
    if (reduce || sessionStorage.getItem(STORAGE_KEY)) return "done";
    return "intro";
  });

  useEffect(() => {
    if (phase !== "intro") return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("exiting");
    }, DURATION);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = setTimeout(() => setPhase("done"), 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase === "done" || phase === "exiting") {
      document.body.style.overflow = "";
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exiting" ? 0 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          role="status"
          aria-live="polite"
        >
          {/* Grain subtil */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* ===== 1. Trois pétales "I · rtl lift" (qalam-rtl) — encre de droite à gauche ===== */}
            {!reduce && (
              <style>{`
                @property --qalam-wipe {
                  syntax: "<percentage>";
                  inherits: false;
                  initial-value: 0%;
                }
                @keyframes phikra-qalam-ink {
                  0% { --qalam-wipe: 0%; opacity: 1; }
                  44%, 70% { --qalam-wipe: 100%; opacity: 1; }
                  88%, 100% { --qalam-wipe: 100%; opacity: 0; }
                }
                .phikra-petal {
                  --qalam-wipe: 0%;
                  -webkit-mask-image: linear-gradient(135deg, #000 0%, #000 var(--qalam-wipe), transparent var(--qalam-wipe));
                  mask-image: linear-gradient(135deg, #000 0%, #000 var(--qalam-wipe), transparent var(--qalam-wipe));
                  animation: phikra-qalam-ink 2.2s cubic-bezier(0.23, 1, 0.32, 1) infinite both;
                  transform-origin: 50% 88%;
                  filter: none;
                }
                /* RTL lift : la révélation va de droite à gauche (sens calligraphie arabe) */
                .phikra-petal:nth-child(1) { animation-delay: 360ms; }
                .phikra-petal:nth-child(2) { animation-delay: 180ms; }
                .phikra-petal:nth-child(3) { animation-delay: 0ms; }
              `}</style>
            )}
            <motion.div
              className="flex items-end justify-center gap-[0.35rem]"
              style={{ color: "var(--crimson, #e50d4a)", lineHeight: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[0, 1, 2].map((i) => (
                <svg
                  key={i}
                  className={reduce ? "" : "phikra-petal"}
                  viewBox="0 0 101 116"
                  style={{ width: "3.5rem", height: "auto", aspectRatio: "101 / 116", flex: "0 0 auto", display: "block" }}
                  focusable="false"
                  aria-hidden
                >
                  <path fill="currentColor" d={PETAL_PATH} />
                </svg>
              ))}
            </motion.div>

            {/* ===== 2. Filet cramoisi qui se dessine ===== */}
            <motion.div
              className="mt-10 h-px bg-crimson"
              style={{ originX: 0 }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 56, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            />

            {/* ===== 3. "WE THINK." — révélation posée ===== */}
            <div className="mt-8 overflow-hidden">
              <motion.h1
                className="font-display text-2xl font-extrabold uppercase tracking-tight text-bone md:text-4xl"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
              >
                WE THINK.
              </motion.h1>
            </div>

            {/* ===== 4. "YOU LEAD." en cramoisi ===== */}
            <div className="mt-2 overflow-hidden">
              <motion.h1
                className="font-display text-2xl font-extrabold uppercase tracking-tight text-crimson md:text-4xl"
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 2.8 }}
              >
                YOU LEAD.
              </motion.h1>
            </div>

            {/* ===== 5. Tagline éditoriale ===== */}
            <motion.p
              className="mt-8 label-mono text-bone-dim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 4 }}
            >
              Creative Intelligence Studio
            </motion.p>
          </div>

          {/* Marque de bas de page */}
          <motion.div
            className="absolute bottom-8 left-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.2 }}
          >
            PHIKRA — MMXXIV
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone-dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4.2 }}
          >
            rtl lift
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
