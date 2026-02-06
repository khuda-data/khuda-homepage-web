import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG, SPONSOR_DATA, ROUTES } from "@/lib/constants";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LogoLoop from "@/components/pages/Sponsor/LogoLoop";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

const SponsorShowcase = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  // 모든 기수의 후원사 로고를 수집 (LogoLoop용)
  const sponsorLogos = useMemo(() => {
    return SPONSOR_DATA.flatMap((generationData) =>
      generationData.sponsors
        .filter((sponsor) => sponsor.logo)
        .map((sponsor) => ({
          src: sponsor.logo!,
          alt: sponsor.name,
          href: sponsor.website,
        }))
    );
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* 헤더 */}
      <div className="mb-10 sm:mb-14 md:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
              SPONSOR
            </h2>
            <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-xl">
              KHUDA와 새로운 가치를 만들어갈 후원 및 협업 문의, 언제든 기다리고 있습니다.
            </p>
          </div>
          <Link
            to={ROUTES.sponsor}
            className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group mt-1 sm:mt-3 self-start"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-black transition-colors duration-300" />
          </Link>
        </div>
      </div>

      {/* 후원사 로고 루프 */}
      {sponsorLogos.length > 0 && (
        <div className="py-6 sm:py-8">
          <div className="w-full h-[90px] sm:h-[120px] relative overflow-hidden">
            <LogoLoop
              logos={sponsorLogos}
              speed={100}
              direction="left"
              logoHeight={56}
              gap={56}
              hoverSpeed={0}
              scaleOnHover
              fadeOut={false}
              ariaLabel="후원사 로고"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsorShowcase;
