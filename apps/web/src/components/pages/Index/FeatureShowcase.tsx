import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_REVEAL_OPTIONS, ROUTES } from "@/lib/constants";
import { type FeatureInfo } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Image } from "lucide-react";

export type { FeatureInfo };

interface FeatureShowcaseProps {
  features: FeatureInfo[];
}

const FeatureShowcase = ({ features }: FeatureShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  const currentFeature = features[activeIndex] || features[0];

  // 호버 시 해당 카드 활성화
  const handleHover = (index: number) => {
    setActiveIndex(index);
  };

  // 모바일 탭
  const handleTap = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* 헤더 */}
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 md:gap-6">
          <div className="flex-1">
            <div className="flex items-start gap-2 sm:gap-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
                <span className="inline-block -translate-x-1 sm:-translate-x-2">We Experience</span>
                <br />
                <span
                  key={activeIndex}
                  className="inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-600 animate-fade-up -mt-1 sm:-mt-2"
                >
                  {currentFeature.title}
                </span>
              </h2>
              {/* 모바일에서만 제목 옆에 화살표 표시 */}
              <Link
                href={ROUTES.activities}
                className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group sm:hidden mt-0.5"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900 group-hover:text-white transition-colors duration-300" />
              </Link>
            </div>
            <p
              key={`desc-${activeIndex}`}
              className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-sm md:text-base text-black leading-relaxed max-w-xl animate-smooth-slide"
            >
              {currentFeature.description}
            </p>
          </div>
          {/* 데스크톱에서만 오른쪽에 화살표 표시 */}
          <Link
            href={ROUTES.activities}
            className="hidden sm:flex flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300 items-center justify-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 group mt-2 sm:mt-3 self-start"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 group-hover:text-white transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 데스크톱: 확장 카드 레이아웃 */}
      <div className="hidden md:flex gap-3 lg:gap-4 h-[360px] lg:h-[400px] xl:h-[440px]">
        {features.map((feature, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={feature.title}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out",
                isActive ? "flex-[4]" : "flex-[1]"
              )}
              onMouseEnter={() => handleHover(index)}
            >
              {/* 배경 이미지 / 플레이스홀더: 활성 카드만 우선 로드, 나머지 lazy */}
              <div className="absolute inset-0 bg-blue-200/70">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={400}
                    loading={isActive ? "eager" : "lazy"}
                    fetchPriority={isActive ? "high" : undefined}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <Image className="w-14 h-14 lg:w-16 lg:h-16 text-gray-700" />
                    <p className="text-gray-600 text-sm">이미지 준비 중</p>
                  </div>
                )}
              </div>

              {/* 오버레이 */}
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-700",
                  isActive
                    ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    : "bg-black/20"
                )}
              />

              {/* 활성 카드: 타이틀 + 설명 */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 p-5 lg:p-6 xl:p-7 text-white transition-all duration-500",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                )}
              >
                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-1.5 lg:mb-2 leading-tight drop-shadow-lg">
                  {feature.title}
                </h3>
                <p className="text-xs lg:text-sm text-white/90 leading-relaxed max-w-lg drop-shadow-md">
                  {feature.details}
                </p>
              </div>

              {/* 비활성 카드: 라벨 */}
              <div
                className={cn(
                  "absolute top-4 left-4 lg:top-5 lg:left-5 xl:top-6 xl:left-6 transition-all duration-500",
                  isActive
                    ? "opacity-0 scale-90"
                    : "opacity-100 scale-100"
                )}
              >
                <span className="text-white text-base lg:text-lg xl:text-xl font-bold">
                  {feature.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 모바일: 카드 레이아웃 */}
      <div className="md:hidden flex flex-col gap-2.5 sm:gap-3">
        {features.map((feature, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={feature.title}
              className={cn(
                "relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out",
                isActive ? "h-[220px] sm:h-[260px]" : "h-[64px] sm:h-[72px]"
              )}
              onClick={() => handleTap(index)}
            >
              {/* 배경: 활성 카드만 우선 로드, 나머지 lazy */}
              <div className="absolute inset-0 bg-blue-200/70">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    width={400}
                    height={260}
                    loading={isActive ? "eager" : "lazy"}
                    fetchPriority={isActive ? "high" : undefined}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 sm:gap-2">
                    <Image className={cn(
                      "text-gray-700 transition-all duration-500",
                      isActive ? "w-10 h-10 sm:w-12 sm:h-12" : "w-6 h-6 sm:w-8 sm:h-8"
                    )} />
                    {isActive && <p className="text-gray-600 text-[10px] sm:text-xs">이미지 준비 중</p>}
                  </div>
                )}
              </div>

              {/* 오버레이 */}
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  isActive
                    ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    : "bg-black/20"
                )}
              />

              {/* 활성 카드: 내용 */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 text-white">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-1.5 leading-tight drop-shadow-lg">
                    {feature.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs md:text-sm text-white/90 leading-relaxed line-clamp-3 drop-shadow-md">
                    {feature.details}
                  </p>
                </div>
              )}

              {/* 비활성 카드: 라벨 */}
              {!isActive && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    {feature.label}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureShowcase;
