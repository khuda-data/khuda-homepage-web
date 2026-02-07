import { memo } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";
import { RECRUITMENT_INFO, SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import TargetCards from "./TargetCards";
import SectionHeader from "@/components/shared/SectionHeader";

const TargetSection = memo(() => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  return (
    <div 
      ref={ref}
      className={cn(
        "w-full py-12 sm:py-16 md:py-20 lg:py-24 mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 ease-out",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <SectionHeader label={RECRUITMENT_INFO.sectionLabel} title={RECRUITMENT_INFO.sectionTitle} />

      <TargetCards />
    </div>
  );
});

TargetSection.displayName = "TargetSection";

export default TargetSection;
