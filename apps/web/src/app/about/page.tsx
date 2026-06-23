import type { Metadata } from "next";
import { Suspense } from "react";
import About from "@/views/About";

const DESCRIPTION = "경희대학교 KHUDA의 미션, 비전, 운영진을 소개합니다.";

export const metadata: Metadata = {
  title: "소개",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: "소개 | KHUDA", description: DESCRIPTION, url: "/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
    { "@type": "ListItem", position: 2, name: "소개", item: "https://www.khuda.co.kr/about" },
  ],
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "소개 | KHUDA",
  description: DESCRIPTION,
  url: "https://www.khuda.co.kr/about",
  isPartOf: { "@type": "WebSite", url: "https://www.khuda.co.kr" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, aboutJsonLd]) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <About />
      </Suspense>
    </>
  );
}
