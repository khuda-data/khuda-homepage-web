import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const JourneySection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* 배경 장식 도형들 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 -top-10 w-44 h-44 sm:w-60 sm:h-60 md:w-76 md:h-76 bg-blue-500 opacity-10 blur-sm transform rotate-12"></div>
        <div className="absolute bottom-0 -right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-green-500 opacity-10 blur-sm transform -rotate-45"></div>
        <div className="absolute top-1/2 -left-12 w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-cyan-500 opacity-10 blur-sm transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20 relative z-10">
        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
              함께 성장하며
              <br />
              <span className="text-blue-700">한계를 뛰어넘는 여정</span>
            </h2>
          </div>
          
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
            <p className="break-keep">
              KHUDA는 데이터와 AI를 매개로 모인 동료들과 함께 치열하게 학습하며 개인의 한계를 극복합니다.
              <br className="hidden sm:block" />
              <span className="sm:inline"> 이는 홀로 나아갈 수 없는 여정으로, 서로의 관점을 공유하고 지식을 나누는 과정을 통해</span>
              <br className="hidden sm:block" />
              <span className="sm:inline"> 혼자서는 도달할 수 없었던 깊이 있는 역량을 함양합니다.</span>
            </p>
            <p className="break-keep">
              이러한 동반 성장은 방학 기간의 데이터 분석 및 머신러닝 세션,
              <br className="hidden sm:block" />
              <span className="sm:inline"> 6개 분야로 세분화된 심화 트랙 공동학습, 실전적 경험을 쌓는 토이 프로젝트와 정기 학술제,</span>
              <br className="hidden sm:block" />
              <span className="sm:inline"> 그리고 자율적인 스터디 활동 전반을 통해 실현됩니다.</span>
              <br className="hidden sm:block" />
              <span className="sm:inline"> 우리는 이 일련의 과정을 거쳐 데이터 분석 및 인공지능 분야의 진정한 전문성을 갖춘 인재로 성장해 나갑니다.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
