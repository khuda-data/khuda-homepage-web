import { memo, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import AccordionCard from "./NotesSection/AccordionCard";
import YBContent from "./NotesSection/YBContent";
import OBContent from "./NotesSection/OBContent";

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
      <SectionHeader label="Note" title="유의 사항" />

      {/* 상단 3열 - 모바일에서는 1열, 데스크톱에서는 2열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 px-4 sm:px-6 md:px-8">
        {/* 활동 기간 */}
        <div className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <div className="flex-1">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
              활동 기간
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
              1월부터 7월까지
              <br />
              활동할 수 있어야 해요.
            </p>
          </div>
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative flex items-center justify-center self-center sm:self-auto">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">📅</span>
          </div>
        </div>

        {/* 세션 참여 */}
        <div className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5">
          <div className="flex-1">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
              세션 참여
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
              OT, 방학 세션, 정규 세션에
              <br />
              필수적으로 참여해야 해요.
            </p>
          </div>
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative flex items-center justify-center self-center sm:self-auto">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">📚</span>
          </div>
        </div>

        {/* 정기 학술제 - 모바일에서는 그리드에 포함, 데스크톱에서는 전체 너비 */}
        <div className="bg-gray-100 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-5 md:col-span-2">
          <div className="flex-1 w-full">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2 md:mb-3">
              정기 학술제 참여
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
              KHUDA 정기 학술제에
              <br />
              필수적으로 참여해야 해요.
            </p>
          </div>
          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 relative flex items-center justify-center self-center sm:self-auto">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">🎓</span>
          </div>
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
    </div>
  );
});

NotesSection.displayName = "NotesSection";

export default NotesSection;
