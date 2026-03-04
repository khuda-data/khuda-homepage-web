# CLAUDE.md

## Language & Communication Rules

- Default response language: Korean
- Code comments: Korean
- Commit messages: English
- Documentation: Korean
- Variable/function names: English (follow code standards)

## Project Overview

KHUDA Homepage Web Project - Official website for KHUDA, a data analysis & AI club at Kyung Hee University

## Tech Stack

- **Framework**: React 19 + TypeScript 5
- **Build Tool**: Vite 5 + SWC (`@vitejs/plugin-react-swc`)
- **Package Manager**: pnpm (>= 9.0.0, Node >= 18.0.0)
- **Styling**: Tailwind CSS 3 + tailwindcss-animate
- **UI Components**: Radix UI + shadcn/ui (CVA + tailwind-merge + clsx)
- **Routing**: React Router DOM v6
- **Animation**: Motion (framer-motion), OGL (WebGL shader)
- **State/Data**: TanStack React Query v5
- **SEO**: react-helmet-async (shared `<SEO>` component)
- **Icons**: Lucide React
- **Image Optimization**: vite-plugin-image-optimizer + sharp (JPEG 85 / PNG 90 at build time)
- **Deployment**: Vercel (`vercel.json` SPA rewrite)

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components (13)
│   │                    # accordion, badge, button, card, dialog, input,
│   │                    # label, select, sonner, textarea, toast, toaster, tooltip
│   ├── shared/          # Shared components (6)
│   │                    # Footer, Header, PageHeroSection, ScrollToTopButton, SectionHeader, SEO
│   └── pages/           # Page-specific components
│       ├── About/       # AboutMainSection, CircularTextWithLogo, ExecutiveProfileSection,
│       │                # IntroductionSection, JourneySection, MissionSection,
│       │                # ValuesSection, VisionSection, WhoWeAreSection
│       ├── Activities/  # AcademicFestivalContent, CurriculumSection, DatathonContent,
│       │                # ImageGallery, MLSessionContent, ToyProjectContent, TrackSessionContent
│       ├── ApplicationResult/  # ContactInfo, ResultCard, ResultMessageSection,
│       │                      # ResultQueryForm, StatusBadge, StatusDisplay
│       ├── Apply/       # ApplicationHeader, ApplicationTypeSelector, BasicInfoCard,
│       │                # DataAnalysisFieldSelector, FAQCard, InterviewDateSelector,
│       │                # LongTextQuestion, PrivacyConsentCard, PythonLevelSelector,
│       │                # QuestionCard, QuestionField, QuestionRenderer, ResidenceSelector,
│       │                # ScheduleCard, StudyCreationSelector, SubmissionSuccess,
│       │                # TextInputField, TrackSelector
│       ├── Index/       # HeroSection, AboutSection, AchievementsSection, ActivityImage,
│       │                # ActivityList, CountUp, FeatureShowcase, Grainient(.jsx),
│       │                # SponsorShowcase, TrackShowcase
│       ├── Projects/    # CustomSelect, ProjectCard, ProjectModal, ProjectsSection
│       ├── Recruiting/  # ApplicationCTA, FAQSection, HeroSection, NotesSection(/AccordionCard,
│       │                # OBContent, YBContent), RecruitingSection, RecruitmentInfoCards,
│       │                # RecruitmentProcess, RotatingText(.jsx), TargetCards, TargetSection,
│       │                # YBODialogs
│       └── Sponsor/     # LogoLoop, NavigationArrow, SponsorCard, SponsorInquiryButton,
│                        # SponsorSection
├── pages/               # Route pages (10)
│                        # Index, About, Activities, Projects, Sponsor, Recruiting,
│                        # FAQ, Apply, ApplicationResult, NotFound
├── hooks/               # Custom hooks (5)
│                        # use-scroll-animation, use-toast, useApplicationForm,
│                        # useApplicationQuestions, useApplicationResult
├── lib/
│   ├── constants/       # Constants module directory (12 files)
│   │   ├── index.ts     # Barrel re-export
│   │   ├── app.ts       # API_BASE_URL, REQUEST_TIMEOUT, API_ENDPOINTS, ROUTES, IMAGE_PATHS
│   │   ├── about.ts     # KHUDA_VALUES, KHUDA_FEATURES, KHUDA_ACHIEVEMENTS
│   │   ├── application.ts # APPLICATION_CTA_MESSAGES, APPLICATION_FORM_CONFIG
│   │   ├── contact.ts   # CONTACT_EMAIL, CONTACT_PHONE, LOCATION, SOCIAL_LINKS
│   │   ├── curriculum.ts # INDEX_TRACKS, CURRICULUM_INFO (6 tracks: NLP/CV/DE/DB/AIE/FIN)
│   │   ├── faq.ts       # FAQ_MESSAGES, FAQ_STYLES
│   │   ├── footer.ts    # FOOTER_INFO, FOOTER_STYLES
│   │   ├── header.ts    # HEADER_CONFIG, HEADER_STYLES
│   │   ├── hero.ts      # HERO_CONFIG, HERO_STYLES
│   │   ├── recruiting.ts # RESULT_OPEN_TIME, RECRUITMENT_INFO, RECRUITMENT_SCHEDULE
│   │   ├── sponsor.ts   # INDEX_SPONSORS, SPONSOR_PAGE_CONFIG
│   │   └── ui.ts        # SCROLL_ANIMATION_CONFIG, SECTION_STYLES, COMMON_STYLES
│   ├── api.ts           # apiCall wrapper, ApiError/NetworkError classes, 30s timeout
│   ├── date-utils.ts    # parseKoreanDate, extractDateRange, getStepStatus, calculateTimeLeft
│   ├── form-utils.ts    # Form style utils (checkbox, radio, interview time button classes)
│   ├── questionUtils.ts # getPlaceholder, getQuestionNumber, getLongTextDescription
│   ├── statusUtils.ts   # getStatusType ('fail'|'pass'|'pending'|'default')
│   └── utils.ts         # cn() (clsx + tailwind-merge)
├── types/
│   └── interview.ts     # InterviewDate, InterviewSchedule types
└── utils/               # Utility functions (5)
    ├── analytics.ts     # trackPageView, trackEvent (Google Analytics)
    ├── clipboard.ts     # copyToClipboard
    ├── dom.ts           # scrollToSection
    ├── interview.ts     # generateInterviewTimes (10:00~20:00, 20min intervals)
    └── questions.ts     # filterOBQuestions (exclude position 9~21)

