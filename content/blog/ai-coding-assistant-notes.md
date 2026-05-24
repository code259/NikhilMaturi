---
title: "AI Coding Assistant Notes"
description: "Notes from using AI coding tools: mindset, prompting tactics, verification, context management, and working in real codebases."
date: "2026-05-24"
readingTime: "18 min"
---

# AI Coding Assistant Notes

These are notes from actually using AI coding tools a lot. Not meant to be a grand theory, more like a practical map of what seems to matter: how to scope tasks, how to verify output, how to manage context, and how to avoid getting tricked by plausible-looking work.

The short version is that AI coding assistants are much better when you stop treating them like a chat box and start treating the whole workflow as the product. The prompt matters, but so do the tools, the repo structure, the test loop, the examples, and the way you recover when the model gets confused.

## Core Mindset

Using AI tools is a skill like any other and there is a wide range of skill capabilities. If defined properly and scoped tightly enough, most things are possible. I used to think LLMs and their corresponding wrappers were poor at creating scientific diagrams, but if you do proper research you can create very high quality images.

:::visual ai-skill-cards
:::

The example that changed my mind on the visual side was [nature-skills](https://github.com/Yuan1z0825/nature-skills), which is an example of high quality scientific diagrams via LLMs. The important thing is not just that the images look good. It is that the workflow gives the model references, standards, and a concrete artifact to optimize toward. That is very different from just asking for a nice picture.

:::visual ai-gallery
:::

The same general principle applies to coding. I wouldn't fire a human after first failure, same with AI. Just need clear thinking, observable actions, and clear delineation.

Assume some incentive misalignment. The model is optimized for producing plausible, confident-sounding output and has a different objective than you: correctness, safety, maintainability, effectiveness. This maps closely to the principal-agent problem in economics, where an agent's incentives diverge from the principal's goals. Build in external verification accordingly.

## What You Can Build

Can build apps, scripts, pipelines to solve very specific problems.

- Example: Naval Ravikant's custom app store.
- Example: Hyperpersonalized tutoring tools that adapt to a student's exact syllabus and learning gaps, not a generic curriculum.
- Example: Internal dashboards that pull from your specific data sources and surface exactly the metrics your team cares about.

The big shift is that small, hyperpersonalized software becomes worth making. Be willing to create hyperpersonalized scripts, tasks, simulations for whatever task you have. This is now possible. Specific educational tools, simulations, etc.

Integration with tools, e.g. Paper, Remotion, increases LLM capabilities, and tool use/MCP on net is a very important thing. Agent-first tooling is critical and improves efficiency tremendously.

- Example: Using [Remotion](https://www.remotion.dev/) to have an agent programmatically generate explainer videos from structured data, not just static slides.
- Example: Connecting an agent to a browser automation tool so it can verify its own web-dependent outputs.

:::visual agent-loop
:::

This is why I think tool use is not a side feature. The moment the model can run something, inspect the result, and loop, you are in a different regime. It can still be wrong, but now there is a path for it to discover that it is wrong.

## Agentic Systems & Scale

Separate from individual use, on a broader scale, can see a world where you have an agentic workflow and you bring that as a skillset to a company.

At first I underestimated the agentic tooling capabilities. Watched one testimonial from the OpenAI channel and this one dev can do like 45 tickets overnight and get like 3 months worth of work done in 3 hours.

Broad level planning is important, but as agents get better and better, reduce the granularity of your plan and give an outline, key metrics/goals, validation methods, etc. This mirrors how good management works: you give senior people the outcome you want and the constraints, not a step-by-step method.

That management analogy is useful because it prevents two bad extremes. You do not want to micromanage every line if the model can find a better path, but you also do not want to give a vague vibe and hope it works. Give the outcome, the constraints, the metrics, and the validation method.

## Working in Real Codebases

Be aware that working in real codebases is much harder than working from scratch. Most demos are from scratch to something, most things in real codebases are absolutely not.

When working in systems, use the AI to understand the codebase, as it enables you to make higher quality decisions later on. Treat the model like a senior engineer onboarding to a new repo: first task is comprehension, not output.

Make codebases easily traversable by agents. This means following typical proper programming principles:

- Simple, modular code.
- Proper, readable naming conventions.
- Documentation.

Make sure to explicitly tell the bot to avoid reinventing the wheel and work within the codebase. Without this, agents will often write net-new implementations of things that already exist in the repo.

This has become one of my default instructions. Before coding, find the existing patterns. Before adding a new helper, search for the old one. Before changing behavior, understand what tests or workflows already depend on it.

## Verification & Failure Handling

Build in external verification methods and testing, or build a verification suite in a separate chat or with a separate bot. The goal is making verification cheap, not making generation perfect. This is analogous to chaos engineering in software infrastructure: don't assume the system works, design so failures are caught fast and cheaply.

Have a clear output to optimize for. That enables coding agents to work much better.

- Example: Karpathy's [autoresearch](https://github.com/karpathy/autoresearch) project, which uses a tight feedback loop between generation and verification.
- Example: Ask Codex to set up a way for it to test its changes in a loop, whether that's computer use or CLI tooling or something else. This is the huge unlock for it to iterate longer.
- Example: Writing a small oracle function, 10-20 lines, that checks whether a generated parser handles your known edge cases, so the agent can self-validate before returning output.

:::visual verification-risk
:::

The key is making the feedback loop cheap enough that the agent can use it repeatedly. If verification requires a human to carefully read everything, the agent will stop early and you become the bottleneck. If verification is a command, an oracle, a screenshot, or a separate critic pass, the model can iterate much longer.

Based on model robustness, more time thinking is not equal to better output. Sometimes, especially for worse models, they spend 30 minutes getting stuck in a rabbit hole. In such cases, terminate and reset.

Closer you get to the frontier the more wary you must become. The magnitude to which your task is out of distribution should be proportional to the thoroughness of your review.

Found that for true research tasks you get a lot of hallucinations in weird ways, where it seems like the task is accomplished but it's just manufactured data or some machination.

## Prompting Tactics

Prompting advice gets overcomplicated, but a few tactics keep paying rent. The theme is mostly the same: force clarity upfront, preserve the model's ability to find a good solution, and then check the result adversarially.

### Ask AI to interview you

Sample prompt: *"Before we start building, interview me about this: What is the core problem this solves? Who is this for? What does success look like? What should this not do? Summarize it back to me before we write any code."*

This is the same reason good consultants and therapists start with structured intake before giving any advice. The interview forces clarification on your end too, not just the model's.

### Meta prompting

Meta prompting is an immensely useful strategy. Most people don't want to write out the necessary level of detail, and meta prompting gives you leverage. Can even do this recursively, but doing it more than twice is finicky.

- Example: Ask the model to generate the prompt you should use for a given task, then use that prompt. One layer of recursion tends to be very high value.

### Write prompts as constraints, not instructions

Write prompts as constraints, not instructions. Invert, always invert. If you give instructions you perhaps prevent the agent from finding a better solution. Instead, give it what it cannot do, to prevent extreme actions, then let it go.

:::visual prompt-contrast
:::

- Borrowed from formal specification and type theory, where you define the shape of a valid solution rather than the steps to reach it.
- Example: Instead of "write a function that loops through the list and filters by date," try "return only records from the last 30 days, do not mutate the input array, do not use external libraries."

This sounds like a small distinction, but in practice it changes the output a lot. You are not telling the model to be passive. You are giving it a box where the solution is allowed to be creative but still has to satisfy the important properties.

### Adversarial checking is huge

Adversarial checking is huge. Ask the same question to multiple different models in multiple different ways. If using LLM APIs, turn up temperature or prompt in a way that reduces inhibitions, and ask LLMs to give you lower probability outcomes.

- Example: Run the same architecture decision past GPT-4o, Claude, and Gemini separately. Where they agree, high confidence. Where they diverge, that's where to dig.
- This mirrors red team exercises in security and war-gaming in military planning, where you deliberately stress-test decisions before committing.

### Examples are king

Examples are king, but beware pigeonholing the agent to just those examples. Tell the agent to get inspired from examples, but also explicitly tell it to search/think beyond them. Get examples of:

- Functions.
- Workflows.
- Designs.
- Whatever.

### Prioritize truth over sycophancy

Prioritize truth over sycophancy at all cost when prompting. Question the agent if things look wrong. Don't blindly accept answers, because hallucination can occur.

I think this is one of the easiest things to underweight. If you ask in a way that implies what answer you want, you often get agreement. Better to explicitly reward correction and disagreement when the evidence points that way.

### Steelman positions you've already rejected

Use the model to steelman positions you've already rejected and use the model as a workaround to human logical fallacies and psychological traps: sunk cost fallacy, confirmation bias, anchoring. The model has no emotional investment in past decisions.

- Example: Describe an architectural decision already made and ask the model to construct the strongest possible case for the alternative. Not to reverse the decision necessarily, but to surface what was underweighted.

### Use voice

Using voice models to dictate is a huge unlock due to the increased information transfer bandwidth. Spoken language is faster and often more nuanced than typed prompts.

## Context & Knowledge Management

Externalize knowledge as much as possible, and make the key agent `.md` file as minimal as possible to prevent forgetting. Can have references to externalized knowledge to use as a file routing system to enable most efficient use of context.

:::visual context-map
:::

- Example: Rather than putting all project context in one bloated `agents.md`, maintain separate domain files, e.g. `auth-context.md`, `data-model.md`, `api-conventions.md`, and reference them by name. The agent retrieves what it needs rather than loading everything upfront.

It is good hygiene to have separate chats for separate tasks unless you want cross-task synthesis or ideation.

For true research tasks, meta prompting well and increasing the specificity of your plan is critical. Go very granular.

Recursively update skills and key contexts.

This is where the workflow starts to compound. If an agent misunderstands you in a useful way, do not just fix that one chat. Update the instruction file, the skill, or the context doc so the same failure is less likely next time.

Automation prompts:

- *Upskill:* "You are an AI skill maintainer. Your job is to review all skills in this project, identify failures or inefficiencies, and automatically improve them. Check execution logs, update skill files, and optimize for better performance."
- *Update agents.md:* "You are an AI agent maintainer. Your job is to review my recent interactions and detect misunderstandings or friction points. Update agents.md to improve future conversations based on observed patterns."

This recursive self-improvement loop has a parallel in lean manufacturing, kaizen: the system continuously audits and improves its own processes rather than relying on periodic top-down reviews.

## Team & Collaborative Use

When working in a team where everyone is using agentic systems, create externalized knowledge with a list of known model failure modes for that system, then share that file with the whole team.

- Example: hallucinating library APIs that don't exist.
- Example: Confidently generating SQL that works syntactically but violates a project-specific schema convention.
- Example: Introducing subtle off-by-one errors in pagination logic that only surface at edge-case record counts.

This is the same practice as aviation's crew resource management manuals, which explicitly document known human error patterns in cockpit procedures and make them part of standard training.

The point is not to make a giant bureaucracy around AI. It is just that once everyone is using agents, the failure modes become part of the team's operating environment. Shared memory helps.

## Token Efficiency

Optimize for token efficiency. Can experiment with things like Chinese for token efficiency. In my experience, using a Chinese-based agent instruction in something like an `agents.md` file is much more efficient. Based on language structure it is theoretically around 30-40% more efficient. Can have the agent automatically port to English or some other language to actually read what is happening.

More parallelization, use git worktrees.

- Example: Spin up three worktrees simultaneously to have separate agents tackle a refactor, a new feature, and a bug fix in parallel, then merge. Similar to parallel processing in systems design: independent tasks should never be serialized.

Try using different harnesses.

- [ohmyopenagent.com](https://ohmyopenagent.com/) — custom harnesses worth giving a try.

Overall, my main takeaway is that the tool gets much better when the surrounding system gets better. Better context, better examples, better verification, better tool access, better resets. The model matters, but the workflow often matters just as much.
