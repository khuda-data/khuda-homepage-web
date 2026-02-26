import { useState } from "react";
import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import Footer from "@/components/shared/Footer";
import IntroductionSection from "@/components/pages/About/IntroductionSection";
import MissionSection from "@/components/pages/About/MissionSection";
import VisionSection from "@/components/pages/About/VisionSection";
import ExecutiveProfileSection from "@/components/pages/About/ExecutiveProfileSection";
import SEO from "@/components/shared/SEO";
import { cn } from "@/lib/utils";

type TabType = "Mission-Vision" | "Organization";

const About = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Mission-Vision");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="소개 | KHUDA"
        description="경희대학교 KHUDA의 미션, 비전, 운영진을 소개합니다."
        path="/about"
      />
      <Header />
      <main>
        <PageHeroSection
          title="KHUDA를 소개합니다"
          subtitle="경희대학교를 대표하는 데이터 · AI 학회"
          backgroundImage="/images/headers/hello.png"
        />

        {/* 탭 버튼 */}
        <div className="flex justify-center items-center gap-6 sm:gap-10 md:gap-14 py-4 sm:py-5 md:py-6 bg-background/95 backdrop-blur-sm sticky top-12 sm:top-16 md:top-18 lg:top-20 z-30 mt-2 sm:mt-4 px-4">
          {[
            { key: "Mission-Vision" as TabType, label: "Mission & Vision" },
            { key: "Organization" as TabType, label: "Organization" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "relative text-sm sm:text-base md:text-lg font-semibold transition-all duration-200 pb-2 px-2 sm:px-3",
                activeTab === tab.key
                  ? "text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground"
              )}
            >
              <span className="whitespace-nowrap">{tab.label}</span>
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 sm:w-8 h-[2px] sm:h-[3px] bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        {activeTab === "Mission-Vision" && (
          <>
            <IntroductionSection />
            <MissionSection />
            <VisionSection />
          </>
        )}

        {activeTab === "Organization" && <ExecutiveProfileSection />}
      </main>
      <Footer />
    </div>
  );
};

export default About;