public/
├── fonts/               # Web fonts (Cafe24Decobox.ttf)
├── robots.txt           # Crawler rules
├── sitemap.xml          # Sitemap
└── images/
    ├── activities/      # Activity images (27: conference, datathon, ml-session, networking, toy-project, track-session)
    ├── headers/         # Page header backgrounds (hello.png)
    ├── logos/           # KHUDA logos (khuda-ico.png, khuda-logo.png, khuda-logo-white.png)
    ├── projects/        # Project thumbnails (9)
    └── sponsors/        # Sponsor logos (6: hanbit, ksmcoffee, lovable, monster, perplexity, univ)
```

## Path Alias

```typescript
// vite.config.ts + tsconfig
"@" → "./src"
// e.g. import { cn } from "@/lib/utils"
```

## Commands

```bash
pnpm dev        # Start dev server (port 8080)
pnpm build      # Production build
pnpm build:dev  # Development mode build
pnpm lint       # Run ESLint
pnpm preview    # Preview build output
```

## API Endpoints

Base URL: `https://api-khuda.gaeng02.com` (override via `VITE_API_BASE_URL` env var)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/questions/{type}` | Fetch questions by applicant type (`yb`/`ob`/`common`) |
| POST | `/api/applications` | Submit application |
| POST | `/api/application_result` | Query admission result (student ID / phone / name) |

