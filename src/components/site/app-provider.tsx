"use client";

import { useEffect } from "react";
import { useApp } from "@/stores/use-app";

/**
 * AppProvider — keeps the URL hash in sync with the store and
 * keeps the document language attribute aligned with the lang state.
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const lang = useApp((s) => s.lang);
  const syncFromHash = useApp((s) => s.syncFromHash);

  // Initial hash sync + listen to hashchange (back/forward).
  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  // Keep <html lang> aligned with the lang state.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return <>{children}</>;
}
