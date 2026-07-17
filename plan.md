# 🚀 Ilm — Daily Knowledge Operating System
### Project Plan

> **Tagline:** *Everything Worth Knowing Today.*
> **Mission:** Help users become smarter, more informed, and more productive in just **5 minutes every day.**

---

## 1. Product Overview

**Ilm** is a personalized daily knowledge dashboard that replaces the morning routine of checking Google News, YouTube, weather, dictionary apps, calendar, notes, and to-do lists with a single, fast, AI-powered home page.

### Goals
- Learn one new thing every day
- Improve English (and regional language) vocabulary
- Stay updated on AI, India, and World news
- Follow key YouTube creators without opening YouTube
- Track weather, markets, and personal tasks
- Build daily learning habits via streaks and quizzes
- Use AI as a personal learning coach, not just a chatbot

### Target Audience
Students · Developers · AI Enthusiasts · Working Professionals · Entrepreneurs · Competitive Exam Aspirants · Lifelong Learners

---

## 2. Tech Stack

### Frontend
- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (micro-interactions) + GSAP (marketing/landing page only, to keep bundle size down)
- TanStack Query (server state) + Zustand (light local/UI state)
- React Hook Form + Zod (validation schemas shared with backend)

### Backend
- Node.js + Express.js + TypeScript
- REST API
- BullMQ + Redis for background jobs (news ingestion, quiz generation, digest emails, streak resets)
- Redis for caching — all external API responses are cached; the app never calls third-party APIs directly on a user request

### Database
- PostgreSQL (primary) + Prisma ORM
- Redis (cache + queues + rate limiting)
- **pgvector** extension on Postgres for AI Search and the Knowledge Graph (embeddings for articles, notes, saved words)

### Authentication
- **Better Auth** (single provider, open-source and self-hostable)
- Google Login, GitHub Login, Email + Magic Link

### Storage
- Cloudinary (images, avatars)
- AWS S3 (optional — exports/backups, larger media)

### AI Layer
- Provider-agnostic AI Service Layer supporting OpenAI, Google Gemini, Anthropic Claude, and open-source fallback models (Llama/Mistral)
- Embeddings model for semantic search and recommendations

### Deployment & Ops
- Vercel (frontend)
- Railway / Render / DigitalOcean (backend + workers)
- Managed PostgreSQL (Neon/Supabase/RDS) + Redis Cloud
- Sentry (error tracking) + PostHog or Plausible (product analytics)

---

## 3. Architecture

```
                        ┌─────────────────────┐
                        │      Browser          │
                        └──────────┬────────────┘
                                   │
                        ┌──────────▼────────────┐
                        │   Next.js Frontend      │
                        └──────────┬────────────┘
                                   │ REST
                        ┌──────────▼────────────┐
                        │   Express REST API      │
                        └───┬─────────────┬──────┘
                            │             │
                 ┌──────────▼───┐   ┌─────▼──────────────────┐
                 │  Prisma ORM    │   │  AI Service Layer        │
                 └──────┬───────┘   └─────┬────────────────────┘
                        │                 │
               ┌────────▼───────┐  ┌──────▼─────────────────────┐
               │  PostgreSQL       │  │ OpenAI / Gemini / Claude    │
               │  (+ pgvector)     │  │  + Embeddings + Cache        │
               └────────┬───────┘  └─────────────────────────────┘
                        │
               ┌────────▼───────┐
               │  Redis             │
               │  (cache, queues,   │
               │  rate limits)      │
               └────────┬───────┘
                        │
               ┌────────▼──────────────────────┐
               │  BullMQ Workers (scheduled)      │
               │  - News ingestion pipeline        │
               │  - Stock/weather polling          │
               │  - Digest & notification jobs      │
               │  - Streak/XP recalculation         │
               └────────┬──────────────────────┘
                        │
               ┌────────▼──────────────────────┐
               │  External APIs                    │
               │  News · Weather · Stocks ·         │
               │  Dictionary · YouTube · Quotes ·   │
               │  Calendar                          │
               └────────────────────────────────┘
```

