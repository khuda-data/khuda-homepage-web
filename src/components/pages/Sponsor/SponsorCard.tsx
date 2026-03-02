import type { Sponsor } from "@/lib/constants";

interface SponsorCardProps {
  sponsor: Sponsor;
}

const SponsorCard = ({ sponsor }: SponsorCardProps) => {
  return (
    <div className="flex flex-col">
      {/* 카드 */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] mb-2 sm:mb-3">
        {sponsor.logo && (
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        )}
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
    </div>
  );
};

export default SponsorCard;
