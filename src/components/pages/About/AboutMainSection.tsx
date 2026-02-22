import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

interface ValueCard {
  title: string;
  description: string;
  graphic: "network" | "challenge" | "growth" | "value";
}

const values: ValueCard[] = [
  {
    title: "연결",
    description: "다양한 사람과 연결되어 서로의 경험을 나누고, 영감을 주고받습니다. KHUDA에서의 만남은 새로운 기회의 시작이 됩니다.",
    graphic: "network",
  },
  {
    title: "열정",
    description: "상상에 그치지 않고 현실로 만듭니다. 두려움보다 실행과 호기심으로 움직이는 것이 우리의 도전입니다.",
    graphic: "challenge",
  },
  {
    title: "성장",
    description: "함께 학습하고 프로젝트를 통해 실력을 키워갑니다. 동료와의 협업을 통해 혼자서는 도달할 수 없는 깊이를 경험합니다.",
    graphic: "growth",
  },
  {
    title: "가치",
    description: "학습을 넘어 현실의 문제를 해결하는 데이터 및 인공지능 전문가로 거듭납니다. 실질적인 솔루션을 제안하는 실전 중심의 가치 창출을 추구합니다.",
    graphic: "value",
  },
];

const AboutMainSection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  const renderGraphic = (type: ValueCard["graphic"]) => {
    switch (type) {
      case "network":
        // 빨간색 꽃 모양
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              {/* 중앙 원 */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full"></div>
              {/* 꽃잎들 */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-red-500 rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-red-500 rounded-full"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-red-500 rounded-full"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-red-500 rounded-full"></div>
              {/* 대각선 꽃잎들 */}
              <div className="absolute top-1 left-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full"></div>
              <div className="absolute top-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full"></div>
            </div>
          </div>
        );
      case "challenge":
        // 점들 (콜론처럼)
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5 sm:gap-2 items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1.5 sm:gap-2 items-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      case "growth":
        // 빨간색 사각형 테두리
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-red-500"></div>
          </div>
        );
      case "value":
        // 기하학적 패턴 (다이아몬드)
        return (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <div className="absolute inset-0 border-2 border-gray-900/70 rotate-45"></div>
              <div className="absolute inset-1.5 sm:inset-2 border-2 border-gray-900/50 -rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gray-900/70 rounded-full"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="relative bg-background py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* 배경 장식 도형들 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 빨간 원 - 우상단 */}
        <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-red-500 rounded-full opacity-15 blur-sm"></div>
        {/* 초록 다각형 - 좌상단 */}
        <div className="absolute top-0 left-0 -top-8 -left-8 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-green-500 opacity-15 blur-sm transform rotate-12"></div>
        {/* 시안 다각형 - 중앙 좌측 */}
        <div className="absolute top-1/2 left-0 -left-10 w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-cyan-500 opacity-15 blur-sm transform -rotate-12"></div>
        {/* 파란 다각형 - 우하단 */}
        <div className="absolute bottom-0 right-0 -bottom-8 -right-8 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-500 opacity-15 blur-sm transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* 왼쪽: 소개 텍스트 */}
            <div className="flex flex-col justify-center">
              <div className="space-y-3 sm:space-y-4 md:space-y-5 text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
                <p className="break-keep">
                  <strong className="text-lg sm:text-xl md:text-2xl">KHUDA</strong>
                  <span className="text-xs sm:text-sm md:text-base text-muted-foreground"> (Kyung Hee University Data Analysis & AI)</span>는 경희대학교를 대표하는 데이터 · AI 학회입니다.
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> 2022년 설립 이래 9개 기수를 거치며 300명 이상의 데이터 인재를 배출,</span>
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> 교내를 넘어 학문과 실무를 잇는 핵심 커뮤니티로 자리매김했습니다.</span>
                </p>
                <p className="break-keep">
                  우리는 단순한 기술 습득을 넘어, 데이터 중심의 사고로 세상의 문제를 재정의합니다.
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> 체계적인 커리큘럼과 실전 프로젝트를 통해 전문 역량을 갈고닦으며,</span>
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> 동료와 함께 성장하는 즐거움을 동력 삼아 사회에 새로운 가치를 더하는 해답을 찾아 나갑니다.</span>
                </p>
                <p className="break-keep">
                  우리는 단순한 팀을 넘어,
                  <br className="hidden sm:block" />
                  <span className="sm:inline"> 다음 도전과 연결되는 네트워크를 만들어갑니다.</span>
                </p>
              </div>
            </div>

            {/* 오른쪽: Values 카드 그리드 */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              {values.map((value, index) => (
                <div key={value.title} className="flex flex-col">
                  {/* 카드 */}
                  <div className="relative aspect-square max-w-[140px] sm:max-w-[160px] md:max-w-[180px] mx-auto w-full bg-white border border-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden group hover:border-gray-300 hover:shadow-md transition-all duration-300">
                    {renderGraphic(value.graphic)}
                    <h3 className="relative z-10 text-gray-900 text-sm sm:text-base md:text-lg font-bold text-center px-2">
                      {value.title}
                    </h3>
                  </div>
                  {/* 설명 텍스트 */}
                  <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-muted-foreground leading-relaxed break-keep text-center">
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

export default AboutMainSection;
