"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

const skillCards = [
  {
    title: "Scope tightly",
    body: "Give the agent a small, observable surface with clear success criteria.",
    accent: "#58c96f"
  },
  {
    title: "Externalize context",
    body: "Move repo rules, domain facts, and failure modes into files the agent can retrieve.",
    accent: "#d8b43b"
  },
  {
    title: "Verify cheaply",
    body: "Turn correctness into tests, oracles, screenshots, and repeatable checks.",
    accent: "#5ba9dd"
  },
  {
    title: "Use tools",
    body: "Browsers, CLIs, renderers, worktrees, and APIs change what the model can do.",
    accent: "#d66bf0"
  },
  {
    title: "Reset early",
    body: "When a run is confused, stop it and restart with better constraints.",
    accent: "#e37951"
  }
];

const galleryPanels = [
  {
    label: "Mechanism",
    src: "/images/nature-skills-gallery/fig1-material-mechanism-rich.png"
  },
  {
    label: "Imaging",
    src: "/images/nature-skills-gallery/fig2-spatial-imaging-rich.png"
  },
  {
    label: "Efficacy",
    src: "/images/nature-skills-gallery/fig3-in-vivo-efficacy-rich.png"
  },
  {
    label: "Single cell",
    src: "/images/nature-skills-gallery/fig4-single-cell-systems-rich.png"
  },
  {
    label: "Perturbation",
    src: "/images/nature-skills-gallery/fig5-validation-perturbation-rich.png"
  }
];

export function AICodingSkillCards() {
  return (
    <figure className="ai-essay-figure skill-cards-figure" aria-label="Five practices for using AI coding tools well">
      <div className="ai-skill-cards">
        {skillCards.map((card) => (
          <div className="ai-skill-card" key={card.title} style={{ "--accent": card.accent } as CSSProperties}>
            <strong>{card.title}</strong>
            <span>{card.body}</span>
          </div>
        ))}
      </div>
      <figcaption>
        A compact operating model: agentic work gets better when the task is bounded, context is findable, and failure is cheap to observe.
      </figcaption>
    </figure>
  );
}

export function AICodingGallery() {
  const [activePanel, setActivePanel] = useState<(typeof galleryPanels)[number] | null>(null);

  useEffect(() => {
    if (!activePanel) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePanel(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [activePanel]);

  return (
    <figure className="ai-essay-figure ai-gallery-figure" aria-label="Gallery of AI-assisted scientific figure styles">
      <div className="ai-gallery-stage">
        {galleryPanels.map((panel, index) => (
          <div className="ai-gallery-panel" key={panel.label}>
            <div className="panel-label">{String.fromCharCode(97 + index)}</div>
            <button
              className="ai-gallery-button"
              type="button"
              onClick={() => setActivePanel(panel)}
              aria-label={`Open ${panel.label} nature-skills figure`}
            >
              <img src={panel.src} alt={`${panel.label} example from the nature-skills gallery`} />
            </button>
            <span>{panel.label}</span>
          </div>
        ))}
      </div>
      {activePanel ? (
        <div
          className="ai-gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${activePanel.label} expanded figure`}
          onClick={() => setActivePanel(null)}
        >
          <div className="ai-gallery-modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="ai-gallery-modal-close" type="button" onClick={() => setActivePanel(null)}>
              Close
            </button>
            <img src={activePanel.src} alt={`${activePanel.label} expanded nature-skills figure`} />
            <span>{activePanel.label}</span>
          </div>
        </div>
      ) : null}
      <figcaption>
        Examples from the nature-skills gallery show the difference between asking for a picture and giving an agent a figure-making workflow.
      </figcaption>
    </figure>
  );
}

export function AgentLoopFigure() {
  const steps = ["Intent", "Constraints", "Agent", "Tool run", "Evidence", "Revision"];

  return (
    <figure className="ai-essay-figure agent-loop-figure" aria-label="Agent workflow from intent to revision">
      <div className="agent-loop">
        {steps.map((step, index) => (
          <div className="agent-loop-node" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
        <div className="loop-track" />
        <div className="loop-pulse" />
      </div>
      <figcaption>
        The useful unit is not a prompt. It is a loop: state the outcome, let the agent act, inspect evidence, and feed the result back.
      </figcaption>
    </figure>
  );
}

export function VerificationRiskFigure() {
  const cells = [
    ["Routine", "Smoke test"],
    ["Repo-specific", "Regression test"],
    ["New integration", "Tool trace"],
    ["Research/OOD", "Independent review"]
  ];

  return (
    <figure className="ai-essay-figure verification-risk-figure" aria-label="Verification needs increase with out-of-distribution tasks">
      <div className="risk-scale">
        {cells.map(([task, check], index) => (
          <div className="risk-cell" key={task}>
            <span>{task}</span>
            <strong>{check}</strong>
            <div className="risk-meter" style={{ "--fill": `${28 + index * 22}%` } as CSSProperties} />
          </div>
        ))}
      </div>
      <figcaption>
        The farther the task is from common code paths or training-distribution demos, the more independent the verification should become.
      </figcaption>
    </figure>
  );
}

export function PromptContrastFigure() {
  return (
    <figure className="ai-essay-figure prompt-contrast-figure" aria-label="Prompting by instructions versus constraints">
      <div className="prompt-contrast">
        <div>
          <span>Instruction-heavy</span>
          <p>Loop through the array, parse every date, filter records, then format the output.</p>
        </div>
        <div>
          <span>Constraint-shaped</span>
          <p>Return only records from the last 30 days. Do not mutate input. Do not add dependencies.</p>
        </div>
      </div>
      <figcaption>
        Constraints preserve agency while putting guardrails around correctness, safety, and maintainability.
      </figcaption>
    </figure>
  );
}

export function ContextMapFigure() {
  return (
    <figure className="ai-essay-figure context-map-figure" aria-label="Externalized knowledge routing map">
      <div className="context-map">
        <div className="context-core">agents.md</div>
        {["auth-context.md", "api-conventions.md", "data-model.md", "failure-modes.md", "test-oracles.md"].map((item) => (
          <div className="context-leaf" key={item}>{item}</div>
        ))}
      </div>
      <figcaption>
        Keep the top-level agent file small. Let it route to sharper context files instead of becoming a giant prompt landfill.
      </figcaption>
    </figure>
  );
}
