---
name: generate-creative-ideas
description: Creative problem-solving and ideation using SCAMPER, First Principles, Random Word, and AI-optimized techniques. Use when generating ideas, breaking creative blocks, brainstorming alternatives, or innovating.
---

# Creativity Skill

## Workflow

```
1. Ask       → "What problem/challenge?"
2. Context   → Understand current state BEFORE suggesting
3. Diagnose  → Match situation to technique(s)
4. Generate  → Walk through technique step-by-step
5. Evaluate  → Score and filter ideas
6. Develop   → Shape top ideas into actionable concepts
7. Output    → Structured ideas + next actions (Thai if user uses Thai)
```

**Context questions (step 2):**
- "What do you currently do?"
- "What have you tried?"
- "What's working? What's not?"

> Anti-pattern: Jumping to solutions without understanding context = generic noise

---

## Situation -> Technique Matrix

| Situation | Techniques | Combination Recipe |
|-----------|------------|-------------------|
| Stuck / No ideas | Random Word, Forced Connections, Oblique Strategies | Random Word -> Forced Connections -> Dot Vote |
| Need breakthrough | First Principles, Challenging Assumptions, Combinatorial Engine | HMW -> Worst Idea -> SCAMPER -> Brainwriting |
| Improve existing | SCAMPER, Reverse Brainstorming, TRIZ-AI | SCAMPER -> Reverse Brainstorm -> Impact/Effort |
| Explore systematically | Morphological Box, Six Thinking Hats, Constraint Injection | Morphological Box -> Constraint Injection -> Clustering |
| Reframe problem | How Might We (HMW), Jobs to be Done | HMW -> JTBD -> First Principles |
| Team ideation | 6-3-5 Brainwriting, Multi-Persona Parallel | Mind Map -> Brainwriting -> Affinity -> Multi-Vote |
| Too many ideas | Impact/Effort Matrix, Idea Clustering, NAF Scoring | Clustering -> NAF Quick Score -> Impact/Effort |
| AI ideas too similar | Divergence Guard, Constraint Injection, Incubation Cycling | Divergence Guard -> Domain Shift -> Incubation |
| Technical/engineering | TRIZ-AI, First Principles | TRIZ -> First Principles -> Assumption Mapping |
| Cross-domain innovation | Combinatorial Engine, Analogical Thinking | Combinatorial Engine -> Analogical -> Constraint |
| **Content ideas** (blog/video/course) | Content Pillars, Audience Pain Points, Gap Analysis | Pillars -> Pain Points -> SCAMPER -> Validate |
| **Business/product ideas** | JTBD, Opportunity Canvas, Lean Validation | JTBD -> HMW -> Morphological -> ICE Score |

---

## Technique Quick Reference

### Divergent (Generate)

| Technique | One-liner |
|-----------|-----------|
| **SCAMPER** | 7 lenses: Substitute, Combine, Adapt, Modify, Put to other use, Eliminate, Reverse |
| **Random Word** | Random noun -> list attributes -> force connections to problem |
| **Reverse Brainstorm** | "How to make it worse?" -> Invert each idea |
| **First Principles** | Strip to fundamentals -> Rebuild from scratch |
| **Six Hats** | 6 perspectives: Facts, Feelings, Risks, Benefits, Ideas, Process |
| **HMW** | Reframe as "How Might We [verb] for [user] so that [outcome]?" |
| **Morphological Box** | Parameters x Variations matrix -> Combine systematically |
| **Analogies** | "How does [other domain] solve this?" |
| **Assumptions** | List assumptions -> Challenge/invert each |
| **Forced Connections** | Combine 2 unrelated concepts |
| **Jobs to be Done** | "When [situation], I want [motivation], so I can [outcome]" |
| **Oblique Strategies** | Random creative prompts to break deadlocks |

### AI-Optimized (Generate + Diversify)

