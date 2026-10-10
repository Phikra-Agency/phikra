# 002 — Add grounded qalam swipe variations to the lab

- **Status**: DONE
- **Commit**: a00d7e0
- **Severity**: LOW
- **Category**: Missed opportunities / Cohesion
- **Estimated scope**: 1 file (`animation-lab.html`), ~3 new cards + shared CSS

## Problem

Lab card **F · qalam wipe** finally has the right physical model: a hard diagonal **mask** swipe from the top-left face of each nuqta (flat nib), SVG silhouette intact. That motion must stay.

What is missing: sibling variations that keep the **same swipe**, but change pace / stagger / writing direction so the mark feels unique and grounded — not more effects piled on.

Current F (keep as baseline):

```css
/* animation-lab.html — .mark--qalam (current) */
@property --qalam-wipe {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 0%;
}

.mark--qalam {
    --mark-period: 2.2s;
    --stagger: 180ms;
}

.mark--qalam .mark__petal {
    --qalam-wipe: 0%;
    -webkit-mask-image: linear-gradient(
        135deg,
        #000 0%,
        #000 var(--qalam-wipe),
        transparent var(--qalam-wipe)
    );
    mask-image: linear-gradient(
        135deg,
        #000 0%,
        #000 var(--qalam-wipe),
        transparent var(--qalam-wipe)
    );
    animation: qalam-ink var(--mark-period) infinite both;
    animation-timing-function: var(--ease-out);
}

@keyframes qalam-ink {
    0% {
        --qalam-wipe: 0%;
        opacity: 1;
    }
    44%,
    70% {
        --qalam-wipe: 100%;
        opacity: 1;
    }
    88%,
    100% {
        --qalam-wipe: 100%;
        opacity: 0;
    }
}
```

## Target

Keep **F** unchanged as the reference hard swipe.

Add **exactly three** new lab cards — G, H, I — all sharing the same mask technique (135deg hard edge, `@property --qalam-wipe`, no `clip-path` reshape, no `rotate`/`scale` on the petal during the wipe). Differentiate only with timing tokens and stagger order.

| Card | Class | Intent | Tokens |
| --- | --- | --- | --- |
| F (keep) | `mark--qalam` | Baseline hard swipe | period `2.2s`, stagger `180ms`, wipe reaches 100% at `44%` |
| G · unhurried | `mark--qalam-slow` | Careful pen — longer draw + longer hold | period `2.8s`, stagger `220ms`, wipe 100% at `52%`, hold through `78%`, fade `90–100%` |
| H · one breath | `mark--qalam-breath` | Three dots as one gesture | period `2.0s`, stagger `80ms`, wipe 100% at `40%`, hold through `68%` |
| I · rtl lift | `mark--qalam-rtl` | Arabic writing order — right petal first | same timing as F (`2.2s` / wipe `44%`), but stagger **reversed**: child 3 delay `0ms`, child 2 `180ms`, child 1 `360ms` |

Shared rules for G/H/I (and F stays compliant):

- Easing: `animation-timing-function: var(--ease-out)` where `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (already on `:root` in `animation-lab.html`).
- Properties animated: `--qalam-wipe` and `opacity` only. **No** `transform`, **no** `clip-path`, **no** stroke-dash.
- Mask angle stays `135deg` (down-right from the top-left face).
- Hard edge: same stop twice (`#000 var(--qalam-wipe), transparent var(--qalam-wipe)`). Do **not** add a soft bleed band.
- Marketing / explanatory duration may exceed 300ms (lab loop is rare / first-time tier).
- `prefers-reduced-motion: reduce`: kill animation, show full mark (`mask-image: none`, `opacity: 0.92`) for every new class — same pattern as F.

Do **not** invent a fourth flourish (wet edge, bounce, glow, scale press). Three timing dialects of one motion is the point.

### Target CSS shape (exemplar for G; H/I follow)

```css
/* target — shared mask recipe via a modifier on .mark__petal */
.mark--qalam-slow {
    --mark-period: 2.8s;
    --stagger: 220ms;
}

.mark--qalam-slow .mark__petal {
    --qalam-wipe: 0%;
    -webkit-mask-image: linear-gradient(
        135deg,
        #000 0%,
        #000 var(--qalam-wipe),
        transparent var(--qalam-wipe)
    );
    mask-image: linear-gradient(
        135deg,
        #000 0%,
        #000 var(--qalam-wipe),
        transparent var(--qalam-wipe)
    );
    animation: qalam-ink-slow var(--mark-period) infinite both;
    animation-timing-function: var(--ease-out);
}

.mark--qalam-slow .mark__petal:nth-child(1) { animation-delay: 0ms; }
.mark--qalam-slow .mark__petal:nth-child(2) { animation-delay: var(--stagger); }
.mark--qalam-slow .mark__petal:nth-child(3) { animation-delay: calc(var(--stagger) * 2); }

@keyframes qalam-ink-slow {
    0% {
        --qalam-wipe: 0%;
        opacity: 1;
    }
    52%,
    78% {
        --qalam-wipe: 100%;
        opacity: 1;
    }
    90%,
    100% {
        --qalam-wipe: 100%;
        opacity: 0;
    }
}
```

