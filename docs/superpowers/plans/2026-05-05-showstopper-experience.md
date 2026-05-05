# Showstopper Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the layered showstopper system: a signature boot sequence, a research instrument, and a reusable living-paper interactive block.

**Architecture:** Keep the implementation native to the existing Next.js/React/CSS site. Add focused client components for the animated/interactive parts, keep research data in `src/lib/data.ts`, and preserve the current Markdown directive pipeline.

**Tech Stack:** Next.js App Router, React client components, TypeScript, CSS animations/transitions, SVG, no new dependencies.

---

## File Structure

- Create `src/components/SignatureBoot.tsx`
  - Client component for the hero-to-featured memory hook.
  - Reads scroll progress, renders research tokens, and sets CSS variables/classes.

- Create `src/components/ResearchInstrument.tsx`
  - Client component replacing `ResearchObservatory`.
  - Owns active project state and visual mode rendering.

- Create `src/components/LivingPaperBlock.tsx`
  - Client component for reusable Markdown-embedded interactions.
  - Starts with `graph-message-passing`.

- Modify `src/app/page.tsx`
  - Mount `SignatureBoot`.
  - Replace `ResearchObservatory` with `ResearchInstrument`.

- Modify `src/components/MarkdownRenderer.tsx`
  - Replace the direct `DistillGraphDemo` import with `LivingPaperBlock`.
  - Render a safe unknown-directive note for unrecognized interactive directives.

- Modify `src/app/globals.css`
  - Add styles for signature boot, research instrument, and living paper.
  - Remove unused observatory styles after replacement.
  - Add reduced-motion fallbacks.

- Delete `src/components/ResearchObservatory.tsx`
  - Delete after `ResearchInstrument` replaces it on the homepage.

- Delete `src/components/DistillGraphDemo.tsx`
  - Delete after `LivingPaperBlock` replaces it in `MarkdownRenderer`.

## Task 1: Signature Boot Component

**Files:**
- Create: `src/components/SignatureBoot.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Create the client component**

Create `src/components/SignatureBoot.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const fragments = [
  { text: "RecA", x: 8, y: 28, tx: 10, ty: 8 },
  { text: "Bloch", x: 26, y: 54, tx: 22, ty: 20 },
  { text: "hIAPP", x: 44, y: 34, tx: 39, ty: 10 },
  { text: "asthma", x: 62, y: 58, tx: 56, ty: 22 },
  { text: "DNA", x: 78, y: 30, tx: 72, ty: 9 },
  { text: "graphs", x: 18, y: 74, tx: 15, ty: 54 },
  { text: "models", x: 50, y: 76, tx: 47, ty: 50 },
  { text: "mechanism", x: 72, y: 72, tx: 66, ty: 54 }
];

