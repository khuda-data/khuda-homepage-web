import { useMemo } from "react";
import UnifiedActionButton from "@/components/shared/UnifiedActionButton";
import { SECTION_STYLES, RECRUITMENT_SCHEDULE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { parseKoreanDate } from "@/lib/date-utils";

const ApplicationCTA = () => {
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
    <section className={cn(SECTION_STYLES.section.base, "py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24")}>
      <div className={SECTION_STYLES.container.base}>
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
          {!isApplicationPeriod && (
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground text-center px-4">
              아직 모집기간이 아니에요! 다음 기수에 지원해주세요😊.
            </p>
          )}
          <div className="flex justify-center w-full">
            <UnifiedActionButton size="lg" disabled={!isApplicationPeriod} className="mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationCTA;
