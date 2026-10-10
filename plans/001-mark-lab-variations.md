# 001 — Add three mark animation variants to the lab

- **Status**: DONE
- **Commit**: a00d7e0
- **Severity**: LOW
- **Category**: Missed opportunities (additive lab exploration)
- **Estimated scope**: 1 file (`animation-lab.html`), ~120 lines CSS + 3 cards HTML

## Problem

The animation lab currently compares only two Phikra mark loops. That is too thin for choosing a production thinking mark.

```html
<!-- animation-lab.html — current grid only has A dance + B fill -->
<section class="card" aria-labelledby="lab-a">… mark--dance …</section>
<section class="card" aria-labelledby="lab-b">… mark--fill …</section>
```

```css
/* animation-lab.html:151–238 — only these two keyframe systems exist */
.mark--dance { --mark-period: 1.05s; }
@keyframes mark-dance { /* float + pop + opacity */ }

.mark--fill { --mark-period: 1.4s; --stagger: 70ms; }
@keyframes mark-fill-wave { /* clip-path inset fill + soft pop */ }
```

Need three more distinct axes so the team can pick by feel: breathe (no travel), tilt (rotate), blink (stepped opacity).

## Target

Extend `animation-lab.html` only. Keep A and B unchanged. Add C / D / E with exact values below. Use existing tokens:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
```

### C — Pulse breathe (no translate)

Purpose: idle pulse. Properties: `transform` + `opacity` only. No `clip-path`. Stagger 50ms (within 30–80ms).

```css
.mark--pulse {
  --mark-period: 1.2s;
  --stagger: 50ms;
}

.mark--pulse .mark__petal {
  animation: mark-pulse var(--mark-period) infinite both;
  animation-timing-function: var(--ease-in-out);
}

.mark--pulse .mark__petal:nth-child(1) { animation-delay: 0ms; }
.mark--pulse .mark__petal:nth-child(2) { animation-delay: var(--stagger); }
.mark--pulse .mark__petal:nth-child(3) { animation-delay: calc(var(--stagger) * 2); }

