import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { RECRUITMENT_SCHEDULE } from "@/lib/constants";
import Apply from "@/views/Apply";

// 모집 기간에만 접근을 허용하므로 요청마다 날짜를 확인한다.
export const dynamic = "force-dynamic";

const DESCRIPTION = "KHUDA 지원하기. 모집 일정과 지원 절차를 확인하고 지원서를 작성하세요.";

export const metadata: Metadata = {
  title: "지원하기",
  description: DESCRIPTION,
  alternates: { canonical: "/apply" },
  openGraph: { title: "지원하기 | KHUDA", description: DESCRIPTION, url: "/apply" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
    { "@type": "ListItem", position: 2, name: "지원하기", item: "https://www.khuda.co.kr/apply" },
  ],
};

export default function Page() {
  // 모집 기간(시작 ~ 마감) 밖이면 404 처리한다.
  const now = Date.now();
  const start = new Date(RECRUITMENT_SCHEDULE.application.startISO).getTime();
  const end = new Date(RECRUITMENT_SCHEDULE.application.deadlineISO).getTime();
  if (now < start || now > end) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd]) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Apply />
      </Suspense>
    </>
  );
}
