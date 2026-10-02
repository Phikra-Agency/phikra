function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}
function coarsePointer() {
  return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
}
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function dprScale(maxDpr = 2) {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  return clamp(dpr, 1, maxDpr);
}
export {
  clamp,
  coarsePointer,
  dprScale,
  prefersReducedMotion
};
