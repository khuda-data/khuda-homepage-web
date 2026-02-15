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

const CARD_VARIANTS = {
  primary: "bg-primary text-white",
  white: "bg-white text-gray-900",
  accent: "bg-blue-200/70 text-gray-900",
};

const LABEL_VARIANTS = {
  primary: "text-white/80",
  white: "text-gray-500",
  accent: "text-gray-600",
};

const VALUE_VARIANTS = {
  primary: "text-white",
  white: "text-gray-900",
  accent: "text-gray-900",
};

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
          <span className="text-blue-700">
            Achievements
          </span>
        </h2>
        <p className="text-sm sm:text-base text-foreground mt-3 sm:mt-4">
          데이터와 AI를 함께 탐구하며 성장하는 경희대 대표 학회
        </p>
      </div>

      {/* 2x2 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {achievements.map((achievement, index) => {
          const variant = achievement.variant || "primary";
          return (
            <div
              key={achievement.label}
              className={cn(
                "relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] overflow-hidden",
                "transition-all duration-700 ease-out",
                CARD_VARIANTS[variant],
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${200 + index * 120}ms` }}
            >
              {/* 라벨 */}
              <div
                className={cn(
                  "text-xs sm:text-sm md:text-base font-medium tracking-wide",
                  LABEL_VARIANTS[variant]
                )}
              >
                {achievement.label}
              </div>

              {/* 값 */}
              <div className="mt-2 sm:mt-3">
                {achievement.isStatic ? (
                  <div
                    className={cn(
                      "text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight",
                      VALUE_VARIANTS[variant]
                    )}
                  >
                    {achievement.staticText?.split("\n").map((line, i) => (
                      <span key={i}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div
                    className={cn(
                      "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight",
                      VALUE_VARIANTS[variant]
                    )}
                  >
                    <CountUp
                      from={achievement.from ?? 0}
                      to={achievement.value}
                      duration={2}
                      delay={index * 0.15}
                      suffix={achievement.suffix}
                      className="[&>.suffix]:text-lg [&>.suffix]:sm:text-xl [&>.suffix]:md:text-2xl [&>.suffix]:font-bold [&>.suffix]:ml-0.5"
                      startWhen={isVisible}
                      resetKey={resetKey}
                    />
                  </div>
                )}
              </div>

              {/* 이모지 */}
              {achievement.emoji && (
                <div className="absolute right-4 sm:right-6 md:right-8 bottom-4 sm:bottom-6 md:bottom-8 text-4xl sm:text-5xl md:text-6xl opacity-90 select-none">
                  {achievement.emoji}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
