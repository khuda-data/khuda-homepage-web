import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  return (
    <section 
      id="about" 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        "scroll-mt-12 sm:scroll-mt-16 md:scroll-mt-18 lg:scroll-mt-20",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        <div className={SECTION_STYLES.maxWidth.narrow}>
          <div className={SECTION_STYLES.header.container}>
            <h2 className={SECTION_STYLES.header.title}>
              소개
            </h2>
            <p className={SECTION_STYLES.header.subtitle}>
              경희대학교 데이터분석/AI 학회 KHUDA를 소개합니다
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              KHUDA는 경희대학교 데이터분석/AI 학회로, 데이터와 AI 기술을 통해 미래를 만들어가는 학회입니다.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              함께 성장하고, 함께 도전하며, 새로운 가능성을 만들어갑니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
