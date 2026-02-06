import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { RECRUITMENT_INFO, SECTION_STYLES, RECRUITMENT_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import RecruitmentInfoCards from "./RecruitmentInfoCards";
import YBODialogs from "./YBODialogs";
import RecruitmentProcess from "./RecruitmentProcess";

const RecruitingSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  return (
    <section 
      id={RECRUITMENT_STYLES.sectionId} 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        "py-16 sm:py-20 md:py-28 lg:py-32",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={RECRUITMENT_STYLES.layout.container}>
        <div className={SECTION_STYLES.header.container}>
          <h2 className={SECTION_STYLES.header.title}>
            {RECRUITMENT_INFO.sectionTitle}
          </h2>
          <p className={SECTION_STYLES.header.subtitle}>
            {RECRUITMENT_INFO.sectionSubtitle(RECRUITMENT_INFO.generation)}
          </p>
        </div>

        <RecruitmentInfoCards />

        <YBODialogs />

        <RecruitmentProcess />
      </div>
    </section>
  );
};

export default RecruitingSection;