A scheduled ingestion pipeline (BullMQ cron jobs) pulls and caches external data on a fixed interval, so the dashboard always loads from Postgres/Redis rather than waiting on third-party APIs. This is what makes the "loads in under 2 seconds" target achievable.

---

## 4. MVP Scope

To ship quickly and validate the core loop — *open app → learn something → come back tomorrow* — the first release is scoped to:

1. Auth (Google + Email)
2. Dashboard shell with: Daily Word, Daily Fact, one AI News feed, Weather widget, Task list
3. AI Assistant — chat + article summarization only (quiz generation comes later)
4. Basic streak + XP system
5. Unified Bookmarks (one save action across content types)
6. PWA installability

Everything else below is built in the phases that follow.

---

## 5. Core Features

### 5.1 Smart Dashboard
Greeting, daily summary, reading progress, today's focus, continue reading, recently saved, streak counter, XP progress, notifications.

**5-Minute Mode:** a toggle that collapses the dashboard to only its 3–5 highest-priority cards (word, one headline, one task, one fact) — makes the "5 minutes a day" promise concrete in the UI, not just a backend metric.

### 5.2 Vocabulary Hub
Daily word (pronunciation, meaning, Hindi/Urdu translation, examples, synonyms/antonyms, origin, difficulty, audio), flashcards, collections, bookmarks, daily challenge, weekly test, dictionary search.

**Spaced Repetition Engine:** words the user struggles with resurface more often (SM-2 or a simplified Leitner system), replacing a flat "revision mode" — the single highest-leverage feature for actual retention.

### 5.3 News (AI / India / Global)
Category feeds with AI summary, original source, read time, save, share, related articles.

**Source Diversity Indicator:** flags when a story is covered by multiple outlets with differing framing, supporting the bias-aware summaries in the AI Assistant and avoiding a single-source echo chamber.

### 5.4 Stock Market
NIFTY 50, Sensex, Bank Nifty, gainers/losers, NASDAQ/Dow/S&P, watchlist, crypto, gold/silver, USD/INR. Requires a paid market-data API at scale (budgeted in Section 8).

### 5.5 Creator Updates
YouTube creator uploads, trending videos, community posts, announcements — polled per-channel on a schedule and cached, to manage YouTube Data API quota.

### 5.6 Learn Something Today / Daily Facts
5-minute daily articles and category-based facts, with save/collections.

### 5.7 Quiz Center
Daily quiz, weekly challenge, timed mode, leaderboard, XP, badges across vocabulary/AI/programming/current-affairs/science/mixed categories.

### 5.8 Weather, Calendar, Task Manager, Reading Hub, Analytics, Gamification, Notifications
Full weather (current/hourly/weekly, air quality, UV, sunrise/sunset); calendar (monthly/weekly/agenda, holidays, reminders); task manager (daily tasks, weekly goals, priorities, recurring tasks, focus mode); reading hub (saved articles, history, highlights, notes); analytics (reading time, vocabulary growth, quiz accuracy, learning heatmap); gamification (streaks, XP, levels, badges, achievements); notifications (daily brief, new word, weather alerts, breaking news, reminders).

### 5.9 Unified Bookmarks
One save action across news, articles, words, quotes, facts, and lessons, rather than separate save systems per feature — simpler UI and simpler schema.

### 5.10 Personal Knowledge Graph
Every saved article, learned word, quiz result, and note is linked into a per-user knowledge graph (Postgres + pgvector). Powers:
- Smarter recommendations ("you saved 3 articles about LLM agents this week — here's a deeper one")
- The AI Assistant answering "what have I learned about X?" across all content types
- A visual "knowledge map" analytics view showing topic clusters the user has built expertise in

