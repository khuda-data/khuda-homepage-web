import { memo, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG, ROUTES } from "@/lib/constants";
import { Zap, ArrowRight, GraduationCap, Award } from "lucide-react";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 px-4 sm:px-6 md:px-8">
        {/* 활동 기간 */}
        <div className="bg-[#1a1a1a] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              활동 기간
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
              1월부터 7월까지
              <br />
              활동할 수 있어야 해요.
            </p>
          </div>
          <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative flex items-center justify-center self-center sm:self-auto">
            {/* 캘린더 일러스트 */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 bg-white/[0.04] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative border border-white/10">
              <div className="flex gap-1 sm:gap-1.5 absolute -top-1.5 sm:-top-2">
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white/30 rounded-full" />
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white/30 rounded-full" />
                <div className="w-1 h-3 sm:w-1.5 sm:h-4 bg-white/30 rounded-full" />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/80 mt-1 sm:mt-2">6</span>
            </div>
            {/* 번개 아이콘 */}
            <Zap className="absolute -left-0.5 sm:-left-1 top-1.5 sm:top-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
            <Zap className="absolute -left-2 sm:-left-3 bottom-3 sm:bottom-4 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        {/* 행사 참여 */}
        <div className="bg-[#1a1a1a] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              행사 참여
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
              OT, 방학 세션, 정규 세션에
              <br />
              필수적으로 참여해야 해요.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end sm:items-end gap-2 sm:gap-3 self-end sm:self-auto">
            {/* 코드 아이콘 배경 */}
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-16 h-16 sm:w-20 sm:h-20 text-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 border border-white/10 text-white text-[10px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full relative z-10">
                ORIENTATION
              </div>
            </div>
            <div className="bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 border border-white/10 text-white text-[10px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full">
              REGULAR SESSION
            </div>
          </div>
        </div>

        {/* 정기 학술제 - 모바일에서는 그리드에 포함, 데스크톱에서는 전체 너비 */}
        <div className="bg-[#1a1a1a] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8 md:col-span-2">
          <div className="flex-1 w-full">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
              정기 학술제 참여
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              KHUDA 정기 학술제에
              <br />
              필수적으로 참여해야 해요.
            </p>
            <a
              href={ROUTES.activities}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 hover:from-red-500 hover:via-purple-500 hover:to-blue-500 text-white text-xs sm:text-sm md:text-base font-semibold px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full transition-all duration-200"
            >
              자세히 보기
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </a>
          </div>
          <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 relative flex items-center justify-center self-center sm:self-auto">
            {/* 학술제 일러스트 */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 bg-white/[0.04] rounded-xl sm:rounded-2xl flex flex-col items-center justify-center relative border border-white/10">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white/80" />
            </div>
            {/* 상장 아이콘 */}
            <Award className="absolute -right-0.5 sm:-right-1 top-1.5 sm:top-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
            <Award className="absolute -right-2 sm:-right-3 bottom-3 sm:bottom-4 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-purple-400 fill-purple-400" />
          </div>
        </div>
      </div>

      {/* YB 수료 조건 & OB 혜택 - 아코디언 */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
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
