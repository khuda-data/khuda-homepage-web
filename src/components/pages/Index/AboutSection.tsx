import { useEffect, useState } from "react";
import AchievementsSection from "./AchievementsSection";
import FeatureShowcase from "./FeatureShowcase";
import TrackShowcase from "./TrackShowcase";
import SponsorShowcase from "./SponsorShowcase";
import { KHUDA_FEATURES, KHUDA_ACHIEVEMENTS } from "@/lib/constants";

const AboutSection = () => {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const handleReset = () => {
      setResetKey(prev => prev + 1);
    };

    window.addEventListener('countup-reset', handleReset);
    return () => {
      window.removeEventListener('countup-reset', handleReset);
    };
  }, []);

  return (
    <>
      {/* 성과 섹션 + 소개 텍스트 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <AchievementsSection achievements={KHUDA_ACHIEVEMENTS} resetKey={resetKey} />
        </div>
      </section>

      {/* 특징 쇼케이스 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <FeatureShowcase features={KHUDA_FEATURES} />
        </div>
      </section>

      {/* 트랙 소개 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <TrackShowcase />
        </div>
      </section>

      {/* 후원사 섹션 */}
      <section className="relative bg-background py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8 md:px-16 lg:px-20">
          <SponsorShowcase />
        </div>
      </section>

    </>
  );
};

export default AboutSection;
