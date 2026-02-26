import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import CircularTextWithLogo from "./CircularTextWithLogo";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const IntroductionSection = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-6 md:gap-8 lg:gap-16 xl:gap-20 items-center lg:items-start">
            {/* 왼쪽: 로고 */}
            <div className="hidden lg:flex justify-start order-1 lg:order-1">
              <CircularTextWithLogo />
            </div>
            
            {/* 오른쪽: 제목과 본문 */}
            <div className="space-y-4 sm:space-y-4 order-1 lg:order-2 px-6 sm:px-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-4 md:mb-5 leading-snug sm:leading-tight">
                함께 성장하며 한계를 뛰어넘는 여정
              </h2>
              <div className="space-y-4 sm:space-y-4">
                <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed break-keep">
                  KHUDA는 경희대학교를 대표하는 데이터 · AI 학회입니다. 2022년 설립 이래 9개 기수를 거치며 400명 이상의 데이터 및 AI 역량을 갖춘 인재를 배출, 교내를 넘어 학문과 실무를 잇는 핵심 커뮤니티로 자리매김했습니다.
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-[1.8] sm:leading-relaxed break-keep">
                  우리는 단순한 기술 습득을 넘어, 데이터 중심의 사고로 세상의 문제를 재정의합니다. 체계적인 커리큘럼과 실전 프로젝트를 통해 전문 역량을 갈고닦으며, 동료와 함께 성장하는 즐거움을 동력 삼아 사회에 새로운 가치를 더하는 해답을 찾아 나갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
