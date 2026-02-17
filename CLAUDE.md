# CLAUDE.md

## Project Overview

KHUDA 홈페이지 웹 프로젝트 - 경희대학교 데이터 분석 동아리 KHUDA의 공식 웹사이트

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 5
- **Package Manager**: pnpm (>= 9.0.0, Node >= 18.0.0)
- **Styling**: Tailwind CSS 3 + tailwindcss-animate
- **UI Components**: Radix UI + shadcn/ui (CVA + tailwind-merge + clsx)
- **Routing**: React Router DOM v6
- **Animation**: Motion (framer-motion), GSAP
- **3D**: Three.js + React Three Fiber + Drei, OGL
- **State/Data**: TanStack React Query
- **Form**: React Hook Form + Zod
- **Deployment**: Vercel

## Project Structure

```
src/
├── components/
│   ├── ui/          # shadcn/ui 기본 컴포넌트
│   ├── shared/      # 공용 컴포넌트
│   └── pages/       # 페이지별 컴포넌트
├── pages/           # 라우트 페이지
├── hooks/           # 커스텀 훅
├── lib/             # 유틸리티 (shadcn/ui utils 등)
└── utils/           # 유틸리티 함수
```

## Commands

```bash
pnpm dev        # 개발 서버 실행
pnpm build      # 프로덕션 빌드
pnpm build:dev  # 개발 모드 빌드
pnpm lint       # ESLint 실행
pnpm preview    # 빌드 결과 미리보기
```

## Page Status

| 페이지 | 경로 | 상태 | 비고 |
|--------|------|------|------|
| **Index** (메인) | `/` | 구현 완료 | HeroSection + AboutSection |
| **Activities** (활동) | `/activities` | 구현 완료 | 커리큘럼/데이터톤/컨퍼런스 3탭 구조. 이미지 플레이스홀더 있음 |
| **Projects** (프로젝트) | `/projects` | 구현 완료 | ProjectsSection 컴포넌트 분리 |
| **Recruiting** (리크루팅) | `/recruiting` | 구현 완료 | RecruitingSection + ApplicationCTA |
| **Apply** (지원서) | `/apply` | 구현 완료 | Google Sheets API 연동 폼. YB/OB 유형별 질문 분기 |
| **ApplicationResult** (합격 조회) | `/application-result` | 구현 완료 | 학번/전화번호/이름으로 조회. 오픈 시간 제한 있음 |
| **Sponsor** (후원) | `/sponsor` | 구현 완료 | SponsorSection 컴포넌트 분리 |
| **FAQ** | `/faq` | 구현 완료 | FAQSection (shared 컴포넌트) |
| **NotFound** (404) | `*` | 구현 완료 | 간단한 404 페이지 |

- `ActivitiesBackup.tsx` — 이전 버전 백업 파일 (미사용)

## Conventions

- 컴포넌트 파일명은 PascalCase 사용 (e.g., `Activities.tsx`)
- UI 컴포넌트는 `src/components/ui/`에 위치 (shadcn/ui 패턴)
- 페이지별 컴포넌트는 `src/components/pages/`에 위치
- 공용 컴포넌트는 `src/components/shared/`에 위치
- 한국어 커밋 메시지 사용 가능
