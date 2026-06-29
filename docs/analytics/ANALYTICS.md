# 애널리틱스 (GA4)

공식 홈페이지의 Google Analytics 4 설정과 그 목적을 정리한 문서다.

## 도입 근거

쿠다 공홈은 사실상 시즌제 모집 사이트다(약 6개월 주기, 평소에는 소개와 홍보, 모집 시즌에는 지원 접수 위주). 그래서 GA의 목적은 단순 방문자 수 집계가 아니라 아래 두 가지다.

1. 모집 퍼널 전환: 방문에서 `/recruiting` 조회, `/apply` 진입, 지원서 제출 완료로 이어지는 흐름에서 어디서 이탈하는지와 전환율이 얼마인지 본다. 모집 전략을 바꿀 근거를 파악할 수 있다.
2. 유입 채널: 지원자가 인스타그램, 에브리타임, 카카오톡 같은 채널 중 어디서 유입되는 지 관찰한다. 홍보 채널 전략을 수립할 수 있다.

콘텐츠 관심도(어떤 페이지가 읽히는지)와 시즌성(트래픽 피크가 홍보 타이밍과 맞는지)도 본다. 기수별로 이 데이터가 쌓이면 다음 기수 모집 방향을 정하는 자료가 된다.

## 구현

- GA4 gtag.js를 `apps/web/src/app/layout.tsx`에서 `next/script`로 로드한다.
- 측정 ID는 쿠다 공식 계정 속성 `G-P6P623H40Z`다. 환경변수 `NEXT_PUBLIC_GA_MEASUREMENT_ID`가 있으면 우선 적용하고, 없으면 코드의 폴백 값을 쓴다. 측정 ID는 어차피 브라우저로 노출되므로 비밀값이 아니다.
- 운영 도메인에서만 동작한다. `apps/web/src/utils/analytics.ts`의 `isAnalyticsEnabled`가 호스트를 `www.khuda.co.kr`로 제한해, 로컬 개발과 Vercel 프리뷰 배포 트래픽이 공식 속성에 섞이지 않게 한다.
- 페이지뷰는 `apps/web/src/app/providers.tsx`가 라우트 변경마다 `trackPageView`를 호출해 추적한다(App Router의 클라이언트 내비게이션 대응). gtag config는 이 한 곳에서만 부른다.
- 어드민(`apps/admin`)에는 GA를 두지 않는다. 운영진 내부용이라 추적 대상이 아니다.

## 전환 이벤트

모집 퍼널 측정의 핵심이다. `utils/analytics.ts`에 정의돼 있다.

- `application_start`: `/apply` 진입 시 1회 전송.
- `application_complete`: 제출 성공 화면(`SubmissionSuccess`) 진입 시 1회 전송.

지원서에는 이름, 연락처, 자소서 같은 개인정보가 있으므로 이벤트에는 그 내용을 절대 포함하지 않는다. "지원을 시작했다", "지원을 완료했다"는 사실만 보낸다.

GA4 콘솔에서 위 두 이벤트를 주요 이벤트(Key event)로 표시해야 전환율 리포트가 잡힌다. 이벤트는 사이트에서 처음 발생한 뒤에 GA4 이벤트 목록에 나타난다.

## 유지보수에 대한 메모

- 측정 ID를 바꾸려면 official Vercel 프로젝트에 `NEXT_PUBLIC_GA_MEASUREMENT_ID` 환경변수를 두거나, `layout.tsx`와 `utils/analytics.ts`의 폴백 값을 함께 바꾼다. 두 곳이 같은 값이어야 한다.
- 새 전환 이벤트는 `utils/analytics.ts`의 `trackEvent`로 추가하고, 개인정보는 넣지 않는다.
- 인스타그램 같은 홍보 링크에는 UTM 파라미터(`utm_source`, `utm_medium`, `utm_campaign`)를 붙여 유입 채널을 구분한다.

