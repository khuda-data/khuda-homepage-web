import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

interface ValueInfo {
  title: string;
  subtitle: string;
  description: string;
}

const values: ValueInfo[] = [
  {
    title: "연결",
    subtitle: "지식과 경험의 선순환",
    description: "신규 회원과 수료생을 잇는 유기적인 네트워크를 지향합니다. 적극적인 재참여를 통해 심화 트랙과 스터디의 깊이를 더하고, 지식과 경험이 기수 간에 흐르는 선순환적 학습 생태계를 구축합니다.",
  },
  {
    title: "열정",
    subtitle: "한계를 넘는 몰입",
    description: "이론부터 실무까지 이어지는 고강도 학습으로 견고한 토대를 다집니다. 방학 세션과 심화 트랙을 거치며 스스로 설정한 한계를 뛰어넘고, 이전과는 다른 차원의 데이터 분석 역량을 확보하는 성취를 경험합니다.",
  },
  {
    title: "가치",
    subtitle: "세상으로 향하는 실전",
    description: "학습을 넘어 현실의 문제를 해결하는 데이터 및 인공지능 전문가로 거듭납니다. 정기학술제와 산학협력 프로젝트를 경험하며 데이터 속에서 가치를 발견하고, 실질적인 솔루션을 제안하는 실전 중심의 가치 창출을 추구합니다.",
  },
];

const ValuesSection = () => {
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
            <div className="order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5 leading-tight">
                Our Values
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-medium leading-relaxed">
                우리가 추구하는
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                세 가지 가치
              </p>
            </div>
            
            {/* 오른쪽: 3개 가치 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 order-1 lg:order-2">
              {values.map((value, index) => (
                <div key={value.title} className="flex flex-col">
                  <div className="mb-2 sm:mb-3 md:mb-4">
                    <span className="text-xs sm:text-sm font-semibold text-primary mb-1.5 sm:mb-2 block">
                      {index + 1}.
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight">
                      [{value.title}]
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
                      {value.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed break-keep">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
