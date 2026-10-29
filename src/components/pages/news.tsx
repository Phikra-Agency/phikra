"use client";

import { useEffect } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { useLang } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { articles, type Lang } from "@/lib/content";

function formatDate(iso: string, lang: Lang): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}

export function NewsPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useLang() as Lang;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [featured, ...rest] = articles;

  return (
    <>
      {/* Header */}
      <section className="section pt-32">
        <div className="container-px">
          <SectionLabel number="—" label={t("news.label")} />
          <Reveal className="mt-6">
            <h1 className="display text-4xl md:text-6xl lg:text-7xl">
              {t("news.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="max-w-md text-bone-muted">{t("news.subtitle")}</p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="section pt-0">
          <div className="container-px">
            <Reveal y={24}>
              <button
                type="button"
                onClick={() => navigate("article", featured.slug)}
                className="group grid w-full text-left md:grid-cols-12"
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-line bg-elevated md:col-span-7 md:aspect-[16/10]">
                  <img
                    src={featured.cover}
                    alt={featured.title[lang]}
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                </div>
                <div className="flex flex-col justify-center border border-t-0 border-line bg-bg-2 p-6 md:col-span-5 md:border-l md:border-t md:p-10">
                  <p className="label-mono">
                    {t("news.featured")} — {featured.category[lang]}
                  </p>
                  <h2 className="display mt-4 text-2xl md:text-4xl">
                    {featured.title[lang]}
                  </h2>
                  <p className="mt-4 text-bone-muted">{featured.excerpt[lang]}</p>
                  <div className="mt-6 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-crimson">
                    {formatDate(featured.date, lang)} — {featured.readTime} {t("article.readTime")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </button>
            </Reveal>
          </div>
        </section>
      )}

      {/* List */}
      <section className="section border-t border-line pt-0">
        <div className="container-px">
          <p className="label-mono mt-16 mb-6">{t("news.latest")}</p>
          <ul className="border-t border-line">
            {rest.map((a, i) => (
              <Reveal key={a.slug} as="li" y={12} delay={i * 0.04}>
                <button
                  type="button"
                  onClick={() => navigate("article", a.slug)}
                  className="group grid w-full grid-cols-12 items-center gap-4 border-b border-line py-6 text-left"
                >
                  <span className="col-span-12 md:col-span-3">
                    <span className="label-mono">{a.category[lang]}</span>
                    <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-dim">
                      {formatDate(a.date, lang)} — {a.readTime} {t("article.readTime")}
                    </p>
                  </span>
                  <span className="col-span-9 display text-xl transition-colors group-hover:text-crimson md:col-span-7 md:text-3xl">
                    {a.title[lang]}
                  </span>
                  <span className="col-span-3 flex items-center justify-end gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted group-hover:text-crimson md:col-span-2">
                    {t("news.read")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Back hint */}
      <section className="section pt-0">
        <div className="container-px">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted hover:text-crimson"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("common.back")}
          </button>
        </div>
      </section>
    </>
  );
}
