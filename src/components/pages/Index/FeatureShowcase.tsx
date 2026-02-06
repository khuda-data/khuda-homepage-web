import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ActivityImage from "./ActivityImage";
import ActivityList from "./ActivityList";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

export interface FeatureInfo {
  title: string;
  description: string;
  details: string;
  image?: string;
}

interface FeatureShowcaseProps {
  features: FeatureInfo[];
}

const FeatureShowcase = ({ features }: FeatureShowcaseProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  const currentFeature = features[activeIndex] || features[0];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* 헤더 */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
              <span className="inline-block -translate-x-2">We Experience</span>
              <br />
              <span
                key={activeIndex}
                className="inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-fade-up -mt-2"
              >
                {currentFeature.title}
              </span>
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
              지식과 정보가 넘치고 서로 새로운 도전을 시도하는 데 큰 도움이 되는
              <br className="hidden sm:block" />
              멋진 KHUDA 활동들을 소개합니다.
            </p>
          </div>
          <Link
            to={ROUTES.activities}
            className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group mt-2 sm:mt-3"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 2컬럼 레이아웃: 이미지 + 피처 리스트 */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
        <ActivityImage
          features={features}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />
        <ActivityList
          features={features}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />
      </div>
    </div>
  );
};

export default FeatureShowcase;
