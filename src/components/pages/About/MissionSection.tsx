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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5">
                Our Mission
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
                데이터로 세상을 이해하고,
                <br />
                협업으로 가치를 창출한다
              </p>
            </div>
            
            {/* 오른쪽: 본문 */}
            <div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-keep">
                KHUDA는 데이터 분석 및 AI 기술을 체계적으로 학습하고, 실제 문제 해결 경험을 통해 전문성과 실전 감각을 갖춘 데이터 인재로 성장할 수 있도록 돕습니다. 우리는 개인의 성장을 넘어 협업을 통해 더 큰 가치를 만들어내는 데이터 문화를 지향합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