### 5.11 Daily Journal + AI Reflection
A short end-of-day prompt ("What's one thing you learned today?"). The AI can summarize weekly entries into a personal growth digest, combined with XP/streak data, delivered as a weekly email.

### 5.12 RSS / Podcast Hub
Users add their own RSS feeds or podcasts alongside curated news, with AI-generated episode summaries — extends the "replace multiple apps" value proposition.

### 5.13 Offline-First Sync
Actions taken offline (task completion, quiz answers, journal entries) queue locally (IndexedDB) and sync on reconnect — important given the audience includes users with unreliable connections.

### 5.14 Study Groups / Social Accountability
Optional friend/study-group streaks and shared leaderboards. Opt-in and private-by-default — no activity is shown publicly unless the user explicitly enables it.

### 5.15 Public Developer API
A limited read API (daily word, daily fact, quote of the day) for developers to build on — low-cost, builds ecosystem goodwill.

---

## 6. AI Assistant (Ilm AI)

### 6.1 Capabilities
- **AI Chat** — general Q&A, context-aware, markdown/code formatting
- **News Assistant** — summarize, explain simply, compare stories, key takeaways, bias-aware summaries, timelines
- **Learning Assistant** — explain topics, study notes, flashcards, mind maps, resource recommendations
- **Vocabulary Coach** — meanings, pronunciation help, sentence generation, grammar correction
- **AI Quiz Generator** — from articles, notes, vocabulary, programming topics
- **AI Writing Assistant** — rewriting, grammar, emails, blog posts, resumes, cover letters
- **Programming Assistant** — debug, explain, generate, review, optimize code (JS/TS/Python/C++/Java/Go/Rust)
- **Productivity Assistant** — day planning, goal breakdown, study schedules, Pomodoro suggestions
- **AI Search** — natural-language search across news, saved content, vocabulary, facts, notes, tasks
- **Personalized Recommendations** — driven by the Knowledge Graph (5.10)

### 6.2 AI Architecture

```
Next.js Frontend
        │
        ▼
Express API
        │
        ▼
AI Service Layer  ── provider router + prompt templates + response cache
        │
 ┌──────┼───────────┬────────────────┐
 │      │           │                │
 ▼      ▼           ▼                ▼
OpenAI Gemini    Claude     Open-source (fallback)
        │
        ▼
Conversation Memory (per-user, summarized after N turns)
        │
        ▼
PostgreSQL (pgvector) + Redis (short-term cache)
```

### 6.3 Cost & Reliability Controls
- **Model routing by task complexity:** cheap/fast models for classification and short summaries; larger models reserved for open-ended chat, code generation, and long-form writing
- **Response caching:** identical or near-identical requests (e.g., summarizing the same article) are cached and reused across users, not regenerated per-user
- **Token budgets per user/day** on the free tier, with graceful degradation (shorter summaries, fewer quiz questions) rather than hard failures
- **Provider fallback chain:** automatic retry with a secondary provider if the primary errors or times out
- **Conversation memory summarization:** older turns are summarized rather than resent in full, to control context length and cost

### 6.4 Future AI Features
Voice conversations, camera-based question answering, image understanding, PDF analysis, YouTube video summarization, meeting transcription, screen sharing, real-time translation.

---

## 7. Business Model

| Tier | Price | Includes |
|---|---|---|
| **Free** | $0 | Core dashboard, daily word/fact, limited AI chat (token-capped), basic quiz |
| **Pro** | Monthly/annual subscription | Unlimited AI chat, AI quiz generator, advanced analytics, knowledge graph, priority news refresh |
| **Student** | Discounted Pro | Verified student status — increases adoption in the core student/exam-aspirant audience |
| **Teams / Institutions** | Custom (later) | Shared leaderboards, admin dashboard for classrooms or bootcamps |

No ads are planned; monetization is subscription-based to keep the product distraction-free.

---

## 8. Privacy, Security & Content Moderation

