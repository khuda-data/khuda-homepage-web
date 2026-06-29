import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/index.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import { Providers } from "./providers";

const SITE_URL = "https://www.khuda.co.kr";
const DESCRIPTION =
  "KHUDA는 인공지능과 데이터 분석을 기반으로 실전 프로젝트와 협업을 통해 성장하는 경희대학교 데이터·AI 학술 동아리입니다.";
// 쿠다 공식 계정 GA4 측정 ID. env가 있으면 우선 적용, 없으면 이 값으로 폴백한다.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-P6P623H40Z";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "KHUDA", template: "%s | KHUDA" },
  description: DESCRIPTION,
  authors: [{ name: "KHUDA" }],
  keywords: [
    "KHUDA",
    "쿠다",
    "경희대학교 데이터분석 동아리",
    "경희대학교 AI 동아리",
    "데이터 분석",
    "인공지능",
    "머신러닝",
    "딥러닝",
    "데이터 사이언스",
    "대학생 IT 동아리",
  ],
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "KHUDA",
    title: "KHUDA",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "ko_KR",
    images: [
      {
        url: "/images/logos/khuda-og.png",
        width: 1200,
        height: 630,
        alt: "KHUDA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KHUDA",
    description: DESCRIPTION,
    images: ["/images/logos/khuda-og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* LCP 이미지 선로딩: 헤더 로고, 메인 첫 화면 대표 이미지 */}
        <link rel="preload" href="/images/logos/khuda-logo-white.png" as="image" />
        <link rel="preload" href="/images/activities/ml-session-3.jpg" as="image" />
      </head>
      <body>
        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        {/* gtag 함수만 준비한다. 실제 config(page_view)는 providers의 trackPageView가 운영 도메인에서만 호출한다. */}
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>

        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