| Technique | One-liner |
|-----------|-----------|
| **Incubation Cycling** | Generate -> Pause -> Fresh restart (no prior context) -> Compare |
| **Combinatorial Engine** | Abstract -> Retrieve 3 domains -> Generalize -> Combine -> Instantiate |
| **Multi-Persona Parallel** | Run 4+ personas SIMULTANEOUSLY (not sequentially) |
| **Constraint Injection** | Add random constraint -> Force novel solutions |
| **Divergence Guard** | Force opposite -> Domain shift -> Absurdity injection |
| **TRIZ-AI** | Apply inventive principles (segmentation, nesting, dynamization, etc.) |
| **Tree of Thoughts** | Explore multiple reasoning branches simultaneously (74% vs CoT 49%) |

### Convergent (Evaluate + Refine)

| Technique | One-liner |
|-----------|-----------|
| **NAF Quick Score** | Rate Novelty + Attractiveness + Feasibility (1-10 each) |
| **Impact/Effort Matrix** | 2x2: Quick Wins, Big Bets, Fill-ins, Avoid |
| **ICE Scoring** | Impact x Confidence x Ease (1-10 each) |
| **Idea Clustering** | Group similar -> Name clusters -> Pick best from each |
| **Dot Voting** | Each person gets 3-5 votes -> Surface favorites |
| **Assumption Mapping** | Map assumptions on Importance x Certainty -> Test riskiest first |

---

## Idea Evaluation

After generating ideas, ALWAYS offer evaluation. Default to **NAF Quick Score**.

### NAF Quick Score (Default)

| Criterion | Question | Scale |
|-----------|----------|-------|
| **Novelty** | How new/surprising is this? | 1-10 |
| **Attractiveness** | How well does it solve the problem? | 1-10 |
| **Feasibility** | How realistic to implement? | 1-10 |

**Interpretation:**
- Total 24-30: Strong candidate -> develop further
- Total 18-23: Promising -> refine or combine
- Total < 18: Weak -> park or discard
- Feasibility 8+: Worth trying (remaining 20% is implementation)
- High N+A but low F: Reframe feasibility barriers as new problems to solve

### When to Use Which Evaluation

| Situation | Method |
|-----------|--------|
| Quick screening (5+ ideas) | NAF or Dot Voting |
| Growth experiments | ICE Scoring |
| Data-driven product decisions | RICE Scoring |
| Complex multi-criteria | Weighted Scoring Matrix |
| Visual team alignment | Impact/Effort 2x2 |

**Rules:**
1. NEVER evaluate during divergent phase -- generate first, judge later
2. Take a break between generating and evaluating (different mindset)
3. Different idea types need different criteria (incremental vs disruptive)

Details: [evaluation.md](references/evaluation.md)

---

## Content Creator Mode

When ideating for blog posts, videos, courses, or social media:

### Step 1: Define Content Pillars (3-5 themes)

```
Pillar = Core theme that reflects expertise + audience needs
Example: Excel -> [Formulas, Data Viz, Automation, Tips & Tricks, Career]
```

### Step 2: Audience-First Ideation

| Source | Questions |
|--------|-----------|
| Pain Points | What frustrates them most? |
| Questions | What do they repeatedly ask? |
| Gaps | What's poorly explained by competitors? |
| Wishes | What do they wish existed? |
| Mistakes | What common errors do they make? |

### Step 3: Generate Ideas (use any technique from matrix)

Apply creativity techniques TO the content pillars:
- SCAMPER on existing popular content
- Reverse brainstorm: "How to make the worst tutorial?"
- Analogies: "How would Netflix teach Excel?"

### Step 4: Validate Before Creating

```
[ ] Search demand? (keyword research)
[ ] Real audience pain point? (comments, surveys)
[ ] Can I add unique value? (gap analysis)
[ ] Fits my pillars? (strategy alignment)
[ ] Would I click this? (title/thumbnail test)
[ ] Can be repurposed? (1 piece -> 5+ formats)
```

### Repurposing Chain

```
Blog post -> YouTube video -> Shorts/Reels -> Social posts -> Email -> Course module
```

Details: [content-ideation.md](references/content-ideation.md)

---

## Idea Development Pipeline

Shape raw ideas into actionable concepts:

```
[Generate] -> [Cluster] -> [Evaluate] -> [Develop] -> [Validate] -> [Execute]
```

### Quick Concept Card (for top ideas)

