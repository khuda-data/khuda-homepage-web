import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { 
  SECTION_STYLES, 
  SCROLL_ANIMATION_CONFIG,
  SPONSOR_DATA,
  SPONSOR_PAGE_CONFIG,
  SPONSOR_PAGE_STYLES,
  EXTERNAL_LINK_PROPS
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import LogoLoop from "./LogoLoop";
import CircularGallery from "./CircularGallery";
import { ExternalLink } from "lucide-react";

// 기수별 후원사 로고를 LogoLoop 형식으로 변환
const getSponsorLogosForLoop = () => {
  const allSponsors: Array<{ src: string; alt: string; href?: string }> = [];
  
  SPONSOR_DATA.forEach((generationData) => {
    generationData.sponsors.forEach((sponsor) => {
      if (sponsor.logo) {
        allSponsors.push({
          src: sponsor.logo,
          alt: sponsor.name,
          href: sponsor.website,
        });
      }
    });
  });
  
  return allSponsors;
};

interface SponsorSectionProps {
  variant?: "simple" | "detailed";
}

const SponsorSection = ({ variant = "simple" }: SponsorSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const sponsorLogos = getSponsorLogosForLoop();

  return (
    <section 
      id="sponsor" 
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
              {SPONSOR_PAGE_CONFIG.title}
            </h2>
            <p className={SECTION_STYLES.header.subtitle}>
              {SPONSOR_PAGE_CONFIG.subtitle}
            </p>
          </div>
          
          {/* LogoLoop로 후원사 로고 표시 - simple 버전에서만 표시 */}
          {variant === "simple" && (
            <>
              {sponsorLogos.length > 0 ? (
                <div className="py-8 sm:py-12">
                  <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
                    <LogoLoop
                      logos={sponsorLogos}
                      speed={100}
                      direction="left"
                      logoHeight={60}
                      gap={60}
                      hoverSpeed={0}
                      scaleOnHover
                      fadeOut
                      fadeOutColor="hsl(var(--background))"
                      ariaLabel="후원사 로고"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                    후원사 정보가 곧 업데이트될 예정입니다.
                  </p>
                </div>
              )}
            </>
          )}

          {/* 기수별 후원사 상세 섹션 - detailed 버전에서만 표시 */}
          {variant === "detailed" && (
            <>
              {SPONSOR_DATA.map((generationData) => {
                // CircularGallery용 items 변환
                const galleryItems = generationData.sponsors
                  .filter(sponsor => sponsor.logo)
                  .map(sponsor => ({
                    image: sponsor.logo!,
                    text: sponsor.name
                  }));

                return (
                  <div key={generationData.generation} className={SPONSOR_PAGE_STYLES.generationSection.container}>
                    <h2 className={SPONSOR_PAGE_STYLES.generationSection.title}>
                      {generationData.generation}
                    </h2>
                    {galleryItems.length > 0 ? (
                      <div style={{ height: '600px', position: 'relative' }}>
                        <CircularGallery
                          items={galleryItems}
                          bend={3}
                          textColor="#ffffff"
                          borderRadius={0.05}
                          scrollSpeed={2}
                          scrollEase={0.05}
                        />
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground text-sm sm:text-base">
                          {SPONSOR_PAGE_CONFIG.noSponsorsMessage}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* 후원사 문의 CTA 섹션 */}
              <div className={SPONSOR_PAGE_STYLES.ctaSection.container}>
                <h2 className={SPONSOR_PAGE_STYLES.ctaSection.title}>
                  KHUDA와 함께 성장하세요
                </h2>
                <p className={SPONSOR_PAGE_STYLES.ctaSection.description}>
                  KHUDA를 후원해주시는 기업 및 기관을 모집하고 있습니다.
                  <br />
                  후원 문의는 아래 버튼을 통해 신청해주세요.
                </p>
                {SPONSOR_PAGE_CONFIG.googleFormButton.disabled ? (
                  <button
                    disabled
                    className={cn(
                      SPONSOR_PAGE_STYLES.ctaSection.button.base,
                      SPONSOR_PAGE_STYLES.ctaSection.button.disabled
                    )}
                  >
                    {SPONSOR_PAGE_CONFIG.googleFormButton.disabledText}
                  </button>
                ) : (
                  <a
                    href={SPONSOR_PAGE_CONFIG.googleFormButton.href}
                    className={cn(
                      SPONSOR_PAGE_STYLES.ctaSection.button.base,
                      SPONSOR_PAGE_STYLES.ctaSection.button.active
                    )}
                    {...EXTERNAL_LINK_PROPS}
                  >
                    {SPONSOR_PAGE_CONFIG.googleFormButton.text}
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
