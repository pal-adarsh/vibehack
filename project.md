# 🧠 Second Brain OS
### *"Stop Collecting. Start Executing."*

> Your ideas deserve more than a graveyard of notes. **Second Brain OS** is an AI-powered execution engine that transforms raw thoughts, bookmarks, and ideas into structured action plans — with deadlines, priorities, and progress tracking built in.

---

## 📌 Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Solution Overview](#2-solution-overview)
3. [Key Features](#3-key-features)
4. [Advanced UI/UX Features](#4-advanced-uiux-features)
5. [Tech Stack](#5-tech-stack)
6. [System Architecture](#6-system-architecture)
7. [Folder Structure](#7-folder-structure)
8. [How It Works](#8-how-it-works-step-by-step-flow)
9. [Installation & Setup](#9-installation--setup)
10. [Future Enhancements](#10-future-enhancements)
11. [Challenges & Solutions](#11-challenges--solutions)
12. [Demo / Usage](#12-demo--usage)
13. [Contributors](#13-contributors)

---

## 1. Problem Statement

### The Idea Graveyard Problem

Every ambitious person has a Notion database they never open, a bookmarks folder they never revisit, and a Notes app overflowing with half-formed thoughts. Research calls this the **"collection illusion"** — the psychological comfort of saving an idea tricks the brain into thinking progress has been made, when in reality, nothing has moved.

### Why It Matters

- **73% of professionals** report having more ideas than they can act on (Harvard Business Review, 2023)
- The average knowledge worker saves **40+ bookmarks/week** and revisits fewer than 3
- Most productivity tools are optimized for **input** (capturing ideas) not **output** (executing them)
- There is no system that bridges the gap between *"I have this idea"* and *"I shipped this thing"*

### Who Is Affected

| Persona | Pain Point |
|---|---|
| 🎓 Students | Research links and project ideas rot in folders |
| 👩‍💻 Developers | Side-project ideas never leave the README phase |
| 🚀 Entrepreneurs | Business ideas stay in notebooks for years |
| ✍️ Creators | Content ideas get lost before they're ever made |
| 🧑‍🔬 Researchers | Insights never synthesized into actionable plans |

The problem isn't **having** ideas. The problem is the **missing bridge** between ideation and execution.

---

## 2. Solution Overview

### What is Second Brain OS?

**Second Brain OS** is not a notes app. It is an **execution operating system** — a web-based platform that takes your raw ideas and immediately converts them into structured, trackable execution plans using AI.

### How It Solves the Problem

```
Raw Idea / Bookmark / Brain Dump
        ↓
  [AI Processing Engine]
        ↓
 Structured Execution Plan
   → Sub-tasks with deadlines
   → Priority score
   → Resource links
   → AI-generated summary
   → Progress tracker
        ↓
   You Ship. Not Someday. Now.
```

The core philosophy: **Every idea that enters Second Brain OS must leave as an action.** The system is designed with friction against passive collection and friction-free pathways toward execution.

### Three Themes, One System

Second Brain OS ships with three hand-crafted themes:
- 🌑 **Dark Mode** — Deep focus, zero distraction
- ☀️ **Light Mode** — Crisp clarity for daytime workflows  
- 🌅 **Sunset Mode** — Warm amber-orange gradient palette, the creative's golden hour

---

## 3. Key Features

### 🔥 Core MVP Features

---

#### 3.1 Idea Capture & Instant Structuring
Drop any raw idea — a sentence, a paragraph, a URL, a voice note transcript — into the **Idea Inbox**. The AI immediately structures it into:
- A project title
- A one-line goal statement
- 3–7 actionable sub-tasks
- Estimated time-to-complete
- Recommended first step (the "just start" trigger)

---

#### 3.2 AI-Powered Paragraph Summarizer *(Gemini API)*
Paste any long-form content — articles, research papers, meeting notes, YouTube transcripts — and Second Brain OS will:
- Generate a **5-bullet TL;DR** using Gemini 1.5 Flash
- Extract **key action points** hidden in the text
- Surface **relevant questions** the content raises
- Suggest **how this content connects** to your existing ideas in the OS

This is not just summarization — it's **insight extraction for execution**.

> **Implementation:** Input text is sent to Gemini API with a structured prompt that enforces JSON output containing `summary[]`, `actionPoints[]`, `keyQuestions[]`, and `relatedTags[]`. The response is parsed and rendered as interactive cards.

---

#### 3.3 Execution Board (Kanban + Timeline Hybrid)
A dual-view task management system:
- **Kanban View** — Drag-and-drop cards across `Idea → Planning → In Progress → Done`
- **Timeline View** — A visual Gantt-style roadmap showing idea deadlines
- Each card shows priority badge, estimated hours, AI confidence score, and completion %

---

#### 3.4 Priority Intelligence Engine
Every idea gets a **Priority Score (0–100)** calculated from:
- User-defined urgency (1–5)
- Estimated impact (AI-evaluated)
- Days since creation (decay function)
- Dependencies on other ideas

The system surfaces your **"Top 3 Most Executable Ideas Today"** on the dashboard — preventing decision paralysis.

---

#### 3.5 Weekly Execution Report
Every Sunday, the system auto-generates a personal **"Execution Debrief"**:
- Ideas completed this week
- Ideas stalled (and why, AI-diagnosed)
- Productivity score trend
- Recommended focus areas for next week

---

#### 3.6 Bookmark Brain Dump
Paste any URL. Gemini fetches and summarizes the content, extracts actionable insights, and files it under the relevant idea — not as a passive bookmark, but as **fuel for an execution task**.

---

#### 3.7 Idea Relationships & Clustering
The OS maps connections between ideas using tag-based clustering. Ideas that share themes are visually linked in an **Idea Galaxy** view — a force-directed graph where nodes are ideas and edges represent relationships. Click any node to deep-dive.

---

#### 3.8 Daily Focus Mode
A distraction-free fullscreen mode that:
- Shows only **Today's Top 3 Tasks**
- Runs a **Pomodoro Timer** integrated with the task
- Plays ambient soundscapes (lo-fi, rain, white noise)
- Locks navigation until the session ends

---

#### 3.9 Voice-to-Idea (Crazy Feature 🔥)
Record a voice memo directly in the app. The audio is transcribed using the **Web Speech API**, then immediately piped into the AI structuring engine. Speak your idea in 30 seconds. Walk away with a complete execution plan.

---

#### 3.10 Idea Autopsy (Crazy Feature 💀)
For ideas that have been sitting idle for 30+ days, the **Idea Autopsy** AI runs a diagnosis:
- *"Why hasn't this been executed?"*
- Identifies blockers (no deadline, too vague, missing skills, fear?)
- Suggests either a **revival plan** or recommends archiving with a reason
- Tracks your "kill rate" — ideas you intentionally chose to not pursue (a productivity signal, not a failure)

---

#### 3.11 Second Brain Score (Crazy Feature 🧠)
A gamified personal productivity score (0–1000) that tracks:
- Ideas captured vs executed ratio
- Streak (consecutive days of execution)
- Complexity of completed ideas
- AI interaction frequency

Displayed as an animated circular progress ring on the dashboard. Encourages consistent execution habits.

---

#### 3.12 Collaborative Execution Rooms *(Bonus)*
Invite collaborators to a shared idea space. Assign tasks, leave comments, see live cursors (like Figma), and co-execute ideas as a team. Perfect for hackathon teams, startup co-founders, or study groups.

---

## 4. Advanced UI/UX Features

### 4.1 Smooth Page Transitions
**Implementation:** Using **Framer Motion's** `AnimatePresence` component with `layoutId` for shared element transitions. Each route change triggers a coordinated exit/enter animation — cards slide out left, new content fades in from right with a spring physics curve. No jarring reloads.

```jsx
// Example: Route transition wrapper
<AnimatePresence mode="wait">
  <motion.div
    key={router.pathname}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

### 4.2 Animated SVG Icons
All icons in the OS are **hand-crafted animated SVGs** — not static icon libraries. Key animations:
- Brain icon on logo: pulses with a neural-network ripple on hover
- Check icon: draws itself with a stroke animation on task completion
- Priority badge icons: morphs between shapes based on urgency level

**Implementation:** SVG `stroke-dasharray` / `stroke-dashoffset` CSS animations triggered on component mount or user interaction.

---

### 4.3 Scroll-Based Animations
**Implementation:** Using **Framer Motion's** `useScroll` + `useTransform` hooks. As users scroll through the landing page:
- Feature cards parallax at different scroll speeds
- Section headers scale from 0.8 to 1.0 opacity as they enter viewport
- The **Idea Galaxy** graph rotates subtly based on scroll position

For the dashboard, `IntersectionObserver` is used to trigger staggered card reveals.

---

### 4.4 Full Mobile Responsiveness
- Fully responsive across 320px to 4K displays
- Mobile-first Tailwind breakpoints (`sm`, `md`, `lg`, `xl`)
- Kanban board collapses to a **swipeable card stack** on mobile (touch gesture support via `react-swipeable`)
- Bottom navigation bar replaces sidebar on mobile
- Dashboard widgets reflow to a single-column layout

---

### 4.5 Three-Theme System (Dark / Light / Sunset)
**Implementation:** CSS custom properties (`--bg`, `--accent`, `--text`, `--card`) toggled via a `data-theme` attribute on the `<html>` tag. Theme preference persisted in `localStorage` and synced with system preference on first load via `prefers-color-scheme`.

```css
[data-theme="dark"]    { --bg: #0D0A1F; --accent: #7C3AED; --text: #F8FAFC; }
[data-theme="light"]   { --bg: #F8FAFC; --accent: #4F46E5; --text: #0F172A; }
[data-theme="sunset"]  { --bg: #1A0A00; --accent: #F97316; --text: #FEF3C7; }
```

Theme switcher is an animated 3-way toggle with icon morphing (moon → sun → sunset glyph).

---

### 4.6 Custom Cursor
A custom cursor system with **context-aware behavior**:
- Default: small glowing dot (theme-colored)
- Hover on cards: cursor expands into a ring
- Hover on CTA buttons: cursor fills with accent color + "drag" label appears
- Drag state on Kanban: cursor shows grab icon with card preview shadow
- AI loading state: cursor becomes a spinning neural-network node

**Implementation:** Global cursor component tracking `mousemove` events, rendered via absolute-positioned `div` with CSS `transform: translate()` and spring animation for lag effect.

---

### 4.7 Micro-interactions
Every interactive element has intentional feedback:
- **Button clicks**: scale down to 0.95 on `mousedown`, spring back on release
- **Task completion**: checkbox triggers a confetti burst (canvas-confetti library)
- **Idea card hover**: subtle 3D tilt effect using `react-parallax-tilt`
- **AI response loading**: skeleton shimmer with animated gradient sweep
- **Drag-and-drop**: cards cast a dynamic shadow proportional to lift height
- **Score increase**: animated number counter with easing curve

---

### 4.8 Error Handling (UI + API Level)

**UI Level:**
- All async operations wrapped in try/catch with user-facing toast notifications (custom, not a library)
- Empty states are illustrated (SVG drawings) with contextual CTAs — never a blank screen
- Form validation is inline, real-time, and non-blocking

**API Level:**
- Gemini API failures trigger automatic retry (3 attempts with exponential backoff)
- Rate limit errors surface a friendly cooldown timer: *"AI is thinking... retry in 12s"*
- Network errors detected via `navigator.onLine` — offline mode queues requests locally
- All API responses validated against expected schema before rendering

---

### 4.9 PWA (Progressive Web App)

Second Brain OS is fully installable as a PWA:
- `manifest.json` with all icon sizes, theme colors per theme
- Service Worker caches all static assets + last-visited pages
- Offline fallback page with sync queue for pending actions
- Push notification support for deadline reminders and weekly reports
- Add-to-home-screen prompt triggered after 2nd session

```json
// manifest.json excerpt
{
  "name": "Second Brain OS",
  "short_name": "SBOS",
  "theme_color": "#7C3AED",
  "background_color": "#0D0A1F",
  "display": "standalone",
  "start_url": "/dashboard"
}
```

---

## 5. Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework, SSR, routing, API routes |
| **Tailwind CSS v3** | Utility-first styling, theme tokens |
| **Framer Motion** | Animations, page transitions, gestures |
| **React 18** | UI component architecture |
| **TypeScript** | Type safety across the entire codebase |

### State Management & Data
| Technology | Purpose |
|---|---|
| **Zustand** | Lightweight global state (ideas, theme, user) |
| **React Query (TanStack)** | Server state, caching, refetching |
| **LocalStorage / IndexedDB** | Offline persistence, PWA queue |

### Backend & APIs
| Technology | Purpose |
|---|---|
| **Next.js API Routes** | Serverless backend endpoints |
| **Google Gemini 1.5 Flash API** | Idea structuring, summarization, autopsy |
| **Web Speech API** | Voice-to-idea transcription |

### UI Libraries
| Library | Purpose |
|---|---|
| **react-beautiful-dnd** | Kanban drag-and-drop |
| **canvas-confetti** | Task completion celebration |
| **react-parallax-tilt** | 3D card hover effects |
| **react-swipeable** | Mobile gesture support |
| **d3.js** | Idea Galaxy force-directed graph |
| **react-hot-toast** (custom) | Toast notification system |

### Dev Tools
| Tool | Purpose |
|---|---|
| **Vercel** | Deployment & edge functions |
| **ESLint + Prettier** | Code quality |
| **Husky** | Pre-commit hooks |
| **GitHub Actions** | CI/CD pipeline |

---

## 6. System Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────┐
│                      USER BROWSER                        │
│                                                          │
│  ┌──────────┐   ┌──────────┐   ┌──────────────────────┐ │
│  │  Idea    │   │  Kanban  │   │   Dashboard / Score  │ │
│  │  Inbox   │   │  Board   │   │   Weekly Report      │ │
│  └────┬─────┘   └────┬─────┘   └──────────┬───────────┘ │
│       │              │                     │             │
│       └──────────────┴─────────────────────┘            │
│                       │                                  │
│               [Zustand Store]                            │
│              (Global App State)                          │
└───────────────────────┬──────────────────────────────────┘
                        │ HTTP / Fetch
                        ▼
┌─────────────────────────────────────────────────────────┐
│               NEXT.JS API ROUTES (Serverless)            │
│                                                          │
│   /api/structure-idea   → Prompt engineering → Gemini   │
│   /api/summarize        → Extract insights  → Gemini   │
│   /api/autopsy          → Diagnose idea     → Gemini   │
│   /api/weekly-report    → Aggregate data    → Gemini   │
│                                                          │
└───────────────────────┬─────────────────────────────────┘
                        │ REST API
                        ▼
┌─────────────────────────────────────────────────────────┐
│              GOOGLE GEMINI 1.5 FLASH API                 │
│                                                          │
│   Input:  Structured prompt + user content               │
│   Output: JSON (tasks, summaries, scores, diagnoses)     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App
├── ThemeProvider         ← Manages dark/light/sunset theme
├── CursorProvider        ← Global custom cursor state
├── Layout
│   ├── Sidebar           ← Navigation + Second Brain Score ring
│   ├── TopBar            ← Search, theme toggle, notifications
│   └── Main
│       ├── Dashboard     ← Top 3 ideas, score, quick stats
│       ├── IdeaInbox     ← Capture + AI structuring
│       ├── KanbanBoard   ← Drag-drop execution board
│       ├── Summarizer    ← Paste & AI-summarize
│       ├── IdeaGalaxy    ← D3 force graph
│       ├── FocusMode     ← Pomodoro + single-task view
│       └── WeeklyReport  ← Auto-generated debrief
└── PWAProvider           ← Service worker + offline queue
```

---

## 7. Folder Structure

```
second-brain-os/
│
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx                # Root layout, theme & cursor providers
│   ├── page.tsx                  # Landing page
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard
│   ├── ideas/
│   │   ├── page.tsx              # Idea Inbox
│   │   └── [id]/
│   │       └── page.tsx          # Single idea detail view
│   ├── board/
│   │   └── page.tsx              # Kanban execution board
│   ├── summarizer/
│   │   └── page.tsx              # AI Paragraph Summarizer
│   ├── galaxy/
│   │   └── page.tsx              # Idea Galaxy (D3 graph)
│   ├── focus/
│   │   └── page.tsx              # Daily Focus Mode
│   ├── report/
│   │   └── page.tsx              # Weekly Execution Report
│   └── api/
│       ├── structure-idea/
│       │   └── route.ts          # Gemini: raw idea → structured plan
│       ├── summarize/
│       │   └── route.ts          # Gemini: text → summary + actions
│       ├── autopsy/
│       │   └── route.ts          # Gemini: stale idea diagnosis
│       └── weekly-report/
│           └── route.ts          # Gemini: weekly debrief generation
│
├── components/
│   ├── ui/                       # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Toast.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Modal.tsx
│   │   └── Badge.tsx
│   ├── ideas/
│   │   ├── IdeaCard.tsx
│   │   ├── IdeaForm.tsx
│   │   └── IdeaAutopsy.tsx
│   ├── board/
│   │   ├── KanbanColumn.tsx
│   │   └── KanbanCard.tsx
│   ├── dashboard/
│   │   ├── ScoreRing.tsx         # Animated SVG score display
│   │   ├── TopIdeas.tsx
│   │   └── StatsGrid.tsx
│   ├── summarizer/
│   │   └── SummarizerPanel.tsx
│   ├── galaxy/
│   │   └── IdeaGalaxy.tsx        # D3 force-directed graph
│   ├── focus/
│   │   ├── PomodoroTimer.tsx
│   │   └── FocusCard.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── MobileNav.tsx
│   └── effects/
│       ├── CustomCursor.tsx
│       ├── PageTransition.tsx
│       └── ParticleBackground.tsx
│
├── store/
│   ├── ideaStore.ts              # Zustand: ideas state
│   ├── themeStore.ts             # Zustand: theme (dark/light/sunset)
│   └── userStore.ts              # Zustand: score, streak, prefs
│
├── lib/
│   ├── gemini.ts                 # Gemini API client + prompt templates
│   ├── priorityEngine.ts         # Priority score calculation logic
│   ├── speech.ts                 # Web Speech API wrapper
│   └── indexeddb.ts              # Offline storage helper
│
├── hooks/
│   ├── useIdeas.ts               # CRUD + AI structuring hook
│   ├── useTheme.ts               # Theme switching hook
│   ├── useFocusMode.ts           # Pomodoro timer logic
│   └── useOfflineQueue.ts        # PWA queue management
│
├── styles/
│   ├── globals.css               # CSS variables, theme definitions
│   └── animations.css            # Keyframe animations
│
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service Worker
│   ├── icons/                    # PWA icons (all sizes)
│   └── sounds/                   # Focus mode ambient audio
│
├── types/
│   └── index.ts                  # Global TypeScript types
│
├── .env.local                    # Environment variables
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind + theme tokens
├── tsconfig.json
└── project.md                    # ← You are here
```

---

## 8. How It Works (Step-by-Step Flow)

### User Journey

#### Step 1: Capture
User opens the **Idea Inbox** and drops any raw input:
- A sentence: *"Build a community for indie developers in India"*
- A URL: `https://techcrunch.com/...`
- A pasted paragraph from research

#### Step 2: AI Processing (Gemini API)
The input is sent to `/api/structure-idea` with a system prompt:
```
You are an execution planner. Take the following raw idea and return a 
structured JSON containing: title, goal, subtasks[], timeEstimate, 
firstStep, priorityScore, tags[]. Return only valid JSON.
```

Gemini returns a structured execution plan in < 2 seconds.

#### Step 3: Review & Accept
The user sees a preview card with the structured plan. They can:
- Accept as-is → moves to Kanban board
- Edit any field inline
- Regenerate with different parameters

#### Step 4: Execute
The idea lives on the **Kanban Board** as a card:
- User moves it: `Idea → Planning → In Progress → Done`
- Sub-tasks are checkable inline
- Deadline triggers are set

#### Step 5: Focus
User activates **Focus Mode** for any single idea:
- Pomodoro timer starts
- All other UI hides
- Ambient sound plays
- Progress auto-saves after each session

#### Step 6: Completion
Idea marked Done:
- Confetti burst animation
- **Second Brain Score** updates with spring animation
- Idea archived with completion date and notes
- Weekly report is updated in background

#### Step 7: Reflect
Every Sunday: **Weekly Execution Report** is auto-generated and sent as a push notification. User opens it to see their week, patterns, and next week's priorities.

---

## 9. Installation & Setup

### Prerequisites
- Node.js ≥ 18.x
- npm or pnpm
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Clone & Install

```bash
git clone https://github.com/yourusername/second-brain-os.git
cd second-brain-os
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key

# Optional: App URL (for PWA + notifications)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Add all environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

---

## 10. Future Enhancements

### AI Improvements
- **Memory Layer** — Gemini remembers past ideas and surfaces connections across sessions
- **Tone-Aware Structuring** — Different execution frameworks based on idea type (creative, technical, business)
- **Execution Coaching** — Daily AI check-in: *"You said you'd start the landing page today. What's blocking you?"*
- **Multi-modal Input** — Image → Idea (whiteboard photos, screenshots auto-structured)

### Performance & Scale
- **Edge caching** for Gemini responses on common idea patterns
- **Real-time collaboration** using WebSockets (Socket.io) for team rooms
- **Mobile App** — React Native port with shared business logic
- **Browser Extension** — Right-click any selected text on the web → *"Add to Second Brain OS"*

### Feature Additions
- **Calendar Integration** — Sync idea deadlines to Google Calendar
- **GitHub Integration** — Technical ideas auto-generate GitHub repos with starter issues
- **Obsidian / Notion Import** — Migrate existing notes into execution plans
- **Public Idea Boards** — Share your execution journey publicly for accountability
- **API Access** — Let power users build on top of Second Brain OS via API

---

## 11. Challenges & Solutions

| Challenge | Solution |
|---|---|
| **Gemini API latency** on slow connections | Optimistic UI updates — card appears immediately, AI data streams in afterward using skeleton loaders |
| **Prompt reliability** — Gemini sometimes returns malformed JSON | JSON schema validation with `zod`, retry with stricter prompt on parse failure |
| **Drag-and-drop on mobile** | Replaced `react-beautiful-dnd` with `@dnd-kit/core` which has native touch support |
| **Theme flash on reload** (FOUC) | Theme class injected via `<script>` in `<head>` before hydration using Next.js `_document` pattern |
| **D3.js + React reconciliation conflicts** | D3 used only for math/layout; React handles all DOM rendering of graph nodes |
| **PWA caching stale AI responses** | AI responses excluded from service worker cache; only static assets and UI shell are cached |
| **Voice transcription accuracy** | Confidence threshold check on Web Speech API result; low-confidence words highlighted for user review |
| **Score gamification feeling hollow** | Score formula tied to *execution quality* (complexity, consistency, reflection) not just quantity |

---

## 12. Demo / Usage

### Use Case 1: Developer Side-Project
> **Input:** *"I want to build a SaaS that helps restaurants manage their menus digitally"*
>
> **Output:** 6-task execution plan with tech stack suggestion, MVP scope, launch checklist, and estimated 3-week timeline. First step: *"Validate with 3 local restaurant owners this week."*

---

### Use Case 2: Student Research
> **Input:** Paste 2000-word research paper on attention spans
>
> **Summarizer Output:** 5-bullet TL;DR, 3 action points for a study habit experiment, 2 questions for further research. Filed under "Learning & Cognition" idea cluster.

---

### Use Case 3: Creator Content Pipeline
> **Voice Input:** *"I want to make a series of videos explaining system design for beginners, starting with load balancers"*
>
> **Output:** 8-episode content plan with titles, key talking points per episode, thumbnail concepts, and a 30-day publishing calendar.

---

### Use Case 4: Stale Idea Autopsy
> **Stale Idea:** "Learn Rust" — created 47 days ago, 0% progress
>
> **AI Autopsy:** *"This idea lacks a concrete first deliverable. 'Learn Rust' is a state, not a project. Suggested revival: Build one small CLI tool in Rust by [date]. New first step: Complete Chapter 1 of The Rust Book today (45 min)."*

---

## 13. Contributors

| Name | Role | GitHub |
|---|---|---|
| **Adarsh** | Full-Stack Developer & Product Lead | [@yourusername](https://github.com/yourusername) |

---

<div align="center">

**Built with 🧠 and zero sleep at a hackathon.**

*Second Brain OS — Stop collecting. Start executing.*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

</div>
