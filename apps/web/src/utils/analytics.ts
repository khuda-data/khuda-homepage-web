declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// 쿠다 공식 계정 GA4 측정 ID. layout.tsx의 GA_ID와 같은 값을 유지한다.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-P6P623H40Z";

// GA는 운영 도메인(www.khuda.co.kr)에서만 동작시킨다.
// 로컬 개발과 Vercel 프리뷰 배포 트래픽이 공식 속성에 섞이지 않게 하기 위함이다.
const isAnalyticsEnabled = (): boolean =>
  typeof window !== "undefined" &&
  !!window.gtag &&
  window.location.hostname === "www.khuda.co.kr";

export const trackPageView = (path: string): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!isAnalyticsEnabled()) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// 모집 퍼널 전환 이벤트. 개인정보(이름·연락처·자소서 등)는 절대 싣지 않고 사실만 보낸다.
// 지원 시작: /apply 진입 시점. 지원 완료: 제출 성공 화면 진입 시점.
export const trackApplicationStart = (): void =>
  trackEvent("application_start", "recruiting");

export const trackApplicationComplete = (): void =>
  trackEvent("application_complete", "recruiting");

