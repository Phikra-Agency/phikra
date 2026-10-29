"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useT } from "@/components/site/use-t";
import { Logo } from "@/components/site/logo";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { Magnetic } from "@/components/site/magnetic";
import { navItems } from "@/lib/content";

export function Header() {
  const t = useT();
  const navigate = useApp((s) => s.navigate);
  const view = useApp((s) => s.view);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function go(view: Parameters<typeof navigate>[0]) {
    navigate(view);
    setMenuOpen(false);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-300 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-px flex h-16 items-center justify-between md:h-20">
          <Logo size="md" />

          {/* Center nav (desktop) */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {navItems.map((item) => {
              const active = view === item.view;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => go(item.view)}
                  className={`group relative inline-flex min-h-[44px] items-center font-mono text-[0.72rem] uppercase tracking-[0.18em] transition-colors ${
                    active ? "text-bone" : "text-bone-muted hover:text-bone"
                  }`}
                >
                  {item.label[useApp.getState().lang]}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-crimson" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right cluster — aligned vertically */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex md:items-center">
              <LanguageSwitcher />
            </div>
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <button
                type="button"
                onClick={() => go("contact")}
                className="btn-crimson"
              >
                {t("nav.cta")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </Magnetic>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center text-bone lg:hidden"
              aria-label={t("common.menu")}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-ink lg:hidden"
          >
            <div className="container-px flex h-16 items-center justify-between md:h-20">
              <Logo size="md" onClick={() => setMenuOpen(false)} />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center text-bone"
                aria-label={t("common.close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6">
              {navItems.map((item, i) => {
                const active = view === item.view;
                return (
                  <motion.button
                    key={item.key}
                    type="button"
                    onClick={() => go(item.view)}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.06 * i + 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group flex items-baseline gap-4 border-b border-line py-5 text-left"
                  >
                    <span className="font-mono text-[0.7rem] text-crimson">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display text-3xl transition-colors md:text-5xl ${
                        active ? "text-crimson" : "text-bone group-hover:text-crimson"
                      }`}
                    >
                      {item.label[useApp.getState().lang]}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            <div className="container-px flex items-center justify-between border-t border-line py-6">
              <LanguageSwitcher />
              <button
                type="button"
                onClick={() => go("contact")}
                className="btn-crimson"
              >
                {t("nav.cta")}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
