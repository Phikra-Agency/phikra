"use client";

import { ArrowUpRight, Instagram, Linkedin, Youtube, Facebook } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { navItems, services, siteConfig } from "@/lib/content";

export function Footer() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const lang = useApp((s) => s.lang);

  const socials = [
    { url: siteConfig.social.instagram, icon: Instagram, label: "Instagram" },
    { url: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { url: siteConfig.social.behance, label: "Behance", icon: Linkedin },
    { url: siteConfig.social.youtube, icon: Youtube, label: "YouTube" },
    { url: siteConfig.social.facebook, icon: Facebook, label: "Facebook" },
  ].filter((s) => s.url);

  return (
    <footer className="mt-auto border-t border-line bg-ink">
      {/* Big signature band */}
      <section className="container-px section py-20 md:py-28">
        <Reveal>
          <div className="flex flex-col gap-10 md:gap-14">
            <div>
              <p className="label-mono mb-6 text-bone font-bold">{t("footer.about")}</p>
              <h2 className="display text-[15vw] leading-[0.9] md:text-[10vw]">
                {t("footer.signature1")}{" "}
                <span className="text-crimson">{t("footer.signature2")}</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-bone-muted">
                {t("footer.signatureSub")}
              </p>
              <button
                type="button"
                onClick={() => navigate("contact")}
                className="btn-crimson"
              >
                {t("footer.cta")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Columns */}
      <div className="container-px grid items-start gap-12 border-t border-line py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-24">
        {/* About */}
        <div className="flex flex-col gap-4">
          <Logo size="md" />
          <p className="max-w-xs text-sm text-bone-muted">{t("footer.aboutText")}</p>
        </div>

        {/* Navigation */}
        <div>
          <p className="label-mono mb-5 text-bone font-bold">{t("footer.navigation")}</p>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => navigate(item.view)}
                  className="link-underline inline-block min-h-[44px] py-1 text-sm leading-7 text-bone-muted hover:text-bone"
                >
                  {item.label[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Expertise */}
        <div>
          <p className="label-mono mb-5 text-bone font-bold">{t("footer.expertise")}</p>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => navigate("services")}
                  className="link-underline inline-block min-h-[44px] py-1 text-sm leading-7 text-bone-muted hover:text-bone"
                >
                  {s.number} — {s.title[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="label-mono mb-5 text-bone font-bold">{t("footer.contact")}</p>
          <ul className="space-y-3 text-sm text-bone-muted">
            <li>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="link-underline inline-block min-h-[44px] py-1 leading-7 hover:text-bone"
              >
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="link-underline inline-block min-h-[44px] py-1 leading-7 hover:text-bone"
              >
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="text-bone-dim">
              {siteConfig.contact.address.line1}
              <br />
              {siteConfig.contact.address.city},{" "}
              {siteConfig.contact.address.country}
            </li>
            <li className="flex items-center gap-3 pt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center border border-line transition-all hover:border-crimson hover:text-crimson"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="container-px border-t border-line py-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="label-mono mb-1">Rester informé</p>
            <p className="text-sm text-bone-muted">Recevez nos réflexions sur la création, le branding et le digital.</p>
          </div>
          <form
            className="flex w-full max-w-sm items-stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="vous@exemple.com"
              className="h-11 flex-1 border border-line bg-transparent px-4 text-sm text-bone placeholder:text-bone-dim focus:border-crimson focus:outline-none"
            />
            <button type="submit" className="btn-crimson h-11 whitespace-nowrap border-l-0">
              S'abonner
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-px flex flex-col items-start justify-between gap-3 border-t border-line py-6 text-xs text-bone-dim md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => navigate("legal")}
            className="link-underline inline-block min-h-[44px] py-1 leading-7 hover:text-bone"
          >
            {t("footer.legal")}
          </button>
          <button
            type="button"
            onClick={() => navigate("privacy")}
            className="link-underline inline-block min-h-[44px] py-1 leading-7 hover:text-bone"
          >
            {t("footer.privacy")}
          </button>
        </div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-bone-dim">
          {t("footer.configNote")}
        </p>
      </div>
    </footer>
  );
}