```
IDEA: [Name]
TAGLINE: [One compelling sentence]
PROBLEM: [What pain it solves]
SOLUTION: [How it works - 2-3 sentences]
TARGET USER: [Who benefits]
KEY INSIGHT: [The "aha" behind this]
EFFORT: [S / M / L]
BIGGEST RISK: [What could go wrong]
QUICKEST TEST: [How to validate cheaply]
NEXT STEP: [One concrete action]
```

### Assumption Mapping (for important ideas)

1. List assumptions: "What must be true for this to work?"
2. Categorize: Desirability / Feasibility / Viability
3. Map on 2x2: Importance (high/low) x Certainty (high/low)
4. Test high-importance + low-certainty FIRST

Details: [idea-pipeline.md](references/idea-pipeline.md)

---

## Output Formats

Use these when presenting ideas to the user:

### Quick List (5+ ideas)

```
1. **[Idea Name]** -- [One-line description]
2. **[Idea Name]** -- [One-line description]
...
```

### Scored List (after evaluation)

```
| # | Idea | N | A | F | Total |
|---|------|---|---|---|-------|
| 1 | ...  | 8 | 9 | 7 | 24    |
```

### Concept Cards (top 3 ideas)

Use the Quick Concept Card format above for each top idea.

### Comparison Matrix (deciding between options)

```
| Criteria     | Idea A | Idea B | Idea C |
|-------------|--------|--------|--------|
| Novelty     | 4/5    | 3/5    | 5/5    |
| Feasibility | 3/5    | 5/5    | 2/5    |
| Impact      | 5/5    | 3/5    | 4/5    |
```

---

## AI Creativity Guidelines

### Key Research Insights (2025-2026)

| Finding | Implication |
|---------|-------------|
| Ask AI HOW to think, not WHAT to think | Process prompts > product prompts |
| Human-first ideation preserves diversity | User brainstorms first, THEN AI expands |
| LLMs match average creativity (52nd percentile) | AI is a partner, not a replacement |
| Homogenization effect (g ~ -0.86) | Use Divergence Guard actively |
| "Creative Scar" -- creativity drops after AI withdrawal | Don't outsource all creative thinking |
| Tree of Thoughts: 74% vs CoT 49% | Use ToT for complex creative tasks |
| Multi-LLM collaboration enhances originality | Stack techniques, vary approaches |
| Only 0.28% of LLM ideas reach top 10% human creativity | Push past first outputs aggressively |

### AI Role Rules

- **Best as:** Exploration partner, constraint enforcer, analogy finder, elaborator
- **Avoid:** Sole ideation source, final decision maker
- **Timing:** After initial human ideation, not before
- **Override rate:** Maintain 15-25% human override for optimal outcomes

### Anti-Patterns

| Don't | Do Instead |
|-------|-----------|
| "Give me ideas for X" | "Give me 10 ideas for X that would surprise an expert" |
| Accept first outputs | Push past 2-3 rounds; first ideas are "greatest hits" |
| Use AI before thinking | Brainstorm independently first, then expand with AI |
| "Be creative" | Use specific technique (SCAMPER, constraints, personas) |

Details: [methodology.md](references/methodology.md) | [prompt-templates.md](references/prompt-templates.md)

---

## References

- **Step-by-step guides**: [techniques.md](references/techniques.md)
- **AI methodology & research**: [methodology.md](references/methodology.md)
- **Random word bank**: [random-words.md](references/random-words.md)
- **Evaluation frameworks**: [evaluation.md](references/evaluation.md)
- **Content creator ideation**: [content-ideation.md](references/content-ideation.md)
- **Idea development pipeline**: [idea-pipeline.md](references/idea-pipeline.md)
- **AI prompt templates**: [prompt-templates.md](references/prompt-templates.md)

---

## Related Skills

- `/triz` — Systematic innovation methodology (complements brainstorming)
- `/deep-research` — Research inspiration and cross-industry solutions
- `/boost-intel` — Critical evaluation of generated ideas
- `/design-business-model` — Apply creative ideas to business models
- `/problem-solving` — Structure the problem before ideating
