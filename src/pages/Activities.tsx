import Header from "@/components/Header";
import CurriculumSection from "@/components/CurriculumSection";
import Footer from "@/components/Footer";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const Activities = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section 
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
                  활동
                </h2>
                <p className={SECTION_STYLES.header.subtitle}>
                  KHUDA의 다양한 활동을 확인해보세요
                </p>
              </div>
            </div>
          </div>
        </section>
        <CurriculumSection />
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
