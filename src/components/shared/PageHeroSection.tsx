import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  heroImage?: string;
  actions?: ReactNode;
}

const PageHeroSection = ({ title, subtitle, backgroundImage, heroImage, actions }: PageHeroSectionProps) => {
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/40" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-red-800/70 via-red-700/60 to-blue-800/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/40" />
            {/* 빨강 글로우 효과 */}
            <div className="absolute top-0 right-1/4 w-[300px] h-[200px] bg-red-600/25 rounded-full blur-[80px]" />
            {/* 파랑 글로우 효과 */}
            <div className="absolute bottom-0 left-1/3 w-[250px] h-[180px] bg-blue-600/25 rounded-full blur-[70px]" />
          </>
        )}
      </div>

      {/* 하단 경계선 - 아래 콘텐츠와 명확한 구분 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-[1]" />

      <div className={cn("container mx-auto relative z-10 px-4 sm:px-6 md:px-12 lg:px-16", "pt-28 sm:pt-36 md:pt-44 lg:pt-52 xl:pt-60 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16")}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* 왼쪽: 텍스트 */}
          <div className="flex-1 w-full lg:w-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-2.5 md:mb-3 text-white leading-[1.3] text-left">
              {title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl text-left">
              {subtitle}
            </p>
            {actions && (
              <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            )}
          </div>
          
          {/* 오른쪽: 히어로 이미지 */}
          {heroImage && (
            <div className="flex-shrink-0 w-full lg:w-auto lg:max-w-md xl:max-w-lg">
              <img 
                src={heroImage} 
                alt="" 
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;
