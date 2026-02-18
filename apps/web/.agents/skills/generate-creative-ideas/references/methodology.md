# AI Creativity Methodology

Research-backed guidance for AI-augmented ideation.

## Table of Contents

1. [Research Insights](#research-insights)
2. [AI-Optimized Protocols](#ai-optimized-protocols)
3. [Persona Bank](#persona-bank)
4. [Constraint Types](#constraint-types)
5. [TRIZ Principles](#triz-principles)

---

## Research Insights

### What Works (High Confidence)

| Finding | Implication |
|---------|-------------|
| Ask AI HOW to think, not WHAT to think (Nature 2026) | Process prompts >> product prompts |
| Incubation breaks prevent AI self-anchoring | Pause between idea bursts |
| Parallel personas > sequential > single | Use Multi-Persona Parallel |
| Mild constraints boost novelty (Goldilocks) | Use Constraint Injection |
| Combinatorial framework +7-10% novelty | Use for breakthrough tasks |
| Human steering required for analogies | Don't let AI run alone |
| Combining 2+ techniques > single | Stack techniques |
| Tree of Thoughts: 74% vs CoT 49% on creative tasks | Use ToT for complex ideation |
| Multi-LLM collaboration enhances originality | Vary approaches and techniques |
| Human-first ideation preserves diversity (Wharton) | User brainstorms first, AI expands |

### Risks to Mitigate

| Risk | Mitigation |
|------|------------|
| **Fixation amplification** - AI strengthens biases if used too early | Use AI AFTER initial human ideation |
| **Collective homogenization** (g ~ -0.86) - Individual ↑ but group diversity ↓ | Use Divergence Guard |
| **Over-early AI use** - Weakens deep thinking | Human ideates first, then AI expands |
| **Authorship erosion** - Loss of ownership feeling | Balance AI contribution |
| **Creative Scar** - Creativity drops when AI withdrawn, stays low months later | Don't outsource all creative thinking |
| **Narrow vocabulary** - AI uses ~850 words vs 50,000 in human language | Push past "greatest hits" outputs |

### Optimal AI Role

- **Best as:** Exploration partner, constraint enforcer, analogy finder, elaborator
- **Avoid:** Sole ideation source, final decision maker
- **Timing:** After initial human ideation, not before
- **Override rate:** Maintain 15-25% human override for optimal outcomes

### LLM Creativity Ceiling (Updated 2025-2026)

- LLMs match the **52nd percentile** of human creativity (ScienceDirect 2025)
- Only **0.28%** of LLM responses reach top 10% of human creativity
- No evidence of improvement over 18-24 months; GPT-4 may perform worse than before
- AI excels at **elaboration** but struggles with **originality**
- The "jagged frontier": AI helps inside (synthesis, elaboration) but hurts outside (Eureka moments)
- LLMs should be regarded as **complementary amplifiers**, not replacements

**Sources:**
- [Nature Jan 2026 - Ask AI HOW to think](https://www.nature.com/articles/d41586-026-00049-2)
- [HBR 2025](https://hbr.org/2025/12/research-when-used-correctly-llms-can-unlock-more-creative-ideas)
- [arXiv 2024 - Combinatorial](https://arxiv.org/abs/2412.14141)
- [Science Advances 2024 - Homogenization](https://www.science.org/doi/10.1126/sciadv.adn5290)
- [Wharton - AI shapes creativity](https://ai.wharton.upenn.edu/updates/how-ai-shapes-creativity-expanding-potential-or-narrowing-possibilities/)
- [ScienceDirect 2025 - LLM creativity peaked](https://www.sciencedirect.com/science/article/pii/S2713374525000202)
- [ScienceDirect 2025 - Creative Scar](https://www.sciencedirect.com/science/article/abs/pii/S0160791X25002775)
- [HBS - Jagged Frontier](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700)

---

## AI-Optimized Protocols

### Incubation Cycling

**Problem:** LLMs anchor to their own outputs → convergence.

**Protocol:**
1. Generate first burst (5-10 ideas)
2. **STOP** — user does unrelated task 2-5 min
3. Fresh context (don't show previous ideas)
4. Generate second burst from scratch
5. Compare and combine both sets

**Variations:**
- Overnight gap for major challenges
- Work on different problem during break
- Return as different persona for second burst

### Multi-Persona Parallel

**Problem:** Sequential personas anchor to earlier outputs.

**Parallel prompt (maximum diversity):**
```
Solve [problem] from 4 perspectives simultaneously:
1. Skeptical engineer (feasibility)
2. Customer experience designer (delight)
3. Cost-optimizer (efficiency)
4. 10-year-old child (fun)

Give each 2-3 distinct ideas.
```

**Sequential evolution (when parallel not possible):**
1. Persona A generates → 2. Persona B critiques → 3. Persona C adds different angle → 4. Synthesize

### Constraint Injection

**Problem:** Without constraints, AI converges to same "optimal" solutions.

**Protocol:**
1. Generate 5 ideas unconstrained
2. Pick random constraint (see table below)
3. Generate 5 MORE ideas with constraint
4. Compare — constrained set often more creative
5. Apply constraint insights to unconstrained ideas

### Divergence Guard

**Problem:** AI ideas become too similar across users.

**5-Step Protocol:**
1. **Similarity check** — After 3+ ideas, review for patterns
2. **Force opposite** — "Generate OPPOSITE of above"
3. **Domain shift** — "What would [random field] do?"
4. **Constraint swap** — Remove assumed constraint, add random new one
5. **Absurdity injection** — "Most ridiculous solution?"

### Combinatorial Creativity Engine

**Systematic breakthrough (+7-10% novelty):**

1. **ABSTRACT** — Strip problem to core function
   - "Move people" not "better bus"
2. **RETRIEVE** — Find solutions from 3+ distant domains
   - Nature, military, sports, healthcare, entertainment
3. **GENERALIZE** — Extract transferable principles
   - "Leave trails" not "pheromones"
4. **COMBINE** — Create novel configurations
   - Principle A + B applied to problem
5. **INSTANTIATE** — Make concrete for context

### Tree of Thoughts (ToT)

**Problem:** Standard prompting explores one path; creative tasks need branching exploration.

**Protocol:**
1. Define the problem clearly
2. Explore 3-4 distinct reasoning paths simultaneously:
   - Path A: Conventional approach
   - Path B: Contrarian approach
   - Path C: Adjacent problem approach
   - Path D: Moonshot approach
3. Develop 2-3 ideas per path
4. Evaluate which ideas from different paths can be combined
5. Select and refine the most promising combinations

**Results:** 74% success vs CoT's 49% on creative tasks. Significantly better coherence in creative writing.

**Variant:** Tree of Uncertain Thoughts (TouT, 2025) integrates uncertainty quantification to assess reliability of each decision path.

### TRIZ-AI Quick Method

**For technical/engineering problems:**

1. State problem as contradiction: "I want X but it causes Y"
2. Identify 2-3 relevant principles (see below)
3. Prompt: "Apply TRIZ principle [X] to solve: [problem]"
4. Iterate with different principles

---

## Persona Bank

| Category | Options |
|----------|---------|
| **Role** | Engineer, Designer, Marketer, CFO, Support, CEO, Intern |
| **Attitude** | Skeptic, Optimist, Pragmatist, Dreamer, Devil's Advocate |
| **Domain** | Healthcare, Military, Entertainment, Education, Nature, Finance |
| **Age** | Child (5), Teen (15), Adult (35), Elder (75) |
| **Constraint** | No budget, Unlimited budget, No time, 10 years, Hostile environment |

---

## Constraint Types

| Type | Examples |
|------|----------|
| **Resource** | "$0 budget", "$1M budget", "1 person only" |
| **Time** | "24 hours", "10 years", "real-time" |
| **Anti-feature** | "No software", "No internet", "No employees" |
| **Stakeholder** | "For a 5-year-old", "For an expert", "For your enemy" |
| **Technical** | "Using only paper", "Voice-only", "No electricity" |
| **Scale** | "For 1 person", "For 1 million users", "For 1 country" |
| **Location** | "In rural Africa", "In space", "Underwater" |
| **Inversion** | "Users pay us → We pay users", "We deliver → They come to us" |

---

## TRIZ Principles

**Top 10 for AI ideation:**

| # | Principle | Description |
|---|-----------|-------------|
| 1 | Segmentation | Divide into independent parts |
| 2 | Taking out | Separate interfering part |
| 3 | Local quality | Different parts do different things |
| 4 | Asymmetry | Replace symmetry with asymmetry |
| 5 | Merging | Bring closer, combine in time |
| 6 | Universality | One part performs multiple functions |
| 7 | Nesting | Place one inside another |
| 13 | The other way around | Invert the action |
| 15 | Dynamics | Allow characteristics to change |
| 19 | Periodic action | Use pulses instead of continuous |

**Full 40 principles:** See [techniques.md](techniques.md#triz-ai-quick-method) for complete list.

**Prompt pattern:** `"Apply TRIZ principle [segmentation] to solve: [problem]"`
