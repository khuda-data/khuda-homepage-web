import type { Metadata } from "next";
import Index from "@/views/Index";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KHUDA",
  description:
    "KHUDA는 인공지능과 데이터 분석을 기반으로 실전 프로젝트와 협업을 통해 성장하는 경희대학교 데이터·AI 학술 동아리입니다.",
  url: "https://www.khuda.co.kr",
  logo: "https://www.khuda.co.kr/images/logos/khuda-logo.png",
  sameAs: ["https://www.instagram.com/khuda_official"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KHUDA",
  url: "https://www.khuda.co.kr",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.khuda.co.kr/projects?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
        }}
      />
      <Index />
    </>
  );
}
