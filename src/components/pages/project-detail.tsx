"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowLeft, Check } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { Magnetic } from "@/components/site/magnetic";
import {
  getProject,
  getService,
  projects,
  categories,
  type Lang,
} from "@/lib/content";

export function ProjectDetailPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useApp((s) => s.lang) as Lang;
  const param = useApp((s) => s.param);

  const project = useMemo(() => (param ? getProject(param) : undefined), [param]);

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [param]);

  if (!project) {
    return (
      <section className="section pt-32">
        <div className="container-px">
          <SectionLabel label="404" />
          <h1 className="display mt-6 text-3xl md:text-5xl">Projet introuvable.</h1>
          <button
            type="button"
            onClick={() => navigate("portfolio")}
            className="btn-ghost mt-8"
          >
            {t("project.back")}
          </button>
        </div>
      </section>
    );
  }

  const cat = categories.find((c) => c.id === project.category)?.label[lang] ?? project.category;
  const usedServices = project.services
    .map((id) => getService(id))
    .filter(Boolean) as ReturnType<typeof getService>[];

  const similar = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);
  const fallbackSimilar = projects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const similarList = similar.length > 0 ? similar : fallbackSimilar;

  const asideLinks = [
    { id: "context", label: t("project.context") },
    { id: "objectives", label: t("project.objectives") },
    { id: "concept", label: t("project.concept") },
    { id: "gallery", label: t("project.gallery") },
    { id: "deliverables", label: t("project.deliverables") },
  ];

  return (
    <>
      {/* COVER */}
      <section
        ref={coverRef}
        className="relative flex min-h-[80svh] items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: coverY }}>
          <img
            src={project.cover}
            alt={project.title[lang]}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          <div className="vignette" />
        </motion.div>

        <div className="container-px relative z-10 w-full pb-16 pt-32">
          <Reveal immediate>
            <button
              type="button"
              onClick={() => navigate("portfolio")}
              className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted hover:text-crimson"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("project.back")}
            </button>
          </Reveal>

          {project.isDemo && (
            <Reveal immediate delay={0.05} className="mt-6">
              <span className="border border-crimson/60 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-crimson">
                {t("project.demo")}
              </span>
            </Reveal>
          )}

          <Reveal immediate delay={0.1} className="mt-6">
            <p className="label-mono">
              {cat} — {project.year}
            </p>
            <h1 className="display mt-3 text-4xl leading-[0.95] md:text-7xl">
              {project.title[lang]}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.2} className="mt-6">
            <p className="max-w-xl text-bone-muted">{project.excerpt[lang]}</p>
          </Reveal>
        </div>
      </section>

      {/* META BAR */}
      <div className="border-y border-line bg-bg-2">
        <div className="container-px grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
          <div>
            <p className="label-mono mb-2">{t("project.client")}</p>
            <p className="text-sm text-bone">{project.client}</p>
          </div>
          <div>
            <p className="label-mono mb-2">{t("project.year")}</p>
            <p className="text-sm text-bone">{project.year}</p>
          </div>
          <div>
            <p className="label-mono mb-2">{t("project.category")}</p>
            <p className="text-sm text-bone">{cat}</p>
          </div>
          <div>
            <p className="label-mono mb-2">{t("project.services")}</p>
            <p className="text-sm text-bone">
              {usedServices.map((s) => s!.title[lang]).join(" · ")}
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <section className="section">
        <div className="container-px grid gap-12 lg:grid-cols-12">
          {/* Sticky aside */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="label-mono mb-4">{t("project.aside")}</p>
              <ul className="space-y-2">
                {asideLinks.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="link-underline text-sm text-bone-muted hover:text-bone"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <Reveal id="context" y={20}>
              <SectionLabel number="01/" label={t("project.context")} />
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-bone">
                {project.context[lang]}
              </p>
            </Reveal>

            <Reveal id="objectives" y={20} className="mt-16">
              <SectionLabel number="02/" label={t("project.objectives")} />
              <p className="mt-6 max-w-prose text-bone-muted">
                {project.objectives[lang]}
              </p>
            </Reveal>

            <Reveal id="concept" y={20} className="mt-16">
              <SectionLabel number="03/" label={t("project.concept")} />
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-bone">
                {project.concept[lang]}
              </p>
            </Reveal>

            <Reveal id="gallery" y={20} className="mt-16">
              <SectionLabel number="04/" label={t("project.gallery")} />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.gallery.map((g, i) => (
                  <div
                    key={i}
                    className={`relative aspect-[4/5] overflow-hidden border border-line bg-elevated ${
                      i === 0 ? "sm:col-span-2 sm:aspect-[16/9]" : ""
                    }`}
                  >
                    <img
                      src={g}
                      alt={`${project.title[lang]} — ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal id="deliverables" y={20} className="mt-16">
              <SectionLabel number="05/" label={t("project.deliverables")} />
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {project.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 border-b border-line py-2 text-sm"
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson" />
                    <span className="text-bone">{d[lang]}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-line bg-bg-2">
        <div className="container-px">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="label-mono mb-4">— PHIKRA</p>
                <h2 className="display max-w-[14ch] text-3xl md:text-5xl">
                  {t("cta.title")}
                </h2>
              </div>
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => navigate("contact")}
                  className="btn-crimson"
                >
                  {t("cta.button")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SIMILAR */}
      {similarList.length > 0 && (
        <section className="section">
          <div className="container-px">
            <SectionLabel number="—" label={t("project.similar")} />
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {similarList.map((p) => (
                <Reveal key={p.slug} y={20}>
                  <button
                    type="button"
                    onClick={() => navigate("project", p.slug)}
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-elevated">
                      <img
                        src={p.cover}
                        alt={p.title[lang]}
                        className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                        <div>
                          <p className="label-mono text-bone-dim">
                            {categories.find((c) => c.id === p.category)?.label[lang]} — {p.year}
                          </p>
                          <p className="display mt-2 text-xl md:text-2xl">{p.title[lang]}</p>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center border border-line bg-ink/60 text-bone transition-colors group-hover:border-crimson group-hover:text-crimson">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
