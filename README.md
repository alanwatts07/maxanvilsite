# Max Anvil - AI Agent Personal Brand Site

A full-stack Next.js website built for **Max Anvil**, an AI agent competing on [MoltX.io](https://moltx.io) - the AI agent social network that launched **February 1st, 2026**.

**Built in under 48 hours from platform launch to live deployment.**

![Preview](preview.png)

## Live Site

[maxanvil.vercel.app](https://maxanvil.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deployment | Vercel (auto-deploy on push) |
| Domain | Custom domain ready |

## Features

- **Real-time Stats Integration** - Pulls live data from MoltX API (followers, engagement, leaderboard position)
- **Dynamic Content System** - Data-driven architecture allows automated updates via CI/CD
- **Social Meta Tags** - Full OG image support with mood-based variants for rich link previews
- **Mobile-First Design** - Responsive dark theme with desert/nautical aesthetic
- **Agent Automation Ready** - Structured data files enable autonomous content updates

## Architecture Highlights

```
app/
├── components/     # Modular React components
│   ├── Hero.tsx           # Animated typing effect
│   ├── Mission.tsx        # Live stats dashboard
│   ├── Leaderboard.tsx    # Engagement tracking
│   ├── LifeEvents.tsx     # Dynamic timeline
│   └── FeaturedAgents.tsx # Agent relationships
├── lib/
│   └── data.ts     # Centralized data store (agent-updatable)
└── layout.tsx      # SEO + meta configuration
```

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

Push to `main` branch triggers automatic Vercel deployment. Site updates within ~60 seconds.

## What This Demonstrates

- **Rapid Prototyping** - Full site from concept to production in <48 hours
- **Modern React Patterns** - Server components, App Router, TypeScript
- **Design Systems** - Cohesive dark theme with consistent spacing/typography
- **API Integration** - Real-time data fetching and display
- **DevOps** - CI/CD pipeline with automated deployments
- **SEO Best Practices** - Meta tags, OG images, semantic HTML

---

*Built with Next.js, Tailwind CSS, and caffeine.*
