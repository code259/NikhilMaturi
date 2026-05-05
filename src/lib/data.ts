export type ResearchProject = {
  slug: string;
  title: string;
  subtitle: string;
  area: string;
  year: string;
  featured?: boolean;
  href?: string;
  color: string;
  abstract: string;
  details: string[];
};

export const researchProjects: ResearchProject[] = [
  {
    slug: "helix-reca-adjuvants",
    title: "Antibiotic Adjuvant Design for RecA",
    subtitle:
      "HELIX is a predictive and generative platform for discovering highly selective RecA inhibitors.",
    area: "Generative Biology",
    year: "Featured",
    featured: true,
    href: "https://code259.github.io/HELIX/",
    color: "#d8d6cd",
    abstract:
      "A platform-style research effort for using predictive and generative modeling to search chemical space for RecA inhibitors that could operate as antibiotic adjuvants.",
    details: [
      "The expanded project page frames HELIX as a closed-loop discovery system: score selectivity, generate candidate scaffolds, and prioritize compounds for experimental follow-up.",
      "The design loop connects molecular representation learning, property prediction, and candidate generation into a workflow that can be extended as experimental evidence arrives.",
      "The public project link is preserved for readers who want to inspect the original HELIX site."
    ]
  },
  {
    slug: "neural-odes-bloch-dynamics",
    title:
      "Neural ODEs to Learn Bloch Dynamics and Replace Differentiable Simulators",
    subtitle:
      "Learning continuous-time imaging physics for inverse MRI-style reconstruction problems.",
    area: "Scientific ML",
    year: "Research",
    color: "#aeb4b8",
    abstract:
      "A scientific machine learning direction that uses Neural ODEs to approximate Bloch dynamics and reduce reliance on expensive differentiable simulation inside inverse imaging loops.",
    details: [
      "The research direction centers on derivations, simulator comparisons, and ablations on stability, identifiability, and reconstruction quality.",
      "The central question is whether a learned dynamics surrogate can retain the structure needed for inverse problems while becoming faster and easier to optimize.",
      "The visual language on the site treats this project as a field-line system: continuous dynamics, measured signals, and inferred latent states."
    ]
  },
  {
    slug: "hiapp-oligomer-cytotoxicity",
    title:
      "Computational Investigation of hIAPP Oligomer Extracellular Cytotoxicity Mechanisms",
    subtitle:
      "Novel therapeutic prevention of beta-cell dysfunction through mechanistic molecular investigation.",
    area: "Computational Biology",
    year: "Research",
    color: "#8f8b83",
    abstract:
      "A computational biology project studying how hIAPP oligomer mechanisms may contribute to extracellular cytotoxicity and beta-cell dysfunction.",
    details: [
      "The project frames mechanism diagrams, simulation snapshots, and therapeutic hypotheses as a connected argument about extracellular toxicity.",
      "The biological question, computational method, and prevention strategy are separated so readers can follow the chain from molecule to cellular outcome.",
      "The project is represented as a membrane-adjacent molecular system in the interactive observatory."
    ]
  },
  {
    slug: "asthma-exacerbation-prediction",
    title:
      "Portable Real-Time Machine Learning Asthma Management System for Exacerbation Prediction",
    subtitle:
      "A deployable prediction system for respiratory risk monitoring and proactive asthma management.",
    area: "Health AI",
    year: "Research",
    color: "#c4c1b8",
    abstract:
      "A portable machine learning system concept for real-time asthma exacerbation prediction, focused on practical monitoring and early intervention.",
    details: [
      "The project describes sensing inputs, model cadence, clinical constraints, and how alerts should be calibrated for trust.",
      "The design treats this work as a signal-monitoring problem with streaming traces and human-facing intervention points.",
      "The methods narrative emphasizes the practical gap between a predictive model and a system a patient could actually live with."
    ]
  },
  {
    slug: "dna-bridge-detection",
    title: "Ultrafine DNA Bridge Detection in Rat Kangaroo Cells",
    subtitle:
      "Microscopy-driven detection of fine cellular structures that are easy to miss visually.",
    area: "Computer Vision",
    year: "Research",
    color: "#73777a",
    abstract:
      "A computer vision and microscopy project focused on detecting ultrafine DNA bridges in rat kangaroo cell imagery.",
    details: [
      "The project focuses on image panels, annotation protocol, model assumptions, and false-positive analysis.",
      "This project sits at the intersection of image processing, biological morphology, and careful validation.",
      "In the observatory, it appears as a microscopy plane with faint bridge-like traces between cellular bodies."
    ]
  }
];

export const contacts = [
  { label: "GitHub", value: "code259", href: "https://github.com/code259" },
  {
    label: "Email",
    value: "nikhilmaturi.dev@gmail.com",
    href: "mailto:nikhilmaturi.dev@gmail.com"
  },
  { label: "X", value: "@MaturiNikh50601", href: "https://x.com/MaturiNikh50601" },
  {
    label: "Bluesky",
    value: "nikhilmaturi.bsky.social",
    href: "https://bsky.app/profile/nikhilmaturi.bsky.social"
  },
  {
    label: "LinkedIn",
    value: "Nikhil Maturi",
    href: "https://www.linkedin.com/in/nikhil-maturi-40a8ab369/"
  }
];
