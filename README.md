# KHUDA Homepage

경희대학교 데이터분석/AI 학회 KHUDA 공식 홈페이지

<img width="2846" height="1520" alt="image" src="https://github.com/user-attachments/assets/2b8af8d8-44fb-4f23-9b56-6b07d80b08ee" />
<img width="2838" height="1522" alt="hero-2" src="https://github.com/user-attachments/assets/0e8f8e85-fa11-41ec-b98e-3c837b90d8ce" />


## 문서

[![API 명세서](https://img.shields.io/badge/API_명세서-보기-85EA2D?style=flat&logo=swagger&logoColor=black)](doc/api-spec.md)

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
| `khuda-homepage-web-admin` | `apps/admin` | Vite | 운영진 전용 (커스텀 도메인은 추후 연결) |

- 각 앱의 `vercel.json`이 프레임워크와 라우팅을 따로 잡는다.
- 두 프로젝트 모두 Vercel의 Root Directory 변경 감지가 켜져 있어, `apps/web`만 바뀌면 web만 배포되고 admin은 건너뛴다. (반대도 동일)
- `main`에 머지하면 프로덕션이 배포되고, PR 브랜치는 프리뷰가 자동으로 올라온다.
- Vercel 팀은 쿠다 공식 계정(`khuda-officials-projects`)이다.

지원 접수 API 같은 백엔드는 별도 레포 [`khuda-homepage-api`](https://github.com/khuda-data/khuda-homepage-api)에서 관리한다.

## Team

### PM
![PM](https://img.shields.io/badge/PM-신진수-FFFFFF?style=flat&logoColor=black)

### 기획
![Planning](https://img.shields.io/badge/기획-신진수%20|%20양경식%20|%20오윤진%20|%20오종현-FFFFFF?style=flat&logoColor=black)

### 프론트엔드 개발
![Frontend](https://img.shields.io/badge/프론트엔드-신진수%20|%20오종현-FFFFFF?style=flat&logoColor=black)

### QA
![QA](https://img.shields.io/badge/QA-양경식%20|%20조윤수-FFFFFF?style=flat&logoColor=black)

## 홈페이지 권한 관리 및 인수인계

홈페이지 운영에 대한 **기획 권한은 회장과 부회장**이 가지며, 홈페이지 개발 및 운영을 위해 TF를 구성할 수 있습니다.

TF는 필요에 따라 **기획에 참여할 운영진**과 **개발에 참여할 운영진**으로 구성합니다.

개발 권한은 코드베이스의 안정적인 관리를 위해 다음 원칙을 따릅니다.

* 홈페이지 개발은 기수 단위의 인수인계 체계로 운영합니다.
* 현재 기수의 개발자는 다음 기수 개발자에게 코드베이스를 인수인계하고, 약 한 기수 동안 함께 운영하며 안정화를 지원합니다.
* 인수인계가 완료된 이후에는 후배 개발자가 홈페이지의 실질적인 개발 및 유지보수를 담당하며, 선배 개발자는 조언 및 피드백을 제공하는 역할을 수행합니다.
* 다만 선배 개발자가 현재도 KHUDA 소속 운영진으로 활동하고 있는 경우에는 개발 권한을 함께 가질 수 있습니다.

또한 README를 통해 권한 관리 및 인수인계 원칙을 문서화하여 이후 기수에도 동일한 기준이 이어질 수 있도록 관리하겠습니다.

## 외부 참여자 협업

외부 참여자는 원칙적으로 홈페이지 수정 권한을 갖지 않습니다.

다만 인력이 부족하거나 TF 역량 범위 밖의 수정이 필요한 경우에는 회장단 또는 TF 협의를 거쳐 방학 기간 동안 한시적으로 참여할 수 있습니다.

또한 먼저 실제 업무에 필요한 범위를 판단한 뒤,

* 개발이 필요한 작업은 개발 협업 형태로,
* 컨텐츠 추가 및 관리가 필요한 작업은 컨텐츠 작업 형태로

구분하여 진행합니다.
