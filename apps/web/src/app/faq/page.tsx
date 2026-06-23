import type { Metadata } from "next";
import FAQ from "@/views/FAQ";

const DESCRIPTION = "KHUDA에 대해 자주 묻는 질문들을 모아두었습니다. 궁금한 점을 확인해보세요.";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FAQ />;
}
