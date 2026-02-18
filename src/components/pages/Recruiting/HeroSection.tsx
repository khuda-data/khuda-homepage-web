import { memo, useMemo } from "react";
import RotatingText from "./RotatingText";

const HeroSection = memo(() => {
  const rotatingTextProps = useMemo(() => ({
    texts: ["Networking", "Passion", "Beyond Limits"] as const,
    mainClassName: "px-2 sm:px-2.5 md:px-3 lg:px-4 xl:px-5 bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black overflow-hidden py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 justify-start rounded-md sm:rounded-lg md:rounded-xl lg:rounded-2xl leading-[0.95] sm:leading-[0.9] tracking-tighter",
    staggerFrom: "last" as const,
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-120%" },
    staggerDuration: 0.025,
    splitLevelClassName: "overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5",
    transition: { type: "spring" as const, damping: 30, stiffness: 400 },
    rotationInterval: 2500,
  }), []);

  return (
    <div className="w-full pt-8 sm:pt-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-0">
        <div className="flex flex-col items-center justify-center">
          {/* 텍스트 */}
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 xl:gap-4">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-[0.95] sm:leading-[0.9] tracking-tighter whitespace-nowrap">
                We Are Looking For
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-[0.95] sm:leading-[0.9] tracking-tighter whitespace-nowrap">
                With
              </p>
              <RotatingText {...rotatingTextProps} />
            </div>
            <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl max-w-2xl mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 leading-relaxed px-0.5 sm:px-0 text-center">
              KHUDA는 서로를 <span className="text-white font-semibold">연결</span>하고,
              데이터와 AI에 대한 <span className="text-white font-semibold">열정</span>을 나누며,
              함께 <span className="text-white font-semibold">한계를 넘어서는</span> 사람을 찾습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
