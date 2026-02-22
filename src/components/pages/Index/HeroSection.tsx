import Grainient from "./Grainient";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/constants";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Grainient 배경 */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Grainient
          color1="#e1dbdb"
          color2="#4079c4"
          color3="#bb5d5d"
          timeSpeed={0}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.2}
          rotationAmount={500}
          noiseScale={1}
          grainAmount={0.08}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1.5}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.7}
          className="w-full h-full"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex-1 flex flex-col px-6 sm:px-8 md:px-16 lg:px-24 pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-8 sm:pb-12 md:pb-16 lg:pb-20">

        {/* 메인 콘텐츠 - 모바일: 세로 배치, 데스크톱: BOAZ 스타일 배치 */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start px-0 md:py-0 gap-0">

          {/* 왼쪽: 태그라인 + KHUDA 타이틀 + 서브텍스트 묶음 */}
          <div className="flex flex-col items-center md:items-start gap-1 md:gap-2 flex-shrink-0">
            {/* 태그라인 - 데스크톱: KHUDA 바로 위 */}
            <p
              className="hidden md:block text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.2em] uppercase opacity-0 animate-fade-up animation-delay-200 text-left"
              style={{ color: "#1a1a2e" }}
            >
              KYUNGHEE&apos;s Leading Society in Data and AI
            </p>

            {/* KHUDA 타이틀 */}
            <h1
              className="font-display font-black leading-none select-none opacity-0 animate-fade-up animation-delay-300 text-center md:text-left"
              style={{ 
                fontSize: "clamp(2.5rem, 11vw, 8rem)",
                color: "#0f172a",
                letterSpacing: "0.05em"
              }}
            >
              KH<span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                }}
              >U</span>DA
            </h1>

            {/* 지금 지원하기 버튼 */}
            <Link
              to={ROUTES.recruiting}
              className="mt-6 md:mt-8 inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-8 md:py-3.5 bg-black text-white font-semibold text-xs sm:text-sm md:text-base rounded-lg hover:bg-black/90 transition-all duration-200 active:scale-[0.98] opacity-0 animate-fade-up animation-delay-400"
            >
              지금 지원하기
            </Link>
          </div>
        </div>

        {/* 모바일: 하단 태그라인만 */}
        <div className="relative z-10 px-0 pb-20 sm:pb-24 md:hidden">
          <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase opacity-0 animate-fade-up animation-delay-500 text-center" style={{ color: "#1a1a2e" }}>
            KYUNGHEE&apos;s Leading Society in Data and AI
          </p>
        </div>

      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 z-10 opacity-0 animate-fade-in animation-delay-600">
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: "#000000" }}>
          Scroll
        </span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-black to-transparent" />
      </div>

      {/* 하단 그라디언트 오버레이 - 다음 섹션과의 경계 흐리기 */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
