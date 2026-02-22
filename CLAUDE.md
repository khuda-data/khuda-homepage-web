# CLAUDE.md

## Project Overview

KHUDA Homepage Web Project - Official website for KHUDA, a data analysis club at Kyung Hee University

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 5
- **Package Manager**: pnpm (>= 9.0.0, Node >= 18.0.0)
- **Styling**: Tailwind CSS 3 + tailwindcss-animate
- **UI Components**: Radix UI + shadcn/ui (CVA + tailwind-merge + clsx)
- **Routing**: React Router DOM v6
- **Animation**: Motion (framer-motion), OGL
- **State/Data**: TanStack React Query
- **Deployment**: Vercel

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components (accordion, badge, button, card, dialog, input, label, select, sonner, textarea, toast, toaster, tooltip)
│   ├── shared/          # Shared components (Footer, Header, PageHeroSection, ScrollToTopButton, SectionHeader)
│   └── pages/           # Page-specific components
│       ├── About/
│       ├── Activities/
│       ├── ApplicationResult/
│       ├── Apply/
│       ├── Index/       # HeroSection, Grainient (OGL shader), etc.
│       ├── Projects/
│       ├── Recruiting/  # Includes FAQSection
│       └── Sponsor/
├── pages/               # Route pages
├── hooks/               # Custom hooks (use-scroll-animation, use-toast, useApplicationForm, useApplicationQuestions)
├── lib/                 # Utilities (api, constants, date-utils, form-utils, questionUtils, statusUtils, utils)
└── utils/               # Utility functions (analytics)

public/
├── fonts/               # Web fonts (Cafe24Decobox)
└── images/
    ├── activities/      # Activity images
    ├── headers/         # Page header background images
    ├── logos/           # KHUDA logos (khuda-ico, khuda-logo, khuda-logo-white)
    ├── projects/        # Project images
    └── sponsors/        # Sponsor logos (lovable, perplexity, Kyung Hee University)
```

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm build:dev  # Development mode build
pnpm lint       # Run ESLint
pnpm preview    # Preview build output
```

## Page Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| **Index** (Main) | `/` | ✅ Complete | HeroSection + AboutSection |
| **About** | `/about` | ✅ Complete | Club introduction, vision, executive profiles, etc. |
| **Activities** | `/activities` | ✅ Complete | 3-tab structure: curriculum/datathon/conference |
| **Projects** | `/projects` | ✅ Complete | ProjectsSection component separated |
| **Recruiting** | `/recruiting` | ✅ Complete | RecruitingSection + FAQSection + ApplicationCTA |
| **Apply** | `/apply` | ✅ Complete | Google Sheets API integration form. YB/OB question branching |
| **ApplicationResult** | `/application-result` | ✅ Complete | Query by student ID/phone/name. Opening time restrictions |
| **Sponsor** | `/sponsor` | ✅ Complete | SponsorSection component separated |
| **FAQ** | `/faq` | ✅ Complete | FAQSection (reuses Recruiting component) |
| **NotFound** (404) | `*` | ✅ Complete | Simple 404 page |

## Conventions

- Component file names use PascalCase (e.g., `Activities.tsx`)
- UI components are located in `src/components/ui/` (shadcn/ui pattern)
- Page-specific components are located in `src/components/pages/`
- Shared components are located in `src/components/shared/`
- Korean commit messages are allowed
