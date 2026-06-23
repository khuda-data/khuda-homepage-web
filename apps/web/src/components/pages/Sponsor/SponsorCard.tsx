import type { Sponsor } from "@/data/sponsors";

interface SponsorCardProps {
  sponsor: Sponsor;
}

const SponsorCard = ({ sponsor }: SponsorCardProps) => {
  const showLogo = sponsor.logo && !sponsor.logoProhibited;

  const cardContent = (
    <>
      {/* 카드 */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center h-[100px] sm:h-[120px] md:h-[140px] lg:h-[160px] mb-2 sm:mb-3 transition-colors hover:bg-gray-200">
        {showLogo ? (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className={
                sponsor.logoLarge
                  ? "max-h-16 sm:max-h-20 md:max-h-24 lg:max-h-28 max-w-full object-contain"
                  : sponsor.logoSmall
                  ? "max-h-8 sm:max-h-10 md:max-h-12 lg:max-h-14 max-w-full object-contain"
                  : "max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 max-w-full object-contain"
              }
            loading="lazy"
            decoding="async"
          />
        ) : sponsor.logoProhibited ? (
          <span className="flex flex-col items-center justify-center gap-2" aria-hidden>
            <span className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-dashed border-gray-300">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-[60%] h-[2px] bg-gray-300 rotate-45 rounded-full" />
              </span>
            </span>
            <span className="text-[10px] sm:text-xs text-gray-400 tracking-wide">LOGO N/A</span>
          </span>
        ) : null}
      </div>

      {/* 후원사 이름과 년도 */}
      <div className="text-center px-1">
        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-foreground mb-0.5 sm:mb-1 leading-tight">
          {sponsor.name}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">
          {sponsor.year}
        </p>
      </div>
    </>
  );

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={sponsor.name}
        className="flex flex-col"
      >
        {cardContent}
      </a>
    );
  }

  return <div className="flex flex-col">{cardContent}</div>;
};

export default SponsorCard;
