"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ResearchProject } from "@/lib/data";

type ResearchObservatoryProps = {
  projects: ResearchProject[];
};

export function ResearchObservatory({ projects }: ResearchObservatoryProps) {
  const [active, setActive] = useState(projects[0].slug);
  const activeProject = projects.find((project) => project.slug === active) ?? projects[0];

  const points = useMemo(
    () =>
      projects.map((project, index) => {
        const angle = -86 + index * (312 / Math.max(projects.length - 1, 1));
        const radius = project.featured ? 31 : 39;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * radius * 0.72;
        return { project, x, y };
      }),
    [projects]
  );

  return (
    <section className="observatory-section" id="observatory">
      <div className="section-heading">
        <span>Research Observatory</span>
        <h2>A living map of AI for science work</h2>
        <p>
          An interactive page-section that treats research as a connected field:
          molecules, imaging physics, cellular mechanisms, and health systems as a measured instrument.
          Click or tap the satellites to switch projects.
        </p>
      </div>
      <div className="observatory-grid">
        <div className="observatory-stage" aria-label="Interactive research map">
          <div className="interaction-note">
            <span>Interactive</span>
            <strong>Click the satellites</strong>
          </div>
          <svg viewBox="0 0 100 100">
            <defs>
              <radialGradient id="core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(85,240,199,0.32)" />
                <stop offset="100%" stopColor="rgba(85,240,199,0)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="18" fill="url(#core)" />
            <circle cx="50" cy="50" r="33" className="orbit orbit-a" />
            <circle cx="50" cy="50" r="43" className="orbit orbit-b" />
            {points.map(({ project, x, y }) => (
              <line
                key={`line-${project.slug}`}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                className={project.slug === active ? "signal active" : "signal"}
              />
            ))}
          </svg>
          {points.map(({ project, x, y }) => (
            <button
              key={project.slug}
              className={project.slug === active ? "node active" : "node"}
              style={{ left: `${x}%`, top: `${y}%`, ["--node-color" as string]: project.color }}
              onClick={() => setActive(project.slug)}
              aria-label={`Show ${project.title}`}
            >
              <span />
            </button>
          ))}
          <div className="core-label">
            <strong>AI</strong>
            <span>for science</span>
          </div>
        </div>
        <article className="observatory-readout">
          <span>{activeProject.area}</span>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.abstract}</p>
          <Link href={`/research/${activeProject.slug}`}>Open research page</Link>
        </article>
      </div>
    </section>
  );
}
