# Showstopper Experience Design

Date: 2026-05-05
Site: Nikhil Maturi personal website

## Goal

Add one memorable experience system that makes the site feel unlike a standard personal website while staying aligned with Nikhil's work in AI for science.

The experience should help visitors remember three things:

- Nikhil Maturi is the name.
- The work sits at the intersection of AI, biology, medicine, and scientific visualization.
- The site is not only a portfolio; it is a small demonstration of how technical ideas can be made legible.

The design should be impressive but not noisy. The current site already has a strong hero image, dark minimalist tone, and scroll reveals. The showstopper should extend those choices rather than compete with them.

## Design Direction

Use a layered system with one primary memory hook and two supporting experiences:

1. **Signature Boot Sequence**
   A cinematic scroll moment near the hero where tokens, project names, and research fragments briefly assemble into `NIKHIL MATURI`, then resolve into the featured project card.

2. **Research Instrument**
   An upgraded version of the current Research Observatory. Visitors can scrub or hover through project modes: molecule, imaging physics, cellular mechanism, respiratory signal, and microscopy. The visual changes with the selected project.

3. **Living Paper Mode**
   A reusable article/research-page pattern where selected claims expand into small interactive diagrams or mechanism panels. The first implementation should upgrade the current blog interactive block rather than redesign all writing pages.

This hierarchy keeps the site focused: one unforgettable first impression, one interactive research object, and one reusable writing capability.

## Phase 1: Signature Boot Sequence

### Placement

The sequence lives between the hero and the featured project. It should feel like the hero image is handing the page off to the research content.

### Behavior

On first scroll:

- Small tokens and research fragments fade in around the lower hero area.
- Fragments include short, human-readable labels such as `RecA`, `Bloch dynamics`, `hIAPP`, `asthma signals`, `DNA bridges`, `graphs`, `models`, and `mechanism`.
- The fragments drift into a loose typographic arrangement that suggests `NIKHIL MATURI`.
- The arrangement then fades into the featured project card rather than becoming a separate permanent section.

### Tone

The moment should feel like a boot sequence or scientific instrument warming up, not like a loading screen. It should be quick, quiet, and polished.

### Constraints

- Do not hide the hero name behind moving elements.
- Do not add sound.
- Do not require WebGL.
- Respect `prefers-reduced-motion`.
- The sequence should not block navigation or scrolling.

## Phase 2: Research Instrument

### Placement

Replace the current Research Observatory visual and copy while preserving the same content position on the homepage.

### Behavior

The instrument has five project modes:

- **RecA / molecules:** molecular nodes, candidate generation, selectivity path.
- **Bloch dynamics / imaging:** field lines and continuous dynamics.
- **hIAPP / cells:** membrane curves and oligomer contact.
- **Asthma / signals:** streaming time-series and risk threshold.
- **DNA bridges / microscopy:** faint bridge traces between cell-like forms.

Users can select modes by hovering/clicking project markers or dragging/scrubbing a horizontal selector. The right-side text updates with the project title, short description, and link.

### Visual Style

Keep the dark monochrome/chrome aesthetic from the hero. Use restrained accent color from each project, but avoid a rainbow interface. The instrument should look like a serious scientific display.

### Constraints

- Must be usable on mobile with tap controls.
- Must have accessible labels for controls.
- Must degrade to a static project list if JavaScript fails.
- No new dependencies unless implementation proves native React/CSS is not enough.

## Phase 3: Living Paper Mode

### Placement

Start with the existing blog post and Markdown renderer. Add one reusable interactive block type before adding many.

### Behavior

The first block should be an upgraded explainer for graph message passing in biology:

- Visitors can adjust local mixing and propagation depth.
- The diagram shows when node identity blurs and when long-range signal arrives.
- A short side note explains why this matters for biological graphs.

Future Markdown can embed the same component using a directive such as:

```md
:::interactive graph-message-passing
:::
```

### Constraints

- Keep the Markdown pipeline simple.
- Components should be named and versioned enough that old posts do not break.
- Do not turn articles into heavy apps. The interaction should clarify one idea.

## Components

### `SignatureBoot`

A client component mounted on the homepage near the hero/featured boundary.

Responsibilities:

- Observe scroll progress through the hero boundary.
- Render token fragments.
- Animate fragments using CSS transforms and opacity.
- Respect reduced motion.

### `ResearchInstrument`

A client component replacing or refactoring `ResearchObservatory`.

Responsibilities:

- Manage active project state.
- Render project-specific visual modes.
- Render accessible controls.
- Expose project links.

### `LivingPaperBlock`

A client component used by `MarkdownRenderer`.

Responsibilities:

- Render an interactive diagram for a named Markdown directive.
- Keep the API small: directive name in, component out.
- Avoid coupling post content to component internals.

## Data Flow

Research content continues to come from `src/lib/data.ts`.

The homepage passes `researchProjects` into `ResearchInstrument`.

Markdown content continues to come from `content/blog/*.md`. `MarkdownRenderer` maps known interactive directives to React components.

No backend or persistence is needed.

## Error Handling And Fallbacks

- If JavaScript is disabled, show normal text, project cards, and links.
- If `IntersectionObserver` is unavailable, reveal all animated elements immediately.
- If reduced motion is enabled, skip boot choreography and show a simple static token badge or no boot sequence.
- If a Markdown directive is unknown, render a small non-breaking note rather than crashing the page.

## Testing And Verification

Verification should include:

- `npm run typecheck`
- `npm run build`
- Manual homepage checks on desktop and mobile widths.
- Check that scroll animations complete and do not leave content dimmed.
- Check reduced-motion behavior.
- Check that all project links remain reachable.
- Check that blog pages render with and without interactive directives.

## Non-Goals

- No audio.
- No 3D/WebGL requirement.
- No new content management system.
- No full rewrite of the site.
- No heavy animation framework unless native CSS/React is insufficient.

## Implementation Order

1. Build `SignatureBoot` and integrate it with the hero-to-featured transition.
2. Replace `ResearchObservatory` with `ResearchInstrument`.
3. Upgrade the existing blog interactive block into the first `LivingPaperBlock`.
4. Polish responsive behavior and reduced-motion fallbacks.

## Success Criteria

The feature is successful if a first-time visitor can describe the site afterward as:

> “The AI-for-science site with the dark robot hero where the research tokens assemble into Nikhil Maturi, and the projects behave like a scientific instrument.”

That sentence is the memory target.
