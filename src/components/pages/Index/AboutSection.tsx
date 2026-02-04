import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import CountUp from "./CountUp";
import { useEffect, useState, type ReactNode } from "react";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollReveal = ({ children, className, delay = 0 }: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

interface FeatureInfo {
  title: string;
  description: string;
  details: string;
}

interface AchievementInfo {
  value: number;
  label: string;
  suffix: string;
}

interface FeatureBlockProps {
  feature: FeatureInfo;
}

const FeatureBlock = ({ feature }: FeatureBlockProps) => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "border-t border-border/20 pt-10 sm:pt-12 md:pt-14"
      )}
    >
      <div className={SECTION_STYLES.maxWidth.narrow}>
        <div className="flex flex-col gap-4 sm:gap-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight">
            {feature.title}
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
              {feature.description}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
              {feature.details}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        "border-t border-border/20 pt-10 sm:pt-12 md:pt-14 transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.label}
            className="text-center transition-all duration-700 ease-out"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              <CountUp
                from={0}
                to={achievement.value}
                duration={2}
                delay={index * 0.1}
                suffix={achievement.suffix}
                startWhen={isVisible}
                resetKey={resetKey}
              />
            </div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground">
              {achievement.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleReset = () => {
      setResetKey(prev => prev + 1);
    };

    window.addEventListener('countup-reset', handleReset);
    return () => {
      window.removeEventListener('countup-reset', handleReset);
    };
  }, []);

  const features = [
    {
      title: "체계적으로 성장하다",
      description: "KHUDA는 학습과 실천 사이를 잇는 독자적인 성장 구조를 설계합니다.",
      details: "이론에 머무르지 않고, 경험으로 완성되는 성장을 제공합니다.",
    },
    {
      title: "연결이 기회를 만듭니다",
      description: "사람과 아이디어, 배움과 실행을 연결합니다.",
      details: "KHUDA의 네트워크는 당신의 성장을 더 빠르게 움직이게 합니다.",
    },
    {
      title: "깊이 몰입하다, 함께 성장하다",
      description: "우리는 함께 배우고, 서로를 자극하며 더 깊이 파고듭니다.",
      details: "KHUDA의 프로젝트는 사고력, 팀워크, 리더십을 동시에 성장시키는 경험입니다.",
    },
  ];

  const achievements = [
    { value: 200, label: "수료생", suffix: "+" },
    { value: 150, label: "아이디어 제출", suffix: "+" },
    { value: 80, label: "프로젝트 완료", suffix: "+" },
    { value: 50, label: "협업 기업", suffix: "+" },
  ];

  return (
    <section
      id="about"
      className={cn(
        SECTION_STYLES.section.base,
        "scroll-mt-12 sm:scroll-mt-16 md:scroll-mt-18 lg:scroll-mt-20"
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        {/* 히어로 섹션 */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className={SECTION_STYLES.maxWidth.narrow}>
            <div className="text-center space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-foreground">
                당신의 비전은 무엇인가요?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                지금 이 순간, 목표를 향해 나아갈 준비가 되었나요?
              </p>
              <p className="text-xs sm:text-sm md:text-base text-foreground/90 leading-relaxed pt-1">
                경희대학교의 이름으로,
                <br />
                우리는 성장의 출발점이 됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {/* 성과 섹션 */}
          <AchievementsSection achievements={achievements} resetKey={resetKey} />

          {/* 특징 섹션 */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {features.map((feature) => (
              <FeatureBlock key={feature.title} feature={feature} />
            ))}
          </div>

          {/* CTA 섹션 */}
          <ScrollReveal className="border-t border-border/20 pt-12 sm:pt-16 md:pt-20 text-center">
            <div className={SECTION_STYLES.maxWidth.narrow}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                도전하기로 한 결정
              </h3>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-2">
                한 걸음 더 나아가기로 한 선택,
                <br />
                그 선택이 새로운 가능성을 엽니다.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-foreground font-semibold mt-4 sm:mt-6">
                지금, KHUDA와 함께 도전하세요.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
