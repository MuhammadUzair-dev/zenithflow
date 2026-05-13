<div align="center">

# ✦ ZenithFlow

### AI-Agentic Personal Skill Architect

**Build personalized 4-week learning roadmaps with intelligent agents that interview, curate, and verify your progress.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](#license)

<img src="Zenithflow .jpg" alt="ZenithFlow Preview" width="700" />

[Live Demo](https://zenithflow.vercel.app) · [Report Bug](https://github.com/MuhammadUzair-dev/zenithflow/issues)

</div>

---

## The Problem

Most people want to learn a new skill — "Learn Three.js" or "Master Italian Cooking" — but get crushed by **information overload**. Thousands of random tutorials, no clear path, no accountability. They bookmark 40 videos and watch zero.

ZenithFlow solves this with **three autonomous agents** that replace the chaos with a structured, verified learning journey.

---

## Agentic Architecture

> This is not an API wrapper. Each agent has its own **decision logic**, **state awareness**, and **behavioral loop** that operates independently while coordinating through a shared reactive state store.

```
┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│              (Vibe Engine + Views)                    │
└──────────┬──────────────┬──────────────┬────────────┘
           │              │              │
     ┌─────▼─────┐  ┌─────▼─────┐  ┌────▼──────┐
     │ Architect  │  │ Scavenger │  │  Auditor  │
     │   Agent    │  │   Agent   │  │   Agent   │
     └─────┬─────┘  └─────┬─────┘  └─────┬─────┘
           │              │              │
     ┌─────▼──────────────▼──────────────▼────────────┐
     │            Reactive State Store                 │
     │         (with localStorage persistence)         │
     └────────────────────────────────────────────────┘
```

### 🏗️ Agent 1: The Architect

**Role:** Interviews the user and builds a dynamic, personalized 4-week roadmap.

**Agentic Behavior:**
- **Multi-step conversational flow** — Conducts a 5-question interview via a chat interface with simulated typing delays, creating the feel of a real conversation rather than a static form.
- **Adaptive difficulty calibration** — Applies a `levelMultiplier` (beginner: 1.0×, intermediate: 0.8×, advanced: 0.6×) to every task's estimated time, reducing scope for experienced learners.
- **Fuzzy skill matching** — The `matchSkill()` function performs substring search against the skill database, so typing "cooking" matches "Italian Cooking" without requiring exact input.
- **State-driven roadmap generation** — `generateRoadmap()` reads the full interview state (skill, level, hours, style, goal) and produces a structured 4-week plan with categorized tasks (learn / practice / build).

**Key Decision Points:**
| Input | How It Changes the Roadmap |
|-------|---------------------------|
| Skill selection | Selects from 6 pre-built skill trees with curated task sequences |
| Experience level | Scales all task durations via multiplier |
| Available hours | Determines task density per week |
| Learning style | Prioritizes resource types (video vs docs vs hands-on) |

**Source:** [`src/agents/architect.js`](src/agents/architect.js)

---

### 🔍 Agent 2: The Resource Scavenger

**Role:** Finds and surfaces the exact learning resource for each step of the roadmap.

**Agentic Behavior:**
- **Type-aware resource mapping** — Each resource is classified by type (`video` / `article` / `docs` / `repo`) with corresponding visual icons and CSS styling. This isn't just a link list — it's a typed, rendered resource system.
- **Skill-scoped retrieval** — `getResourcesForSkill()` queries the skill database and returns only resources vetted for that specific skill domain.
- **Task-level matching** — `getResourcesForTask()` accepts a task title and matches resources at the task level (extensible to NLP-based matching).
- **Rich card rendering** — `renderResourceHTML()` generates interactive resource cards with type badges, duration metadata, and external link handling.

**Resource Database:**
Each skill contains curated, real-world resources:
- YouTube channels and courses (e.g., Three.js Journey, JustinGuitar)
- Official documentation (e.g., Python docs, Three.js docs)
- Books and articles (e.g., Automate the Boring Stuff, The Silver Spoon)
- GitHub repositories and awesome-lists

**Source:** [`src/agents/scavenger.js`](src/agents/scavenger.js)

---

### 🎯 Agent 3: The Progress Auditor

**Role:** Verifies real learning before unlocking the next level. This is the **accountability engine**.

**Agentic Behavior:**
- **Challenge selection** — `getChallenge()` randomly selects from a per-skill challenge bank. Each skill has domain-specific multiple-choice questions with verified correct answers.
- **Dual verification modes:**
  - **Quiz Mode** — Multiple-choice questions drawn from the skill's challenge bank (e.g., "What are the three essential components of a Three.js scene?"). User must select the correct answer.
  - **Reflection Mode** — Fallback prompts like "What was the most surprising thing you learned?" for skills without quiz banks. Accepts any thoughtful response.
- **Gate logic** — `completeTask()` is only called after `verifyAnswer()` returns `passed: true`. Failed attempts do not unlock progress. This prevents users from mindlessly checking off tasks.
- **Feedback variance** — Correct answers receive one of 5 randomized positive messages to keep engagement fresh rather than repetitive.
- **Progress propagation** — After each verified completion, the Auditor triggers `recalcProgress()` which recalculates overall percentage and fires state subscribers (including the Vibe Engine).

**Audit Flow:**
```
User clicks "Mark Complete"
        │
        ▼
┌─ Auditor selects challenge ─┐
│   Quiz available? ──Yes──▶ Show quiz modal
│         │                    │
│        No                  User answers
│         │                    │
│         ▼               ┌────▼────┐
│   Show reflection    Correct?   No ──▶ "Try again" (task stays incomplete)
│   prompt                 │
│         │               Yes
│         ▼                │
│   Accept response        ▼
│         │          completeTask()
│         ▼                │
│   completeTask()         ▼
│         │          recalcProgress()
│         ▼                │
│   recalcProgress()       ▼
│         │          Vibe Engine updates colors
│         ▼
│   Vibe Engine updates colors
└──────────────────────────┘
```

**Source:** [`src/agents/auditor.js`](src/agents/auditor.js)

---

## Vibe Engine — Reactive Color Theming

The UI isn't static — it **evolves with your progress**. The Vibe Engine subscribes to the state store and smoothly interpolates between 5 color tiers using linear interpolation on HSL values and RGB particle colors.

| Progress | Tier | Theme | Accent Color |
|----------|------|-------|-------------|
| 0–20% | Novice | Deep Navy | `#4a7cf7` Cool Blue |
| 20–40% | Learner | Midnight Teal | `#00d4aa` Cyan |
| 40–60% | Practitioner | Deep Forest | `#2ecc71` Emerald |
| 60–80% | Adept | Dark Amber | `#f39c12` Gold |
| 80–100% | Master | Rich Black | `#f0c040` Electric Gold |

- **No hard transitions** — Colors interpolate smoothly between tiers via `lerp()` and `lerpColor()`.
- **CSS custom property injection** — The engine directly mutates `:root` variables (`--bg-primary`, `--accent-h`, `--accent-rgb`, etc.), so every component reacts automatically.
- **Particle system sync** — The canvas particle system reads `getCurrentVibe()` each frame and adjusts particle color, count, and density in real-time.

**Source:** [`src/vibe/engine.js`](src/vibe/engine.js) · [`src/vibe/particles.js`](src/vibe/particles.js)

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Build | Vite | Sub-second HMR, native ES modules, Terser minification |
| Language | Vanilla JS (ES Modules) | Zero framework overhead, maximum control |
| Styling | Vanilla CSS + Custom Properties | Glassmorphism design system with dynamic theming |
| State | Custom reactive store | Pub/sub pattern with localStorage persistence |
| Routing | Hash-based SPA router | Animated view transitions, route params |
| Rendering | Canvas 2D | Particle system with mouse parallax |
| Fonts | Google Fonts (Inter + Space Grotesk) | Premium typography |

**No React. No Vue. No Angular. No TailwindCSS.** Every line is handcrafted.

---

## Project Structure

```
zenithflow/
├── index.html                 # Single entry point
├── vite.config.js             # Build config with Terser minification
├── package.json
├── LICENSE                    # Proprietary — All Rights Reserved
├── .env.example               # Environment variable template
│
├── public/
│   └── favicon.svg            # Gradient compass icon
│
├── src/
│   ├── main.js                # App entry — initializes all systems
│   ├── router.js              # Hash-based SPA router with transitions
│   ├── store.js               # Reactive state store + localStorage
│   │
│   ├── agents/
│   │   ├── architect.js       # Interview flow + roadmap generation
│   │   ├── scavenger.js       # Resource retrieval + card rendering
│   │   └── auditor.js         # Quiz/reflection verification + gate logic
│   │
│   ├── views/
│   │   ├── landing.js         # Hero, features, stats
│   │   ├── interview.js       # Chat UI with Architect Agent
│   │   ├── roadmap.js         # 4-week overview dashboard
│   │   └── weekDetail.js      # Task list, audit triggers, resources
│   │
│   ├── vibe/
│   │   ├── engine.js          # 5-tier color interpolation system
│   │   └── particles.js       # Canvas particle system
│   │
│   ├── data/
│   │   └── skills.js          # 6 complete skill templates
│   │
│   ├── utils/
│   │   ├── dom.js             # DOM helpers ($, $$, el, html)
│   │   └── animations.js      # Typewriter, counters, stagger
│   │
│   └── styles/
│       ├── main.css           # Imports + page layouts + responsive
│       ├── reset.css           # Modern CSS reset
│       ├── variables.css       # Full design token system
│       ├── components.css      # Glassmorphism component library
│       └── animations.css      # Keyframes + utility classes
│
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions → Vercel deployment
```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/MuhammadUzair-dev/zenithflow.git
cd zenithflow

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build    # Outputs to dist/ with Terser minification
npm run preview  # Preview the production build locally
```

---

## Environment Variables

Copy the example file and add your keys (required only for future API integrations):

```bash
cp .env.example .env
```

See [`.env.example`](.env.example) for all available configuration options. The current version runs **fully client-side** with no external API dependencies.

---

## Available Skills

| Skill | Tasks | Challenges | Resources |
|-------|-------|------------|-----------|
| 🎮 Three.js | 22 | 4 quiz questions | Three.js Journey, Official Docs, GitHub |
| 🐍 Python | 22 | 4 quiz questions | Coursera, Python Docs, Automate the Boring Stuff |
| 🍝 Italian Cooking | 17 | 4 quiz questions | Italia Squisita, Vincenzo's Plate, Serious Eats |
| 🎸 Guitar | 19 | 3 quiz questions | JustinGuitar, Fender Play, Ultimate Guitar |
| 🎨 UI/UX Design | 18 | 3 quiz questions | Google UX Certificate, Laws of UX, Figma |
| 📸 Photography | 17 | 3 quiz questions | Peter McKinnon, Cambridge in Colour, Lightroom |

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub (private repo supported)
2. Import on [vercel.com](https://vercel.com)
3. Framework preset: **Vite** (auto-detected)
4. Deploy — done in ~30 seconds

### Manual

```bash
npm run build
# Upload contents of dist/ to any static host
```

---

## Future Roadmap

- [ ] **Gemini/OpenAI integration** — Replace template-based interview with real LLM conversations
- [ ] **Live resource scraping** — YouTube API + GitHub API for real-time resource discovery
- [ ] **Screenshot verification** — Auditor accepts image uploads and uses vision models to verify progress
- [ ] **Custom skill creation** — Users define their own skill trees
- [ ] **Multiplayer accountability** — Share roadmaps and compare progress with friends

---

## License

**Proprietary — All Rights Reserved.**

This software and its source code are the exclusive property of the copyright holder. No part of this software may be reproduced, distributed, modified, or used without prior written permission. See [`LICENSE`](LICENSE) for full terms.

---

<div align="center">

**Built with ✦ by [Muhammad Uzair](https://github.com/MuhammadUzair-dev)**

</div>
