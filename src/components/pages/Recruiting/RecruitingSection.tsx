import { lazy, Suspense } from "react";
import { cn } from "@/lib/utils";
import { SECTION_STYLES, RECRUITMENT_STYLES } from "@/lib/constants";
import HeroSection from "./HeroSection";
import ApplicationCTA from "./ApplicationCTA";
import TargetSection from "./TargetSection";
import NotesSection from "./NotesSection";
import FAQSection from "@/components/shared/FAQSection";

// 무거운 컴포넌트들을 lazy load
const LazyRecruitmentProcess = lazy(() => import("./RecruitmentProcess"));

const RecruitingSection = () => {
  return (
    <section 
      id={RECRUITMENT_STYLES.sectionId} 
      className={cn(
        SECTION_STYLES.section.base,
        "pt-0 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 xl:-mt-14"
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        {/* WELCOME 히어로 섹션 */}
        <HeroSection />

        {/* 모집 대상 (Target) 섹션 */}
        <TargetSection />

        {/* 유의 사항 섹션 */}
        <NotesSection />

        {/* 모집 프로세스 - lazy load */}
        <Suspense fallback={null}>
          <LazyRecruitmentProcess />
        </Suspense>

        {/* 자주 묻는 질문 섹션 */}
        <FAQSection />

        {/* 지원하기 CTA */}
        <ApplicationCTA />
      </div>
    </section>
  );
};

export default RecruitingSection;
