import { useMemo } from "react";
import Header from "@/components/shared/Header";
import PageHeroSection from "@/components/shared/PageHeroSection";
import RecruitingSection from "@/components/pages/Recruiting/RecruitingSection";
import FAQSection from "@/components/shared/FAQSection";
import UnifiedActionButton from "@/components/shared/UnifiedActionButton";
import Footer from "@/components/shared/Footer";
import { SECTION_STYLES, RECRUITMENT_SCHEDULE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { parseKoreanDate } from "@/lib/date-utils";

const Recruiting = () => {
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
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PageHeroSection
          title="KHUDA와 함께할 새로운 멤버를 찾습니다"
          subtitle="데이터와 AI에 관심 있는 경희대학교 학생이라면 누구나 지원할 수 있어요."
        />
        <RecruitingSection />
        <FAQSection />
        <section className={cn(SECTION_STYLES.section.base, "py-16 sm:py-20 md:py-24")}>
          <div className={SECTION_STYLES.container.base}>
            <div className="flex flex-col items-center justify-center gap-4">
              {!isApplicationPeriod && (
                <p className="text-sm sm:text-base text-muted-foreground text-center">
                  아직 모집기간이 아니에요! 다음 기수에 지원해주세요😊.
                </p>
              )}
              <UnifiedActionButton size="lg" disabled={!isApplicationPeriod} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Recruiting;
