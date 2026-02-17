import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const WhoWeAreSection = () => {
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                함께 성장하며
                <br />
                <span className="text-blue-700">한계를 뛰어넘는 여정</span>
              </h2>
            </div>
            
            {/* 오른쪽: 본문 */}
            <div className="space-y-5 sm:space-y-6 md:space-y-7 text-sm sm:text-base text-gray-700 leading-relaxed">
              <p className="break-keep">
                KHUDA는 Kyung Hee University Data Analysis & AI의 약자로, 경희대학교 데이터 분석 & AI 학회입니다. 데이터 분석과 인공지능(AI)에 열정을 가진 경희인들이 모여 체계적인 학습과 실전 프로젝트 경험을 통해 전문 역량을 키우고 함께 성장하는 커뮤니티로 출발했습니다.
              </p>
              <p className="break-keep">
                2022년 설립 이후, KHUDA는 머신러닝과 딥러닝의 탄탄한 기본기와 현업의 실제 문제를 다루는 실무 중심 프로젝트를 통해 데이터와 AI를 이해하고, 적용하고, 확장할 수 있는 인재를 길러내고 있습니다.
              </p>
              <p className="break-keep">
                우리는 단순히 기술을 배우는 조직이 아니라, 데이터 중심의 사고로 세상을 바라보고 함께 더 나은 해답을 만들어가는 집단입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
