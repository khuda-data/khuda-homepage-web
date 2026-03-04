import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { SCROLL_ANIMATION_CONFIG } from "@/lib/constants";

const SCROLL_REVEAL_OPTIONS = {
  threshold: SCROLL_ANIMATION_CONFIG.threshold,
  rootMargin: "0px 0px -80px 0px",
};

// 인덱스 페이지 후원사 로고 (카드 6개 슬롯, 노출할 후원사만 채움)
const INDEX_SPONSORS: Array<{ name: string; logo: string; website?: string; logoSmall?: boolean } | null> = [
  { name: "몬스터 에너지", logo: "/images/sponsors/monster-color.png", website: "https://www.monsterenergy.com" },
  { name: "Lovable", logo: "/images/sponsors/lovable-color.png", website: "https://lovable.dev", logoSmall: true },
  { name: "한빛앤", logo: "/images/sponsors/hanbit-color.png", website: "https://www.hanbitn.com" },
  { name: "김성민커피", logo: "/images/sponsors/ksmcoffee-color.png", website: "https://kimsungmin.co.kr/" },
  null,
  null,
];

const SponsorShowcase = () => {
  const { ref, isVisible } = useScrollAnimation(SCROLL_REVEAL_OPTIONS);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 lg:gap-12">
        {/* 왼쪽: 제목 + 설명 */}
        <div className="lg:w-[40%]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight sm:leading-[1.15] tracking-tight mb-3 sm:mb-4 md:mb-5">
            SPONSOR
          </h2>
          <p className="text-sm sm:text-sm md:text-base text-foreground leading-relaxed">
            KHUDA와 새로운 가치를 만들어갈 후원 및 협업 문의, 언제든 기다리고 있습니다.
          </p>
        </div>

        {/* 오른쪽: 카드 그리드 - 모바일 3열, 태블릿 이상 3열 */}
        <div className="lg:w-[60%] flex justify-center">
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-4 lg:gap-5 max-w-[520px] w-full">
            {INDEX_SPONSORS.map((sponsor, index) =>
              sponsor ? (
                sponsor.website ? (
                  <a
                    key={sponsor.name}
                    href={sponsor.website}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center aspect-square p-3 sm:p-4 hover:bg-gray-200 transition-colors"
                    aria-label={sponsor.name}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className={cn("max-h-full max-w-full object-contain", sponsor.logoSmall && "max-h-[55%] max-w-[55%]")}
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                ) : (
                  <div
                    key={sponsor.name}
                    className="bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center aspect-square p-3 sm:p-4"
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className={cn("max-h-full max-w-full object-contain", sponsor.logoSmall && "max-h-[55%] max-w-[55%]")}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )
              ) : (
                <div
                  key={index}
                  className="bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center aspect-square"
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorShowcase;
