import ColorBends from "./ColorBends";
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
        <ColorBends
          {...HERO_CONFIG.colorBends}
          className={HERO_STYLES.colorBends.base}
        />
        <div className={HERO_STYLES.gradient.overlay} />
      </div>
      
      <div className={HERO_STYLES.gradient.bottom} />

      <div className={cn(HERO_STYLES.container.base, HERO_STYLES.container.padding)}>
        <div className={HERO_STYLES.container.maxWidth}>
          <h1 className={HERO_STYLES.title.base}>
            <span className={HERO_STYLES.title.prefix}>
              {HERO_CONFIG.title.prefix}
            </span>
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

          <p className={HERO_STYLES.subtitle.base}>
            {HERO_CONFIG.subtitle}
          </p>
          
          <p className={HERO_STYLES.description.base}>
            {HERO_CONFIG.description.main}
            {HERO_CONFIG.description.lineBreak && <br />}
            <span className={HERO_STYLES.description.sub}>{HERO_CONFIG.description.sub}</span>
          </p>

        </div>
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
