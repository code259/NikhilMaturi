"use client";

import { useMemo, useState } from "react";

const nodes = [
  { x: 16, y: 58, label: "A" },
  { x: 38, y: 28, label: "B" },
  { x: 59, y: 58, label: "C" },
  { x: 81, y: 32, label: "D" }
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2]
];

export function DistillGraphDemo() {
  const [mix, setMix] = useState(55);
  const [pulse, setPulse] = useState(2);

  const nodeValues = useMemo(
    () => nodes.map((_, index) => Math.round((index + 1) * mix + pulse * 13) % 97),
    [mix, pulse]
  );

  return (
    <section className="distill-demo" aria-label="Interactive message passing demo">
      <div className="demo-copy">
        <span>Interactive explainer</span>
        <h3>When local messages lose biological context</h3>
        <p>
          Increase mixing to watch node identities homogenize; increase propagation
          to move signal farther while preserving less local context.
        </p>
        <label>
          Mixing strength
          <input
            type="range"
            min="0"
            max="100"
            value={mix}
            onChange={(event) => setMix(Number(event.target.value))}
          />
        </label>
        <label>
          Propagation step
          <input
            type="range"
            min="0"
            max="5"
            value={pulse}
            onChange={(event) => setPulse(Number(event.target.value))}
          />
        </label>
      </div>
      <svg viewBox="0 0 100 72" role="img" aria-label="Graph message passing diagram">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke="rgba(124, 199, 255, 0.34)"
            strokeWidth="0.7"
          />
        ))}
        {nodes.map((node, index) => (
          <g key={node.label} filter="url(#nodeGlow)">
            <circle
              cx={node.x}
              cy={node.y}
              r={6 + nodeValues[index] / 26}
              fill={`rgba(${85 + nodeValues[index]}, 240, 199, 0.18)`}
              stroke="rgba(245, 245, 245, 0.82)"
              strokeWidth="0.7"
            />
            <text x={node.x} y={node.y + 1.8} textAnchor="middle">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </section>
  );
}
