import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const VisionSection = () => {
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
                Our Vision
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium leading-[1.7] sm:leading-relaxed">
                경희대를 대표하는
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                최고의 데이터 & AI 학회
              </p>
            </div>
            
            {/* 오른쪽: 본문 */}
            <div className="space-y-4 sm:space-y-4 order-2 lg:order-2 px-6 sm:px-0">
              <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed break-keep">
                KHUDA는 경희대학교를 대표하는 최고의 데이터 분석 & AI 학회로 성장하며, 학문과 산업을 연결하는 인재 허브가 되는 것을 목표로 합니다. 학교 안에 머무르지 않고, 데이터와 AI를 통해 사회에 긍정적인 변화를 만들어가는 조직을 지향합니다.
              </p>
              <div className="pt-4 sm:pt-4 space-y-3.5 sm:space-y-3">
                <div className="flex items-start gap-3 sm:gap-3">
                  <span className="text-primary font-semibold text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                  <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed">
                    <strong className="text-gray-900">최고의 학회</strong>: 경희대학교를 대표하는 데이터 분석 & AI 학회로서 지속적인 성장과 발전을 추구합니다.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-3">
                  <span className="text-primary font-semibold text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                  <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed">
                    <strong className="text-gray-900">인재 허브</strong>: 학문과 산업을 연결하는 다리 역할을 하며, 실무 역량을 갖춘 AI 인재를 양성합니다.
                  </p>
                </div>
                <div className="flex items-start gap-3 sm:gap-3">
                  <span className="text-primary font-semibold text-base sm:text-lg flex-shrink-0 mt-0.5">•</span>
                  <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed">
                    <strong className="text-gray-900">사회 기여</strong>: 데이터와 AI 기술로 사회 전반에 긍정적인 변화를 만들어가는 것을 목표로 합니다.
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

export default VisionSection;
