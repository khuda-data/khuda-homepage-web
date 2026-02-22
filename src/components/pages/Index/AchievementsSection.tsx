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
  from?: number;
  isStatic?: boolean;
  staticText?: string;
  emoji?: string;
  variant?: "primary" | "white" | "accent";
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
      {/* 섹션 헤더 */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
          KHUDA's
          <br />
          <span className="text-blue-600">
            Achievements
          </span>
        </h2>
        <p className="text-sm sm:text-base text-foreground mt-3 sm:mt-4">
          데이터와 AI를 함께 탐구하며 성장하는 경희대 대표 학회
        </p>
      </div>

      {/* 2x2 카드 그리드 */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {achievements.map((achievement, index) => {
          const isRedCard = achievement.isStatic;
          return (
            <div
              key={achievement.label}
              className={cn(
                "relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] overflow-hidden",
                "transition-all duration-700 ease-out",
                isRedCard ? "bg-red-300/70 text-gray-900" : "bg-blue-200/70 text-gray-900",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 120}ms` }}
            >
              {/* 라벨 */}
              <div className="text-xs sm:text-sm font-medium tracking-wide mb-2 sm:mb-3 text-gray-600">
                {achievement.label}
              </div>

              {/* 값 */}
              <div className="mt-1 sm:mt-2">
                {achievement.isStatic ? (
                  <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight text-gray-900 break-keep">
                    {achievement.staticText?.split("\n").map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                    <CountUp
                      from={achievement.from ?? 0}
                      to={achievement.value}
                      duration={2}
                      delay={index * 0.15}
                      suffix={achievement.suffix}
                      className="[&>.suffix]:text-lg [&>.suffix]:sm:text-xl [&>.suffix]:md:text-2xl [&>.suffix]:font-bold [&>.suffix]:ml-0.5 text-gray-900"
                      startWhen={isVisible}
                      resetKey={resetKey}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
