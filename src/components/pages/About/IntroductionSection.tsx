import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const IntroductionSection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <section className="relative bg-background py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {/* 제목 */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-8 sm:mb-10 md:mb-12 leading-tight">
            함께 성장하며 한계를 뛰어넘는 여정
          </h2>

          {/* 본문 */}
          <div className="space-y-6 sm:space-y-7 md:space-y-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed break-keep">
              KHUDA는 데이터와 AI를 매개로 모인 동료들과 함께 치열하게 학습하며 개인의 한계를 극복합니다. 이는 홀로 나아갈 수 없는 여정으로, 서로의 관점을 공유하고 지식을 나누는 과정을 통해 혼자서는 도달할 수 없었던 깊이 있는 역량을 함양합니다.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed break-keep">
              이러한 동반 성장은 방학 기간의 데이터 분석 및 머신러닝 세션, 6개 분야로 세분화된 심화 트랙 공동학습, 실전적 경험을 쌓는 토이 프로젝트와 정기 학술제, 그리고 자율적인 스터디 활동 전반을 통해 실현됩니다. 우리는 이 일련의 과정을 거쳐 데이터 분석 및 인공지능 분야의 진정한 전문성을 갖춘 인재로 성장해 나갑니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
