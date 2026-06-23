import type { Metadata } from "next";
import { Suspense } from "react";
import Activities from "@/views/Activities";

const DESCRIPTION = "KHUDA의 다양한 활동을 소개합니다.";

export const metadata: Metadata = {
  title: "활동",
  description: DESCRIPTION,
  alternates: { canonical: "/activities" },
  openGraph: { title: "활동 | KHUDA", description: DESCRIPTION, url: "/activities" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
    { "@type": "ListItem", position: 2, name: "활동", item: "https://www.khuda.co.kr/activities" },
  ],
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "활동 | KHUDA",
  description: DESCRIPTION,
  url: "https://www.khuda.co.kr/activities",
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
        <Activities />
      </Suspense>
    </>
  );
}
