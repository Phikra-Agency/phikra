"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useApp } from "@/stores/use-app";
import { useLang } from "@/components/site/use-t";

/**
 * LanguageSwitcher — FR/EN toggle with an explicit dropdown.
 */
export function LanguageSwitcher() {
  const lang = useLang();
  const setLang = useApp((s) => s.setLang);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const langs: { code: "fr" | "en"; label: string }[] = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Changer de langue"
        className="group inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone-muted transition-colors hover:text-bone"
      >
        <Globe className="h-3.5 w-3.5 text-crimson" />
        <span className={lang === "fr" ? "text-bone" : "text-bone-dim"}>FR</span>
        <span className="text-bone-dim">/</span>
        <span className={lang === "en" ? "text-bone" : "text-bone-dim"}>EN</span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-2 min-w-[140px] border border-line bg-elevated p-1"
          >
            {langs.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={lang === l.code}
                  onClick={() => {
                    setLang(l.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors ${
                    lang === l.code
                      ? "text-crimson"
                      : "text-bone-muted hover:text-bone"
                  }`}
                >
                  <span>{l.label}</span>
                  {lang === l.code && (
                    <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
