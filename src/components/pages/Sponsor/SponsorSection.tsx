import { useMemo, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  SECTION_STYLES,
  SCROLL_ANIMATION_CONFIG,
  SPONSOR_DATA_BY_YEAR,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import SponsorCard from "./SponsorCard";
import NavigationArrow from "./NavigationArrow";
import SponsorInquiryButton from "./SponsorInquiryButton";

const SponsorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  // 모바일: 4개 (2x2), 데스크톱: 6개 (2x3 또는 3x2)
  const ITEMS_PER_PAGE = useMemo(() => (isMobile ? 4 : 6), [isMobile]);

  // 년도별로 정렬된 후원사 목록 (년도 내림차순, 같은 년도 내에서는 이름순)
  const sortedSponsors = useMemo(() => {
    return [...SPONSOR_DATA_BY_YEAR].sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year; // 년도 내림차순
      }
      return a.name.localeCompare(b.name, 'ko'); // 같은 년도면 이름순
    });
  }, []);

  // 페이지네이션을 위한 후원사 목록 (현재는 6개밖에 없지만, 나중을 위해 반복)
  const paginatedSponsors = useMemo(() => {
    // 현재는 같은 후원사들이 반복되지만, 나중에 후원사가 추가되면 자연스럽게 작동
    const totalPages = Math.ceil(sortedSponsors.length / ITEMS_PER_PAGE);
    if (totalPages <= 1) {
      // 후원사가 6개 이하면 반복해서 보여줌
      return [...sortedSponsors, ...sortedSponsors.slice(0, ITEMS_PER_PAGE - sortedSponsors.length)];
    }
    return sortedSponsors;
  }, [sortedSponsors, ITEMS_PER_PAGE]);

  const totalPages = Math.max(1, Math.ceil(paginatedSponsors.length / ITEMS_PER_PAGE));
  
  // 현재 페이지의 후원사들
  const currentSponsors = useMemo(() => {
    const startIndex = (currentPage % totalPages) * ITEMS_PER_PAGE;
    return paginatedSponsors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, paginatedSponsors, totalPages, ITEMS_PER_PAGE]);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 50);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 50);
  };

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
              <NavigationArrow
                direction="left"
                onClick={handlePrev}
                ariaLabel="이전 후원사"
              />
              <NavigationArrow
                direction="right"
                onClick={handleNext}
                ariaLabel="다음 후원사"
              />

              {/* 후원사 그리드 */}
              <div className="relative overflow-hidden">
                <div
                  className={cn(
                    "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 transition-transform duration-300 ease-in-out",
                    isTransitioning
                      ? slideDirection === 'left'
                        ? "translate-x-full"
                        : "-translate-x-full"
                      : "translate-x-0"
                  )}
                >
                  {currentSponsors.map((sponsor, index) => (
                    <SponsorCard
                      key={`${sponsor.name}-${currentPage}-${index}`}
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
