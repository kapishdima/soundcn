# Idea Evaluation Frameworks

Detailed frameworks for scoring, filtering, and selecting creative ideas.

## Table of Contents

1. [Core Dimensions](#core-dimensions)
2. [NAF Framework](#naf-framework)
3. [ICE Scoring](#ice-scoring)
4. [RICE Scoring](#rice-scoring)
5. [Weighted Decision Matrix](#weighted-decision-matrix)
6. [Impact/Effort Matrix](#impacteffort-matrix)
7. [Timing & Process](#timing--process)
8. [AI-Specific Evaluation](#ai-specific-evaluation)

---

## Core Dimensions

Most frameworks agree on three fundamental dimensions:

| Dimension | What it measures |
|-----------|-----------------|
| **Novelty / Originality** | How new, surprising, or unique |
| **Usefulness / Resolution** | How well it solves the problem |
| **Elaboration / Synthesis** | How well-developed and refined |

---

## NAF Framework

**Origin:** Synectics creative problem-solving tradition (George Prince)

**Process:**
1. Create table with ideas in rows, N/A/F in columns
2. Score each idea 1-10 on each criterion
3. Sum and rank

**Criteria:**
- **Novelty** -- Is it new for this situation?
- **Attractiveness** -- Does it completely solve the problem?
- **Feasibility** -- Can it be put into practice?

**Interpretation:**
- Feasibility 80%+ (8/10): Worth trying
- Feasibility < 50% but N+A high: Turn concerns into new problems to solve
- Low on all three: Implementation will disappoint

**Why NAF over gut feel:** People slip into "either/or thinking" when selecting ideas. NAF forces structured evaluation while keeping the creative spirit.

---

## ICE Scoring

**Origin:** Sean Ellis / GrowthHackers

```
ICE Score = Impact x Confidence x Ease
```

| Factor | Scale | Description |
|--------|-------|-------------|
| Impact | 1-10 | Potential benefit/value |
| Confidence | 1-10 | How certain are we? |
| Ease | 1-10 | How easy to implement? |

**Best for:** Quick experiments, growth hacking, early-stage ideas
**Weakness:** Subjective, prone to guesstimates

---

## RICE Scoring

**Origin:** Intercom

```
RICE Score = (Reach x Impact x Confidence) / Effort
```

| Factor | Measurement |
|--------|-------------|
| Reach | Users/quarter affected |
| Impact | 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal |
| Confidence | 100%=high, 80%=medium, 50%=low |
| Effort | Person-months |

**Best for:** Data-driven roadmap planning, product teams with metrics

---

## Weighted Decision Matrix

**Process:**
1. List all options (ideas)
2. Define criteria (customer impact, feasibility, strategic fit, etc.)
3. Assign weights as percentages (must sum to 100%)
4. Score each option 1-5 on each criterion
5. Multiply score x weight
6. Sum weighted scores per option
7. Rank by total

**Example:**

| Idea | Customer Impact (40%) | Feasibility (30%) | Strategic Fit (30%) | Total |
|------|----------------------|-------------------|-------------------|-------|
| A | 5 x 0.4 = 2.0 | 3 x 0.3 = 0.9 | 4 x 0.3 = 1.2 | **4.1** |
| B | 3 x 0.4 = 1.2 | 5 x 0.3 = 1.5 | 3 x 0.3 = 0.9 | **3.6** |

**Best for:** Complex decisions with multiple stakeholders

---

## Impact/Effort Matrix

```
         High Impact
              |
   Big Bets   |   Quick Wins  <-- Do these first
              |
  ------------|------------
              |
   Avoid      |   Fill-ins
              |
         Low Impact

  High Effort      Low Effort
```

**Quadrants:**
- **Quick Wins** (High Impact + Low Effort): Do immediately
- **Big Bets** (High Impact + High Effort): Worth investing if resources allow
- **Fill-ins** (Low Impact + Low Effort): Do when time permits
- **Avoid** (Low Impact + High Effort): Deprioritize or discard

---

## Timing & Process

### The Separation Principle

**Generate first, evaluate later.** Most important timing rule.

- During divergent phase: No judgment. Zero.
- Create a transitional phase between generating and judging
- Different mindset required: take a break, or evaluate next day

### Why Premature Evaluation Kills Creativity

- People self-censor
- Teams get stuck on one idea
- Feasible/safe ideas win over novel ones

### Stage-Gate for Ideas

```
Stage 1: Diverge      → Gate 1: Quick screen (NAF/dot vote)
Stage 2: Develop      → Gate 2: Thorough evaluation (matrix/RICE)
Stage 3: Prototype    → Gate 3: Go/No-go based on evidence
```

### Different Ideas Need Different Processes

- Incremental improvements: Standard criteria work
- Disruptive ideas: Don't penalize low feasibility too early -- disruptive ideas often look impractical initially

---

## AI-Specific Evaluation

### The Novelty-Feasibility Trade-off

Research shows two patterns depending on domain:
- Some domains: AI ideas are more novel but less feasible
- Other domains: AI ideas are more feasible but less novel

**Key insight:** The direction depends on domain, AI system, and prompts.

### Evaluating AI-Generated Idea Batches

Beyond individual idea quality, measure **set-level diversity:**

| Metric | What to check |
|--------|---------------|
| Semantic diversity | How different are ideas from each other? |
| Category coverage | Do ideas span multiple approaches? |
| Outlier presence | Any high-risk/high-reward ideas? Or all clustered at safe center? |

### AI "Safe" Ideas Problem

AI defaults to high-feasibility, moderate-novelty ideas because:
- Trained on existing text (synthesizes known patterns)
- Without novelty prompting, converges to "optimal"
- Lacks lived experience for truly novel insights

**Mitigations:**
- Explicitly prompt for novelty
- Use AI for quantity, human judgment for quality
- Apply NAF to separate genuinely novel from merely competent
- Use multiple prompting strategies for diversity

### Human-AI Evaluation Flow

The emerging consensus (2026):
1. AI generates quantity + feasible ideas quickly
2. Humans recognize novelty + apply domain intuition
3. Best outcomes from iterative collaboration: AI generates -> human evaluates -> AI refines -> human selects
