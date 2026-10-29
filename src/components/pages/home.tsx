"use client";

import { ArrowUpRight, ArrowDown, Check } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Reveal, RevealWords } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { Magnetic } from "@/components/site/magnetic";
import { Marquee } from "@/components/site/marquee";
import { TheaterScene } from "@/components/site/theater-scene";
import { HeroEffects } from "@/components/site/hero-effects";
import { CrimsonCrystal } from "@/components/site/crimson-crystal";
import { DissolvePoints } from "@/components/site/dissolve-points";
import { LogoPoints } from "@/components/site/logo-points";
import {
  services,
  projects,
  methodSteps,
  categories,
  type Lang,
} from "@/lib/content";

export function HomePage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useApp((s) => s.lang) as Lang;

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featured = projects.slice(0, 4);
  const cat = (id: string) => categories.find((c) => c.id === id)?.label[lang] ?? id;

  return (
    <>
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] items-end overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <TheaterScene />
        </motion.div>

        {/* Voile sombre pour la lisibilité du texte (côté gauche + bas) */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(105deg, rgba(5,3,4,0.92) 0%, rgba(5,3,4,0.7) 35%, rgba(5,3,4,0.3) 62%, transparent 100%), linear-gradient(180deg, transparent 50%, rgba(5,3,4,0.85) 100%)",
          }}
          aria-hidden
        />

        {/* Effets cinématiques vivants : particules de poussière + étincelle d'idée */}
        <HeroEffects />

        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
        />

        {/* Top-right meta — heure live (studio vivant) */}
        <div className="container-px absolute right-0 top-20 hidden items-center gap-3 md:flex md:top-28">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
          <LiveClock />
        </div>

        <div className="container-px relative z-10 w-full pb-16 pt-28 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-8 bg-crimson" />
            <span className="label-mono">{t("hero.eyebrow")}</span>
          </motion.div>

          <h1 className="display max-w-[15ch] text-[13vw] leading-[0.92] md:text-[8.5vw]">
            <RevealWords text={t("hero.title1")} immediate delay={0.4} />
            <br />
            <span className="text-bone">
              <RevealWords text={t("hero.titleAccent")} immediate delay={0.9} />
            </span>
          </h1>

          <div className="mt-10 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="max-w-md text-bone-muted leading-relaxed"
            >
              {t("hero.paragraph")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.9 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => navigate("contact")}
                  className="btn-crimson"
                >
                  {t("hero.cta1")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  type="button"
                  onClick={() => navigate("portfolio")}
                  className="btn-ghost"
                >
                  {t("hero.cta2")}
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="container-px absolute bottom-6 left-0 hidden items-center gap-2 md:flex"
        >
          <ArrowDown className="h-3.5 w-3.5 text-crimson animate-bounce" />
          <span className="label-mono">{t("hero.scroll")}</span>
        </motion.div>
      </section>

      {/* ───────────────────────── MARQUEE BAND ───────────────────────── */}
      <div className="border-y border-line bg-bg-2 py-6">
        <Marquee
          items={[
            "STRATÉGIE",
            "BRANDING",
            "AUDIOVISUEL",
            "DIGITAL",
            "SOCIAL",
            "WE THINK. YOU LEAD.",
          ]}
        />
      </div>

      {/* ───────────────────────── APPROACH STRIP ───────────────────────── */}
      <section className="border-b border-line py-8">
        <div className="container-px grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { num: "05", label: "Expertises" },
            { num: "FR·EN·AR", label: "Trilingue" },
            { num: "100%", label: "Sur mesure" },
            { num: "48h", label: "Réponse devis" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.08} className="text-center md:text-left">
              <p className="display text-2xl text-bone md:text-4xl">{item.num}</p>
              <p className="label-mono mt-1 text-bone-dim">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────────── INTRO ───────────────────────── */}
      <section className="section py-8 lg:py-12">
        <div className="container-px">
          <SectionLabel number="01/" label={t("intro.label")} />
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-8" y={20} depth>
              <h2 className="display max-w-[18ch] text-3xl md:text-5xl lg:text-6xl">
                {t("intro.title")}
              </h2>
            </Reveal>
            <Reveal className="md:col-span-4 md:pt-2" delay={0.1}>
              <p className="text-bone-muted">{t("intro.body")}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────── EXPERTISE ───────────────────────── */}
      <section className="border-t border-line bg-bg-2 py-8 lg:py-12">
        <div className="container-px">
          <SectionLabel number="02/" label={t("expertise.label")} />
          <Reveal className="mt-8">
            <h2 className="display max-w-[14ch] text-3xl md:text-5xl lg:text-6xl">
              {t("expertise.title")}
            </h2>
            <p className="mt-4 max-w-md text-bone-muted">
              {t("expertise.subtitle")}
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-line">
            {services.map((s, i) => (
              <Reveal key={s.id} as="li" y={12} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => navigate("services")}
                  className="group relative grid w-full min-h-[44px] grid-cols-12 items-center gap-4 overflow-hidden border-b border-line py-6 text-left transition-colors hover:bg-elevated/40"
                >
                  {/* Numéro géant en arrière-plan */}
                  <span
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none font-display text-[5rem] font-extrabold leading-none text-crimson opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06] md:text-[7rem]"
                    aria-hidden
                  >
                    {s.number}
                  </span>
                  <span className="relative col-span-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-crimson md:col-span-1">
                    {s.number}
                  </span>
                  <span className="relative col-span-7 display text-2xl transition-colors group-hover:text-crimson md:col-span-4 md:text-4xl">
                    {s.title[lang]}
                  </span>
                  <span className="relative col-span-12 hidden text-bone-muted md:col-span-6 md:block">
                    {s.tagline[lang]}
                  </span>
                  <span className="relative col-span-3 flex items-center justify-end gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted group-hover:text-crimson md:col-span-1">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────────── WORK ───────────────────────── */}
      <section className="section py-8 lg:py-12">
        <div className="container-px">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel number="03/" label={t("work.label")} />
              <Reveal className="mt-6" depth>
                <h2 className="display text-3xl md:text-5xl lg:text-6xl">
                  {t("work.title")}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-sm text-bone-muted">{t("work.subtitle")}</p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} y={28}>
                <button
                  type="button"
                  onClick={() => navigate("project", p.slug)}
                  className="group block w-full text-left"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-elevated">
                    <img
                      src={p.cover}
                      alt={p.title[lang]}
                      className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                      <div>
                        <p className="label-mono text-bone-dim">
                          {cat(p.category)} — {p.year}
                        </p>
                        <p className="display mt-2 text-xl md:text-2xl">
                          {p.title[lang]}
                        </p>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center border border-line bg-ink/60 text-bone backdrop-blur transition-colors group-hover:border-crimson group-hover:text-crimson">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex justify-center" delay={0.1}>
            <button
              type="button"
              onClick={() => navigate("portfolio")}
              className="btn-ghost"
            >
              {t("work.all")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── METHOD ───────────────────────── */}
      <section className="border-t border-line bg-bg-2 py-8 lg:py-12">
        <div className="container-px">
          <SectionLabel number="04/" label={t("method.label")} />
          <Reveal className="mt-8" depth>
            <h2 className="display max-w-[18ch] text-3xl md:text-5xl lg:text-6xl">
              {t("method.title")}
            </h2>
            <p className="mt-4 max-w-md text-bone-muted">
              {t("method.subtitle")}
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {methodSteps.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.08} y={20} depth>
                <li className="group relative h-full overflow-hidden border border-line bg-ink p-6">
                  {/* Numéro géant en arrière-plan */}
                  <span
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] font-extrabold leading-none text-bone opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08]"
                    aria-hidden
                  >
                    {step.number}
                  </span>
                  <span className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-crimson">
                    {step.number}
                  </span>
                  <h3 className="display relative mt-4 text-2xl">{step.title[lang]}</h3>
                  <p className="relative mt-3 text-sm text-bone-muted">{step.text[lang]}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────────────────── LOGO BUILD (points construisent le logo au scroll) ───────────────────────── */}
      <LogoBuildSection />

      {/* ───────────────────────── TESTIMONIALS ───────────────────────── */}
      <section className="border-t border-line py-8 lg:py-12">
        <div className="container-px">
          <Reveal>
            <SectionLabel number="06/" label={lang === "fr" ? "Voix" : "Voices"} />
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { quote: lang === "fr" ? "PHIKRA a transformé notre vision en une identité qui parle." : "PHIKRA turned our vision into an identity that speaks.", author: "Directeur Marketing", company: "Sector Privé" },
              { quote: lang === "fr" ? "Une rigueur stratégique rare. Chaque détail compte." : "A rare strategic rigor. Every detail matters.", author: "Fondatrice", company: "Startup Tech" },
              { quote: lang === "fr" ? "Le résultat dépasse nos attentes. Professionalisme total." : "The result exceeds our expectations. Total professionalism.", author: "CEO", company: "Groupe Industrie" },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1} y={20}>
                <div className="border border-line p-6">
                  <span className="text-3xl text-crimson leading-none">"</span>
                  <p className="mt-3 text-sm leading-relaxed text-bone">{t.quote}</p>
                  <div className="mt-5 pt-4 border-t border-line">
                    <p className="font-mono text-xs uppercase tracking-wider text-bone">{t.author}</p>
                    <p className="font-mono text-[0.65rem] uppercase tracking-wider text-bone-dim">{t.company}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── FAQ ───────────────────────── */}
      <section className="border-t border-line bg-bg-2 py-8 lg:py-12">
        <div className="container-px grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel number="07/" label="FAQ" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display mt-6 text-2xl md:text-4xl">
                {lang === "fr" ? "Questions fréquentes." : "Frequent questions."}
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8 space-y-4">
            {[
              { q: lang === "fr" ? "Combien coûte un projet ?" : "How much does a project cost?", a: lang === "fr" ? "Chaque projet est unique. Après un premier échange gratuit, nous proposons un devis détaillé adapté à vos objectifs et votre budget." : "Every project is unique. After a free initial consultation, we provide a detailed quote tailored to your goals and budget." },
              { q: lang === "fr" ? "Quels sont vos délais ?" : "What are your timelines?", a: lang === "fr" ? "Un branding complet prend 4-8 semaines. Un site web 6-12 semaines. Nous nous adaptons aux urgences." : "A full branding takes 4-8 weeks. A website 6-12 weeks. We adapt to urgencies." },
              { q: lang === "fr" ? "Travaillez-vous à distance ?" : "Do you work remotely?", a: lang === "fr" ? "Oui. Nous collaborons à distance et en présentiel, en FR/EN/AR." : "Yes. We collaborate remotely and in-person, in FR/EN/AR." },
              { q: lang === "fr" ? "Que comprennent vos prestations ?" : "What do your services include?", a: lang === "fr" ? "Stratégie, création, production et déploiement. Tout est inclus, de A à Z." : "Strategy, creation, production and deployment. Everything is included, from A to Z." },
            ].map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details className="group border border-line">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-mono text-sm uppercase tracking-wider text-bone transition-colors hover:text-crimson">
                    {faq.q}
                    <span className="text-crimson transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-bone-muted">
                    {faq.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="section py-8 lg:py-12">
        <div className="container-px">
          <Reveal depth>
            <div className="sculptural relative overflow-hidden border border-line bg-bg-2 px-6 py-12 text-center md:px-12 md:py-16">
              {/* Nuage de points 3D avec dissolution (effet escolhadigital) */}
              <DissolvePoints variant="signature" />
              <div className="relative z-10">
                <p className="label-mono mb-6">— PHIKRA</p>
                <h2 className="display mx-auto max-w-[14ch] text-3xl md:text-6xl">
                  {t("cta.title")}
                </h2>
                <p className="mx-auto mt-6 max-w-md text-bone-muted">
                  {t("cta.subtitle")}
                </p>
                <div className="mt-10 flex justify-center">
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
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/** Horloge live en mono — suggère un studio "vivant" et précis. */
function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="label-mono tabular-nums">{time} — PHIKRA</span>;
}

/** Section dédiée : les petits points construisent le logo PHIKRA au défilement. */
function LogoBuildSection() {
  const lang = useApp((s) => s.lang) as Lang;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Le logo se forme plus tôt (0.05→0.45) pour rester visible avant de quitter la zone
  const progress = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);
  const [p, setP] = useState(0);

  useEffect(() => {
    const unsub = progress.on("change", (v) => setP(v));
    return () => unsub();
  }, [progress]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-t border-line bg-bg-2">
      {/* Points 3D qui construisent le logo */}
      <LogoPoints scrollProgress={p} />

      {/* Voile sombre derrière le texte pour garantir la lisibilité */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-[45%]"
        style={{ background: "linear-gradient(180deg, rgba(5,3,4,0.85) 0%, rgba(5,3,4,0.4) 70%, transparent 100%)" }}
        aria-hidden
      />

      {/* Texte explicatif superposé en haut — libère le centre pour le logo */}
      <div className="container-px absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-20 text-center md:pt-28">
        <Reveal>
          <SectionLabel number="05/" label="Signature" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            className="display mt-5 max-w-[12ch] text-2xl md:text-4xl lg:text-5xl"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}
          >
            Une idée prend forme.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="mt-3 max-w-md text-sm text-bone md:text-base"
            style={{ textShadow: "0 1px 15px rgba(0,0,0,0.9)" }}
          >
            Chaque détail compte. Chaque point, une intention.
          </p>
        </Reveal>
      </div>

      {/* Indicateur de progression en bas */}
      <div
        className="container-px absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-3 pb-16 md:pb-20"
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.8)" }}
      >
        <span className="label-mono text-bone">{lang === "fr" ? "L'IDÉE SE RASSEMBLE" : "THE IDEA GATHERS"}</span>
        <div className="h-px w-20 overflow-hidden bg-line md:w-32">
          <motion.div
            className="h-full bg-crimson"
            style={{ scaleX: progress, transformOrigin: "left" }}
          />
        </div>
        <span className="label-mono tabular-nums text-bone">{Math.round(p * 100)}%</span>
      </div>
    </section>
  );
}
