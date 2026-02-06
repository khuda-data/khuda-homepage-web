import { cn } from "@/lib/utils";

interface PageHeroSectionProps {
  title: string;
  subtitle: string;
}

const PageHeroSection = ({ title, subtitle }: PageHeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* 빨강-파랑 그라데이션 배경 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-800/70 via-red-700/60 to-blue-800/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/60" />
        {/* 빨강 글로우 효과 */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-red-600/25 rounded-full blur-[120px]" />
        {/* 파랑 글로우 효과 */}
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] bg-blue-600/25 rounded-full blur-[100px]" />
      </div>

      {/* 하단 경계선 - 아래 콘텐츠와 명확한 구분 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[1]" />

      <div className={cn("container mx-auto relative z-10 px-6 sm:px-8 md:px-12 lg:px-16", "pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-16 sm:pb-20 md:pb-24 lg:pb-28")}>
        <div className="max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] lg:text-[3rem] font-bold mb-6 sm:mb-7 md:mb-8 text-white leading-[1.3]">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#999] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
