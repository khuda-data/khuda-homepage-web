import { useMemo, useState } from "react";
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

const SponsorSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: SCROLL_ANIMATION_CONFIG.threshold });
  const generations = useMemo(() => (
    Array.from({ length: 9 }, (_, index) => `${index + 1}기`)
  ), []);
  const defaultGeneration = SPONSOR_DATA.at(-1)?.generation ?? generations[generations.length - 1];
  const [activeGeneration, setActiveGeneration] = useState(defaultGeneration);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentSponsors = useMemo(() => {
    const generationData = SPONSOR_DATA.find((item) => item.generation === activeGeneration);
    return generationData?.sponsors ?? [];
  }, [activeGeneration]);

  const sponsorLogos = useMemo(() => (
    SPONSOR_DATA.flatMap((generationData) =>
      generationData.sponsors
        .filter((sponsor) => sponsor.logo)
        .map((sponsor) => ({
          src: sponsor.logo!,
          alt: sponsor.name,
          href: sponsor.website,
        }))
    )
  ), []);

  const handleGenerationChange = (generation: string) => {
    if (generation === activeGeneration || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveGeneration(generation);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 120);
  };

  return (
    <section 
      id="sponsor" 
      ref={ref}
      className={cn(
        SECTION_STYLES.section.base,
        "pt-20 sm:pt-24 md:pt-28 lg:pt-32",
        isVisible ? SECTION_STYLES.visibility.visible : SECTION_STYLES.visibility.hidden
      )}
    >
      <div className={SECTION_STYLES.container.base}>
        <div className={SECTION_STYLES.maxWidth.narrow}>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className={SECTION_STYLES.header.title}>
              {SPONSOR_PAGE_CONFIG.title}
            </h2>
            <p className={SECTION_STYLES.header.subtitle}>
              {SPONSOR_PAGE_CONFIG.subtitle}
            </p>
          </div>

          {SPONSOR_PAGE_CONFIG.description && (
            <div className="text-center mb-8 sm:mb-10">
              {SPONSOR_PAGE_CONFIG.description.map((text, index) => (
                <p key={index} className="text-sm sm:text-base text-muted-foreground">
                  {text}
                </p>
              ))}
            </div>
          )}

          {sponsorLogos.length > 0 && (
            <div className="py-6 sm:py-8 mb-10 sm:mb-12">
              <div className="max-w-5xl mx-auto" style={{ height: "120px", position: "relative", overflow: "hidden" }}>
                <LogoLoop
                  logos={sponsorLogos}
                  speed={100}
                  direction="left"
                  logoHeight={56}
                  gap={56}
                  hoverSpeed={0}
                  scaleOnHover
                  fadeOut
                  fadeOutColor="hsl(var(--background))"
                  ariaLabel="후원사 로고"
                />
              </div>
            </div>
          )}

          <div className="text-center text-xs sm:text-sm text-muted-foreground mb-3">
            기수 선택
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {generations.map((generation) => (
              <button
                key={generation}
                type="button"
                onClick={() => handleGenerationChange(generation)}
                className={cn(
                  "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border",
                  activeGeneration === generation
                    ? "bg-white text-black border-white/40 shadow-sm"
                    : "bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:text-white"
                )}
                aria-pressed={activeGeneration === generation}
              >
                {generation}
              </button>
            ))}
          </div>

          {currentSponsors.length > 0 ? (
            <div
              className={cn(
                "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 mb-10 transition-all duration-300",
                isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              )}
            >
              {currentSponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="flex flex-col items-center justify-center gap-2 rounded-lg border border-border/30 bg-card/20 backdrop-blur-sm p-4 sm:p-6"
                >
                  {sponsor.logo ? (
                    sponsor.website ? (
                      <a href={sponsor.website} {...EXTERNAL_LINK_PROPS} className="flex flex-col items-center gap-2">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-12 sm:max-h-14 max-w-full object-contain"
                        />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {sponsor.name}
                        </span>
                      </a>
                    ) : (
                      <>
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-12 sm:max-h-14 max-w-full object-contain"
                        />
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {sponsor.name}
                        </span>
                      </>
                    )
                  ) : (
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {sponsor.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 mb-8">
              <p className="text-muted-foreground text-sm sm:text-base">
                {SPONSOR_PAGE_CONFIG.noSponsorsMessage}
              </p>
            </div>
          )}

          <div className="text-center">
            <a
              href={SPONSOR_PAGE_CONFIG.googleFormButton.href}
              className={cn(
                SPONSOR_PAGE_STYLES.ctaSection.button.base,
                "bg-white text-black border border-white/20 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
              )}
              {...EXTERNAL_LINK_PROPS}
            >
              {SPONSOR_PAGE_CONFIG.googleFormButton.text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;
