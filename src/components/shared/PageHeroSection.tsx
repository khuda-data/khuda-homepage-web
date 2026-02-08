import { cn } from "@/lib/utils";

interface PageHeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

const PageHeroSection = ({ title, subtitle, backgroundImage }: PageHeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* 배경 이미지 또는 그라데이션 배경 */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/60" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-red-800/70 via-red-700/60 to-blue-800/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/60" />
            {/* 빨강 글로우 효과 */}
            <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-red-600/25 rounded-full blur-[80px]" />
            {/* 파랑 글로우 효과 */}
            <div className="absolute bottom-0 left-1/3 w-[250px] h-[180px] bg-blue-600/25 rounded-full blur-[70px]" />
          </>
        )}
      </div>

      {/* 하단 경계선 - 아래 콘텐츠와 명확한 구분 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[1]" />

      <div className={cn("container mx-auto relative z-10 px-4 sm:px-6 md:px-12 lg:px-16", "pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16")}>
        <div className="max-w-4xl">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-2.5 md:mb-3 text-white leading-[1.3]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#999] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
