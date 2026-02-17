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
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
        <div
          ref={ref}
          className={cn(
            "max-w-5xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-start">
            {/* 왼쪽: 제목 */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Our Vision
              </h2>
            </div>
            
            {/* 오른쪽: 본문 */}
            <div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-keep">
                KHUDA는 경희대학교를 대표하는 최고의 데이터 분석 & AI 학회로 성장하며, 학문과 산업을 연결하는 AI 인재 허브가 되는 것을 목표로 합니다. 우리는 학교 안에 머무르지 않고, 데이터와 AI를 통해 사회 전반에 긍정적인 변화를 만들어가는 조직을 지향합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
