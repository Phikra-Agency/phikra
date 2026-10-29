"use client";

import { useApp } from "@/stores/use-app";
import { ui, type Lang } from "@/lib/content";

type UIKeys = string;

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * useT() — returns a translation function for the current language.
 * Falls back gracefully to the key if the path is not found.
 */
export function useT() {
  const lang = useApp((s) => s.lang);
  return (key: UIKeys): string => {
    const node = getByPath(ui, key);
    if (node && typeof node === "object" && lang in (node as Record<Lang, string>)) {
      return (node as Record<Lang, string>)[lang];
    }
    return key;
  };
}

/** Returns the current language. */
export function useLang(): Lang {
  return useApp((s) => s.lang);
}
