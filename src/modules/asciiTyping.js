import { coarsePointer, dprScale, prefersReducedMotion } from "./device.js";
const GRID_W = 5;
const GRID_H = 3;
const CELL_ASPECT = 0.58;
const RADIUS_SQ = 2;
function buildMask() {
  const cx = (GRID_W - 1) / 2;
  const cy = (GRID_H - 1) / 2;
  const mask2 = [];
  for (let gy = 0; gy < GRID_H; gy++) {
    for (let gx = 0; gx < GRID_W; gx++) {
      const dx = gx - cx;
      const dy = gy - cy;
      const wx = dx * CELL_ASPECT;
      mask2.push(wx * wx + dy * dy <= RADIUS_SQ ? 1 : 0);
    }
  }
  return mask2;
}
const mask = buildMask();
const chars = ".*@o+#$%&01/\\|<>?!~^:=;,-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function configureNode(node) {
  const { host, canvas, ctx } = node;
  const style = window.getComputedStyle(host);
  const fs = parseFloat(style.fontSize) || 10;
  const fw = style.fontWeight || "600";
  const ff = style.fontFamily || 'ui-monospace, "Courier New", monospace';
  const font = `${fw} ${fs}px ${ff}`;
  const color = style.color || "#e50d4a";
  const dpr = dprScale(coarsePointer() ? 1.5 : 2);
  ctx.font = font;
  const m = ctx.measureText("M");
  const charW = Math.max(4, m.width || fs * 0.62);
  const lineH = fs * 0.75;
  const w = Math.max(1, Math.round(GRID_W * charW));
  const h = Math.max(1, Math.round(GRID_H * lineH));
  node.font = font;
  node.color = color;
  node.dpr = dpr;
  node.w = w;
  node.h = h;
  node.cellW = w / GRID_W;
  node.cellH = h / GRID_H;
  host.style.display = "inline-block";
  host.style.width = `${w}px`;
  host.style.height = `${h}px`;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
}
function makeGlyphCanvas(host) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  host.textContent = "";
  host.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const node = {
    host,
    canvas,
    ctx,
    dpr: 1,
    w: 1,
    h: 1,
    cellW: 1,
    cellH: 1,
    font: "",
    color: ""
  };
  configureNode(node);
  return node;
}
function drawGlyph(node) {
  const style = window.getComputedStyle(node.host);
  const fs = parseFloat(style.fontSize) || 10;
  const currentFs = parseFloat(node.font.split("px")[0].split(" ").pop() || String(fs)) || fs;
  if (Math.abs(fs - currentFs) > 0.25) configureNode(node);
  const { ctx, w, h, cellW, cellH } = node;
  ctx.clearRect(0, 0, w, h);
  ctx.shadowColor = "rgba(229, 13, 74, 0.35)";
  ctx.shadowBlur = 10;
  let i = 0;
  for (let gy = 0; gy < GRID_H; gy++) {
    for (let gx = 0; gx < GRID_W; gx++) {
      const on = mask[i++];
      if (!on) continue;
      const ch = chars[Math.random() * chars.length | 0];
      const x = (gx + 0.5) * cellW;
      const y = (gy + 0.5) * cellH;
      ctx.fillText(ch, x, y);
    }
  }
}
function initAsciiTyping() {
  const hosts = Array.from(document.querySelectorAll(".ascii-typing__glyph"));
  if (!hosts.length) return;
  const nodes = [];
  for (const host of hosts) {
    const node = makeGlyphCanvas(host);
    if (node) nodes.push(node);
  }
  if (!nodes.length) return;
  for (const node of nodes) drawGlyph(node);
  if (prefersReducedMotion()) return;
  const intervalMs = coarsePointer() ? 84 : 58;
  let timer = 0;
  let ro = null;
  function relayoutAll() {
    for (const node of nodes) {
      configureNode(node);
      drawGlyph(node);
    }
  }
  function start() {
    if (timer) return;
    timer = window.setInterval(() => {
      for (const node of nodes) drawGlyph(node);
    }, intervalMs);
  }
  function stop() {
    if (!timer) return;
    window.clearInterval(timer);
    timer = 0;
  }
  function updateRunState() {
    if (document.hidden) stop();
    else start();
  }
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => {
      relayoutAll();
    });
    for (const node of nodes) ro.observe(node.host);
  } else {
    window.addEventListener("resize", relayoutAll, { passive: true });
  }
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => relayoutAll());
  }
  updateRunState();
  document.addEventListener(
    "visibilitychange",
    () => {
      updateRunState();
    },
    false
  );
}
export {
  initAsciiTyping
};
