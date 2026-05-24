# CLAUDE.md

# 역할

당신은 시니어 프론트엔드 엔지니어입니다.

---

# 작업 규칙

## [Plan 단계]

1. 항상 Plan Mode로 시작하세요.
2. 작업을 기능 단위로 나누고 전체 작업 범위를 정의하세요.
3. 작업 범위를 간단히 브리핑한 뒤, 내 확인을 받으세요.
4. 승인 전에는 구현 시작하지 마세요.

## [작업 진행]

5. 기능 단위로 작업하세요.
6. 각 작업 완료 후 반드시 멈추세요.
7. 다음 단계 진행 전 내 확인을 받으세요.

## [커밋 규칙]

8. 커밋 생성 전, 변경 요약을 먼저 제시하고 내 승인을 받으세요.
9. 승인 후에만 커밋하세요.
10. 커밋 메시지에 `Co-Authored-By: Claude ...` 라인을 포함하지 마세요.

---

# 브랜치 / 커밋 컨벤션

브랜치를 만들거나 커밋 메시지를 작성하기 전 **반드시 아래 컨벤션을 사전 체크**한 뒤 진행하세요.

## Branch Convention

브랜치 형식은 다음으로 통일한다.

```
type/#issueNum/{domain}
```

예시

```
feat/#12/recruiting
fix/#17/apply
refactor/#9/api
docs/#22/global
chore/#18/global
```

## Commit Convention

커밋 형식은 다음으로 통일한다.

```
type(#issueNum/domain): 작업 내용
```

예시

```
feat(#12/recruiting): 모집 일정 카운트다운 추가
fix(#17/apply): 인터뷰 시간 중복 선택 차단
refactor(#9/api): apiCall 에러 핸들링 통합
refactor(#10/constants): 상수 모듈 도메인별 분리
docs(#13/global): API 응답 스키마 문서 추가
chore(#18/global): pnpm 9.x 업그레이드
```

## type (브랜치 · 커밋 공통)

| type | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 구조 개선 |
| `docs` | 문서, JSDoc, README 수정 |
| `test` | 테스트 추가 또는 수정 |
| `chore` | 설정, 패키지, 빌드, 배포 작업 |

## domain

작업 대상 도메인을 나타낸다. 이 프로젝트의 페이지 / 레이어 구조 기준.

**페이지 도메인** (`src/pages/*` 기준)

```
index               메인 페이지 (/)
about               About 페이지
activities          Activities 페이지
projects            Projects 페이지
sponsor             Sponsor 페이지
recruiting          Recruiting 페이지
apply               Apply 페이지 (지원서 폼)
application-result  합격 조회 페이지
faq                 FAQ 페이지
```

**횡단 관심사 도메인**

```
shared       공용 컴포넌트 (Header, Footer, PageHeroSection, SectionHeader, ScrollToTopButton, SEO)
ui           shadcn/ui 베이스 컴포넌트 (src/components/ui/)
hooks        커스텀 훅 (src/hooks/)
api          API 레이어 (src/lib/api.ts, 백엔드 통신)
constants    상수 모듈 (src/lib/constants/)
seo          메타 태그, sitemap, robots, JSON-LD
```

**Catch-all 도메인**

```
global       공통 (설정, 빌드, 패키지, 배포, 유틸, 템플릿 등)
```

새 도메인이 필요한 경우 위 목록을 갱신한 뒤 사용하세요.

---

# 작업 Flow

## 작업 시작 전 사전 질문 (필수)

작업을 시작하기 전 **반드시** 아래를 사용자에게 물어 경로를 결정한다. Claude가 임의로 판단해서 결정 금지.

- **간단 작업 (`main` 직접 커밋·푸시)** — 오타 수정, 문서 한 줄 변경, CLAUDE.md/README 정비, 사소한 chore 등.
- **일반 작업 (아래 9단계 전체 flow)** — 기능 추가/수정, 리팩터, 명세 변경 등 이슈 단위로 추적할 가치가 있는 작업.

판단이 애매하면 일반 작업으로 처리한다.

## 일반 작업 9단계

아래 순서를 **반드시** 따른다. 단계 건너뛰기 금지.

1. **이슈 템플릿 확인**
   - `.github/ISSUE_TEMPLATE/` 폴더에서 작업 타입에 맞는 템플릿(`FEAT.md` / `FIX.md` / `REFACTOR.md` / `DOCS.md` / `CHORE.md`)을 먼저 읽는다.
2. **이슈 생성**
   - `gh issue create`로 템플릿 형식 그대로 이슈를 생성한다. 임의 섹션 추가/누락 금지.
3. **브랜치 생성**
   - 위 [브랜치 / 커밋 컨벤션] 형식대로 `type/#issueNum/{domain}` 브랜치를 따고 체크아웃한다.
4. **작업 진행**
   - 기능 단위로 구현한다. 각 단위 완료 후 멈추고 사용자 확인을 받는다.
5. **커밋**
   - 작업 범위를 나눠서 [Commit Convention] 형식대로 커밋한다.
   - 커밋 전 변경 요약을 먼저 제시하고 승인을 받는다.
6. **푸시**
   - `git push -u origin <branch>` 로 원격 브랜치에 푸시한다.
7. **PR 생성**
   - `.github/pull_request_template.md` 형식 그대로 `gh pr create`로 PR을 생성한다.
   - PR 타이틀은 **이슈 제목과 동일하게** (`gh issue view <num>` 로 가져오기).
8. **검수 / 머지 대기**
   - 개발자가 직접 검수하고 **수동으로 머지**한다.
   - Claude는 머지하지 않는다. 머지 명령 자동 실행 금지.
9. **머지 후 정리**
   - 머지 완료 확인 → `git checkout main` → `git pull` → 로컬 작업 브랜치 삭제(`git branch -d <branch>`).

---

## Language & Communication Rules

- Default response language: Korean
- Code comments: Korean
- Commit messages: Korean (본문 한국어 작성)
- PR title / body: Korean (PR 제목은 이슈 제목과 동일하게 유지)
- Branch naming: English (`type/#issueNum/{domain}` 형식, 위 [브랜치 / 커밋 컨벤션] 참고)
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

## Component Design Principles

Three core principles of the component-based architecture.

### 1. Single Responsibility
Each component focuses on a single role. Do not place data fetching/sorting/processing logic and rendering logic in the same component.

### 2. Reusable vs Domain-Specific Components
- `src/components/ui/` — Pure UI atomic components with no knowledge of app state or domain data
- `src/components/shared/` — Layout and common section components reused across multiple pages (e.g., `PageHeroSection`, `SectionHeader`)
- `src/components/pages/` — Domain-specific components; not reused across other pages
- If a shared component (`shared/`) already exists, do not re-implement the same layout inline

### 3. Container vs Presentation (Parent-Child Separation)
- **Parent (Container)**: Responsible for data fetching, sorting, injecting constants, and flow control
  - Page components (`src/pages/`) or section components acting as containers
- **Child (Presentation)**: Only responsible for rendering data received via props
  - Must not directly import global constants or APIs internally

### Data Flow Rules
- Sibling components under the same parent must use a consistent data acquisition method (no mixing props and direct imports)
- If a component needs to support future API replacement, data fetching must be handled by the parent (page) and the component should only receive props
- Hardcoded strings (emails, URLs, etc.) must reference constants defined in `src/lib/constants/`

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
