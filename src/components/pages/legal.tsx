"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { useLang } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { ui, type Lang } from "@/lib/content";

interface LegalPageProps {
  type: "legal" | "privacy";
}

export function LegalPage({ type }: LegalPageProps) {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useLang() as Lang;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [type]);

  const title =
    type === "privacy" ? t("legal.privacyTitle") : t("legal.title");

  // Choose relevant sections based on type.
  const sections =
    type === "privacy"
      ? [
          { key: "data", body: "dataBody" },
          { key: "cookies", body: "cookiesBody" },
          { key: "ip", body: "ipBody" },
        ]
      : [
          { key: "editor", body: "editorBody" },
          { key: "director", body: "directorBody" },
          { key: "host", body: "hostBody" },
          { key: "ip", body: "ipBody" },
          { key: "data", body: "dataBody" },
          { key: "cookies", body: "cookiesBody" },
        ];

  const updatedLabel =
    lang === "fr" ? "Dernière mise à jour" : "Last updated";

  return (
    <>
      <section className="section pt-32">
        <div className="container-px">
          <Reveal immediate>
            <button
              type="button"
              onClick={() => navigate("home")}
              className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted hover:text-crimson"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("common.back")}
            </button>
          </Reveal>

          <Reveal immediate delay={0.05} className="mt-8">
            <SectionLabel number="—" label={title} />
          </Reveal>

          <Reveal immediate delay={0.1} className="mt-6">
            <h1 className="display text-4xl md:text-6xl lg:text-7xl">{title}</h1>
          </Reveal>

          <Reveal immediate delay={0.15} className="mt-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-dim">
              {updatedLabel}: {new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-px grid gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="label-mono mb-4">{t("project.aside")}</p>
              <ul className="space-y-2">
                {sections.map((s) => {
                  const label = (ui.legal.sections as Record<string, Record<Lang, string>>)[s.key][lang];
                  return (
                    <li key={s.key}>
                      <a
                        href={`#${s.key}`}
                        className="link-underline text-sm text-bone-muted hover:text-bone"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {sections.map((s, i) => {
              const label = (ui.legal.sections as Record<string, Record<Lang, string>>)[s.key][lang];
              const body = (ui.legal.sections as Record<string, Record<Lang, string>>)[s.body][lang];
              return (
                <Reveal key={s.key} id={s.key} y={20} className={i === 0 ? "" : "mt-12"}>
                  <p className="label-mono mb-3">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display text-2xl md:text-3xl">{label}</h2>
                  <p className="mt-4 max-w-prose text-bone-muted leading-relaxed">{body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
