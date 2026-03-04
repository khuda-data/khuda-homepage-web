import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_REVEAL_OPTIONS, KHUDA_VALUES } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
              {KHUDA_VALUES.map((value, index) => (
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