- **Data minimization:** journal entries and chat history are encrypted at rest and excluded from third-party model training where the API allows it (zero-data-retention endpoints)
- **Content moderation:** AI-generated summaries and quiz content pass through a lightweight moderation check before display, since news content can touch sensitive topics
- **Compliance:** the audience includes students, potentially minors — extra care around chat content, minimal data collection, and clear guardian-facing information where relevant
- **Rate limiting & abuse prevention:** per-user and per-IP limits on AI endpoints (Redis-backed) to prevent cost abuse
- **Secrets management:** all third-party API keys stay server-side, never exposed to the frontend

---

## 9. Testing, CI/CD & Observability

- **Testing:** unit tests (Vitest/Jest) for services, integration tests for API routes, Playwright for critical flows (login, save word, complete quiz)
- **CI/CD:** GitHub Actions — lint, typecheck, test, build on every PR; auto-deploy `main` to staging, manual promotion to production
- **Observability:** Sentry for errors (frontend + backend), structured logging (pino), uptime monitoring for external API dependencies
- **Feature flags:** simple flag system to roll out new AI features gradually and kill-switch anything misbehaving in production

---

## 10. Design Language

Inspired by Apple, Linear, Vercel, Notion, Arc Browser, Stripe.
Principles: minimal, premium, fast, responsive, accessible, distraction-free.

---

## 11. Folder Structure

```
ilm/
apps/
├── web (Next.js)

server/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── prisma/
│   ├── jobs/
│   ├── utils/
│   └── server.ts

packages/
├── ui
├── types
├── config

docs/
```

---

## 12. Development Roadmap

**Phase 0 — MVP**
Auth, dashboard shell, one news feed, daily word/fact, basic AI chat, streaks, bookmarks, PWA. *(Section 4)*

**Phase 1 — Foundation Hardening**
Testing setup, CI/CD, error tracking, rate limiting, caching layer for external APIs.

**Phase 2 — Productivity**
Full Task Manager, Calendar, Notes, unified Bookmarks, user profile & settings.

**Phase 3 — Knowledge Expansion**
Full Vocabulary Hub with spaced repetition, Quotes, Facts, Learn Today, Reading Hub.

**Phase 4 — Live Content**
AI News, India News, World News, YouTube creator updates, Weather, Market Dashboard, RSS/Podcast Hub — via the scheduled ingestion pipeline.

**Phase 5 — Engagement**
Full Quiz Engine, XP, Levels, Achievements, Leaderboards, Study Groups.

**Phase 6 — AI Depth**
Full AI Assistant capability set, Personal Knowledge Graph, AI Search, Daily Journal + AI Reflection.

**Phase 7 — Optimization & Ecosystem**
Redis caching tuning, SEO, analytics, performance, security audit, PWA polish, Public Developer API, Chrome extension / new-tab dashboard.

---

## 13. Future Features (Longer-Term)
- Browser extension / Chrome new-tab dashboard
- Android, iOS, and Desktop apps
- Multi-language UI support
- Team workspaces (institutions/bootcamps)
- Community discussions, public profiles (opt-in)
- Structured learning paths
- Habit tracker + Pomodoro focus timer
- Newsletter generator
- Voice conversations, camera-based Q&A, image understanding, PDF analysis, video summarization, meeting transcription, real-time translation

---

## 14. Success Metrics
- Dashboard loads in under 2 seconds
- Lighthouse score above 95
- Mobile-first, fully responsive
- Core daily loop completable in under 5 minutes
- Strong D7/D30 retention driven by streaks and spaced repetition, not just novelty
- AI cost per active user stays within a defined budget
- Modular, scalable, well-tested codebase

---

## 15. Vision

**Ilm is not a news website. It is a Daily Knowledge Operating System.**

Every morning, users open one app to discover what happened, what to learn, what to remember, what to do, and what to improve — all in a premium, fast, distraction-free experience, powered by an AI assistant that genuinely understands their learning history and grows more useful over time.
