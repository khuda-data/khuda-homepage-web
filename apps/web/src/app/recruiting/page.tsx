import type { Metadata } from "next";
import Recruiting from "@/views/Recruiting";

const DESCRIPTION =
  "KHUDA 신규 부원을 모집합니다. 데이터와 AI에 관심 있는 경희대학교 학생이라면 누구나 지원할 수 있습니다.";

export const metadata: Metadata = {
  title: "모집",
  description: DESCRIPTION,
  alternates: { canonical: "/recruiting" },
  openGraph: { title: "모집 | KHUDA", description: DESCRIPTION, url: "/recruiting" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: "https://www.khuda.co.kr" },
    { "@type": "ListItem", position: 2, name: "모집", item: "https://www.khuda.co.kr/recruiting" },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "모집 | KHUDA",
  description: DESCRIPTION,
  url: "https://www.khuda.co.kr/recruiting",
  isPartOf: { "@type": "WebSite", url: "https://www.khuda.co.kr" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, webPageJsonLd]) }}
      />
      <Recruiting />
    </>
  );
}
