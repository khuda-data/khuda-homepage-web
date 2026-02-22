import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECTION_STYLES, RECRUITMENT_SCHEDULE, SCROLL_ANIMATION_CONFIG, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { parseKoreanDate } from "@/lib/date-utils";

const ApplicationCTA = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  // 모집 기간 확인
  const isApplicationPeriod = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const startDate = parseKoreanDate(RECRUITMENT_SCHEDULE.application.start);
    const endDate = parseKoreanDate(RECRUITMENT_SCHEDULE.application.end);
    
    if (!startDate || !endDate) {
      return false;
    }
    
    const normalizedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const normalizedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    
    return today >= normalizedStartDate && today <= normalizedEndDate;
  }, []);

  return (
    <section 
      ref={ref}
      className={cn(
        "relative transition-all duration-1000 ease-out",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      {/* 콘텐츠 */}
      <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12">
          {/* 제목 - 안내 메시지를 제목으로 */}
          <div className="text-center w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-2.5 md:mb-3 text-foreground leading-tight sm:leading-[1.15] tracking-tight">
              지금은 모집 기간이 아니에요.
            </h2>
          </div>

          {/* 통합 버튼 */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <div className={cn(
              "flex items-center",
              "min-h-[48px] sm:min-h-[52px]",
              "rounded-md",
              "bg-foreground text-background",
              "shadow-sm",
              "overflow-hidden",
              "w-full sm:w-auto",
              "opacity-50",
              "pointer-events-none"
            )}>
              {/* 지원하기 버튼 */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "px-6 sm:px-8 md:px-10",
                  "h-full",
                  "font-semibold text-sm sm:text-base md:text-lg",
                  "flex-1 sm:flex-none"
                )}
              >
                <span>지원하기</span>
              </div>

              {/* 구분선 */}
              <div className="h-6 w-px bg-background/30 flex-shrink-0" />

              {/* 합격자 조회 버튼 */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "px-6 sm:px-8 md:px-10",
                  "h-full",
                  "font-semibold text-sm sm:text-base md:text-lg",
                  "flex-1 sm:flex-none"
                )}
              >
                <span>합격자 조회</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTA;
