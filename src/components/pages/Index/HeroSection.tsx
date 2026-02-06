// import ColorBends from "./ColorBends";
import Grainient from "@/components/Grainient";
import { useEffect, useState } from "react";
import { HERO_CONFIG, HERO_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % HERO_CONFIG.words.length);
    }, HERO_CONFIG.wordRotationInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={HERO_STYLES.section.base}>
      <div className={HERO_STYLES.colorBendsWrapper.base}>
        {/* 기존 ColorBends 배경 애니메이션 - 주석 처리 */}
        {/* <ColorBends
          {...HERO_CONFIG.colorBends}
          className={HERO_STYLES.colorBends.base}
        /> */}
        
        {/* Grainient 배경 애니메이션 */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <Grainient
            color1="#4a7bc8"
            color2="#2d2d2d"
            color3="#a83d3d"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.2}
            gamma={0.9}
            saturation={1.2}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
        
        <div className={HERO_STYLES.gradient.overlay} />
      </div>
      
      <div className={HERO_STYLES.gradient.bottom} />

      <div className={cn(HERO_STYLES.container.base, HERO_STYLES.container.padding)}>
        <div className={HERO_STYLES.topRow}>
          <p className={HERO_STYLES.subtitle.base}>
            {HERO_CONFIG.subtitle}
          </p>
        </div>

        <h1 className={HERO_STYLES.title.base}>
          <span className={HERO_STYLES.title.prefix}>
            {HERO_CONFIG.title.prefix}
          </span>{" "}
          <span className={HERO_STYLES.title.wordContainer}>
            <span className={HERO_STYLES.title.wordWrapper}>
              <span 
                key={currentWord}
                className={HERO_STYLES.title.word}
              >
                {HERO_CONFIG.words[currentWord]}
              </span>
              <span className={HERO_STYLES.title.dot}>{HERO_CONFIG.title.dot}</span>
            </span>
          </span>
        </h1>

        <p className={HERO_STYLES.tagline}>
          {HERO_CONFIG.tagline}
          <span className={HERO_STYLES.taglineSub}>{HERO_CONFIG.taglineSub}</span>
        </p>
      </div>

      <div className={HERO_STYLES.scrollIndicator.container}>
        <span className={HERO_STYLES.scrollIndicator.text}>
          {HERO_CONFIG.scrollIndicator}
        </span>
        <div className={HERO_STYLES.scrollIndicator.line} />
      </div>
    </section>
  );
};

export default HeroSection;
