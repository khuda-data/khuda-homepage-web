import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import CountUp from "./CountUp";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

export interface AchievementInfo {
  value: number;
  label: string;
  suffix: string;
}

interface AchievementsSectionProps {
  achievements: AchievementInfo[];
  resetKey: number;
}

const AchievementsSection = ({ achievements, resetKey }: AchievementsSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* 2x2 그리드 + 십자 구분선 */}
      <div className="relative max-w-3xl mx-auto">
        {/* 십자 구분선 */}
        <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-white/10 -translate-y-1/2" />
        <div className="absolute left-1/2 top-[10%] bottom-[10%] w-px bg-white/10 -translate-x-1/2" />
        {/* 중앙 십자 포인트 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 flex items-center justify-center">
          <span className="text-white/20 text-xs">+</span>
        </div>

        <div className="grid grid-cols-2 grid-rows-2">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.label}
              className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12 transition-all duration-700 ease-out"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter mb-2 sm:mb-3">
                <CountUp
                  from={0}
                  to={achievement.value}
                  duration={2}
                  delay={index * 0.1}
                  suffix={achievement.suffix}
                  className="[&>.suffix]:text-base [&>.suffix]:sm:text-lg [&>.suffix]:md:text-xl [&>.suffix]:font-medium [&>.suffix]:align-super [&>.suffix]:ml-0.5"
                  startWhen={isVisible}
                  resetKey={resetKey}
                />
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/50 tracking-wide">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
