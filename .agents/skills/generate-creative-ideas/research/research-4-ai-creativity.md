# Latest AI Creativity Research (2025-2026)

> Comprehensive research findings on AI and creativity, covering new papers, techniques, limitations, best practices, and tools.

---

## 1. New Research Papers (2025-2026)

### 1.1 Can LLMs Be Truly Creative? Latest Findings

**The consensus: LLMs match average human creativity but do not exceed it.**

- A [systematic literature review and meta-analysis (arXiv, May 2025)](https://arxiv.org/pdf/2505.17241) found that GenAI matches the **average** human creative output rather than exhibiting superhuman creativity. GenAI performs better on simple, standardized creativity tests (alternative uses task, consequences task) than on complex, elaborative tasks like creative writing.

- A [ScienceDirect study (May 2025)](https://www.sciencedirect.com/science/article/pii/S1871187125001191) found the best LLMs (Claude and GPT-4) rank in the **52nd percentile** against humans. LLMs excel in divergent thinking and problem solving but lag in creative writing. When questioned 10 times, an LLM's collective creativity equals 8-10 humans.

- A study on whether [LLM creativity has peaked (ScienceDirect, 2025)](https://www.sciencedirect.com/science/article/pii/S2713374525000202) found **no evidence of increased creative performance over the past 18-24 months**, with GPT-4 performing worse than in previous studies. Only **0.28%** of LLM-generated responses reached the top 10% of human creativity benchmarks.

- [Nature Scientific Reports (2025)](https://www.nature.com/articles/s41598-025-21398-4) compared human participants against ChatGPT-4o, DeepSeek-V3, and Gemini 2.0 on divergent and convergent thinking assessments. AI outperformed on average, but the best human ideas still matched or exceeded chatbot outputs.

- A [Journal of Creativity article (2026)](https://www.sciencedirect.com/science/article/pii/S2713374525000214) argues that LLMs should be regarded as **complementary amplifiers** of human cognition, rather than being "on par" in nature and capacities. LLMs lack motivation, thinking, and perception -- properties that prevent them from reaching transformational creativity.

### 1.2 AI Creativity Benchmarks and Tests

- **CreativeMath Benchmark (AAAI 2025):** The [CreativeMath benchmark](https://github.com/JunyiYe/CreativeMath) assesses LLMs' ability to propose novel solutions to mathematical problems from middle school to Olympic-level. Gemini-1.5-Pro outperformed other LLMs, but overall capacity for creative problem-solving was limited.

- **Advertising Creativity Benchmark (June 2025):** [Springboards launched the world's first LLM Creativity Benchmark](https://springboards.ai/blog-posts/advertising-industry-associations-partner-to-launch-worlds-first-llm-benchmark-for-creativity) for advertising, evaluating which LLMs are most useful for creative inspiration, variation, and problem-solving across the advertising process.

- **Modified Torrance Tests:** A [Machine Intelligence Research paper (2025)](https://link.springer.com/article/10.1007/s11633-025-1546-4) adapted the modified Torrance Tests of Creative Thinking, evaluating LLM performance across 7 tasks on fluency, flexibility, originality, and elaboration. Key finding: LLMs fall short in **originality** while excelling in **elaboration**.

- **HeuriGym (June 2025):** A [Cornell paper](https://www.cs.cornell.edu/gomes/pdf/2025_chen_arxiv_heurigym.pdf) introduced HeuriGym for evaluating heuristic reasoning. Even GPT-o4-mini-high and Gemini-2.5-Pro achieved QYI scores around 0.6, underscoring limited effectiveness in realistic problem-solving settings.

### 1.3 Human-AI Co-Creation Studies

- **CHI 2025 -- IdeationWeb:** [IdeationWeb](https://dl.acm.org/doi/10.1145/3706598.3713375) proposes a human-AI co-ideation framework using structured idea representation, analogy-based reasoning, and interactive visualization to systematically explore design spaces.

- **CHI 2025 -- AIdeation:** [AIdeation](https://dl.acm.org/doi/10.1145/3706598.3714148), a system for concept designers in entertainment, showed significant enhancement in creativity, ideation efficiency, and satisfaction (all p<.01) with 16 professional designers.

- **Cambridge University Press (Sept 2025):** A [co-ideation framework with custom GPT](https://www.cambridge.org/core/journals/ai-edam/article/enhancing-designer-creativity-through-humanai-coideation-a-cocreation-framework-for-design-ideation-with-custom-gpt/BCC2CBE43EECE6F0D937BBC0D2F44868) found that co-ideation with custom GPT outperformed traditional ideation methods in novelty and quality.

- **Frontiers in Computer Science (Sept 2025):** The [HAI-CDP model](https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1672735/full) showed that the Human-AI Co-Creative Design Process substantially improves creative performance. For **novices**, the value lies in facilitating idea generation; for **experienced designers**, it contributes to elevating quality and refinement.

- **Frontiers in Psychology (Nov 2025):** Research on [why AI is perceived as a preferred co-creation partner](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1695532/full) found that perceived novelty and perceived usefulness are key mechanisms linking co-creator types to co-creation intention.

### 1.4 Computational Creativity Advances

- **Human-AI Co-Ideation via OC-GAN (June 2025):** [This paper](https://www.tandfonline.com/doi/full/10.1080/09544828.2025.2504309) proposes an Object Combination Generative Adversarial Network for combinational creativity, demonstrating strong cross-domain concept combination capabilities.

- **Agency in Human-AI Collaboration (2025):** [Research](https://www.tandfonline.com/doi/full/10.1080/10400419.2025.2587803) found that creative agency in human-AI collaboration is neither static nor monolithic -- it evolves based on the user's stage in the process (ideation vs. refinement), confidence, and system capacity.

### 1.5 AI Ideation Quality vs Human Ideation

**The core tension: individual gain vs. collective loss.**

- The landmark [Science Advances study](https://www.science.org/doi/10.1126/sciadv.adn5290) found that AI access causes stories to be evaluated as more creative, better written, and more enjoyable, **especially among less creative writers**. However, AI-enabled stories are **more similar to each other** than human-only stories.

- A [large dynamic experiment (arXiv)](https://arxiv.org/html/2401.13481v3) provided evidence that AI ideas affect the creativity, diversity, and evolution of human ideas at scale.

- [Wharton research](https://ai.wharton.upenn.edu/updates/how-ai-shapes-creativity-expanding-potential-or-narrowing-possibilities/) found that **when** AI enters the creative process matters greatly. When humans generate initial ideas and AI supports evaluation, diversity is preserved. When AI is used in early ideation, outputs converge.

---

## 2. New Techniques and Frameworks

### 2.1 Tree of Thoughts (ToT) for Ideation

[Tree of Thoughts](https://arxiv.org/abs/2305.10601) (originally Google DeepMind + Princeton) enables exploration over multiple reasoning paths simultaneously. Key results:

- In the "Game of 24," ToT achieved **74% success** vs. CoT's 49%
- In crossword puzzles, ToT improved word-level success to **60%** vs. CoT's 15.6%
- For creative writing, ToT generates more **coherent passages** than few-shot and CoT prompting (judged by GPT-4 and human evaluators)
- **Tree of Uncertain Thoughts (TouT):** A 2025 evolution integrating uncertainty quantification to assess reliability of each decision path

Source: [Prompt Engineering Guide - ToT](https://www.promptingguide.ai/techniques/tot), [IBM - Tree of Thoughts](https://www.ibm.com/think/topics/tree-of-thoughts)

### 2.2 Multi-Agent Creativity

- A [2025 ACM DIS Conference paper](https://dl.acm.org/doi/10.1145/3715336.3735823) explored how early adopters design with multi-agent generative AI for creative workflows. Agent systems can chain capabilities for brainstorming, especially "blank page" scenarios.
- Multi-LLM collaboration can enhance originality, as found in the [Machine Intelligence Research study](https://link.springer.com/article/10.1007/s11633-025-1546-4) -- using multiple LLMs together helps overcome individual LLM originality limitations.
- Market for multi-agent systems projected to surge from $7.8B to over $52B by 2030. Gartner predicts 40% of enterprise apps will embed AI agents by end of 2026.
- Key protocols: Anthropic's **MCP** and Google's **A2A** for agent interoperability.

Source: [Machine Learning Mastery - Agentic AI Trends 2026](https://machinelearningmastery.com/7-agentic-ai-trends-to-watch-in-2026/)

### 2.3 Prompt Engineering for Creativity

Key techniques documented for 2025-2026:

| Technique | Description | Use Case |
|-----------|-------------|----------|
| **Tree of Thoughts** | Explore multiple reasoning branches | Complex brainstorming, planning |
| **Multi-Perspective Simulation** | Virtual expert panel in one conversation | Strategic analysis (~70% identify overlooked considerations) |
| **Controlled Creative Hallucination** | Channel speculation into structured innovation | ~30% ideas survive feasibility analysis |
| **Temperature Tuning** | 0.8-1.0 for creative tasks | Brainstorming, ideation |
| **Meta-Prompting** | AI helps create better prompts | Improving prompt effectiveness |
| **Reflection Prompting** | AI reviews/critiques its own answer | Quality refinement |
| **Role-Play Settings** | Assign personas to the LLM | Significantly influences creativity output |

Sources: [DEV Community Guide](https://dev.to/fonyuygita/the-complete-guide-to-prompt-engineering-in-2025-master-the-art-of-ai-communication-4n30), [Lakera Guide](https://www.lakera.ai/blog/prompt-engineering-guide), [Data Unboxed - 15 Techniques](https://www.dataunboxed.io/blog/the-complete-guide-to-prompt-engineering-15-essential-techniques-for-2025)

### 2.4 Chain-of-Thought for Creative Tasks

Chain-of-Thought (CoT) remains foundational but has been superseded by more advanced variants for creative work:

- **Standard CoT** -- good for reasoning, less effective for branching creative exploration
- **ToT** -- better for creative tasks requiring multiple parallel explorations
- **Reflection/Self-critique** -- useful for iterating on creative output quality

### 2.5 Multi-Step Creative Workflow

A structured 5-step approach gaining traction:
1. **Brainstorm** -- Use AI to generate creative concepts
2. **Develop** -- Use AI to expand the best concept into a detailed plan
3. **Challenge** -- Use AI to identify potential issues and solutions
4. **Timeline** -- Create implementation schedule
5. **Measure** -- Generate evaluation criteria

---

## 3. AI Creativity Limitations (Updated)

### 3.1 Known Failure Modes

1. **Originality deficit:** LLMs primarily fall short in originality while excelling in elaboration ([Machine Intelligence Research, 2025](https://link.springer.com/article/10.1007/s11633-025-1546-4))
2. **Pattern matching, not insight:** Success often stems from pattern matching rather than genuine creative insight. Performance degrades significantly with minor problem phrasing alterations ([Berkeley Tech Report, 2025](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2025/EECS-2025-121.pdf))
3. **Narrow vocabulary:** Bots tend to populate outputs from ~850 words, while human language has ~50,000 words. "The machine plays the greatest hits over and over again" ([Nature, Jan 2026](https://www.nature.com/articles/d41586-026-00049-2))
4. **No creativity improvement over time:** No evidence of increased creative performance over 18-24 months; GPT-4 may perform worse than before ([ScienceDirect, 2025](https://www.sciencedirect.com/science/article/pii/S2713374525000202))
5. **Fragile performance:** LLM performance on benchmarks exhibits significant degradation with minor alterations in problem phrasing

### 3.2 Types of Creativity: Where AI Excels vs. Struggles

| AI Excels At | AI Struggles With |
|-------------|-------------------|
| Elaboration (expanding ideas) | True originality |
| Divergent thinking (standard tests) | Complex creative writing |
| Alternative Uses Task | Transformational creativity |
| Consequences Task | "Eureka" / discontinuous insights |
| Pattern-based creativity | Emotional resonance |
| Synthesis and summary | Novel mathematical solutions |
| Fluency (quantity of ideas) | Breaking established patterns |
| Convergent thinking (optimal solutions) | Divergent thinking (breaking boundaries) |

### 3.3 Convergence/Homogenization

This is one of the most robust findings across 2025 research:

- **Meta-analytic evidence:** Significant decrease in idea diversity (pooled g ~ -0.86) when collaborating with AI ([arXiv meta-analysis, 2025](https://arxiv.org/pdf/2505.17241))
- **Two sources of convergence:**
  1. **Algorithmic monoculture** -- large models amplify mainstream patterns from standardized corpora
  2. **Human anchoring** -- users gravitate toward AI suggestions, narrowing lexical and conceptual diversity
- **The "Creative Scar" effect:** Creativity drops remarkably when AI is withdrawn, and content homogeneity **keeps climbing even months later**. Users develop a "creativity illusion" -- they don't truly acquire creative ability, just temporarily borrow it ([ScienceDirect, 2025](https://www.sciencedirect.com/science/article/abs/pii/S0160791X25002775))
- **Survey data homogenization:** 34% of research participants used LLMs for open-ended survey questions, creating more homogeneous and positive responses ([SAGE Journals, 2025](https://journals.sagepub.com/doi/10.1177/00491241251327130))

### 3.4 The "Jagged Frontier" of AI Creativity

The concept from the [Harvard Business School / BCG study](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700) (758 consultants) describes AI's uneven capability landscape:

**Inside the frontier (AI helps):**
- Synthesis, summarization, creating slide content
- Workers completed 12% more tasks, 25% faster, 40% higher quality
- Creative analogies and themed descriptions
- Reading, math, general knowledge, reasoning

**Outside the frontier (AI hurts):**
- Consultants using AI for outside-frontier tasks were **19% less likely** to deliver correct solutions
- Tasks requiring "Eureka" moments / discontinuous insights
- Contextual judgment, emotional nuance
- Tasks requiring memory of new information and learning from it
- Real-world interaction (accessing files, emailing authors, etc.)

**Key insight:** Even small "jagged" gaps can create bottlenecks that prevent full automation. The frontier is unevenly distributed and may never fully overlap with human tasks.

Sources: [One Useful Thing](https://www.oneusefulthing.org/p/the-shape-of-ai-jaggedness-bottlenecks), [Philippa Hardman (Oct 2025)](https://drphilippahardman.substack.com/p/defining-and-navigating-the-jagged)

---

## 4. Best Practices for Human-AI Creative Collaboration

### 4.1 When to Use AI vs. When to Think Alone

**Critical insight from [Nature (Jan 2026)](https://www.nature.com/articles/d41586-026-00049-2):** Ask AI **how** to think, not **what** to think. When people ask "give me hypotheses," they defer to the bot. When they ask "what process should I use to generate hypotheses," their own scores skyrocket.

| Use AI For | Think Alone For |
|-----------|----------------|
| Expanding on existing ideas | Initial divergent thinking |
| Generating quantity/variations | Breakthrough / "Eureka" ideas |
| Exploring unfamiliar domains | Emotional/personal creative work |
| Evaluating and refining ideas | Setting creative direction |
| Process guidance ("how to think") | Judgment calls on quality |
| Overcoming blank-page paralysis | Ensuring diversity of thought |
| Iteration and variation | Novel framing of problems |

### 4.2 Optimal Handoff Points

Based on [Wharton research](https://ai.wharton.upenn.edu/updates/how-ai-shapes-creativity-expanding-potential-or-narrowing-possibilities/):

1. **Human first, AI second:** When humans generate initial ideas and AI supports evaluation/refinement, diversity is preserved
2. **AI early = convergence:** When AI is used in early ideation, outputs converge
3. **Recommended flow:**
   - Step 1: Human divergent thinking (brainstorm independently)
   - Step 2: AI expansion (generate variations, explore adjacent spaces)
   - Step 3: Human selection and judgment
   - Step 4: AI refinement and elaboration
   - Step 5: Human final creative direction

### 4.3 Prompting for More Novel/Diverse Ideas

Strategies from the research:

1. **Ask for process, not product:** "What frameworks can I use to think about X?" rather than "Give me ideas for X"
2. **Use multiple LLMs together:** Collaboration among multiple LLMs enhances originality ([Machine Intelligence Research](https://link.springer.com/article/10.1007/s11633-025-1546-4))
3. **High temperature settings:** 0.8-1.0 for brainstorming
4. **Role-play and persona prompts:** Significantly influence creativity output
5. **Tree of Thoughts:** Explore multiple branches simultaneously
6. **Multi-Perspective Simulation:** Run virtual expert panels
7. **Controlled Creative Hallucination:** Channel speculation into structured innovation (~30% ideas survive feasibility)
8. **Explicit diversity instructions:** Ask for "10 ideas that are as different from each other as possible"
9. **Domain crossing:** Ask AI to apply concepts from unrelated fields

### 4.4 Avoiding "Average" Ideas from AI

Key strategies:

1. **Don't accept first outputs:** AI's initial responses are its "greatest hits" -- most probable, most average
2. **Iterate aggressively:** Push past the first 2-3 rounds of ideas
3. **Maintain 15-25% human override rate:** [MIT Sloan research](https://killerinnovations.com/your-brain-on-ai-the-shocking-decline-in-creative-thinking-2025/) suggests this rate for optimal outcomes
4. **Generate independently first:** Do your own brainstorm before consulting AI
5. **Use AI for expansion, not shortcut:** The goal is to expand thinking, not replace it
6. **Reject and redirect:** Explicitly tell AI "these are too conventional, give me stranger/more unusual ideas"
7. **Protect divergent thinking:** Pre-AI idea generation ability has dropped from 8-12 unique ideas to 3-5 due to cognitive atrophy

### 4.5 The "Creative Scar" Warning

From [ScienceDirect (2025)](https://www.sciencedirect.com/science/article/abs/pii/S0160791X25002775): Withdrawal of AI assistance causes creativity to drop remarkably, and homogeneity continues climbing even months later. This suggests:

- **Don't outsource all creative thinking** -- maintain your own creative muscles
- **Use AI as a sparring partner, not a replacement**
- **Regular "AI-free" creative exercises** to prevent cognitive atrophy

---

## 5. Tools and Platforms

### 5.1 AI Creativity Tools Gaining Traction (2025-2026)

**Visual/Design:**
- **Adobe Firefly & Firefly Boards** -- AI-powered ideation, Generative Fill is now top-5 most used Photoshop feature; 2/3 of beta users use generative AI daily
- **MidJourney V6 + DALL-E 3** -- Image generation for visual ideation
- **Runway Gen-3** -- Video generation and creative exploration
- **Artbreeder, Stable Diffusion** -- Image generation and remixing

**Writing/Content:**
- **ChatGPT 5 with plugins** -- General-purpose creative ideation
- **Jasper AI X** -- Marketing and content creativity
- **Sudowrite** -- Fiction and creative writing assistance
- **Writesonic** -- Content generation

**Ideation/Workflow:**
- **Notion AI Pro** -- Integrated workspace with AI ideation
- **IdeationWeb** (CHI 2025) -- Structured human-AI co-ideation with visualization
- **AIdeation** (CHI 2025) -- Specialized for concept designers in entertainment

**Multi-Agent Platforms:**
- Orchestrated teams of specialized AI agents for creative workflows
- Anthropic MCP and Google A2A enabling agent interoperability

Sources: [Creative Bloq - Adobe 2026](https://www.creativebloq.com/tech/from-firefly-to-graph-how-adobe-thinks-creatives-will-use-ai-in-2026), [Medium - 5 AI Tools 2026](https://medium.com/@hassankhannawab0/5-ai-tools-every-creative-will-need-in-2026-89b4d01194b2), [Futuramo - AI Revolution](https://futuramo.com/blog/how-ai-is-transforming-creative-work/)

### 5.2 How Professionals Use AI for Ideation in Practice

- **72% of designers** say AI enhances ideation for their design work (Foundation Capital)
- **45% of product companies** investing in AI for initial concept exploration (Figma 2025)
- **All designers agree:** AI is best at ideation stage, not for final products
- **Adobe's vision for 2026:** Transition beyond specific tools to conversational interfaces and agentic experiences (Project Moonlight)
- **Multi-tool workflows** will be the defining trend of 2026 -- orchestrating several specialized AI tools for ideation, generation, and refinement

**Emerging pattern:** Professionals use AI to enter a **flow state** -- fast-paced collaboration that feels more like a creative partner than solo ideation. The most successful professionals embrace AI-human collaboration rather than viewing AI as a threat.

Sources: [Adobe Creative Trends 2026](https://business.adobe.com/resources/creative-trends-report.html), [Visme - AI Design Trends](https://visme.co/blog/ai-design-trends/), [IDEO U - AI and Creativity](https://www.ideou.com/blogs/inspiration/ai-and-creativity-in-the-age-of-emerging-tools)

---

## Summary: Key Takeaways

1. **LLMs match average human creativity** but do not exceed it; the best humans still outperform AI
2. **Individual creativity up, collective diversity down** -- the most consistent finding across all studies
3. **Originality is AI's weakest point**; elaboration is its strongest
4. **The "Creative Scar" is real** -- over-reliance on AI weakens creative ability even after AI is removed
5. **Ask AI HOW to think, not WHAT to think** -- process prompts vastly outperform product prompts
6. **Human-first ideation preserves diversity**; AI-first ideation causes convergence
7. **Multi-agent and multi-LLM approaches** can partially mitigate originality limitations
8. **Tree of Thoughts** significantly outperforms Chain-of-Thought for creative tasks
9. **The jagged frontier is real** -- AI excels at synthesis/elaboration but fails at "Eureka" moments
10. **2026 trend: multi-tool AI workflows** orchestrating specialized agents for creative work

---

*Research compiled: January 2026*
*Sources: Academic papers, industry reports, and expert analysis from 2025-2026*
