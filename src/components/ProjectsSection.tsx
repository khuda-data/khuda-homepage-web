import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  return (
    <section 
      id="projects" 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        <div className={SECTION_STYLES.maxWidth.narrow}>
          <div className={SECTION_STYLES.header.container}>
            <h2 className={SECTION_STYLES.header.title}>
              프로젝트
            </h2>
            <p className={SECTION_STYLES.header.subtitle}>
              KHUDA 회원들이 진행한 프로젝트를 확인해보세요
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              프로젝트 정보가 곧 업데이트될 예정입니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
