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
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight">
          KHUDA's
          <br />
          <span className="text-blue-700">Achievements</span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-3">
          데이터와 AI를 함께 탐구하며 성장하는 경희대 대표 학회
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 sm:gap-y-12 gap-x-4">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.label}
            className={cn(
              "text-center transition-all duration-700 ease-out",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            <p className="text-xs sm:text-sm font-semibold text-foreground mb-1">
              {achievement.label}
            </p>

            {achievement.isStatic ? (
              <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight leading-tight mt-2">
                {achievement.staticText?.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            ) : (
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2">
                <CountUp
                  from={achievement.from ?? 0}
                  to={achievement.value}
                  duration={2}
                  delay={index * 0.15}
                  suffix={achievement.suffix}
                  className="[&>.suffix]:text-xl [&>.suffix]:sm:text-2xl [&>.suffix]:font-bold [&>.suffix]:ml-0.5 [&>.suffix]:text-muted-foreground"
                  startWhen={isVisible}
                  resetKey={resetKey}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
