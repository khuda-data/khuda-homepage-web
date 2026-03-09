import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const MissionSection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={ref}
          className={cn(
            "max-w-5xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* 왼쪽: 제목 */}
            <div className="order-1 lg:order-1 px-6 sm:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-4 md:mb-5 leading-snug sm:leading-tight">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium leading-[1.7] sm:leading-relaxed">
                데이터로 세상을 이해하고,
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                협업으로 가치를 창출한다
              </p>
            </div>
            
            {/* 오른쪽: 본문 */}
            <div className="space-y-4 sm:space-y-4 order-2 lg:order-2 px-6 sm:px-0">
              <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed break-keep">
                KHUDA는 데이터 분석과 AI 기술을 체계적으로 학습하고, 실제 문제를 해결하는 경험을 통해 전문성을 키워나갑니다. 개인의 성장을 넘어 협업을 통해 더 큰 가치를 만들어내는 것이 우리의 목표입니다.
              </p>
              <div className="pt-4 sm:pt-4 space-y-3.5 sm:space-y-3">
                <div className="flex items-start gap-3 sm:gap-3">
                  <span className="text-blue-500 font-semibold text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                  <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed">
                    <strong className="text-gray-900">체계적 학습</strong>: 기초부터 심화까지 단계별 커리큘럼으로 데이터와 AI의 핵심을 배워나갑니다.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-3">
                  <span className="text-blue-500 font-semibold text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                  <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed">
                    <strong className="text-gray-900">실전 경험</strong>: 토이 프로젝트부터 학술제까지, 실제 데이터로 문제를 해결하며 실무 역량을 키웁니다.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-3">
                  <span className="text-blue-500 font-semibold text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                  <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed">
                    <strong className="text-gray-900">협업 문화</strong>: 팀 프로젝트와 스터디를 통해 함께 성장하며 데이터로 세상을 이해하는 인재로 거듭납니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
