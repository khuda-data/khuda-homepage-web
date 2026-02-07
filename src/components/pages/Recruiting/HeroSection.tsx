import { memo, useMemo } from "react";
import RotatingText from "@/components/RotatingText";
import MetallicPaint from "@/components/MetallicPaint";

const HeroSection = memo(() => {
  const rotatingTextProps = useMemo(() => ({
    texts: ["Networking", "Passion", "Beyond Limits"] as const,
    mainClassName: "px-2 sm:px-3 md:px-4 lg:px-5 bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black overflow-hidden py-1 sm:py-1.5 md:py-2 lg:py-3 xl:py-4 justify-start rounded-lg sm:rounded-xl md:rounded-2xl leading-[0.9] tracking-tighter",
    staggerFrom: "last" as const,
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "-120%" },
    staggerDuration: 0.025,
    splitLevelClassName: "overflow-hidden pb-0.5 sm:pb-1 md:pb-1.5",
    transition: { type: "spring" as const, damping: 30, stiffness: 400 },
    rotationInterval: 2500,
  }), []);

  const metallicPaintProps = useMemo(() => ({
    imageSrc: "/images/khuda-ico.png",
    seed: 42,
    scale: 4,
    patternSharpness: 1,
    noiseScale: 0.5,
    speed: 0.3,
    liquid: 0.75,
    mouseAnimation: false,
    brightness: 2,
    contrast: 0.5,
    refraction: 0.01,
    blur: 0.015,
    chromaticSpread: 2,
    fresnel: 1,
    angle: 0,
    waveAmplitude: 1,
    distortion: 1,
    contour: 0.2,
    lightColor: "#ffffff",
    darkColor: "#000000",
    tintColor: "#feb3ff",
  }), []);

  return (
    <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-2">
          {/* 왼쪽: 텍스트 */}
          <div className="flex-1 pt-0 w-full lg:w-auto">
            <div className="pt-0">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                We Are Looking For
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-4 lg:gap-6 mt-2 sm:mt-3 md:mt-4">
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                With
              </p>
              <RotatingText {...rotatingTextProps} />
            </div>
            <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 leading-relaxed">
              KHUDA는 서로를 <span className="text-white font-semibold">연결</span>하고,
              데이터와 AI에 대한 <span className="text-white font-semibold">열정</span>을 나누며,
              함께 <span className="text-white font-semibold">한계를 넘어서는</span> 사람을 찾습니다.
            </p>
          </div>
          
          {/* 오른쪽: MetallicPaint - 데스크톱에서만 표시 */}
          <div className="hidden lg:block w-auto flex-shrink-0 lg:-ml-8 xl:-ml-12">
            <div style={{ width: '400px', height: '400px' }}>
              <MetallicPaint {...metallicPaintProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
