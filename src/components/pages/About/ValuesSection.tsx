import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

interface ValueInfo {
  title: string;
  description: string;
}

const values: ValueInfo[] = [
  {
    title: "Growth",
    description: "우리는 멈추지 않습니다. 지속적인 학습과 도전을 통해 개인의 성장이 곧 조직의 성장이 되도록 합니다.",
  },
  {
    title: "Excellence",
    description: "기본에 충실하되, 결과에 집요합니다. 문제를 깊이 이해하고 더 나은 해답을 만들기 위해 끝까지 고민합니다.",
  },
  {
    title: "Collaboration",
    description: "혼자보다 함께일 때 더 멀리 갈 수 있습니다. 서로의 관점을 존중하며 협업을 통해 더 큰 가치를 만들어냅니다.",
  },
];

const ValuesSection = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
        <div
          ref={ref}
          className={cn(
            "max-w-6xl mx-auto transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 sm:gap-12 md:gap-16 lg:gap-20 mb-8 sm:mb-10 md:mb-12">
            {/* 왼쪽: 제목 */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Our Values
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium">
                우리가 추구하는
                <br />
                세 가지 가치
              </p>
            </div>
            
            {/* 오른쪽: 3개 가치 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {values.map((value) => (
                <div key={value.title} className="flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-5">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-keep">
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
