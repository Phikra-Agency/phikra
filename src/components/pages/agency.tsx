"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { ScrollIndicator } from "@/components/site/scroll-indicator";
import { Magnetic } from "@/components/site/magnetic";
import { pillars, processSteps, type Lang } from "@/lib/content";

export function AgencyPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useApp((s) => s.lang) as Lang;

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: coverRef,
    offset: ["start start", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <>
      {/* ───────── COVER ───────── */}
      <section
        ref={coverRef}
        className="relative flex min-h-[90svh] items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: coverY }}>
          <img
            src="/images/hero-stage.png"
            alt=""
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          <div className="vignette" />
        </motion.div>

        <div className="container-px relative z-10 w-full pb-16 pt-24">
          <SectionLabel number="01/" label={t("agency.label")} />
          <Reveal className="mt-8" immediate>
            <h1 className="display text-[13vw] leading-[0.9] md:text-[9vw]">
              {t("agency.coverTitle")}
            </h1>
          </Reveal>
          <Reveal className="mt-6" delay={0.4}>
            <p className="max-w-md text-bone-muted">{t("agency.coverSub")}</p>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
          <ScrollIndicator label="Explorer" />
        </div>
      </section>

      {/* ───────── MANIFESTO ───────── */}
      <section className="section">
        <div className="container-px grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel label={t("agency.manifestoLabel")} />
          </div>
          <Reveal className="md:col-span-8" y={24}>
            <p className="display max-w-[26ch] text-2xl leading-snug md:text-4xl md:leading-tight">
              {t("agency.manifesto")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── VISION ───────── */}
      <section className="section border-t border-line">
        <div className="container-px grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel number="01/" label="Vision" />
          </div>
          <Reveal className="md:col-span-8" y={24} depth>
            <h2 className="display max-w-[20ch] text-2xl md:text-4xl">
              {lang === "fr"
                ? "Une marque n'est pas un logo. C'est une présence."
                : "A brand is not a logo. It's a presence."}
            </h2>
            <p className="mt-6 max-w-xl text-bone-muted">
              {lang === "fr"
                ? "Nous croyons que chaque marque porte en elle une idée unique. Notre rôle est de la révéler, de la rendre lisible et de lui donner une présence forte sur tous les points de contact — du print au digital, de la stratégie à l'exécution."
                : "We believe every brand carries a unique idea within. Our role is to reveal it, make it legible, and give it a strong presence across every touchpoint — from print to digital, from strategy to execution."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── APPROACH ───────── */}
      <section className="section border-t border-line bg-bg-2">
        <div className="container-px grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel number="02/" label="Approche" />
          </div>
          <div className="md:col-span-8 space-y-8">
            <Reveal y={20}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="border-l border-crimson pl-5">
                  <h3 className="display text-xl">{lang === "fr" ? "Penser avant de produire" : "Think before producing"}</h3>
                  <p className="mt-2 text-sm text-bone-muted">
                    {lang === "fr"
                      ? "Aucune création sans stratégie. Chaque choix visuel découle d'une décision réfléchie."
                      : "No creation without strategy. Every visual choice stems from a thoughtful decision."}
                  </p>
                </div>
                <div className="border-l border-crimson pl-5">
                  <h3 className="display text-xl">{lang === "fr" ? "Le détail comme signature" : "Detail as signature"}</h3>
                  <p className="mt-2 text-sm text-bone-muted">
                    {lang === "fr"
                      ? "La différence se joue au bord. La tranche, la texture, le micro-geste."
                      : "The difference is at the edge. The finish, the texture, the micro-gesture."}
                  </p>
                </div>
                <div className="border-l border-crimson pl-5">
                  <h3 className="display text-xl">{lang === "fr" ? "La sobriété comme luxe" : "Sobriety as luxury"}</h3>
                  <p className="mt-2 text-sm text-bone-muted">
                    {lang === "fr"
                      ? "Pas d'effets gratuits. Chaque élément justifie sa place."
                      : "No free effects. Every element justifies its place."}
                  </p>
                </div>
                <div className="border-l border-crimson pl-5">
                  <h3 className="display text-xl">{lang === "fr" ? "La collaboration franche" : "Honest collaboration"}</h3>
                  <p className="mt-2 text-sm text-bone-muted">
                    {lang === "fr"
                      ? "Un client n'est pas un spectateur. La marque vous appartient."
                      : "A client is not a spectator. The brand belongs to you."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── PILLARS ───────── */}
      <section className="section border-t border-line bg-bg-2">
        <div className="container-px">
          <SectionLabel number="02/" label={t("agency.pillarsLabel")} />
          <Reveal className="mt-6">
            <h2 className="display text-3xl md:text-5xl lg:text-6xl">
              {t("agency.pillarsTitle")}
            </h2>
          </Reveal>
          {/* Grille uniforme : piliers en grille 2 colonnes (5 = 2+2+1, pas de vide) */}
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal
                key={i}
                className="bg-ink"
                delay={i * 0.06}
                y={16}
                depth
              >
                <div className="relative h-full overflow-hidden p-8 md:p-10">
                  {/* Numéro géant en arrière-plan */}
                  <span
                    className="pointer-events-none absolute -right-3 -top-8 select-none font-display font-extrabold leading-none text-bone opacity-[0.04]"
                    style={{ fontSize: "7rem" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-crimson">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 display text-2xl md:text-3xl">
                    {p.title[lang]}
                  </h3>
                  <p className="relative mt-3 max-w-md text-sm text-bone-muted">
                    {p.text[lang]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SIGNATURE BAND ───────── */}
      <section className="border-y border-line">
        <div className="container-px py-20 text-center md:py-28">
          <Reveal>
            <p className="display text-[12vw] leading-[0.9] md:text-[8vw]">
              WE THINK. <span className="text-crimson">YOU LEAD.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section className="section">
        <div className="container-px">
          <SectionLabel number="03/" label={t("agency.processLabel")} />
          <Reveal className="mt-6">
            <h2 className="display max-w-[16ch] text-3xl md:text-5xl lg:text-6xl">
              {t("agency.processTitle")}
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08} y={20}>
                <li className="border-l border-crimson pl-5">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-crimson">
                    {step.number}
                  </span>
                  <h3 className="display mt-3 text-xl md:text-2xl">{step.title[lang]}</h3>
                  <p className="mt-3 text-sm text-bone-muted">{step.text[lang]}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="section border-t border-line bg-bg-2">
        <div className="container-px">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="label-mono mb-4">— PHIKRA</p>
                <h2 className="display max-w-[14ch] text-3xl md:text-5xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 max-w-md text-bone-muted">{t("cta.subtitle")}</p>
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
    </>
  );
}