H uses `qalam-ink-breath` with period `2.0s`, stagger `80ms`, wipe full at `40%`, hold to `68%`, fade `88–100%`.

I reuses `qalam-ink` keyframes (same as F) or duplicates identical keyframes as `qalam-ink-rtl` if cleaner — timing values must match F. Only nth-child delays flip:

```css
.mark--qalam-rtl .mark__petal:nth-child(1) { animation-delay: calc(var(--stagger) * 2); }
.mark--qalam-rtl .mark__petal:nth-child(2) { animation-delay: var(--stagger); }
.mark--qalam-rtl .mark__petal:nth-child(3) { animation-delay: 0ms; }
```

### Target HTML

After the existing F `<section class="card" …>`, add three sections mirroring F’s structure (stage + tagline-preview), with:

- `id="lab-g"` / `lab-h` / `lab-i`
- titles: `G · unhurried`, `H · one breath`, `I · rtl lift`
- one-line descriptions matching the table intent
- marks: `mark mark--lg mark--qalam-slow` (etc.) and the smaller tagline mark
- same single filled `<path fill="currentColor" d="M77.02 …">` as F (no dual stroke/fill paths)

## Repo conventions to follow

- Lab-only file: `animation-lab.html`. Tokens already on `:root`: `--ease-out`, `--ease-in-out`, `--phikra-red`.
- Card pattern: copy F’s section markup (stage + tagline). See F around `id="lab-f"`.
- Reduced-motion block at bottom of `<style>` already lists `.mark--qalam` — extend the selector list and clear masks the same way.
- Exemplar for stagger + period tokens: `.mark--fill` / `.mark--qalam` in the same file.
- Do not add Motion/GSAP or any npm dependency.

## Steps

1. In `animation-lab.html` `<style>`, after the existing `.mark--qalam` / `@keyframes qalam-ink` block, add CSS for `.mark--qalam-slow`, `.mark--qalam-breath`, `.mark--qalam-rtl` and their keyframes exactly as specified in **Target** (including `@property` reuse — do **not** redeclare `@property --qalam-wipe`; one registration is enough).
2. Extend `@media (prefers-reduced-motion: reduce)` to include the three new classes: `animation: none`, `opacity: 0.92`, `transform: none`, `clip-path: none`, `-webkit-mask-image: none`, `mask-image: none`.
3. Duplicate F’s card markup three times after F; swap titles, descriptions, ids, and mark modifier classes (`mark--qalam-slow` / `mark--qalam-breath` / `mark--qalam-rtl`). Keep petal SVG paths identical to F.
4. Leave cards A–E and F’s values untouched. Do not edit `index.html`.

## Boundaries

- Do NOT touch `index.html` or production `.mark-thinking`.
- Do NOT change A–E or alter F’s period/stagger/keyframes.
- Do NOT use `clip-path` for these variants (mask only).
- Do NOT add `transform: rotate/scale` on petals during the wipe.
- Do NOT add soft-gradient bleed, glow pulses, bounce, or stroke-dash line drawing.
- Do NOT add dependencies.
- If F’s mask recipe has drifted since commit `a00d7e0`, STOP and report — adapt only enough to keep the same mask technique, do not invent a new physical model.

## Verification

- **Mechanical**: open `animation-lab.html` via local server (`npx vite` → `/animation-lab.html` or `python3 -m http.server`). Confirm cards F, G, H, I all render three red petals with the same resting silhouette as E when mid-hold (full wipe).
- **Feel check**:
  - F vs G: G’s wipe and pen-lift gaps feel slower / more deliberate; silhouette never shears.
  - F vs H: H’s three dots feel like one continuous phrase (tight stagger), not three separate stamps.
  - F vs I: I draws right petal first, then middle, then left.
  - DevTools Animations panel at 0.25×: hard mask edge stays parallel to the top-left face; no morph into a trapezoid.
  - `prefers-reduced-motion: reduce`: all four qalam cards show static full marks, no wipe.
- **Done when**: four qalam cards (F–I) visible; A–E unchanged; no production file edits; feel checks above pass.
