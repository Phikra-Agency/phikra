"use client";

import { useEffect, useMemo } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { useLang } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { getArticle, articles, type Lang } from "@/lib/content";

function formatDate(iso: string, lang: Lang): string {
  try {
    return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

/** Render the simple markdown-ish content (## headings + paragraphs). */
function renderContent(md: string) {
  const blocks = md.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="display mt-12 text-2xl first:mt-0 md:text-3xl"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }
    return (
      <p key={i} className="mt-6 max-w-prose text-bone-muted leading-relaxed">
        {trimmed}
      </p>
    );
  });
}

export function ArticleDetailPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useLang() as Lang;
  const param = useApp((s) => s.param);

  const article = useMemo(() => (param ? getArticle(param) : undefined), [param]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [param]);

  if (!article) {
    return (
      <section className="section pt-32">
        <div className="container-px">
          <SectionLabel label="404" />
          <h1 className="display mt-6 text-3xl md:text-5xl">Note introuvable.</h1>
          <button
            type="button"
            onClick={() => navigate("news")}
            className="btn-ghost mt-8"
          >
            {t("article.back")}
          </button>
        </div>
      </section>
    );
  }

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      {/* Header */}
      <section className="section pt-32">
        <div className="container-px">
          <Reveal immediate>
            <button
              type="button"
              onClick={() => navigate("news")}
              className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted hover:text-crimson"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("article.back")}
            </button>
          </Reveal>

          <Reveal immediate delay={0.05} className="mt-8">
            <p className="label-mono">
              {article.category[lang]} — {formatDate(article.date, lang)} — {article.readTime} {t("article.readTime")}
            </p>
          </Reveal>

          <Reveal immediate delay={0.1} className="mt-4">
            <h1 className="display max-w-[18ch] text-4xl leading-[1] md:text-6xl">
              {article.title[lang]}
            </h1>
          </Reveal>

          <Reveal immediate delay={0.2} className="mt-6">
            <p className="max-w-prose text-lg text-bone-muted">{article.excerpt[lang]}</p>
          </Reveal>
        </div>
      </section>

      {/* Cover */}
      <section className="container-px">
        <Reveal y={24} className="relative aspect-[16/9] overflow-hidden border border-line bg-elevated">
          <img
            src={article.cover}
            alt={article.title[lang]}
            className="h-full w-full object-cover opacity-80"
          />
        </Reveal>
      </section>

      {/* Body */}
      <section className="section">
        <div className="container-px grid gap-10 lg:grid-cols-12">
          {/* Share aside */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="label-mono mb-4">{t("article.share")}</p>
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    navigator.share({ title: article.title[lang], url: window.location.href }).catch(() => {});
                  } else if (typeof navigator !== "undefined") {
                    navigator.clipboard?.writeText(window.location.href);
                  }
                }}
                className="btn-ghost"
              >
                {t("article.share")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <Reveal y={20}>{renderContent(article.content[lang])}</Reveal>
          </div>
        </div>
      </section>

      {/* Read next */}
      {others.length > 0 && (
        <section className="section border-t border-line bg-bg-2">
          <div className="container-px">
            <SectionLabel number="—" label={t("article.next")} />
            <div className="mt-10 grid gap-x-6 gap-y-10 md:grid-cols-2">
              {others.map((a) => (
                <Reveal key={a.slug} y={20}>
                  <button
                    type="button"
                    onClick={() => navigate("article", a.slug)}
                    className="group block w-full text-left"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden border border-line bg-elevated">
                      <img
                        src={a.cover}
                        alt={a.title[lang]}
                        className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="label-mono text-bone-dim">
                          {a.category[lang]} — {formatDate(a.date, lang)}
                        </p>
                        <p className="display mt-2 text-xl md:text-2xl">{a.title[lang]}</p>
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
