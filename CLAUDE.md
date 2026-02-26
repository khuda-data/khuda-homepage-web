# CLAUDE.md

## 언어 및 커뮤니케이션 규칙
- 기본 응답 언어: 한국어
- 코드 주석: 한국어로 작성
- 커밋 메시지: 영어로 작성
- 문서화: 한국어로 작성
- 변수명/함수명: 영어 (코드 표준 준수)

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

## Key Architectural Decisions

- **QueryClient** is configured with `retry: 1`, `staleTime: 5min`, `refetchOnWindowFocus: false` (in `App.tsx`)
- **Scroll animation** uses a custom `useScrollAnimation` hook with IntersectionObserver (`src/hooks/use-scroll-animation.ts`)
- **Dual toast system**: both shadcn/ui `Toaster` and `sonner` Toaster are mounted in `App.tsx` — use `sonner` for simple notifications, shadcn `useToast` for form feedback
- **API layer** (`src/lib/api.ts`) uses a typed `apiCall` wrapper with custom `ApiError`/`NetworkError` classes and 30s timeout
- **Analytics** reads `VITE_GA_MEASUREMENT_ID` env var, falling back to the hardcoded ID
- **Grainient** and **RotatingText** are `.jsx` files (OGL WebGL shader / CSS animation) — intentionally not TypeScript
- **Projects data** is currently hardcoded in `ProjectsSection.tsx` — replace with API when backend is ready

## Development Notes

- Never mutate React state directly — always use the setter function
- Interactive `div` elements with `onClick` should be converted to `button` elements for accessibility
- Reusable sub-components should be extracted to avoid DRY violations (see `ExecutiveCard` pattern)
- CSS classes that conflict (e.g., `top-0` and `-top-8` on same element) — keep only the intended one
- The `vite.config.ts` dev proxy targets `http://3.38.172.201:8000` — this is the staging API server

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api-khuda.gaeng02.com` |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics ID | `G-PD86DRNELF` |