@keyframes mark-pulse {
  0%,
  100% {
    opacity: 0.35;
    transform: scale(0.94);
  }
  45% {
    opacity: 1;
    transform: scale(1.05);
  }
  60% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### D — Soft wiggle (rotate alternate + tiny pop)

Purpose: playful idle. Keep rotation tiny (±4deg). `transform-origin: 50% 88%` already on `.mark__petal`. Use `--ease-in-out`. Stagger 60ms.

```css
.mark--wiggle {
  --mark-period: 1.15s;
  --stagger: 60ms;
}

.mark--wiggle .mark__petal {
  animation: mark-wiggle var(--mark-period) infinite both;
  animation-timing-function: var(--ease-in-out);
}

.mark--wiggle .mark__petal:nth-child(1) { animation-delay: 0ms; }
.mark--wiggle .mark__petal:nth-child(2) { animation-delay: var(--stagger); }
.mark--wiggle .mark__petal:nth-child(3) { animation-delay: calc(var(--stagger) * 2); }

@keyframes mark-wiggle {
  0%,
  100% {
    opacity: 0.4;
    transform: rotate(0deg) scale(0.96);
  }
  25% {
    opacity: 1;
    transform: rotate(-4deg) scale(1.04);
  }
  50% {
    opacity: 1;
    transform: rotate(4deg) scale(1.02);
  }
  75% {
    opacity: 0.85;
    transform: rotate(-2deg) scale(1);
  }
}
```

### E — Stepped blink (thinking dots as discrete steps)

Purpose: state indication that reads as “typing/thinking.” Use `steps(2, end)` on opacity-dominant keyframes so motion feels discrete. Period 0.9s. Stagger by period fraction like A (not fixed ms) so the cascade stays phase-locked.

```css
.mark--blink {
  --mark-period: 0.9s;
  --mark-count: 3;
}

.mark--blink .mark__petal {
  animation: mark-blink var(--mark-period) infinite both;
  animation-timing-function: steps(2, end);
}

.mark--blink .mark__petal:nth-child(1) {
  animation-delay: calc(var(--mark-period) * (1 - var(--mark-count)) / var(--mark-count));
}
.mark--blink .mark__petal:nth-child(2) {
  animation-delay: calc(var(--mark-period) * (2 - var(--mark-count)) / var(--mark-count));
}
.mark--blink .mark__petal:nth-child(3) {
  animation-delay: calc(var(--mark-period) * (3 - var(--mark-count)) / var(--mark-count));
}

@keyframes mark-blink {
  0%,
  49% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Layout

Change `.grid` so five cards wrap cleanly:

```css
.grid {
  grid-template-columns: 1fr;
}
@media (min-width: 720px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

Add three `<section class="card">` blocks after B, mirroring A/B structure: heading, one-line description, large `.stage` with `mark--lg mark--pulse|wiggle|blink`, then small tagline preview (`We think` + marks + `You lead`).

### Reduced motion

Extend the existing media query to include the new classes:

```css
@media (prefers-reduced-motion: reduce) {
  .mark--dance .mark__petal,
  .mark--fill .mark__petal,
  .mark--pulse .mark__petal,
  .mark--wiggle .mark__petal,
  .mark--blink .mark__petal {
    animation: none;
    opacity: 0.92;
    transform: none;
    clip-path: none;
  }
}
```

## Repo conventions to follow

- Easing tokens already on `:root` in `animation-lab.html` and `index.html`: `--ease-out` / `--ease-in-out` with the cubic-beziers above. Do not invent new curves.
- Mark markup pattern: three SVG petals with path from `favicon.svg`, classes `mark` + variant + optional `mark--lg`.
- Exemplar to copy for card HTML: the B fill card starting at `animation-lab.html` (~line 290, `id="lab-b"`).
- Never `scale(0)` — minimum scale in targets is `0.94` / `0.95` / `0.96`.
- Stagger for free-running ambient: 50–70ms fixed, or period-fraction like A/E.

## Steps

1. In `animation-lab.html`, append CSS for `.mark--pulse`, `.mark--wiggle`, `.mark--blink` and their `@keyframes` exactly as in Target (after `mark-fill-wave` block, before `.meta`).
2. Update the reduced-motion rule to list all five variant petal selectors.
3. Update `.grid` media queries for 3 columns at `min-width: 1100px`.
4. Duplicate the B card markup three times; retarget classes/ids to `lab-c` / `lab-d` / `lab-e`, titles **C · pulse breathe**, **D · soft wiggle**, **E · stepped blink**, and short descriptions matching each purpose line in Target.
5. Do not change `index.html` production mark CSS in this plan.

## Boundaries

- Do NOT edit `index.html`, `docs/`, `dist/`, or any `src/` JS.
- Do NOT add dependencies or new pages.
- Do NOT change A (`mark--dance`) or B (`mark--fill`) keyframes or timings.
- Do NOT animate `width` / `height` / `filter` / `box-shadow` in the new keyframes.
- If `animation-lab.html` structure drifted from commit `a00d7e0` enough that card patterns do not match, STOP and report.

## Verification

- **Mechanical**: open `animation-lab.html` via static server; confirm five cards render; no console errors.
- **Feel check**:
  - C never translates vertically — only scales/opacitates.
  - D rotation stays subtle; petals do not look broken or spinning.
  - E reads as discrete on/off cascade, not smooth float.
  - DevTools Animations panel at 25% playback: each stagger order is petal 1 → 2 → 3.
  - Toggle `prefers-reduced-motion: reduce` — all five freeze at opacity ~0.92, no motion.
- **Done when**: C/D/E present side-by-side with A/B; reduced-motion covers all five; production site untouched.
