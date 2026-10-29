"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check, Loader2, Send, AlertCircle, Paperclip, Clock, UploadCloud } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { useLang } from "@/components/site/use-t";
import { Reveal } from "@/components/site/reveal";
import { SectionLabel } from "@/components/site/section-label";
import { services, ui, siteConfig, type Lang } from "@/lib/content";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  serviceType: z.string().min(1),
  budget: z.string().optional(),
  deadline: z.string().min(1),
  message: z.string().min(10),
  consent: z.literal(true),
  website: z.string().optional(), // honeypot
});

type FormValues = z.input<typeof schema>;

export function ContactPage() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useLang() as Lang;

  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    resolver: zodResolver(schema as unknown as Parameters<typeof zodResolver>[0]),
    defaultValues: { consent: false as unknown as true, website: "" },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const errText = (key: string) => {
    const node = (ui.form.errors as Record<string, Record<Lang, string>>)[key];
    return node ? node[lang] : key;
  };

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    setServerErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (values.website && values.website.trim() !== "") {
        // honeypot triggered — server returns ok silently; we just reset.
        setStatus("ok");
        reset();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setStatus("ok");
          reset();
          return;
        }
        if (data.errors) {
          setServerErrors(data.errors as Record<string, string>);
          setStatus("error");
          return;
        }
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Header */}
      <section className="section pt-24">
        <div className="container-px">
          <SectionLabel number="—" label={t("contact.label")} />
          <Reveal className="mt-6">
            <h1 className="display text-4xl md:text-6xl lg:text-7xl">
              {t("contact.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-6">
            <p className="flex items-center gap-2 max-w-md text-bone-muted">
              <Clock className="h-4 w-4 shrink-0 text-crimson" />
              {t("contact.subtitle")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + aside */}
      <section className="section pt-0">
        <div className="container-px grid gap-12 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-8">
            {status === "ok" ? (
              <div className="sculptural flex flex-col items-center border border-crimson/40 bg-bg-2 p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-crimson">
                  <Check className="h-8 w-8 text-crimson" />
                </div>
                <p className="display mt-6 text-2xl md:text-3xl">{t("form.success")}</p>
                <p className="mt-3 max-w-sm text-sm text-bone-muted">{t("contact.subtitle")}</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-ghost mt-8"
                >
                  {t("common.back")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  {...register("website")}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label={t("form.name")} error={errors.name && errText("name")} valid={touchedFields.name && !errors.name}>
                    <input
                      type="text"
                      placeholder={t("form.namePh")}
                      className={`phikra-input ${touchedFields.name && !errors.name ? "phikra-input-valid" : ""}`}
                      {...register("name")}
                    />
                  </Field>
                  <Field label={t("form.company")}>
                    <input
                      type="text"
                      placeholder={t("form.companyPh")}
                      className="phikra-input"
                      {...register("company")}
                    />
                  </Field>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label={t("form.email")} error={errors.email && errText("email")} valid={touchedFields.email && !errors.email}>
                    <input
                      type="email"
                      placeholder={t("form.emailPh")}
                      className={`phikra-input ${touchedFields.email && !errors.email ? "phikra-input-valid" : ""}`}
                      {...register("email")}
                    />
                  </Field>
                  <Field label={t("form.phone")}>
                    <input
                      type="tel"
                      placeholder={t("form.phonePh")}
                      className="phikra-input"
                      {...register("phone")}
                    />
                  </Field>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Field
                    label={t("form.serviceType")}
                    error={errors.serviceType && errText("serviceType")}
                  >
                    <select className="phikra-input" {...register("serviceType")}>
                      <option value="">{t("form.serviceTypePh")}</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.number} — {s.title[lang]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("form.budget")}>
                    <select className="phikra-input" {...register("budget")} defaultValue="">
                      <option value="">{t("form.budgetPh")}</option>
                      {ui.form.budgets.map((b, i) => (
                        <option key={i} value={b[lang]}>
                          {b[lang]}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field
                    label={t("form.deadline")}
                    error={errors.deadline && errText("deadline")}
                  >
                    <select className="phikra-input" {...register("deadline")} defaultValue="">
                      <option value="">{t("form.deadlinePh")}</option>
                      {ui.form.deadlines.map((d, i) => (
                        <option key={i} value={d[lang]}>
                          {d[lang]}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  label={t("form.message")}
                  error={errors.message && errText("message")}
                >
                  <textarea
                    rows={6}
                    placeholder={t("form.messagePh")}
                    className="phikra-input resize-none"
                    {...register("message")}
                  />
                </Field>

                {/* Upload fichier — drag & drop zone */}
                <div>
                  <span className="label-mono mb-2 block">{lang === "fr" ? "Joindre un fichier (PDF, max 10mb)" : "Attach a file (PDF, max 10mb)"}</span>
                  <label
                    className="dropzone flex cursor-pointer flex-col items-center gap-2 border border-dashed border-line bg-transparent px-4 py-6 text-center text-sm text-bone-dim transition-all hover:border-crimson hover:text-crimson"
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("dropzone-active"); }}
                    onDragLeave={(e) => { e.currentTarget.classList.remove("dropzone-active"); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("dropzone-active");
                      const f = e.dataTransfer.files?.[0];
                      const label = document.getElementById("file-name");
                      if (f && label) label.textContent = f.name;
                    }}
                  >
                    <UploadCloud className="h-6 w-6" />
                    <span id="file-name">{lang === "fr" ? "Glissez un fichier ici ou cliquez pour parcourir" : "Drag a file here or click to browse"}</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        const label = document.getElementById("file-name");
                        if (f && label) label.textContent = f.name;
                      }}
                    />
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm text-bone-muted">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-[#ff0033]"
                    {...register("consent")}
                  />
                  <span>{t("form.consent")}</span>
                </label>
                {errors.consent && (
                  <p className="-mt-3 text-xs text-crimson">{errText("consent")}</p>
                )}

                {status === "error" && (
                  <div className="flex items-start gap-3 border border-crimson/40 bg-bg-2 p-4 text-sm text-crimson">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{t("form.error")}</span>
                  </div>
                )}
                {Object.keys(serverErrors).length > 0 && (
                  <ul className="border border-crimson/40 bg-bg-2 p-4 text-sm text-crimson">
                    {Object.entries(serverErrors).map(([k, v]) => (
                      <li key={k}>{v}</li>
                    ))}
                  </ul>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-crimson w-full justify-center py-4 text-sm disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("form.submit")}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Aside */}
          <aside className="lg:col-span-4">
            <p className="label-mono mb-6">{t("contact.aside")}</p>
            <ul className="space-y-6 border-t border-line pt-6">
              <li>
                <p className="label-mono mb-1">{t("contact.email")}</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="link-underline text-bone"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <p className="label-mono mb-1">{t("contact.phone")}</p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="link-underline text-bone"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <p className="label-mono mb-1">{t("contact.whatsapp")}</p>
                <a
                  href={siteConfig.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-bone"
                >
                  {siteConfig.contact.whatsapp}
                </a>
              </li>
              <li>
                <p className="label-mono mb-1">{t("contact.address")}</p>
                <p className="text-bone-muted">
                  {siteConfig.contact.address.line1}
                  <br />
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.country}
                </p>
              </li>
            </ul>

            <p className="mt-8 border border-line bg-bg-2 p-4 text-xs text-bone-dim">
              {t("contact.configNote")}
            </p>
          </aside>
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

      {/* Local input styles */}
      <style>{`
        .phikra-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 0.85rem 1rem;
          color: var(--text);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .phikra-input::placeholder { color: var(--text-dim); }
        .phikra-input:focus {
          outline: none;
          border-color: var(--crimson);
          background: rgba(229, 13, 74, 0.06);
        }
        .phikra-input option { background: #0f0f12; color: var(--text); }
        .phikra-input-valid {
          border-color: rgba(34, 197, 94, 0.5) !important;
        }
        .phikra-input-valid:focus {
          border-color: rgba(34, 197, 94, 0.7) !important;
          background: rgba(34, 197, 94, 0.04) !important;
        }
        .dropzone-active {
          border-color: var(--crimson) !important;
          background: rgba(229, 13, 74, 0.06) !important;
          color: var(--crimson) !important;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  error,
  valid,
  children,
}: {
  label: string;
  error?: string;
  valid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="label-mono mb-2 flex items-center gap-2 transition-colors">
        {label}
        {valid && !error && <Check className="h-3 w-3 text-green-500" />}
        {error && <AlertCircle className="h-3 w-3 text-crimson" />}
      </span>
      <div className={error ? "animate-shake" : ""}>
        {children}
      </div>
      {error && <span className="mt-1 block text-xs text-crimson">{error}</span>}
    </label>
  );
}
