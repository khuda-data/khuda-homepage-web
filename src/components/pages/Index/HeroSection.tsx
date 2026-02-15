import { HERO_CONFIG, HERO_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section className={HERO_STYLES.section.base}>
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* 배경 이미지 */}
        <img
          src="/images/hello.png"
          alt=""
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-auto min-w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50 pointer-events-none" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none z-20" />

      <div className={cn(HERO_STYLES.container.base, HERO_STYLES.container.padding)}>
        {/* DIVE INTO KHUDA */}
        <h1 className="flex flex-col sm:flex-row items-start sm:items-baseline gap-0 sm:gap-3 md:gap-4 opacity-0 animate-fade-up animation-delay-200 mb-3 sm:mb-5 md:mb-6">
          <span className="font-display text-2xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-medium text-gray-900 tracking-wide drop-shadow-[0_2px_4px_rgba(255,255,255,0.8),0_0_8px_rgba(255,255,255,0.4)]">
            DIVE INTO
          </span>
          <span className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-gray-900 tracking-wider drop-shadow-[0_2px_4px_rgba(255,255,255,0.8),0_0_8px_rgba(255,255,255,0.4)]">
            KH<span className="bg-gradient-to-r from-[#1a56db] to-[#e02424] bg-clip-text text-transparent drop-shadow-none">U</span>DA
          </span>
        </h1>

        {/* 서브: 경희대학교 데이터·AI 학회 | KHUDA 9th */}
        <p className="font-paperlogy text-[11px] sm:text-base md:text-lg lg:text-xl font-semibold text-gray-800 tracking-[0.1em] sm:tracking-[0.15em] uppercase opacity-0 animate-fade-up animation-delay-400 drop-shadow-[0_1px_3px_rgba(255,255,255,0.7),0_0_6px_rgba(255,255,255,0.3)]">
          {HERO_CONFIG.tagline} <span className="text-gray-600 mx-1 sm:mx-2.5">|</span> <span className="font-bold">{HERO_CONFIG.subtitle}</span>
        </p>
      </div>

      <div className={HERO_STYLES.scrollIndicator.container}>
        <span className="text-xs sm:text-sm text-gray-800 font-semibold tracking-widest uppercase drop-shadow-[0_2px_6px_rgba(255,255,255,0.9),0_0_12px_rgba(255,255,255,0.5)]">
          {HERO_CONFIG.scrollIndicator}
        </span>
        <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-gray-700/60 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