## Page Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| **Index** (Main) | `/` | ✅ | HeroSection + AboutSection + AchievementsSection + FeatureShowcase + TrackShowcase + ActivityList + SponsorShowcase |
| **About** | `/about` | ✅ | Club intro, vision, mission, values, journey, executive profiles |
| **Activities** | `/activities` | ✅ | Curriculum / Toy Project / Track Session / ML Session / Datathon / Academic Festival |
| **Projects** | `/projects` | ✅ | ProjectsSection (hardcoded data, modal detail view) |
| **Recruiting** | `/recruiting` | ✅ | RecruitingSection + NotesSection(YB/OB) + TargetSection + FAQSection + ApplicationCTA |
| **Apply** | `/apply` | ✅ | API-integrated form, YB/OB question branching, interview date selection |
| **ApplicationResult** | `/application-result` | ✅ | Query by student ID/phone/name, RESULT_OPEN_TIME time restriction |
| **Sponsor** | `/sponsor` | ✅ | SponsorCard + LogoLoop + SponsorInquiryButton |
| **FAQ** | `/faq` | ✅ | FAQSection (reuses Recruiting component) |
| **NotFound** (404) | `*` | ✅ | Simple 404 page |

## Conventions

- Component filenames: PascalCase (e.g., `Activities.tsx`)
- UI components: `src/components/ui/` (shadcn/ui pattern)
- Page-specific components: `src/components/pages/`
- Shared components: `src/components/shared/`
- Constants: `src/lib/constants/` directory, split by domain, barrel re-exported via `index.ts`
- shadcn/ui config: `components.json` (style: default, baseColor: zinc, cssVariables: true, iconLibrary: lucide)
- ESLint: flat config (ESLint 9.x), `@typescript-eslint/no-unused-vars: off`

## Key Architectural Decisions

- **QueryClient**: `retry: 1`, `staleTime: 5min`, `refetchOnWindowFocus: false` (created outside component, in `App.tsx`)
- **Scroll animation**: `useScrollAnimation` hook — IntersectionObserver-based, `triggerOnce` defaults to true
- **Dual toast**: shadcn/ui `Toaster` + sonner `Toaster` both mounted — use `useToast` for form feedback, sonner for simple notifications
- **API layer**: `src/lib/api.ts` — `fetchWithTimeout`(30s) + `apiCall` wrapper + response validators + `ApiError`/`NetworkError` custom errors
- **SEO**: `src/components/shared/SEO.tsx` — react-helmet-async, supports Open Graph / canonical / robots / JSON-LD
- **Analytics**: `VITE_GA_MEASUREMENT_ID` env var with hardcoded fallback ID, `PageTracker` component for SPA page view tracking
- **JSX files**: `Grainient.jsx` (OGL WebGL shader), `RotatingText.jsx` (CSS animation) — intentionally not TypeScript
- **Projects data**: Hardcoded in `ProjectsSection.tsx` — replace with API when backend is ready
- **Image optimization**: `vite-plugin-image-optimizer` compresses public/ images at build time (JPEG 85, PNG 90)
- **Tailwind custom**: `khuda.crimson` brand color, `font-sans`(Pretendard), `font-display`(Cafe24Decobox), fade-up/fade-in/slide-in-right custom animations
- **SPA routing**: `ScrollToTop` component resets scroll on navigation, Vercel rewrite for SPA fallback

## Development Notes

- Never mutate React state directly — always use the setter function
- `div` with `onClick` → use `button` element for accessibility
- Extract reusable sub-components to avoid DRY violations (see `ExecutiveCard` pattern)
- No conflicting Tailwind classes on same element (e.g., `top-0` and `-top-8` together)
- `vite.config.ts` dev proxy targets `http://3.38.172.201:8000` (staging API server)
- `index.js` bundle is 535KB (exceeds 500KB) — apply dynamic import for code-splitting if needed

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api-khuda.gaeng02.com` |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics measurement ID | `G-PD86DRNELF` |
