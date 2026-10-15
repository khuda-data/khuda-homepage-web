# KHUDA Homepage

경희대학교 데이터분석/AI 학회 KHUDA 공식 홈페이지

<img width="2846" height="1520" alt="image" src="https://github.com/user-attachments/assets/2b8af8d8-44fb-4f23-9b56-6b07d80b08ee" />
<img width="2838" height="1522" alt="hero-2" src="https://github.com/user-attachments/assets/0e8f8e85-fa11-41ec-b98e-3c837b90d8ce" />

## 기술 스택

| Category | Stack |
|---|---|
| Language | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| Framework | ![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white) |
| Styling | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radixui&logoColor=white) |
| State / Data | ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) |
| Package Manager | ![pnpm](https://img.shields.io/badge/pnpm_9-F69220?style=for-the-badge&logo=pnpm&logoColor=white) |
| Deploy | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |

공식 홈페이지는 Next.js App Router, 운영진 어드민은 Vite SPA다. 지원서 접수 백엔드는 별도 레포에서 FastAPI로 운영한다.

## 시작하기

Node 22와 pnpm 9가 필요하다. pnpm은 corepack으로 받는다.

```bash
corepack enable
pnpm install
```

```bash
pnpm dev          # 공식 홈페이지  http://localhost:8080
pnpm admin dev    # 운영진 어드민  http://localhost:8081
```

환경변수를 설정하지 않으면 두 앱 모두 운영 API(`https://api.khuda.kro.kr`)에 붙는다. 로컬 백엔드를 쓰려면 `apps/web/.env.local`에 `NEXT_PUBLIC_API_BASE_URL`, `apps/admin/.env`에 `VITE_API_BASE_URL`을 로컬 API 주소로 넣는다. (`apps/admin/.env.example` 참고)

## 프로젝트 구조와 배포

pnpm 워크스페이스 모노레포다. 공식 홈페이지와 운영진 어드민을 한 레포에서 관리한다.

```
apps/
  web     공식 홈페이지 (Next.js)
  admin   운영진 어드민 (Vite SPA, 지원자 조회/수정/내보내기)
```

빌드가 서로 다르고, Vercel에 프로젝트 2개를 같은 레포에 연결해 분리 배포한다.

| Vercel 프로젝트 | Root Directory | 프레임워크 | 도메인 |
| --- | --- | --- | --- |
| `khuda-homepage-web` | `apps/web` | Next.js | `www.khuda.co.kr` (`khuda.co.kr`은 www로 리다이렉트) |
| `khuda-homepage-web-admin` | `apps/admin` | Vite | `khuda-homepage-web-admin.vercel.app` (운영진 전용, 커스텀 도메인은 미연결) |

- 각 앱의 `vercel.json`이 프레임워크와 라우팅을 따로 잡는다.
- 두 프로젝트 모두 Vercel의 Root Directory 변경 감지가 켜져 있어, `apps/web`만 바뀌면 web만 배포되고 admin은 건너뛴다. (반대도 동일)
- `main`에 머지하면 프로덕션이 배포되고, PR 브랜치는 프리뷰가 자동으로 올라온다.
- Vercel 팀은 쿠다 공식 계정(`khuda-officials-projects`)이다.

지원 접수 API 같은 백엔드는 별도 레포 [`khuda-homepage-api`](https://github.com/khuda-data/khuda-homepage-api)에서 관리한다.

## 문서

| 문서 | 내용 |
| --- | --- |
| [docs/api/API.md](docs/api/API.md) | 지원서 API 명세 (API 레포와 같은 내용) |
| [docs/db/DB.md](docs/db/DB.md) | 지원서 DB 스키마 (API 레포와 같은 내용) |
| [docs/analytics/ANALYTICS.md](docs/analytics/ANALYTICS.md) | GA4 측정 ID와 전환 이벤트 설정 |

`docs/api/API.md`와 `docs/db/DB.md`는 API 레포에 같은 파일이 있다. 한쪽만 고치면 갈라지니 함께 갱신한다.

## Team

### PM
![PM](https://img.shields.io/badge/PM-신진수-FFFFFF?style=flat&logoColor=black)

### 기획
![Planning](https://img.shields.io/badge/기획-신진수%20|%20양경식%20|%20오윤진%20|%20오종현-FFFFFF?style=flat&logoColor=black)

### 프론트엔드 개발
![Frontend](https://img.shields.io/badge/프론트엔드-신진수%20|%20오종현-FFFFFF?style=flat&logoColor=black)

### QA
![QA](https://img.shields.io/badge/QA-양경식%20|%20조윤수-FFFFFF?style=flat&logoColor=black)

## 외부 참여자 협업

외부 참여자는 원칙적으로 홈페이지 수정 권한을 갖지 않습니다.

다만 인력이 부족하거나 TF 역량 범위 밖의 수정이 필요한 경우에는 회장단 또는 TF 협의를 거쳐 방학 기간 동안 한시적으로 참여할 수 있습니다.

또한 먼저 실제 업무에 필요한 범위를 판단한 뒤,

* 개발이 필요한 작업은 개발 협업 형태로,
* 컨텐츠 추가 및 관리가 필요한 작업은 컨텐츠 작업 형태로

구분하여 진행합니다.
