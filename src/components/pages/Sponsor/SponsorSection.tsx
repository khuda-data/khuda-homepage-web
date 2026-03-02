import { useMemo, useState, useCallback, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import {
  SECTION_STYLES,
  SCROLL_ANIMATION_CONFIG,
  SPONSOR_DATA_BY_YEAR,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import SponsorCard from "./SponsorCard";
import SponsorInquiryButton from "./SponsorInquiryButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARDS_PER_PAGE = 6;
const SWIPE_THRESHOLD = 50;

const SponsorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const touchStartX = useRef<number | null>(null);

  const sortedSponsors = useMemo(() => {
    return [...SPONSOR_DATA_BY_YEAR].sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      const orderA = a.order ?? Infinity;
      const orderB = b.order ?? Infinity;
      return orderA - orderB;
    });
  }, []);

  const totalPages = Math.ceil(sortedSponsors.length / CARDS_PER_PAGE);

  const currentSponsors = useMemo(
    () => sortedSponsors.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE),
    [sortedSponsors, currentPage]
  );

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= totalPages) return;
      setSlideDir(next > currentPage ? "left" : "right");
      setCurrentPage(next);
    },
    [currentPage, totalPages]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      goTo(currentPage + (diff > 0 ? 1 : -1));
    }
    touchStartX.current = null;
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
        {/* 후원 문의 버튼 */}
        <div className="mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4">
          <SponsorInquiryButton variant="card" className="px-6 sm:px-8 md:px-10 py-4 sm:py-5" />
        </div>

        {sortedSponsors.length > 0 ? (
          <div className="mb-8 sm:mb-12 md:mb-16">
            {/* 카드 그리드 (스와이프 가능) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="px-2 sm:px-4"
            >
              <div
                key={currentPage}
                className={cn(
                  "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6",
                  "animate-in fade-in duration-300",
                  slideDir === "left"
                    ? "slide-in-from-right-6"
                    : "slide-in-from-left-6"
                )}
              >
                {currentSponsors.map((sponsor, index) => (
                  <SponsorCard
                    key={`${sponsor.name}-${sponsor.year}-${index}`}
                    sponsor={sponsor}
                  />
                ))}
              </div>
            </div>

            {/* 하단 내비게이션 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
                {/* 이전 버튼 */}
                <button
                  onClick={() => goTo(currentPage - 1)}
                  disabled={currentPage === 0}
                  aria-label="이전 페이지"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    currentPage === 0
                      ? "text-foreground/20 cursor-not-allowed"
                      : "text-foreground hover:bg-foreground/10 active:scale-95"
                  )}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 도트 + 페이지 번호 */}
                <div className="flex items-center gap-3">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`${i + 1}페이지`}
                      aria-current={i === currentPage}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === currentPage
                          ? "w-6 h-2.5 bg-foreground"
                          : "w-2.5 h-2.5 bg-foreground/20 hover:bg-foreground/40"
                      )}
                    />
                  ))}
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={() => goTo(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  aria-label="다음 페이지"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    currentPage === totalPages - 1
                      ? "text-foreground/20 cursor-not-allowed"
                      : "text-foreground hover:bg-foreground/10 active:scale-95"
                  )}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10 mb-12 sm:mb-16">
            <p className="text-muted-foreground text-sm sm:text-base">
              후원사 정보가 없습니다.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SponsorSection;
