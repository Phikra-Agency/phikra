"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { Tilt3D } from "@/components/site/tilt-3d";
import {
  categories,
  projects,
  type Lang,
} from "@/lib/content";

export function PortfolioPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useApp((s) => s.lang) as Lang;
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <>
      {/* Header */}
      <section className="section pt-24">
        <div className="container-px">
          <SectionLabel number="—" label={t("portfolio.label")} />
          <Reveal className="mt-6">
            <h1 className="display text-4xl md:text-6xl lg:text-7xl">
              {t("portfolio.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="max-w-md text-bone-muted">{t("portfolio.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 border-y border-line bg-ink/85 backdrop-blur-md md:top-20">
        <div className="container-px flex items-center gap-4 overflow-x-auto py-4">
          <LayoutGroup>
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`relative whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-bone" : "text-bone-muted hover:text-bone"
                  }`}
                >
                  {c.label[lang]}
                  {isActive && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-bone"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </button>
              );
            })}
          </LayoutGroup>
        </div>
      </div>

      {/* Grid */}
      <section className="section">
        <div className="container-px">
          {/* Demo note — discret, sous le titre */}
          <p className="mb-10 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-bone-dim">
            {t("portfolio.demoNote")} — {filtered.length} {lang === "fr" ? "projet(s)" : "project(s)"}
          </p>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-bone-muted">{t("portfolio.empty")}</p>
          ) : (
            <motion.div layout className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => {
                  const cat = categories.find((c) => c.id === p.category)?.label[lang] ?? p.category;
                  const featured = i === 0 || i === 3;
                  return (
                    <motion.button
                      key={p.slug}
                      layout
                      type="button"
                      onClick={() => navigate("project", p.slug)}
                      className={`group block w-full text-left [perspective:1200px] ${featured ? "lg:col-span-2" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Tilt3D maxRotate={6} scale={1.03} className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-elevated">
                        <div className="absolute inset-0 animate-pulse bg-elevated" />
                        <img
                          src={p.cover}
                          alt={p.title[lang]}
                          loading="lazy"
                          onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.8"; }}
                          className="h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent opacity-95 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                          <span className="label-mono text-bone">
                            {cat} — {p.year}
                          </span>
                          {p.isDemo && (
                            <span className="border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone-dim">
                              démo
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h2 className="display text-xl md:text-2xl text-bone">{p.title[lang]}</h2>
                          {/* Contexte visible par défaut : rôle/prestation */}
                          <p className="mt-1 text-xs text-bone-muted">
                            {cat} — {p.year}
                          </p>
                          <p className="mt-2 line-clamp-2 max-h-0 overflow-hidden text-sm text-bone-muted opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                            {p.excerpt[lang]}
                          </p>
                          <div className="mt-3 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted group-hover:text-bone">
                            {t("work.view")}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </Tilt3D>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
