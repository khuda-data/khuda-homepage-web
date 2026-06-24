import type { Metadata } from "next";
import Rules from "@/views/Rules";

const DESCRIPTION = "KHUDA 회칙입니다. 동아리 운영 전반에 관한 규정을 확인할 수 있습니다.";

export const metadata: Metadata = {
  title: "회칙",
  description: DESCRIPTION,
  alternates: { canonical: "/rules" },
  openGraph: { title: "회칙 | KHUDA", description: DESCRIPTION, url: "/rules" },
};

export default function Page() {
  return <Rules />;
}
