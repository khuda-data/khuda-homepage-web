import Header from "@/components/shared/Header";
import Beams from "@/components/shared/Beams";
import ProjectsSection from "@/components/pages/Projects/ProjectsSection";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SECTION_STYLES, SCROLL_ANIMATION_CONFIG } from "@/lib/constants";

const Projects = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className={cn(
            "relative pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-28 sm:pb-32 md:pb-40 lg:pb-48 mt-16 sm:mt-20 md:mt-28 lg:mt-36 overflow-hidden bg-black",
            heroVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
          )}
        >
          {/* Beams 배경 */}
          <div className="absolute inset-0 z-0">
            <Beams
              beamWidth={3}
              beamHeight={30}
              beamNumber={20}
              lightColor="#ffffff"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={30}
            />
          </div>

          {/* 상단 그라데이션 - 헤더와 자연스러운 연결 */}
          <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-b from-background to-transparent z-[1]" />

          {/* 하단 그라데이션 - 자연스러운 연결 */}
          <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 md:h-48 bg-gradient-to-t from-background to-transparent z-[1]" />

          <div className={cn(SECTION_STYLES.container.base, "relative z-10")}>
            <div className="max-w-5xl mx-auto">
              <div className={SECTION_STYLES.header.container}>
                <h2 className="text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-bold mb-2 sm:mb-2 md:mb-3 text-white">
                  Connection and Possibility
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-300">
                  KHUDA 구성원들이 직접 기획하고 개발한 프로젝트들을 소개합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
