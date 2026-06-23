import type { Metadata } from "next";
import Sponsor from "@/views/Sponsor";

const DESCRIPTION =
  "KHUDA를 후원해주시는 기업과 기관을 소개합니다. KHUDA는 다양한 기업의 후원을 통해 구성원의 성장을 지원받고 있습니다.";

export const metadata: Metadata = {
  title: "후원",
  description: DESCRIPTION,
  alternates: { canonical: "/sponsor" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Sponsor />;
}
