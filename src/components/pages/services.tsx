"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { Magnetic } from "@/components/site/magnetic";
import { services, type Lang } from "@/lib/content";

export function ServicesPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useApp((s) => s.lang) as Lang;

  return (
    <>
      {/* Header */}
      <section className="section pt-24">
        <div className="container-px">
          <SectionLabel number="—" label={t("services.label")} />
          <Reveal className="mt-6">
            <h1 className="display max-w-[14ch] text-4xl md:text-6xl lg:text-7xl">
              {t("services.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="max-w-md text-bone-muted">{t("services.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      {/* Services — alternating bands */}
      {services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            className={`border-t border-line py-6 lg:py-8 ${
              flip ? "bg-bg-2" : "bg-ink"
            }`}
          >
            <div className="container-px">
              <div
                className={`grid gap-6 lg:grid-cols-12 lg:gap-10 ${
                  flip ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Visual */}
                <Reveal className="lg:col-span-5" y={24}>
                  <div className="relative aspect-[16/9] w-full overflow-hidden border border-line bg-elevated">
                    <img
                      src={s.image}
                      alt={s.title[lang]}
                      className="h-full w-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone">
                        {s.number}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="display text-2xl md:text-3xl">{s.title[lang]}</p>
                    </div>
                  </div>
                </Reveal>

                {/* Text */}
                <div className="lg:col-span-7">
                  <Reveal y={20}>
                    <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-bone-muted">
                      {s.number} / {t("services.label")}
                    </span>
                    <h2 className="display mt-4 text-3xl md:text-5xl">
                      {s.title[lang]}
                    </h2>
                    <p className="mt-3 text-lg text-bone-muted">{s.tagline[lang]}</p>
                  </Reveal>

                  <Reveal delay={0.08} y={20}>
                    <p className="mt-6 max-w-prose text-bone-muted">
                      {s.description[lang]}
                    </p>
                  </Reveal>

                  <Reveal delay={0.16} y={20}>
                    <p className="label-mono mt-10">{t("services.items")}</p>
                    <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {s.items.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 border-b border-line py-2 text-sm"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bone" />
                          <span className="text-bone">{item[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <Reveal delay={0.24} y={20}>
                    <div className="mt-10">
                      <Magnetic strength={0.2}>
                        <button
                          type="button"
                          onClick={() => navigate("contact")}
                          className="btn-ghost"
                        >
                          {t("services.contact")}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </Magnetic>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}

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