export function SignatureBoot() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const raw = 1 - rect.top / viewport;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      className="signature-boot"
      ref={ref}
      style={{ ["--boot-progress" as string]: progress }}
      aria-label="Research fragments assembling into Nikhil Maturi"
    >
      <div className="signature-boot-inner">
        <div className="signature-boot-name" aria-hidden="true">
          Nikhil Maturi
        </div>
        <div className="signature-boot-fragments" aria-hidden="true">
          {fragments.map((fragment) => (
            <span
              key={fragment.text}
              style={
                {
                  "--x": fragment.x,
                  "--y": fragment.y,
                  "--tx": fragment.tx,
                  "--ty": fragment.ty
                } as React.CSSProperties
              }
            >
              {fragment.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount the component**

Modify `src/app/page.tsx` imports:

```tsx
import { SignatureBoot } from "@/components/SignatureBoot";
```

Render it between the hero and featured project:

```tsx
</section>

<SignatureBoot />

<section className="featured-project" aria-label="Featured project">
```

- [ ] **Step 3: Add signature boot CSS**

Add to `src/app/globals.css` near the hero/featured styles:

```css
.signature-boot {
  margin: -112px auto 0;
  max-width: 1240px;
  padding: 0 24px;
  pointer-events: none;
  position: relative;
  z-index: 7;
}

.signature-boot-inner {
  border: 1px solid rgba(241, 240, 234, 0.12);
  border-bottom: 0;
  border-radius: 16px 16px 0 0;
  height: 180px;
  overflow: hidden;
  position: relative;
}

.signature-boot-inner::before {
  background:
    linear-gradient(180deg, rgba(5, 5, 5, 0.1), rgba(5, 5, 5, 0.94)),
    linear-gradient(105deg, transparent, rgba(241, 240, 234, 0.16), transparent);
  content: "";
  inset: 0;
  position: absolute;
}

.signature-boot-name {
  color: rgba(241, 240, 234, calc(0.08 + var(--boot-progress) * 0.24));
  font-size: clamp(3.2rem, 11vw, 10rem);
  font-weight: 900;
  inset: auto 28px 4px;
  letter-spacing: -0.06em;
  line-height: 0.78;
  position: absolute;
  text-transform: uppercase;
  transform: translateY(calc((1 - var(--boot-progress)) * 34px));
}

.signature-boot-fragments span {
  color: rgba(241, 240, 234, 0.68);
  font-size: 0.66rem;
  font-weight: 760;
  left: calc(var(--x) * 1%);
  letter-spacing: 0.12em;
  position: absolute;
  text-transform: uppercase;
  top: calc(var(--y) * 1%);
  transform:
    translate(
      calc((var(--tx) - var(--x)) * var(--boot-progress) * 1%),
      calc((var(--ty) - var(--y)) * var(--boot-progress) * 1%)
    );
  transition: opacity 120ms linear;
}

@media (prefers-reduced-motion: reduce) {
  .signature-boot {
    display: none;
  }
}
```

- [ ] **Step 4: Run build checks**

Run:

```bash
npm run typecheck
npm run build
```

Expected: both pass.

## Task 2: Research Instrument

**Files:**
- Create: `src/components/ResearchInstrument.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Delete: `src/components/ResearchObservatory.tsx`

- [ ] **Step 1: Create the component**

Create `src/components/ResearchInstrument.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ResearchProject } from "@/lib/data";

type ResearchInstrumentProps = {
  projects: ResearchProject[];
};

const modeBySlug: Record<string, string> = {
  "helix-reca-adjuvants": "molecule",
  "neural-odes-bloch-dynamics": "field",
  "hiapp-oligomer-cytotoxicity": "cell",
  "asthma-exacerbation-prediction": "signal",
  "dna-bridge-detection": "microscopy"
};

export function ResearchInstrument({ projects }: ResearchInstrumentProps) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const mode = modeBySlug[activeProject.slug] ?? "field";

  const markers = useMemo(
    () =>
      projects.map((project, index) => ({
        project,
        percent: projects.length === 1 ? 50 : (index / (projects.length - 1)) * 100
      })),
    [projects]
  );

  return (
    <section className="instrument-section" id="observatory">
      <div className="section-heading">
        <span>Research Instrument</span>
        <h2>Scrub through the questions I keep returning to</h2>
        <p>
          Molecules, fields, cells, signals, and microscopy images are different data,
          but the same habit shows up: make the mechanism easier to see.
        </p>
      </div>

      <div className="instrument-grid">
        <div className={`instrument-stage mode-${mode}`} aria-label={`${activeProject.title} visual mode`}>
          <svg viewBox="0 0 900 520" role="img">
            <g className="instrument-grid-lines">
              {Array.from({ length: 9 }).map((_, index) => (
                <path d={`M ${90 + index * 90} 70 L ${90 + index * 90} 450`} key={`v-${index}`} />
              ))}
              {Array.from({ length: 5 }).map((_, index) => (
                <path d={`M 70 ${100 + index * 80} L 830 ${100 + index * 80}`} key={`h-${index}`} />
              ))}
            </g>
            <g className="instrument-visual">
              {mode === "molecule" ? (
                <>
                  <path d="M165 302 C260 155 408 170 520 272 S675 350 760 190" />
                  <path d="M172 302 C310 390 498 378 650 278" />
                  {[165, 282, 414, 520, 650, 760].map((x, index) => (
                    <circle cx={x} cy={[302, 196, 336, 272, 278, 190][index]} r={index === 2 ? 22 : 13} key={x} />
                  ))}
                </>
              ) : null}
              {mode === "field" ? (
                <>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <path
                      d={`M120 ${180 + index * 34} C265 ${105 + index * 22} 470 ${380 - index * 26} 790 ${176 + index * 42}`}
                      key={index}
                    />
                  ))}
                  <circle cx="460" cy="260" r="54" />
                </>
              ) : null}
              {mode === "cell" ? (
                <>
                  <path d="M110 285 C230 170 360 218 468 286 S650 378 805 240" />
                  <ellipse cx="420" cy="258" rx="76" ry="120" />
                  <ellipse cx="570" cy="286" rx="44" ry="70" />
                  <ellipse cx="300" cy="260" rx="42" ry="58" />
                </>
              ) : null}
              {mode === "signal" ? (
                <>
                  <path d="M105 292 L206 292 L246 176 L305 382 L368 138 L445 292 L806 292" />
                  <path d="M130 388 C290 318 420 342 568 232 S735 145 820 194" />
                  <circle cx="246" cy="176" r="12" />
                  <circle cx="368" cy="138" r="15" />
                  <circle cx="568" cy="232" r="12" />
                </>
              ) : null}
              {mode === "microscopy" ? (
                <>
                  <ellipse cx="275" cy="255" rx="92" ry="62" />
                  <ellipse cx="625" cy="280" rx="112" ry="76" />
                  <ellipse cx="462" cy="200" rx="58" ry="40" />
                  <path d="M360 255 C418 230 466 235 532 266 S620 294 708 280" />
                  <path d="M320 292 C405 360 515 342 625 280" />
                </>
              ) : null}
            </g>
          </svg>
        </div>

        <article className="instrument-readout">
          <span>{activeProject.area}</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.abstract}</p>
          <Link href={`/research/${activeProject.slug}`}>Open research page</Link>
        </article>
      </div>

      <div className="instrument-scrubber" role="tablist" aria-label="Research project selector">
        {markers.map(({ project, percent }) => (
          <button
            aria-selected={project.slug === activeProject.slug}
            className={project.slug === activeProject.slug ? "active" : ""}
            key={project.slug}
            onClick={() => setActiveSlug(project.slug)}
            role="tab"
            style={{ ["--marker-position" as string]: `${percent}%`, ["--accent" as string]: project.color }}
          >
            <span>{project.area}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace homepage import and usage**

Modify `src/app/page.tsx`:

```tsx
import { ResearchInstrument } from "@/components/ResearchInstrument";
```

Replace:

```tsx
<ResearchObservatory projects={researchProjects} />
```

with:

```tsx
<ResearchInstrument projects={researchProjects} />
```

Remove the `ResearchObservatory` import.

- [ ] **Step 3: Add instrument CSS**

Add to `src/app/globals.css` after research-card styles:

```css
.instrument-section {
  margin: 0 auto;
  max-width: 1240px;
  padding: 104px 24px;
  position: relative;
}

.instrument-grid {
  align-items: center;
  display: grid;
  gap: 42px;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, 0.85fr);
  margin-top: 48px;
}

.instrument-stage {
  aspect-ratio: 1.55;
  background:
    linear-gradient(125deg, rgba(255, 255, 255, 0.08), transparent 30%),
    radial-gradient(circle at 50% 50%, rgba(241, 240, 234, 0.08), transparent 52%),
    #070707;
  border: 1px solid rgba(241, 240, 234, 0.16);
  overflow: hidden;
  position: relative;
}

.instrument-stage svg {
  display: block;
  height: 100%;
  width: 100%;
}

.instrument-grid-lines path {
  stroke: rgba(241, 240, 234, 0.045);
  stroke-width: 1;
}

.instrument-visual path {
  animation: drawConcept 4.8s ease-in-out infinite alternate;
  fill: none;
  stroke: rgba(241, 240, 234, 0.62);
  stroke-dasharray: 10 12;
  stroke-linecap: round;
  stroke-width: 2;
}

.instrument-visual circle,
.instrument-visual ellipse {
  animation: conceptPulse 3.6s ease-in-out infinite;
  fill: rgba(241, 240, 234, 0.08);
  stroke: rgba(241, 240, 234, 0.38);
  stroke-width: 1.4;
  transform-box: fill-box;
  transform-origin: center;
}

.instrument-readout {
  border-left: 1px solid rgba(241, 240, 234, 0.16);
  padding-left: 28px;
}

.instrument-readout h3 {
  font-size: clamp(1.9rem, 3.5vw, 3.5rem);
  font-weight: 840;
  letter-spacing: -0.045em;
  line-height: 0.9;
  margin: 16px 0;
  text-transform: uppercase;
}

.instrument-readout p {
  color: var(--muted);
  line-height: 1.76;
}

.instrument-readout a {
  background: var(--ink);
  border-radius: 999px;
  color: #050505;
  display: inline-flex;
  font-size: 0.68rem;
  font-weight: 720;
  letter-spacing: 0.08em;
  margin-top: 18px;
  padding: 11px 16px;
  text-transform: uppercase;
}

.instrument-scrubber {
  border-top: 1px solid rgba(241, 240, 234, 0.16);
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-top: 28px;
  padding-top: 18px;
}

.instrument-scrubber button {
  background: rgba(241, 240, 234, 0.035);
  border: 1px solid rgba(241, 240, 234, 0.14);
  color: rgba(241, 240, 234, 0.62);
  cursor: pointer;
  min-height: 54px;
  padding: 10px;
  text-align: left;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
}

.instrument-scrubber button.active,
.instrument-scrubber button:hover {
  background: rgba(241, 240, 234, 0.08);
  border-color: rgba(241, 240, 234, 0.36);
  color: var(--ink);
}

.instrument-scrubber span {
  font-size: 0.62rem;
  font-weight: 760;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

- [ ] **Step 4: Add responsive instrument CSS**

Add inside `@media (max-width: 900px)`:

```css
.instrument-grid {
  grid-template-columns: 1fr;
}

.instrument-readout {
  border-left: 0;
  border-top: 1px solid rgba(241, 240, 234, 0.16);
  padding-left: 0;
  padding-top: 22px;
}

.instrument-scrubber {
  grid-template-columns: 1fr;
}
```

- [ ] **Step 5: Run checks**

Run:

```bash
npm run typecheck
npm run build
```

Expected: both pass.

## Task 3: Living Paper Block

**Files:**
- Create: `src/components/LivingPaperBlock.tsx`
- Modify: `src/components/MarkdownRenderer.tsx`
- Modify: `src/app/globals.css`
- Delete: `src/components/DistillGraphDemo.tsx`

- [ ] **Step 1: Create `LivingPaperBlock`**

Create `src/components/LivingPaperBlock.tsx`:

```tsx
"use client";

import { useMemo, useState } from "react";

type LivingPaperBlockProps = {
  type: string;
};

const nodes = [
  { x: 16, y: 58, label: "atom" },
  { x: 38, y: 28, label: "motif" },
  { x: 59, y: 58, label: "pocket" },
  { x: 81, y: 32, label: "assay" }
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2]
] as const;

export function LivingPaperBlock({ type }: LivingPaperBlockProps) {
  const [mix, setMix] = useState(55);
  const [depth, setDepth] = useState(2);

  const nodeValues = useMemo(
    () => nodes.map((_, index) => Math.round((index + 1) * mix + depth * 17) % 97),
    [mix, depth]
  );

  if (type !== "graph-message-passing") {
    return (
      <aside className="living-paper-unknown">
        Interactive block unavailable: <code>{type}</code>
      </aside>
    );
  }

  return (
    <section className="living-paper-block" aria-label="Interactive graph message passing explainer">
      <div className="living-paper-copy">
        <span>Living paper</span>
        <h3>When graph messages start to blur the biology</h3>
        <p>
          Increase local mixing and the nodes become harder to distinguish. Increase depth
          and long-range signal arrives, but the model pays for it by washing out local context.
        </p>
        <label>
          Local mixing
          <input min="0" max="100" onChange={(event) => setMix(Number(event.target.value))} type="range" value={mix} />
        </label>
        <label>
          Propagation depth
          <input min="0" max="5" onChange={(event) => setDepth(Number(event.target.value))} type="range" value={depth} />
        </label>
      </div>

      <div className="living-paper-figure">
        <svg viewBox="0 0 100 72" role="img" aria-label="Graph nodes exchanging biological context">
          {edges.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={nodes[from].x}
              x2={nodes[to].x}
              y1={nodes[from].y}
              y2={nodes[to].y}
            />
          ))}
          {nodes.map((node, index) => (
            <g key={node.label}>
              <circle cx={node.x} cy={node.y} r={6 + nodeValues[index] / 30} />
              <text x={node.x} y={node.y + 1.7} textAnchor="middle">
                {node.label.slice(0, 1)}
              </text>
            </g>
          ))}
        </svg>
        <p>
          The interesting failure is not that message passing is weak. It is that biology asks
          for both local identity and long-range context at the same time.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update Markdown renderer**

Modify `src/components/MarkdownRenderer.tsx`:

```tsx
import { LivingPaperBlock } from "./LivingPaperBlock";
```

Replace the existing directive branch:

```tsx
if (trimmed.startsWith(":::interactive ")) {
  const match = trimmed.match(/^:::interactive\s+([a-z0-9-]+)\n:::$/);
  const type = match?.[1] ?? "unknown";
  return <LivingPaperBlock key={index} type={type} />;
}
```

Remove the `DistillGraphDemo` import.

- [ ] **Step 3: Add living paper CSS**

Add near current `.distill-demo` styles:

```css
.living-paper-block {
  align-items: center;
  background:
    linear-gradient(130deg, rgba(255, 255, 255, 0.07), transparent 34%),
    rgba(241, 240, 234, 0.035);
  border: 1px solid rgba(241, 240, 234, 0.16);
  display: grid;
  gap: 28px;
  grid-template-columns: 0.82fr 1fr;
  margin: 38px 0;
  padding: 24px;
}

.living-paper-copy h3 {
  font-size: 1.7rem;
  font-weight: 820;
  letter-spacing: -0.035em;
  line-height: 0.98;
  margin: 12px 0;
  text-transform: uppercase;
}

.living-paper-copy p,
.living-paper-figure p {
  color: rgba(241, 240, 234, 0.7);
  font-size: 0.92rem;
  line-height: 1.62;
}

.living-paper-copy label {
  color: var(--muted);
  display: grid;
  font-size: 0.78rem;
  gap: 8px;
  letter-spacing: 0.04em;
  margin-top: 16px;
  text-transform: uppercase;
}

.living-paper-copy input {
  accent-color: var(--ink);
}

.living-paper-figure svg {
  min-height: 260px;
  width: 100%;
}

.living-paper-figure line {
  stroke: rgba(241, 240, 234, 0.28);
  stroke-width: 0.8;
}

.living-paper-figure circle {
  fill: rgba(241, 240, 234, 0.08);
  stroke: rgba(241, 240, 234, 0.75);
  stroke-width: 0.7;
}

.living-paper-figure text {
  fill: var(--ink);
  font-size: 4px;
  font-weight: 760;
}

.living-paper-unknown {
  border: 1px solid rgba(241, 240, 234, 0.16);
  color: var(--muted);
  margin: 32px 0;
  padding: 16px;
}
```

Add inside `@media (max-width: 900px)`:

```css
.living-paper-block {
  grid-template-columns: 1fr;
}
```

- [ ] **Step 4: Run checks**

Run:

```bash
npm run typecheck
npm run build
```

Expected: both pass.

## Task 4: Polish And Cleanup

**Files:**
- Modify: `src/app/globals.css`
- Delete: `src/components/ResearchObservatory.tsx`
- Delete: `src/components/DistillGraphDemo.tsx`

- [ ] **Step 1: Remove unused imports/files**

Run:

```bash
rg -n "ResearchObservatory|DistillGraphDemo" src
```

Expected after cleanup: no imports from `src/app/page.tsx` or `src/components/MarkdownRenderer.tsx`.

After replacing the imports, delete:

```bash
src/components/ResearchObservatory.tsx
src/components/DistillGraphDemo.tsx
```

- [ ] **Step 2: Verify reduced motion**

Check `src/app/globals.css` includes:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .signature-boot {
    display: none;
  }
}
```

- [ ] **Step 3: Run final verification**

Run:

```bash
npm run typecheck
npm run build
git diff --check
```

Expected: all pass.

- [ ] **Step 4: Restart local preview**

Run:

```bash
npm start -- --hostname 127.0.0.1 --port 3000
```

Expected: local preview is available at `http://127.0.0.1:3000`.

- [ ] **Step 5: Manual smoke checks**

Open:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/blog/biological-graphs-need-world-models
http://127.0.0.1:3000/research/helix-reca-adjuvants
```

Expected:

- Homepage hero still reads cleanly.
- Signature boot appears near first scroll and does not cover the hero name.
- Research instrument switches project modes by click/tap.
- Blog interactive block renders and sliders update the graph.
- Research detail pages still render.
