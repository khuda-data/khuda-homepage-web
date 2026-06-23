"use client";

import PageHeroSection from "@/components/shared/PageHeroSection";
import RecruitingSection from "@/components/pages/Recruiting/RecruitingSection";

const Recruiting = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <PageHeroSection
          title="KHUDA와 함께할 새로운 멤버를 찾습니다"
          subtitle="데이터와 AI에 관심 있는 경희대학교 학생이라면 누구나 지원할 수 있어요."
          backgroundImage="/images/headers/page-header.png"
        />
        <RecruitingSection />
      </main>
    </div>
  );
};

export default Recruiting;
