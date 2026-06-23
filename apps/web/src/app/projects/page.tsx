import type { Metadata } from "next";
import { Suspense } from "react";
import Projects from "@/views/Projects";

const DESCRIPTION = "KHUDA 구성원들이 기획하고 개발한 프로젝트들을 소개합니다.";

export const metadata: Metadata = {
  title: "프로젝트",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: { title: "프로젝트 | KHUDA", description: DESCRIPTION, url: "/projects" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
    { "@type": "ListItem", position: 2, name: "프로젝트", item: "https://www.khuda.co.kr/projects" },
  ],
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "프로젝트 | KHUDA",
  description: DESCRIPTION,
  url: "https://www.khuda.co.kr/projects",
  isPartOf: { "@type": "WebSite", url: "https://www.khuda.co.kr" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, collectionJsonLd]) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Projects />
      </Suspense>
    </>
  );
}
