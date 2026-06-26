# KHUDA Admin

운영진용 리크루팅 관리 앱. 지원 정보를 조회하고 수정 요청 시 답변을 고친다. Vite + React + React Router + React Query.

## 로컬 실행

```bash
pnpm --filter @khuda/admin dev   # http://localhost:8081
```

환경변수는 `apps/admin/.env`에 둔다(`.env.example` 참고).

| 변수 | 설명 |
| --- | --- |
| `VITE_API_BASE_URL` | 백엔드 주소. 로컬은 `http://localhost:8000`, 운영은 `https://api.khuda.kro.kr` |
| `VITE_GOOGLE_CLIENT_ID` | 구글 OAuth 클라이언트 ID (백엔드 `GOOGLE_CLIENT_ID`와 같은 값) |

빌드: `pnpm --filter @khuda/admin build` (산출물 `dist`).

## 인증

구글 로그인으로 받은 ID 토큰을 백엔드 `POST /api/admin/auth/google`에 보내 JWT를 발급받는다. `admins` 테이블에 등록된 이메일만 통과한다. 운영진 추가는 백엔드 `admins` 테이블에서 한다.

## Vercel 배포 (아직 미배포)

admin 앱은 아직 Vercel에 올리지 않았다. 올릴 때 절차는 다음과 같다.

1. 쿠다 공식 구글 계정 Vercel에서 New Project로 이 레포(`khuda-data/khuda-homepage-web`)를 가져온다.
2. Root Directory를 `apps/admin`으로 지정한다. Framework는 Vite로 잡힌다. SPA 라우팅은 `apps/admin/vercel.json`의 rewrite가 처리한다.
3. 환경변수 `VITE_API_BASE_URL`(= `https://api.khuda.kro.kr`), `VITE_GOOGLE_CLIENT_ID`를 등록한다.
4. 배포 도메인이 정해지면 그 origin을 다음 두 곳에 추가한다.
   - 백엔드 CORS 허용 목록(`khuda-homepage-api`의 `app/core/config/app_factory.py` `ORIGINS`)
   - 구글 클라우드 콘솔 OAuth 클라이언트의 Authorized JavaScript origins
5. 공개 웹(apps/web)과 별도 프로젝트로 둔다. 공개 웹의 Root Directory는 `apps/web`이다.
