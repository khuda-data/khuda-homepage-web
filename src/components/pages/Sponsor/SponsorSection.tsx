import { useMemo } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { 
  SECTION_STYLES,
  SCROLL_ANIMATION_CONFIG,
  SPONSOR_DATA_BY_YEAR,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import SponsorCard from "./SponsorCard";
import SponsorInquiryButton from "./SponsorInquiryButton";

const SponsorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  // 년도별로 정렬된 후원사 목록 (년도 내림차순, 같은 년도 내에서는 이름순)
  const sortedSponsors = useMemo(() => {
    return [...SPONSOR_DATA_BY_YEAR].sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year; // 년도 내림차순
      }
      return a.name.localeCompare(b.name, 'ko'); // 같은 년도면 이름순
    });
  }, []);

  return (
    <section 
      id="sponsor" 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        "pt-12 sm:pt-16 md:pt-20 lg:pt-24",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-12 relative z-10">
        <div>
          {/* 후원 문의 버튼 - 로고 그리드 상단에 배치 (카드 형식) */}
          <div className="mb-8 sm:mb-10 md:mb-12 px-8 sm:px-12 md:px-16">
            <SponsorInquiryButton variant="card" className="px-6 sm:px-8 md:px-10 py-4 sm:py-5" />
          </div>

          {/* 후원사 그리드 */}
          {sortedSponsors.length > 0 ? (
            <div className="relative mb-8 sm:mb-12 md:mb-16 px-8 sm:px-12 md:px-16">
              {/* 후원사 그리드 */}
              <div className="relative overflow-hidden">
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                >
                  {sortedSponsors.map((sponsor, index) => (
                    <SponsorCard
                      key={`${sponsor.name}-${index}`}
                      sponsor={sponsor}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 mb-12 sm:mb-16">
              <p className="text-muted-foreground text-sm sm:text-base">
                후원사 정보가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
