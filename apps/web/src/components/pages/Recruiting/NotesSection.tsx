import { memo, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG, ACTIVITY_PERIOD } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import AccordionCard from "./NotesSection/AccordionCard";
import YBContent from "./NotesSection/YBContent";
import OBContent from "./NotesSection/OBContent";
import InterviewReferenceCard from "./NotesSection/InterviewReferenceCard";

const NotesSection = memo(() => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const [isYBOpen, setIsYBOpen] = useState(false);
  const [isOBOpen, setIsOBOpen] = useState(false);

  return (
    <div 
      ref={ref}
      className={cn(
        "w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 transition-all duration-1000 ease-out",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      {/* 헤더 */}
      <SectionHeader label="Note" title="유의 사항" labelClassName="text-blue-600" />

      {/* 상단 3열 - 모바일에서는 1열, 데스크톱에서는 2열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 px-4 sm:px-6 md:px-8">
        {/* 활동 기간 */}
        <div className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
            활동 기간
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
            {ACTIVITY_PERIOD}
            <br />
            활동할 수 있어야 해요.
          </p>
        </div>

        {/* 세션 참여 */}
        <div className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
            세션 참여
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
            OT, 기초 세션, 심화 세션에
            <br />
            필수적으로 참여해야 해요.
          </p>
        </div>

        {/* 정기 학술제 - 모바일에서는 그리드에 포함, 데스크톱에서는 전체 너비 */}
        <div className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 md:col-span-2">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
            정기 학술제 참여
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
            KHUDA 정기 학술제에
            <br />
            필수적으로 참여해야 해요.
          </p>
        </div>
      </div>

      {/* YB 수료 조건 & OB 혜택 - 아코디언 */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <AccordionCard
          title="YB 수료 조건"
          isOpen={isYBOpen}
          onToggle={() => setIsYBOpen(!isYBOpen)}
        >
          <YBContent />
        </AccordionCard>

        <AccordionCard
          title="OB 혜택"
          isOpen={isOBOpen}
          onToggle={() => setIsOBOpen(!isOBOpen)}
        >
          <OBContent />
        </AccordionCard>
      </div>

      {/* 기술 면접 참고 자료 - 서류 접수 기간에만 노출 */}
      <InterviewReferenceCard />
    </div>
  );
});

NotesSection.displayName = "NotesSection";

export default NotesSection;
