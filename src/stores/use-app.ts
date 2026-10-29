/**
 * PHIKRA — Application store (Zustand + persist)
 *
 * Holds UI language + current view, and syncs the URL hash.
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Lang, View } from "@/lib/content";

export interface AppState {
  lang: Lang;
  view: View;
  param: string | null;
  hydrated: boolean;
  setLang: (lang: Lang) => void;
  navigate: (view: View, param?: string | null) => void;
  syncFromHash: () => void;
  setHydrated: (v: boolean) => void;
}

/* ----------------------------------------------------------------------------
   Hash helpers
---------------------------------------------------------------------------- */
const VALID_VIEWS: View[] = [
  "home",
  "agency",
  "services",
  "portfolio",
  "project",
  "news",
  "article",
  "contact",
  "legal",
  "privacy",
];

function parseHash(): { view: View; param: string | null } {
  if (typeof window === "undefined") return { view: "home", param: null };
  const raw = window.location.hash.replace(/^#\/?/, "");
  if (!raw) return { view: "home", param: null };
  const [first, second] = raw.split("/");
  const view = (VALID_VIEWS as string[]).includes(first)
    ? (first as View)
    : "home";
  const param = second ? decodeURIComponent(second) : null;
  return { view, param };
}

function buildHash(view: View, param?: string | null): string {
  if (!view || view === "home") {
    if (!param) return "";
    return `#/home/${encodeURIComponent(param)}`;
  }
  if (param) return `#/${view}/${encodeURIComponent(param)}`;
  return `#/${view}`;
}

/* ----------------------------------------------------------------------------
   Store
---------------------------------------------------------------------------- */
export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      lang: "fr",
      view: "home",
      param: null,
      hydrated: false,

      setLang: (lang) => {
        set({ lang });
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang;
        }
      },

      navigate: (view, param = null) => {
        set({ view, param });
        if (typeof window !== "undefined") {
          const hash = buildHash(view, param);
          if (window.location.hash !== hash) {
            window.location.hash = hash;
          }
          // Scroll to top on view change.
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        }
      },

      syncFromHash: () => {
        const { view, param } = parseHash();
        const cur = get();
        if (cur.view !== view || cur.param !== param) {
          set({ view, param });
        }
      },

      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "phikra-lang",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lang: s.lang }) as AppState,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
          if (typeof document !== "undefined" && state.lang) {
            document.documentElement.lang = state.lang;
          }
        }
      },
    }
  )
);

export { buildHash, parseHash };
