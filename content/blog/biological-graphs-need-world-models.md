---
title: "Biological Graphs Need World Models"
description: "Why graph neural networks feel right for biology, why they still underdeliver, and what a better AI-for-biology architecture might preserve."
date: "2026-05-04"
readingTime: "8 min"
---

# Biological Graphs Need World Models

Biology is graph-shaped, but today's graph neural networks are not yet the native architecture of biology. Molecules are not just bags of atoms, proteins are not just sequences, cells are not just gene vectors, and disease is not just a label at the end of a pipeline. Each system is made from relations: bonds, pockets, pathways, perturbations, compartments, assays, phenotypes, and experimental contexts.

That makes GNNs feel inevitable. A model that updates entities through their relations should be a natural fit for molecular bioactivity, gene regulation, protein interactions, and cellular mechanism. And yet, in many practical settings, transformers and large pretrained systems still dominate the imagination. The issue is not that graphs are the wrong abstraction. The issue is that most GNNs compress too much of biology into shallow local message passing.

## The bottleneck is not representation, it is routing

Message passing is elegant: a node receives information from its neighbors, updates its state, and repeats this process for a few layers. But biology often depends on interactions that are long-range, multiscale, and conditional. A ligand's effect depends on a binding pocket, the protein family, solvent exposure, conformational motion, assay artifacts, and downstream cellular context. A few rounds of local aggregation can blur exactly the structure we care about.

The failure mode is subtle. A model can look biologically informed because it consumes a molecular graph or a pathway graph, while still destroying the load-bearing structure during pooling, oversmoothing, or shortcut-prone supervision. In that case the graph is present as input but absent as an enduring computational object.

:::interactive graph-message-passing
:::

## What would a stronger architecture preserve?

The next leap may not be "GNN plus attention." It may be a system that treats graphs as latent, dynamic, multiscale world models. Instead of maintaining only atom or node states, the model would keep states for relations, motifs, conformers, pockets, pathways, perturbations, and assays. Instead of accepting one fixed graph, it would infer which relations matter for the current scientific question.

Three design principles seem especially important.

1. Preserve intermediate biological objects. Do not pool away motifs, pockets, complexes, pathways, or cell states before the model has decided which level explains the measurement.

2. Learn task-conditioned routing. The relevant graph for potency is not always the relevant graph for selectivity, toxicity, resistance, or mechanism.

3. Evaluate on counterfactual structure. A benchmark should ask whether a model can predict what changes when we edit a molecule, perturb a pathway, shift an assay, or remove a misleading proxy.

## Why this matters for AI for science

Scientific models are useful when they help choose the next experiment, not only when they score a static benchmark. For biology, that means a model should distinguish a real mechanism from an attractive proxy. It should know when a shortcut improves leaderboard accuracy while weakening prospective usefulness. It should expose uncertainty at the level where a scientist can act.

The practical goal is not a prettier graph encoder. The goal is a model that can carry biological structure through a discovery loop: generate a candidate, predict its behavior, identify the fragile assumptions, and suggest the experiment that would most efficiently test them.

That is where graph learning becomes more than a data format. It becomes a way to keep the object of inquiry alive inside the model.
