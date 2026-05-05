import type { ResearchProject } from "@/lib/data";

type ResearchConceptMotionProps = {
  project: ResearchProject;
};

const motifBySlug: Record<string, string> = {
  "helix-reca-adjuvants": "molecule",
  "neural-odes-bloch-dynamics": "field",
  "hiapp-oligomer-cytotoxicity": "membrane",
  "asthma-exacerbation-prediction": "signal",
  "dna-bridge-detection": "microscopy"
};

export function ResearchConceptMotion({ project }: ResearchConceptMotionProps) {
  const motif = motifBySlug[project.slug] ?? "field";

  return (
    <figure className={`concept-motion motif-${motif}`} aria-label={`${project.title} concept animation`}>
      <svg viewBox="0 0 720 420" role="img">
        <defs>
          <radialGradient id={`glow-${project.slug}`} cx="50%" cy="48%" r="58%">
            <stop offset="0%" stopColor={project.color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={project.color} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`line-${project.slug}`} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="rgba(241,240,234,0)" />
            <stop offset="48%" stopColor="rgba(241,240,234,0.82)" />
            <stop offset="100%" stopColor="rgba(241,240,234,0)" />
          </linearGradient>
        </defs>
        <rect width="720" height="420" rx="0" className="concept-bg" />
        <circle cx="360" cy="210" r="154" fill={`url(#glow-${project.slug})`} />
        <g className="concept-grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <path d={`M ${80 + index * 70} 48 L ${80 + index * 70} 372`} key={`v-${index}`} />
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <path d={`M 54 ${70 + index * 70} L 666 ${70 + index * 70}`} key={`h-${index}`} />
          ))}
        </g>
        {motif === "molecule" ? (
          <g className="concept-molecule">
            <path d="M202 222 C270 126 376 124 454 202 S548 262 600 170" />
            <path d="M202 222 C286 302 418 312 520 218" />
            {[202, 286, 368, 454, 520, 600].map((x, index) => (
              <circle cx={x} cy={[222, 160, 274, 202, 218, 170][index]} r={index === 2 ? 18 : 11} key={x} />
            ))}
          </g>
        ) : null}
        {motif === "field" ? (
          <g className="concept-field">
            {[0, 1, 2, 3, 4].map((index) => (
              <path
                d={`M96 ${126 + index * 34} C214 ${68 + index * 18} 350 ${304 - index * 16} 626 ${126 + index * 36}`}
                key={index}
              />
            ))}
            <circle cx="360" cy="210" r="44" />
          </g>
        ) : null}
        {motif === "membrane" ? (
          <g className="concept-membrane">
            <path d="M86 235 C164 158 246 174 322 226 S488 310 634 206" />
            <path d="M86 270 C184 204 266 216 346 264 S500 332 634 242" />
            <ellipse cx="386" cy="224" rx="58" ry="92" />
            <ellipse cx="494" cy="244" rx="36" ry="56" />
            <ellipse cx="268" cy="214" rx="34" ry="48" />
          </g>
        ) : null}
        {motif === "signal" ? (
          <g className="concept-signal">
            <path d="M84 238 L162 238 L190 154 L232 300 L276 118 L332 238 L636 238" />
            <path d="M122 308 C230 260 326 278 432 202 S566 136 646 166" />
            <circle cx="190" cy="154" r="10" />
            <circle cx="276" cy="118" r="12" />
            <circle cx="432" cy="202" r="10" />
          </g>
        ) : null}
        {motif === "microscopy" ? (
          <g className="concept-microscopy">
            <ellipse cx="210" cy="204" rx="76" ry="54" />
            <ellipse cx="506" cy="232" rx="92" ry="62" />
            <ellipse cx="374" cy="156" rx="48" ry="34" />
            <path d="M282 204 C330 186 366 188 420 218 S488 250 562 232" />
            <path d="M248 236 C320 288 412 280 506 232" />
          </g>
        ) : null}
        <path className="concept-scanline" d="M72 318 L648 96" stroke={`url(#line-${project.slug})`} />
      </svg>
    </figure>
  );
}
